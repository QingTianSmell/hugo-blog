---
title: "Node 学习笔记"
date: 2019-09-23T17:11:43+08:00
tags: ["学习笔记", "Node"]
---

## 简单使用

### 简介

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

### 全局对象、变量、函数

- 全局对象
  - global : 表示 Node 所在的全局环境
  - process : 该对象表示 Node 所处的当前进程，允许开发者与该进程互动。
  - console : 指向 Node 内置的 console 模块，提供命令行环境中的标准输入、标准输出功能。
- 全局方法
  - setTimeout()
  - clearTimeout()
  - setInterval()
  - clearInterval()
  - require()
  - Buffer()
    - 简介 : Buffer 对象是 Node 处理二进制数据的一个接口。它是 Node 原生提供的全局对象。JavaScript 比较擅长处理字符串，对于处理二进制数据，就不太擅长，比如 TCP 数据流。Buffer 对象就是为了解决这个问题而设计的。它是一个构造函数，生成的实例代表了 V8 引擎分配的一段内存，是一个类似数组的对象，成员都为 0 到 255 的整数值，即一个 8 位的字节。
    - write() : write 方法可以向指定的 Buffer 对象写入数据。它的第一个参数是所写入的内容，第二个参数（可省略）是所写入的起始位置（默认从 0 开始），第三个参数（可省略）是编码方式，默认为 utf8。
    - slice() : slice 方法返回一个按照指定位置、从原对象切割出来的 Buffer 实例。它的两个参数分别为切割的起始位置和终止位置。
    - toString() : toString 方法将 Buffer 实例，按照指定编码（默认为 utf8）转为字符串。
    - toJSON() : toJSON 方法将 Buffer 实例转为 JSON 对象。如果 JSON.stringify 方法调用 Buffer 实例，默认会先调用 toJSON 方法。
- 全局变量
  - \_\_filename : 指向当前运行的脚本文件名。
  - \_\_dirname : 指向当前运行的脚本所在的目录。

### 常用标准库

#### http 模块

- 创建 Web 服务器

  ```
  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;

  //创建HTTP服务器
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });

  //监听指定地址下的指定端口并设置触发事件
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  ```

- 模拟请求

  ```
  const http = require('http');
  const querystring = require('querystring');

  //封装请求参数
  const data = querystring.stringify({
      'msg': 'Hello World!'
  });
  const options = {
      hostname: 'localhost',
      port: 9988,
      path: '/api/v2/product/optest',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
      }
  };

  //创建请求对象并绑定相关事件处理方法
  const req = http.request(options, (res) => {
      console.log(`状态码: ${res.statusCode}`);
      res.on('data', (chunk) => {
          console.log(`响应主体: ${chunk}`);
      });
      res.on('end', () => {
          console.log('响应中已无数据');
      });
  });
  req.on('error', (e) => {
      console.error(`请求遇到问题: ${e.message}`);
  });

  //写入请求数据
  req.write(data);
  req.end();
  ```

#### querystring 模块

- 对象转 URL 参数字符串

  ```
  querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
  // 返回 'foo=bar&baz=qux&baz=quux&corge='

  querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
  // 返回 'foo:bar;baz:qux'
  ```

- URL 参数字符串转对象
  ```
  querystring.parse("foo=bar&abc=xyz&abc=123");
  // 返回 { foo: 'bar', abc: ['xyz', '123'] } 对象
  ```

#### url 模块

- 解析 URL
  ```
  exports.startServer = (route, handle) => {
    http
      .createServer((req, res) => {
        //解析URL 获取访问接口路径
        var pathname = url.parse(req.url).pathname;
        route(handle, pathname, res, req);
      })
      .listen(8888, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
  };
  ```

#### fs 模块

- 读文件

  ```
  //readFile方法的第一个参数是文件的路径，可以是绝对路径，也可以是相对路径。注意，如果是相对路径，是相对于当前进程所在的路径（process.cwd()），而不是相对于当前脚本所在的路径。
  //readFile方法的第二个参数是读取完成后的回调函数。该函数的第一个参数是发生错误时的错误对象，第二个参数是代表文件内容的Buffer实例。
  fs.readFile("./image.png", function(err, buffer) {
    if (err) throw err;
    process(buffer);
  });

  //readFileSync方法的第一个参数是文件路径，第二个参数可以是一个表示配置的对象，也可以是一个表示文本文件编码的字符串。默认的配置对象是{encoding: null, flag: 'r'}，即文件编码默认为null，读取模式默认为r（只读）。如果第二个参数不指定编码（encoding），readFileSync方法返回一个Buffer实例，否则返回的是一个字符串。
  var text = fs.readFileSync(fileName, "utf8");
  ```

