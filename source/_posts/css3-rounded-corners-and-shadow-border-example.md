---
title: css3圆角边框和边框阴影示例
tags:
  - CSS
url: 238.html
id: 238
categories:
  - 算法语言
abbrlink: 6574
date: 2014-12-06 21:30:50
---

border-radius向元素添加圆角边框，css3中的。IE9+ chrome safari5+ firefox4+ 现在都支持。可以向input div等设置边框。与border相似，可以四个角一起设置，也可以单独设置。

  

### 1.圆角效果  

  

效果演示：

css3圆角边框和边框阴影示例——王柏元的博客

  

  

语法：

代码如下:

  

  

  

  

  

border-radius: 1-4 length|% / 1-4 length|%;
-moz-border-radius:10px;支持旧的firefox
-webkit-border-radius:10px;支持chrome

  

  

  

  

  

按top-left, top-right, bottom-right, bottom-left顺序设置每个 radius 的值。如果省略 bottom-left，则与 top-right 相同。如果省略 bottom-right，则与 top-left 相同。如果省略 top-right，则与 top-left 相同。

例子1:

代码如下:

  

  

  

  

  

  

border-radius:2px;

  

  

  

  

  

等价于：

代码如下:

  

border-top-left-radius:2px;
border-top-right-radius:2px;
border-bottom-right-radius:2px;
border-bottom-left-radius:2px;

  

  

  

  

  

例子2:

代码如下:

  

  

  

  

  

  

border-radius:2em 1em 4em / 0.5em 3em;

  

  

  

  

  

等价于：

代码如下:

  

  

  

  

  

border-top-left-radius:2em 0.5;
border-top-right-radius:1em 3em;
border-bottom-right-radius:4em 0.5em;
border-bottom-left-radius:1em 3em;

  

  

  

  

  

  

###  2.阴影效果  

效果演示：

css3圆角边框和边框阴影示例——王柏元的博客

box-shadow向框添加一个或多个阴影。IE9+、Firefox 4、Chrome、Opera 以及 Safari 5.1.1 支持 box-shadow 属性。

  

语法：

代码如下:

  

  

  

  

  

box-shadow: h-shadow v-shadow blur spread color inset;

  

  

  

  

  

h-shadow,v-shadow必须。水平，垂直阴影的位置。允许赋值。blur可选，模糊距离。spread可选，阴影的尺寸。color可选，阴影的颜色。inset可选，将外部阴影（outset）改为内部阴影。

例子：

代码如下:

  

  

  

  

  

box-shadow: inset 3px 3px 6px #ccc;