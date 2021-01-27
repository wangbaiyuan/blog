---
title: 安卓开发实现沉浸式状态栏
tags:
  - android开发
url: 1223.html
id: 1223
categories:
  - 前端
  - 软件开发
abbrlink: 17679
date: 2015-05-27 11:39:55
---

自android4.4出来以后，沉浸式状态栏莫名地就火了起来，而最近，极客人的安卓手机无意中更新完几个常用软件，比如天天动听、wps office，发现这些软件大体上没什么改动，不过都陆续实现了沉浸式状态栏效果。极客人当初第一次见到这个名词时，以为这是个很高大上的技术，不知道你也是否也觉得。不过真正知晓以后所谓的、传说中的沉浸式状态栏是什么东西时，才发现真是“见面不如闻名”。 [![沉浸式状态栏](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-27_12-02-34.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-27_12-02-34.jpg) 沉浸式状态栏 不管沉浸式是否高大上，但它就是很火，也成为刷机论坛各个刷机包炒作的看点。极客人在此还是向大家介绍怎么在安卓开发中实现安卓4.4及以上的手机应用实现沉浸式状态栏效果。 安卓开发实现沉浸式状态栏的代码相当简单。在activity代码中加入以下代码即可：

安卓开发实现沉浸式状态栏代码：
---------------

if (Build.VERSION.SDK\_INT >= Build.VERSION\_CODES.KITKAT) {
    Window window = getWindow();
    window.setFlags(WindowManager.LayoutParams.FLAG\_TRANSLUCENT\_STATUS,
    WindowManager.LayoutParams.FLAG\_TRANSLUCENT\_STATUS);
}

 

代码解析：
-----

Build.VERSION.SDK\_INT >= Build.VERSION\_CODES.KITKAT这句是获取当前手机SDK版本号大于或等于Build.VERSION_CODES.KITKAT（安卓4.4，详情请看附录）时及即执行如下代码：

Window window = getWindow();
    window.setFlags(WindowManager.LayoutParams.FLAG\_TRANSLUCENT\_STATUS,
    WindowManager.LayoutParams.FLAG\_TRANSLUCENT\_STATUS);

Build.VERSION_CODES类：目前已知的SDK版本号的枚举类，这些值可以在SDK中找到，每次官方发布，这些值都是单调递增。

SDK版本号附录：
---------

*   第一版： Build.VERSION_CODES.BASE
*   1.1版： Build.VERSION\_CODES.BASE\_1_1
*   1.5版： Build.VERSION_CODES.CUPCAKE
*   此版官方未发布： Build.VERSION\_CODES.CUR\_DEVELOPMENT
*   1.6版： Build.VERSION_CODES.DONUT
*   2.0版： Build.VERSION_CODES.ECLAIR
*   2.0.1版： Build.VERSION\_CODES.ECLAIR\_0_1
*   2.1版： Build.VERSION\_CODES.ECLAIR\_MR1
*   2.2版： Build.VERSION_CODES.FROYO
*   2.3版： Build.VERSION_CODES.GINGERBREAD
*   2.3.3版： Build.VERSION\_CODES.GINGERBREAD\_MR1
*   3.0版： Build.VERSION_CODES.HONEYCOMB
*   3.1版： Build.VERSION\_CODES.HONEYCOMB\_MR1
*   3.2版： Build.VERSION\_CODES.HONEYCOMB\_MR2
*   4.0版： Build.VERSION\_CODES.ICE\_CREAM_SANDWICH
*   4.0.3版： Build.VERSION\_CODES.ICE\_CREAM\_SANDWICH\_MR1
*   4.1版： Build.VERSION\_CODES.JELLY\_BEAN
*   4.2版： Build.VERSION\_CODES.JELLY\_BEAN_MR1
*   4.3版：Build.VERSION\_CODES.JELLY\_BEAN_MR2+NEWLINE);
*   4.4版：Build.VERSION_CODES.KITKAT);

注意：
---

①加入如下代码的界面，所有控件都会向上移，但是标题栏“actionbar”除外，极客人鼓捣了好久代码也没解决怎么把actionbar放在手机界面的顶部，所以建议大家将activity的主题theme设置为：“noactionbar”。实现方法如下： 在清单文件中activity标签中添加：

android:theme="@android:style/Theme.Holo.Light.NoActionBar"

//没有actionbar的主题还有很多这里是个例子

②你可能需要自己写个标题栏在布局的顶部

### 如果你有更好的方法，欢迎留言共同学习！