---
title: 模拟UA实现访问只能在微信上打开的网页
tags:
  - UA
  - 微信
url: 1055.html
id: 1055
categories:
  - 计算机技术
abbrlink: 10807
date: 2015-03-29 11:15:45
---

今天，笔者打开学校的“小瓜工大助手”查跑操的页面，对它的网页源代码非常感兴趣。无奈网页的设计者只让用户在微信的自带浏览器中打开网页，而手机微信自带浏览器是没有审查元素、查看源代码之类的功能。我的第一感觉就是写代码的人肯定是采取UA匹配以限制其它终端访问的机制。所以，解决办法很简单，在电脑模拟一个微信浏览器，实现方法就是修改浏览器的UA（userAgent）。 试验结果很顺利： 通过微信右上角的菜单“复制链接”获取当前页面的链接：[http://npuxiaogua.mgschool.cn/wx/apps/paocao](http://npuxiaogua.mgschool.cn/wx/apps/paocao)

在电脑浏览器上打开时：
-----------

[![请用微信自带浏览器打开](http://baiyuan.wang/wp-content/uploads/2015/03/image_thumb10.png "请用微信自带浏览器打开")](http://baiyuan.wang/wp-content/uploads/2015/03/image10.png)

通过修改浏览器UA后的结果：
--------------

[![image](http://baiyuan.wang/wp-content/uploads/2015/03/image_thumb11.png "image")](http://baiyuan.wang/wp-content/uploads/2015/03/image11.png)

下面讲讲操作方法：
---------

 

一.“谷歌浏览器”审查元素
-------------

使用右键—“审查元素” [![谷歌浏览器”审查元素](http://baiyuan.wang/wp-content/uploads/2015/03/image_thumb12.png "谷歌浏览器”审查元素")](http://baiyuan.wang/wp-content/uploads/2015/03/image12.png) 点击审查元素手机小图标的按钮（element选项卡左边），进入模拟手机、平板电脑等其他终端的视图，下面在截图上做详解： [![谷歌浏览器模拟手机、平板电脑等其他终端](http://baiyuan.wang/wp-content/uploads/2015/03/image_thumb13.png "谷歌浏览器模拟手机、平板电脑等其他终端")](http://baiyuan.wang/wp-content/uploads/2015/03/image13.png) 现在只需要在上图的UA里填写一下微信的UA就行了。那么微信的UA是什么呢？

二、怎样获取访问者的UA信息
--------------

其实获取设备的UA很简单，任何一个网站的网站日志里面都会显示访问设备的UA信息：

### 下面是一段标准的网站日志：

61.*.43.34 - - \[25/Mar/2015:23:38:15 +0800\] "GET /how\_to\_write_robts-txt.html HTTP/1.1" 200 15071 "http://baiyuan.wang/javascript-implementation-article-copy-plus-copyright-information.html" "Mozilla/5.0 (Linux; U; Android 4.4.2; zh-CN; Lenovo A808t Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.2.1.550 U3/0.8.0 Mobile Safari/534.30" qxu1098410053.my3w.com text/html "/usr/home/qxu1098410053/htdocs/index.php" 858930

 

*   其中“61.*.43.34 ”是访问者的IP，
*   \[25/Mar/2015:23:38:15 +0800\]——访问日期
*   [http://baiyuan.wang/javascript-implementation-article-copy-plus-copyright-information.html](http://baiyuan.wang/javascript-implementation-article-copy-plus-copyright-information.html)—访问网址

### 网址后面的就是UA信息了：

Mozilla/5.0 (Linux; U; Android 4.4.2; zh-CN; Lenovo A808t Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.2.1.550 U3/0.8.0 Mobile Safari/534.30 通过上面的方法，笔者获取了微信自带浏览器的UA字段如下： Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12A365 MicroMessenger/5.4.1 NetType/WIFI

三、在谷歌浏览器终端模拟界面填写UA
------------------

Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12A365 MicroMessenger/5.4.1 NetType/WIFI 刷新你要访问的微信网页，就再也不会出现“本网页只能在微信自带浏览器中打开”了。

四、拓展与总结：
--------

1.可以通过上述方法模拟iPhone、ipad、安卓手机，从而在网页开发时用一台电脑即可知晓自己的网页在不同设备终端上的界面状况； 2.微信的UA为：Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12A365 MicroMessenger/5.4.1 NetType/WIFI