---
title: 怎样为wordpress导航菜单设置图标
tags:
  - FontAwesome
  - wordpress
url: 768.html
id: 768
categories:
  - 算法语言
abbrlink: 14072
date: 2015-01-28 16:48:55
---

访问本站的朋友可以发现，笔者的导航菜单是带图标的，而wordpress导航菜单默认是没有图标的，下面是我的博客图示效果： [![mulu_compressed](http://wangbaiyuan.cn/wp-content/uploads/2015/01/mulu_compressed.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/01/mulu_compressed.jpg) 而且这些图标就像文字一样，可以改变它的颜色，可以美化我们的网页界面。在此，抛砖引玉出一个名词：Font Awesome

Font Awesome介绍
--------------

Font Awesome是一款很流行的字体图标工具。随着Bootstrap的流行而逐渐被人所认识，现在FontAwesome不仅仅可以在bt上使用，还可以应用在各种[web前端开发](http://caibaojian.com/ "web前端开发")中。相对于传统的使用背景图片作为图标，字体图标主要是支持自适应、可以使用字体的各种特性（比如变色、变大变小、字体阴影等）、减少数据加载、样式更容易定义等。

Font Awesome 特性
---------------

1.  一个字体文件， 369 个图标。
2.  不需要JavaScript要求：更快的载入速度
3.  无限的可扩展性：可伸缩矢量图形意味着每一个图标在任何大小看起来真棒。
4.  自由免费：你可以将它应用到你的商业中。
5.  [CSS](http://caibaojian.com/t/css "CSS")控制：轻松的定义图标的颜色，大小，阴影，和任何与CSS相关的特性。
6.  完美的视网膜显示：使用矢量字体，这意味着他们可以完美的显示在高分辨率显示器中
7.  为BootStrap而生：完全的兼容BootStrap新版3.0
8.  桌面友好：你可以查看字体的[样式列表](http://fontawesome.io/cheatsheet/)
9.  兼容屏幕阅读器：不像其他字体图标不兼容屏幕阅读器

Font Awesome的使用
---------------

1.  你只需要到：[http://fontawesome.io](http://fontawesome.io/get-started/) 下载[压缩包](http://fontawesome.io/assets/font-awesome-4.0.3.zip)然后解压到你的项目中。
2.  在你的HTML头部的head里面添加对相应的font-awesome的样式。
    
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
    
     
3.  根据[这里的案例](http://fontawesome.io/examples/)开始你的项目。

如需兼容IE浏览器，可以使用Font-awesome的[3.2.1版本](http://fontawesome.io/3.2.1/get-started/#need-ie7)。下载font-awesome-ie7.css或者是font-awesome-ie7.min.css。然后在项目中引入该样式文件。

<!--\[if IE 7\]>
<link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css">
<!\[endif\]--

怎样为wordpress目录设置图标
------------------

1.  首先在header.php中引入，我是将上述文件放在主题目录下的，因此引入代码为
    
    <!\-\- AWESOME FONT --> <link rel="stylesheet" id="fontawesome-style-css" href="<?php bloginfo(" template_directory'); ?>/font-awesome/css/font-awesome.min.css?ver=4.0.1' type='text/css' media='all' />
    
     

然后在wordpress后台-菜单编辑中设置某个菜单比如首页的导航标签属性为：

<i class="fa fa-home"></i>首页

[![wordpress目录设置图标](http://wangbaiyuan.cn/wp-content/uploads/2015/01/mulu2_compressed.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/01/mulu2_compressed.jpg) 现在一般的主题都已经引用了Font Awesome，你不妨直接尝试最后一步，看是否能成功加载图标，这样能省去你的许多时间