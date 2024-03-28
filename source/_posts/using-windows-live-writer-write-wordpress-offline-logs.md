---
title: 用Windows Live Writer离线写WordPress日志
url: 814.html
id: 814
categories:
  - 技术
abbrlink: 34932
date: 2015-02-27 18:55:07
tags: ''
---

在前一篇博客向大家介绍了用word写wordpress博客的方法，可能使用的朋友发现，word并不能为文章设置标签，设置发布日期，预览和查看源代码，如果你对Word写wordpress博客不满意，那么推荐你一款非常友好的软件：Windows Live Writer（简称WLW）。这里向大家介绍一下如何用Windows Live Writer 离线写WordPress日志

WLW可以自动侦测并保存您的网络日志的视觉主题。所以，您可以在博客发布之前，在写日志的过程中真切地看到日志的外观和排版，再也不必浪费时间来联机预览了。需要指出的是，它几乎可以完成你所有在线能做到的一切！

**现针对WordPress博客的设置详解，如下：**

步骤一：准备工作
--------

1、官方网站下载 Windows Live Writer 软件，地址：[Windows Live Writer 2011（简体中文版）](http://explore.live.com/windows-live-writer?os=other)

2、登录你的WordPress管理员后台，在【设置-撰写】的“远程发布”项内，激活启动“XML-RPC”（启用 WordPress，Movable Type，MetaWeblog和Blogger 的 XML-RPC发布协议）。

步骤二：安装软件
--------

运行安装程序，勾选Writer进行安装。

此外，你可以安装根据所需选择要安装其他应用软件（因为下载的是微软Windows Live软件包，所以里面涵盖了微软很多其他软件工具，请根据所需勾选下载）

步骤三：设置Windows Live Writer
-------------------------

1\. 安装完Writer后，会自动弹出如下图提示，点击下一步。

[![steps1](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/125801wXV.png "steps1")](http://xuhehuan.com/wp-content/uploads/2011/09/steps1.png)

2\. 选择”WordPress”，点击下一步。（如果您现在使用的日志服务没有在列表中，请选择“其他服务”，下面我将按“其他服务”的选项进行详解）

[![steps2](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/1258026xY.png "steps2")](http://xuhehuan.com/wp-content/uploads/2011/09/steps2_thumb.png)

3\. 点击下一步后，会提示您填写日志帐户信息。日志网址处请填写您的博客主页地址。用户名和密码为您博客后台的登录用户名和密码（不是您设置的日志显示昵称）。如果您的电脑非公用，可勾选“记住我的密码”。

[![steps3](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/125804r6p.png "steps3")](http://xuhehuan.com/wp-content/uploads/2011/09/steps3_thumb.png)

4\. 填写完帐户内容后，点击下一步，开始检测连接您的帐户，如下图。

[![steps4](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/1258052en.png "steps4")](http://xuhehuan.com/wp-content/uploads/2011/09/steps4_thumb.png)

注：如果在连接日志服务器时，出现如下错误提示，需要手动修改相关文件：

提示出错信息：“**无法连接到您的日志服务:服务器响应无效 – 从日志服务器接收的对 blogger.getUsersBlogs 方法的响应无效:Invalid response document returned from XmlRpc server 请尝试解决问题，然后重试**。”

[![windowslivewriter](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/125806sY2.png "windowslivewriter")](http://xuhehuan.com/wp-content/uploads/2011/09/windowslivewriter.png)

问题出现的根本原因是因为WordPress本身的一个bug，在utf-8编码下，xml-rpc返回的格式不正确，缺少了三个字节，要修正这个问题，操作如下：

a) 找到class-IXR.php文件（注意：wordpress 2.9之前的版本，文件名可能是chass.ixr.php），该文件位于博客根目录wp-includes文件夹下，然后用一个文本编辑工具打开它（推荐使用editplus）；

b) 查找到以下语句：

> **$length = strlen($xml);**

将其替换为：

> **$length = strlen($xml)+3;**

**大家注意：以上方法针对2.9之后的版本，**在wordpress 2.9之前的版本中没有class.ixr.php 文件，而是叫chass.ixr.php文件，它其实是WordPress升级后将**chass.ixr.php** 文件变成了**class-IXR.php**。不论哪种版本，按照上面的解决办法修改class-IXR.php/或chass.ixr.php文件，问题很容易就解决了！

5\. 检测过程中会出现“是否要发布临时日志”的提示窗口，如下图。建议直接选择“否（N）”。

[![steps5](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/125808fXn.png "steps5")](http://xuhehuan.com/wp-content/uploads/2011/09/steps5_thumb.png)

6\. 检测完毕之后，会出现下面的窗口，默认情况下会直接提取您的博客Title。当然，您也可以自行输入昵称。点击“完成”，设置成功。

[![steps6](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/125809wTc.png "steps6")](http://xuhehuan.com/wp-content/uploads/2011/09/steps6_thumb.png)

当您想重新修改日志设置信息时，可以在WLW的“管理日志帐户”中重新编辑修改。如图：

[![steps7](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/125810R0L.png "steps7")](http://xuhehuan.com/wp-content/uploads/2011/09/steps7_thumb.png)

设置完以后就可以用Windows Live Writer写博客了，相比Wordpress自带的编辑器有很多优势，尤其对于多图日志，离线编写减少了上传图片的繁琐性。Writer的插入表格和地 图功能也是Wordpress自带编辑器所没有的，由于Windows Live Writer是微软的产品，所以插入的地图是Bing地图。

用Windows Live Writer离线写WordPress日志
----------------------------------

Windows Live Writer还可以设置日志类别、Ping设置、作者、摘要、发布日期、标签、数据域（永久链接）等几乎所有Wordpress编辑器自带的功能（如下 图），但我用习惯的Simple Tags的一键标签（Click tags）功能，如果一定要用到的话可以使用Windows Live Writer发布完了再去Wordpress编辑器上再编辑一下。

[![steps8](http://baiyuan.wang/wp-content/uploads/auto_save_image2015/02/125812H4s.png "steps8")](http://xuhehuan.com/wp-content/uploads/2011/09/steps8_thumb.png)

Windows Live Writer的预览功能比Wordpress要更加完善，点击预览按钮，可以直接预览发布后的效果（如果没有显示效果，请尝试联机更新主题）。

**Windows Live Writer** **最近发表和草稿存放目录**

虽然Windows Live Write没有提供备份草稿的功能，但是我们可以通过复制Windows Live Write的安装目录中的文件，从而达到备份Windows Live Write的草稿。（由于默认安装在C盘下，所以如果你重装系统时，务必要将相关的Windows Live Write草稿文件夹进行备份）

**最近发表和草稿存放目录的路径：**C:Documents and SettingsUserNameMy DocumentsMy Weblog Posts（这里的“C”指的是系统所在硬盘分区的盘符。如果“我的文档”目录另有指定位置，则应该进入之前指定的位置），进入该文件夹中会看到“Drafts”、“Recent Posts”两个目录。

**Drafts****：**草稿的存放目录，保存的日志以wpost文件格式存在，可以用WLW直接打开。

**Recent Posts****：**最近发表的存放目录，保存的日志以wpost文件格式存在，可以用WLW直接打开。

由于备份草稿默认放在系统盘，为了避免系统重装或出现其他问题，尽量定期备份将该目录到其他分区或U盘中。在系统重装完成并安装Windows Live Writer之后，再把“Drafts”恢复到原来的目录文件夹，便可恢复Windows Live Writer草稿，非常方便。

Windows Live Writer下载
---------------------

\[button class="default" size="lg" href="http://www.baidu.com" title="下载"\] 下载 \[/button\]