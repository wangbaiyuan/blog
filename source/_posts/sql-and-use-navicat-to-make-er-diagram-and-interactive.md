---
title: 用Navicat制作ER图及与SQL互相转化
tags:
  - MySql
  - Navicat
  - 数据库
  - 软件工程
  - 软件推荐
url: 1213.html
id: 1213
categories:
  - 技术应用
abbrlink: 53334
date: 2015-05-21 11:45:09
---

Navicat极客人在数据库学习过程中用过的个人认为最优秀的一款数据库连接、设计、编辑查询软件。它不仅是极客人用过的数据库软件中**界面最美观**的一款，也是功能最强大、操作最简单的一款，Navicat分别有for MySQL、for MariaDB、for SQL Server、for SQLite、for Oracle 和 for PostgreSQL等多个单一数据库版本，同时也有Navicat Premium这个综合版本，Navicat Premium 是一个可多重连接的数据库管理工具，它可让你以单一程序同时连接到 MySQL、MariaDB、SQL Server、SQLite、Oracle 和 PostgreSQL 数据库，支持大部分在现今数据库管理系统中使用的功能，包括存储过程、事件、触发器、函数、视图等，同时可以在这款软件中为数据库添加用户、设置权限。 极客人使用Navicat除了以上常见功能外，还会使用navicat进行数据库**数据备份、同步**，将王柏元的博客上虚拟机数据库的数据备份、同步到本地，或者用navicat进行网站搬家。本人主要介绍怎样用Navicat制作ER图及与SQL互相转化：将数据库表导出成ER图和将ER图导出为SQL语句（这个功能也是极客人无意发现的，刚刚学习，欢迎共同交流！）。

一、用Navicat制作ER图
---------------

  分别打开navicat的“模型”——“新建模型” [![navicat制作ER图](http://baiyuan.wang/wp-content/uploads/2015/05/navicatForER_compressed.jpg)](http://baiyuan.wang/wp-content/uploads/2015/05/navicatForER_compressed.jpg) navicat制作ER图  

二、将ER图导出为SQL语句
--------------

如图 [![Navicat根据ER图导出为SQL](http://baiyuan.wang/wp-content/uploads/2015/05/EXportToSQL_compressed.jpg)](http://baiyuan.wang/wp-content/uploads/2015/05/EXportToSQL_compressed.jpg) Navicat根据ER图导出为SQL 打开工具——导出SQL 这样只要设计出ER图，所有的建表语句，包括主键、外键关系，Navicat将自动为我们生成。

三、将现成的数据库转换为ER图
---------------

选中已连接的数据库中 数据表——右键，选择“逆向数据库到模型”，即可根据现成的数据库生成ER图模型。