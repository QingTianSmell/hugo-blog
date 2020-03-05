---
title: "MacOS 下的终端 + Shell 选择"
date: 2020-03-04T22:55:25+08:00
tags: ["工具"]
---

## 前言
MacOS 下个人的解决方案为 [Alacritty](https://github.com/alacritty/alacritty) + [fishshell](https://fishshell.com/) + [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish)， 从 zsh 转到 fish 的原因就是因为 zsh 太慢了。Alacritty 是一个跨平台、GPU 增强的终端模拟器，目前还在实验阶段有不少问题，选择它的原因是因为它足够的简单以及出乎意料的快。

## Alacritty
### 安装
1. 执行命令安装`brew cask install alacritty`
2. 下载 [配置文件](https://github.com/alacritty/alacritty/releases/download/v0.4.1/alacritty.yml) 并将其复制到`$HOME/.config/alacritty/alacritty.yml` ,你可以在 [GitHub releases page](https://github.com/alacritty/alacritty/releases) 找到最新版本的配置文件。
3. 在配置文件中搜索`background_opacity: 1.0` , 修改透明度保存确认配置文件生效(Alacritty 的配置文件是保存自动生效的) , 然后根据个人需要修改配置文件。

### 新建Alacritty应用
新建一个 Alacritty 应用窗口的方式被写成了 Alacritty 的 Action , 可以在配置文件里设置热键。搜索`key_bindings` , 进行如下设置:
```
key_bindings:
  - { key: N,   mods: Command,         action: SpawnNewInstance }
```

### 字体设置
配置文件里找到 `Font configuration` , 按需要修改即可。值得一提的是如果使用的是 `Powerline` 字体的话。符号有可能显示不出来，可以执行 `export LANG=zh_CN.UTF-8` 或者 `set -x LANG zh_CN.UTF-8` 修复，为了不用每次都执行需要写到你使用的 shell 的启动配置里，fish 的话是 `~/.config/fish/config.fish` 。
