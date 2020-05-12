---
title: Eclipse环境下的Java编程常见问题
tags:
  - eclipse
  - JAVA
url: 1063.html
id: 1063
categories:
  - 算法语言
abbrlink: 57330
date: 2015-04-02 18:29:54
---

一、怎样可以修改eclipse新建工程的默认路径（Use default location ）？
------------------------------------------------

你发现你的工程只能在放一个固定的文件夹（Workspace）里，改变默认的存储路径会导致工程创建失败，下面的方法可以改变默认路径。**选择File-->Switch Workspace-->Other...，然后点Browse就可以改变默认路径了**。

二、如何运行applet程序？
---------------

如果你第一次运行的是application程序，那再点击Run时，它只会出现前一次的工程名。选择DebugConfiguration，然后在Name、Project、Applet三个 编辑框里填上相应的名称。再点击Run旁边的三角形时就会出现你之前在Name框里写上的对应的名称，点击它，就可运行了。