- 写文件

  ```
  //writeFile方法的第一个参数是写入的文件名，第二个参数是写入的字符串，第三个参数是回调函数。回调函数前面，还可以再加一个参数，表示写入字符串的编码（默认是utf8）。
  fs.writeFile("message.txt", "Hello Node.js", err => {
    if (err) throw err;
    console.log("It's saved!");
  });

  //writeFileSync方法用于同步写入文件。它的第一个参数是文件路径，第二个参数是写入文件的字符串，第三个参数是文件编码，默认为utf8。
  fs.writeFileSync(fileName, str, "utf8");
  ```

- 新建目录
  ```
  //mkdir接受三个参数，第一个是目录名，第二个是权限值，第三个是回调函数。
  var fs = require("fs");
  fs.mkdir("./helloDir", 0777, function(err) {
    if (err) throw err;
  });
  ```
- 判断文件还是目录

  ```
  var fs = require("fs");

  //stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。
  fs.readdir("/etc/", function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      fs.stat("/etc/" + file, function(err, stats) {
        if (err) throw err;

        if (stats.isFile()) {
          console.log("%s is file", file);
        } else if (stats.isDirectory()) {
          console.log("%s is a directory", file);
        }
        console.log("stats:  %s", JSON.stringify(stats));
      });
    });
  });
  ```

- 监听文件变化

  ```
  var fs = require("fs");

  //watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。
  fs.watchFile("./testFile.txt", function(curr, prev) {
    console.log("the current mtime is: " + curr.mtime);
    console.log("the previous mtime was: " + prev.mtime);
  });

  fs.writeFile("./testFile.txt", "changed", function(err) {
    if (err) throw err;

    console.log("file write complete");
  });
  ```

- 使用输入输出流实现大文件 Copy

  ```
  function fileCopy(filename1, filename2, done) {
    var input = fs.createReadStream(filename1);
    var output = fs.createWriteStream(filename2);

    input.on("data", function(d) {
      output.write(d);
    });
    input.on("error", function(err) {
      throw err;
    });
    input.on("end", function() {
      output.end();
    });
  }
  ```

#### events 模块

- 简介 : 回调函数模式让 Node 可以处理异步操作。但是，为了适应回调函数，异步操作只能有两个状态：开始和结束。对于那些多状态的异步操作（状态 1，状态 2，状态 3，……），回调函数就会无法处理，你不得不将异步操作拆开，分成多个阶段。每个阶段结束时，调用下一个回调函数。为了解决这个问题，Node 提供 Event Emitter 接口。通过事件，解决多状态异步操作的响应问题。
- EventEmitter 的接口部署、事件部署和触发

  ```
  const EventEmitter = require("events");

  class MyEmitter extends EventEmitter {}
  const myEmitter = new MyEmitter();
  //注册事件
  myEmitter.on("event", () => {
    console.log("触发事件");
  });
  //触发事件
  myEmitter.emit("event");
  ```

- 错误事件
  ```
  //如果没有为 'error' 事件注册监听器，则当 'error' 事件触发时，会抛出错误、打印堆栈跟踪、并退出 Node.js 进程。
  //为了防止崩溃 Node.js 进程，可以使用 domain 模块。 （但请注意，不推荐使用 domain 模块。）作为最佳实践，应该始终为 'error' 事件注册监听器。
  const myEmitter = new MyEmitter();
  myEmitter.on("error", err => {
    console.error("错误信息");
  });
  myEmitter.emit("error", new Error("错误信息"));
  // 打印: 错误信息
  ```

#### Stream 接口

- 简介 : 数据流（stream）是处理系统缓存的一种方式。操作系统采用数据块（chunk）的方式读取数据，每收到一次数据，就存入缓存。Node 应用程序有两种缓存的处理方式，第一种是等到所有数据接收完毕，一次性从缓存读取，这就是传统的读取文件的方式；第二种是采用“数据流”的方式，收到一块数据，就读取一块，即在数据还没有接收完成时，就开始处理它。
- 流动态和暂停态
  > “可读数据流”有两种状态：流动态和暂停态。处于流动态时，数据会尽快地从数据源导向用户的程序；处于暂停态时，必须显式调用 stream.read()等指令，“可读数据流”才会释放数据。刚刚新建的时候，“可读数据流”处于暂停态。三种方法可以让暂停态转为流动态。
  >
  > - 添加 data 事件的监听函数
  > - 调用 resume 方法
  > - 调用 pipe 方法将数据送往一个可写数据流
- 可读数据流
  - read() : read 方法从系统缓存读取并返回数据。如果读不到数据，则返回 null。
  - setEncoding() : 调用该方法，会使得数据流返回指定编码的字符串，而不是缓存之中的二进制对象。比如，调用 setEncoding('utf8')，数据流会返回 UTF-8 字符串，调用 setEncoding('hex')，数据流会返回 16 进制的字符串。
  - resume() : resume 方法会使得“可读数据流”继续释放 data 事件，即转为流动态。
  - pause() : pause 方法使得流动态的数据流，停止释放 data 事件，转而进入暂停态。任何此时已经可以读到的数据，都将停留在系统缓存。
  - pipe() : pipe 方法是自动传送数据的机制，就像管道一样。它从“可读数据流”读出所有数据，将其写出指定的目的地。整个过程是自动的。
  - data 事件 : 对于那些没有显式暂停的数据流，添加 data 事件监听函数，会将数据流切换到流动态，尽快向外提供数据。
  - end 事件 : 无法再读取到数据时，会触发 end 事件。也就是说，只有当前数据被完全读取完，才会触发 end 事件，比如不停地调用 read 方法。
  - error 事件 : 当读取数据发生错误时，error 事件被触发。
