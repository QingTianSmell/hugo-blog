---
title: "科学上网"
date: 2019-09-23T11:03:15+08:00
draft: true
tags: ["环境搭建", "科学上网"]
---

## 前置条件

### 服务器

上[搬瓦工](https://bwh8.net)或者 [Vultr](https://my.vultr.com/) 买个服务器，并且能用 SSH 连接到服务器输入命令(推荐使用 XShell)。

### 客户端

- [shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows)
- [v2rayN](https://github.com/2dust/v2rayN)

### 其他

一键搭建脚本如果挂了，就去 Github 自己再找个。

## SSR

1. 下载一键搭建脚本 `git clone -b master https://github.com/flyzy2005/ss-fly`.
2. 运行 SSR 搭建脚本 `ss-fly/ss-fly.sh -ssr`.
3. 输入对应参数

### 相关命令

```
启动：/etc/init.d/shadowsocks start
停止：/etc/init.d/shadowsocks stop
重启：/etc/init.d/shadowsocks restart
状态：/etc/init.d/shadowsocks status

配置文件路径：/etc/shadowsocks.json
日志文件路径：/var/log/shadowsocks.log
代码安装目录：/usr/local/shadowsocks
```

### 参考

> [搬瓦工一键搭建 shadowsocks-shadowsocksR 并开启 BBR 加速](https://github.com/flyzy2005/ss-fly/wiki/搬瓦工一键搭建shadowsocks-shadowsocksR并开启BBR加速)

## V2Ray

### 参考

1. 下载一键搭建脚本 `bash <(curl -s -L https://git.io/v2ray.sh)`.
2. 输入对应参数

> [V2Ray 搭建详细图文教程](https://github.com/233boy/v2ray/wiki/V2Ray搭建详细图文教程)
