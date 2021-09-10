---
title: React Hooks上手指南
date: 2020-12-28
tags:
  - React
author: preper
summary: 简单的介绍一下React Hooks
---

React组件大致可以分为两类：函数组件和class组件。由于函数组件必需是纯函数，所以无法包括生命周期与内部状态，使用场景受限。Hook赋予了函数式组件更多的能力。Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 为什么要使用Hooks

要回答这个问题，首先看一个例子。用类组件和函数组件实现一个计数器

```javascript
// class
import React, { Component } from 'react';

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { count:0 }
    }
    addCount(){
        this.setState({count:this.state.count+1})
    }
    render() { 
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.addCount.bind(this)}>Chlick me</button>
            </div>
        );
    }
}

export default Example;
```

```javascript
// hooks
import React, { useState } from 'react';
function Example(){
    const [ count , setCount ] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
        </div>
    )
}
export default Example;
```

比较两种编写组件的方式，最直观的结论就是函数式组件的代码比类组件少。但这只是表象。函数式组件比起代码少，更大的优势是将状态的创建、更新和调用的逻辑集中在了一处。以往在编写类组件时，所有的状态全部在constructor中创建，更新和调用可能会放到很多不同的方法里，后期维护就需要在多个方法中梳理状态变更的逻辑，十分麻烦，类组件的复用也会因此受到影响。Hook就是为解决这些问题而出现的。下面就来简单介绍Hook的用法。

## 常用Hook介绍

### 1. state hook

拿上面的计数器组件为例：

```javascript
import React, { useState } from 'react';
function Example(){
    const [ count , setCount ] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
        </div>
    )
}
export default Example;
```

useState就是state hook。useState的用法是向useState传入参数state的初始值（0），通过es6的解构赋值拿到useState返回的state和更新state的函数，在这个例子里是count和setCount。只有使用setCount方法才能更新dom节点中的count。state的初始值可以是基本类型，也可以是对象或数组。但值得注意的是，class组件中的setState在更新this.state对象时是进行更新操作，但useState返回的更新state的函数对state对象执行的操作是替换。所以，在用state hook更新对象时，需要传入state对象的所有属性，避免属性丢失。setState也可以传入一个函数作为参数。函数的参数是state的当前值，函数的返回值是state变更后的值。这种方法使依赖当前state值更新state变得更加方便。

### 2. effect hook

effect hook给函数组件增加了操作副作用的能力：

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

上面的例子简单介绍了effect hook的使用方式。向useEffect传入一个回调函数（以下简称为effect函数），React会在第一次渲染完成和每次更新完成后执行effect函数。在这个计数器例子中，每次更新count后effect函数都会更新页面的title。在React执行重新渲染的过程中，每次传递给useEffect的函数都会有所不同，正是这个原因使我们可以在effect中获取到最新的state值，每次重新渲染都会生成新的effect。

effect函数还可以返回一个函数来清除副作用。比如在effect里绑定了一个监听页面滚动的事件，就可以让effect函数返回一个解绑监听的函数，React会在执行清除操作时调用effect返回的函数。这种api设计，使得添加和移除订阅的逻辑放到了一起，更方便后期维护。

上面提到了，每次重新渲染时都会生成新的effect函数，所以清除副作用的函数也是在每次渲染后都会执行。而即使更新一个在effect函数内没有使用的state，也会导致effect函数被执行。这样看来，effect函数的开销会很大。effect hook提供了一个优化的方法，我们可以向useEffect传入第二个参数，参数的格式为数组，数组的元素为effect函数依赖的state字段。在这种调用方式之下，只有数组内的state变化时才会执行对应的effect函数。而假如我们只想创建一个只运行一次的effect，就可以将useEffect的第二个参数设置为一个空数组。上面的组件可以这样优化：

```javascript
function Example() {
  // ...
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  }, [count]);
  // ...
}
```

这样修改后，只有count发生变化时才会执行修改页面title的操作，而其他的state变化时不会导致这个effect被执行。

### 3. context hook

useContext接收一个context对象（React.createContext的返回值），并返回该context的当前值。当前的context值由上层组件中距离当前组件最近的<MyContext.Provider>的value属性决定。

```javascript
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

上面的代码在初始化ThemeContext时创建了一个context对象，并且设置初始值为themes.light。而在app组件中，通过调用ThemeContext上的Provider组件，设置内部使用的context值为themes.dark。在ThemedButton组件中，使用useContext获取当前组件的ThemeContext，将themes.dark内的属性绑定到了ThemedButton上。

### 4. 额外的Hook

React中还有很多Hook，有的是上面Hook的变体，有的仅在特殊的情况下才会用到。这里仅做简要介绍。

useReducer：useState的替代方案，它接收一个形如(state, action) => newState的reducer，第二个参数为可选参数，可以传入初始的state。useReducer返回当前的state以及和它配套的dispatch方法。

useCallback：接收两个参数，第一个参数是内联回调函数，第二个参数是依赖项数组。useCallback返回的函数是传入的回调函数的memoized版本，仅在某个依赖项改变时才会更新。

useMemo：接收两个参数，第一个参数是创建函数，第二个参数是依赖项数组。返回memoized值。仅当依赖项改变时才重新计算memoized值。

useRef：接收一个初始值，返回一个可变的ref对象。useRef创建的对象不会随着组件的更新重新创建，基于这个特性，可以用useRef储存常量。

useImperativeHandle：接收两个参数，ref和createHandle。它可以让你在使用ref时自定义暴露给父组件的实例值。useImperativeHandle应当与forwardRef一起使用

useLayoutEffect：函数签名与useEffect相同，但会在所有的DOM变更之后同步调用effect。

useDebugValue：可用于在React开发者工具中显示自定义hook的标签。

## Hook规则

使用hook时有两个规则限制：

* 只能在函数最外层调用Hook。
* 只能在React的函数组件中调用Hook，不要在普通的JavaScript函数中调用Hook。

之前在介绍Hook的时候提到了，可以在单个组件中使用多个State Hook或Effect Hook。而React是靠Hook的调用顺序来判断state对应的useState。假如在判断或者循环语句中调用Hook，就会导致再次渲染组件时Hook的调用顺序和初始化时不同，就会产生bug。所以假如需要有条件的执行一个Hook，可以将判断放进Hook内部。

## Tips
*除了上面提到的基础Hook，我们还可以创建以use开头命名的自定义Hook，封装组件中可重用的逻辑。
*class组件中的getSnapshotBeforeUpdate、getDerivedStateFromError、componentDidCatch等生命周期还没有与之对应的Hook写法。
*可以用React.memo实现shoudComponentUpdate。
*如果effect的依赖会频繁变化，可以尝试使用setState的函数式更新形式，解除effect对state的依赖。

<Vssue :title="$title" />
