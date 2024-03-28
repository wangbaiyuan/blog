---
title: 网站自动跳转到cjb.net的惊险之旅
tags:
  - htaccess
  - JS
  - 网站安全
url: 1736.html
id: 1736
categories:
  - 技术
abbrlink: 52954
date: 2016-11-07 23:40:10
---

极客人昨天在访问王柏元的博客时发现，网站时不时地“抽风”地跳转向www.cjb.net这个网址，几乎刚一打开baiyuan.wang就跳，访问其它的网址都没有遇到这等怪事。这种情况最开始只出现在360极速浏览器上，即使我下意识地清除缓存、cookie，依然没有奏效。最后我换了其它的浏览器，才发现就360极速浏览器才遇到这种情况，而且还是偶然出现的；在尝试网上的方法卸载浏览器插件等的方法解决未果的情况下我只得作罢。兴许360极速浏览器中毒了吧，呵呵，360还号称安全呢！ [![www.cjb.net](http://baiyuan.wang/wp-content/uploads/2016/11/baiyuan.wang_2016-11-07_23-41-39.jpg)](http://baiyuan.wang/wp-content/uploads/2016/11/baiyuan.wang_2016-11-07_23-41-39.jpg) 今天晚上，我发现自动跳转到cjb.net的恼火现象再次出现，而且这次不管什么浏览器都是如此，包括Edge、IE。这才让我觉得是不是网站被“入侵”了，而且”入侵“的方式很明显，植入了含有跳转代码的js。因为当我审查元素”禁用js“时跳转情况就不会出现。然后我看了看，王柏元的博客一个文章页就引用30个js，只要其中一个js文件植入了恶意跳转代码就会出现自动跳转，如此盲目地找谈何容易。 由于网址跳转得极为迅速，我相信这个js文件是在html的head 部分，最后发现我的头部引用一个新浪CDN的jquery.min.js，网址为： http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js；这是我的wordpress主题提供的一个Jquery CDN源，当我把Jquery源由 CDN改成使用本地Jquery时，问题解决了，无疑是新浪的Jquery源被劫持了。打开这个js一看，难怪了： [![](http://baiyuan.wang/wp-content/uploads/2016/11/baiyuan.wang_2016-11-07_23-49-01.jpg)](http://baiyuan.wang/wp-content/uploads/2016/11/baiyuan.wang_2016-11-07_23-49-01.jpg) 而且lib.sinaapp.com域名下不管什么链接都是这个内容；最后发现网上推荐的Jquery CDN中，使用新浪的CDN还不少，估计这回中招的人应该不止我一个啊。最后我果断换成了百度的Jquery CDN：http://libs.baidu.com/jquery/1.9.1/jquery.min.js；当然，出现自动跳转到cjb.net的情况不一定和我是同一个原因，但是你可以按照我这个思路去找哪个js文件被污染了。 [![Jquery CDN](http://baiyuan.wang/wp-content/uploads/2016/11/baiyuan.wang_2016-11-07_23-52-45.jpg)](http://baiyuan.wang/wp-content/uploads/2016/11/baiyuan.wang_2016-11-07_23-52-45.jpg)