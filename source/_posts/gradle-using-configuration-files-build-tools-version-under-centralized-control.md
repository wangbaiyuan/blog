---
title: Gradle下利用配置文件对构建工具版本集中控制
url: 1723.html
id: 1723
categories:
  - 技术
  - 软件开发
abbrlink: 2243
date: 2016-08-12 10:17:00
tags: ''
---

由于Android studio和Android相关SDK和构建工具具有极快的更新速度。对相关版本的修改有时候是一件比较敏感的事情，尤其是在团队项目中，个人在本地修改了相关工具的版本并且不小心提交到远程代码库，别人更新下来往往出现各种问题。Android studio项目文件中版本字段十分分散，当SDK环境出现改变时，修改起来还是比较麻烦的。本文章利用配置文件对构建工具版本集中控制。

在项目根目录下gradle.properties文件定义版本信息并赋值
-----------------------------------

GradleBuildVersion=2.1.2
AndroidMinSDKVersion=16
AndroidTargetVersion=23
AndroidCompileSDKVersion=23
AndroidBuildToolsVersion=23.0.1

 

[![25d15be0b4a717c984f31d1b70704f1b1470918122](http://baiyuan.wang/wp-content/uploads/2016/08/25d15be0b4a717c984f31d1b70704f1b1470918122.jpg)](http://baiyuan.wang/wp-content/uploads/2016/08/25d15be0b4a717c984f31d1b70704f1b1470918122.jpg)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

在使用版本信息的地方引用gradle变量
--------------------

Dependencies
------------

dependencies {
    compile fileTree(include: \['*.jar'\], dir: 'libs')
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:'+project.AndroidBuildToolsVersion
}

### build.gradle(project)

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:'+project.GradleBuildVersion
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

### build.gradle(module)

Android {
    compileSdkVersion Integer.parseInt(project.AndroidCompileSDKVersion)
    buildToolsVersion project.AndroidBuildToolsVersion

    defaultConfig {
        applicationId "cn.wangbaiyuan.plugintest"
        minSdkVersion Integer.parseInt(project.AndroidMinSDKVersion)
        targetSdkVersion Integer.parseInt(project.AndroidTargetVersion)
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}