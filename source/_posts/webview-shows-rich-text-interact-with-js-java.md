---
title: webview显示富文本与JS和java的交互
tags:
  - android
  - JAVA
  - JS
url: 1595.html
id: 1595
categories:
  - 算法语言
abbrlink: 26692
date: 2016-01-15 13:56:51
---

WebView是安卓下显示网页的控件，使用它可以实现一个简单的浏览器，访问互联网上的网页。也可以当作一个本地的文本显示控件，和textView类似。用 WebView 或者 TextView 来显示 HTML 内容，其交互的实现方式有较大的区别，以在 HTML 内容中的图片点击事件为例，在 WebView 模式下，开发人员需要通过注入 JavaScript 代码来进行点击事件的响应，Android 系统提供了 WebView 中 JavaScript 网页脚本调用 Java 类方法的机制；而在 TextView 中，图片会被解析为 ImageSpan，通过在 ImageSpan 上注册点击事件来响应。 [![webview显示富文本](http://wangbaiyuan.cn/wp-content/uploads/2016/01/wangbaiyuan.cn_2016-01-15_13-54-57.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2016/01/wangbaiyuan.cn_2016-01-15_13-54-57.jpg) webview显示富文本  

一、webview显示富文本
--------------

比如iniHtml为一段String类型的html代码，使用

webView.loadDataWithBaseURL(null, iniHtml, "text/html", "utf-8", null);

即可在webview上显示这段html。  

二、webview显示项目资源中网页文件
--------------------

我们可以将一个html文件index.html放在项目的assets文件下，使用WebView.loadUrl("file:///android_asset/index.html")来显示这个html文件，在这个html文件如果要引用asserts文件夹下的css、js文件，同样使用file:///android_asset/ ; 来访问。

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
	<title>王柏元的博客</title>
	<link type="text/css" rel="stylesheet" href="file:///android_asset/style.css"/>
    <script type="text/javascript" src="file:///android_asset/scripts/jquery.js"></script>

三、java中调用javascript函数
---------------------

使用loadurl调用java代码

webview.loadUrl("javascript: window.backAction();");

四、javascript怎样调用java函数
----------------------

在webview使用javascript调用外部的java函数可以让android的webview显示富文本有一种更加原生的体验，而不会让使用者感觉他在使用一个浏览器在查看你的显示文本。为了能让javascript调用java中代码，安卓采取将javascript的一个window下的对象M与java中的对象N做一个绑定或者说是映射，这样在javascript下对M的操作就相当于在java下N的操作。

### 实现方法：webview启用javascript，绑定js对象

webview.getSettings().setJavaScriptEnabled(true);
webview.addJavascriptInterface(javaobject,"JSInterface");

addJavascriptInterface(Object object, String name)函数中第一个参数object是java下的对象，name是映射到javascript下的对象名。你可以为java下的object比如当前的activity申明一个click()函数，在javascript下使用window.name.click() 即可出发java下click函数。 需要指出的是在java中的click函数需要添加声明 @JavascriptInterface