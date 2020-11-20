---
title: "Taro 的使用"
date: 2019-07-25T11:27:29+08:00
tags: ["程序开发","前端","框架"]
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

## 跨平台开发

```
if (process.env.TARO_ENV === 'weapp') {
  require('path/to/weapp/name')
} else if (process.env.TARO_ENV === 'h5') {
  require('path/to/h5/name')
}
```

## 编译配置

Taro 的编译配置文件是 config/index.js。 下面列几个用到修改的配置：

```
sourceRoot: 'src',   // 源码目录
outputRoot: 'dist',  // 打包目录，如果需要打包不同的目录就要调整

// Taro 的编译存在一些坑，不按照他的包结构来的话有些内容就不会编译到，可以用这项配置，来把原生小程序中不会被编译的内容 Copy 到对应 dist 目录防止引用不到。
copy: {
  patterns: [
    { from: 'src/asset/tt/', to: 'dist/asset/tt/', ignore: '*.js' }, // 指定需要 copy 的目录
    { from: 'src/asset/tt/sd.jpg', to: 'dist/asset/tt/sd.jpg' } // 指定需要 copy 的文件
  ]
},
```

## 基于 Taro 开发第三方多端 UI 库

```
// 为了打包出可以在 H5 端使用的组件库，需要在 config/index.js 文件中增加一些配置
if (process.env.TARO_BUILD_TYPE === 'ui') {
  Object.assign(config.h5, {
    enableSourceMap: false,
    enableExtract: false,
    enableDll: false
  })
  config.h5.webpackChain = chain => {
    chain.plugins.delete('htmlWebpackPlugin')
    chain.plugins.delete('addAssetHtmlWebpackPlugin')
    chain.merge({
      output: {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'taro-ui-sample'
      },
      externals: {
        nervjs: 'commonjs2 nervjs',
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5',
        'weui': 'commonjs2 weui'
      }
    })
  }
}

// 打包命令
taro build --ui

```

## 使用小程序原生组件

直接使用即可，但是如果不做多端的兼容处理就会导致其他端无法编译了。

## 使用 MobX

```
// counter.ts
// 定义 Store
import { observable } from 'mobx'

const counterStore = observable({
  counter: 0,
  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default counterStore
```

```
// src/app.ts
// 设置 Provider 和 React 类似但是全局只能有一个，且只能在 app.ts 上
import counterStore from './store/counter'

const store = {
  counterStore
}
...
render () {
	return (
	  <Provider store={store}>
	    <Index />
	  </Provider>
	)
}
...
```

```
// IndexPage.tsx
// 消费 Store
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('counterStore')
@observer
class Index extends Component {
  //...
}

export default Index
```

## 开发第三方多端非 UI 库

前提:

- Taro 目前并未提供非 UI 库多端编译的命令
- tsc 编译，不支持 h5 。(Taro 编译的时候对于 h5 会把 @tarojs/taro 替换成 @tarojs/taro-h5，还有一些其他的兼容处理)
- Taro 不支持 require，因此也不支持动态导入，所以它自己也没有实现一个多端公用的包

解决方案: 同时打出多端的包，然后用 require 动态导入

配置信息:

```
// config/index.js
// 借用下 Taro 开发第三方多端 UI 库的配置与导出结构，省的自己写脚本了。
if (process.env.TARO_BUILD_TYPE === 'ui') {
  Object.assign(config.h5, {
    enableSourceMap: false,
    enableExtract: false,
    enableDll: false
  })
  config.h5.webpackChain = chain => {
    chain.plugins.delete('htmlWebpackPlugin')
    chain.plugins.delete('addAssetHtmlWebpackPlugin')
    chain.merge({
      output: {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'taro-ui-sample'
      },
      externals: {
        nervjs: 'commonjs2 nervjs',
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5',
        'weui': 'commonjs2 weui'
      }
    })
  }
}
```

```
// tsconfig.json
"rootDir": "./src",         // 源代码路径
"outDir": "dist/weapp",     // 输出位置
"declaration": true,        // 自动生成声明文件
"declarationDir": "types",  // 将声明文件统一生成到types路径下
```

```
// package.json
"typings": "types/index.d.ts" // 指定项目声明文件位置
```

相关命令:

```
// 将项目作为 UI 库打包, 生成 H5 下需要引用的包。
taro build --ui
// TypeScript 编译
tsc
// NPM 打补丁(提高一个小版本)
npm version patch
// 发布更新
npm publish
// 更新引入包
npm update @bageventjs/packageName
```

## 速查参考

> [Taro 全局配置](https://taro-docs.jd.com/taro/docs/tutorial.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE)  
> [Taro APP 生命周期](https://taro-docs.jd.com/taro/docs/tutorial.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)  
> [Taro 页面生命周期](https://taro-docs.jd.com/taro/docs/tutorial.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F-1)  
> [Taro 组件生命周期](https://taro-docs.jd.com/taro/docs/tutorial.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F-2)  
> [Taro 编译配置详情](https://taro-docs.jd.com/taro/docs/config-detail.html)  
> [MobX 中文文档](https://cn.mobx.js.org/)
