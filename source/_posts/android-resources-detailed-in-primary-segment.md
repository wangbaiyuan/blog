---
title: Android中资源详解（初级篇）
tags:
  - android
url: 1148.html
id: 1148
categories:
  - 软件开发
abbrlink: 11360
date: 2015-05-01 18:20:08
---

一、Android中资源分类详解
================

 

1、Android资源分类
-------------

Android中的资源分为两大类 : 可直接访问的资源, 无法直接访问的原生资源; -- 直接访问资源 : 这些资源可以使用 R. 进行访问, 都保存在res目录下, 在编译的时候, 会自动生成R.java 资源索引文件; -- 原生资源 : 这些资源存放在assets下, 不能使用 R类 进行访问, 只能通过 AssetManager 以二进制流形式读取资源;

2、Android资源详解
-------------

 

### res目录下资源详解 :

*   \-\- res/animator : 属性动画的XML文件目录, 属性动画就是定义起始结束, 动做, 重复时间等参数齐全的动画;
*   \-\- res/anim : 补间动画的XML文件目录, 补间动画是只定义 起始 结束帧, 中间的动作由系统进行计算获取动作过程;
*   \-\- res/color : 颜色列表的XML文件目录;
*   \-\- res/drawable : 存放真实的位图文件, 也可以存放Drawable对象及子类对象的XML文件;
*   \-\- res/layout : 界面布局文件目录;
*   \-\- res/menu : 程序中使用的菜单文件目录, 该文件下的XML文件可以应用与 选项菜单, 子菜单, 上下文菜单等;
*   \-\- res/raw : 存放原生资源, 与assets目录作用相同, 可以通过调用openRawResource(int)方法获取二进制输入流, 与asstes相似, 使用AssetsManager访问这些资源;
*   \-\- res/value : 存放 字符串. 整数, 颜色, 数组 信息的 XML文件的目录, 这些XML文件资源的根元素是resource;
*   \-\- res/xml : 原生的XML文件, 可以使用 Resource.getXML()方法进行访问;

### res/value目录XML文件子标签解析 :

*   \-\- string标签 : 代表一个字符串;
*   \-\- integer标签 : 代表一个整数值标签;
*   \-\- bool标签 : 代表一个boolean值;
*   \-\- color标签 : 代表一个颜色值;
*   \-\- array标签 : 代表数组;
*   \-\- string-array标签 : 代表字符串数组;
*   \-\- int-array标签 : 代表int数组;
*   \-\- style标签 : 代表样式;
*   \-\- dimen标签 : 代表一个尺寸;

3、分类资源文件 :
----------

如果将所有的资源放到一个XML文件中, 会增加维护难度, 这里将不通类型的资源放到不同的XML文件下;

*   \-\- arrays.xml : 存放数组资源;
*   \-\- colors.xml : 存放颜色资源;
*   \-\- dimens.xml : 存放尺寸值资源;
*   \-\- strings.xml : 存放字符串资源;
*   \-\- styles.xml : 存放样式资源;

二、Android中资源的使用
---------------

 

(1) Java代码访问清单资源
----------------

在Java代码中通过R类获取资源语法 :

\[packageName.\] R . resourceType . resourceName

*   \-\- pakegeName : R类所在的包名, 即权限定类型, R类可能来自两个包, 一个是程序本身的清单文件, 一个是Android系统存在的清单文件;
*   \-\- resourceType : R类中代表的资源类型的名称, R.string 字符串资源, R.integer 代表整数资源;
*   \-\- resourceName : 资源名称, 这个资源名称是对应类型子标签的 name属性的值;

(2) Java代码访问原生资源
----------------

*   **Resource类 :** Android资源访问控制类, 该类提供了大量方法获取实际资源, Resource通过 Context.getResource()方法获得;
*   \-\- 获取清单资源 : resource.getString(id), 根据id获取实际资源;
*   \-\- 获取原生资源 : resource.getassets(), 获取AssetManager对象;

//获取Resource资源, 这个方法在Activity中执行  
Resources resources = getResources();  
//获取字符串资源  
String hello = resources.getString(R.string.hello_world);  
//获取图片资源  
Drawable luncher = resources.getDrawable(R.drawable.ic_launcher);

(3) XML文件中使用资源 在XML文件中需要引用其它XML文件中的值, 语法格式为 :

@ \[packageName : \] resourceType / resourceName

