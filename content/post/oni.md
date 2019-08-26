---
title: "Oni Neovim 的 GUI"
date: 2019-08-26T15:22:16+08:00
tags: ["开发工具"]
---

## 简介

The vision of Oni is to build an editor that allows you to go from thought to code as easily as possible - bringing together the raw editing power of Vim, the feature capabilities of Atom/VSCode, and a powerful and intuitive extensibility model - wrapped up in a beautiful package.

## 安装

```
# Window 下使用 Scoop 来安装
scoop bucket add extras
scoop install oni
```

> [程序员的软件包管理工具 Scoop](http://blog.orionpax.top/post/scoop/)

## Features

### Code Completion

自动

### Fuzzy Finder

`<Ctrl-p>` 打开文件搜索框。

### Command Palette

`<Ctrl-Shift-P>` 打开命令输入框。

当前，命令行工具包括：

- 很多内置的 Oni 命令，比如浏览器、配置编辑、片段编辑等等。
- 几种常用菜单项
- NPM 包装脚本
- 插件命令
- 从发射参数奥尼文件夹

### Embedded Browser

在命令输入框输入 `Browser: Open Vertical` or `Browser: Open Horizontal` 可以打开浏览器。可以使用 `<Ctrl-g>` 在不使用鼠标的情况下导航 UI 。

### Quick Info

令光标悬停在一个标识符上，可以看到快捷信息。

### Snippets

在命令输入框输入 `Snippets: ...` 以创建代码段，Oni 的[代码段配置](https://code.visualstudio.com/docs/editor/userdefinedsnippets)和 VSCode 保持了一致。

### Status Bar

ONI 具有丰富的状态栏，被设计为`vim-powerline`和`vim-airline`的替代品。

### TextMate Highlighting

自动

### Syntax / Compilation Errors

自动

## 常用命令

- `<Ctrl-g>` : 打开 sneak mode。UI 导航
- `F2` : 重命名变量
- `F12` : 跳转到定义
- `<Ctrl-p>` : 显示快速打开菜单
- `<Ctrl-/>` : 搜索当前缓冲区
- `<Alt>` : 打开关闭菜单栏
- `<Ctrl-Shift-B>` : 打开关闭文件树
- `<Ctrl-e>` : 创建新文件
- `<Ctrl-f>` : 创建新文件夹
- `y` + `p` : 移动文件
- `d` : 删除文件
- `u` : 撤销上一次可逆的资源管理器操作

> [Oni Shortcuts](https://github.com/onivim/oni/wiki/Shortcuts)

## 遇到的问题

### 配置制表符宽度失效

useDefaultConfig 设置为 false 可以解决，设置为 false 后要把默认的配置复制到 init.vim 里调整下制表符宽度，不然会出现卡死的问题。

> actually, most of the Oni functionality will be preserved with useDefaultConfig set to false. The only thing useDefaultConfig: false turns off are these defaults:
>
> - https://github.com/onivim/oni/blob/master/vim/default/bundle/oni-vim-defaults/plugin/init.vim
> - targets.vim plugin
> - vim-commentary plugin
> - vim-unimpaired plugin
>
> There was a bug previously where auto-completion wouldn't work correctly, but it seems addressed now. LMK if you see any issues, though.
