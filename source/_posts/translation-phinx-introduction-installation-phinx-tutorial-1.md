---
title: 【译】Phinx的介绍与安装-Phinx教程(1)
tags:
  - Phinx
  - PHP
  - Web
  - 帮助文档
  - 翻译文章
url: 1447.html
id: 1447
categories:
  - 技术应用
abbrlink: 60764
date: 2015-08-24 10:38:17
---

> 本文由极客人原创翻译自：[http://phinx.readthedocs.org](http://phinx.readthedocs.org)，不周之处，敬请指正；系列文章请访问王柏元的博客[Phinx标签页](http://baiyuan.wang/tag/phinx)或者用极客搜搜索：Phinx 获取所有文章目录

 

介绍
--

一个训练有素的开发者，善于使用SCM系统（Software configuration management ：软件配置管理）对其程序代码进行版本控制；那么，为什么他们不使用相同的方式对数据库进行版本控制呢? Phinx允许开发者一种清晰、简洁的方式来修改和操作数据库，依托Phinx提供了一个强大的API，你无需手工编写SQL，而是使用PHP代码来创建代码迁移。然后开发者可以使用他们喜欢的SCM来进行代码迁移。这使得Phinx代码迁移可以移植于不同数据库系统之间。Phinx会对已经进行过的代码迁移进行跟踪，这样你就可以少担心数据库的状态,而是专注于开发更好的软件。 ![help](http://baiyuan.wang/wp-content/uploads/2015/08/help.jpg)

目标
--

开发Phinx的目的如下：

*   在常用数据库厂商之间轻松移植。
*   与PHP开发框架独立。
*   安装过程简单。
*   有一套易于使用的命令行操作。
*   与其他PHP工具(Phing、PHPUnit))和web框架集成使用。

安装
--

Phinx需要使用Composer进行安装，Composer 是 PHP 用来管理依赖(dependency)关系的工具。你可以在自己的项目中声明所依赖的外部工具库(libraries),Composer 会帮你安装这些依赖的库文件。详情可参考[Composer官网](http://getcomposer.org/)

### 注意： Phinx最低支持PHP5.3.2版本。

1.  安装Phinx，仅仅需要使用composer工具即可:执行下面命令进行安装（运行PHP命令需要自行配置好PHP环境变量，在环境变量path中加入PHP安装根目录）：
    
    php composer.phar require robmorgan/phinx
    
2.  然后运行composer:
    
    php composer.phar install --no-dev
    
3.  在您的项目中创建一个有可写权限的文件夹 migrations来存放迁移文件，然后在您的项目文件夹下执行命令：

php vendor/bin/phinx ini