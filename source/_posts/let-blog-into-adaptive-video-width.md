---
title: 让博客插入的视频宽度自适应
tags:
  - JS
  - PHP
  - 网站优化
url: 1505.html
id: 1505
categories:
  - 前端
abbrlink: 32255
date: 2015-10-14 21:53:24
---

好久没写技术类博文，这次暂且水一水上次在博客里发了一段个人制作的视频，使用的优酷提供的分享代码：就是一个embed视频标签，无奈优酷提供的代码视频长宽都是死的，600*400的样子，在电脑上还行，在手机上宽度太大直接撑爆了手机屏幕，用户体验很不好，下面的代码就是实现在不同设备自动适应宽度的。实现原理很简单，就是用js(jquery)动态设定视频的长宽度。 请将下面的代码加进主题的functions.php文件中，并且将代码中所有的#main-wrap-left换成显示文章的div的class名或者ID。 [![让梦想去杭行视频09243_20151013142330_compressed](http://wangbaiyuan.cn/wp-content/uploads/2015/10/wangbaiyuan.cn_2015-10-13_14-27-44.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/10/wangbaiyuan.cn_2015-10-13_14-27-44.jpg)

/\*\*
 \* 视频比例
 */
function videoWidth(){
    if (!wp\_is\_mobile()){
         echo '<script type="text/javascript">'
    .'$(document).ready(function(){$(\\'embed\\').height($(\\'#main-wrap-left\\').width() * 0.6);'
    .'$(\\'embed\\').width($(\\'#main-wrap-left\\').width() * 0.8);});</script>';
    }else{
        echo '<script type="text/javascript">'
    .'$(document).ready(function(){$(\\'embed\\').height($(\\'#main-wrap-left\\').width() * 0.70);'
    .'$(\\'embed\\').width($(\\'#main-wrap-left\\').width() * 0.99);});</script>';
    }
   
}
add\_action ( 'wp\_footer', 'videoWidth' );