---
title: SSD8_Ex3【JAVA_RMI】(3)开启RMI服务
tags:
  - JAVA
  - SSD8
  - 分布式系统
  - 计算机网络
url: 1269.html
id: 1269
categories:
  - 算法语言
  - 计算机技术
abbrlink: 22965
date: 2015-06-10 11:31:58
---

这一步骤完成的是创建本地主机上的远程对象注册表Registry的实例，并指定端口为8888，这一步必不可少（Java默认端口是1099），必不可缺的一步，缺少注册表创建，则无法绑定对象到远程注册表上。运行后开启RMI服务，客户端要与服务地址保持一致.

系列文章链接：
-------

[SSD8\_Ex3【JAVA\_RMI服务】(1)概述RMI和网络API](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-services-1-an-overview-of-rmi-and-web-api.html)

[SSD8\_Ex3【JAVA\_RMI】(2)远程接口声明](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-2-remote-interface-declarations.html)

[SSD8\_Ex3【JAVA\_RMI】(3)开启RMI服务](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-3-open-the-rmi-service.html)

[SSD8\_Ex3【JAVA\_RMI】(4)会议数据库建表](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-4-the-conference-database-tables.html)

[SSD8\_Ex3【JAVA\_RMI】(5)数据库连接和会议方法定义](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-5-the-database-connection-and-session-method-definition.html)

[SSD8\_Ex3【JAVA\_RMI】(6)制作命令行导航菜单](http://wangbaiyuan.cn/java-rmi-6-making-the-command-line-navigation-menu.html)

MeetingServer.java
------------------

package cn.wangbaiyuan;
import java.net.MalformedURLException;
import java.rmi.AlreadyBoundException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.sql.SQLException;

public class MeetingServer {
	private static String Url;
	 public static boolean start(String port ) { 
boolean result=false;
	        try { 
	            //创建一个远程对象 
	            MeetingInterface RemoteMeeting = new RmiDataBase("localhost", 3306, "rmimeeting",
						"xxxxxxx", "xxxxxxx"); 
	            //本地主机上的远程对象注册表Registry的实例，并指定端口为8888，这一步必不可少（Java默认端口是1099），必不可缺的一步，缺少注册表创建，则无法绑定对象到远程注册表上 
	            LocateRegistry.createRegistry(Integer.parseInt(port)); 
	            //把远程对象注册到RMI注册服务器上
	            //绑定的URL标准格式为：rmi://host:port/name(其中协议名可以省略，下面两种写法都是正确的）
	            Url="rmi://localhost:"+port+"/RMeeting";
	            Naming.bind(Url,RemoteMeeting); 
	            
//	            Naming.bind("//localhost:8888/RHello",rhello); 
	            result=true;
	            System.err.println(">>>>>INFO:远程MeetingInterface对象绑定成功！"); 
	        } catch (RemoteException e) { 
	            System.err.println("创建远程对象发生异常！"); 
	            e.printStackTrace(); 
	        } catch (AlreadyBoundException e) { 
	            System.err.println("发生重复绑定对象异常！"); 
	            e.printStackTrace(); 
	        } catch (MalformedURLException e) { 
	            System.err.println("发生URL畸形异常！"); 
	            e.printStackTrace(); 
	        } catch (SQLException e) {
				System.err.println("服务器连接数据库出错！"); 
				e.printStackTrace();
			}
			return result; 
	    } 
	 public static boolean exit(){
		 boolean result=false;
		 try {
			Naming.unbind("Rmeeting");
			result=true;
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NotBoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	 }
}