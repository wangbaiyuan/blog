---
title: SSD8_Ex3【JAVA_RMI服务】(1)概述RMI和网络API
tags:
  - JAVA
  - SSD8
  - 分布式系统
  - 数据库
  - 计算机网络
url: 1262.html
id: 1262
categories:
  - 算法语言
abbrlink: 17720
date: 2015-06-07 21:26:00
---

RMI和网络API
---------

周末做了网络与分布式系统实验的EX3-java实现RMI分布式议程服务。RMI的全称是“远程方法调用 (Remote Method Invocation)”。下面是极客人的理解：使用RMI远程方法调用，可以实现一个java客户端对java RMI的服务端进行远程调用对方的方法，这些方法在服务器端进行了声明并具体实现，而客户端中只有这些方法的定义而没有方法的内容实现——即一个JAVA接口。没有这些方法实现的JAVA客户端可以通过网络连接获取远程服务器端的对象，然后对远程对象和方法进行调用和操作。也就是说客户端的方法定义在本地，而具体实现却在通过网络连接的"遥远"的服务器上 就极客人目前个人的理解，JAVA RMI除了为客户端省去许多代码，其实还可以为服务器端的数据开放提供另外一种有连接的查询接口，比如现在网络上许多API服务，都是PHP+JSON的形式，通过URL的请求，服务器端查询相关结果后以JSON数据包的形式向客户端返回。这样的数据查询方式现在非常普遍，尤其是微信越来越流行的当下，许多公众号都在采用通过对第三方API返回JSON数据包进行解析，为用户提供天气查询、车票查询、机器人聊天、IP查询、归属地查询等服务。 虽然RMI和JSON-网络API不一样，但是极客人学到RMI就不由自主想到了JSON的网络API。不过两者的不同也显而易见，网络上的JSON-API都是被动接受的，客户端只能向服务器请求数据后服务器返回，而RMI的客户端的权限更大，只要RMI的接口在服务器端有定义，客户端可以主动对服务器进行操作，比如数据库操作：查询数据库，删除数据库记录；运行命令:对服务器进行关机（一个实行远程关机的代码极客人将在本系列文章的最后给出），一般说来，java服务器端程序在本地能做到的一切，都可以通过RMI的方式授权给客户端。 本系列文章主要是通过JAVA RMI实现远程会议管理。分享本次练习的答案不是目的，目的是在此梳理一下这两天的经验方法。

SSD8_EX3问题概述：
-------------

  这是[SSD8](http://wangbaiyuan.cn/tag/ssd8)练习的Ex3，预计极客人将会写一个系列，更新频率会和NWPU网络与分布式系统实验课2013级进度同步。点击标签或在本站搜索“[SSD8](http://wangbaiyuan.cn/tag/ssd8)”即可获取已更新的[SSD8](http://wangbaiyuan.cn/tag/ssd8)答案。上一练习：[SSD8_Exam1【TCP Chat Server】;](http://wangbaiyuan.cn/ssd8-exam1%E3%80%90tcp-chat-server%E3%80%91.html)如果你想继续跟踪SSD练习进展，建议[订阅本站](http://wangbaiyuan.cn/newsletter?action=subscribe)。 1) 使用Java RMI创建一个分布式议程共享服务。不同的用户可以使用这个共享议程服务执行查询、添加和删除会议的操作。服务器支持会议的登记和清除等功能； 2) 议程共享服务包括以下功能：用户注册、添加会议、查询会议、删除会议、清除会议； 相关代码和分析将在后续文章中给出。

系列文章链接：
-------

[SSD8\_Ex3【JAVA\_RMI服务】(1)概述RMI和网络API](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-services-1-an-overview-of-rmi-and-web-api.html)

[SSD8\_Ex3【JAVA\_RMI】(2)远程接口声明](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-2-remote-interface-declarations.html)

[SSD8\_Ex3【JAVA\_RMI】(3)开启RMI服务](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-3-open-the-rmi-service.html)

[SSD8\_Ex3【JAVA\_RMI】(4)会议数据库建表](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-4-the-conference-database-tables.html)

[SSD8\_Ex3【JAVA\_RMI】(5)数据库连接和会议方法定义](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-5-the-database-connection-and-session-method-definition.html)

[SSD8\_Ex3【JAVA\_RMI】(6)制作命令行导航菜单](http://wangbaiyuan.cn/java-rmi-6-making-the-command-line-navigation-menu.html)