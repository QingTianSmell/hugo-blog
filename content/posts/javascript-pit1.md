---
title: "JavaScript 构造 Date 对象的字符串格式问题"
date: 2019-07-18T22:16:15+08:00
tags: ["踩坑记录", "前端"]
---

JavaScript 构造 Date 对象时要传的字符串标准格式为 `yyyy/MM/dd HH:mm:ss`，其会将后台传过来的 Date 对象转换为 `yyyy-MM-dd HH:mm:ss` 这种格式(可能只有部分语言项目存在此问题)，无法直接使用至少 IE 不行。需要字符串替换下使用 `replace(/-/g,"/")`。
