---
title: 使用.htaccess文件实现301重定向常用的七种方法
tags:
  - htaccess
  - SEO
  - Web
  - 域名解析
url: 538.html
id: 538
categories:
  - 技术
abbrlink: 52337
date: 2015-01-06 21:30:33
---

 使用.htaccess文件实现301重定向常用的七种方法
-----------------------------

301重定向对广大站长来说并不陌生，从网站建设到目录优化，避免不了对网站目录进行更改，在这种情况下用户的收藏夹里面和搜索引擎里面可能保存的还是老的地址，在打开这些链接时会无法显示页面出现404的错误，造成很差的用户体验并失去了很多流量，今天笔者就给大家分享一下实现301重定向的七种方法。

从搜索引擎优化的角度来看，目前301重定向是网站目录更改后重新定向最为可行的一种办法。在你更改地址使用了301重定向后，搜索引擎只会对新地址进行索引，同时会把旧地址下原来收录的链接转移到新地址下，而上述的这些操作并不会影响到网站在搜索引擎的排名。

实现301重定向最直接的方法是编辑.htaccess文件，想了解关于htaccess文件使用方法，请点此查看。园子需要提醒你的是，在对.htaccess文件进行操作之前，一定要备份好原来的.htaccess文件，以避免修改出错带来不必要的麻烦。

1.重定向domain.com到www.domain.com
------------------------------

这种重定向非常常见，最终目的是实现域名的唯一性，也是seo必须要做的。实现方法是在.htaccess文件中加入以下规则：

代码如下:

RewriteEngine On
RewriteCond %{HTTP_HOST} !^www.domain.com$ \[NC\]
RewriteRule ^(.*)$ http://www.domain.com/$1 \[L,R=301\]

注：使用这种301重定向方式后，当你打开类似domain.com的网址后会自动定向到www.domain.com。

2.重定向www.domain.com到domain.com
------------------------------

这种操作刚好和上面的域名显示是相反的，规则如下：

代码如下:

RewriteEngine On
RewriteCond %{HTTP_HOST} !^domain.com$ \[NC\]
RewriteRule ^(.*)$ http://domain.com/$1 \[L,R=301\]

注：使用此301重定向方式，当你打开类似www.domain.com的网址后会自动定向到domain.com。

3.重定向olddomain.com 到 newdomain.com
----------------------------------

这种操作经常用于更换域名时用到，很多站长因为种种原因可能要为站点更换域名，此时多采用以下规则来实现重新定向：

代码如下:

RewriteEngine On
RewriteBase /
RewriteCond %{HTTP_HOST} !olddomain.com$ \[NC\]
RewriteRule ^(.*)$ http://newdomain.com/$1 \[L,R=301\]

注：当用户打开老的域名后，会自动重定向到新的域名下的站点，此时域名显示格式为不带www.的格式。

4.重定向olddomain.com 到 www.newdomain.com
--------------------------------------

这种操作是基于第三种方式的改良，只是显示网址显示为带www.的那种。

代码如下:

RewriteEngine On
RewriteCond %{HTTP_HOST} !olddomain.com$ \[NC\]
RewriteRule ^(.*)$ http://www.newdomain.com/$1 \[L,R=301\]

注：当用户打开老的域名后，会自动重定向到新的域名下的站点，并且网址显示格式为带www.的格式。

5.重定向domain.com/file/file.php 到 otherdomain.com/otherfile/other.php
-------------------------------------------------------------------

这种操作针对于更改一个域名的同时，网站目录路径也发生变化的情况下使用，规则如下：

代码如下:

RewriteCond %{HTTP_HOST} ^www.domain.com$
RewriteRule ^file/file.php$ http://www.otherdomain.com/otherfile/other.php \[R=301,L\]

注：当用户访问老的域名路径时，会重新定向到新的域名新的路径下。

6.IIS服务器下实现301重定向
-----------------

具体方法如下：打开internet信息服务管理器，在欲重定向的网页或目录上按右键，选中“重定向到URL”， 在对话框中输入目标页面的地址，切记要选中“资源的永久重定向”最后点击“应用”即可。

注：再次提醒你，一定要选中“资源的永久重定向”。

7.Apache服务器实现301重定向
-------------------

在Apache服务器实现301重定向的方法园子在以前的文章中提到过，只需要在.htaccess文件中加入以下规则：

代码如下:

Redirect /旧目录/旧文档名 新文档的地址

也可能是：

代码如下:

Redirect /olddirectory http://www.newsite.com/newdirectory

\[callout class="warning" title=""\]注：一定要注意书写格式，第一种是同一域名下将一个文档定向到新的目录地址，第二种是把老目录定义到新域名的新目录下。\[/callout\]

以上七种方法是在网站管理与优化过程中经常会使用到的301重定向方法，当然，你也可能遇到不大相同的状况，这时候就需要根据自己的目的去适当调整下命令规则以适应不同的需求。