---
title: 安卓虚拟机加速—Intel HAXM加速媲美真机
tags:
  - android
  - android开发
url: 1168.html
id: 1168
categories:
  - 软件开发
abbrlink: 38688
date: 2015-05-04 11:08:43
---

引语：安卓虚拟机天生就慢？
-------------

安卓虚拟机的速度一直以慢“著称”，经常卡顿的安卓虚拟机对于开发者来说是一件十分痛苦的事情，这极大地影响到了开发者的效率和心情。下面我想大家介绍一种加速安卓虚拟机的方法，如果你的电脑有一颗支持Intel(R) Virtualization Technology (VT) 的intel CPU（你可以不管什么是VT技术，只要你是i5或以上的intelCPU，一般都有这项技术，如果是AMD的CPU应该就不能享受下面的“福利”了），你不妨试一下，极客人自从使用了安卓虚拟机加速，运行、调试应用的速度完全达到了真机速度。

一、下载CPU/aBI为intel atom的安卓系统镜像
-----------------------------

[![](http://baiyuan.wang/wp-content/uploads/2015/05/image_thumb1.png)](http://baiyuan.wang/wp-content/uploads/2015/05/image1.png) 肯定考虑到兼容性问题和其他极客人也不知道的原因，网上下载的现成的安卓虚拟机往往是“armeabi-v7a”，这个架构的CPU系统镜像不Intel(R) Virtualization Technology (VT) 的硬件加速，这是导致安卓虚拟机卡慢的原因，可能大部分的朋友和极客人以前的想法一样，是java虚拟机拖慢了安卓虚拟机的速度。 打开SDK管理器 [![](http://baiyuan.wang/wp-content/uploads/2015/05/image_thumb2.png)](http://baiyuan.wang/wp-content/uploads/2015/05/image2.png) 请按图中所述选择一项intel的系统镜像下载： Intel x86 Atom System Image Intel x86 Atom_64 System Image ARM EABI v7a System Image

二、下载并安装 Intel HAXM 扩展
---------------------

打开SDK管理器，如图勾选Intel HAXM 下载并安装   [![](http://baiyuan.wang/wp-content/uploads/2015/05/image_thumb3.png)](http://baiyuan.wang/wp-content/uploads/2015/05/image3.png)

三、新建CPU/ABI为Intel Atom的安卓虚拟机
----------------------------

完成上面几步后新建CPU/ABI为Intel Atom的安卓虚拟机，然后启动这一虚拟机就行了，你会发现安卓虚拟机天生就慢的想法是不对的！ [![](http://baiyuan.wang/wp-content/uploads/2015/05/image_thumb4.png)](http://baiyuan.wang/wp-content/uploads/2015/05/image4.png)  

四、相关下载：
-------

安卓5.0、API21、CPU/ABI为intel atpm的系统镜像的下载地址：