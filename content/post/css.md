---
title: "CSS 学习笔记"
date: 2019-07-17T22:54:08+08:00
tags: ["学习笔记", "CSS"]
---

## 简单使用

### 简介

> 定义：层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现 HTML（标准通用标记语言的一个应用）或 XML（标准通用标记语言的一个子集）等文件样式的计算机语言。  
> 产生原因：单用 HTML 写出的页面显示的难看。

### 常用样式

#### 字体

- font-family : 字体类型
- font-size : 字体大小

#### 文本

- color : 颜色
- line-height : 行高
- text-align : 对齐
- text-shadow : 设置文字阴影

#### 显示和隐藏

- display
  - none : 隐藏不占位
  - block : 块显示
  - inline : 行内显示
- visibility
  - hidden : 隐藏占位
  - visible : 显示
- opactity : 设置透明度

#### 尺寸

- width : 设置宽度(屏幕自适应宽度 100%)
- height : 设置高度
- max-width
- min-width
- max-height
- min-height

#### 定位

- position
  - absolute : 绝对定位(释放文档流中的位置，第一个定位的父标签左上角是原点)
  - relative : 相对定位(不释放文档流中的位置，自己是原点)
  - fixed : 固定定位
- left : 设置左侧距原点的长度
- top : 设置上方的距原点的长度
- right : 设置右侧距原点的长度
- bottom : 设置底部距原点的距离
- z-index : 定义 z 轴高度(不设置为 0)
- vertical-align : 设置元素的垂直对齐方式。

#### 内外边距

- margin-top : 上部外边距
- margin-right : 右侧外边距
- margin-bottom : 底部外边距
- margin-left : 左侧外边距
- margin(缩写) : 全部、上下/左右、上/左右/下、上/右/下/左
- padding-top : 上部内边距
- padding-right : 右侧内边距
- padding-bottom : 底部内边距
- padding-left : 左侧内边距
- padding(缩写) : 全部、上下/左右、上/左右/下、上/右/下/左

#### 浮动和清除浮动

- float : 设置浮动(只能在浮动之前文档流中的位置的往左或往右浮动)
- clear : 清除浮动(如果一个盒子里的 div 都浮动，就要在添加一个清除浮动的 div 把盒子的位置撑开)

#### 背景

- background-color : 背景颜色
- background-image : 背景图片
- background-repeat : 背景图是否重复
- background-attachment : 背景图片是否固定
- background-position : 背景图片定位(可以使用%和 px 值和英语单词)
- background(缩写形式) : #ccc url('xxx.png') no-repeat fixed 50% 50%
- background-size : 设置背景图片的尺寸
- background-origin : 设置背景图的位置(padding-box\border-box\content-box)

#### 边框

- border-width : 边框粗细
- border-style : 边框样式
- border-color : 边框颜色
- border(缩写形式) : 1px solid #ccc
- border-left : 左侧边框
- border-top : 顶部边框
- border-right : 右侧边框
- border-bottom : 底部边框
- border-radius : 设置圆角
- box-shadow : 设置阴影

#### 鼠标

- cursor : 改变鼠标样式(text\pointer\default\wait\help\crosshair)

#### 表格

- border-collapse : 表格边框是否合并
- border-spacing : 表格边框之间的距离

#### 滚动条

- overflow : 设置滚动条状态(hidden、auto、scroll)

### 选择符

#### 元素选择符

- 通配选择符

```
* { color: #f00; }
```

- 类型选择符

```
p { font-size: 13px; }
```

- ID 选择符

```
#id { color: #f00; }
```

- 类选择符

```
.className { color: #f00; }
```

#### 关系选择符

- 包含选择符

```
ul li { color: #f00; }
```

- 子选择符

```
.test > li > a { color: #f00; }
```

- 相邻选择符

```
p + p { color: #f00; }
```

- 兄弟选择符

```
h3 ~ p { color: #f00; }
```

<style>
table th:first-of-type {
	width: 100px;
}
</style>

#### 属性选择符