- 可写数据流
  - write() : write 方法用于向“可写数据流”写入数据。它接受两个参数，一个是写入的内容，可以是字符串，也可以是一个 stream 对象或 buffer 对象，另一个是写入完成后的回调函数，它是可选的。
  - setDefaultEncoding() : setDefaultEncoding 方法用于将写入的数据编码成新的格式。它返回一个布尔值，表示编码是否成功，如果返回 false 就表示编码失败。
  - end() : end 方法用于终止“可写数据流”。该方法可以接受三个参数，全部都是可选参数。第一个参数是最后所要写入的数据，可以是字符串，也可以是 stream 对象或 buffer 对象；第二个参数是写入编码；第三个参数是一个回调函数，finish 事件发生时，会触发这个回调函数。
  - pipe 事件 : “可写数据流”调用 pipe 方法，将数据流导向写入目的地时，触发该事件。

### 参考

> [最佳实践](https://github.com/i0natan/nodebestpractices/blob/master/README.chinese.md)

## 值得一提

### Node 模块系统

#### 概述

> Node.js 采用模块化结构，按照 CommonJS 规范定义和使用模块。模块与文件是一一对应关系，即加载一个模块，实际上就是加载对应的一个模块文件。

#### 什么是模块化？

- 存在文件作用域
- 存在通信规则
  - 加载(require)
  - 导出(module.exports)

#### 导出 `exports`

node 中每个 js 文件，都有一个 module 对象，其 exports 属性相当于其暴露的接口对象。可以使用`module.exports.xxx = xxx`添加向外暴露的接口。如果一个文件只向外暴露一个方法或者其他类型的属性，可以直接使用`module.exports = xxx`。注意在 Node 解释 js 文件时，会在其头部加上隐式的`let exports = module.exports`因此只要不改变指针指向的情况下，可以使用`export`代替`module.exports`。

#### 加载 `require`

- 加载规则
  - 会执行加载模块中的代码
  - 重复 require，不会执行模块中的代码，仅能拿到`module.exports`接口对象。
- 模块标识
  - 核心模块
    - 被编译到二进制文件中，直接使用名字加载。
  - 第三方模块
    - 凡是第三方模块都需要使用 npm 来下载
    - 加载的时候使用`require(’packageName’)`
    - 加载的文件的位置在`node_modules/packageName/package.json` 中`{”main”:”加载文件“}`
    - 没有配置加载文件的情况会默认为`index.js`
    - `node_modules`文件夹会从当前文件所在路径，向上迭代查找使用最近的一个。
  - 自定义模块
    - `./`开头，代表当前路径,不可省。
    - `../`开头，代表上级路径,不可省。
    - 引入时`.js`后缀可省

#### 参考

> [深入浅出 NodeJs 模块机制](https://blog.csdn.net/zhangyuan19880606/article/details/51508699)  
> [CommonJS 规范](http://wiki.commonjs.org/wiki/CommonJS)

### 事件轮询

#### 工作流程

![工作流程](https://img.php.cn//upload/image/810/825/257/1534314018617481.png)

#### 参考

> [What is the Event Loop?](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)  
> [Node.js 的事件循环工作流程以及生命周期的详细讲解](http://www.php.cn/js-tutorial-408369.html)

### 包管理

#### NPM

- `npm init` 生成`package.json`文件
  - `-y` 跳过向导
- `npm install` 将`package.json`文件中的依赖项全部安装
- `npm install <packageName>` 安装第三方模块到`node_modules`
  - `—-save` 将安装第三方模块信息，添加到`package.json`文件的依赖项中。
- `npm help` 查看帮助文档

#### Yarn

- `yarn install` 将`package.json`文件中的依赖项全部安装
- `yarn add <packageName>` 安装第三方模块到`node_modules`，并且包第三方模块信息添加到`package.json`文件中
- `yarn global add <packageName>` 安装到全局

#### `package.json`文件

Node 项目的项目描述文件，参考[package.json 常用文件参数](http://javascript.ruanyifeng.com/nodejs/packagejson.html)，各参数见名知意。

#### 写 CLI

- `#!/usr/bin/env node` 指定解释器
- npm link 创建软链放到环境变量
- `package.json` 里添加 `bin` 属性

#### 参考

[NPM 官网](npmjs.org) 所有第三方模块都可以在此网站搜查看相关信息。
[Yarn 官网](https://yarnpkg.com)
