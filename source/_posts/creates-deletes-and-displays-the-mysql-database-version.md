---
title: MySql数据库创建、删除与显示版本
tags:
  - MySql
  - 数据库
url: 1077.html
id: 1077
categories:
  - 技术
abbrlink: 17826
date: 2015-04-08 11:49:13
---

4.1 创建数据库
---------

注意：创建数据库之前要先连接Mysql服务器  
命令：create database <数据库名>  

### 例1：建立一个名为xhkdb的数据库

  
   mysql> create database xhkdb;  

### 例2：创建数据库并分配用户

  
①CREATE DATABASE 数据库名;  
②GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER ON 数据库名.* TO 数据库名@localhost IDENTIFIED BY '密码';  
③SET PASSWORD FOR '数据库名'@'localhost' = OLD_PASSWORD('密码');  
依次执行3个命令完成数据库创建。注意：中文 “密码”和“数据库”是户自己需要设置的。

4.2 显示数据库
---------

命令：show databases （注意：最后有个s）  
mysql> show databases;  
注意：为了不再显示的时候乱码，要修改数据库默认编码。以下以GBK编码页面为例进行说明：  

### 1、修改MYSQL的配置文件：

my.ini里面修改default-character-set=gbk  

### 2、代码运行时修改：

  
   ①Java代码：jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=gbk  
   ②PHP代码：header("Content-Type:text/html;charset=gb2312");  
   ③C语言代码：int mysql\_set\_character_set( MYSQL * mysql, char * csname)；  
该函数用于为当前连接设置默认的字符集。字符串csname指定了1个有效的字符集名称。连接校对成为字符集的默认校对。该函数的工作方式与SET NAMES语句类似，但它还能设置mysql- > charset的值，从而影响了由mysql\_real\_escape_string() 设置的字符集。

4.3 删除数据库
---------

命令：drop database <数据库名>  

### 例如：删除名为 xhkdb的数据库

  
mysql> drop database xhkdb;  

#### 例子1：删除一个已经确定存在的数据库

  
   mysql> drop database drop_database;  
   Query OK, 0 rows affected (0.00 sec)  

#### 例子2：删除一个不确定存在的数据库

  
   mysql> drop database drop_database;  
   ERROR 1008 (HY000): Can't drop database 'drop_database'; database doesn't exist  
      //发生错误，不能删除'drop_database'数据库，该数据库不存在。  
   mysql> drop database if exists drop_database;  
   Query OK, 0 rows affected, 1 warning (0.00 sec)//产生一个警告说明此数据库不存在  
   mysql> create database drop_database;  
   Query OK, 1 row affected (0.00 sec)  
   mysql> drop database if exists drop_database;//if exists 判断数据库是否存在，不存在也不产生错误  
   Query OK, 0 rows affected (0.00 sec)

4.4 连接数据库
---------

命令： use <数据库名>  
例如：如果xhkdb数据库存在，尝试存取它：  
   mysql> use xhkdb;  
屏幕提示：Database changed  
**use 语句可以通告MySQL把db_name数据库作为默认（当前）数据库使用，用于后续语句。**该数据库保持为默认数据库，直到语段的结尾，或者直到发布一个不同的USE语句：  
   mysql> USE db1;  
   mysql> SELECT COUNT(*) FROM mytable;   # selects from db1.mytable  
   mysql> USE db2;  
   mysql> SELECT COUNT(*) FROM mytable;   # selects from db2.mytable  
**使用USE语句为一个特定的当前的数据库做标记，不会阻碍您访问其它数据库中的表。**下面的例子可以从db1数据库访问作者表，并从db2数据库访问编辑表：  
   mysql> USE db1;  
   mysql> SELECT author\_name,editor\_name FROM author,db2.editor  
       ->        WHERE author.editor\_id = db2.editor.editor\_id;  
USE语句被设立出来，用于与Sybase相兼容。  
有些网友问到，连接以后怎么退出。其实，不用退出来，use 数据库后，使用show databases就能查询所有数据库，如果想跳到其他数据库，用  
   use 其他数据库名字  
就可以了。

4.5 当前选择的数据库
------------

命令：mysql> select database();  
MySQL中SELECT命令类似于其他编程语言里的print或者write，你可以用它来显示一个字符串、数字、数学表达式的结果等等。如何使用MySQL中SELECT命令的特殊功能？  

### 1.显示MYSQL的版本

  
mysql> select version();  
+-----------------------+  
| version()             |  
+-----------------------+  
| 6.0.4-alpha-community |  
+-----------------------+  
1 row in set (0.02 sec)  

### 2\. 显示当前时间

  
mysql> select now();  
+---------------------+  
| now()               |  
+---------------------+  
| 2009-09-15 22:35:32 |  
+---------------------+  
1 row in set (0.04 sec)  

### 3\. 显示年月日

  
SELECT DAYOFMONTH(CURRENT_DATE);  
+--------------------------+  
| DAYOFMONTH(CURRENT_DATE) |  
+--------------------------+  
|                       15 |  
+--------------------------+  
1 row in set (0.01 sec)  
SELECT MONTH(CURRENT_DATE);  
+---------------------+  
| MONTH(CURRENT_DATE) |  
+---------------------+  
|                   9 |  
+---------------------+  
1 row in set (0.00 sec)  
SELECT YEAR(CURRENT_DATE);  
+--------------------+  
| YEAR(CURRENT_DATE) |  
+--------------------+  
|               2009 |  
+--------------------+  
1 row in set (0.00 sec)  

### 4\. 显示字符串

  
mysql> SELECT "welecome to my blog!";  
+----------------------+  
| welecome to my blog! |  
+----------------------+  
| welecome to my blog! |  
+----------------------+  
1 row in set (0.00 sec)  

### 5\. 当计算器用

  
select ((4 * 4) / 10 ) + 25;  
+----------------------+  
| ((4 * 4) / 10 ) + 25 |  
+----------------------+  
|                26.60 |  
+----------------------+  
1 row in set (0.00 sec)  

### 6\. 串接字符串

  
select CONCAT(f\_name, " ", l\_name)  
AS Name  
from employee_data  
where title = 'Marketing Executive';  
+---------------+  
| Name          |  
+---------------+  
| Monica Sehgal |  
| Hal Simlai    |  
| Joseph Irvine |  
+---------------+  
3 rows in set (0.00 sec)  
注意：这里用到CONCAT()函数，用来把字符串串接起来。另外，我们还用到以前学到的AS给结果列'CONCAT(f\_name, " ", l\_name)'起了个假名。