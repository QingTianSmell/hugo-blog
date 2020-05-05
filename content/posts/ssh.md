---
title: "SSH 学习笔记"
date: 2019-12-31T18:36:53+08:00
tags: ["学习笔记", "运维"]
---

<!-- vim-markdown-toc Marked -->

* [What](#what)
  * [SSH 登录流程](#ssh-登录流程)
* [Why](#why)
  * [解决的问题](#解决的问题)
  * [什么是中间人攻击？](#什么是中间人攻击？)
  * [SSH 如何解决中间人攻击？](#ssh-如何解决中间人攻击？)
* [Where](#where)
* [How](#how)
  * [基本命令](#基本命令)
  * [scp](#scp)
  * [sftp](#sftp)
  * [修改 SSH 默认端口](#修改-ssh-默认端口)
  * [免密登录](#免密登录)

<!-- vim-markdown-toc -->

## What

简单说，SSH 是一种网络协议，用于计算机之间的加密登录。如果一个用户从本地计算机，使用 SSH 协议登录另一台远程计算机，我们就可以认为，这种登录是安全的，即使被中途截获，密码也不会泄露。  
最早的时候，互联网通信都是明文通信，一旦被截获，内容就暴露无疑。1995 年，芬兰学者 Tatu Ylonen 设计了 SSH 协议，将登录信息全部加密，成为互联网安全的一个基本解决方案，迅速在全世界获得推广，目前已经成为 Linux 系统的标准配置。  
需要指出的是，SSH 只是一种协议，存在多种实现，既有商业实现，也有开源实现。本文针对的实现是 OpenSSH，它是自由软件，应用非常广泛。

### SSH 登录流程

1. 远程主机收到用户的登录请求，把自己的公钥发给用户。
2. 用户使用这个公钥，将登录密码加密后，发送回来。
3. 远程主机用自己的私钥，解密登录密码，如果密码正确，就同意用户登录。

## Why

### 解决的问题

计算机间明文通信的安全性问题。

### 什么是中间人攻击？

SSH 之所以能够保证安全，原因在于它采用了公钥加密。这个过程本身是安全的，但是实施的时候存在一个风险：如果有人截获了登录请求，然后冒充远程主机，将伪造的公钥发给用户，那么用户很难辨别真伪。  
因为不像 https 协议，SSH 协议的公钥是没有证书中心（CA）公证的，也就是说，都是自己签发的。可以设想，如果攻击者插在用户与远程主机之间（比如在公共的 wifi 区域），用伪造的公钥，获取用户的登录密码。  
再用这个密码登录远程主机，那么 SSH 的安全机制就荡然无存了。这种风险就是著名的"[中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)"（Man-in-the-middle attack）。

### SSH 如何解决中间人攻击？

口令登录。如果你是第一次登录对方主机，系统会出现下面类似的提示：

```
$ ssh user@host
The authenticity of host 'host (12.18.429.21)' can't be established.
RSA key fingerprint is 98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d.
Are you sure you want to continue connecting (yes/no)?
```

这段话的意思是，无法确认 host 主机的真实性，只知道它的公钥指纹，问你还想继续连接吗？  
所谓"公钥指纹"，是指公钥长度较长（这里采用 RSA 算法，长达 1024 位），很难比对，所以对其进行 MD5 计算，将它变成一个 128 位的指纹。上例中是`98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d`，再进行比较，就容易多了。  
很自然的一个问题就是，用户怎么知道远程主机的公钥指纹应该是多少？回答是没有好办法，远程主机必须在自己的网站上贴出公钥指纹，以便用户自行核对。当远程主机的公钥被接受以后，它就会被保存在文件`$HOME/.ssh/known_hosts`之中。  
下次再连接这台主机，系统就会认出它的公钥已经保存在本地了，从而跳过警告部分，直接提示输入密码。每个 SSH 用户都有自己的 known_hosts 文件，此外系统也有一个这样的文件，通常是`/etc/ssh/ssh_known_hosts`，保存一些对所有用户都可信赖的远程主机的公钥。

## Where

计算机间的加密登录通信。

## How

### 基本命令

```bash
# 登录
ssh user@host

# 指定端口登录，SSH的默认端口是22，也就是说，你的登录请求会送进远程主机的22端口。使用p参数，可以修改这个端口。
ssh -p 2222 user@host

# 查看已知主机
cat /root/.ssh/known_hosts

# 设置自动登陆
ssh-copy-id -i ~/.ssh/id_rsa.pub user@host
```

### scp

```bash
# scp
# 本地复制到远程
scp /home/file.txt user@host:/home/
# 远程复制到本地
scp user@host:/home/file.txt /home/
# 目录复制
scp /home/folder user@host:/home/folder
```

### sftp

```bash
# sftp
# 进入 sftp 命令窗口
sftp user@host
# 所有命令前面加l代表本地命令
# cd 路径                        更改远程目录到“路径”
# lcd 路径                       更改本地目录到“路径”
# ls [选项] [路径]               显示远程目录列表
# lls [选项] [路径]              显示本地目录列表
# 上传文件
put <本地路径>
# 下载文件
get <远程路径>
```

### 修改 SSH 默认端口
```bash
# 本人环境 Ubuntu 19.10，推荐修改完后先测试下能否连接在断开。
# 打开配置文件
vim /etc/ssh/sshd_config
# 找到下面这一行默认配置
# Port 22
# 设置修改的端口号
# 保存后重启 ssh 服务
systemctl restart sshd
# 检查端口是否以修改成功
ss -ntl
```

### 免密登录

```
# 客户端生成公私钥，有的就不用了
ssh-keygen

# 上传公钥到服务器
# 相当于在服务器的 ~/.ssh/authorized_keys 里添加了公钥内容
ssh-copy-id -i ~/.ssh/id_rsa.pub user@host

# 之后就可以免密登录了测试下看看吧
```

