---
title: 提升流畅度 谷歌推全新安卓开发语言Sky
tags:
  - android
url: 1170.html
id: 1170
categories:
  - 软件开发
abbrlink: 29579
date: 2015-05-04 13:17:16
---

> 转自 [中关村在线](http://news.zol.com.cn/519/5190008.html) 作者：张金梁 |  责编：魏景芳

    据外媒报道，在日前举行Dart开发者峰会上，谷歌对外正式展示了[Android](http://detail.zol.com.cn/cell_phone_index/subcate57_list_s1398_1.html)最新的开发语言Sky。据悉，Sky本质上就是谷歌自主的网页开发语言Dart。 [![谷歌推全新安卓开发语言Sky（图片来自baidu）](http://wangbaiyuan.cn/wp-content/uploads/2015/05/Cg-4WlVGw6aIe0ApAAIAsbNaCQkAAC2hwKJfxQAAgDJ442.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/05/Cg-4WlVGw6aIe0ApAAIAsbNaCQkAAC2hwKJfxQAAgDJ442.jpg) 谷歌推全新安卓开发语言Sky（图片来自baidu） 谷歌表示，目前Sky只是一次开源的尝试。但相对于传统的Android应用开发方式，Sky有着多方面优势。Sky的最主要目的包括提高运行速度和响应速度。在大部分设备上，应用流畅的标准都是实现60FPS的帧率。不过，Dart团队希望实现高达120FPS的帧率。目前在Android平台上，许多应用连标准的60FPS帧率都难以达到，更不用说120FPS。 Dart团队展示了一款演示应用，每帧的绘制速度仅为1.2毫秒。尽管这只是一次简单的展示，但这意味着，对于开发流畅而复杂的应用来说，Sky有着很大的空间，这也使120FPS的帧率成为了可能。该团队表示，Sky的应用程序接口(API)不会影响界面的主线程，这意味着即使应用运行速度变慢，用户界面仍将保持流畅的响应速度。 Sky并不依赖于平台，其代码可以运行在Android、iOS，以及任何集成了Dart虚拟机的平台上。这类应用的运行类似于网站。应用的很大一部分基于HTTP，这意味着开发者可以进行持续的开发，并确保所有用户一直使用最新版本。这款演示应用的弱点在于无法离线运行，而启动应用则需要1到2秒钟时间，因为应用需要下载数据。不过，这两方面的问题可以通过缓存机制来解决。 基于HTTP的模式使开发变得很简单。开发者不必编辑代码、编译并打包，这些代码可以在HTTP服务器上编辑。而用户只需关闭并重新打开应用，即可完成应用的“升级”。这就像是一款网页浏览器。Android开发者可以使用Sky Framework，这提供了一整套Material Design小工具，帮助开发者方便地增加操作栏、触控效果、导航面板，以及Android应用中所需的一切元素。 与普通应用类似，Sky应用可以获得Android的全部权限和API，但结合来自网页服务器的自动升级功能，这将带来信息安全问题。不过目前，Sky仅仅只是一个试验项目。在Sky成为一种主流的Android应用解决方案之前，Sky团队需要解决这些问题。该团队的GitHub页面显示：“我们仍在对Sky进行频繁地迭代，这意味着框架和底层引擎有可能以不兼容的方式出现改变。