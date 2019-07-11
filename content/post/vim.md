---
title: "Vim"
date: 2019-07-11T22:40:41+08:00
tags: ["开发工具"]
---

## Vim的四种模式
### Normal模式
- Normal模式可以进行各种命令操作和移动
- 大部分情况下你是浏览而不是编辑，所以Vim默认是Normal模式

### Insert模式
- Insert模式和普通编辑器差不多用来做文本输入
- 使用i(insert)、a(append)、o(open a line below)、I、A、O、gi(回到最后一次编辑的位置) 进入Insert模式
- Esc从Insert模式退回到Normal模式

### Command模式
- Command模式用来执行Vim命令
- 保存退出 :wq
- 分屏 :vs(vertical split)、sp(split)
- 全局替换 :% s/foo/bar/g

### Visual模式
- Normal模式下使用v进入visual选择
- 使用V选择行
- 使用ctrl+v进行方块选择

## 移动
- j:下移一字符
- k:上移一字符
- h:左移一字符
- l:右移一字符
- w/W:移动到下一个单词开头（WORD将空白符分割的识别为单词）
- b(backword)/B:回到上一个单词开头
- e(endWord)/E:移动到单词的结尾
- f{char}(find)/F(向前搜索):行间搜索一个字符并跳转到该字符(;下一个 ,上一个)
- 0:移动到行首(0w移动到行首第一个非空白字符)
- $:移动到行尾
- gg:移动到文件开头
- G:移动到文件结尾
- ctrl+o:移动到上一个位置
- zz:把光标行置为屏幕中间

## 增删改查
### Normal
#### 删
- x:删除一个字符
- d[[a/i]w(删除一个单词)/0(删除到行首)/$(删除到行尾)/t{char}(删除到输入字符)]
- [num]dd:删除num行

#### 改
- r:修改一个字符
- c[[a/i]w/0/$/t{char}]:删除后进入插入模式

#### 查
- *:当前单词向前匹配
- #:当前单词向后匹配

### Command
#### 查
- /:向后搜索(n/N:跳转到下一个/上一个匹配)
- ?:向前搜索

#### 改
\[range:%(全部)]s[ubstitute]/{pattern}/{string}/[flags:g/c/n]

## 宏
使用`q<register>`开始录制，可以进行insert和normal模式下的正常操作，`q`结束录制。使用`@<register>`在当前行执行宏命令。使用V选中多行:进入命令模式输入`normal @<register>`在选中行执行宏命令。

## 插件(快捷键部分为自用)
### vim-plug
插件管理

### ale
代码静态检查

### vim-startify
启动画面，查看最近编辑文件

### vim-easymotion
编辑区快速移动
```
<leader><leader>s{char} 搜索跳转
<leader><leader>w 跳转到后面的单词首字母
<leader><leader>b 跳转到前面的单词首字母
```

### nerdtree
文件目录树
```
<space>nt : 打开或关闭目录树
<space>nf : 跳转到当前文件在目录树的位置
```

### tabular
快速对齐  
`Shift + v` 选中多行，使用`:'<,'> Tab/{string}` 按等号、冒号、表格对齐文本。

### vim-signature
快速标记插件
```
m[a-zA-Z] : 打标签
'[a-zA-Z] : 跳转到标签位置
'.        : 跳转到最后一次修改位置
m<space>  : 去除所有标签
```

### vim-choosewin
窗口跳转   
使用 `ALT+e` 会在不同窗口/标签上显示 A/B/C 等编号，然后字母直接跳转

### vim-expand-region
使用`Alt + +`或`Alt + -`扩大或缩小选中区域

### vim-sorround
成对编辑
```
ys iw {char} 增加
cs {oldChar} {newChar} 修改
ds {char} 删除
```

### leaderF/ctrlp.vim/fzf.vim
文件搜索
```
<c-p> : 文件模糊匹配
<c-n> : 打开最近使用过的文件
<m-n> : 打开buffer模糊匹配
:Ag [PATTERN] : 内容搜索
```

### far.vim
文本替换
```
:Far <oldString> <newString>  <path : **/*.js>
:Fardo : 确认替换
```

### neoformat
代码格式化
```
<space>s : 格式化同时保存
```

### vim-commentary
代码注释
```
gcc : 注释
gc : 取消注释
```

### vim-relativity
相对行号

## 应用场景
### Insert模式快速纠错
- ctrl + h : 删除上一个字符
- ctrl + w : 删除上一个单词
- ctrl + u : 删除当前行插入位置之前的内容

### 搜索替换
- 全局替换:`%s/target/word/g`
- 精确匹配(不匹配包含)替换:`%s/\<target\>/word/g`

### Vim多文件操作
#### 概念
Buffer指打开的一个文件的内存缓冲区
Window是Buffer的可视化分割区域
Tab可以组织窗口作为一个工作区

#### 相关命令
##### Buffer
- :ls : 列举当前缓冲区
- :b<n> : 跳转到第n个缓冲区
- :bpre、bnext、bfirst、blast
- :b <buffer_name>

##### Window
- <Ctrl + w>s : 水平分割
- <Ctrl + w>v : 垂直分割
- <Ctrl + w>w : 窗口切换
- <Ctrl + w>[h,j,k,l] : 窗口切换
- <Ctrl + w>[H,J,K,L] : 窗口移动

##### Tab
- :tabe <filename> 在新标签页中打开文件
- <Ctrl + w>T : 把当前窗口移动到新标签页
- :tabc[lose] : 关闭当前页及其中所有窗口
- :tabo[nly] : 自保留活动标签页，关闭其它
- :tabn[ext] : 切换标签页
- gt : 切换标签页

### 操作系统剪切板
Vim中使用 delete yank put 操作时会使用寄存器保存内容，不指定的话就是无名寄存器和寄存器0。其它还有a-z寄存器。+寄存器代表系统剪切板。复制到系统剪切板可以`"+y`,从系统剪切板粘贴为`"+p`。

### Vim补全
- `Ctrl + n`/`Ctrl + p` : 补全单词
- `Ctrl + x`/`Ctrl + f` : 补全文件名
- `Ctrl + x`/`Ctrl + o` : 补全代码(需要插件)

### 配色修改
- `:colorscheme` : 显示当前配色
- `:colorscheme <Ctrl + d>` : 列出可选配色
- `:colorscheme <name>` : 修改配色

### 配置
Linux/Unix 下新建一个隐藏文件 `vim ~/.vimrc`
Windows 下使用`$MYVIMRC`来定位配置文件位置

### 映射
- :\[n(normal生效)/v(visual生效)/i(insert生效)\][nore(非递归映射)]map <target\_key\_sequence> <source\_key\_sequence> : 创建源操作映射为目标操作，比如`:map - x`，然后按`-`就会删除字符
