---
title: notepad++的高级功能：编译java、C++
tags:
  - C++
  - JAVA
  - 软件推荐
url: 1194.html
id: 1194
categories:
  - 技术应用
abbrlink: 62248
date: 2015-05-17 10:39:42
---

Notepad++是极客人非常喜欢的一款电脑客户端的编辑器，它的安装包只有7.9M，但是功能却十分强大，界面简单、启动速度快，用它替代系统的“记事本”是个不错的选择。极客人常用的功能有查找替换（支持正则表达式）、文件转编码，同时它的代码高亮、代码折叠也十分实用，还可以根据你自己的爱好改变代码高亮的风格主题。同时它具有插件扩展功能，安装插件使它具有无限可能。 Notepad++支持的文件类型有： C、C++、Java、C#、XML、HTML、PHP、CSS、makefile、ASCII艺术(.nfo)、doxygen、ini文件、批处理文件、Javascript、ASP、VB、VBS、SQL、Objective-C 、Pascal、Perl、Python、LuaTeX、TCL汇编言、Ruby、Lisp、Scheme、Properties、DiffSmalltalk。 除了强大的编辑能力外，其实我们也可以直接在Notepad++里直接编译运行java、C++代码，这样我们不至于写一个简单的“hello world”也要新建一个eclipse项目，它可以直接编译单个的java文件，和C一样；编辑html的时候也不用打开启动速度极慢的dreamweaver了。虽然它没有专业的编程工那样具有强大的调试功能，但作为轻量级的编程工具还是十分不错的。

1.下载安装NppExec插件
---------------

分别打开插件——pluginManeger菜单，点击“Show Plugin Manager”打开Notepad++的插件管理： [![下载安装NppExec插件](http://wangbaiyuan.cn/wp-content/uploads/2015/05/image_thumb5.png "下载安装NppExec插件")](http://wangbaiyuan.cn/wp-content/uploads/2015/05/image5.png)   在available选项卡中找到“NppExec”选择安装，重启notepad++。

2.按F6编译并运行java文件
----------------

notepad++本身并不具备编译功能，而是调用已注册为系统环境变量的JDK工具的编译功能，其实eclipse这些软件也是这样，它们只是编辑器。编译的快捷键是F6 第一次编译的时候，我们需要设置一下编译命令，下面是无参数、无jar引用的java文件编译命令

javac  "$(FULL\_CURRENT\_PATH)"
java -cp $(CURRENT\_DIRECTORY  $(NAME\_PART)

  然后保存为：“java编译”，以后直接选择它作为模板编译。

3、带参数、带jar引用的java文件编译命令
-----------------------

不知道细心的朋友有没有发现，上面的编译命令和命令指示符里编译运行的命令是一样的，所有懂得命令指示符编译的朋友可以自己修改编译命令，编译C++的原理也是一样。 下面是带参数、带jar引用的java文件编译命令：

javac  "$(FULL\_CURRENT\_PATH)"
java -cp "$(CURRENT\_DIRECTORY)";"$(CURRENT\_DIRECTORY)/json.jar" $(NAME_PART)

在上面的编译命令中，我在-cpp(classpath)参数"$(CURRENT\_DIRECTORY)"后面添加了“;$(CURRENT\_DIRECTORY)/json.jar”，这表示我引用了当前文件夹下“json.jar”这个外部jar引用.

### 实例展示：

[![image](http://wangbaiyuan.cn/wp-content/uploads/2015/05/image_thumb6.png "image")](http://wangbaiyuan.cn/wp-content/uploads/2015/05/image6.png)  

### 文件路径关系：

[![image](http://wangbaiyuan.cn/wp-content/uploads/2015/05/image_thumb7.png "image")](http://wangbaiyuan.cn/wp-content/uploads/2015/05/image7.png)