---
title: "Tomcat 学习笔记"
date: 2019-07-23T22:41:51+08:00
tags: ["学习笔记"]
---

# 简介

Tomcat 服务器是一个免费的开放源代码的 Web 应用服务器，属于轻量级应用服务器，在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试 JSP 程序的首选。

# 作用

- sevlet 管理。将 servlet 存放在服务器中，客户端访问服务器中的 servlet，服务器提供 servlet 的生命周期的管理。
- 多线程支持。容器会自动为接收的每个 servlet 请求创建一个新的 java 线程，servlet 运行完之后，容器会自动结束这个线程。
- jsp 支持。容器将 jsp 翻译成 servlet！

# Tomcat 的目录结构

- bin : 存放 tomcat 的命令
- conf : 存放 tomcat 的配置信息。其中 server.xml 文件是核心的配置文件。
- lib : 支持 tomcat 软件运行的 jar 包。其中还有技术支持包，如 servlet，jsp
- logs : 运行过程的日志信息
- temp : 临时目录
- webapps : 共享资源目录。web 应用目录。（注意不能以单独的文件进行共享）
- work : tomcat 的运行目录。jsp 运行时产生的临时文件就存放在这里

# Web 应用的目录结构

- WebRoot
  - 静态资源（html+css+js+image+vedio）
  - WEB-INF(固定写法)
    - classes :（可选）固定写法。存放 class 字节码文件
    - lib :（可选）固定写法。存放 jar 包文件
    - web.xml
