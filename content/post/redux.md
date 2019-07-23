---
title: "Redux 学习笔记"
date: 2019-07-23T22:16:26+08:00
tags: ["学习笔记", "Redux"]
---

# 简介

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

# 三大原则

- 单一数据源
  整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
- State 是只读的（可预测性）
  唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象(state + action = new state)。
- 使用纯函数来执行修改
  为了描述 action 如何改变 state tree ，你需要编写 reducers。输入相同，输出一定相同。

# 基础

## Action

Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

```
const ADD_TODO = 'ADD_TODO';

//添加新 todo 任务的 action 是这样的：
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}

```

## Reducer

Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

## Store

- getState() : 返回应用当前的 state 树。
- dispatch(action) : 分发 action。这是触发 state 变化的惟一途径。
- subscribe(listener) : 添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。

# API

## createStore(reducer, [preloadedState], enhancer)

创建一个 Redux store 来以存放应用中所有的 state。应用中应有且仅有一个 store。

## combineReducers(reducers)

随着应用变得越来越复杂，可以考虑将 reducer 函数 拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分。combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。

## bindActionCreators(actionCreators, dispatch)

把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象。同时使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。

# react-redux API

## <Provider store>

<Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。

## connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

- 连接 React 组件与 Redux store。
- [mapStateToProps(state, [ownProps]): stateProps](Function): 如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。
- [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；每个方法将返回一个新的函数，函数中 dispatch 方法会将 action creator 的返回值作为参数执行。这些属性会被合并到组件的 props 中。

# 不可变数据

## 为什么需要不可变数据

- 性能优化(引用比较)
- 易于调试和跟踪(计算 diff 值)
- 易于推测

## 如何操作不可变数据

- 原生写法

  ```
  //性能最高
  const state = { filter: "completed", todos: ["Learn React"] };

  const newState = { ...state, todos: [...state.todos, "Learn Redux"] };

  const newState2 = Object.assign({}, state, {
    todos: [...state.todos, "Learn Redux"]
  });
  ```

- immutability-helper

  ```
  //深层次的不可变数据方便
  import update from 'immutability-helper';

  const state = {filter : "completed", todos: ["Learn React"]};

  const newState = update(state, { todos: {$push: ["Learn Redux"]});
  ```

- immer

  ```
  //可读性强，性能层次较深的话会较低
  import produce from "immer";

  const state = { filter: "completed", todos: ["Learn React"] };

  const newState = produce(state, drafState => {
    drafState.todos.push("Learn Redux");
  });
  ```
