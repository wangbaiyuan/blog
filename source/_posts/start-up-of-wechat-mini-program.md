---
title: 微信小程序入门
url: 2641.html
id: 2641
categories:
  - 技术
abbrlink: 20677
date: 2018-08-16 21:03:46
tags: ''
---

最近在学习微信小程序，极客人总结了一些入门经验，希望能帮助想学习小程序的同学提供参考

一、微信小程序的文件结构：
-------------

▸ pages/ : 页面文件，小程序由一个个page（类比于Activity或者ReactJS里面的页面组件）组成 ▸ utils/   : 放一些工具方法

.app.js：  小程序启动，类比于Android的Application类或者MainActivity

app.json :小程序的全局配置文件, 类比于Android的清单文件，声明了小程序有哪些page

app.wxss :全局的css样式文件

project.config.json ：项目配置文件，定义了项目的名称，基础库版本，appId等

小程序由一个page组成，类比于Android的Activity，与其他组件化应用一样有生命周期，除此之外，小程序开发和ReactJS很像，比如React里面利用state管理界面数据，小程序有一个几乎和这一模一样的，叫data.

onLaunch

Function

生命周期函数–监听小程序初始化

当小程序初始化完成时，会触发 onLaunch（全局只触发一次）。

onShow

Function

生命周期函数–监听小程序显示

当小程序启动，或从后台进入前台显示，会触发 onShow

onHide

Function

生命周期函数–监听小程序隐藏

当小程序从前台进入后台，会触发 onHide

onError

Function

错误监听函数

当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息

[![](http://wangbaiyuan.cn/wp-content/uploads/2018/08/timg.jpeg)](http://wangbaiyuan.cn/wp-content/uploads/2018/08/timg.jpeg)

二、学习资料
------

*   微信小程序开发资源汇总：https://github.com/justjavac/awesome-wechat-weapp
*   WeUI，微信官方的组件库：https://github.com/Tencent/weui

三、一点想法
------

*   个人身份可以申请注册小程序，权限还是很多的，除了支付、实时视频，其它基本都支持
*   微信小程序解决我们我不想安装过多APP的痛点，前途还是很看好的，最近微信推出了小程序广告，想变现的抓紧了
*   虽然小程序发布不久，但是现在不管官方还是社区对微信小程序的生态是十分有友好的，比如除官方提供了还算好用的IDE，其它IDE比如VSCode/Intellij都有插件对小程序予以支持；同时社区里面又很热开发面向小程序的UI库、开发框架（比如支持Vue的mpvue）