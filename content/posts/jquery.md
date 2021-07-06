---
title: "Jquery 的使用"
date: 2019-07-23T22:16:07+08:00
tags: ["框架"]
---

## 简介

> 定义 : jQuery 是一个快速、简洁的 JavaScript 函数库，jQuery 设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装 JavaScript 常用的功能代码，提供一种简便的 JavaScript 设计模式，优化 HTML 文档操作、事件处理、动画设计和 Ajax 交互。  
> 产生原因 : JavaScript 的 DOM API 十分不好用、JavaScript 面对不同的浏览器需要写不同的代码。

## 基础

### 常用选择器

- 基本
  - #id
  - element
  - .class
  - \*
  - selector1,selector2,selectorN
- 层级
  - ancestor descendant
  - parent > child
  - prev + next
  - prev ~ siblings
- 筛选
  - :first
  - :not(selector)
  - :even
  - :odd
  - :eq(index)
  - :gt(index)
  - :last
  - :lt(index)
  - :focus
- 内容
  - :contains(text)
  - :empty
  - :has(selector)
  - :parent
- 可见性
  - :hidden
  - :visible
- 属性
  - [attribute]
  - [attribute=value]
  - [attribute!=value]
  - [attribute^=value]
  - [attribute$=value]
  - [attribute\*=value]
  - [attrSel1][attrsel2][attrSelN]
- 子元素
  - :first-child
  - :last-child
- 表单
  - :input
  - :text
  - :password
  - :radio
  - :checkbox
  - :submit
  - :image
  - :reset
  - :button
  - :file
- 表单属性
  - :enabled
  - :disabled
  - :checked
  - :selected

### 常用核心函数

- each(callback)
- size()
- get([index])
- index([selector|element])
- data([key],[value])

### 常用 AJAX 函数

- [`$.ajax(url,[settings])`](http://jquery.cuishifeng.cn/jQuery.Ajax.html)
- [`$.getJSON(url,[data],[fn])`](http://jquery.cuishifeng.cn/jQuery.getJSON.html)
- [`$.post(url,[data],[fn],[type])`](http://jquery.cuishifeng.cn/jQuery.post.html)

### 常用筛选函数

- 过滤
  - eq(index|-index)
  - first()
  - last()
  - hasClass(class)
  - has(expr|ele)
- 查找
  - children([expr])
  - find(e|o|e)
  - next([expr])
  - parent([expr])
  - parents([expr])
  - prev([expr])

### 常用 DOM 元素操作函数

- attr(name|pro|key,val|fn)
- removeAttr(name)
- addClass(class|fn)
- removeClass([class|fn])
- html([val|fn])
- text([val|fn])
- val([val|fn|arr])

### 常用文档处理函数

- append(content|fn)
- appendTo(content)
- prepend(content|fn)
- prependTo(content)
- after(content|fn)
- before(content|fn)
- insertAfter(content)
- insertBefore(content)
- remove([expr])

### 常用事件函数

- ready(fn)
- on(eve,[sel],[data],fn)
- off(eve,[sel],[fn])
- eventName([[data],fn]) : HTML 事件去掉 on 就是 jQuery 的事件函数

## 值得一提

### JS 对象和 jQuery 对象的区别

jQuery 对象就是 JS new Object()生成的普通对象。

### 何时使用筛选方法来进行选择

当$选择器里的字符串需要出现this时，因为this是一个对象，而使用$选择器要么传一个对象要么传一个字符串，而不能把对象和字符串相结合使用，就使用筛选方法来选择。

## 应用场景

### JS 对象和 jQuery 对象的相互转换方法

JS 对象-\>JQuery 对象 : `$(dom);`  
jQuery 对象-\>JS 对象 : `$('h1')[1];或者$('h1').get(1);`

## 参考

> [JQuery 手册](http://jquery.cuishifeng.cn/)

