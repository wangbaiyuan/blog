---
title: 局域网内远程桌面：让你的电脑如影随形
url: 222.html
id: 222
categories:
  - 技术
abbrlink: 36823
date: 2014-12-12 23:14:56
tags: ''
---

现在大家都有自己的电脑，由于使用时间较长都自己的电脑都有亲和感。但是在学校实验室，由于学校电脑的配置或老旧问题，让我们用的很不爽。所以我们不妨用学校的电脑连接自己的电脑进行远程登录，让自己的电脑如影随行。

### 1.打开自己电脑的远程登录权限

a.右键“计算机”，以此打开 属性-远程设置： ![](http://baiyuan.wang/wp-content/uploads/2014/12/20141212150833_10035.png) 在右侧的远程桌面我们看到有三个选项：不允许连接，允许任意版本连接，仅允许运行使用网络级别身份认证……。 在这里我建议勾选第二项即允许任意版本，这意味着不管你自己的电脑是不是win XP还是WIN 7，别人的win XP或者win7都能远程登录。如果大家在远程桌面出现无法连接的问题时不妨看看是不是这里出了问题。  

### 2.获取本机IP地址

获取IP地址可以点击电脑右下角网络图标，进入网络与共享中心-查看活动网络-本地连接（即你当前联网的网络连接），在常规选项卡中点击详细信息，便可获取自己的IPV4地址，即用作远程登录的IP地址； 你也可以在命令指示符中输入“ipconfig”获取当前的IP地址

### 3.打开他人电脑的远程桌面连接，键入IP地址连接

依次点击“开始”-所有程序-附件-远程桌面连接， ![](http://baiyuan.wang/wp-content/uploads/2014/12/20141213113234_70826.png) 键入第二步获取的IP地址，然后点击“连接”，之后就会进入用户登录界面。然后你就能享受远程登录的快感了。    

* * *

常见问题
----

a.以上配置均无问题还是“无法连接”？  

> 请看看防火墙有没有屏蔽远程桌面连接联网

b.远程桌面网速要求高，会不会也会消耗大量流量    

> 远程桌面如果在局域网内进行，一般不会消耗你的计费流量

 

* * *

便捷小贴士
-----

你可以把远程桌面连接配置保存，以便以便之后直接打开远程桌面文件直接连接，不用输入IP地址 方法：在上图点击“选项”下拉三角，连接设置-保存