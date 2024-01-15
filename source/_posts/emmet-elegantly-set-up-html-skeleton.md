---
title: Emmet优雅地搭建起Html骨架
tags:
  - CSS
  - JS
  - Web
url: 1773.html
id: 1773
categories:
  - 技术应用
  - 算法语言
  - 软件开发
abbrlink: 59987
date: 2016-12-05 11:44:58
---

> 曾经看见一位学长在PHP-Storm上输入一段奇怪的代码，当他按下了Tab键后，神奇的事情就发生了。

如果HTML也是一种编程语言的话，私以为Html会是我们接触到的最多的编程语言。可能有人并不知道什么是HTML（超文本标记语言），但是当他人生中第一次上网打开浏览器浏览网页的时候，他与HTML的邂逅就开始了……只是当初，他不知道纷繁绚丽的网页的背后，是HTML语言在默默支撑； HTML+JS+CSS是前端的三大语言。如果把网页比作人的话，HTML给了人以骨架，CSS未知赋予了血肉、发肤以至衣物、妆饰，而JS则给了他运动的灵魂。 这边文章从HTML讲起，对于HTML的基本知识在此就不便赘述了，Google一下，你就知道。在此，我主要讲的是怎样快捷地搭建起HTML的骨架。 把HTML比作骨架并非我心血来潮，我只是在告诉自己写HTML页面要有搭框架的意识。不瞒你说，我以前的HTML的代码都是拼凑而成的。哪里不对改哪里，效率很低。正向箭头 + 标签名+反响箭头这种重复的代码，写多了就觉得腻了。那么有没有什么快捷的方式让我们关注HTML的架构本身，而不是繁杂的html语言本身呢？

用Emmet Tab一下
------------

> Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度

Emmet 的语法极客人目前还只是刚刚入门，这里主要是抛砖引玉一下，给大家几个例子，更专业的介绍与教程，给大家推荐下面文章：http://www.iteye.com/news/27580 ，在此我也就不大篇幅地复制粘贴了。

*   \*\* 输入“!”或“html:5”，然后按Tab键： **

![0070e820-1cbf-3f42-8c5b-838e5774d02b.gif](http://baiyuan.wang/wp-content/uploads/2016/12/20161205122410112.jpg) \* \*\* 连续输入元素名称和ID，比如输入p.foo： ** ![cb250aef-3b60-3297-86ba-8c3ed36cacad.gif](http://baiyuan.wang/wp-content/uploads/2016/12/20161205122410219.jpg) 还有一些较复杂的用法大家自行研究，在此不做赘述，因为我的作用就是抛砖引玉，勾起大家的兴趣。

> \*\* 要见证奇迹的话建议自己亲手试一下！！**

一个例子：实现列表
---------

我要实现的效果如下： ![Paste_Image.png](http://baiyuan.wang/wp-content/uploads/2016/12/20161205122410310.jpg) 按照搭建骨架的意识，我们得弄清这个列表的结构是什么样子： \*\* 最外层一个无序列表，这个无序列表每个列表项都嵌套一个有序列表，这个有序列表有两个列表项，每个列表项含有个无序列表 **

#### Emmet语法如下：

ul>((li>ol>(li>ul>li\*2)\*2)*2)

 

#### Tab一下：

![Paste_Image.png](http://baiyuan.wang/wp-content/uploads/2016/12/20161205122410417.jpg)

#### 然后把文字填进去

<ul>  
  <li>Javascript    
    <ol>
            <li>第一章
                <ul>
                    <li>const</li>
                    <li>let</li>
                </ul>
            </li>
            <li>第二章
                <ul>
                    <li>function</li>
                    <li>object</li>
                </ul>
            </li>
        </ol>
    </li>
    <li>Java
        <ol>
            <li>第一章
                <ul>
                    <li>class</li>
                    <li>package</li>
                </ul>
            </li>
            <li>第二章
                <ul>
                    <li>private</li>
                    <li>public</li>
                </ul>
            </li>
        </ol>
    </li>
</ul>

 

#### 效果预览

>

*   Javascript
    1.  第一章
        *   const
        *   let
    2.  第二章
        *   function
        *   object
*   Java
    1.  第一章
        *   class
        *   package
    2.  第二章
        *   private
        *   public

参考文章： \* http://www.iteye.com/news/27580 * http://www.powerxing.com/emmet-syntax-cheatsheet/