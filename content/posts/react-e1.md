---
title: "JAX 中 HTML 代码段被识别为字符串的问题"
date: 2019-07-23T22:06:52+08:00
tags: ["问题"]
---

## 问题描述

React 的 JAX 语法中进行动态数据绑定时不能动态绑定 HTML。

## 产生原因

JAX 的设计者，在设计时为了防止 XSS 攻击，特意限制了。

## 解决方式

```
//使用dangerouslySetInnerHTML(注意__html是两个_)
<div dangerouslySetInnerHTML={{__html: html}} />
```

> 不合时宜的使用 innerHTML 可能会导致 cross-site scripting (XSS) 攻击。 净化用户的输入来显示的时候，经常会出现错误，不合适的净化也是导致网页攻击的原因之一。我们的设计哲学是让确保安全应该是简单的，开发者在执行“不安全”的操作的时候应该清楚地知道他们自己的意图。dangerouslySetInnerHTML 这个 prop 的命名是故意这么设计的，以此来警告，它的 prop 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。
