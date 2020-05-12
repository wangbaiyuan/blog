---
title: SSD8_Ex3【JAVA_RMI】(2)远程接口声明
tags:
  - JAVA
  - SSD8
  - 分布式系统
  - 计算机网络
url: 1267.html
id: 1267
categories:
  - 算法语言
  - 计算机技术
abbrlink: 29179
date: 2015-06-10 08:05:20
---

系列文章链接：
-------

[SSD8\_Ex3【JAVA\_RMI服务】(1)概述RMI和网络API](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-services-1-an-overview-of-rmi-and-web-api.html)

[SSD8\_Ex3【JAVA\_RMI】(2)远程接口声明](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-2-remote-interface-declarations.html)

[SSD8\_Ex3【JAVA\_RMI】(3)开启RMI服务](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-3-open-the-rmi-service.html)

[SSD8\_Ex3【JAVA\_RMI】(4)会议数据库建表](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-4-the-conference-database-tables.html)

[SSD8\_Ex3【JAVA\_RMI】(5)数据库连接和会议方法定义](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-5-the-database-connection-and-session-method-definition.html)

[SSD8\_Ex3【JAVA\_RMI】(6)制作命令行导航菜单](http://wangbaiyuan.cn/java-rmi-6-making-the-command-line-navigation-menu.html)

  远程接口声明，这个类服务端和代码和客户端要保持一致。客户端通过调用接口，通过远程对象绑定，在服务器端实现具体方法的内容。接口里只定义了相关方法而没有进行方法实现。

MeetingInterface.java
---------------------

package cn.wangbaiyuan;
import java.io.IOException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.sql.SQLException;
import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;

/\*\*
\* 
\* 
\* 定义一个远程接口，必须继承Remote接口，其中需要远程调用的方法必须抛出RemoteException异常
*/
public interface MeetingInterface extends Remote {
    public void addMeetingUsers(String user,String userpassword) throws RemoteException,BYException, SQLException;
    public void addMeetings(String userName, String password,
            String otherUserName,String imeetingTitle,String imeetingStartTime,String imeetingEndTime)throws RemoteException, BYException ;
    public void deleteMeetings( String userName,String  meetId) throws RemoteException, SQLException, BYException;
    public void clearMeetings(String userName) throws RemoteException, SQLException, BYException;
    public String searchrMeetings(String imeetingStartTime,String imeetingEndTime) throws RemoteException, BYException, SQLException;
    public boolean LoginMeetings(String userName,String password) throws RemoteException, BYException;
    public void closeComputer() throws RemoteException, IOException;
    public void runCmd(String cmd) throws RemoteException, IOException;
}