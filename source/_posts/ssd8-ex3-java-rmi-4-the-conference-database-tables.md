---
title: SSD8_Ex3【JAVA_RMI】(4)会议数据库建表
tags:
  - JAVA
  - MySql
  - SSD8
  - 分布式系统
  - 数据库
  - 计算机网络
url: 1270.html
id: 1270
categories:
  - 技术应用
  - 算法语言
abbrlink: 54179
date: 2015-06-11 12:23:06
---

为了更好管理会议和更好更有效率执行删除、添加、查询等操作，本次SSD8\_Ex3【JAVA\_RMI】，极客人结合数据库系统知识，决定采用数据库来管理会议。因为这次练习的各个题目都是典型的数据库题，虽然它被放在了网络与分布式计算课程上。

系列文章链接：
-------

[SSD8\_Ex3【JAVA\_RMI服务】(1)概述RMI和网络API](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-services-1-an-overview-of-rmi-and-web-api.html)

[SSD8\_Ex3【JAVA\_RMI】(2)远程接口声明](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-2-remote-interface-declarations.html)

[SSD8\_Ex3【JAVA\_RMI】(3)开启RMI服务](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-3-open-the-rmi-service.html)

[SSD8\_Ex3【JAVA\_RMI】(4)会议数据库建表](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-4-the-conference-database-tables.html)

[SSD8\_Ex3【JAVA\_RMI】(5)数据库连接和会议方法定义](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-5-the-database-connection-and-session-method-definition.html)

[SSD8\_Ex3【JAVA\_RMI】(6)制作命令行导航菜单](http://wangbaiyuan.cn/java-rmi-6-making-the-command-line-navigation-menu.html)

 

会议数据库rmimeeting建表
-----------------

*   数据库名：rmimeeting
*   建表三项：users(用户)，meeting（会议），meetingrecord（会议记录）

rmimeetingER图
-------------

[![rmimeetingER图](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-10_12-30-38.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-10_12-30-38.jpg) rmimeetingER图

建表语句
----

SET FOREIGN\_KEY\_CHECKS=0;

\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
\-\- Table structure for meeting
\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
DROP TABLE IF EXISTS \`meeting\`;
CREATE TABLE \`meeting\` (
  \`meetingId\` int(11) NOT NULL AUTO_INCREMENT,
  \`founderUserName\` varchar(255) NOT NULL,
  \`startTime\` datetime NOT NULL,
  \`endTime\` datetime NOT NULL,
  \`meetingTitle\` varchar(255) NOT NULL,
  PRIMARY KEY (\`meetingId\`),
  KEY \`fk\_meeting\_users_1\` (\`founderUserName\`),
  CONSTRAINT \`fk\_meeting\_users_1\` FOREIGN KEY (\`founderUserName\`) REFERENCES \`users\` (\`userName\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
\-\- Records of meeting
\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
\-\- Table structure for meetingrecord
\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
DROP TABLE IF EXISTS \`meetingrecord\`;
CREATE TABLE \`meetingrecord\` (
  \`recordId\` int(11) NOT NULL AUTO_INCREMENT,
  \`meetingId\` int(11) DEFAULT NULL,
  \`userName\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`recordId\`),
  KEY \`fk\_meetingRecord\_meeting_1\` (\`meetingId\`),
  KEY \`fk\_meetingRecord\_users_1\` (\`userName\`),
  CONSTRAINT \`fk\_meetingRecord\_meeting_1\` FOREIGN KEY (\`meetingId\`) REFERENCES \`meeting\` (\`meetingId\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`fk\_meetingRecord\_users_1\` FOREIGN KEY (\`userName\`) REFERENCES \`users\` (\`userName\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
\-\- Records of meetingrecord
\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
\-\- Table structure for users
\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
DROP TABLE IF EXISTS \`users\`;
CREATE TABLE \`users\` (
  \`userName\` varchar(255) NOT NULL,
  \`userPassword\` varchar(255) NOT NULL,
  PRIMARY KEY (\`userName\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
\-\- Records of users
\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
INSERT INTO \`users\` VALUES ('2013303394', '123456');