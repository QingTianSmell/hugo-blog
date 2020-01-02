---
title: "Idea 意外终止，Web 服务未停止，导致的端口被占用问题解决"
date: 2020-01-02T20:17:21+08:00
tags: ["踩坑记录", "后端"]
---

```bash
# windows 查看占用端口的进程
netstat -ano|findstr <端口号>
# windows 停止进程
taskkill /f /t /im <进程id>
```
