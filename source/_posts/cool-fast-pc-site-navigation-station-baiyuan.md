---
title: 一个炫酷、快速的PC网址导航站-百元导航
tags:
  - htaccess
  - Http
  - JS
  - 网站优化
url: 1576.html
id: 1576
categories:
  - 前端
abbrlink: 40108
date: 2015-12-29 13:42:55
---

前几天在一个网站上发现了一个炫酷的导航网页，界面美观大气，采用windows8磁贴风格、网站图标采用扁平化设计。后来发现这个导航网页是开放源码的，于是就下载了一份，并做了细微的修改与优化放在我的主机上，取名“百元导航”。之后我就自豪将“百元导航”设置为我所有浏览器的主页。因为我可以自信地告诉你，这个导航网页二次加载速度绝对快于任何导航网站（不服可亲测），包括主流的百度搜索、360导航。话不多说，[百元导航的网址：http://wangbaiyuan.cn/daohang](http://wangbaiyuan.cn/daohang)，欢迎大家将其设置为你的浏览器主页和提出宝贵意见。 [![百元导航网](http://wangbaiyuan.cn/wp-content/uploads/2015/12/wangbaiyuan.cn_2015-12-29_13-08-19.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/12/wangbaiyuan.cn_2015-12-29_13-08-19.jpg) 百元导航网

0.3s的极速加载体验
-----------

百元导航的首次加载速度在我的15M宽带下、360极速浏览器谷歌内核下测试速度为851ms，二次加载速度260ms，并且支持第二次没有联网都可以访问。之所以能在不到0.3s的速度里完成加载，是因为网页内的所有资源包括CSS、js以及网页自身的html都缓存在本地。二次访问相当于你在本地硬盘上打开一个网页文件。

### 怎样实现浏览器资源缓存

一般来说，浏览器会将其访问过的一些资源文件进行保存，比如CSS，JS，这些存储在本地磁盘的网页文件称为缓存，在二次访问时，浏览器一般会优先访问本地缓存里面的内容，如果网页中还有些资源文件在缓存里没有找到或者缓存已经过时，才会通过网络连接向服务器上请求下载。这就是我们在上网时发现一个网站首次访问速度会特别慢、第二次就快很多的缘故。 浏览器缓存css、js是默认行为，缓存时间也是不确定的，为了让浏览器缓存所有的文件，甚至包括网页文件自身，并且让浏览器缓存的CSS、JS缓存的时间足够长，服务器可以做一个缓存文件类型设置和缓存超时设置。

### 在网站根目录或者当前资源文件目录中的htaccess中加入：

<FilesMatch ".(flv|gif|jpg|jpeg|png|ico|swf|js|css|pdf|eot)$">
Header set Cache-Control "max-age=2592000"
</FilesMatch>

表示将扩展名为flv、gif、jpg、jpeg、png、ico、swf、js、css、pdf、eot 的文件缓存过期时间为2592000秒，30天。如下同理，将js、css过期时间设置为10天：

<FilesMatch ".(js|css)$">
Header set Cache-Control "max-age=864000"
</FilesMatch>

将txt、xml、html过期时间设置为10天

<FilesMatch ".(txt|xml|html)$">
Header set Cache-Control "max-age=864000"
</FilesMatch>

  或者在PHP中使用@header函数发出响应头消息告诉浏览器资源过期时间：

//缓存过期时间
$expires_offset = gmdate( "D, d M Y ", time() ).'16:00:00' . ' GMT';
header('Content-Type: text/css; charset=UTF-8');
header('Expires: ' . $expires_offset);
header("Cache-Control: public");

上面实现了将放置此代码的PHP文件返回的文件类型是text/css）缓存过期时间为每天北京时间0点，GMT时间（格林尼治时间）16：00。

有自动提示、支持多引擎的搜索框
---------------

搜索框的代码是我在原有的导航网站源代码基础上加入的，支持百度、极客搜、谷歌、360、搜狗搜索，并使用了百度开放的百度搜索框提示代码“opensug.js”实现了自动提示功能。具体的实现方法可以参考我的下一篇博文：**[支持自动提示的多引擎的搜索框](http://wangbaiyuan.cn/mul-engine-auto-prompt-search-box.html "编辑“支持自动提示的多引擎的搜索框”")。**