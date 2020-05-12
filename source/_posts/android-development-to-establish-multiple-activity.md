---
title: 安卓开发建立多个activity
tags:
  - android
url: 1062.html
id: 1062
categories:
  - 软件开发
abbrlink: 54479
date: 2015-04-01 20:50:57
---

作为一个安卓APP，建立多个activity是必须的，就像windows软件有多窗口一样；

安卓开发建立多个activity
----------------

在建立多个activity是尤其需要注意的是：每个activity都要在清单文件AndroidManifest.xml中注册。如果你在AndroidManifest.xml清单文件中没有注册相关的activity，虽然有时程序可以编译通过，但是在使用软件调用了这个activity时，APP就会出现“很抱歉，程序已停止运行”的情况，对于android新手来说，这是导致“程序已停止运行”的常见原因。 建立多个activity在AndroidManifest.xml中注册方法如下：

<activity android:name=".liebiao" android:label="@string/title_liebiao" ></activity>

<activity android:name=".about" android:label="@string/title_about" ></activity>

<activity android:name=".bohao" android:label="@string/title_bohao" ></activity>

  上面是我为APP新建立的三个activity，它们分别对应src文件夹下liebiao.java、about.java、bohao.java.，在这些java文件里定义了当前activity的布局文件。 以bohao.java为例，在此文件public void onCreate(Bundle savedInstanceState)中有下面一段代码：

super.onCreate(savedInstanceState);

setContentView(R.layout.bohao_layout);

这定义了bohao Activity的布局为layout文件夹下bohao_layout。

怎样启动activity
------------

要启动一个新的Activity，我们可以通过调用Context中的startActivity来启动。像这样：

Intent intent = new Intent(this, ActivityDemo.class);
startActivity(intent);  // ActivityDemo是需要启动的Activity类