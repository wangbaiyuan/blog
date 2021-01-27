---
title: 用.htpasswd设置网站目录、文件访问密码
tags:
  - htaccess
  - 网站安全
url: 1288.html
id: 1288
categories:
  - 计算机技术
abbrlink: 47824
date: 2015-06-16 23:05:14
---

不知道什么原因，王柏元的博客近两天频遭恶意登录攻击，大概一天晚上极客人收到了系统发送的登录错误提醒邮件高达100封，这让极客人十分苦恼。为此极客人想到了利用htaccess+.htpasswd设置网站目录、文件访问密码的方式保护网站登录相关的关键文件和目录，这样恶意登录就不会如此猖獗，这为网站安全加了双保险。对于更多的网站安全保护方法，请参考[强化WordPress网站安全的 12 个方法](http://wangbaiyuan.cn/12-way-to-enhance-the-wordpress-web-site-security.html)，当然这些方法不仅仅针对wordpress。

保护目录
----

在要设置密码访问的目录下新建htaccess文件，加入语句：

AuthUserFile /home/wangbaiyuan.cn/htdocs/.htpasswd
AuthType Basic
AuthName "please enter password!"
Order Deny,Allow
Deny from all
Require valid-user
Satisfy any

注意AuthUserFile 后面是.htpasswd文件的路径，这个路径是主机商给你的绝对路径，不是带你的域名的路径。在.htpasswd文件中记录了用户名和密码，不过这些用户名和密码都是加密过的非明文密码。 密码存放的格式是： 用户名:密码 怎样生成htpasswd密码请访问：http://tool.oschina.net/htpasswd [![htpasswd在线生成](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-16_22-53-31.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-16_22-53-31.jpg) htpasswd在线生成 将生成结果复制后保存在一个命名为“.htpasswd”的文件中，放在网站根目录。注意AuthUserFile 后面就是这个.htpasswd文件的路径。

密码保护网站文件
--------

<Files wp-login.php>
AuthUserFile /home/wangbaiyuan.cn/htdocs/.htpasswd
AuthType Basic
AuthName "please enter password!"
Order Deny,Allow
Deny from all
Require valid-user
Satisfy any
</Files>

正如你所见方法和保护目录类似。 至于设置限制IP访问指定文件你可以参考[强化WordPress网站安全的 12 个方法](http://wangbaiyuan.cn/12-way-to-enhance-the-wordpress-web-site-security.html)。

效果预览
----

[![htpasswd设置密码保护目录](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-16_23-00-37.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-16_23-00-37.jpg) htpasswd设置密码保护目录