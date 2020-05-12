---
title: 安卓项目的文件结构
tags:
  - android
  - eclipse
url: 1030.html
id: 1030
categories:
  - 软件开发
abbrlink: 2360
date: 2015-03-23 15:07:54
---

android开发环境搭建完成后，新建一个android项目，可以看到如下的目录结构： ![](http://hi.csdn.net/attachment/201107/15/0_1310718338kL5v.gif)

*   src：存放源代码
*   gen：edu.xidian 是在新建android项目时输入的包名，R.java是开发工具自动生成的一个类，它会根据res文件中内容自动修改，不需要我们编辑
*   assets：是存放应用需要的资源文件的地方（比如图片，动画等）
*   res：也是存放应用资源文件的地方，和assets不同的是存放在这个文件夹中的所有资源文件都会在R.java文件中自动生成以个ID，当我们在程序中使用它们时，不用写路径，只需调用R.java中变量就行。这应该是ADT提供的一种规范的开发方法。
*   res/drawable-hdpi
*   res/drawable-ldpi
*   res/drawable-mdpi 这三个文件夹是存放图片的，不同之处在于分辨率，是为了适应不同手机屏幕分辨率不同的情况。
*   res/layout 存放Activity的布局文件
*   res/values 存放Activity中显示的文本，可以在R.java中调用，方便开发多语言版本应用
*   AndroidManifest.xml 下面是没有经过任何修改的文件内容：

**\[html\]** [view plain](http://blog.csdn.net/lntswangxin/article/details/6608989# "view plain")[copy](http://blog.csdn.net/lntswangxin/article/details/6608989# "copy")

<?xml version="1.0" encoding="utf-8"?>  

<manifest xmlns:android="http://schemas.android.com/apk/res/android"  

      package="edu.xidian"  

      android:versionCode="1"  

      android:versionName="1.0">  

    <application android:icon="@drawable/icon" android:label="@string/app_name">  

        <activity android:name=".MainActivity"  

                  android:label="@string/app_name">  

            <intent-filter>  

                <action android:name="android.intent.action.MAIN" />  

                <category android:name="android.intent.category.LAUNCHER" />  

            </intent-filter>  

        </activity>  

  

    </application>  

    <uses-sdk android:minSdkVersion="8" />  

  

</manifest>

 

是整个应用的设置文件，详细内容后面再说。

1.  <intent-filter>标签 设置应用启动时显示的第一个Activity
2.  default.properties 属性文件