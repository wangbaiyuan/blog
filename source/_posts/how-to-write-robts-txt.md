---
title: 网络蜘蛛访问控制文件robot.txt的写法
tags:
  - robots.txt
url: 964.html
id: 964
categories:
  - 算法语言
abbrlink: 53729
date: 2015-03-14 15:48:06
---

虽然说对于广大站长来说，我们可能希望搜索引擎收录我们的网页越多越好，但是有的时候我们并不希望搜索引擎收录我们的一些网页，比如后台登陆页面，密码保护页面，私密页面。搜索引擎网络爬虫，我们常常把它称为搜索“蜘蛛”，因为这些“蜘蛛”沿着网络上的链接爬行可谓无网不入，曾经笔者甚至无语的发现，谷歌图片的搜索蜘蛛连我的个人用户头像都收录，这种殷勤令我哭笑不得。 所以网站的根目录常常有一个叫“robot.txt”的文件，robot是英语“机器人”的意思，你可以理解为网络机器人，也就是搜索蜘蛛，通过这个文件中的文本来告诉搜索引擎，哪个目录，哪个页面或者什么格式的图片不想被收录。

先给大家讲几个例子：
----------

[](http://jingyan.baidu.com/article/)[](http://jingyan.baidu.com/article/)

#禁止admin页面
user-agent:*
Disallow:/admin/
Disallow:/*.jpg$

### 第一行：“#禁止admin页面”

第一个字符“#”，表示注释，可以随意写不对蜘蛛爬行产生任何效果，主要的作用就是提醒自己接下来一段代码是什么目的。

### 第二行代码：“user-agent:*

user-agent汉译为用户代理，你可能在网站日志里可以看到这个单词，手机浏览器的“UA标识”也是这个词，在robot.txt里你可以理解为“访问用户（搜索蜘蛛）的身份”。 常见的搜索蜘蛛标识有：

1.谷歌Google蜘蛛 Googlebot Googlebot-Mobile Googlebot-Image Mediapartners-Google Adsbot-Google

2.百度(Baidu)蜘蛛 Baiduspider

3.雅虎(Yahoo)蜘蛛 Yahoo!+Slurp Yahoo!+Slurp+China：雅虎中国蜘蛛

4.有道(Yodao)蜘蛛 YodaoBot YoudaoBot YodaoBot-Image

5.搜搜(Soso)蜘蛛 Sosospider Sosoimagespider

6.微软(Bing和MSN)蜘蛛 bingbot msnbot msnbot-media

7.搜狗(Sogou)蜘蛛 Sogou Web Sprider Sogou Orion spider Sogou-Test-Spider

“user-agent:*”其中“*”是通配符，表示“所有”，意思就是要告诉所有的搜索引擎“：你们要注意了！下面就是我要告诉你们的内容！”，“user-agent:*”下面的代码对所有蜘蛛都有效；如果是”user-agent:Baiduspider “在段落头，表示下面这段代码是对百度蜘蛛说的，其他蜘蛛不受下面代码控制。

### 第三行代码：“Disallow:/admin/”

disallow，是”不允许“之意，表示”你的网站地址/admin“这个目录下的网页不允许蜘蛛访问抓取， 例如我还可以不想让搜索引擎收录我网站的bbs目录，那我就可以写成“Disallow:/bbs/”，如果是多个目录，一个目录写一行，下一个目录换一行写，以此类推就可以了。如果你整个网站都不让抓取，比如你的网站正在调试内测时，可以写”disallow:*“;另外，”disallow:/wp*“表示包括”wp-content、wp-include“等网站根目录下以wp为前缀的目录都禁止蜘蛛爬行。

### 第四行代码：“Disallow:/*.jpg$”

这行代码就是要告诉搜索引擎，我不需要你收录以.jpg结尾的所有图片文件。例如我还可以不想让搜索引擎收录我网站的.png格式的图片，那我就可以写成“Disallow:/*.png$”如果是多个文件格式，一个文件格式写一行，下一个文件格式换一行写，以此类推就可以了。

总结
--

1.写完之后你就可以把他保存成名为”robot.txt“（文件名必须如此）的文件，用FTP上传到你网站的根目录就可以了！ 2.网站的网页不是收录越多越好，大家都知道搜索引擎比较网络上的网页相似度（相似度太高的两个页面会分散权重）的时候，不仅仅会进行不同网站间的纵向比较，而且会进行同一网站不同页面间的比较，所以，比如对于个人博客的作者归档和首页，页面内容差不多一样，我们完全可以屏蔽蜘蛛访问作者归档的页面。当然，你可以酌情控制你的日期归档、目录归档是否让搜索蜘蛛抓取。