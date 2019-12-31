---
title: "Oni Neovim 的 GUI"
date: 2019-08-26T15:22:16+08:00
tags: ["工具"]
---

## 简介

The vision of Oni is to build an editor that allows you to go from thought to code as easily as possible - bringing together the raw editing power of Vim, the feature capabilities of Atom/VSCode, and a powerful and intuitive extensibility model - wrapped up in a beautiful package.

## 安装

```
# Window 下使用 Scoop 来安装
scoop bucket add extras
scoop install oni
```

> [程序员的软件包管理工具 Scoop](http://blog.orionpax.top/post/scoop/)

## Features

### Code Completion

自动

### Fuzzy Finder

`<Ctrl-p>` 打开文件搜索框。

### Command Palette

`<Ctrl-Shift-P>` 打开命令输入框。

当前，命令行工具包括：

- 很多内置的 Oni 命令，比如浏览器、配置编辑、片段编辑等等。
- 几种常用菜单项
- NPM 包装脚本
- 插件命令
- 从发射参数奥尼文件夹

### Embedded Browser

在命令输入框输入 `Browser: Open Vertical` or `Browser: Open Horizontal` 可以打开浏览器。可以使用 `<Ctrl-g>` 在不使用鼠标的情况下导航 UI 。

### Quick Info

令光标悬停在一个标识符上，可以看到快捷信息。

### Snippets

在命令输入框输入 `Snippets: ...` 以创建代码段，Oni 的[代码段配置](https://code.visualstudio.com/docs/editor/userdefinedsnippets)和 VSCode 保持了一致。

### Status Bar

ONI 具有丰富的状态栏，被设计为`vim-powerline`和`vim-airline`的替代品。

### TextMate Highlighting

自动

### Syntax / Compilation Errors

自动

## Neovim Config

```
" ================================================================
" Created by OrionPax on 2019/08/26
" Last Modified: 2019/08/27
"
" 1. 基础设置
" 2. 插件设置
"   - 移动
"   - 编辑
"   - 增强
" 3. 按键映射
"   - 移动
"   - 编辑
" ================================================================

" ================================================================
" 1. 基础设置
" ================================================================

" 设置缩进宽度
set number
set noswapfile
set smartcase

set splitright
set splitbelow

" Turn off statusbar, because it is externalized
set noshowmode
set noruler
set laststatus=0
set noshowcmd

" Enable GUI mouse behavior
set mouse=a

" All config settings after this point
" can be removed, once an Oni config option is added.

" Use ESC to exit insert mode in :term
tnoremap <Esc> <C-\><C-n>

" Default tab settings
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab

" ================================================================
" 2. 插件设置
" ================================================================

call plug#begin(get(g:, 'bundle_home', '~/.vim/bundles'))

" ---------------------------- 移动 ------------------------------

" 全文快速移动，
" <leader><leader>s{char} 搜索跳转
" <leader><leader>w 跳转到后面的单词首字母
" <leader><leader>b 跳转到前面的单词首字母
Plug 'easymotion/vim-easymotion'

" 快速标记插件
" m[a-zA-Z] : 打标签
" '[a-zA-Z] : 跳转到标签位置
" '.        : 跳转到最后一次修改位置
" m<space>  : 去除所有标签
Plug 'kshenoy/vim-signature'

" 快速文件搜索
Plug 'junegunn/fzf', {'dir':'~/.fzf','do':'./install  --all'}
Plug 'junegunn/fzf.vim'

" ---------------------------- 编辑 ------------------------------

" 表格对齐，使用命令 Tabularize
" Shift + v 选中多行，使用:'<,'> Tab/{string} 按等号、冒号、表格对齐文本。
Plug 'godlygeek/tabular', { 'on': 'Tabularize' }

" 成对编辑
" ys iw {char} 增加
" cs {oldChar} {newChat} 修改
" ds {char} 删除
Plug 'tpope/vim-surround'

" 用 v 选中一个区域后，alt_+/- 按分隔符扩大/缩小选区
Plug 'terryma/vim-expand-region'

" 文本替换
Plug 'brooth/far.vim'

" 文本格式化
Plug 'sbdchd/neoformat'

" 注释
Plug 'tpope/vim-commentary'
autocmd FileType python,shell set commentstring=#\ %s                 " 设置Python注释字符
autocmd FileType mako set cms=##\ %s

" ---------------------------- 增强 ------------------------------

" 展示开始画面，显示最近编辑过的文件
Plug 'mhinz/vim-startify'

" 相对行号
Plug 'kennykaye/vim-relativity'

" 成对符号自动补全
" shift-tab 可以保持Insert模式跳到补全符号后面
Plug 'Raimondi/delimitMate'

Plug 'docunext/closetag.vim'

" 版本控制
" Git 支持
Plug 'tpope/vim-fugitive'
" 用于在侧边符号栏显示 git/svn 的 diff
Plug 'mhinz/vim-signify'
" Diff 增强，支持 histogram / patience 等更科学的 diff 算法
Plug 'chrisbra/vim-diff-enhanced'
" signify 调优
let g:signify_vcs_list = ['git', 'svn']
let g:signify_sign_add               = '+'
let g:signify_sign_delete            = '_'
let g:signify_sign_delete_first_line = '‾'
let g:signify_sign_change            = '~'
let g:signify_sign_changedelete      = g:signify_sign_change
" git 仓库使用 histogram 算法进行 diff
let g:signify_vcs_cmds = {
    \ 'git': 'git diff --no-color --diff-algorithm=histogram --no-ext-diff -U0 -- %f',
	\}



call plug#end()

" ================================================================
" 3. 按键映射
" ================================================================

let mapleader=","
" ---------------------------- 移动 ------------------------------

" Ctrl + JK 快速移动
nnoremap <C-J> 5j
nnoremap <C-K> 5k

" <leader>+数字键 切换tab
noremap <silent><leader>1 1gt<cr>
noremap <silent><leader>2 2gt<cr>
noremap <silent><leader>3 3gt<cr>
noremap <silent><leader>4 4gt<cr>
noremap <silent><leader>5 5gt<cr>
noremap <silent><leader>6 6gt<cr>
noremap <silent><leader>7 7gt<cr>
noremap <silent><leader>8 8gt<cr>
noremap <silent><leader>9 9gt<cr>
noremap <silent><leader>0 10gt<cr>

" ---------------------------- 编辑 ------------------------------
" 保存并格式化
nnoremap <C-S> :Neoformat <Esc> :w<cr>h
inoremap <C-S> <Esc> :Neoformat <Esc>:w<cr>i

" ALT_+/- 用于按分隔符扩大缩小 v 选区
map <m-=> <Plug>(expand_region_expand)
map <m--> <Plug>(expand_region_shrink)
```

## ONI Config

```
import * as React from "react";
import * as Oni from "oni-api";

export const activate = (oni: Oni.Plugin.Api) => {
  console.log("config activated");

  // Input
  //
  // Add input bindings here:
  // <leader>g打开版本控制
  const LEADER_KEY = ",";
  // leader git
  oni.input.bind(`${LEADER_KEY}g` "vcs.sidebar.toggle");
  // leader explorer
  oni.input.bind(`${LEADER_KEY}e` "sidebar.toggle");

  //
  // Or remove the default bindings here by uncommenting the below line:
  //
  // oni.input.unbind("<c-p>")
};

export const deactivate = (oni: Oni.Plugin.Api) => {
  console.log("config deactivated");
};

export const configuration = {
  //add custom config here, such as
  "ui.colorscheme": "nord",
  //禁用默认配置，为了修改tabSize
  "oni.useDefaultConfig": false,
  //隐藏菜单
  "oni.hideMenu": true,
  //隐藏左菜单
  "sidebar.enabled": false,
  //关闭文件管理器初始就打开
  "sidebar.default.open": false,

  "experimental.indentLines.enabled": true,
  "experimental.vcs.sidebar": true,
  //"oni.bookmarks": ["~/Documents"],
  //"oni.loadInitVim": false,
  //"editor.fontSize": "12px",
  //"editor.fontFamily": "Monaco",

  // UI customizations
  "ui.animations.enabled": true,
  "ui.fontSmoothing": "auto",
  "editor.fontSize": "14px"
};
```

## 常用命令

- `<Ctrl-g>` : 打开 sneak mode。UI 导航
- `F2` : 重命名变量
- `F12` : 跳转到定义
- `<Ctrl-p>` : 显示快速打开菜单
- `<Ctrl-/>` : 搜索当前缓冲区
- `<Alt>` : 打开关闭菜单栏
- `<Ctrl-Shift-B>` : 打开关闭文件树
- `<Ctrl-e>` : 创建新文件
- `<Ctrl-f>` : 创建新文件夹
- `y` + `p` : 移动文件
- `d` : 删除文件
- `u` : 撤销上一次可逆的资源管理器操作

> [Oni Shortcuts](https://github.com/onivim/oni/wiki/Shortcuts)

## 遇到的问题

### 配置制表符宽度失效

useDefaultConfig 设置为 false 可以解决，设置为 false 后要把默认的配置复制到 init.vim 里调整下制表符宽度，不然会出现卡死的问题。

> actually, most of the Oni functionality will be preserved with useDefaultConfig set to false. The only thing useDefaultConfig: false turns off are these defaults:
>
> - https://github.com/onivim/oni/blob/master/vim/default/bundle/oni-vim-defaults/plugin/init.vim
> - targets.vim plugin
> - vim-commentary plugin
> - vim-unimpaired plugin
>
> There was a bug previously where auto-completion wouldn't work correctly, but it seems addressed now. LMK if you see any issues, though.
