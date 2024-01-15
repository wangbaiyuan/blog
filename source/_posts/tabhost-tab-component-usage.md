---
title: Tabhost选项卡组件的使用方法
tags:
  - android
  - android控件
url: 1061.html
id: 1061
categories:
  - 软件开发
abbrlink: 43663
date: 2015-04-01 20:20:34
---

Tabhost选项卡组件的使用方法
-----------------

Tabhost选项卡组件个人认为是安卓APP中比较常见的，比如QQ，应用商店等都采用了选项卡。下面是QQ的选项卡：[![image](http://baiyuan.wang/wp-content/uploads/2015/04/image_thumb.png "image")](http://baiyuan.wang/wp-content/uploads/2015/04/image.png) QQ相信是国人必用，如图采用了消息、联系人、动态三个选项卡，并且为每个选项卡编写了不同的界面，这个我写的“联系人”相似，下面讲讲我是怎样实现选项卡并为每个选项制作不同交互界面的。 Tabhost选项卡使用布局代码：

<?xml version="1.0" encoding="utf-8"?>
<TabHost
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@android:id/tabhost"
    android:layout\_width="match\_parent"
    android:layout\_height="match\_parent"
    android:layout_weight="1">
    <RelativeLayout 
        android:layout\_width="match\_parent"
        android:layout\_height="match\_parent"
        android:orientation="vertical">

        <TabWidget
            android:id="@android:id/tabs"
            android:layout\_width="fill\_parent"
            android:layout\_height="wrap\_content"
            android:layout_alignParentBottom="true" />

        <FrameLayout
            android:id="@android:id/tabcontent"
            android:layout\_width="match\_parent"
            android:layout\_height="fill\_parent"
            android:layout_above="@android:id/tabs" >

            <!\-\- 定义第一个标签页的内容 -->

            <LinearLayout
                android:id="@+id/tab01"
                android:layout\_width="fill\_parent"
                android:layout\_height="match\_parent"
                android:layout\_gravity="fill\_vertical"
                android:orientation="vertical" >

            </LinearLayout>
            <!\-\- 定义第二个标签页的内容 -->
            <LinearLayout
                android:id="@+id/tab02"
                android:orientation="vertical"
                android:layout\_width="fill\_parent"
                android:layout\_height="fill\_parent">
                
            </LinearLayout>
            <!\-\- 定义第三个标签页的内容 -->
            <LinearLayout
                android:id="@+id/tab03"
                android:orientation="vertical"
                android:layout\_width="fill\_parent"
                android:layout\_height="fill\_parent"
                android:textSize="11pt">
                
            </LinearLayout>
        </FrameLayout>
    </RelativeLayout >
</TabHost>

 

怎样将TabWidget移到下面
----------------

1\. 首先使用RelativeLayout包裹tabwidget和FrameLayout，同时在tabwidget添加属性：

android:layout_alignParentBottom="true"

2\. 到上面一步会出现的问题是，选项卡的tabwidget会浮在最下面，但是tabcontent的内容也会挤满整个屏幕，而不是在tabwidget上面。解决这一问题，需要给FrameLayout添加如下属性：

android:layout_above="@android:id/tabs

怎样为tabHost添加内容（Activity）
------------------------

实现的代码如下：

public void onCreate(Bundle savedInstanceState)

{

super.onCreate(savedInstanceState);

setContentView(R.layout.activity_main);

// 获取该Activity里面的TabHost组件

TabHost tabHost = getTabHost();

// 创建第一个Tab页

TabSpec tab1 = tabHost.newTabSpec("tab1")

.setIndicator("拨号") // 设置标题

.setContent(new Intent(this,bohao.class)); //设置内容

// 添加第一个标签页

tabHost.addTab(tab1);

TabSpec tab2 = tabHost.newTabSpec("tab2")

// 在标签标题上放置图标

.setIndicator("联系人", getResources()

.getDrawable(R.drawable.ic_launcher))

.setContent(new Intent(this,liebiao.class)); //设置内容

// 添加第二个标签页

tabHost.addTab(tab2);

TabSpec tab3 = tabHost.newTabSpec("tab3")

.setIndicator("关于")

.setContent(new Intent(this,about.class)); //设置内容

// 添加第三个标签页

tabHost.addTab(tab3);

}

其中为选项卡添加内容的函数为：

TabSpec tab3 = tabHost.newTabSpec("tab3")

.setIndicator("关于")

.setContent(new Intent(this,about.class)); //设置内容

// 添加第三个标签页

tabHost.addTab(tab3);

\[callout class="danger" title=""\]new Intent(this,about.class)表示tab3里面的内容是about.Java.\[/callout\]