---
title: "Vim 的使用"
date: 2019-07-11T22:40:41+08:00
tags: ["技","程序开发","工具"]
---

## 常用操作(插件部分为个人配置)

### 搜索/移动

#### Normal

```
j             : 下移一字符
k             : 上移一字符
h             : 左移一字符
l             : 右移一字符
w(word)/W     : 移动到下一个单词开头（WORD 将空白符分割的识别为单词）
b(backword)/B : 回到上一个单词开头
gg            : 移动到文件开头
G             : 移动到文件结尾
zz            : 把光标行置为屏幕中间
*             : 当前单词向前匹配
#             : 当前单词向后匹配
```

#### Command

```
:/ : 向后搜索(n/N : 跳转到下一个/上一个匹配)
:? : 向前搜索
```

#### vim-easymotion

```
<space><space>s{char} : 搜索跳转
<space><space>w       : 跳转到后面的单词首字母
<space><space>b       : 跳转到前面的单词首字母
```

#### nerdtree

```
<space>nt : 打开或关闭目录树
<space>nf : 跳转到当前文件在目录树的位置
```

#### vim-signature

```
m[a-zA-Z] : 打标签
'[a-zA-Z] : 跳转到标签位置
'.        : 跳转到最后一次修改位置
m<space>  : 去除所有标签
```

#### leaderF/ctrlp.vim/fzf.vim

```
<c-p> : 文件模糊匹配
<c-n> : 打开最近使用过的文件
<m-n> : 打开buffer模糊匹配
:Ag [PATTERN] : 内容搜索
```

#### vim-choosewin

使用 `ALT+e` 会在不同窗口/标签上显示 A/B/C 等编号，然后字母直接跳转

### 编辑

#### Normal

```
x       : 删除一个字符
daw     : 删除一个单词
[num]dd : 删除 num 行
r       : 修改一个字符
~       : 修改大小写
```

#### Insert

```
ctrl + n : 单词补全
ctrl + h : 删除上一个字符
ctrl + w : 删除上一个单词
ctrl + u : 删除当前行插入位置之前的内容
```

#### neoformat

```
<space>s : 格式化同时保存
```

#### vim-commentary

```
gcc : 注释
gc : 取消注释
```

#### far.vim

```
:Far <oldString> <newString>  <path : **/*.js>
:Fardo : 确认替换
```

#### tabular

`Shift + v` 选中多行，使用`:'<,'> Tab/{string}` 按等号、冒号、表格对齐文本。

#### vim-sorround

```
ys iw {char}           : 增加
cs {oldChar} {newChar} : 修改
ds {char}              : 删除
```

### 选择

#### Normal

```
v : 字符选择
V : 行选择
```

#### vim-choosewin

使用`Alt + +`或`Alt + -`扩大或缩小选中区域

### 宏

使用`q<register>`开始录制，可以进行 insert 和 normal 模式下的正常操作，`q`结束录制。使用`@<register>`在当前行执行宏命令。使用 V 选中多行:进入命令模式输入`normal @<register>`在选中行执行宏命令。

## Vim 的四种模式

### Normal 模式

- Normal 模式可以进行各种命令操作和移动
- 大部分情况下你是浏览而不是编辑，所以 Vim 默认是 Normal 模式

### Insert 模式

- Insert 模式和普通编辑器差不多用来做文本输入
- 使用 i(insert)、a(append)、o(open a line below)、I、A、O、gi(回到最后一次编辑的位置) 进入 Insert 模式
- Esc 从 Insert 模式退回到 Normal 模式

### Command 模式

- Command 模式用来执行 Vim 命令

### Visual 模式

- Visual 模式用来选择 要进行操作的内容

## 插件

```
vim-plug                  : 插件管理
ale                       : 代码静态检查
vim-startify              : 启动画面，查看最近编辑及当前路径下的文件
vim-easymotion            : 编辑区快速移动
nerdtree                  : 文件目录树
tabular                   : 快速对齐
vim-signature             : 快速标记插件
vim-choosewin             : 窗口跳转
vim-expand-region         : 区域选择
vim-sorround              : 成对编辑
leaderF/ctrlp.vim/fzf.vim : 文件搜索
far.vim                   : 文本替换
neoformat                 : 代码格式化
vim-commentary            : 代码注释
vim-relativity            : 相对行号
```

## 应用场景

### Vim 多文件操作

#### 概念

- Buffer 指打开的一个文件的内存缓冲区
- Window 是 Buffer 的可视化分割区域
- Tab 可以组织窗口作为一个工作区

#### 相关命令

##### Buffer

```
:ls   : 列举当前缓冲区
:b<n> : 跳转到第 n 个缓冲区
:bpre、bnext、bfirst、blast
:b <buffer_name>
```

##### Window

```
<Ctrl + w>s         : 水平分割
<Ctrl + w>v         : 垂直分割
<Ctrl + w>w         : 窗口切换
<Ctrl + w>[h,j,k,l] : 窗口切换
<Ctrl + w>[H,J,K,L] : 窗口移动
```

##### Tab

```
:tabe <filename> 在新标签页中打开文件
<Ctrl + w>T    : 把当前窗口移动到新标签页
:tabc[lose]    : 关闭当前页及其中所有窗口
:tabo[nly]     : 自保留活动标签页，关闭其它
:tabn[ext]     : 切换标签页
gt             : 切换标签页
```

### 操作系统剪切板

Vim 中使用 delete yank put 操作时会使用寄存器保存内容，不指定的话就是无名寄存器和寄存器 0。其它还有 a-z 寄存器。+寄存器代表系统剪切板。复制到系统剪切板可以`"+y`,从系统剪切板粘贴为`"+p`。

### Vim 的自动补全

- `Ctrl + n`/`Ctrl + p` : 补全单词
- `Ctrl + x`/`Ctrl + f` : 补全文件名
- `Ctrl + x`/`Ctrl + o` : 补全代码(需要插件)

### Vim 的配色修改

- `:colorscheme` : 显示当前配色
- `:colorscheme <Ctrl + d>` : 列出可选配色
- `:colorscheme <name>` : 修改配色

### VIM 的配置持久化

Linux/Unix 下新建一个隐藏文件 `vim ~/.vimrc`  
Windows 下使用`$MYVIMRC`来定位配置文件位置  
NeoVIM 的配置文件的位置应为`~/AppData/Local/nvim/init.vim` 或 `~/.config/nvim/init.vim`;

### 快捷键映射

`[n(normal生效)/v(visual生效)/i(insert生效)][nore(非递归映射)]map <target_key_sequence> <source_key_sequence>` : 创建源操作映射为目标操作，比如`map - x`，然后按`-`就会删除字符
