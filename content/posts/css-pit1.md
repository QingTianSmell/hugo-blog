---
title: "sup 标签导致行距变大的问题"
date: 2019-09-03T16:44:23+08:00
tags: ["踩坑记录", "CSS", "HTML"]
---

```
问题     : 使用<sup>标签时，行距变大
解决方式 :
sup{
  font-size:75%;
  line-height:0;
  position:relative;
  vertical-align:baseline;
  top:-0.5em;
}
```
