---
title: 安卓实现打开指定链接调用其他应用程序
tags:
  - android
  - 博客客户端
url: 1586.html
id: 1586
categories:
  - 技术
abbrlink: 51941
date: 2016-01-01 11:23:23
---

有些网站在网页上设置了点击跳转到其官方APP上的链接，比如京东；近期在做王柏元的博客客户端上我加入此功能，用以打开网页上的链接调用我的客户端打开相关文章。下面是实现方法：

安卓实现打开指定链接调用其他应用程序
------------------

在打开指定链接需要跳转到的Activity的AndroidManifest.xml清单文件中中加入一条intent-filter标签，并如下面的例子设置scheme、HOST等属性。

 <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="wbyblog" android:host="baiyuan.wang"
                    android:pathPrefix="/home"/>
</intent-filter>

并做了一个网页亲测成功：
------------

<a href="wbyblog://baiyuan.wang/home">打开首页</a><!--这就是上面mainActivity的调用-->
<a href="wbyblog://baiyuan.wang/post?postid=1024&amp;title=安卓如何实现浏览器调用其他应用程序">打开文章</a>
<a href="wbyblog://baiyuan.wang/category?id=10">打开目录</a>