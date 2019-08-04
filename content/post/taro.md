---
title: "Taro 学习笔记"
date: 2019-07-25T11:27:29+08:00
tags: ["学习笔记", "Taro"]
---

# 简单使用

## 简介

> Taro 是一套遵循 React 语法规范的 多端开发 解决方案。现如今市面上端的形态多种多样，Web、React-Native、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。  
> 使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动/QQ 小程序、快应用、H5、React-Native 等）运行的代码。

## 安装及使用

```
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli

# 出现 sass 相关的错误
$ npm install -g mirror-config-china

# 创建一个模板项目
$ taro init myApp

# 运行/打包
# h5
$ yarn dev:h5
$ yarn build:h5
# 微信
$ yarn dev:weapp
$ yarn build:weapp
# 支付宝
$ yarn dev:alipay
$ yarn build:alipay
# 字节跳动
$ yarn dev:tt
$ yarn build:tt
# QQ
$ yarn dev:qq
$ yarn build:qq
# 快应用
$ yarn dev:quickapp
$ yarn build:quickapp

# 项目检查
$ taro doctor
```
