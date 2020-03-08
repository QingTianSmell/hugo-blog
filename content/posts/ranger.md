---
title: "Ranger"
date: 2020-03-07T11:47:44+08:00
tags: ["工具"]
---

<!-- vim-markdown-toc Marked -->

* [简介](#简介)
* [安装](#安装)
* [配置](#配置)
	* [参考](#参考)
* [常用命令](#常用命令)
* [其他](#其他)

<!-- vim-markdown-toc -->

## 简介

[Ranger](https://github.com/ranger/ranger) 是一个类似 Vim 键位的命令行文件管理器。

## 安装

执行`brew install ranger` 安装

## 配置

- 执行 `ranger --copy-config=all` 生成配置文件。
- 执行 `echo "set -g -x RANGER_LOAD_DEFAULT_RC FALSE" >> ~/.config/fish/config.fish` 禁用 Ranger 的默认配置。
- 根据需要修改 `~/.config/ranger/` 下的配置文件，可以在 `commands.py` 里添加脚本，并在 `rc.conf` 文件里配置按键映射使用。
- 修改`~/.config/ranger/refle.conf` 搜索`Define the "editor"` ，修改默认编辑器，当然也可以不改。
- 添加插件 [ranger_devicons](https://github.com/alexanderjeurissen/ranger_devicons) 为 Ranger 浏览的文件添加图标。
- 修改 `rc.conf` 文件 `vcs_aware` 为 `true` 为 Ranger 启用 git 提示。更多插件及快捷键设置看下面的参考。
- 为了支持压缩和解压操作还需执行 `brew install atool` 和 `brew install unzip`，安装额外插件。

### 参考

> [Ranger Wiki](https://github.com/ranger/ranger/wiki)  
> [Custom Commands](https://github.com/ranger/ranger/wiki/Custom-Commands)  
> [Plugins](https://github.com/ranger/ranger/wiki/Plugins)  
> [Useful Keybindings](https://github.com/ranger/ranger/wiki/Keybindings)  
> [My Configuration](https://github.com/OrionPax19970905/.config/tree/master/ranger)

## 常用命令

- 基础

```
?: 查看帮助，ranger 的很多命令按过第一个键就会有相关提示
S: 跳转到当前目录
:: 进入命令模式
```

- 移动

```
h、j、k、l、G、gg、/ 等 vim 下的移动命令
m: 新建书签
': 打开书签
um: 删除书签
```

- 编辑

```
yy: 复制
dd: 剪切
pp: 粘贴
cw、A、I: 重命名
```

- 其他

```
zh: 查看隐藏文件
o: 排序，根据提示选择
yn: 复制文件名
yo: 复制文件路径
v: 全选 / 凡选
space: 单选
V: 批量选择
```

- 自定义

```
以下命令都是自定义的，可以参考配置部分进行设置
cw: 智能重命名，单个文件单个重命名，多选文件批量重命名
md: 创建并进入目录
mf: 创建文件
C: 压缩
X: 取出到
f: 过滤查找当前目录
F: 调用 fzf 查找
```

## 其他

[Ranger](https://github.com/ranger/ranger) 还支持各种文件类型的预览，但是是可选项需要安装插件，需要用到的可以折腾一下。
