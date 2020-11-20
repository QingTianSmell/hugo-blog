---
title: "如何科学上网"
date: 2019-09-23T11:03:15+08:00
tags: ["折腾","工具"]
---

<!-- vim-markdown-toc GitLab -->

* [安装](#安装)
  * [前置条件](#前置条件)
  * [SSR](#ssr)
  * [V2Ray](#v2ray)
  * [Trajan](#trajan)
  * [客户端](#客户端)
* [参考](#参考)

<!-- vim-markdown-toc -->

# 安装

## 前置条件

- 服务器：上[搬瓦工](https://bwh8.net)、[Vultr](https://my.vultr.com/) 或者其他 VPS 厂商买个服务器
- SSH 客户端: 直接用命令也行，对 ssh 命令不熟悉的可以使用 [XShell](https://www.netsarang.com/en/xshell/) 作为客户端。
- 域名：使用 Trajan 的话，还需要用来伪装的域名。

## SSR

1. 下载一键搭建脚本 `git clone -b master https://github.com/flyzy2005/ss-fly`.
2. 运行 SSR 搭建脚本 `ss-fly/ss-fly.sh -ssr`.
3. 输入对应参数
4. 客户端下载并配置

```
# 相关命令
启动：/etc/init.d/shadowsocks start
停止：/etc/init.d/shadowsocks stop
重启：/etc/init.d/shadowsocks restart
状态：/etc/init.d/shadowsocks status

配置文件路径：/etc/shadowsocks.json
日志文件路径：/var/log/shadowsocks.log
代码安装目录：/usr/local/shadowsocks
```

## V2Ray

1. 下载一键搭建脚本 `bash <(curl -s -L https://git.io/v2ray.sh)`.
2. 输入对应参数
3. 客户端下载并配置

## Trajan

1. 配置域名映射，将二级域名地址映射到 VPS 服务器 IP 地址。
2. 执行脚本并输入相应参数
  ```
  wget -N --no-check-certificate "https://raw.githubusercontent.com/V2RaySSR/Trojansh/master/trojan1.sh" && chmod +x trojan1.sh && ./trojan1.sh
  wget -N --no-check-certificate "https://raw.githubusercontent.com/V2RaySSR/Trojansh/master/trojan2.sh" && chmod +x trojan2.sh && ./trojan2.sh
  wget -N --no-check-certificate "https://raw.githubusercontent.com/V2RaySSR/Trojansh/master/trojan3.sh" && chmod +x trojan3.sh && ./trojan3.sh
  wget -N --no-check-certificate "https://github.com/ylx2016/Linux-NetSpeed/releases/download/sh/tcp.sh" && chmod +x tcp.sh && ./tcp.sh
  ```
3. 客户端下载并配置

## 客户端

客户端有很多根据自己喜欢的来吧。

- [shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows)
- [v2rayN](https://github.com/2dust/v2rayN)
- [Clash](https://github.com/Dreamacro/clash)

# 参考

> [搬瓦工一键搭建 shadowsocks-shadowsocksR 并开启 BBR 加速](https://github.com/flyzy2005/ss-fly/wiki/搬瓦工一键搭建shadowsocks-shadowsocksR并开启BBR加速)  
> [V2Ray 搭建详细图文教程](https://github.com/233boy/v2ray/wiki/V2Ray搭建详细图文教程)  
> [试试最新的Trojan一键脚本](https://www.v2rayssr.com/trojan-2.html)
