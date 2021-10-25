---
title: React Hooks上手指南
date: 2020-12-28
tags:
  - React
author: preper
summary: 简单的介绍一下React Hooks
---

React 组件大致可以分为两类：函数组件和 class 组件。
由于函数组件必需是纯函数，所以无法包括生命周期与内部状态，使用场景受限。
Hook 赋予了函数式组件更多的能力。
Hook 是 React 16.8 的新增特性。
它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 为什么要使用Hooks

要回答这个问题，首先看一个例子。
用类组件和函数组件实现一个计数器：

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

比较两种编写组件的方式，最直观的结论就是函数式组件的代码比类组件少。
但这只是表象。
函数式组件比起代码少，更大的优势是将状态的创建、更新和调用的逻辑集中在了一处。
以往在编写类组件时，所有的状态全部在 constructor 中创建，而更新和调用可能会放到很多不同的方法里，后期维护就需要在多个方法中梳理状态变更的逻辑，类组件的复用也会因此受到影响。
Hook 就是为解决这些问题而出现的。下面就来简单介绍 Hook 的用法。

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

useState 就是 state hook。
useState 的用法是向 useState 传入参数 state 的初始值（0），通过 es6 的解构赋值拿到 useState 返回的 state 和更新 state 的函数，在这个例子里是 count 和 setCount。
只有使用 setCount 方法才能更新 dom 节点中的 count。
state 的初始值可以是基本类型，也可以是对象或数组。
但值得注意的是，class 组件中的 setState 在更新 this.state 对象时是进行更新操作，但 useState 返回的更新 state 的函数对 state 对象执行的操作是替换。
所以，在用 state hook 更新对象时，需要传入 state 对象的所有属性，避免属性丢失。
setState 也可以传入一个函数作为参数。
函数的参数是 state 的当前值，函数的返回值是 state 变更后的值。
这种方法使得依赖当前 state 值更新 state 变得更加方便。

### 2. effect hook

effect hook 给函数组件增加了操作副作用的能力：

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

上面的例子简单介绍了 effect hook 的使用方式。
向 useEffect 传入一个回调函数（以下简称为 effect 函数）。
React 会在第一次渲染完成和每次更新完成后执行 effect 函数。
在这个计数器例子中，每次更新 count 后 effect 函数都会更新页面的 title。
在 React 执行重新渲染的过程中，每次传递给 useEffect 的函数都会有所不同。
正是这个原因，我们可以在 effect 中获取到最新的 state 值，每次重新渲染都会生成新的 effect。

effect 函数还可以返回一个函数来清除副作用。
比如在 effect 里绑定了一个监听页面滚动的事件，就可以让 effect 函数返回一个解绑监听的函数。
React 会在执行清除操作时调用 effect 返回的函数。
这种 api 设计，使得添加和移除订阅的逻辑放到了一起，更方便后期维护。

上面提到了，每次重新渲染时都会生成新的 effect 函数。
所以清除副作用的函数也是在每次渲染后都会执行。
而即使更新一个在 effect 函数内没有使用的 state，也会导致 effect 函数被执行。
这样看来，effect 函数的开销会很大。
effect hook 提供了一个优化的方法。
我们可以向 useEffect 传入第二个参数，参数的格式为数组，数组的元素为 effect 函数依赖的 state 字段。
在这种调用方式之下，只有数组内的 state 变化时才会执行对应的 effect 函数。
而假如我们只想创建一个只运行一次的 effect，就可以将 useEffect 的第二个参数设置为一个空数组。
上面的组件可以这样优化：

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

这样修改后，只有 count 发生变化时才会执行修改页面 title 的操作，而其他的 state 变化时不会导致这个 effect 被执行。

### 3. context hook

useContext 接收一个 context 对象（React.createContext 的返回值），并返回该 context 的当前值。
当前的 context 值由上层组件中距离当前组件最近的`<MyContext.Provider>`的 value 属性决定。

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

上面的代码在初始化 ThemeContext 时创建了一个 context 对象，并且设置初始值为 themes.light。
而在 app 组件中，通过调用 ThemeContext 上的 Provider 组件，设置内部使用的 context 值为 themes.dark。
在 ThemedButton 组件中，使用 useContext 获取当前组件的 ThemeContext，将 themes.dark 内的属性绑定到了 ThemedButton上。

### 4. 额外的Hook

React 中还有很多 Hook，有的是上面 Hook 的变体，有的仅在特殊的情况下才会用到。
这里仅做简要介绍。

* useReducer：useState的替代方案。
  它接收一个形如`(state, action) => newState`的 reducer。
  第二个参数为可选参数，可以传入初始的 state。
  useReducer 返回当前的 state 以及和它配套的 dispatch 方法。
* useCallback：接收两个参数，第一个参数是内联回调函数，第二个参数是依赖项数组。
  useCallback 返回的函数是传入的回调函数的 memoized 版本，仅在某个依赖项改变时才会更新。
* useMemo：接收两个参数，第一个参数是创建函数，第二个参数是依赖项数组。
  返回 memoized 值。仅当依赖项改变时才重新计算 memoized 值。
* useRef：接收一个初始值，返回一个可变的 ref 对象。
  useRef 创建的对象不会随着组件的更新重新创建，基于这个特性，可以用 useRef 储存常量。
* useImperativeHandle：接收两个参数，ref 和 createHandle。
  它可以让你在使用 ref 时自定义暴露给父组件的实例值。useImperativeHandle 应当与 forwardRef 一起使用。
* useLayoutEffect：函数签名与 useEffect 相同，但会在所有的 DOM 变更之后同步调用 effect。
* useDebugValue：可用于在 React 开发者工具中显示自定义 hook 的标签。

## Hook规则

使用hook时有两个规则限制：

* 只能在函数最外层调用 Hook。
* 只能在 React 的函数组件中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook。

之前在介绍 Hook 的时候提到了，可以在单个组件中使用多个 State Hook 或 Effect Hook。
而 React 是靠 Hook 的调用顺序来判断 state 对应的 useState。
假如在判断或者循环语句中调用 Hook，就会导致再次渲染组件时 Hook 的调用顺序和初始化时不同，进而产生 bug。
所以假如需要有条件的执行一个 Hook，可以将判断条件放进 Hook 内部。

## Tips

* 除了上面提到的基础 Hook，我们还可以创建以 use 开头命名的自定义 Hook，封装组件中可重用的逻辑。
* class 组件中的 getSnapshotBeforeUpdate、getDerivedStateFromError、componentDidCatch 等生命周期还没有与之对应的 Hook 写法。
* 可以用 React.memo 实现 shoudComponentUpdate。
* 如果 effect 的依赖会频繁变化，可以尝试使用 setState 的函数式更新形式，解除 effect 对 state 的依赖。
