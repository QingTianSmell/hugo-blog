---
title: "IE GET 方式请求数据缓存问题"
date: 2019-07-16T22:54:16+08:00
tags: ["踩坑记录", "前端"]
---

```
问题     : IE浏览器请求数据不会更新。
原因     : IE会缓存GET方式的URL访问返回的数据，如果下一次访问的URL相同的话，IE不会访问服务器而是直接从缓存取数据返回。
解决方式 : 使用 POST 请求(查询的话使用 GET 请求的效率是要比 POST 强上一点的), 给 GET 请求加上时间戳。
```

> [GET 和 POST 两种基本请求方法的区别](https://www.cnblogs.com/logsharing/p/8448446.html)
