---
title: "TypeScript 知识总结"
date: 2019-07-25T11:27:43+08:00
tags: ["术","程序开发","前端","知识总结"]
---

## 简单使用

### 简介

#### 什么是 TypeScript?

[TypeScript](http://www.typescriptlang.org) 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。

#### 为什么选择 TypeScript?

- TypeScript 增加了代码的可读性和可维护性
- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 可能和一些库结合的不是很完美

### 基础

#### 原始数据类型

原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。

```
let isDone: boolean = false;
let decLiteral: number = 6;
let myName: string = 'Tom';
let u: undefined = undefined;
let n: null = null;
// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
function alertName(): void {
    alert('My name is Tom');
}
```

#### 任意值

```
// 如果是一个普通类型，在赋值过程中改变类型是不被允许的 error TS2322: Type 'number' is not assignable to type 'string'.
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// 但如果是 any 类型，则允许被赋值为任意类型
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
let something;
// 等价于
let something: any;
```

- 在任意值上访问任何属性都是允许的
- 也允许调用任何方法
- 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值

#### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。其实就是根据初始化的值来确认类型，不进行初始化就是 any

#### 接口

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

```
// 简单的例子 定义的变量的属性必须和接口保持一致，多或少都是不可以的。赋值的时候，变量的形状必须和接口的形状保持一致。
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

```
// 可选属性 仍然不允许添加未定义的属性
interface Person {
    name: string;
    age?: number; // 这个属性是可选的
}
```

#### 数组的类型

```
// 「类型 + 方括号」表示法
let fibonacci: number[] = [1, 1, 2, 3, 5];

// 数组泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

// 用接口表示数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

#### 函数的类型

```
// 简单的函数定义 声明式
function sum(x: number, y: number): number {
    return x + y;
}

// 函数表达式定义函数 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

// 箭头函数语法糖
let mySum: (x: number, y: number) => number = (x: number, y: number): number => {
    return x + y;
};

// 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

// 可选参数 可选参数后面不允许再出现必须参数
function buildName(firstName: string, lastName?: string) {
    ...
}

// 剩余参数
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

// 重载 TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    ...
}
```

#### 类型断言

将一个联合类型的变量指定为一个更加具体的类型。类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。

```
<类型>值
// or
值 as 类型 // 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用这一种
```

#### 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

```
// 相关语法
declare var // 声明全局变量
declare function // 声明全局方法
declare class // 声明全局类
declare enum // 声明全局枚举类型
declare namespace // 声明（含有子属性的）全局对象
interface 和 type // 声明全局类型
export // 导出变量
export namespace // 导出（含有子属性的）对象
export default ES6 // 默认导出
export = commonjs // 导出模块
export as namespace UMD // 库声明全局变量
declare global // 扩展全局变量
declare module // 扩展模块
/// <reference /> 三斜线指令
```

> [TypeScript 声明文件使用](https://ts.xcatliu.com/basics/declaration-files)

### 进阶

#### 类型别名

```
// 简单的例子 类型别名常用于联合类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

#### 字符串字面量类型

```
// 字符串字面量类型用来约束取值只能是某几个字符串中的一个。类型别名与字符串字面量类型都是使用 type 进行定义。
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}
```

#### 类

```
// 属性和方法
// 使用 class 定义类，使用 constructor 定义构造函数。
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}

let a = new Animal('Jack'); // 通过 new 生成新实例的时候，会自动调用构造函数。
console.log(a.sayHi()); // My name is Jack
```

```
// 类的继承 子类中使用 super 关键字来调用父类的构造函数和方法
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}
```

```
// 存取器 getter 和 setter 可以改变属性的赋值和读取行为
class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

```
// 静态方法
class Animal {
    static isAnimal(a) {
        return a instanceof Animal;
    }
}
```

#### 类与接口

```
interface Alarm {
    alert();
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```
