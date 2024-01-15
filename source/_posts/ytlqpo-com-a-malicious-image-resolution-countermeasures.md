---
title: 被.ytlqpo.com恶意镜像的解决、反制措施
tags:
  - htaccess
  - PHP
  - SEO
  - Web
  - 网站安全
url: 1205.html
id: 1205
categories:
  - 技术应用
  - 计算机技术
abbrlink: 51022
date: 2015-05-19 13:22:16
---

前天在百度搜索王柏元的博客网站关键词时，猛地在百度结果的第一页中发现了一个标题、简介和我完全一样的网站，不看不知道，这个网站还不是传统意义上的抄袭、盗链，不仅仅把我的网站全部照搬，而且把网页里所有的链接都置换成那个镜像网站地址的。 我这才知道：我的网站被人家恶意镜像了。 和一般的镜像不太一样，这个镜像网站不仅仅是针对我一个网站，而是自动镜像。主要表现为：

*   ①我的网址：[http://baiyuan.wang](http://baiyuan.wang);镜像网址就是：wangbaiyuan.ytlqpo.com。另外一个网站网址：[http://weixin.baiyuan.wang](http://weixin.baiyuan.wang),镜像网址就是weixinwangbaiyuan.ytlqpo.com经过本人测试：把你的网站网址去掉主机记录和顶级域名，加上.ytlqpo.com，就知道你自己有没有被镜像！
*   ②为镜像网站里所有链接添加镜像，比如我的网站里有个友情链接：[http://www.zhiyanblog.com](http://www.zhiyanblog.com),这个友情链接就会置换成：zhiyanblog.ytlqpo.com.

一、经过本人测试中招的大网站有：
----------------

360\. ytlqpo.com 镜像360网站 sogou. ytlqpo.com 镜像搜狗搜索 qq. ytlqpo.com 镜像qq官网 net. ytlqpo.com 镜像万网官网

haosou. ytlqpo.com 镜像好搜网站

[![360被镜像](http://baiyuan.wang/wp-content/uploads/2015/05/baiyuan.wang_2015-05-19_09-21-30.jpg)](http://baiyuan.wang/wp-content/uploads/2015/05/baiyuan.wang_2015-05-19_09-21-30.jpg) 号称安全神站的360也未能幸免 不过恭喜百度搜索主页神奇地幸免了

二、测试的站长朋友网站被镜像的有：
-----------------

zhiyan blog.ytl qpo.com 镜像[http://www.zhiyanblog.com](http://www.zhiyanblog.com) nai ba.ytlqpo.com 镜像naiba.im wangb aiyuan .ytlqpo.com 镜像[http://baiyuan.wang](http://baiyuan.wang)

三、恶意镜像很危险
---------

恶意镜像由于照搬了源站的所有内容，如果你的网站权重不够高就苦逼了，百度如果分不清哪个源站，难保把你当抄袭，如果你的权重干不过人家的话。不管你的权重高不高，被恶意镜像的网站无疑会削弱你的权重，因为百度蜘蛛发现了大量和你网站一模一样的内容。虽然网上有很多恶意镜像的解决办法，但是我感觉我这次遇到的情况和网上的都不太一样，使用网上许多方法都不奏效。

四、解决与反制措施
---------

在尝试多种方法无效后，我想到了一个权宜之计：禁止恶意镜像网站的访问IP，之所以说是权宜之计，因为难保它的IP会变，还有这个IP不是镜像网址的解析IP 因为多次尝试解决问题过程中，我发现这个恶意镜像的网站的原理大概是：别人访问abc.ytlqpo.com 的时候，它会访问一下(www)abc.com(cn\\net\\cc\\xyz\\wang),然后把访问的结果修改一下链接返回给你。所以，它必须有一个访问源站的过程。于是乎解决方案就是禁止这个访问IP. 在搜寻海量的网站日志没有确认这个IP后，我写了一个PHP文件来截获这个访问IP。

1.截获IP
------

<?
$file = "ip.txt";//保存的文件名
$ip = $\_SERVER\['REMOTE\_ADDR'\];
$handle = fopen($file, 'a');
fwrite($handle, "IP Address: ");
fwrite($handle, "$ip");
fwrite($handle, "\\n");
fclose($handle);
?>

将上述文件命名为“ip.php”放在网站根目录,然后我通过镜像网站网址访问wangbaiyuan.ytlqpo.com/ip.php，然后在上述PHP程序生成的ip.txt中获取了这个IP： **104.194.16.230** （美国）

### 2.屏蔽IP

**在htaccess中添加下述代码：**

Deny from 104.194.16.230

对于htaccess屏蔽IP的方法，我的之前一篇文章有详细介绍：[htaccess屏蔽ip访问](http://baiyuan.wang/web-hosting-how-to-block-specified-ip-or-network-segments.html)。 当你再次用镜像网址访问你的网站的时候就会报403错误了，现在百度即使收录了这个网址对你的网站也不会产生任何影响.

### 3.反制措施

为了给这个镜像网站小小的“反击”，我决定把这个403错误页面设置为其他网站网址，实现方法是在屏蔽IP的htaccess代码中添加：

ErrorDocument 403 http://news.baidu.com/

这样你访问你的镜像网址时，会发现它镜像的是其实百度新闻。（不知道百度蜘蛛发现一个网站在完全抄袭自己家的东西会是什么感觉）

#### 演示效果：

wangb aiyuan .ytlqpo.com(为了不给这个网址做传递权重和宣传，防止产生链接效果，请自行复制此链接去掉空格在浏览器中打开) 当然你写可以根据个人需求让你的镜像网址转向镜像其他的网站，比如： **借助它Fanqiang！**