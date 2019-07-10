---
title: "使用Hugo框架进行个人博客搭建"
date: 2019-07-08T21:19:27+08:00
tags: ["环境搭建"]
---

## 基本

### 安装

windows 系统使用`scoop install hugo` 安装 hugo，使用`hugo version` 查看是否安装成功。

> [「一行代码」搞定软件安装卸载，用 Scoop 管理你的 Windows 软件](https://sspai.com/post/52496)

### 搭建流程

```
# 创建site
hugo new site <siteName>
# 进入site目录
cd .\siteName\
# 创建helloWorld
hugo new post/hello-world.md
# 运行本地服务查看效果
hugo server -D
```

### 主题配置

```
# 挑选一个好看的主题这里使用的是even
# 将主题clone到themes目录
git clone https://github.com/olOwOlo/hugo-theme-even themes/even
# 阅读你选择的主题的README, 并修改config.toml文件(主题有特殊配置的根据给出的Demo配置)。
theme = 'themeName'
```

> [Hugo Themes](https://themes.gohugo.io/)  
> [hugo-theme-even](https://github.com/olOwOlo/hugo-theme-even)

### GitHub Page 配置

```
# hugo命令会将site内容生成静态文件放在public目录下, 注意所有 draft: true 的文章不会被build
hugo
# 切换目录
cd .\public\
# 初始化git项目
git init
git add .
git commit -m 'first commit'
# 关联一个远程仓库，想要使用GitHub Page，项目的名称必须为 "<你的昵称>.github.io"
git remote add origin <你的项目地址>
git push -u origin master
# 如果你有自己的域名的话，可以将GitHub Page映射到自己的域名
```

> [如何使用 Github Page](https://pages.github.com/)  
> [自定义域名设置](https://www.jianshu.com/p/8ac6c7c037c5)

## 扩展

### 访问量和访问人数统计

本站使用[不蒜子](http://busuanzi.ibruce.info/), 如使用 even 主题，在`[params.busuanzi]`下配置`enable = true`将开启不蒜子计数。

### 使用 Valine 开启评论功能(待补充)

### 向搜索引起提交博客地址(待补充)

### 持续集成(待补充)