| 选择符           | 描述                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| E[att]           | 选择具有 att 属性的 E 元素。                                                                               |
| E[att = "val"]   | 选择具有 att 属性且属性值等于 val 的 E 元素。                                                              |
| E[att ~= "val"]  | 选择具有 att 属性且属性值为一用空格分隔的字词列表，其中一个等于 val 的 E 元素。                            |
| E[att ^= "val"]  | 选择具有 att 属性且属性值为以 val 开头的字符串的 E 元素。                                                  |
| E[att $= "val"]  | 选择具有 att 属性且属性值为以 val 结尾的字符串的 E 元素。                                                  |
| E[att \*= "val"] | 选择具有 att 属性且属性值为包含 val 的字符串的 E 元素。                                                    |
| E[att \|= "val"] | 选择具有 att 属性且属性值为以 val 开头并用连接符"-"分隔的字符串的 E 元素，如果属性值仅为 val，也将被选择。 |

#### 伪类选择符

<table>
	<thead>
		<tr>
			<th>选择符</th>
			<th>版本</th>
			<th>描述</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>E:link</td>
			<td>CSS1</td>
			<td>设置超链接a在未被访问前的样式。</td>
		</tr>
		<tr>
			<td>E:visited</td>
			<td>CSS1</td>
			<td>设置超链接a在其链接地址已被访问过时的样式。</td>
		</tr>
		<tr>
			<td>E:hover</td>
			<td>CSS1/2</td>
			<td>设置元素在其鼠标悬停时的样式。</td>
		</tr>
		<tr>
			<td>E:active</td>
			<td>CSS1/2</td>
			<td>设置元素在被用户激活（在鼠标点击与释放之间发生的事件）时的样式。</td>
		</tr>
		<tr>
			<td>E:focus</td>
			<td>CSS1/2</td>
			<td>设置元素在成为输入焦点（该元素的onfocus事件发生）时的样式。</td>
		</tr>
		<tr>
			<td>E:first-child</td>
			<td>CSS2</td>
			<td>匹配父元素的第一个子元素E。</td>
		</tr>
		<tr>
			<td>E:last-child</td>
			<td>CSS3</td>
			<td>匹配父元素的最后一个子元素E。</td>
		</tr>
		<tr>
			<td>E:only-child</td>
			<td>CSS3</td>
			<td>匹配父元素仅有的一个子元素E。</td>
		</tr>
		<tr>
			<td>E:nth-child(n)</td>
			<td>CSS3</td>
			<td>匹配父元素的第n个子元素E。</td>
		</tr>
		<tr>
			<td>E:empty</td>
			<td>CSS3</td>
			<td>匹配没有任何子元素（包括text节点）的元素E。</td>
		</tr>
		<tr>
			<td>E:checked</td>
			<td>CSS3</td>
			<td>匹配用户界面上处于选中状态的元素E。(用于input type为radio与checkbox时)</td>
		</tr>
		<tr>
			<td>E:disabled</td>
			<td>CSS3</td>
			<td>匹配用户界面上处于禁用状态的元素E。</td>
		</tr>
	</tbody>
</table>

#### 伪对象选择符

| 选择符          | 描述                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| E::first-letter | 设置对象内的第一个字符的样式。                                              |
| E::first-line   | 设置对象内的第一行的样式。                                                  |
| E::before       | 设置在对象前（依据对象树的逻辑结构）发生的内容。用来和 content 属性一起使用 |
| E::after        | 设置在对象后（依据对象树的逻辑结构）发生的内容。用来和 content 属性一起使用 |
| E::placeholder  | 设置对象文字占位符的样式。                                                  |
| E::selection    | 设置对象被选择时的颜色。                                                    |

### 参考

> [CSS 手册](http://css.doyoe.com/)

## 值得一提

### 几种颜色的表示方式

- 英语表示
- 十进制表示 : rgb();
- 十六进制表示 : #000000;
- 带透明度十进制 : rgba();

### CSS3 伪对象选择符的变化

> CSS3 将伪对象选择符(Pseudo-Element Selectors)前面的单个冒号(:)修改为双冒号(::)用以区别伪类选择符(Pseudo-Classes Selectors)，但以前的写法仍然有效。
