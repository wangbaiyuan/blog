---
title: '[转载]QT5.1_Windows 下的 安卓开发环境配置'
tags:
  - android
  - QT
url: 340.html
id: 340
categories:
  - 算法语言
abbrlink: 56152
date: 2014-12-22 17:17:40
---

本教程开发环境: win8 64 位，win7 ,xp 应该更没有问题，注意选择 32 位 ,64位的区分

**1\. 安装 ****Perl **[**http://strawberryperl.com/**](http://strawberryperl.com/)

    这步可能不是必须的，目前来说我是装上了的，

**2.下载 **** MinGW-w64** [http://sourceforge.net/projects/mingwbuilds/files/host-windows/releases/4.8.1/32-bit/threads-win32/dwarf/x32-4.8.1-release-win32-dwarf-rev1.7z/download](http://sourceforge.net/projects/mingwbuilds/files/host-windows/releases/4.8.1/32-bit/threads-win32/dwarf/x32-4.8.1-release-win32-dwarf-rev1.7z/download)

解压到指定目录，目录结构大概是这样 【D:mingw-buildsmingw32】，把【D:mingw-buildsmingw32bin】加入PATH

**3.下载****mingwbuilds ****MSYS**** and external binaries (for git)**[http://sourceforge.net/projects/mingwbuilds/files/external-binary-packages/msys+7za+wget+svn+git+mercurial+cvs-rev13.7z/download](http://sourceforge.net/projects/mingwbuilds/files/external-binary-packages/msys+7za+wget+svn+git+mercurial+cvs-rev13.7z/download)

解压到上述MinGW-w64的相关目录，目录结构大概是这样 【D:mingw-buildsmsys】

**4.安装JDK7 把 【jdk17bin】的路径加入 PATH**

**5.去安卓官网 下载 SDK**,我下载的是 附带ECLIPSE版的，然后下载NDK，解压到SDK的同级目录,保证NDK，SDK的文件夹同级，此时启动附带的Eclipse,应该可以进行安卓APP开发了。

这里注意下 SDKMANAGER.exe，去掉空格，WIN8设置成以管理员启动好像才跑的起来

**6.配置以下环境变量:**

  

*   set “ANDROID\_NDK\_PLATFORM=android-9”  
    set “ANDROID\_TARGET\_ARCH=armeabi-v7a”  
    set “ANDROID\_BUILD\_TOOLS_REVISION=17.0.0”  
    set “ANDROID\_NDK\_HOST=windows-x86_64”  
    or  
    set “ANDROID\_NDK\_HOST=windows”  
    .. depending on which NDK you downloaded.

**7.下载 QT5.1 for android ,并安装。**

**8.下载 ANT**

**9.配置QT CREATER**

[![](http://static.oschina.net/uploads/space/2013/0706/232551_0MQp_1021015.png)](http://static.oschina.net/uploads/space/2013/0706/232551_0MQp_1021015.png)

配置完后，应该就可以用AVD管理器新建模拟器，然后新建项目，编译时注意注意选成android端的。

此时走构建项目，make，部署，如果一切顺利的话，应该就可以跑了，我用9300测试成功。

目前新建里面的，移动QT应用目视不能按上述流程走。

另，可能在此时无法新建AVD,我的机器是重启之后才好用的

### 声明

本文转自[http://my.oschina.net/stardriver/blog/142923](http://my.oschina.net/stardriver/blog/142923)