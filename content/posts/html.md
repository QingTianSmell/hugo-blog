---
title: "HTML 知识总结"
date: 2019-07-17T22:44:04+08:00
tags: ["语言"]
---

## 简介

HTML 是一种用来描述网页的超文本标记语言，而不是编程语言，超文本就是指可以包含图片、链接，甚至音乐、程序等非文字元素。HTML 使用标记来描述网页，使用事件来处理交互。

## 基础
### 文档结构

```html
<!-- 声明HTML文档 -->
<!DOCTYPE html>
<!-- 语言，中文简体：zh-Hans，中文繁体：zh-Hant -->
<html lang="en">
  <!-- 文档头部，设置文档编码集，引入的css、Script等 -->
  <head>
    <!-- meta标签设置网页中的元数据 -->
    <!-- 字符集 -->
    <meta charset="UTF-8" />
    <title>网页标题</title>
    <!-- CSS引入 -->
    <link rel="stylesheet" href="style.css" />
    <!-- JS引入 -->
    <script src="script.js"></script>
  </head>
  <body>
    <!-- 文档主体 -->
    <!-- 主要放置html标签 -->
  </body>
</html>
```

### 元素

元素是标签、标签的属性与其包装的内容的总称。

#### 简单的了解一下元素属性

元素属性包含元素的额外信息，这些信息不会出现在实际的内容中,HTML 属性大致分为 3 类：全局属性(id、class、style、title)、某一类元素属性、某一个元素属性。HTML 属性写在 HTML 元素开始标签中，与标签名用空格分隔，然后就是我们元素的属性，属性一般为属性名="属性值"，属性值必须用双引号包裹，也有单独出现的属性如 input 的布尔属性 disabled。

#### 块级元素和行内元素

在 HTML 中有两种你需要知道的重要元素类别，块级元素和行内元素。

块级元素默认占据整行宽度，在页面中以块的形式展现 —— 相对与其前面的内容它会出现在新的一行，其后的内容也会被挤到下一行展现。块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。一个以 block 形式展现的块级元素不会被嵌套进行内元素中，但可以嵌套在其它块级元素中，如(p、div、hn、ul、ol、li)。

行内元素同行显示，默认宽度由内容决定，通常出现在块级元素中并包裹文档内容的一小部分，而不是一整个段落或者一组内容。行内元素不会导致文本换行：它通常出现在一堆文字之间例如超链接元素或者强调元素。

#### 常用基础元素

- 标题
  ```html
  <h1>这是H1标签，块级标签</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <h4>H4</h4>
  <h5>H5</h5>
  <h6>H6</h6>
  ```
- 段落
  ```html
  <p>这是段落，块级标签，自动换行</p>
  <p>段落2</p>
  ```
- 图片
  ```html
  <img src="图片地址" alt="图片描述" width="50" height="50" />
  ```
- 超链接
  ```html
  <a href="地址" target="_blank">这是超链接</a>
  ```
- 包裹分隔块级元素
  ```html
  <div>
    <h2>区块标题</h2>
    <p>区块描述文字</p>
  </div>
  ```
- 包裹分隔行内元素
  ```html
  <span>作者：xxx</span>
  <span>发布时间：xx-xx-xx</span>
  <span>浏览量：xxxx</span>
  ```

#### 列表元素

- 有序列表
  ```html
  <ol>
    <li>苹果</li>
    <li>香蕉</li>
    <li>菠萝</li>
    <li>西瓜</li>
    <li>芒果</li>
  </ol>
  ```
- 无序列表
  ```html
  <ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>菠萝</li>
    <li>西瓜</li>
    <li>芒果</li>
  </ul>
  ```

#### 表格元素

标题（caption）、表头单元格（th）、头部（thread）、主体（tbody）、行（tr）、单元格（td）、底部（tfoot）

