---
title: "HTML 学习笔记"
date: 2019-07-17T22:44:04+08:00
tags: ["学习笔记", "HTML"]
---

## 简单使用

### 简介

> 定义：超文本标记语言，“超文本”就是指页面内可以包含图片、链接，甚至音乐、程序等非文字元素。  
> 产生原因：网络中非文本数据的需要展示。

### 常用标签

#### 基础标签

- <!DOCTYPE> : 定义文档类型。
- \<h1> - \<h6> : 定义 HTML 标题。
- \<p> : 定义段落
- \<br> : 定义换行符
- \<hr> : 定义水平线
- \<!--注释代码--->

#### 格式标签

- \<b> : 定义粗体文本。
- \<i> : 定义斜体文本。
- \<pre> : 定义预格式文本。

#### 表单标签

- \<from> : 标签创建供用户输入的表单。
  - action : 定义一个 URL。当点击提交按钮时，向这个 URL 发送数据。
  - method : 用于向 action URL 发送数据的 HTTP 方法。默认是 get。(通常应该使用 POST)
  - enctype : 用于对表单内容进行编码的 MIME 类型。(当表单中含有文件时，使用 enctype="multipart/form-data"表明为多部分表单数据)
- \<input> : 标签定义输入字段，用户可在其中输入数据。
  - type : 指示 input 元素的类型。
  - name : 为 input 元素定义唯一的名称。
  - value : 对于按钮、重置按钮和确认按钮：定义按钮上的文本。对于复选框和单选按钮：定义 input 元素被点击时的结果。
  - required : 定义输入字段的值是否是必需的。
  - maxlength : 定义文本域中所允许的字符最大数目。
  - readonly : 指示是否可修改该字段的值。(提交表单时值会被提交)
  - disabled :当 input 元素首次加载时禁用此元素，这样用户就无法在其中写文本，或选定它。(提交表单时值不会提交)
  - placeholder : 定义占位字符。
- \<textarea> : 定义一个文本区域 (text-area) （一个多行的文本输入区域）。
  - cols : 规定文本区内可见的列数。
  - rows : 规定文本区内可见的行数。
- \<button> : 定义按钮。
- \<select> : 标签创建下拉列表。
  - name : 定义下拉列表的唯一标识符。
- \<option> : 定义下拉列表中的一个选项。
- \<label> : 定义控件的标注。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。

#### 列表标签

- \<ul> : 定义无序列表
- \<li> : 定义列表项

#### 表格标签

- \<table> : 定义表格
  - border : 设置表格的边框的 px 值。
  - cellspacing : 设置表格边框的空隙的 px 值。
- \<tr> : 定义表格中的行
- \<th> : 表格内的表头单元格
- \<td> : 定义表格中的一个单元格
  - colspan : 规定此单元格可横跨的列数。
  - rowspan : 规定此单元格可横跨的行数。

#### 其他标签

- \<a> : 标签定义超链接，它用于从一个页面连接到另一个页面。
  - href : 链接的目标 URL。
  - target : 在何处打开目标 URL。
- \<img> : 标签定义图像。
  - alt : 图片加载失败时显示的的提示文字。
  - src : 图片地址。
  - width : 定义图片的宽度
  - height : 定义图片的高度。
- \<link> : 定义文档与外部资源的关系。
- \<script> : 定义一段脚本

### 常用事件

#### 窗口事件

- onload : 当文档被载入时执行脚本
- onunload : 当文档被卸下时执行脚本

#### 表单事件

- **onchange** : 当元素改变时执行脚本
- onsubmit : 当表单被提交时执行脚本
- onreset : 当表单被重置时执行脚本
- onselect : 当元素被选取时执行脚本
- **onblur** : 当元素失去焦点时执行脚本
- **onfocus** : 当元素获得焦点时执行脚本

#### 键盘事件

- **onkeydown** : 当键盘被按下时执行脚本
- onkeypress : 当键盘被按下后又松开时执行脚本
- onkeyup : 当键盘被松开时执行脚本

#### 鼠标事件

- **onclick** : 当鼠标被单击时执行脚本
- ondblclick : 当鼠标被双击时执行脚本
- onmousedown : 当鼠标按钮被按下时执行脚本
- onmousemove : 当鼠标指针移动时执行脚本
- onmouseout : 当鼠标指针移出某元素时执行脚本
- onmouseover : 当鼠标指针悬停于某元素之上时执行脚本
- onmouseup : 当鼠标按钮被松开时执行脚本

### 参考

> [HTML 手册](http://t.mb5u.com/html/)

## 值得一提

### 搜索引擎相关

```
<title>标签内的文字是搜索引擎最主要的搜索关键字;
<meta name="keywords" content="XXX|XXX|XXX"/>
此meta标签的content属性里也是搜索引擎的关键字。
<meta name="description" content="xxxxxx"/>
此meta标签的content属性是搜索引擎显示的网站描述。
```

### URL 的组成部分

```
URL 的英文全称是 Uniform Resource Locator，中文也译为“统一资源定位符”,遵守的语法规则：scheme://host.domain:port/path/filename
scheme   : 定义因特网服务的类型。最常见的类型是 http
host     : 定义域主机（http 的默认主机是 www）
domain   : 定义因特网域名，比如w3school.com.cn
port     : 定义主机上的端口号（http 的默认端口号是 80）
path     : 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）。
filename : 定义文档/资源的名称
```
