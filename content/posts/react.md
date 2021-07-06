---
title: "React 的使用"
date: 2019-07-23T21:45:22+08:00
tags: ["框架"]
---

## 简介

React 是一个用于构建用户界面的 JavaScript 库。(就是个状态机，将根据数据源映射出 UI，遵守一定的规范可以将，UI 和 逻辑分离，更容易调试和编写单元测试)

> 声明式  
> React 可以非常轻松地创建用户交互界面。为你应用的每一个状态设计简洁的视图，在数据改变时 React 也可以高效地更新渲染界面。以声明式编写 UI，可以让你的代码更加可靠，且方便调试。  
> 组件化  
> 创建好拥有各自状态的组件，再由组件构成更加复杂的界面。无需再用模版代码，通过使用 JavaScript 编写的组件你可以更好地传递数据，将应用状态和 DOM 拆分开来。

## 基础

### Hello World

```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

### 理解 JSX

- 本质 : 不是模板引擎而是动态创建组件(使用 JavaScript 原生的 DOM API `document.createElement()`)的语法糖。JSX 防注入攻击。React DOM 在渲染之前默认会过滤所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本)攻击。
- 对比其他模板语言的优点
  - 使用声明式创建页面比较直观
  - 使用代码创建页面十分灵活
  - 不需要学习一门新的模板语言
- 约定
  - React 认为小写的 tag 是原生的 DOM 节点，例如:`<div>`。
  - 大写字母开头的为自定义组件。
  - JAX 标记可以直接使用属性语法，例如:`<menu.Item>`。

### 元素渲染

React 只会更新必要的部分。React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。根据我们以往的经验，将界面视为一个个特定时刻的固定内容（就像一帧一帧的动画），而不是随时处于变化之中（而不是处于变化中的一整段动画），将会有利于我们理清开发思路，减少各种 bug。

### 理解 React 组件

#### 概念

- React 组件一般不提供方法，而是某种状态机。
- React 组件可以理解为一个纯函数(输入是什么结果一定是什么)。
- 单向数据绑定(外部通过 props 传递参数给内部，内部发生变化时暴露事件给外部)。

#### 实例

```
//JavaScript函数方式
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

//ES6 class 定义一个组件(使用类就允许我们使用其它特性，例如局部状态、生命周期钩子)
//组件名称必须以大写字母开头。
//组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

#### 创建一个 React 组件

- 方法论
  1. 创建静态 UI(原型)。
  2. 考虑组件的状态组成(外部传递还是内部维护)。
  3. 考虑组件的交互方式(内部用户进行的操作如何暴露给外部的人使用)。
- 单一职责原则
  1. 每个组件只做一件事。
  2. 如果组件变得复杂，那么应该拆分成小的组件(拆分小组件可以在降低复杂度的同时提高性能，对组件状态进行更新时刷新范围变小)。
- DRY 原则
  1. 能够计算得到的状态就不要单独存储。
  2. 组件尽量无状态，所需数据通过 props 获取。

#### 受控组件和非受控组件

- 受控组件 : 组件或表单元素状态由使用者维护。React 中表单元素通常作为受控组件使用。对外暴露修改事件的静态组件也属于受控组件。
- 非受控组件 : 组件状态由自身维护，或表单元素状态由 DOM 自身维护。

### Props

- 当 React 遇到的元素是用户自定义的组件，它会将 JSX 属性作为单个对象传递给该组件，这个对象称之为“props”。
- Props 的只读性。无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props。
- 我们建议从组件自身的角度来命名 props，而不是根据使用组件的上下文命名。
- React 是非常灵活的，但它也有一个严格的规则：所有的 React 组件必须像纯函数那样使用它们的 props。

### State

- 不要直接更新状态。应当使用 setState()。构造函数是唯一能够初始化 this.state 的地方。
- 状态更新可能是异步的。React 可以将多个 setState() 调用合并成一个调用来提高性能。因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。
- 数据自顶向下流动。父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。这通常被称为自顶向下或单向数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。
- 经过计算后的值不应该赋给 state，正确的模式应该是在渲染时计算这些值。这样保证了计算后的值永远不会与派生出它的 props 值不同步。
- 在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。 可以在有状态组件中使用无状态组件，反之亦然。

### React 组件生命周期及使用场景

