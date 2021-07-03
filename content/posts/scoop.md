---
title: "Windows 下的软件包管理工具 Scoop"
date: 2019-07-11T21:56:57+08:00
tags: ["工具"]
---

## 简介

[Scoop](https://scoop.sh/) 是 Windows 下的命令行软件包管理器，特点是不会污染环境变量，根据 Json 安装软件并生成软链接。

## 安装
### 前置条件

- Windows 版本不低于 Windows 7
- Windows 中的 PowerShell 版本不低于 PowerShell 3
- 能访问 GitHub
- 你的 Windows 用户名为英文

### 安装步骤

```shell
# 在 PowerShell 修改策略同意。
set-executionpolicy remotesigned -scope currentuser
# 配置 scoop 安装路径
[environment]::setEnvironmentVariable('SCOOP','D:\scoop','User')
$env:SCOOP='D:\scoop'
# 安装 scoop
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
# 检查是否安装成功
scoop help
```

## 使用
### 常用命令

```shell
# 列出所有 Scoop 命令
# 只写几个常用的，全部命令用help查看
scoop help

# 查找软件
# 如果软件搜索不到不妨到社区的 Bucket 库里看下
scoop search <软件名>

# 安装软件
#Scoop只会维护软件的最新版本，需要低版本的请去社区的Bucket里查找，比如安装低版本的JDK
scoop install <软件名>

# 卸载软件
# 安装失败的软件要卸载重装
scoop uninstall <软件名>

# 列出所有已安装软件
scoop list

# 更新 scoop
scoop update

# 更新软件
# 查看全部软件状态
scoop status
# 更新相应软件
scoop update [软件包]
```

### Scoop Bucket

之前提到过, Scoop 是根据 Json 文件进行软件的下载安装的, Bucket 就是存放这些 Json 文件的地方。官方维护了一个名称叫 main 的 Bucket (收录条件十分苛刻, 举两个例子：必须是主流的开发者工具, 不可以有 GUI), 也不是说没被官方 Bucket 收录的软件就不可以用 Scoop 进行管理了。只是需要我们将别人维护的 Bucket 使用`scoop bucket add <Bucket Name>`命令添加一下，就可以 install 其中的软件了。总之就是如果使用`scoop search`搜索不到就上[Scoop Directory](https://rasa.github.io/scoop-directory/by-bucket)看下。当然你也可以维护你自己的 Bucket。

## 配置
### Scoop Aria2

```shell
# 安装 aria2 自动开启多线程下载
scoop install aria2

# aria2 配置
# aria2-enabled (默认值: true)
# aria2-retry-wait (默认值: 2)
# aria2-split (默认值: 5)
# aria2-max-connection-per-server (默认值: 5)
# aria2-min-split-size (默认值: 5M)

# aria2 推荐设置
scoop config aria2-max-connection-per-server 16
scoop config aria2-split 16
scoop config aria2-min-split-size 1M
```

## 参考

> [「一行代码」搞定软件安装卸载，用 Scoop 管理你的 Windows 软件](https://sspai.com/post/52496)  
> [给 Scoop 加上这些软件仓库，让它变成强大的 Windows 软件管理器](https://sspai.com/post/52710)
