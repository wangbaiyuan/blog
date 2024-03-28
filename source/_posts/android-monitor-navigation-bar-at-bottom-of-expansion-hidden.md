---
title: Android监听底部导航栏展开与隐藏
url: 1721.html
id: 1721
categories:
  - 技术
abbrlink: 36424
date: 2016-08-12 21:49:12
tags: ''
---

现在有些android手机具有底部虚拟按键的导航栏，这一设计去掉了物理按键，进一步增加了智能手机的屏占比。但这有时带来一些兼容性问题。 为了防止导航栏遮住布局，可以在布局上面添加“fitSystemWindows=true”属性。 如果要想监听导航栏的隐藏与显示，我们可以在布局文件的根节点下添加一个宽度和高度都“match_parent”的空布局，同时在布局上面添加“fitSystemWindows=true”属性，然后监听此布局的onLayoutChange事件，即可监听导航栏。