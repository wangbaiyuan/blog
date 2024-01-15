---
title: androidStudio获取应用签名并复制
tags:
  - android
  - Android Studio
url: 1452.html
id: 1452
categories:
  - 软件开发
abbrlink: 55996
date: 2015-08-25 20:47:56
---

在eclipse写安卓软件中，构建应用并签名时，控制台会生成应用签名MD5、SHA1、SHA256；但是在android Studio对安卓应用签名完毕后并没有出现应用的签名MD5、SHA1、SHA256。我们可以在命令指示符中输入以下命令： keytool -list -v -keystore "F:\\文档\\我的软件\\xintranslate.jks" keytool是JDK里面的程序，因为如果你已经配置好Java的环境变量，所以命令指示符窗口可以直接运行keytool命令；其中"F:\\文档\\我的软件\\xintranslate.jks"是应用的key store文件。 但是，在命令指示符中的应用签名并不能复制出来，在一些开发者平台提交应用时有的还需要填写应用签名。冗长的签名如果是照着命令行窗口逐字打上去将相当鸡肋。 其实Android Studio集成了命令行窗口，我们完全不用在系统的命令行窗口输入上述命令， [![key](http://baiyuan.wang/wp-content/uploads/2015/08/key.jpg)](http://baiyuan.wang/wp-content/uploads/2015/08/key.jpg)   并且，在android studio中输入的命令结果支持复制粘贴，就不用我们自己照着命令行敲出来了。