![React组件生命周期](https://img.bagevent.com/2019-04-03_125257.png)

- render()
  - 唯一必须实现的方法
  - render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。
- constructor(props)
  - 用于初始化内部状态(很少使用)
  - 唯一可以直接修改 state 的地方
- static getDerivedStateFromProps(props, state)
  - 当 state 需要从 props 初始化时使用
  - 尽量不要使用(维护两者状态一致性会增加复杂度)
  - 每次 render 都会调用
  - 典型场景：表单控件获取默认值
- componentDidMount()
  - UI 渲染完成后调用
  - 只执行一次
  - 典型场景：获取外部资源初始化 state
- componentWillUnmount()
  - 组件移除时调用
  - 典型场景：释放资源
- getSnapshotBeforeUpdate(prevProps, prevState)
  - 在最近一次渲染输出（提交到 DOM 节点）之前调用。
  - 典型场景：获取 render 之前的 DOM 状态(例如：滚动位置)
- componentDidUpdate(prevProps, prevState, snapshot)
  - 每次 UI 更新时调用
  - 典型场景：页面需要根据 props 变化重新获取数据
- shouldComponentUpdate(nextProps, nextState)
  - 决定 Virtual DOM 是否要重绘
  - 一般可以由 PureComponent 自动实现
  - 典型场景：性能优化

### React 事件处理

- React 事件绑定属性的命名采用驼峰式写法，而不是小写。
- 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM 元素的写法)
- 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。
- 你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this, 当你调用这个函数的时候 this 的值会是 undefined。
- 向事件处理程序传递参数
  ```
  //两种方式是等价的，分别通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数。
  //通过箭头函数的方式，事件对象必须显式的进行传递
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  //但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面。
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```

### 条件渲染

- 与运算符 &&
- 三目运算符
- 阻止组件渲染。在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。

### Keys

- Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。
- 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的 id 作为元素的 key。当元素没有确定的 id 时，你可以使用他的序列号索引 index 作为 key。==如果列表项目的顺序可能会变化，我们不建议使用索引来用作键值，因为这样做会导致性能的负面影响==，还可能引起组件状态问题。如果你选择不指定显式的键值，那么 React 将默认使用索引用作为列表项目的键值。
- 元素的 key 只有放在其环绕数组的上下文中才有意义。比方说，如果你提取出一个 ListItem 组件，你应该把 key 保存在数组中的这个\<ListItem />元素上，而不是放在 ListItem 组件中的\<li\>元素上。

### 表单

- 在 HTML 当中，像`<input>`,`<textarea>`, 和 `<select>`这类表单元素会维持自身状态，并根据用户输入进行更新。但在 React 中，可变的状态通常保存在组件的状态属性中，并且只能用 `setState()` 方法进行更新。我们通过使 react 变成一种单一数据源的状态来结合二者。<mark>React 负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，其值由 React 控制的输入表单元素称为“受控组件”。</mark>
- 多个输入的解决方法

  ```
  //当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。
  handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
  }
  ```

### 状态提升

- 在 React 应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。然后，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的共同祖先中。
- 向下传递父组件的 State 及其更新方法。
- 状态提升要写更多的“炉墙代码”，比起双向绑定方式，但带来的好处是，你也可以花更少的工作量找到和隔离 bug。因为任何生活在某些组件中的状态数据，也只有该组件它自己能够操作这些数据，发生 bug 的表面积就被大大地减小了。
- 如果某些数据可以由 props 或者 state 推导出来，那么它很有可能不应该在 state 中出现。


## 扩展

### 理解 Virtual DOM

- 虚拟 DOM 如何工作(DIFF 算法)
  - 广度优先分层比较，针对 UI 很少发生跨层移动
  - 兄弟间位置移动会根据 key 交换位置
  - DOM 跨层移动 React 不会做检查，就是简单的删除然后添加
- 虚拟 DOM 的两个假设
  - 组件的 DOM 结构是相对稳定的
  - 类型相同的兄弟节点可以被唯一标识

### 组件设计模式

#### 高阶组件

