---
title: 虚拟主机怎样屏蔽指定IP或网段
tags:
  - htaccess
  - IP
  - 网站安全
url: 1038.html
id: 1038
categories:
  - 百元百科
abbrlink: 52155
date: 2015-03-26 12:47:38
---

自王柏元的博客开通以来，笔者就不止一次地受到恶意注册、机器人发广告评论的骚扰。昨天收到一个广告评论，发现评论用户填写的网站IP和用户IP相同的，无疑，这说明这是网络机器人刷的评论。于是我就有一个想法，直接屏蔽掉这个IP访问我的博客。下面介绍我的解决方法。

虚拟主机怎样屏蔽指定IP或网段
---------------

一般，虚拟主机商都没有在主机管理里提供屏蔽IP访问的功能，当然，如果有你就方便很多。其实，即使虚拟主机商没有提供屏蔽指定IP访问的功能，我们也可以很简单地实现它。 方法很简单：在htaccess文件中加入屏蔽IP的字段。（htaccess文件的写法与作用在我前面的一篇文章有相当详细的讲解，如果你对防盗链、301重定向、自定义错误页面等有浓厚的研究兴趣，不妨看看这篇文章：[21 个非常有用的 .htaccess 提示和技巧](http://wangbaiyuan.cn/21_htaccess-_skills.html "21 个非常有用的 .htaccess 提示和技巧")。

禁止指定用户IP访问
----------

如果要屏蔽某一特定IP可以使用：

order allow,deny
deny from 10.16.0.1
allow from all

如果想要屏蔽多个IP地址，只需多加几个deny from 即可

order allow,deny
deny from 10.16.0.2
deny from 10.16.0.3
deny from 10.16.0.4
allow from all

如果需要屏蔽整个IP段，可以使用

order allow,deny
deny from 10.16.0
allow from all

如果只想屏蔽IP网段段中的一部分IP，则

order allow,deny
deny from 10.16.0.100/200
allow from all

仅允许指定IP访问
---------

方法很简单，把上面的 deny from 换成 allow from、deny from 换成 allow from 即可，比如：

order allow,deny
allow from 10.16.0.100/200
denyfrom all

允许IP段10.16.0.100至10.16.0.200的用户访问，其他IP一律无法访问。

定制403错误页面
---------

在限制访问的IP在访问网站的时候会响应403错误，但有时禁止的IP可能误判，你可以定制自己的403错误页面，提示访问者没有访问权限或者IP被屏蔽，并可以在网页中提供申诉途径。 如图： [![屏蔽ip](http://wangbaiyuan.cn/wp-content/uploads/2015/03/wangbaiyuan.cn_2015-03-26_08-54-10.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/03/wangbaiyuan.cn_2015-03-26_08-54-10.jpg)  

### 实现方法：

在htaccess中添加下述代码：

ErrorDocument 403 error/403.html

error/403.html根据实际情况填写路径，地址指向自己写的403页面。