```html
<!--
  cellspacing——单元格间距，单元格之间的距离
  cellpadding——单元格边距，单元格与边框之间的距离
-->
<table border="1" cellspacing="0" cellpadding="5">
  <caption>
    成绩表
  </caption>
  <thead>
    <tr>
      <td>First Name</td>
      <td>Last Name</td>
      <td>Points</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
    <tr>
      <td>Adam</td>
      <td>Johnson</td>
      <td>67</td>
    </tr>
    <tr>
      <td colspan="2">跨列的表格</td>
      <td>100</td>
    </tr>
    <tr>
      <td rowspan="2">跨行的表格</td>
      <td>99</td>
      <td>99</td>
    </tr>
    <tr>
      <td>88</td>
      <td>88</td>
    </tr>
    <tr>
      <td rowspan="2" colspan="2">跨行又跨列的表格</td>
      <td>22</td>
    </tr>
    <tr>
      <td>11</td>
    </tr>
  </tbody>
</table>
```

#### 表单元素

表单标签的属性

| 属性名称                            | 描述                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `name`                              | 表单的名称                                                                |
| `action`                            | 表单数据接受地址                                                          |
| `target`                            | 打开 url 的方式，`_blank` 新窗口，`_self` 当前窗口                        |
| `method`                            | 数据传送方法，get:通过 url 地址传送参数,网址中可以看到数据，post:后台传送 |
| `enctype`                           | 发送前如何将数据进行编码，仅与 method="post"配对使用                      |
| `application/x-www-form-urlencoded` | 默认值，发送前对所有字符进行编码：空格转+号，特殊字符传 ASCII 16 进制值   |
| `multipart/form-data`               | 不对发送字符进行编码，在上传文件时，必须设置                              |
| `text/plain`                        | 纯文本方式，仅将空格转为"+"号，不对特殊字符编码                           |

表单域`<input>`的属性

| 属性名称  | 描述                                                        |
| --------- | ----------------------------------------------------------- |
| type      | 元素的类型，如 text 文本框、radio 单选按钮、select 下拉框等 |
| name      | 元素的名称，主要用于服务端数据传送                          |
| value     | 元素的默认值，可当占位符                                    |
| size      | 以字符计算的元素可见宽度，注意，不是像素或百分比            |
| maxlength | 元素允许的最大字符长度                                      |
| disabled  | 禁用该控件，此时，既不能选择，也不能点击                    |
| readonly  | 该控件字段内容只读，不允许修改                              |

```html
<!-- 单行文本 -->
<input type="text" name="MyName" value="不能为空" />
<!-- 密码 -->
<input type="password" name="pwd" id="pwd" />
<!-- 单选按钮 -->
<input type="radio" name="gender" id="male" value="male" checked />男
<input type="radio" name="gender" id="female" value="female" />女
<!-- 复选框 -->
<input type="checkbox" name="language" id="php" value="php" checked />
<input type="checkbox" name="language" id="java" value="java" />
<!-- 自定义按钮 -->
<input type="button" value="点击" />
<!-- 提交按钮 -->
<input type="submit" value="提交" />
<!-- 重置按钮 -->
<input type="reset" value="重置" />
<!-- 文件上传 -->
<form action="" method="post" enctype="multipart/form-data">
  <!-- 支持批量上传 -->
  <input type="file" name="file" id="file" multiple />
</form>
<!-- 图像按钮 -->
<input type="image" src="url" alt="图片说明" />
<!-- 隐藏字段 -->
<!-- 用于存储一些字段的默认值，如ID，用户不可见 -->
<input type="hidden" name="id" value="1" />

<!-- 下拉框 -->
<select name="address" id="address">
  <option value="bj" selected>北京</option>
  <option value="">上海</option>
  <option value="">天津</option>
  <option value="">广州</option>
  <option value="">深圳</option>
  <option value="">重庆</option>
</select>

<!-- 下拉框分组 -->
<select name="address" id="address">
  <optgroup label="直辖市">
    <option value="bj" selected>北京</option>
    <option value="">上海</option>
    <option value="">天津</option>
    <option value="">重庆</option>
  </optgroup>
  <optgroup label="省级">
    <option value="">广州</option>
    <option value="">深圳</option>
  </optgroup>
</select>

<!-- label标签 -->
<!-- label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。
如果您在 label 元素内点击文本，就会触发此控件。
就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。-->
<form action="" method="post" name="form">
  <label for="MyName">姓名：</label>
  <input type="text" name="MyName" id="MyName" placeholder="请输入姓名" />
</form>
<div>
  <label
    >姓名：<input
      type="text"
      name="MyName1"
      id="MyName1"
      placeholder="请输入姓名"
  /></label>
</div>

<!-- 文本域 -->
<!--
cols:每行最多多少个字符
rows:可以显示多少行
resize:
    both:默认值
    none:不允许调整尺寸
    horizontal:仅允许水平调整宽度
    vertical:仅允许垂直调整高度 
-->
<textarea
  name="message"
  id="message"
  cols="30"
  rows="10"
  style="resize: both;"
></textarea>
```

