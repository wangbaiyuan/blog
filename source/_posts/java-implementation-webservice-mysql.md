---
title: java实现webservice+MySQl
tags:
  - JAVA
  - MySql
url: 1320.html
id: 1320
categories:
  - 算法语言
  - 计算机技术
  - 软件开发
abbrlink: 7967
date: 2015-06-26 14:59:33
---

关于webservice
------------

由于之前写过JAVA和PHP的JSON以及JMI的网络服务，这次在使用webservice完成管理待办事项自然就联想到它们。JAVA和PHP JSON、JMI、webservice三者共同之处是可以提供服务器的资源共享。 Web Service具有跨平台性，可以在不同设备、不同编程语言中进行调用，所以它的应用范围应该要比RMI更广

基于MySQl数据库查询的webservice实现管理待办事项列表
---------------------------------

### 运行截图

![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv11.png) ![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv2.png) 添加用户： ![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv31.png) 添加事项： ![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv41.png) 查询事项： ![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv51.png) 删除事项： ![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv61.png) 清空事项： ![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv71.png)

### 服务器端代码是怎么实现的

下面介绍一下是怎样实现上述功能的服务端代码：。 我的服务端主要有四个类： 数据库连接及方法接口TodoListInterDbFace、数据库连接及方法实现类TodolistDb及方法实现类以及webservice接口TodoListServerInterface、Webservice实现类TodoListServer。  

#### 下面是示意图：

![](http://wangbaiyuan.cn/wp-content/uploads/2015/06/062615_0650_javawebserv81.png)

### 客户端代码是怎么实现的

wsimport -keep http://127.0.0.1:8002/webservice/TodoList?wsdl解析WSDL后： 创建TodoListClient类main方法为：

public static void main(String\[\] args){
        int cmdLength=args.length;
        TodoListServerService tlist = new TodoListServerService() ;
        TodoListServerInterface todoList = tlist.getTodoListPort();
        String note="WebService待办事项客户端©王柏元—命令行版:\\n"
                \+ "1.帮助信息：\\n\\thelp\\n"
                \+ "2.用户注册：\\n\\tregister \[用户名\] \[密码\]\\n"
                \+ " 3.添加待办事项：\\n\\tadd \[你的用户名\] \[你的密码\] \[待办事项标题\] \[邀请谁？他的用户名\] \[开始时间\] \[结束时间\]\\n"
                \+ "\\t 时间格式：2015-06-05 22:29:19\\n"
                \+ "4\. 查询待办事项：\\n\\tquery \[你的用户名\] \[你的密码\]\[开始时间\] \[结束时间\]\\n"
                \+ "5.删除待办事项：\\n\\tdelete \[你的用户名\] \[你的密码\] \[待办事项ID\]\\n"
                \+ "6.清除待办事项：\\n\\tclear \[username\] \[password\]\\n"
                \+ "7.关于本程序：\\n\\tabout\\n"
                \+ "8.退出:\\n quit\\n\\t"
                \+ "请输入命令：";
        String about="WebService待办事项客户端©王柏元—命令行行版:\\n"
                \+ "作者:王柏元\\n"
                \+ "个人网站：http://wangbaiyuan.cn\\n"
                \+ "运行模式：命令行环境\\n"
                \+ "程序介绍：使用Java WebService创建一个待办事项管理系统。"
                \+ "不同的用户可以使用这个待办事项管理系统执行查询、添加和删除"
                \+ "待办事项的操作。服务器支持待办事项的登记和清除等功能；";
            //System.out.println(hello.hello("liyong"));
                
            switch(args\[0\]){
            
            case
"register":
                if(cmdLength==3){
                    System.out.println(todoList.addMeetingUsers(args\[1\], args\[2\]));
                }else{
                    System.out.println("命令参数错误\\n"
                            \+ "用户注册：\\n\\tregister \[用户名\] \[密码\]\\n");
                }
                break;
            case "add":
                if(cmdLength==9){
                    System.out.println(todoList.addMeetings(args\[1\], args\[2\],args\[3\] ,args\[4\],args\[5\]+" "
                +args\[6\], args\[7\]+" "+args\[8\]));
                }else{
                    System.out.println("命令参数错误\\n"
                            \+ "添加会议：\\n\\tadd \[你的用户名\] \[你的密码\] \[邀请谁？他的用户名\]\[会议标题\] \[开始时间\] \[结束时间\] \\n");
                }
                break;
            case "query":
                if(cmdLength==7){
                    if(todoList.loginMeetings(args\[1\], args\[2\]).equals("1"))
                        System.out.println(todoList.searchrMeetings(args\[3\]+" "+ args\[4\],args\[5\]+" "+ args\[6\]));
                }else{
                    System.out.println("命令参数错误\\n"
                            \+ "查询会议：\\n\\tquery \[用户名\] \[密码\]\[开始时间\] \[结束时间\]\\n");
                }
                break;
            case "delete":
                if(cmdLength==4){
                    if(todoList.loginMeetings(args\[1\], args\[2\]).equals("1"))
                        System.out.println(todoList.deleteMeetings(args\[1\], args\[3\]));
                }else{
                    System.out.println("命令参数错误\\n"
                            \+ "删除会议：\\n\\tdelete \[你的用户名\] \[你的密码\] \[会议ID\]\\n");
                }
                break;
            case "clear":
                if(cmdLength==3){
                    if(todoList.loginMeetings(args\[1\], args\[2\]).equals("1"))
                        System.out.println(todoList.clearMeetings(args\[1\]));
                }else{
                    System.out.println("命令参数错误\\n"
                            \+ "清除会议：\\n\\tclear \[username\] \[password\]\\n");
                }
                break;
            case "about":
                System.out.println(about);break;
        
            case
"help":
            System.out.println(note);break;
                
                }
        }

  对于菜单的实现原理请参考我的博客文章：[http://wangbaiyuan.cn/java-rmi-6-making-the-command-line-navigation-menu.html](http://wangbaiyuan.cn/java-rmi-6-making-the-command-line-navigation-menu.html)