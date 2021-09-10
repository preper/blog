---
title: TypeScript初体验
date: 2020-12-24
tags:
  - TypeScript
author: preper
summary: 粗略的讲解了TypeScript的基础语法
---

众所周知，JavaScript是一门动态弱类型的语言。动态弱类型的好处就是上手容易，对初学者友好，缺点就是维护成本高。比如现在你需要调用一个别人写的函数，没有文档和注释，那么你就需要硬着头皮去看函数内部的逻辑。TypeScript就是为了解决这类问题而出现的。
作为JavaScript的超集，TypeScript提供了完善的类型检查机制。IDE也能基于类型系统对代码进行类型检查和代码提示，可以避免很多不必要的bug。TypeScript的接口定义也可以代替文档，可以大大降低后期使用和维护的成本。
## 基础类型
ts里支持与js几乎相同的数据类型，比如
```typescript
// undefined
let un: undefined = void 0
// null
let nu: null = null
// 布尔值
let bool: boolean = true
// 数字
let num: number = 0xf123
// 字符串
let str: string = `123${num}`
// symbol
let sy: symbol = Symbol()
// 数组
let arr1: number[] = [1, 2, 3]
// 数组泛型
let arr2: Array<number> = [1, 2]
// 函数
let add = (x: number, y: string): number => Number(x + y)
// 先标记函数类型，然后创建函数
// void表示没有任何类型，函数没有返回值通常会定义为void
let compute: () => void
compute = () => {}
```
这种(变量/函数):type的语法叫做类型注解。在具体的使用过程中，上面的类型并不能完全满足我们的需求。比如，我们有时可能会有将null和undefined赋值给某种基础类型，又或者，我们需要创建一个包含数字和字符串两种数据类型的数组。这时我们就需要用到联合类型：
```typescript
// 也可以配置tsconfig.json中的strictNullChecks
let catNum: number | null = null

let arr3: Array<number | string> = [1, 2, '3']
```
ts中还有一种特殊的数组类型，叫做元组。元组限定了数组元素的类型和个数。
```typescript
// 元组
let tuple: [number, string | number] = [1, '2']
```
值得注意的是，对元组使用push、pop等方法虽然不会报错，但由于元组不支持越界访问，而且某些数组的操作方法可能导致元组元素的数据类型与定义有差别，继而导致出现bug，所以强烈不建议这样操作。
根据各种基本类型注解的规律，其实很容易联想到对象的声明方式：
```typescript
// 不推荐
let obj: object = {x: 1, y: '2'}
```
在使用中就会发现，object类型的变量只是允许你给它赋任意值，但是却不能够在它上面调用属性和方法，即便它们真的存在。所以对象的类型注解会像元组一样，详细的描述对象内包含的属性及属性的类型：
```typescript
let obj1: {x: number, y: string} = {x: 1, y: '2'}
```
在生产环境中，有些变量来可能自动态的内容，无法确定其类型，这时候我们可以用any来标记这些变量。使用any标记的变量就比较像js中的变量，可以跨类型赋值
```typescript
let anything: any = {x: 1, y: '2'}
anything = false
```
ts中还有一种特殊的类型never，表示总是会抛出异常或不会有返回值函数的返回值类型
```typescript
let error = (): never => {
    throw new Error('error')
}
let endless = (): never => {
    while(true) {}
}
```
ts中有完善的类型推论，所以在声明变量时不使用类型注解也能得到ts类型检查的帮助
```typescript
let x = 1
x = '3' // error，不能将“string”分配给“number”
```
## 枚举类型
枚举类型enum是对JavaScript标准数据类型的一个补充，可以理解为一组常量的集合。 使用枚举类型可以为一组数值赋予友好的名字：
```typescript
// 数字枚举
// 默认情况下，从0开始为元素编号，也可以手动指定成员的数值
enum Role {
    Guest, // 0
    Reporter = 101,
    Developer = 201,
    Maintainer, // 202
    Owner = 300
}
// 数字枚举可以正反取值
console.log(Role) // {0: "Guest", 101: "Reporter", 201: "Developer", 202: "Maintainer", 300: "Owner", Guest: 0, Reporter: 101, Developer: 201, Maintainer: 202, Owner: 300}

// 字符串枚举
enum Message {
    Success = '成功',
    Fail = '失败'
}
console.log(Message) // {Success: "成功", Fail: "失败"}

// 枚举成员
enum Char {
    // 常量，会在编译阶段计算出对应值
    a,
    b = Char.a,
    c = 1 + 3,
    // 需要在运行环境中动态计算对应的值
    d = Math.random(),
    e = '123'.length
}

// 常量枚举
const enum Month {
    Jan,
    Feb,
    Mar
}
let month = [Month.Jan]
```
上面的代码经过tsc编译后会变成下面的js：
```javascript
// 数字枚举
var Role;
(function (Role) {
    Role[Role["Guest"] = 0] = "Guest";
    Role[Role["Reporter"] = 101] = "Reporter";
    Role[Role["Developer"] = 201] = "Developer";
    Role[Role["Maintainer"] = 202] = "Maintainer";
    Role[Role["Owner"] = 300] = "Owner";
})(Role || (Role = {}));
// 解释了为什么数字枚举可以正反取值

// 字符串枚举
var Message;
(function (Message) {
    Message["Success"] = "\u6210\u529F";
    Message["Fail"] = "\u5931\u8D25";
})(Message || (Message = {}));

// 枚举成员
var Char;
(function (Char) {
    // 常量，编译阶段计算出对应值
    Char[Char["a"] = 0] = "a";
    Char[Char["b"] = 0] = "b";
    Char[Char["c"] = 4] = "c";
    // 值被保留到了运行环境计算
    Char[Char["d"] = Math.random()] = "d";
    Char[Char["e"] = '123'.length] = "e";
})(Char || (Char = {}));

// 常量枚举编译阶段会被移除
var month = [0 /* Jan */];
```
ts中还可以将枚举作为变量的类型注解
```typescript
// 枚举类型
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3 // 数字枚举类型可以赋值为任意数值
let f: F = 3
e === f // error，类型E和类型F没有重叠，始终为false

let e1: E.a
console.log(e1) // error，该语句只给e1指定了类型为枚举类型E.a，并没有赋值
let e2: E.b = 2
let e3: E.a = 2
e2 === e3 // error，类型E.a和类型E.b没有重叠。
e === e3 // false，类型E包含类型E.a，所以可以进行比较。

// 将变量设置为字符串枚举类型，限制会比数字枚举类型更严格
let g1: G = G.b // 只能通过对应枚举类型内的元素进行赋值
let g2: G.a = G.a
let g3: G = 'apple' // error，虽然G内包含'apple'，但字符串常量'apple'并不严格属于类型G
let g4: G.a = G.b // error，无法跨子类型赋值
```
## 接口
接口可以分为对象类型的接口和函数类型的接口。
对象接口：
```typescript
interface Item {
    readonly id: number
    name: string
}
interface Result {
    data: Item[] // 可以用已存在的接口定义新接口
}
// 用接口限制函数参数的类型
function render(result: Result): void {
    console.log(result)
    result.data.forEach(value => {
        console.log(value.id)
    })
}

let result = {
    data: [
        {id: 1, name: '1', sex: 'm'},
        {id: 2, name: '2'}
    ]
}
// ts使用“鸭式辨型法”对参数进行类型检查，result里有id和name属性，符合接口的限制
render(result)

// 但直接传递对象字面量作为函数参数，则会被严格要求按照接口定义赋值。
// 有两种方式解决这个问题，这里使用类型断言来处理
render({
    data: [
        {id: 1, name: '1', sex: 'm'}, // 如果不用类型断言as Result，这里sex会报错
        {id: 2, name: '2'}
    ]
} as Result)

// 另外一种解决方法是，使用可选属性或者索引签名来定义接口
interface List {
    readonly id: number
    name: string
    [x: string]: any // 字符串索引签名
    sex?: string // 可选属性
}
// 数组也可以用数字索引签名来定义接口
interface StringArray {
    [index: number]: string
}
let chars: StringArray = ['a', 'b']
// 也可以使用不同类型的签名索引定义接口
interface Names {
    [x: string]: string
    [y: number]: string // 数字索引的返回值必须是字符串索引返回值类型的子类型
}
let temp = {
    1: 'test',
    a: 'testa'
}
```
函数接口：
```typescript
// 上面介绍函数时用到了这种定义方法。需要注意的是，这里addFunction不是接口，而是一个未被赋值的函数
let addFunction: (x: number, y: number) => number

// 定义函数接口的方式有两种
interface Add {
    (x: number, y: number): number
}
type Add2 = (x: number, y: number) => number

let addFn: Add = (a, b) => a + b
```
## 函数
在ts中定义函数，有很多小技巧
```typescript
// 函数可以依靠ts的类型推断得到返回值
function addnum1(x: number, y: number) {
    return x + y
}
// 可选参数，函数内可以根据参数个数不同进行不同的操作，可选参数必须在必需参数后面
function addnum2(x: number, y?: number) {
    return y ? x + y : x
}
// 带初始化值的参数，可以省略类型注解，ts会推导出参数的类型
function addnum3(x: number, y: number = 0, z: number, q = 2) {
    return x + y + z + q
}
// ts中可以用解构赋值的方式捕获剩余参数
function addnum4(x: number, ...rest: number[]) {
    return x + rest.reduce((pre, cur) => pre + cur)
}
// 函数重载，可以通过传入不同类型的参数进行不同的操作
function addnum5(...rest: number[]): number
function addnum5(...rest: string[]): string
function addnum5(...rest: any[]): any { // 这里不算做函数重载的一部分，所以只能够通过传递字符串数组或者数字数组调用该函数
    let first = rest[0]
    if (typeof first === 'string') {
        return rest.join('-')
    } else if (typeof first === 'number') {
        return rest.reduce((pre, cur) => pre + cur)
    }
}
console.log(addnum5('1', '2', '3')) // 1-2-3
console.log(addnum5('1', 2, '3')) // error，混合类型的参数不在重载列表中
```
## 类
es6可以通过class关键字定义类。而ts在es6的基础上，为class提供了丰富的修饰符。
```typescript
// 抽象类，一般用来声明基类，可以继承但不能创建实例
abstract class Animal {
    eat() {
        console.log('eat')
    }
    abstract sleep(): void // 抽象方法，必需要在派生类中实现
}
let animal = new Animal() // error，无法创建抽象类的实例

class Cat extends Animal {
    sleep() { // 继承自Animal必需实现sleep方法
        console.log('cat sleep')
    }
    run() {}
}
let cat = new Cat()

class Dog extends Animal {
    constructor(name: string) {
        super()  // ts强制规定派生类的构造函数必需包含super调用
        this.name = name // 在调用super后才能访问派生类的this
    }
    name: string // 构造函数内调用的this属性需要在类中显示声明
    age?: number // 可选参数
    sleep() {
        console.log('dog sleep')
    }
    public run() {} // public可省略
    private pri() {} // private仅可在类内部调用，继承和实例均不能调用
    protected pro() {} // protected仅能在类和子类中访问，实例不能访问，放在constructor上可用于声明基类
    readonly legs: number = 4 // readonly只读
    static food: string = 'bone' // 只能通过类名调用
}
let dog = new Dog('wangcai')
dog.pri() // error，pri为私有属性只能在Dog中访问
dog.pro() // error，pro受保护，只能在Dog及子类中访问
Dog.food // bone
dog.food // error，food不是Dog的静态成员

class SmallDog extends Dog {
    constructor(public color: string) { // constructor中加public修饰符可以省略类中的声明
        super('wangcai')
        this.color = color
        this.pri() // error
        this.pro() // 可以调用
    }
}
let a = new SmallDog('yellow') // SmallDog {legs: 4, name: "wangcai", color: "yellow"}
SmallDog.food // bone

let animals: Animal[] = [dog, cat] // 基类可以作为类型注解限制变量类型
animals.forEach(item => {
    item.sleep()
    item.run() // error，基类不存在的方法不能调用，即使子类分别实现了该方法
})

class WorkFlow {
    step1() {
        return this // 类的方法可以通过return this实现链式调用
    }
    step2() {
        return this
    }
}
new WorkFlow().step1().step2()

class MyWorkFlow extends WorkFlow {
    next() {
        return this
    }
}
new MyWorkFlow().next().step1().next().step2() // 也可以通过继承的方法实现链式调用
```
类也可以通过接口来约束
```typescript
// 类的接口只能约束公有成员，在创建类时可以实现更多的方法
interface Human {
    name: string,
    age: number,
    eat(): void
}

class Asian implements Human {
    constructor(public name: string, age: number) {
        this.name = name // 接口定义的值需要在构造函数内初始化并赋值
        this.age = age
    }
    private age: number // error，实现接口时不能将属性设置为私有属性，需要去掉private
    eat() {}
    sleep() {}
}

interface Man extends Human { // 接口也可以通过extends继承
    run(): void
}
interface Child extends Human {
    cry(): void
}
interface Boy extends Man, Child {} // 接口可以同时继承自多个接口

let boy: Boy = {
    name: 'nameless',
    age: 8,
    eat() {}, // Human接口
    run() {}, // Man接口
    cry() {}  // Child接口
}

class Auto {
    state = 1
    private pstate = 0
}
// 接口也可以从现有的类继承
interface AutoInterface extends Auto {}

// 因为Auto具有私有属性，不能通过非继承方式实现
class C implements AutoInterface { // error，pstate是私有属性，只能通过继承实现
    state = 2
    private pstate = 0 // 虽然在C里实现了同样的私有字段pstate，但和Auto内的pstate并不相同
}
// 只能通过这种方法实现AutoInterface的类接口
class Bus extends Auto implements AutoInterface {}

```
## 泛型
前面在定义数组的时候也用到了泛型。泛型可以使一个函数支持多种类型的数据。 这样在开发时就可以以不同的数据类型来使用函数。
```typescript
function log<T>(value: T): T { // log函数可以以不同类型的参数调用
    console.log(value)
    return value
}

log<string[]>(['123', 'asf']) // ["123", "asf"] 传入了类型参数string[]，限制了参数类型
log('a', 'b') // error，虽然支持不同类型，但只支持一个参数
log(123) // 123 这里利用了类型推论，编译器会根据传入的参数自动确定T的类型

// 接口中也可以使用泛型
type Log1 = <T>(value: T) => T
interface Log2<T = string> {
    (value: T): T
}

// 泛型类，可以用来约束类里的实例部分的类型
class Log<T> {
    run(value: T) {
        console.log(value)
        return value
    }
    static log(value: T) {} // error，静态成员不能使用泛型类型
}
let myLog3 = new Log<number>() // myLog3限制了参数类型为number，run方法只能传入number
myLog3.run(1)
let myLog4 = new Log() // myLog4属于unknown类型，run方法可以传入不同类型的参数，不推荐这种使用方式
myLog4.run({a: 1})
myLog4.run(2)

interface Length {
    length: number
}
// 也可以通过接口约束泛型类，可以使泛型类更加可控
function log1<T extends Length>(value: T): T {
    console.log(value, value.length)
    return value
}
log1({length: 1, a: 'b'})
```

<Vssue :title="$title" />
