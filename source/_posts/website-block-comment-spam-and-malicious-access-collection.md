---
title: 网站屏蔽垃圾评论和恶意访问、采集
tags:
  - UA
  - wordpress
  - 网站安全
url: 1173.html
id: 1173
categories:
  - 软件开发
abbrlink: 57830
date: 2015-05-06 15:28:37
---

对于站长来说,垃圾评论都是一件比较苦恼的事,垃圾评论常常夹杂各种广告内容,而且过多的垃圾评论还会加大服务器的负担.垃圾评论的发起者往往是网络机器人,因为没有哪个正常人费时费力跑到你的网站自己受到敲字发广告等垃圾评论.最近极客人也自己结合了网站的代码,自己做了一个网络机器人,实现了短时间内打开下载几十个页面并且采集下载页面中的图片——当然是拿自己的网站做试验. 这篇文章主要分两部分，一是屏蔽网络机器人发垃圾评论；二是防止恶意访问刷新、采集图片耗费服务器资源和流量。

一、网站屏蔽机器人垃圾评论（利用PHP）
--------------------

本篇文章屏蔽机器人的思路是屏蔽掉一些UA信息为空及其它典型是机器人UA（USER_AGENT，以下简称为UA）的访问用户。实现原理是通过php代码识别来访用户的UA信息，和典型的机器人UA信息进行比对，比对确认是机器人访问后禁止该用户访问。至于怎么查看UA，大家可以分析一下自己的网站日志。为此极客人综合网上的代码写了下面的代码。 为了在机器人访问网页第一时间就实行封禁，对于wordpress主题网站，建议将下面的代码添加到wordpress主题文件夹下header.php文件内容的最前面。极客人在此更建议的方式是：将下面的函数和执行代码书写在单独的一个PHP文件中，然后再在header.php文件中进行调用（因为header中代码太杂以后不好看）； 此代码对任何支持PHP语言网站程序都有效，

### 屏蔽空UA的antiEmptyUA()函数代码：

function antiEmptyUA(){
    //获取UA信息
$ua = $\_SERVER\['HTTP\_USER_AGENT'\];
//将恶意USER_AGENT存入数组
$now\_ua = array('FeedDemon ','BOT/0.1 (BOT for JCE)','CrawlDaddy ','Java','Feedly','UniversalFeedParser','ApacheBench','Swiftbot','ZmEu','Indy Library','oBot','jaunty','YandexBot','AhrefsBot','YisouSpider','jikeSpider','MJ12bot','WinHttp','EasouSpider','HttpClient','Microsoft URL Control','YYSpider','jaunty','Python-urllib','lightDeckReports Bot');//禁止空USER\_AGENT，dedecms等主流采集程序都是空USER\_AGENT，部分sql注入工具也是空USER\_AGENT
if(!$ua) {
header("Content-type: text/html; charset=utf-8");
wp_die('机器人，滚粗！');
}else{
foreach($now_ua as $value )
//判断是否是数组中存在的UA
if(eregi($value,$ua)) {
header("Content-type: text/html; charset=utf-8");
wp_die('机器人，滚粗！');
}
}
}

### 函数调用

antiEmptyUA();

二、防止访问者或机器人恶意频繁刷新、大流量访问
-----------------------

如果说发广告垃圾评论的人是损人利己，那么利用网络机器人进行频繁刷新、大量流量攻击的人就是损人不利己了。当然极客人觉得“存在即合理”，人家主动对一个网站发动攻击，或许是哪里得罪了人家，想通过搞瘫你的网站来小小惩罚你一下。比如，我最近就很想（不过没实施，想想还是算啦）对前几天转载我的文章不加版权，还说自己是写的人进行一下网站攻击。所以，在你专心研究怎么防止别人恶意访问的同时，极客人在此提醒你以后转载别人的文章真的还是加一下版权，尊重作者的劳动成果。

### 下面是本站的效果截图：

[![anti_robots](http://baiyuan.wang/wp-content/uploads/2015/05/anti_robots.jpg)](http://baiyuan.wang/wp-content/uploads/2015/05/anti_robots.jpg) 下述代码和上面的代码一样，建议加在header.php最前面或者其他网站程序最先执行代码的最前面

### 防止频繁访问的anticc()函数代码:

function antiEmptyUA(){
    //获取UA信息
$ua = $\_SERVER\['HTTP\_USER_AGENT'\];
//将恶意USER_AGENT存入数组
$now\_ua = array('FeedDemon ','BOT/0.1 (BOT for JCE)','CrawlDaddy ','Java','Feedly','UniversalFeedParser','ApacheBench','Swiftbot','ZmEu','Indy Library','oBot','jaunty','YandexBot','AhrefsBot','YisouSpider','jikeSpider','MJ12bot','WinHttp','EasouSpider','HttpClient','Microsoft URL Control','YYSpider','jaunty','Python-urllib','lightDeckReports Bot');//禁止空USER\_AGENT，dedecms等主流采集程序都是空USER\_AGENT，部分sql注入工具也是空USER\_AGENT
if(!$ua) {
header("Content-type: text/html; charset=utf-8");
wp_die('请勿采集本站！');
}else{
 foreach($now_ua as $value )
//判断是否是数组中存在的UA
 if(eregi($value,$ua)) {
 header("Content-type: text/html; charset=utf-8");
 wp_die('请勿采集本站！');
 }
}
}

### 函数调用方法：

anticc(2)；根据你的需求修改时间值“2” 以上代码中function anticc($time\_sep)的“$time\_sep”是控制$time_sep秒中内允许用户访问一次，比如$time_sep=3时，如果用户在3秒内访问超过一次，系统则会提示“警告：请求过于频繁”，并且只有等待三秒后才能访问本网站。具体效果你可以在王柏元的博客，狂按F5刷新，体验一下。

三、利用htaccess屏蔽机器人垃圾评论（推荐）
-------------------------

这个方法还是屏蔽空UA的机器人，但是效率会比PHP高很多，这里是屏蔽机器人直接通过wp-comments-post.php发垃圾评论。

\# BEGIN 屏蔽垃圾留言：屏蔽空referrer留言
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REQUEST_METHOD} POST
RewriteCond %{REQUEST_URI} .wp-comments-post\\.php*
RewriteCond %{HTTP_REFERER} !.\*baiyuan.wang.\* \[OR\]
RewriteCond %{HTTP\_USER\_AGENT} ^$
RewriteRule (.*) ^http://%{REMOTE_ADDR}/$ \[R=301,L\]
</IfModule>
\# END 屏蔽垃圾留言：屏蔽空referrer留言

四、禁止垃圾评论IP
----------

直接将垃圾评论的IP加入黑名单，该IP访问时直接“403无权限访问”，还可以节约虚拟主机的流量。（但是一般垃圾评论的IP经常会变！） 由于文字较多，请参看我的一篇独立[博文：虚拟主机怎样屏蔽指定IP或网段](http://baiyuan.wang/web-hosting-how-to-block-specified-ip-or-network-segments.html)做详细了解，在此不赘述。

五、终极方法
------

验证码，安装验证码插件。这个方法比上面的都有效，但是要安装插件。原理不解释。