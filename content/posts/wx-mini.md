---
title: "微信小程序学习笔记"
date: 2019-08-04T20:12:17+08:00
tags: ["学习笔记", "前端"]
---

# 简单使用

## 环境搭建

### 获取 AppID

[注册](https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index&lang=zh_CN&token=)微信小程序开发者账号，进入[开发设置](https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=1625948171&lang=zh_CN)页面复制 AppID

### 微信开发工具

下载[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，功能按照界面描述理解就可以了。

## 基础

### 微信 web 小程序和传统 web 的文件结构对比

| -    | 传统 web   | 微信小程序 |
| ---- | ---------- | ---------- |
| 结构 | HTML       | WXML       |
| 样式 | CSS        | WXSS       |
| 逻辑 | JavaScript | JavaScript |
| 配置 | -          | JSON       |

### 项目目录

#### pages : 小程序对应页面的目录

- index : 首页
  - index.js : index 页面下的 JS
  - index.wxml : index 页面下的页面结构
  - index.wxss : index 页面下的样式文件
- page1 : 子页面
  - page1.js
  - page1.json : page1 页面的配置文件
  - page1.wxml
  - page1.wxss

#### components : 自定义组件目录(结构类似 pages)

#### utils : 自己封装的工具函数路径

#### app.js : 全局的教本文件

#### app.json : 全局的配置文件

#### app.wxss : 全局的样式文件

#### project.config.json : 项目的描述文件类似`package.json`

### 全局配置 app.json

小程序根目录下的 app.json 文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。完整配置项说明请参考[小程序全局配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)

```
// 常用配置
{
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": {
    "navigationBarTitleText": "Demo"
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  },
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true,
  "navigateToMiniProgramAppIdList": [
    "wxe5f52902cf4de896"
  ]
}
```

### 页面配置

每一个小程序页面也可以使用同名 .json 文件来对本页面的窗口表现进行配置，页面中配置项会覆盖 app.json 的 window 中相同的配置项。完整配置项说明请参考[小程序页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)

```
// 常用配置
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

### 注册小程序

每个小程序都需要在 `app.js` 中调用 `App` 方法注册小程序示例，绑定生命周期回调函数、错误监听和页面不存在监听函数等。详细的参数含义和使用请参考 [App 参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)。

```
// app.js
App({
  onLaunch (options) {
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  onError (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
```

### 注册页面

对于小程序中的每个页面，都需要在页面对应的 js 文件中进行注册，指定页面的初始数据、生命周期回调、事件处理函数等。

```
//index.js
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // 页面创建时执行
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
})
```

### 注册自定义组件

开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似。

#### 创建自定义组件

```
<!--xxx.json-->
{
"component": true
}
```

```
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})
```

#### 使用自定义组件

```
<!--xxx.json-->
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

```
<view>
  <!-- 以下是对一个自定义组件的引用 -->
  <component-tag-name inner-text="Some text"></component-tag-name>
</view>
```

### 视图结构

#### 数据绑定

```
<!--wxml-->
<view> {{message}} </view>
```

```
// page.js
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```

#### 列表渲染

```
<!--wxml-->
<view wx:for="{{array}}"> {{item}} </view>
```

```
// page.js
Page({
  data: {
    array: [1, 2, 3, 4, 5]
  }
})
```

#### 条件渲染

```
<!--wxml-->
<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view wx:elif="{{view == 'APP'}}"> APP </view>
<view wx:else="{{view == 'MINA'}}"> MINA </view>
```

```
// page.js
Page({
  data: {
    view: 'MINA'
  }
})
```

### 基本组件

#### view

微信小程序的块级标签，类似 HTML 的`<div>`。

- hover-class : 指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果。

#### text

微信小程序的行级标签，类似 HTML 的`<span>`。只能嵌套自己。

- selectable : 文本是否可选
- space : 显示连续空格
- decode : 是否解码

#### image

- src : 图片资源地址
- lazy-load : 图片是否懒加载

#### video

- src : 视频资源地址

#### swiper

轮播视图容器。其中只能放`swiper-item`。

#### navigator

- url : 跳转链接