*   \-\- packageName : 资源类型所在的包, 如果被引用资源 与 本XML文件在同一个包下, 可以省略包名;
*   \-\- resourceType : 资源类型, 例如 layout, drawable, strings等;
*   \-\- resourceName : 资源名称, 资源所在的XML文件中元素的 android:name 属性, 或者 是无后缀的文件名, 例如图片, 布局文件等;

三、字符串 颜色 尺寸 数组资源的使用情况
---------------------

(1) 几种资源的目录引用名称
---------------

### **字符串资源 :**

*   \-\- 默认目录 : /res/values/strings.xml ;
*   \-\- 引用方式 : R.string.xxx ;

### 颜色资源 :

*   \-\- 默认目录 : /res/values/colors.xml ;
*   \-\- 引用方式 : R.color.xxx ; 尺寸资源 :
*   \-\- 默认目录 : /res/values/dimens.xml ;
*   \-\- 引用方式 : R.dimens.xxx ;
*   **颜色定义方式:**
*   1.三原色 : 白光 可以分解为 红, 绿, 蓝 三种颜色的光, 红绿蓝都是最大值的时候就是白色, 三种值相等, 但不是最大值是灰色, 如果其中一种或两种值比较大, 就会产生各种颜色的彩色;
*   2.颜色表示 : 颜色通过 红(red) 绿(green) 蓝(blue) 三种颜色, 以及 透明度(alpha) 来表示的; -- 颜色开头 : 颜色值总是以 # 开头; -- 无透明度 : 如果没有 alpha 值, 默认完全不透明; **颜色定义形式 :**
*   \-\- #RGB : 红 绿 蓝 三原色值, 每个值分16个等级, 最小为0, 最大为f;
*   \-\- #ARGB : 透明度 红 绿 蓝 值, 每个值分16个等级, 最小为0, 最大为f;
*   \-\- #RRGGBB : 红 绿 蓝 三原色值, 每个值分 256个等级, 最小为0, 最大为ff;
*   \-\- #AARRGGBB : 透明度 红 绿 蓝 值, 每个值分 256个等级, 最小为0, 最大为ff;

(2)字符串 颜色 尺寸 XML文件定义
--------------------

   

### 1) 字符串资源文件

 

*   字符串资源文件信息 :
*   \-\- 资源位置 : /res/values 目录下;
*   \-\- 根元素 : 是根元素;
*   \-\- 子元素 : ;
*   \-\- name属性 : 指定变量名称;
*   \-\- 标签文本 : 标签文本就是字符串信息;

    ResourceTest  
    Settings  
    Hello world!  

 

### 2) 颜色资源文件

**颜色资源文件信息 :**

*   \-\- 位置 : /res/values目录;
*   \-\- 根元素 : ;
*   \-\- 子元素 : ;
*   \-\- name属性 : 颜色资源名称;
*   \-\- 标签文本 : 颜色值;

  #FF4000  
    #120A2A  
    #00FF00  
    #FFFF00

 

### 3) 尺寸资源文件

  **尺寸资源信息 :**

*   \-\- 位置 : /res/values目录;
*   \-\- 根元素 : ;
*   \-\- 子元素 : ;
*   \-\- name属性 : 尺寸名称;
*   \-\- 标签文本 : 尺寸值;

   16dp  
    16dp

### 4）数组资源

**资源数组文件 :** 通常将数组定义在 /res/values/arrays.xml文件中;

*   \-\- 根标签 : ;
*   \-\- 子标签 : , , ;

**资源数组类型 :** 数组的资源的跟标签都是 , 不同类型的数组的子元素不同;

*   \-\- 普通类型数组 : 使用作为子元素标签;
*   \-\- 字符串数组 : 使用作为子元素标签;
*   \-\- 整数数组 : 使用作为子元素标签;

**XML文件中调用数组资源 :** @ \[packageName :\] array/arrayName ; **Java文件中调用数组资源 :** \[packageName . \]R.array.arrayName ;

*   \-\- 获取实际普通数组 : TypeArray obtainTypedArray(int id), 根据普通数组资源名称获取实际普通数组, TypeArray类提供了getXxx(int index)方法获取指定索引的元素;
*   \-\- 获取字符串数组 : String\[\] getStringArray(int id), 根据字符串数组资源名称获取字符串数组;
*   \-\- 获取整数数组 : int\[\] getIntArray(int id), 根据整数数组资源名称获取实际的整数数组;