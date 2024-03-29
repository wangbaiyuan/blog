---
title: 触类旁通学习swift（1）语言简述
tags:
  - IOS
  - JAVA
  - swift
url: 1583.html
id: 1583
categories:
  - 技术
abbrlink: 38192
date: 2015-12-30 23:14:20
---

由于要参加一个iOS竞赛，所以极客人最近开始学习swift语言。swift语言是苹果2014年发布的一个开发苹果旗下软件的一种新的编程语言，貌似有取缔之前用来开发苹果软件的objective c语言的势头，所以个人觉得学习swift还是比较有前途的。由于开发iOS必须要MAC系统，之前花费了大量的时间给我的戴尔电脑安装了“黑苹果”，但因为驱动问题导致无法联网，十分影响学习。为此，十分感谢杨帆老师借了我一台闲置的MAC电脑。 [![swift语言](http://baiyuan.wang/wp-content/uploads/2015/12/baiyuan.wang_2015-12-30_23-16-42.png)](http://baiyuan.wang/wp-content/uploads/2015/12/baiyuan.wang_2015-12-30_23-16-42.png) swift语言 与之前学习过的c++，java，php，javascript语言相比，swift语言在我看来更加高端或者说“高级”，比java等语言比swift更加简洁，对一些诸如数组等数据类型的操作功能极为强大，写相同量大swift的代码可以做很多的事情。简洁、高级的swift可以节省程序员打字的工作量，但是也意味着这个语言可能的封装度更大。封装性让成员易于操作但会让程序员离底层越来越远，上层函数的记忆量就会加大。swift和其它高级语言的不同还是很大的，不像java和php相似度极大，只要学会java，php在短时间内即可无师自通。 学过几门计算机语言之后，我认为再学习一门新的语言时与之前语言的比较十分重要。所以在学习swift时很有必要把它和其他语言进行类比学习，以加强记忆，防止各种语言之间的“串味”。

swift面向什么？
----------

swift和php相似，既支持面向过程又支持面向对象，没必要把所有的操作都写成一个类和方法，而java则是严格的面向对象语言。但PHP是一种脚本语言，但是swift不是，脚本语言是解释执行的，执行文件是文本； 编译语言，执行文件是二进制，swift需要经过编译生成一个二进制的可执行文件。

swift不是弱类型
----------

swift和javascript一样没有显式地声明变量类型，但是在没有声明变量类型的swift会根据情况自动推断出变量类型。比如var a="hello world",a会被推断为string类型。