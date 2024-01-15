---
title: androidStudio开发安卓应用设置版本号
tags:
  - android
  - Android Studio
  - android开发
url: 1434.html
id: 1434
categories:
  - 软件开发
abbrlink: 19615
date: 2015-08-22 16:38:34
---

Android:versionCode和android:versionName
---------------------------------------

在eclipse中，修改我们开发的应用的版本号只需要在清单文件AndroidManifest.xml中manifest 标签节点中加入android:versionCode和android:versionName的值即可设置应用的版本号。如以下代码：

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="cn.wangbaiyuan.translate"
android:versionCode="2"
android:versionName="1.1" >

上述代码表示应用的包名为cn.wangbaiyuan.translate，版本号code：2，版本名Name：1.1；前者一般是给开发者比较版本是否有升级用的，后者是展示给用户看的。 [![W020140901303931719545](http://baiyuan.wang/wp-content/uploads/2015/08/W020140901303931719545.jpg)](http://baiyuan.wang/wp-content/uploads/2015/08/W020140901303931719545.jpg) 在Eclipse中使用修改AndroidManifest.xml修改版本号是完全没有问题的，但是极客人在Android Studio上试过仅仅修改AndroidManifest.xml内容是没有效果的，虽然我把android:versionName赋值为1.1，但是在手机上显示的版本号始终是之前的1.0.。

androidStudio开发安卓应用设置版本号
------------------------

后来才发现是Android Studio中build.gradle(Module:app)配置文件同样设置了它的版本号，在和AndroidManifest.xml填写的版本号冲突的情况下，编译后的APK使用了build.gradle(Module:app)里面的配置： build.gradle(Module:app)

compileSdkVersion 22
buildToolsVersion "21.1.2"

defaultConfig {
    applicationId "cn.wangbaiyuan.translate"
    minSdkVersion 15
    targetSdkVersion 22
    versionCode 1
    versionName "1.0"
}

解决方法
----

在项目文件夹下找到build.gradle(Module:app)文件，删除defaultConfig里面VersionCode 和VersionName这两行；或者直接在这里修改版本号。