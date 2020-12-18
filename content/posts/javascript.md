---
title: "JavaScript 知识总结"
date: 2019-07-18T22:04:47+08:00
tags: ["程序开发","前端","知识总结"]
---

<!-- vim-markdown-toc GitLab -->

* [基础](#基础)
  * [简介](#简介)
  * [语法](#语法)
    * [变量类型](#变量类型)
    * [关键字](#关键字)
    * [运算符](#运算符)
    * [函数的定义](#函数的定义)
  * [常用对象](#常用对象)
    * [内建对象](#内建对象)
    * [HTML DOM 对象](#html-dom-对象)
    * [HTML BOM 对象](#html-bom-对象)
    * [AJAX 对象](#ajax-对象)
  * [常用全局方法](#常用全局方法)
* [扩展](#扩展)
  * [ES6](#es6)
    * [定义相关](#定义相关)
    * [函数相关](#函数相关)
    * [数组对象常用新增方法](#数组对象常用新增方法)
    * [模板字符串](#模板字符串)
  * [构造 Date 对象的字符串格式问题](#构造-date-对象的字符串格式问题)
* [参考](#参考)

<!-- vim-markdown-toc -->

# 基础

## 简介

> 定义：JavaScript 一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言。  
> 产生原因：网页没有复杂交互行为。

## 语法

### 变量类型

- number
- string
- boolean
- object
- function
- null
- undefined

### 关键字

- 流程控制
  - return
  - continue
  - break
  - do
  - while
  - for
  - if
  - else
  - switch
  - case
- 定义
  - var ：定义变量
  - let : 不可重复声明、块级作用域(ES6+)
  - const : 不可重复声明、块级作用域(ES6+)
  - function
  - new
- 异常处理
  - try ：测试代码块的错误
  - catch：处理错误
  - finally
  - throw ：创建自定义错误
- 类型判断
  - typeof
  - instanceof
- 其他

  - this
  - in : 与 for 一起使用用于遍历对象的属性名或判断某个对象是否具有某个属性
  - delete : 删除对象的某个属性，只能删除自身定义的公有属性，即"this.属性名"定义的属性，而不能删除私有属性或通过 proptotype 定义的公有属性（已实践）。此外可删除直接在对象上添加的属性，如`var a = new Object();a.name = "name"; delete a.name;`
  - with : 引用一个对象，使访问属性与方法更加方便（只能访问与修改属性，不能增加属性与方法）

### 运算符

- 数学运算符 : +,-,\*,/,%
- 比较运算符 : >,<,\==,!=,>=,<=,=\==,!==
- 逻辑运算符 : &&,||,!
- 位操作符 : ^,~,&,|,<<,>>,>>>

### 函数的定义

- 正常方式`function mysum(num1,num2){return num1+num2;}`
- 直接量/匿名方式`var mysum = function(num1,num2){return num1+num2;}`
- 构造器方式`new Function("num1","num2","return num1+num2;")`
- 箭头函数(ES6)

## 常用对象

### 内建对象

- Math
- Date
  - getTime() : 获取毫秒值
- String
  - length : 字符串的长度
  - indexOf() : 检索字符串。
  - substr() : 从起始索引号提取字符串中指定数目的字符。
  - split() : 把字符串分割为字符串数组。
- Array
  - length : 设置或返回数组中元素的数目。
  - join() : 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
  - push() : 向数组的末尾添加一个或更多元素，并返回新的长度。
  - splice() : 删除元素，并返回删除元素
- RegExp
  - 修饰符
    - i : 执行对大小写不敏感的匹配。
    - g : 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
  - 中括号
    - [abc] : 查找方括号之间的任何字符。
    - [^abc] : 查找任何不在方括号之间的字符。
    - [0-9] : 查找任何从 0 至 9 的数字。
    - [a-z] : 查找任何从小写 a 到小写 z 的字符。
    - [A-Z] : 查找任何从大写 A 到大写 Z 的字符。
    - [A-z] : 查找任何从大写 A 到小写 z 的字符。
  - 元字符
    - . : 查找单个字符，除了换行和行结束符。
    - \w : 查找任意一个字母、数字或下划线字符。
    - \W : 查找非\w 字符。
    - \d : 查找数字。
    - \D : 查找非数字字符。
    - \s : 查找空白字符。
    - \S : 查找非空白字符。
    - \b : 匹配单词边界。
    - \B : 匹配非单词边界。
  - 量词
    - n+ : 匹配任何包含至少一个 n 的字符串。
    - n\* : 匹配任何包含零个或多个 n 的字符串。
    - n? : 匹配任何包含零个或一个 n 的字符串。
    - n{X} : 匹配包含 X 个 n 的序列的字符串。
    - n{X,Y} : 匹配包含 X 至 Y 个 n 的序列的字符串。
    - n{X,} : 匹配包含至少 X 个 n 的序列的字符串。
    - n\$ : 匹配任何结尾为 n 的字符串。
    - ^n : 匹配任何开头为 n 的字符串。
    - ?=n : 匹配任何其后紧接指定字符串 n 的字符串。
    - ?!n : 匹配任何其后没有紧接指定字符串 n 的字符串。

### HTML DOM 对象

- document
  - document.getElementById() : 返回对拥有指定 id 的第一个对象的引用。
- element
  - id : 设置或者返回元素的 id。
  - className : 设置或返回元素的 class 属性
  - style : 设置或返回元素的样式属性
  - title : 设置或返回元素的 title 属性
  - getAttribute() : 返回指定元素的属性值
  - setAttribute() : 设置或者改变指定属性并指定值
  - innerHTML : 设置或者返回元素的内容
  - outerHTML : 设置或返回元素的全部内容包括标签部分
  - clientHeight : 在页面上返回内容的可视高度（不包括边框，边距或滚动条）
  - clientWidth : 在页面上返回内容的可视宽度（不包括边框，边距或滚动条）
  - scrollHeight : 返回整个元素的高度（包括带滚动条的隐蔽的地方）
  - scrollTop : 返回滚动的高度

### HTML BOM 对象

- window
  - alert() : 显示带有一段消息和一个确认按钮的警告框。
  - setInterval(函数,毫秒数) : 每隔一段时间执行函数
  - clearInterval(定时器对象) : 结束定时器
  - setTimeout(函数,毫秒数) : 一段时间后执行函数
  - clearTimeout(超时器对象) : 结束超时器
- location
  - href : 返回完整的 URL(直接使用 location 就相当于调用这个属性)
- history
  - back() : 加载 history 列表中的前一个 URL
  - forward() : 加载 history 列表中的下一个 URL
  - go() : 加载 history 列表中的某个具体页面
- screen
  - availHeight : 返回屏幕的高度（不包括 Windows 任务栏）
  - availWidth : 返回屏幕的宽度（不包括 Windows 任务栏）
  - height : 返回屏幕的总高度
  - width : 返回屏幕的总宽度
- navigator
  - userAgent : 返回由客户机发送服务器的 user-agent 头部的值

### AJAX 对象

- ActiveXObject
- XMLHttpRequest

## 常用全局方法

- parseInt() : 字符串转换整型
- eval() : 执行字符串表达式，如果是变量需要加上括号：eval("("+var+")")
- encodeURI(string)：对 URI 字符串进行 UTF-8 的编码


# 扩展

## ES6

### 定义相关

- let : 不可重复声明、块级作用域
- const : 不可重复声明、块级作用域
- 解构赋值
  - 左右两边结构必须一致
  ```
  let [a,b,c] = [1,2,3];
  let {a,b,c} = {a:1,b:2,c:3};
  ```
  - 右边必须符合语法
  ```
  let {a,b,c} = {1,2,3};//错误
  ```
  - 声明和赋值不能分开

### 函数相关

- 箭头函数`(args) => { code... }`
  - 如果只有一个参数 `()` 可以省
  - 如果只有一个 `{return }` 可以省
  - 箭头函数不会绑定 this。 或则说箭头函数不会改变 this 本来的绑定。
- 多参数收集`(...args)`
  - 将函数的剩余参数接收到一个数组，必须是最后一个参数。
- 多参数展开`...args`
  - 将 args 的内容展开成 a,b,c 的形式。
- 默认参数`function(a=1){ code...}`

### 数组对象常用新增方法

- map(callback) : 映射函数
- reduce(callback) : 汇总函数
- filter(callback) : 过滤函数

### 模板字符串

- 用 \`str\` 反单引号定义字符串
- 可以在其中使用 \${var} 嵌入变量(未定义报错)，如果嵌入的是对象会调用其 toString()方法。
- 可以折行
- 可以嵌套

## 构造 Date 对象的字符串格式问题

JavaScript 构造 Date 对象时要传的字符串标准格式为 `yyyy/MM/dd HH:mm:ss`，正常情况下日期字符串的格式为 `yyyy-MM-dd HH:mm:ss` ，无法直接使用(Chrome 可以，IE 不可以)。需要字符串替换后使用 `replace(/-/g,"/")`。

# 参考

> [JavaScript 手册](http://www.goodxyx.com/tool/jschm.html)
