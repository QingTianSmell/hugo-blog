---
title: "MacOS 下的终端 + Shell 选择"
date: 2020-03-04T22:55:25+08:00
tags: ["技","程序开发","杂谈","工具"]
---

<!-- vim-markdown-toc GitLab -->

* [前言](#前言)
* [Alacritty](#alacritty)
  * [安装](#安装)
  * [新建 Alacritty 应用](#新建-alacritty-应用)
  * [字体设置](#字体设置)
* [Fish](#fish)
  * [集成功能](#集成功能)
  * [安装](#安装-1)
  * [参考](#参考)
* [Oh My Fish](#oh-my-fish)
  * [安装](#安装-2)
  * [常用命令](#常用命令)
  * [注意](#注意)
* [Powerline fonts / Nerd fonts](#powerline-fonts-nerd-fonts)
  * [安装](#安装-3)
  * [参考](#参考-1)

<!-- vim-markdown-toc -->

## 前言

MacOS 下个人的解决方案为 [Alacritty](https://github.com/alacritty/alacritty) + [fishshell](https://fishshell.com/) + [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish)， 从 zsh 转到 fish 的原因就是因为 zsh 太慢了。Alacritty 是一个跨平台、GPU 增强的终端模拟器，目前还在实验阶段有不少问题，选择它的原因是因为它足够的简单以及出乎意料的快。

## Alacritty

### 安装

1. 执行命令安装`brew cask install alacritty`
2. 下载 [配置文件](https://github.com/alacritty/alacritty/releases/download/v0.4.1/alacritty.yml) 并将其复制到`$HOME/.config/alacritty/alacritty.yml` , 你可以在 [GitHub releases page](https://github.com/alacritty/alacritty/releases) 找到最新版本的配置文件。
3. 在配置文件中搜索`background_opacity: 1.0` , 修改透明度保存确认配置文件生效 (Alacritty 的配置文件是保存自动生效的） , 然后根据个人需要修改配置文件。

### 新建 Alacritty 应用

新建一个 Alacritty 应用窗口的方式被写成了 Alacritty 的 Action , 可以在配置文件里设置热键。搜索`key_bindings` , 进行如下设置：

```
key_bindings:
  - { key: N,   mods: Command,         action: SpawnNewInstance }
```

### 字体设置

配置文件里找到 `Font configuration` , 按需要修改即可。值得一提的是如果使用的是 `Powerline` 字体的话。符号有可能显示不出来，可以执行 `export LANG=zh_CN.UTF-8` 或者 `set -x LANG zh_CN.UTF-8` 修复，为了不用每次都执行需要写到你使用的 shell 的启动配置里，fish 的话是 `~/.config/fish/config.fish` 。

## Fish

### 集成功能

- 语法高亮
- 智能建议，`Ctrl + f` 接受建议
- Tab 补全，超过一个列出全部供选择
- alias，命令别名

### 安装

执行命令`brew install fish`安装 Fish，将 fish 设置为默认 shell `sudo chsh -s /usr/bin/fish`。

### 参考

> [宇宙第一 fish shell 入门](https://www.jianshu.com/p/7ffd9d1af788)

## Oh My Fish

### 安装

执行`curl -L https://get.oh-my.fish | fish` 安装 Oh My Fish 管理 fish 插件和切换主题。主题可以参考 [Themes](https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md#agnoster)。

### 常用命令

- omf search <name> : 搜索插件
- omf install <name|url> : 安装插件
- omf list : 列出已安装插件
- omf theme [theme] : 列出所有主题或者切换主题
- omf doctor : 自检

### 注意

目前还有不少问题，有问题后先执行`omf doctor` 自检，按提示走。检查不到问题的就上 Github 瞧瞧。

## Powerline fonts / Nerd fonts

### 安装

好看的字体也是必不可少的，有的主题是必须使用 Powerline 字体或者 Nerd 字体才能正常显示的，执行以下命令：

```bash
# 为 brew 添加字体库
brew tap homebrew/cask-fonts
# 搜索想用的字体
brew search <name>
# 安装字体
brew cask install <name>
```

### 参考

> [Powerline fonts](https://github.com/powerline/fonts)  
> [Nerd fonts](https://github.com/ryanoasis/nerd-fonts#patched-fonts)
