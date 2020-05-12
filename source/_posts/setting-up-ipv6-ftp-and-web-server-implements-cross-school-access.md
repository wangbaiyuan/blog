---
title: 建立IPv6 FTP和web服务器实现跨校访问
tags:
  - FTP
  - IPv6
  - Web
url: 295.html
id: 295
categories:
  - 技术应用
abbrlink: 16363
date: 2014-12-18 22:19:36
---

 

> 现在在校园局域网里建立个人的FTP服务器和使用远程桌面已经蔚然成风。由于局域网给予了FTP高达10M的传输速度，它便成为极佳的分享工具。由于发现学校的电脑支持IPv6,又考虑到IPv6地址如同天文数字不存在不足问题，笔者突发奇想：能不能通过建立IPV4 FTP和WEB的方法建立IPV6的FTP和WEB服务器？甚至实现不同学校间支持IPV6用户的互联互通！

  试验的结果令人振奋，此法果然可行！下面放出我的试验结果图：   ![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141218151116_62850.jpg)  

> 笔者使用这个FTP成功实现了和远在湖南大学同学的直接的FTP文件传输

 

*   ping测试结果：

  ![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141218144443_87681.png)

教程：建立IPV6 FTP和web服务器实现跨校访问
--------------------------

### 工具/软件

*   win7及以上版本电脑（XP电脑开启IPV6的方法请百度）
    
*   serv-u FTP建立软件，XAMPP web环境搭建软件
*   有IPV6访问功能的网络

（注：XAMPP支持PHP等，单纯的html和简单的FTP服务win7是自带的，可以不安装以上两种软件）

### 方法/步骤

*   安装IPv6协议并验证是否有IPv6访问权限：

点击右下角网络图标，打开“网络和共享中心”-本地连接-属性-本连接使用下列项目 ![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141218150801_31787.png)

*   获取本机IPv6地址，可通过ipconfig命令

![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141219105631_95811.png)

*   搭建FTP服务器

![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141218153519_46278.png) 搭建IPV6 FTP服务器和搭建IPV4FTP服务器一样，打开serv-u管理控制台，在 在 域详细信息中 点击“配置域的监听器”，然后如下图添加监听器： 类型：FTP IP地址：你的IPV6地址 ![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141218153554_35731.png) 为了验证你是否你是否成功搭建，你可以在浏览器中键入：ftp://\[你的IPV6地址\] ![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141218153613_45827.png)

*   搭建web服务器

  搭建web服务器你可以百度，笔者推荐“XAMPP”这款软件，为了验证你是否你是否成功搭建，你可以在浏览器中键入：http://\[你的IPV6地址\] 下面是我的试验效果： ![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141219105826_74419.png)  

> 以上的WEB和FTP服务器访问，笔者在我的其他大学支持IPV6的同学计算机上试验通过，可以直接通过IPV6网络直接传文件和访问WEB网页

 

进阶篇：添加域名解析到本机IPV6地址，做地址好记的全IPV6网络的web/ftp服务器！
---------------------------------------------

  上面看到，IPV6的IP地址极长，和32位的IPV4相比，高达128位的IPv6足足是其4倍，这很不利于我们的记忆，我们可以把自己的域名解析到自己电脑的IPV6地址。

### 具体方法是

在域名管理中添加“AAAA”记录指向你的IPv6地址，笔者使用的是DNSpod管理自己的域名，如下图 ![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141219110626_95826.png)

最后：
---

 

> 本教程系本人原创，互联网上类似资源也较少，希望大家批评指正。