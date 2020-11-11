---
title: "Hammerspoon 的使用"
date: 2020-03-08T21:06:45+08:00
tags: ["技","杂谈","工具"]
---

<!-- vim-markdown-toc GitLab -->

* [简介](#简介)
* [安装使用](#安装使用)
* [Spoons](#spoons)
* [我的配置](#我的配置)
* [参考](#参考)

<!-- vim-markdown-toc -->

## 简介

[Hammerspoon](https://github.com/Hammerspoon/hammerspoon) 是一个 MacOS 下的开源的自动化工具。在操作系统和 Lua 脚本之间构建了桥梁。Hammerspoon 除了本身提供的操作系统的 api 外，同时提供了一批特定系统功能扩建的封装工具集，让编写 Lua 脚本来操作系统更为简单。

## 安装使用

执行 `brew cask install hammerspoon` 安装，安装完成后在偏好设置里点击 `Enable Accessibility` 授权 hammerspoon 使用辅助功能的权限。之后只要在 `~/.hammerspoon/init.lua` 中编写脚本然后选择 `Reload Config` 就可以生效了。可以 [Getting Started with Hammerspoon](http://www.hammerspoon.org/go/) 上复制 `Hello World` 自己试下。

## Spoons

官方提供了很多有用的工具集封装，简单的功能基本覆盖，如果没有特殊需求的话基本没有必要使用更底层的 api。以下是我用到的几个：

- ModalMgr : 封装按键绑定
- WinWin : 封装应用布局操作，可以轻松实现二分屏、三分屏
- KSheet : 显示当前应用的快捷键位
- SpeedMenu : 工具栏显示网速

## 我的配置

```lua
--- 这里只是展示我的配置，实际使用的话去下面参考部分克隆下来，复制到本地的 `~/.hammerspoon` 下修改

--------------- 依赖定义 ------------------

hs.loadSpoon("ModalMgr")
hs.loadSpoon("WinWin")
hs.loadSpoon("KSheet")
hs.loadSpoon("SpeedMenu")
hs.loadSpoon("BingDaily")

-------------- 自定义配置 -----------------

--- 禁用热键提示，开始使用的时候可以先设置成 1
hs.hotkey.alertDuration = 0

--- 禁用切换应用时的文件名提示
hs.hints.showTitleThresh = 0

--- 禁用动画
hs.window.animationDuration = 0

-------------- 自定义功能 -----------------

--- 应用快速布局
if spoon.WinWin then
	spoon.ModalMgr:new("FastLayout")
	local cmodal = spoon.ModalMgr.modal_list["FastLayout"]

	-- 定义进入环境后的快捷键
	cmodal:bind("", "escape", "退出快速布局", function()
		spoon.ModalMgr:deactivate({ "FastLayout" })
	end)
	cmodal:bind("shift", "/", "查看帮助", function()
		spoon.ModalMgr:toggleCheatsheet()
	end)
	cmodal:bind("", "F", "全屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("fullscreen")
	end)
	cmodal:bind("", "C", "居中", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("center")
	end)
	cmodal:bind("", "H", "移动到左半屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("halfleft")
	end)
	cmodal:bind("", "L", "移动到右半屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("halfright")
	end)
	cmodal:bind("", "K", "移动到上半屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("halfup")
	end)
	cmodal:bind("", "J", "移动到下半屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("halfdown")
	end)
	cmodal:bind("", "Y", "移动到左三分之一屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("onethirdleft")
	end)
	cmodal:bind("", "O", "移动到右三分之一屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("onethirdright")
	end)
	cmodal:bind("", "U", "移动到上三分之一屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("onethirdup")
	end)
	cmodal:bind("", "I", "移动到下三分之一屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("onethirddown")
	end)
	cmodal:bind("", "N", "移动到左三分之二屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("twothirdsleft")
	end)
	cmodal:bind("", ".", "移动到右三分之二屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("twothirdsright")
	end)
	cmodal:bind("", "M", "移动到上三分之二屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("twothirdsup")
	end)
	cmodal:bind("", ",", "移动到下三分之二屏", function()
		spoon.WinWin:stash()
		spoon.WinWin:moveAndResize("twothirdsdown")
	end)
	cmodal:bind(
		"",
		"=",
		"放大",
		function()
			spoon.WinWin:moveAndResize("expand")
		end,
		nil,
		function()
			spoon.WinWin:moveAndResize("expand")
		end
	)
	cmodal:bind(
		"",
		"-",
		"缩小",
		function()
			spoon.WinWin:moveAndResize("shrink")
		end,
		nil,
		function()
			spoon.WinWin:moveAndResize("shrink")
		end
	)

	-- 按下 ctrl + cmd + shift + L 进入快速布局
	spoon.ModalMgr.supervisor:bind(
		{ "ctrl", "cmd", "shift" },
		"L",
		"Enter FastLayout Environment",
		function()
			spoon.ModalMgr:deactivateAll()
			spoon.ModalMgr:activate({ "FastLayout" })
		end
	)
end

--- 应用的快速切换
spoon.ModalMgr:new("GoApp")
local cmodal = spoon.ModalMgr.modal_list["GoApp"]
cmodal:bind("", "escape", "Deactivate GoApp", function()
	spoon.ModalMgr:deactivate({ "GoApp" })
end)
cmodal:bind("shift", "/", "Toggle Cheatsheet", function()
	spoon.ModalMgr:toggleCheatsheet()
end)
hsapp_list = { {
	key = "A",
	name = "Alacritty"
}, {
	key = "C",
	name = "Google Chrome"
}, {
	key = "W",
	name = "WeChat"
}, {
	key = "Y",
	name = "网易有道词典"
}, {
	key = "M",
	id = "com.apple.ActivityMonitor"
} }

for _, v in ipairs(hsapp_list) do
	if v.id then
		local located_name = hs.application.nameForBundleID(v.id)
		if located_name then
			cmodal:bind("", v.key, located_name, function()
				hs.application.launchOrFocusByBundleID(v.id)
				spoon.ModalMgr:deactivate({ "GoApp" })
			end)
		end
	elseif v.name then
		cmodal:bind("", v.key, v.name, function()
			hs.application.launchOrFocus(v.name)
			spoon.ModalMgr:deactivate({ "GoApp" })
		end)
	end
end

spoon.ModalMgr.supervisor:bind(
	{ "ctrl", "cmd", "shift" },
	"G",
	"Enter GoApp Environment",
	function()
		spoon.ModalMgr:deactivateAll()
		spoon.ModalMgr:activate({ "GoApp" })
	end
)

--- 当前应用快捷键提示
if spoon.KSheet then
	spoon.ModalMgr:new("KeySheet")
	local cmodal = spoon.ModalMgr.modal_list["KeySheet"]

	cmodal:bind("", "escape", "Deactivate KeySheet", function()
		spoon.KSheet:hide()
		spoon.ModalMgr:deactivate({ "KeySheet" })
	end)

	-- 按下 ctrl + shift + / 查看当前应用快捷键
	spoon.ModalMgr.supervisor:bind(
		{ "ctrl", "shift" },
		"/",
		"Enter KeySheet Environment",
		function()
			spoon.KSheet:show()
			spoon.ModalMgr:deactivateAll()
			spoon.ModalMgr:activate({ "KeySheet" })
		end
	)
end

--- Esc 自动中文输入法切换为英文，使用 Vim 写 Markdown 时用
tapper = hs.eventtap.new({ hs.eventtap.event.types.keyDown }, function(event)
	if event:getKeyCode() == 53 then
		if hs.keycodes.currentSourceID() ~= "com.apple.keylayout.ABC" then
			hs.keycodes.currentSourceID("com.apple.keylayout.ABC")
		end
	end
end)

if tapper then
	spoon.ModalMgr:new("MarkdownEsc")
	local cmodal = spoon.ModalMgr.modal_list["MarkdownEsc"]

	cmodal:bind(
		{ "ctrl", "shift", "alt" },
		"M",
		"Deactivate MarkdownEsc",
		function()
			tapper:stop()
			spoon.ModalMgr:deactivate({ "MarkdownEsc" })
		end
	)

	-- 按下 ctrl + shift + / 查看当前应用快捷键
	spoon.ModalMgr.supervisor:bind(
		{ "ctrl", "cmd", "shift" },
		"M",
		"Enter MarkdownEsc Environment",
		function()
			tapper:start()
			spoon.ModalMgr:deactivateAll()
			spoon.ModalMgr:activate({ "MarkdownEsc" })
		end
	)
end

--- 默认开启网速提示
if spoon.SpeedMenu then
	spoon.SpeedMenu:start()
end

--- 默认开启 supervisor 的环境，按 ctrl + cmd + shift + q 切换 supervisor 开启关闭。 按 ctrl + cmd + shift + / 打开环境帮助。
--- 只有开启 supervisor 环境时，才能输入热键开启其他环境。比如按下 ctrl + cmd + shift + L 进入 FastLayout 环境。
spoon.ModalMgr.supervisor:enter()
```

## 参考

> [Getting Started with Hammerspoon](http://www.hammerspoon.org/go/)  
> [Hammerspoon Spoons](http://www.hammerspoon.org/Spoons/index.html)  
> [Hammerspoon Docs](https://www.hammerspoon.org/docs/index.html)  
> [Learn X in Y minutes](https://learnxinyminutes.com/docs/lua/)  
> [OrionPax Configuration](https://github.com/OrionPax19970905/.config/tree/master/.hammerspoon)
