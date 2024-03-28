---
title: 用域名解析到IPV6连接远程桌面
tags:
  - IP
  - IPv6
  - 域名解析
url: 1291.html
id: 1291
categories:
  - 技术
abbrlink: 30663
date: 2015-06-19 13:21:12
---

一般来说，远程桌面一般应用于服务器管理和局域网内普通计算机的远程管理。其实远程桌面并不仅仅限于局域网内，只要IP可达，我们的计算机都可以在其它计算机上远程桌面连接。由于IPV4地址不够用的问题，通过NAT转换的IPv4并不能让我们找到互联网任何一台主机，但是无穷无尽的IPv6却完美解决这一问题。由于有些学校，比如极客人，连接校园网需要用锐捷进行账号认证才能访问局域网内的IPv4计算机。所以在学校机房远程桌面自己的计算机时，常常遇到锐捷没有登录而导致无法连接宿舍电脑的问题。但是，如果通过IPV6访问就不用考虑这一问题了，当然，你网线没插我也没办法。 IPV6连接远程桌面的方法和IPv4没有任何区别，怎样用远程桌面控制自己的电脑，在我的前一篇文章有介绍：

第一步，获取本机IPV6地址并域名解析
-------------------

IPV6的好处是地址长（128位二进制），所以数量多到可以标记地球上任何一粒沙子，它的缺点也正是地址长——记不住。所以远程桌面管理你的计算机肯定不能使用IPv6地址了，用域名解析的方式是必然的选择。 IPv6域名解析和IPv4无异，你只需要在域名管理中添加一个AAAA记录即可。 具体怎么获取本机的IPv6地址进行IPv6域名解析请参照：[http://baiyuan.wang/setting-up-ipv6-ftp-and-web-server-implements-cross-school-access.html#title-0](http://baiyuan.wang/setting-up-ipv6-ftp-and-web-server-implements-cross-school-access.html#title-0 "http://baiyuan.wang/setting-up-ipv6-ftp-and-web-server-implements-cross-school-access.html#title-0") **比如极客人解析的域名就是：ipv6.baiyuan.wang。**

第二步，IPV6域名连接远程桌面
----------------

打开远程桌面输入你解析的IPV6域名即可： [![IPV6远程桌面](http://baiyuan.wang/wp-content/uploads/2015/06/baiyuan.wang_2015-06-19_13-15-33.jpg)](http://baiyuan.wang/wp-content/uploads/2015/06/baiyuan.wang_2015-06-19_13-15-33.jpg) IPV6远程桌面

问：锐捷没登或者断了，连不了远程怎么办？
--------------------

*   1.学校机房支持IPV6就用IPV6登录你的计算机；
*   2.学校机房不支持IPV6就用别人已经登上锐捷的同学电脑连一下他的计算机，然后远程他的电脑、通过IPv6来远程连接你的计算机，然后登上你的锐捷，用学校计算机IPv4连接你的电脑。