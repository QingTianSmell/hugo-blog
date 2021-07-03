---
title: "如何使用 Hugo 进行个人博客搭建"
date: 2019-07-08T21:19:27+08:00
tags: ["工具"]
---

## 简介
Hugo 是 Go 编写的静态网站生成器，速度快，易用，可配置。

## 安装
```shell
# windows 下使用 scoop 安装
scoop install hugo
# macOS 下使用 brew 安装
brew install hugo
```

## 使用
### 本地搭建流程

```shell
# 创建site
hugo new site <siteName>
# 进入site目录
cd .\siteName\
# 创建helloWorld
hugo new post/hello-world.md
# 运行本地服务查看效果
hugo server
```

## 配置
### 主题配置

```shell
# 挑选一个好看的主题这里使用的是 LoveIt
# 将主题clone到themes目录, 并且把主题仓库作为你的网站目录的子模块
git submodule add https://github.com/dillonzq/LoveIt.git themes/LoveIt
# 阅读你选择的主题的README, 并修改config.toml文件(主题有特殊配置的根据给出的Demo配置)。
theme = 'themeName'
```

### GitHub Page 配置

```shell
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

### Wercker 配置
#### Wercker 简介

CI 使用的[Wercker](https://app.wercker.com), 简单直接使用 GitHub 账号注册登录，不需要麻烦的过程。CI 的简单理解就是向一个仓库提交代码后会自动执行的脚本。

#### Hugo + Wercker

- 首先要在 github 上新建两个仓库，一个用来存放 site 项目，一个用来存放静态的 public 项目(如使用 GitHub Page 项目名称必须为 username.github.io)。
- 在[Wercker](https://app.wercker.com)下创建 Application, 请参考[教程](https://gohugo.io/hosting-and-deployment/deployment-with-wercker/), 注意需要关联的仓库为 site, 会读取仓库下的 wercker.yml 文件执行脚本。
- 去 GitHub 上创建一个 token 给 Wercker 操作 GitHub 仓库用，请参考[教程](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line), 就是 wercker 脚本里的环境变量, 也要在后台添加下。
- 因为在 Site 项目里存在子项目，如果使用 submodule 了请参考[Git submodule 子模块的管理和使用](https://www.jianshu.com/p/9000cd49822c), 不使用要修改下 wercker.yml 文件，如果报已存在的错误，就先把文件加删除再根据 git 给出的错误提示`git rm --cached <moduleName>`, 然后再操作。
- 在你的 site 仓库根目录下创建 wercker.yml 文件，参考下面。
- 最后进行 push, 去你的 Wercker 后台看看吧，Enjoy!

#### wercker.yml

```yaml
# This references a standard debian container from the
# Docker Hub https://registry.hub.docker.com/_/debian/
# Read more about containers on our dev center
# http://devcenter.wercker.com/docs/containers/index.html
box: debian
# You can also use services such as databases. Read more on our dev center:
# http://devcenter.wercker.com/docs/services/index.html
# services:
# - postgres
# http://devcenter.wercker.com/docs/services/postgresql.html

# - mongo
# http://devcenter.wercker.com/docs/services/mongodb.html

# This is the build pipeline. Pipelines are the core of wercker
# Read more about pipelines on our dev center
# http://devcenter.wercker.com/docs/pipelines/index.html
build:
  # Steps make up the actions in your pipeline
  # Read more about steps on our dev center:
  # http://devcenter.wercker.com/docs/steps/index.html
  steps:
    - script:
        name: install git
        code: |
          apt-get update
          apt-get install git -y
    - script:
        # 如果使用submodules, 记得添加配置文件.gitmodules
        name: initialize and update git submodules
        code: |
          git submodule init
          git submodule update --remote --recursive
    - arjen/hugo-build:
        theme: LoveIt
        flags: --buildDrafts=true
    - npm-install
    - script:
        name: publish algolia json
        code: |
          npm run algolia
deploy:
  steps:
    - install-packages:
        packages: git ssh-client
    # 官方给的lukevivier/gh-pages@0.2.1会部署到gh-pages分支，17年我用的时候没这毛病，这里改用别的Step
    # 部署public目录下的静态文件至username.github.io的master分支
    - sf-zhou/gh-pages@0.2.6:
        token: $GIT_TOKEN
        domain: http://blog.orionpax.top
        repo: OrionPax19970905/OrionPax19970905.github.io
        branch: master
        basedir: public
```

## 参考

> [Hugo Themes](https://themes.gohugo.io/)  
> [hugo-theme-even](https://github.com/olOwOlo/hugo-theme-even)  
> [hugo-theme-zozo](https://github.com/OrionPax19970905/hugo-theme-zozo)  
> [hugo-theme-LoveIt](https://github.com/dillonzq/LoveIt)  
> [如何使用 Github Page](https://pages.github.com/)  
> [自定义域名设置](https://www.jianshu.com/p/8ac6c7c037c5)
