---
title: "Tomcat 的使用"
date: 2019-07-23T22:41:51+08:00
tags: ["工具"]
---

## 简介

Tomcat 服务器是一个免费的开放源代码的 Web 应用服务器，属于轻量级应用服务器，在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试 JSP 程序的首选。

## 安装

Windows 下安装使用 Scoop `scoop install tomcat`。Linux 参考 [Linux 下安装 Tomcat](https://www.cnblogs.com/xdp-gacl/p/4097608.html)。

## 基础
### 作用

- sevlet 管理。将 servlet 存放在服务器中，客户端访问服务器中的 servlet，服务器提供 servlet 的生命周期的管理。
- 多线程支持。容器会自动为接收的每个 servlet 请求创建一个新的 java 线程，servlet 运行完之后，容器会自动结束这个线程。
- jsp 支持。容器将 jsp 翻译成 servlet！

### Tomcat 的目录结构

- bin : 存放 tomcat 的命令
- conf : 存放 tomcat 的配置信息。其中 server.xml 文件是核心的配置文件。
- lib : 支持 tomcat 软件运行的 jar 包。其中还有技术支持包，如 servlet，jsp
- logs : 运行过程的日志信息
- temp : 临时目录
- webapps : 共享资源目录。web 应用目录。（注意不能以单独的文件进行共享）
- work : tomcat 的运行目录。jsp 运行时产生的临时文件就存放在这里

### Web 应用的目录结构

- WebRoot
  - 静态资源（html+css+js+image+vedio）
  - WEB-INF(固定写法)
    - classes :（可选）固定写法。存放 class 字节码文件
    - lib :（可选）固定写法。存放 jar 包文件
    - web.xml

## 常用配置
### 修改 Tomcat 控制台标题
在 bin 目录下创建 `setenv.bat` 文件并添加一行 `set TITLE=自定义标题`，重启服务测试。

### 修改 JSESSIONID 在 Cookie 中的名称
在 Context 容器标签上增加 sessionCookieName 参数 `<Context path=”/” docBase=”webapp” sessionCookieName=”CustomSessionName”></Context>`

### server.xml 个端口的作用

- `<Server port="8005" shutdown="SHUTDOWN">` 服务端口，shutdown 命令执行时会关闭对应端口的服务。
- `<Connector port="8080" protocol="HTTP/1.1"` HTTP 协议端口。
- `<Connector port="8009" protocol="AJP/1.3"` AJP 协议端口。AJP 协议负责和其他的 HTTP 服务器(如 Apache )建立连接；在把 Tomcat 与其他 HTTP 服务器集成时，就需要用到这个连接器。之所以使用 Tomcat 和其他服务器集成，是因为 Tomcat 可以用作 Servlet/JSP 容器，但是对静态资源的处理速度较慢，不如 Apache 和 IIS 等 HTTP 服务器。
- `redirectPort="8443" />` redirectPort 表示当强制要求 HTTPS 而请求是 HTTP 时，重定向至端口号为8443的 Connector。

### 修改默认 web 目录

可以通过配置 `<Context>` 元素的 docBase 属性来修改。

### 多种配置 Context 元素的途径

Tomcat 6.x 提供了多种配置 `<Context>` 元素的途径。当 Tomcat 6.x 加载一个 Web 应用时，会依次按照以下五种方式尝试查找 Web 应用的 `<Context>` 元素，直到找到为止：

1. 到 `<CATALINA_HOME>/conf/context.xml` 文件中查找 `<Context>` 元素。这个文件中的 `<Context>` 元素的信息适用于所有Web应用。
2. 到 `<CATALINA_HOME>/conf/[enginename]/[hostname]/context.xml.default` 文件中查找 `<Context>` 元素。[enginename]表示 `<Engine>` 的 name 属性，[hostname]表示 `<Host>` 的name属性。在 context.xml.default 文件中的 `<Context>` 元素的信息适用于当前虚拟主机中的所有 Web 应用。
3. 到 `<CATALINA_HOME>/conf/[enginename]/[hostname]/[contextpath].xml` 文件中查找 `<Context>` 元素。[contextpath]表示单个 Web 应用的 URL 入口。在[contextpath].xml文件中的 `<Context>` 元素的信息只适用于单个 Web 应用，例如以下文件中的 `<Context>`元素适用于名为“Catalina”的Engine下的localhost主机中的helloapp应用： `<CATALINA_HOME>/conf/Catalina/localhost/helloapp.xml`
4. 到Web应用的`META-INF/context.xml` 文件中查找 `<Context>` 元素。这个文件中的 `<Context>` 元素的信息适用于当前 Web 应用。
5. 到 `<CATALINA_HOME>/conf/server.xml` 文件中的 `<Host>` 元素中查找 `<Context>` 子元素。该 `<Context>` 元素的信息只适用于单个Web应用。

## 参考
> [详解Tomcat 配置文件server.xml](https://www.cnblogs.com/kismetv/p/7228274.html)  
