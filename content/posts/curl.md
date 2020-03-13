---
title: "curl 学习笔记"
date: 2020-01-06T19:36:40+08:00
tags: ["学习笔记", "后端", "运维"]
---

<!-- vim-markdown-toc GitLab -->

* [What](#what)
* [Why](#why)
* [Where](#where)
* [How](#how)
	* [常用参数](#常用参数)
	* [参考](#参考)

<!-- vim-markdown-toc -->

## What

curl 是一种命令行工具，作用是发出网络请求，然后得到和提取数据，显示在"标准输出"（stdout）上面。

## Why

能够快速的进行接口测试。那为什么不选择 Postman ？ Postman 启动太慢了，对于我测试接口来说有些重了。我也不会用到一些 Postman 的其他功能。另外的一点是 Postman 只要自定义的状态码大于 999 ，就会报错（没有相应的描述），我也没有找到解决方案就只能迁移了。还能装 X 何乐而不为呢。

## Where

接口测试，文件下载

## How

### 常用参数

```
-b/--cookie <name=string/file>              # cookie字符串或文件读取位置
-c/--cookie-jar <file>                      # 操作结束后把cookie写入到这个文件中
-d/--data <data>                            # HTTP POST方式传送数据
--data-urlencode <name=data/name@filename>  # HTTP POST 数据 url 编码
-e/--referer                                # 来源网址
-H/--header <line>                          # 自定义头信息传递给服务器
-i/--include                                # 输出时包括protocol头信息
-I/--head                                   # 只显示请求头信息
-L/--location                               # 跟随重定向
-o/--output <path>                          # 把输出写到该文件中
-O/--remote-name                            # 把输出写到该文件中，保留远程文件的文件名
-s/--silent                                 # 静默模式。不输出任何东西
-X <method>                                 # 修改 request 请求的方法类型
-x/--proxy <host[:port]>                    # 使用 HTTP 代理
--socks5 <host[:port]>                      # 使用 socks5 代理
```

### 参考

[使用 cURL 代替 Postman](https://blog.wangmao.me/awesome-curl.html)  
[curl 网站开发指南](http://www.ruanyifeng.com/blog/2011/09/curl.html)
