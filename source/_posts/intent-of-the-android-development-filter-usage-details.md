---
title: 安卓开发之Intent(Filter)用法详解
tags:
  - android
url: 1136.html
id: 1136
categories:
  - 软件开发
abbrlink: 18090
date: 2015-04-27 11:43:44
---

一、Intent是什么,作用是什么?
------------------

Android的应用程序包括三大组件：Activity、Service、BroadcastReceiver,为了方便不同组件之间的交流通信，应用程序就采用了一种统一的方式启动组件及传递数据，即使用Intent。 Intent封装了Android应用程序需要启动某个组件的"意图"，Intent类的对象是组件间的通信载体，一个Intent对象就是一组信息，其包含接收Intent组件所关心的信息（如action 和 Data）和Android 系统关心的信息(如Category等)。也就是说，发送"意图"的组件通过Intent对象所包含的内容，来启动指定的(即Component属性)或通过筛选(即Action&Category属性)的某(些)组件，然后实施相应的动作（即Action属性）并传递相应的数据(即Data属性)以便完成相应的动作。

二、Intent的Component属性
--------------------

Component需要指定包名和类名唯一确定一个组件类，代码如下：

intent=new Intent();
ComponentName com_name=new ComponentName(MainActivity.this,Component.class);
intent.setComponent(com_name);

  展示结果的代码：

super.onCreate(savedInstanceState);
setContentView(R.layout.activity_component);
ComponentName com_name=getIntent().getComponent();
TextView text=(TextView)findViewById(R.id.textView1);
text.setText("组件包名："+com\_name.getPackageName()+"\\n组件类名："+com\_name.getClassName());

  运行截图： [![clip_image001](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image001_thumb.png "clip_image001")![clip_image002](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image002_thumb.png "clip_image002")](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image001.png) 点击第一个按钮显示运行结果：  

三、Intent的Action、category属性
--------------------------

使用Action和Category需要在程序清单文件androidMinifest.xml文件中进行配置，代码如下:

<activity
android:name=".Action">
<intent-filter>
<action android:name="cn.wangbaiyuan.task5.action" />
<category android:name="android.intent.category.DEFAULT" />

<category android:name="cn.wangbaiyuan.category_action" />
</intent-filter>
</activity>

  使用Action、category启动这个Activity的代码为：

intent=new Intent();
intent.setAction("cn.wangbaiyuan.task5.action");
intent.addCategory("cn.wangbaiyuan.category_action");

  展示结果的代码：

setContentView(R.layout.activity_component);
TextView text=(TextView)findViewById(R.id.textView1);
text.setText("此activity由含有action和category的intent启动\\nAction："+getIntent().getAction()+"\\ncategory："+getIntent().getCategories());

  截图： [![Intent的Action、category属性](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image003_thumb.png "Intent的Action、category属性")](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image003.png)

四、Intent的Data、Type属性
--------------------

Data属性通常用于向Action属性提供操作的数据，Data属性接受一个Uri对象，一个Uri对象通过如下形式的字符串来表示： content://cn.wangbaiyuan.contacts/contacts/1 tel:1880000000 冒号前面指定了数据的类型，后面的是数据部分。 Type属性则用于明确指定Data属性的数据类型或MIME类型，但是通常来说，当Intent不指定Data属性时Type属性才会起作用，否则Android系统将会根据Data属性值来分析数据的类型，所以无需指定Type属性。 一旦为Intent同时指定了Action和Data属性，那么Android将可根据指定的数据类型来启动特定的应用程序，并对指定的数据执行相应的操作。 在我的代码文件中我分别测试了5个用Activity和Data组合的情况，为五个按钮分别设置一下监听器：

public OnClickListener scheme=new OnClickListener() {
@Override
public void onClick(View v) {
// TODO Auto-generated method stub
Intent intent = new Intent();
// 只设置Intent的Data属性
intent.setData(Uri.parse("lee://www.baidu.com:1234/test"));
startActivity(intent);
}
};
public OnClickListener schemeHostPort=new OnClickListener() {
@Override
public void onClick(View v) {
// TODO Auto-generated method stub
Intent intent = new Intent();
// 只设置Intent的Data属性
intent.setData(Uri.parse("lee://wangbaiyuan.cn:8888/test"));
startActivity(intent);
}};
public OnClickListener schemeHostPath=new OnClickListener() {
@Override
public void onClick(View v) {
// TODO Auto-generated method stub
Intent intent = new Intent();
// 只设置Intent的Data属性
intent.setData(Uri.parse("lee://wangbaiyuan.cn:1234/android"));
startActivity(intent);
}};
public OnClickListener schemeHostPortPath=new OnClickListener() {
@Override
public void onClick(View v) {
// TODO Auto-generated method stub
Intent intent = new Intent();
// 只设置Intent的Data属性
intent.setData(Uri.parse("lee://wangbaiyuan.cn:8888/android"));
startActivity(intent);
}};
public OnClickListener schemeHostPortPathType=new OnClickListener() {
@Override
public void onClick(View v) {
// TODO Auto-generated method stub
Intent intent = new Intent();
// 同时设置Intent的Data、Type属性
intent.setDataAndType(Uri.parse("lee://wangbaiyuan.cn:8888/android")
, "abc/xyz");
startActivity(intent);
}};
public OnClickListener systemActivity=new OnClickListener() {
@Override
public void onClick(View v) {
// TODO Auto-generated method stub
Intent intent = new Intent();
// 同时设置Intent的Data、Type属性
intent.setData(Uri.parse("http://wangbaiyuan.cn"));
startActivity(intent);
}};

  运行截图： [![Intent的Data、Type属性](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image005_thumb.jpg "Intent的Data、Type属性")](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image005.jpg)[![Intent的Data、Type属性](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image007_thumb.jpg "Intent的Data、Type属性")](http://wangbaiyuan.cn/wp-content/uploads/2015/04/clip_image007.jpg)  

五、Intent创建tab页面：
----------------

代码：

@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(savedInstanceState);
setContentView(R.layout.tab);
TabHost tabhost=getTabHost();
tabhost.addTab(tabhost.newTabSpec("tab1")
.setIndicator("IT业界",getResources().getDrawable(R.drawable.ic_launcher))
.setContent(new Intent(this,webview.class)
.putExtra("url", "http://wangbaiyuan.cn/itindustry"))
);

tabhost.addTab(tabhost.newTabSpec("tab2")
.setIndicator("程序算法")
.setContent(new Intent(this,webview.class)
.putExtra("url", "http://wangbaiyuan.cn/code"))
);

tabhost.addTab(tabhost.newTabSpec("tab3")
.setIndicator("电脑技巧")
.setContent(new Intent(this,webview.class)
.putExtra("url", "http://wangbaiyuan.cn/computer-experience"))
);
tabhost.addTab(tabhost.newTabSpec("tab3")
.setIndicator("关于我")
.setContent(new Intent(this,webview.class)
.putExtra("url", "http://wangbaiyuan.cn/leave-message/about"))
);
}

  运行结果： [![Intent创建tab页面](http://wangbaiyuan.cn/wp-content/uploads/2015/04/image_thumb9.png "Intent创建tab页面")](http://wangbaiyuan.cn/wp-content/uploads/2015/04/image9.png)  

代码下载
----