#### 媒体元素
##### 视频

| 属性名称 | 描述                                                                                        |
| -------- | ------------------------------------------------------------------------------------------- |
| autoplay | 自动播放                                                                                    |
| controls | 向用户显示控件，如播放按钮                                                                  |
| height   | 高度                                                                                        |
| width    | 宽度                                                                                        |
| loop     | 循环播放                                                                                    |
| muted    | 静音                                                                                        |
| poster   | 未开始播放时显示的图像                                                                      |
| preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| src      | 地址                                                                                        |

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  您的浏览器不支持 video 标签。
</video>
```

##### 音频

| 属性名称 | 描述                                                                                        |
| -------- | ------------------------------------------------------------------------------------------- |
| autoplay | 自动播放                                                                                    |
| controls | 向用户显示控件，如播放按钮                                                                  |
| loop     | 循环播放                                                                                    |
| muted    | 静音                                                                                        |
| preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| src      | 地址                                                                                        |

```html
<audio controls>
  <source src="horse.ogg" />
  <source src="horse.mp3" />
  您的浏览器不支持 audio 元素。
</audio>
```

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

### HTML 字符实体

在 HTML 中，某些字符是预留的不能直接使用，如小于号（\<）和大于号（\>），直接使用会误认为它们是标签。

所以如果我们希望正确地显示预留字符，那必须在 HTML 源代码中使用字符实体（character entities）。

| 显示结果 | 描述     | 实体名称  |
| -------- | -------- | --------- |
|          | 空格     | `&nbsp;`  |
| `<`      | 小于号   | `&lt;`    |
| `>`      | 大于号   | `&gt;`    |
| `&`      | 和号     | `&amp;`   |
| `©`      | 版权符号 | `&copy;`  |
| `×`      | 乘号     | `&times;` |

## 扩展
### 深入了解 head 元素

`<head>` 元素用于定义网页的常规信息和元数据，虽然在网页中不可见，但是也是非常的重要。总得来说其里面的子元素大概分为三类，分别是：描述网页基本信息的，指向渲染网页需要其他文件链接的，各大厂商根据自己需要定制的。

#### 网页基本信息

一个网页，首先得有个标题，就跟人有名字一样。除此之外，还可以根据实际需要补充一些基本信息。

- 文档标题（浏览器标签中显示的文本）：
  ```html
  <title>深入了解 head 元素</title>
  ```
- 编码格式：
  ```html
  <meta charset="utf-8" />
  ```
- 视窗设置：
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ```
- 搜索引擎优化相关内容：
  ```html
  <meta name="keywords" content="学习,前端,html,笔记" />
  <meta name="description" content="告诉搜索引擎网站的基本简介" />
  ```
- IE 浏览器版本渲染设置：
  ```html
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  ```

#### 其他文件链接

一个完整的网页光有 HTML 结构是非常简陋的，就如一个毛坯房。有了结构之后，我们还需要加入样式与行为为网页增添色彩。

- CSS 文件：`<link>` 元素经常位于文档的头部，用于引入样式文件
  ```html
  <link rel="stylesheet" type="text/css" href="style.css" />
  ```
