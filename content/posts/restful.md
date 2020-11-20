---
title: "RESTful 知识总结"
date: 2020-03-14T22:24:11+08:00
tags: ["程序开发","知识总结"]
---

<!-- vim-markdown-toc GitLab -->

* [What](#what)
  * [什么是 RESTful?](#什么是-restful)
  * [REST 的原则](#rest-的原则)
  * [HTTP 动词](#http-动词)
  * [参考](#参考)
* [Why](#why)
  * [为什么要使用 RESTful?](#为什么要使用-restful)
  * [RESTful 的好处？](#restful-的好处)

<!-- vim-markdown-toc -->

## What

### 什么是 RESTful?

RESTful 就是一种当前互联网软件的 api 设计模式。最早是由 Fielding 在他的博士论文里提出，定名为 REST，即 Representational State Transfer 的缩写。要理解 RESTful 架构，最好的方法就是去理解 Representational State Transfer 这个词组到底是什么意思。REST 的核心在于，当你设计一个系统的时候，资源是第一位的考虑，你首先从资源的角度进行系统的拆分、设计，而不是像以往一样以操作为角度来进行设计。

- 资源（Resources）

  REST 的名称"表现层状态转化"中，省略了主语。"表现层"其实指的是"资源"（Resources）的"表现层"。所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。你可以用一个 URI（统一资源定位符）指向它，每种资源对应一个特定的 URI。要获取这个资源，访问它的 URI 就可以，因此 URI 就成了每一个资源的地址或独一无二的识别符。

- 表现层（Representation）

  "资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。比如，文本可以用 txt 格式表现，也可以用 HTML 格式、XML 格式、JSON 格式表现，甚至可以采用二进制格式；图片可以用 JPG 格式表现，也可以用 PNG 格式表现。

- 状态转化（State Transfer）

  访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。

### REST 的原则

- 使用 HTTP 动词：GET POST PUT DELETE；
- 无状态连接，服务器端不应保存过多上下文状态，即每个请求都是独立的；
- 为每个资源设置 URI；
- 通过 XML JSON 进行数据传递；

### HTTP 动词

```
GET（SELECT）：从服务器取出资源（一项或多项）。
POST（CREATE）：在服务器新建一个资源。
PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
DELETE（DELETE）：从服务器删除资源。
```

### 参考

> [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/RESTful_api.html)

## Why

### 为什么要使用 RESTful?

网络应用程序，分为前端和后端两个部分。当前的发展趋势，就是前端设备层出不穷，因此，必须有一种统一的机制，方便不同的前端设备与后端进行通信。这导致 API 构架的流行，甚至出现"API First"的设计思想。RESTful API 是目前比较成熟的一套互联网应用程序的 API 设计理论。

### RESTful 的好处？

- 互联网环境下，任何应用的架构和 API 可以被快速理解；
- 分布式环境下，任何请求都可以被发送到任意服务器；
- 异构环境下，任何资源的访问和使用方式都统一；
