---
title: 新建wordpress网站速度慢怎么办
tags:
  - wordpress
  - 网站优化
url: 605.html
id: 605
categories:
  - 算法语言
abbrlink: 40424
date: 2015-01-11 19:09:24
---

新建立的wordpress站点，不管是前台还是后台，一般会有打开速度的问题。笔者也遇到这个问题，接下来向大家介绍：新建wordpress网站速度慢怎么办 出现的原因有两个:1.google在中国大陆被网络长城屏蔽，导致网站引用Google 的资源无法加载；2.wordpress的Gravatar头像无法加载（也是墙掉的结果）； [![design_ad_193099_m](http://wangbaiyuan.cn/wp-content/uploads/2015/05/design_ad_193099_m.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/05/design_ad_193099_m.jpg)

怎样解决google字体无法加载问题
------------------

> 最好的方法是禁用google字体服务。

Google在中国大陆访问时常抽风，因此也影响到了google api和一些公共服务，而其中现在很流行的google fonts也饱受困扰，很多google的公共库文件访问缓慢或者根本就是无法访问， 比如： theme.googleusercontent.com 、fonts.google apis.com 、ajax.google apis.com 很多网站前端以前都是直接用google的地址，这会或多或少的影响网站打开速度（不过笔者没遇到这个问题，可能是使用国人自己做的主题的原因）。

### 解决方法

1、安装插件：在插件中搜索 Disable Google Fonts，选择安装，然后启用，这样就可以禁止Google字体的加载，这样就可以提高访问速度了。 最近360网站卫士提供的公共库资源（ http://libs.useso.com/ ），效果果然提高不少。 这个插件是调用360的CDN常用前端公共库替换所有谷歌google.com域名链接。 插件下载地址: http://baiye.us/wp-content/uploads/2014/06/googlefontsto360.zip 2、删除代码：很多人不喜欢用插件那么这个可以修改代码打开/wp-includes/script-loader.php搜索fonts.googleapis.com找到代码位置，直接把//fonts.googleapis.com/…这个链接整个删掉即可。（修改前请备份好数据，用//注释掉也是可以的哦） 3、推荐使用这种方法，依次打开 /wp-includes/script-loader.php，约581行的位置，替换谷歌的字体库为360网站卫士的国内CDN节点，把/wp-includes/script-loader.php文件中的fonts.googleapis.com换成fonts.useso.com即可。

怎样解决wordpress的Gravatar头像无法加载的问题
-------------------------------

### 首先讲讲什么是gravatar头像

Gravatar全称Globally Recognized Avatar（全球识别头像），来自国外网站（http://www.gravatar.com）提供的在线头像服务，主要用在博客和论坛留言中，依靠邮件地址识别判断，为每个用户展示个性化的通用头像服务，完全免费，最初用在WordPress上，现在已经遍地开花，很多博客都支持Gravatar头像显示。——因为被墙掉的缘故，所有的博客一般都会出现头像无法加载的问题

### 介绍一下头像插件-WP User Avatar

安装 WP User Avatar 以后，就可以 在后台 - 设置 - 讨论，设置网站的默认头像，还会在后台 - 用户 - 我的个人资料，添加了一个自定义头像功能，允许用户设置自己的头像。这样一来，如果用户在“个人资料”中设置了自己的头像，就优先显示，如果没有设置，就显示用户的 Gravatar 头像，或者网站的默认头像。详细参考地址：http://www.wpdaxue.com/wp-user-avatar.html

### 如果想保留Gravatar服务，可以这样

参考地址：http://www.v7v3.com/wpjiaocheng/201401511.html