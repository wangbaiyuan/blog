---
title: 【JAVA_RMI】(6)制作命令行导航菜单
tags:
  - JAVA
  - SSD8
url: 1276.html
id: 1276
categories:
  - 算法语言
abbrlink: 38485
date: 2015-06-13 07:06:12
---

由于在eclipse运行配置里添加运行参数并不方便，建议将调试好的java工程导出为可以运行的jar包，然后在命令行打开jar所在文件夹，使用”java -jar <包名> <main函数参数1 参数2 ……>“,下图的help命令就是main函数执行时的参数数组arg\[\]的第一个元素arg\[0\]。参数以空格为分隔符，后面分别是arg\[1\]、arg\[2\]。 知道这点，制作java命令行的导航菜单就很简单。为了方便操作，极客人为这次试验还制作了GUI，支持GUI、命令行双界面模式运行应用。命令行的好处可能只有程序员才知道，它最大的好处、个人认为是可以批处理，这是习惯GUI的用户无法理解的。

效果预览：
-----

[![java命令行导航菜单](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-12_19-15-44.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-12_19-15-44.jpg) java命令行导航菜单

MeetingClient.java
------------------

下述代码通过匹配用户输入的main函数参数，分别执行在上一篇文章中定义的方法。其中输入GUI和不输入参数将启动GUI模式。 [![java命令行导航菜单2](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-12_19-33-21.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-12_19-33-21.jpg) java命令行导航菜单2  

package cn.wangbaiyuan;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.sql.SQLException;

/\*\*
 \* RMI会议客户端
 \* @author 王柏元
 *
 *{@linkplain http://wangbaiyuan.cn}
 */
public class MeetingClient {
	public static void main(String args\[\]) throws IOException{
	int cmdLength=args.length;
	MeetingInterface meeting;
		if(cmdLength==0){
	        LoginGUI.show(null);
		}else {
			String note="RMI会议客户端©王柏元—命令行版:\\n"
					\+ "1.帮助信息：\\n\\thelp\\n"
					\+ "2.用户注册：\\n\\tregister \[用户名\] \[密码\]\\n"
					\+ " 3.添加会议：\\n\\tadd \[你的用户名\] \[你的密码\] \[邀请谁？他的用户名\] \[开始时间\] \[结束时间\] \[会议标题\]\\n"
					\+ "\\t 时间格式：2015-06-05 22:29:19\\n"
					\+ "4\. 查询会议：\\n\\tquery \[你的用户名\] \[你的密码\]\[开始时间\] \[结束时间\]\\n"
					\+ "5.删除会议：\\n\\tdelete \[你的用户名\] \[你的密码\] \[会议ID\]\\n"
					\+ "6.清除会议：\\n\\tclear \[username\] \[password\]\\n"
					\+ "7.关于本程序：\\n\\tabout\\n"
					\+ "8.退出:\\n quit\\n\\t"
					\+ "9.GUI模式:\\n GUI\\n\\t"
					\+ "请输入命令：";
			String about="RMI会议客户端©王柏元—命令行行版:\\n"
					\+ "作者:王柏元\\n"
					\+ "个人网站：http://wangbaiyuan.cn\\n"
					\+ "运行模式：GUI和命令行双环境\\n"
					\+ "程序介绍：使用Java RMI创建一个分布式议程共享服务。"
					\+ "不同的用户可以使用这个共享议程服务执行查询、添加和删除"
					\+ "会议的操作。服务器支持会议的登记和清除等功能；";
			try {
				meeting=(MeetingInterface) Naming.lookup(LoginGUI.getRmiURL());
				switch(args\[0\]){
				
				case "register":
					if(cmdLength==3){
						meeting.addMeetingUsers(args\[1\], args\[2\]);
					}else{
						System.out.println("命令参数错误\\n"
								\+ "用户注册：\\n\\tregister \[用户名\] \[密码\]\\n");
					}
					break;
				case "add":
					if(cmdLength==9){
						meeting.addMeetings(args\[1\], args\[2\],args\[3\] ,args\[4\],args\[5\]+" "
					+args\[6\], args\[7\]+" "+args\[8\]);
					}else{
						System.out.println("命令参数错误\\n"
								\+ "添加会议：\\n\\tadd \[你的用户名\] \[你的密码\] \[邀请谁？他的用户名\]\[会议标题\] \[开始时间\] \[结束时间\] \\n");
					}
					break;
				case "query":

					if(cmdLength==7){
						if(meeting.LoginMeetings(args\[1\], args\[2\]))
						meeting.searchrMeetings(args\[3\]+" "+ args\[4\],args\[5\]+" "+ args\[6\]);
					}else{
						System.out.println("命令参数错误\\n"
								\+ "查询会议：\\n\\tquery \[用户名\] \[密码\]\[开始时间\] \[结束时间\]\\n");
					}
					break;
				case "delete":
					if(cmdLength==4){
						if(meeting.LoginMeetings(args\[1\], args\[2\]))
						meeting.deleteMeetings(args\[1\], args\[3\]);
					}else{
						System.out.println("命令参数错误\\n"
								\+ "删除会议：\\n\\tdelete \[你的用户名\] \[你的密码\] \[会议ID\]\\n");
					}
					break;
				case "clear":
					if(cmdLength==3){
						if(meeting.LoginMeetings(args\[1\], args\[2\]))
							meeting.clearMeetings(args\[1\]);
					}else{
						System.out.println("命令参数错误\\n"
								\+ "清除会议：\\n\\tclear \[username\] \[password\]\\n");
					}
					break;
				case "about":
					System.out.println(about);break;
				case "GUI":
					LoginGUI.show(null);break;
				case "help":
				System.out.println(note);break;
				case "quit":
					LoginGUI.show(null);break;
					
					}
			} catch (NotBoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (BYException e) {
				// TODO Auto-generated catch block
				System.out.println(e.getMessage());
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		}
		}

    } 

系列文章链接：
-------

[SSD8\_Ex3【JAVA\_RMI服务】(1)概述RMI和网络API](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-services-1-an-overview-of-rmi-and-web-api.html)

[SSD8\_Ex3【JAVA\_RMI】(2)远程接口声明](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-2-remote-interface-declarations.html)

[SSD8\_Ex3【JAVA\_RMI】(3)开启RMI服务](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-3-open-the-rmi-service.html)

[SSD8\_Ex3【JAVA\_RMI】(4)会议数据库建表](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-4-the-conference-database-tables.html)

[SSD8\_Ex3【JAVA\_RMI】(5)数据库连接和会议方法定义](http://wangbaiyuan.cn/ssd8-ex3-java-rmi-5-the-database-connection-and-session-method-definition.html)

[SSD8\_Ex3【JAVA\_RMI】(6)制作命令行导航菜单](http://wangbaiyuan.cn/java-rmi-6-making-the-command-line-navigation-menu.html)