- JavaScript 文件：JavaScript 部分没必要非要放在文档头部; 实际上，把它放在文档的尾部（在 `</body>`标签之前）是一个更好的选择 ，这样可以确保在加载脚本之前浏览器已经解析了 HTML 内容（如果脚本加载某个不存在的元素，浏览器会报错）。
  ```html
  <script src=“script.js"></script>
  ```

#### 厂商定制

比如开启双核浏览器先河的 360 浏览器就定制了一个默认使用哪个内核来渲染页面，可以设置为 webkit 内核、IE 标准，IE 兼容三种模式。代码分别为：

```html
<!-- 默认webkit内核 -->
<meta name="renderer" content="webkit" />
<!-- 默认IE标准模式 -->
<meta name="renderer" content="ie-stand" />
<!-- 默认IE兼容模式 -->
<meta name="renderer" content="ie-comp" />
```

同样分享页面到 QQ 的聊天窗口，有些页面直接就是一个链接，但是有些页面有标题，图片，还有文字介绍。为什么区别这么明显呢？其实就是看有没有设置下面这三个内容（具体参阅：[腾讯移动 WEB 开发平台](https://open.mobile.qq.com/api/mqq/index)）。

```html
<meta itemprop="name" content="这是分享的标题" />
<meta
  itemprop="image"
  content="http://imgcache.qq.com/qqshow/ac/v4/global/logo.png"
/>
<meta name="description" itemprop="description" content="这是要分享的内容" />
```

#### HTML meta 标签总结与属性使用介绍

参考 [HTML meta 标签总结与属性使用介绍](https://segmentfault.com/a/1190000004279791)

### !DOCYTYPE 声明

Web 世界中存在许多不同的文档。只有了解文档的类型，浏览器才能正确地显示文档。
HTML 也有多个不同的版本，只有完全明白页面中使用的确切 HTML 版本，浏览器才能完全正确地显示出 HTML 页面。这就是`<!DOCTYPE>`的用处。
`<!DOCTYPE>`不是 HTML 标签。它为浏览器提供一项信息（声明），即 HTML 是用什么版本编写的。

`<!DOCYTYPE>`是 HTML5 的版本声明

## 应用场景
### 如何给 DIV 添加onblur事件
#### div添加onblur事件

一般情况下，onblur事件只在input等元素中才有，而div却没有，因为div本身就没有focus的状态(因为div没有tabindex属性)，所以要给div加上此属性。

#### focus状态样式变化

定义tabindex属性后，元素是默认会加上焦点虚线的，那么在IE中可以通过hidefocus="true"去除！其他浏览器通过outline=0进行去除！  
```html
<div tabindex="0" hidefocus="true" onfocus='alert("得到焦点");' onblur='alert("失去焦点");' style="border:1px solid  #ccc;width:200px;height:200px;outline=0;"></div>
```

#### div内包含其他可以focus的元素的情况(如果是内部的元素导致的onblur不进行操作)

获取触发onblur时的焦点元素(点击的元素)，如果是自身或者子元素，就不进行操作。
```js
if(relatedTarget != null && ($(relatedTarget).hasClass("select_m_r_box") || $(relatedTarget).parents(".select_m_r_box").size() > 0)){
    return;
}
```

#### 获取焦点元素的浏览器兼容问题(IE坑爹)

IE获取触发onblur的相关目标的方式和其他浏览器不同
```js
let relatedTarget = event.relatedTarget;
if(relatedTarget === null){
    relatedTarget = document.activeElement;
}
```

## 参考

> [HTML 手册](http://t.mb5u.com/html/)  
> [HTML——学习笔记](https://imweb.io/topic/5b169935d4c96b9b1b4c4ec1)  
> [HTML meta 标签总结与属性使用介绍](https://segmentfault.com/a/1190000004279791)  
> [GET 和 POST 两种基本请求方法的区别](https://www.cnblogs.com/logsharing/p/8448446.html)  
> [div添加onblur事件、focus状态样式变化](https://www.cnblogs.com/klbc/p/5303134.html)  
> [获取焦点元素的浏览器兼容问题](https://stackoverflow.com/questions/41298948/how-to-use-relatedtarget-or-equivalent-in-ie)
