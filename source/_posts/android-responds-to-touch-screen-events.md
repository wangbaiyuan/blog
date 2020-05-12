---
title: 安卓响应触摸屏事件
tags:
  - android
url: 1086.html
id: 1086
categories:
  - 软件开发
abbrlink: 60425
date: 2015-04-13 11:37:05
---

响应触摸屏事件
-------

话不多说先上代码：

public boolean onTouchEvent(MotionEvent event) {

//获得触摸的坐标
float x = event.getX();
float y = event.getY(); switch (event.getAction()) 
{
//触摸屏幕时刻
case MotionEvent.ACTION_DOWN:

break;
//触摸并移动时刻
case MotionEvent.ACTION_MOVE:

break;
//终止触摸时刻
case MotionEvent.ACTION_UP:
break;
}
return true;
}

 

关于public boolean onTouchEvent (MotionEvent event)方法：
----------------------------------------------------

### 参数event：

参数event为手机屏幕触摸事件封装类的对象，其中封装了该事件的所有信息，例如触摸的位置、触摸的类型以及触摸的时间等。该对象会在用户触摸手机屏幕时被创建。

### 返回值：

该方法的返回值机理与键盘响应事件的相同，同样是当已经完整地处理了该事件且不希望其他回调方法再次处理时返回true，否则返回false。 该方法并不像之前介绍过的方法只处理一种事件，一般情况下以下三种情况的事件全部由onTouchEvent方法处理，只是三种情况中的动作值不同。

### 屏幕被按下：

当屏幕被按下时，会自动调用该方法来处理事件，此时MotionEvent.getAction()的值为MotionEvent.ACTION_DOWN，如果在应用程序中需要处理屏幕被按下的事件，只需重新该回调方法，然后在方法中进行动作的判断即可。

### 屏幕被抬起：

当触控笔离开屏幕时触发的事件，该事件同样需要onTouchEvent方法来捕捉，然后在方法中进行动作判断。当MotionEvent.getAction()的值为MotionEvent.ACTION_UP时，表示是屏幕被抬起的事件。

### 在屏幕中拖动：

该方法还负责处理触控笔在屏幕上滑动的事件，同样是调用MotionEvent.getAction()方法来判断动作值是否为MotionEvent.ACTION_MOVE再进行处理。

控制飞机跟随手指移动：
-----------

    public boolean onTouchEvent(MotionEvent event){
     plane.setX(event.getX());
     plane.setY(event.getY());
     invalidate();
     return true;
    }