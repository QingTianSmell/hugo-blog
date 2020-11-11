---
title: "Docker 的使用"
date: 2019-11-26T08:42:30+08:00
tags: ["技","程序开发","运维","工具"]
---

## What

## Why

## Where

## How
### 基础命令
#### 镜像相关
- docker pull <image>
- docker search <image>

#### 容器相关
- docker run
  - `-d`, 后台运行容器
  - `-e`, 设置环境变量
  - `-p`, 宿主端口:容器端口
  - `--name`, 指定容器名称
  - `--link`, 链接不同容器
  - `-v`, 宿主目录:容器目录
- docker start/stop <容器名>
- docker ps <容器名>
- docker logs <容器名>
- docker exec -it <容器名> bash
