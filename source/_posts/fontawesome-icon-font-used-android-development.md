---
title: Android开发使用FontAwesome图标字体
tags:
  - android
  - android开发
  - FontAwesome
url: 1274.html
id: 1274
categories:
  - 前端
  - 软件开发
abbrlink: 46777
date: 2015-06-11 11:46:00
---

英文原文参考：[https://github.com/liltof/font-awsome-for-android](https://github.com/liltof/font-awsome-for-android "https://github.com/liltof/font-awsome-for-android") 在前面一篇文章中我向大家介绍了在WEB前端中使用FontAwesome字体。 Font-Awesome 是为Bootstrap设计的一个图标集合字体，里面包含了300多个常用图标。使用Font-Awesome还具有如下优点：

*   1\. 减少了图标的绘制工作
*   2\. 可以设置图标的颜色和大小
*   3\. 减少了图标的大小并且可以减少apk的大小，只需要一个图标字体文件即可，不需要各种尺寸的图标文件了,比如 HDPI、XHDPI等各种尺寸的图标。

Android开发使用FontAwesome图标字体
--------------------------

到Font-Awesome主页下载Font-Awesome字体（fontawesome-webfont.ttf）文件并放到项目的assets目录下，找到需要用的图标对应的字符串（[font-awsome-for-android](https://github.com/liltof/font-awsome-for-android) 包含了一份图标和字符串的对应文件,最新的对应关系在下载的Font-Awesome字体中的css目录中的font-awesome.css文件中查找），在TextView中设置需要使用的图标文字，然后设置TextView的字体为自定义的Font-Awesome字体。  

xml布局文件代码
---------

<TextView
android:id="@+id/textView1"
android:layout\_width="wrap\_content"
android:layout\_height="wrap\_content"
android:text="@string/icon\_credit\_card"
android:textSize="50sp"
android:textColor="#F59012"
android:textAppearance="?android:attr/textAppearanceLarge" />

 

java代码
------

myTextView = (TextView) findViewById(R.id.textView1);
myTextView.setText(getString(R.string.icon\_credit\_card));
Typeface font = Typeface.createFromAsset(getAssets(),
"fontawesome-webfont.ttf");&nbsp;&nbsp;
myTextView.setTypeface(font);

另外如果需要在使用Drawable的地方使用Font-Awesome图标，则可以自定义一个Drawable，然后在代码中使用该Drawable，详细使用方式请参考fonticon这个示例项目：[https://github.com/shamanland/fonticon](https://github.com/shamanland/fonticon) 另外除了Font-Awesome图标字体以外，还有其他的图标字体，例如 [http://icomoon.io/](http://icomoon.io/#home)