- 高阶组件接收组件作为参数，定义通用逻辑、状态，render 方法中将定义的状态和逻辑作为 props 传给接收的组件并直接返回。
- 高阶组件类似于已实现的功能接口，子组件引入高阶组件`import 高阶组件函数名 form "组件路径"`，在内部使用高阶组件将会传递的 props，然后导出通过高阶组件封装的组件给外部使用`export default 高阶组件函数名(组件)`
- 不要改变原始组件，高阶组件应该使用组合技术，将输入组件包裹到一个容器组件。
- 约定：贯穿传递不相关 props 属性给被包裹的组件

  ```
  render() {
    // 过滤掉专用于这个阶组件的props属性，
    // 不应该被贯穿传递
    const { extraProp, ...passThroughProps } = this.props;

    // 向被包裹的组件注入props属性，这些一般都是状态值或
    // 实例方法
    const injectedProp = someStateOrInstanceMethod;

    // 向被包裹的组件传递props属性
    return (
      <WrappedComponent
        injectedProp={injectedProp}
        {...passThroughProps}
      />
    );
  }
  ```

- 约定：包装显示名字以便于调试

  ```
  //最常用的技术是包裹显示名字给被包裹的组件。所以，如果你的高阶组件名字是 withSubscription，
  //且被包裹的组件的显示名字是 CommentList，那么就是用 WithSubscription(CommentList)这样的显示名字
  function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {
      /* ... */
    }
    WithSubscription.displayName = `WithSubscription(${getDisplayName(
      WrappedComponent
    )})`;
    return WithSubscription;
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }
  ```

- 告诫：不要在 render 方法内使用高阶组件
- 告诫：必须将静态方法做拷贝。当你应用一个高阶组件到一个组件时，原始组件被包裹于一个容器组件内，也就意味着新组件会没有原始组件的任何静态方法。
- 告诫：Refs 属性不能贯穿传递
- 典型场景：通用逻辑复用
- 参考：[高阶组件](https://react.docschina.org/docs/higher-order-components.html)

#### 框架(外包装)组件

- 框架组件接收 props.children 作为可变的 UI 显示。定义通用 UI，变化部分使用 props.children，使用者决定这部分如何展示。
- 典型场景：通用 UI 复用

### Context

- Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。
- 不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。
- 实例

  ```
  // 创建一个 theme Context,  默认 theme 的值为 light
  const ThemeContext = React.createContext("light");

  function ThemedButton(props) {
    // ThemedButton 组件从 context 接收 theme
    return (
      <ThemeContext.Consumer>
        {theme => <Button {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  }

  // 中间组件
  function Toolbar(props) {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }

  class App extends React.Component {
    render() {
      return (
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
  }
  ```

- 可以使用高阶组件的设计模式很容易的封装 Context
  ```
  const ThemeContext = React.createContext("light");
  // 在函数中引入组件
  export function withTheme(Component) {
    // 然后返回另一个组件
    return function ThemedComponent(props) {
      // 最后使用context theme渲染这个被封装组件
      // 注意我们照常引用了被添加的属性
      return (
        <ThemeContext.Consumer>
          {theme => <Component {...props} theme={theme} />}
        </ThemeContext.Consumer>
      );
    };
  }
  ```
- React 以前使用实验性的 context API 运行，旧的 API 将会在 16.x 版本中得到支持，但使用到它的应用应该迁移到新版本。遗留的 API 将在未来的 React 版本中被移除。

> [Context 使用教程](https://react.docschina.org/docs/context.html)

### 脚手架工具

[Create React App](https://github.com/facebook/create-react-app) 是 Facebook 的一个最简依赖的脚手架工具，适合学习 React 或者开发简单应用。

[Rekit](http://rekit.js.org/) 基于 Create React App 多整合了很多必要的库，同时提供拆分大型项目耦合度的架构。

[Codesandbox](https://codesandbox.io) 在线 IDE + 脚手架，不关注项目细节，打包部署过程隐藏。

### 生态圈

#### Redux

[Redux](https://redux.js.org) 是 React 全家桶的一员，Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

#### React Router

React Router 是完整的 React 路由解决方案。React Router 保持 UI 与 URL 同步。它拥有简单的 API 与强大的功能例如代码缓冲加载、动态路由匹配、以及建立正确的位置过渡处理。

#### webpack

前端打包工具

#### react-loadable

和 webpack 结合实现按需加载，提高 APP 第一次访问速度

```
import Loadable from 'react-loadable';
import Loading from './my-loading-component';

const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});

export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}
```

## 问题

### [JAX 中 HTML 代码段被识别为字符串的问题](http://blog.orionpax.top/2019/07/react-e1/)
### [React 和直接修改 DOM 的前端框架的兼容性问题](https://blog.orionpax.top/2019/07/react-e2/)

## 参考

> [React 官方文档](https://react.docschina.org/docs/hello-world.html)
