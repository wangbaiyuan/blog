---
title: 码农、黑客和2B程序员之间的区别
url: 680.html
id: 680
categories:
  - 极客视点
abbrlink: 7703
date: 2015-01-27 13:37:32
tags: ''
---

笔记本电脑
-----

黑客：

![](/wp-content/uploads/2015/01/20150127153057_85952.jpg)

码农：

![](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/01/073142rBz.jpg)

2B程序员： ![](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/01/0731472eK.jpg)

求2的32次方：
--------

码农：

System.out.println(Math.pow(2, 32));

 

黑客：

 

System.out.println(1L<<32);

 

2B程序员：

System.out.println(2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2\*2);

 

交换两个数：
------

码农：

void swap(int &a,int &b)
{
    int temp;
    temp=a;
    a=b;
    b=temp;
}

 

黑客：

void swap(int &a,int &b)
{

    a=a^b;

    b=a^b;

    a=a^b;

}

 

2B程序员：

void swap(int a,int b)
{
    int temp;
    temp=a;
    a=b;
    b=temp;
}

 

类属性定义：
------

码农：

public static int TYPE = 1;

 

黑客：

/\*\*
\* 此策略下消息类型为全局类型，用以通知所有符合B05协议要求的处理者
\* …… ……
*/
public static int TYPE = MsgTypes.TYPE_GLOBAL;

 

2B程序员：

public static String TYPE_ONE = "1";
public String TYPE = TYPE_ONE;

 

手机开发平台：
-------

码农：WinCE/BlackBerry/Symbian/Android

黑客：iPhone

2B程序员：MTK

桌面应用界面开发：
---------

码农：Swing/MFC/C#

黑客：WPF

2B程序员：VB(哈哈，不要怪我，我也做过VB项目，我没有偏见，不过关于VB的非议实在是太多太多了，连Dijkstra都说，“It is practically impossible to teach good programming to students that have had a prior exposure to BASIC: as potential programmers they are mentally mutilated beyond hope of regeneration.”)

即时通讯软件：
-------

码农：工作：MSN，生活：Skype

黑客： 工作：GTalk、生活：保密

2B程序员： 工作：腾讯QQ，生活：QQ

问题查询：
-----

码农： Google搜索

黑客： Google Scholar/Scirus

2B程序员： 百度知道

Window 死机的解决方案：
---------------

码农： 根据异常信息搜索问题原因和解决方法

黑客： 哥从懂事起就不用Windows的!

2B程序员： 重装系统(万能解决方案)，安装360

个人Blog：
-------

码农： CSDN/CNBlogs/BlogBus

黑客： 个人站(俺不是自夸啊，哈哈)

2B程序员： QQ空间

面试地点：
-----

码农： 会议室/教室

黑客： 咖啡厅

2B程序员： 食堂

Java面试题目：
---------

码农： 请分别说一说封装、继承和多态的含义?

黑客： 如果要设计一个系统，用来统计世界上所有道路的总数，你会怎样设计?

2B程序员： 请说说Spring2.5.6版本和2.5.5版本的区别?

仅此一笑，你还有什么更有意思的程序员版本?

> 原文：http://www.techug.com/the-diffenents-between-coder-hacker-and-2b-programmer