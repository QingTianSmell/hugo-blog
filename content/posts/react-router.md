---
title: "React Router 的使用"
date: 2019-07-23T22:16:45+08:00
tags: ["技","程序开发","前端","框架"]
---

# 简介

React Router 是完整的 React 路由解决方案。React Router 保持 UI 与 URL 同步。它拥有简单的 API 与强大的功能例如代码缓冲加载、动态路由匹配、以及建立正确的位置过渡处理。

# 为什么需要路由？

- 单页应用许需要进行页面的切换
- 通过 URL 可以定位到页面
- 更有语义的组织资源

# React Router 特性

- 声明式路由定义。页面任意地方可以定义路由通过 URL 加载组件。
- 动态路由。页面解析时，才解析路由。

# 三种路由实现方式

- URL 路径
- hash 路由
- 内存路由

# API

- \<Link> : 普通的链接，不会触发浏览器刷新。`to : 跳转链接的路径，如 /users/123。`
- \<Redirect> : 重定向当前页面，例如：登录判断。
- \<Route> : 路径匹配时显示对应组件。

  ```
  const routes = (
    <Route component={App}>
      <Route path="groups" component={Groups} />
      <Route path="users" component={Users} />
    </Route>
  );

  class App extends React.Component {
    render() {
      return (
        <div>
          {/* 这会是 <Users> 或 <Groups> */}
          {this.props.children}
        </div>
      );
    }
  }
  ```

  - path : URL 中的路径。它会组合父 route 的路径，除非它是从 / 开始的， 将它变成一个绝对路径。
  - components : 当匹配到 URL 时，单个的组件会被渲染。它可以 被父 route 组件的 this.props.children 渲染。

- \<Switch> : 只显示第一个匹配的路由
