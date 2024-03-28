---
title: 一键安装JDK和自动配置java环境变量
tags:
  - JAVA
  - 命令指示符
url: 445.html
id: 445
categories:
  - 技术
abbrlink: 168
date: 2014-12-28 14:16:32
---

对于java或安卓初学者来说，配置java环境变量是一件比较头疼的事情，在此我向大家分享一个一键安装JDK和自动配置java环境变量的bat批处理方法

一键安装JDK和自动配置java环境变量
--------------------

### 新建一个txt文档，在里面输入下面的内容：

 

@echo off
cls
color 2f
echo.
echo **********************************************
echo.
echo    一键安装 Java SE Development Kit 到 D 盘
echo.
echo       安装请按任意键，退出直接关闭窗口
echo.
echo **********************************************
echo.
pause
set myjavapath=D:\\Java\\jdk

IF EXIST %myjavapath%\\bin\\java.exe (
echo.   自动配置java环境变量，来自—王柏元的博客—
echo.                有问题到 http://blog.baiyuan.wang留言
echo. 
echo    在 D 盘发现java程序，注册环境变量请按任意键
echo.
echo    退出直接关闭窗口
echo.
pause
goto SETENV
)

echo.
echo 正在安装jdk，请不要执行其他操作
echo.
echo 请稍等，这个时间大约需要二、三分钟
echo.
start /WAIT g:\\收藏软件编程\\jdk-8u20-windows-x64.exe /s /norestart /v /qn INSTALLDIR=D:Javajdk
echo 程序安装完毕，正在注册环境变量
echo.
goto SETENV

:SETENV
setx JAVA_HOME %myjavapath%
setx CLASSPATH .;%myjavapath%\\lib\\tools.jar;%myjavapath\\%lib\\dt.jar;%myjavapath%\\jre\\lib\\rt.jar
setx PATH %myjavapath%\\bin
echo.
echo JDK环境变量设置成功 
echo.
echo 安装完毕，测试下看看
echo.
call %myjavapath%\\bin\\java.exe -version
echo.

if %errorlevel% == 0 (
echo 祝贺您成功安装了Java SE Development Kit !
echo.
goto END
)
echo 貌似安装不成功，您得自己想办法了，也可到我的博客http://blog.baiyuan.wang/?p=445留言！
echo.
goto END

:END
pause

### 将上面内容中jdk安装包的路径改成你的，比如我的安装包路径是

### **G:收藏软件编程jdk-8u20-windows-x64.exe**

### 将建立的txt文件保存，然后重命名成"jdkinstall.bat",然后双击文件运行

如果提示“JDK环境变量设置成功 ”，则说明java环境配置成功，你也可以在命令指示符里键入

javac

进行验证；如果不行，你可以到我的博客里留言交流。

你也可以在文章后面下载本批处理文件
-----------------