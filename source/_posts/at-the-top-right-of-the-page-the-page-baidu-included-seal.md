---
title: 在网页页面右上方加上百度是否收录的印章
tags:
  - CSS
  - PHP
url: 1017.html
id: 1017
categories:
  - 算法语言
abbrlink: 41641
date: 2015-03-22 14:04:50
---

前面王柏元的博客里有一篇文章介绍用[PHP实现判断文章是否被百度收录](http://baiyuan.wang/php-judge-whether-baidu.html)的方法，可能尝试的朋友看到自己的显示的效果和我的个人博客的效果不太一样。接下来向大家介绍通过PHP自动判断网站网页是否被百度收录，并通过印章悬浮的方式提示站长当前页面是否被百度收录，并为站长提供快速提交当前页面给百度收录的入口，每次在网页发表时可手动向百度提交新文章。 [![](http://baiyuan.wang/wp-content/uploads/2015/03/image_thumb9.png)](http://baiyuan.wang/wp-content/uploads/2015/03/image9.png)   在我的博客文章右上方我加入了一个类似“百度图标”一样的水印，具有透明的悬浮效果，和论坛的加“精华”的印章效果相似。这种效果不仅更炫酷，更能引起访问者的注意，不知不觉中可能就为你点击向百度提交未被收录的网页。下面为大家介绍一下这究竟是怎样实现的。

一、添加PHP实现判断文章是否被百度收录的代码
-----------------------

请参考我前面的文章《[PHP实现判断文章是否被百度收录](http://baiyuan.wang/989.html)》

二、在引用“baidu_record()”函数的地方添加CSS代码
---------------------------------

### 其中:“百度”图标css：

style="right: 20px;//图标离父容器右边20px; position: absolute;//定位元素为absolute，实现图标悬浮 color:red;//收录时使用color:#2565D8;  

### “百度”图标父容器”span“的CSS：

float:right;//使图标悬浮在右方 font-size: 7em; z-index: 99;//是图标悬浮在其他标签上方，这个需要根据实际调整 opacity: 0.8;//实现图标透明效果 position: relative;

三、拓展
----

为了节省网站的带宽，王柏元的博客图标尽量采用Font Awesome图标字体，如果你觉得这不够美观，可以PS一个印章图片.上面的css同样适用。