---
title: activity生命周期及其周期方法详解
tags:
  - android
url: 1090.html
id: 1090
categories:
  - 软件开发
abbrlink: 46149
date: 2015-04-13 15:27:20
---

当Activity处于应用中运行时，它的活动状态是由安卓操作系统通过栈的方式进行管理的，当前正在进行的Activity位于栈顶。随着不同应用的进行，每一个Activity都可以从活动状态转入非活动状态。下面是android的ACTIVITY生命周期的图示： [![](http://baiyuan.wang/wp-content/uploads/2015/04/1341462194_3261.jpg)](http://baiyuan.wang/wp-content/uploads/2015/04/1341462194_3261.jpg)

安卓ACTIVITY生命周期的的四个阶段
--------------------

1.  **开始Activity：**在这个阶段依次执行3个生命周期方法：onCreate()、onStart()和onResume()。
2.   **Activity失去焦点：**如果在Activity获得焦点的情况下进入其他的Activity，这时当前的Activity会失去焦点。在这一阶段，会依次执行onPause()和onStop()方法。
3.  ** Activity重新获得焦点：**如果Activity重新获得焦点，会依次执行 3个生命周期方法：onRestart()、onStart()和onResume()。
4.   **关闭Activity：**当Activity被关闭时系统会依次执行3个生命周期方法：onPause()、onStop()和onDestroy()。

现在通过一个例子来了解它的生命周方法在四个阶段的用法：

七个生命周期方法：
---------

*    **protected void onCreate(Bundle savedInstanceState)：**当Activity第一次被创建时调用,我们可以在这进行初始化操作
*    **  protected void onStart()：**onStart()方法在Activity开始被执行时调用，它紧随onCreate()方法之后调用
*      **protected void onResume()：**onResume()方法在Activity即将与用户交互时调用
*   **   protected void onPause()：**在一个Activity启动另一个Activity时调用，它通常被用来持久化数据、停止动画或其他耗费资源的动作，下一个Activity必须等待这个方法返回后在启动，所以在这里做过多的操作
*      **protected void onStop()：**onStop()方法在一个新的Activity启动、其他的Activity切换到前台、当前Activity被销毁时都会被调用
*      **protected void onRestart()：**当Activity从stopped状态启动时会调用onRestart(),后面总是调用onStart()方法
*    **  protected void onDestroy()  ：**Activity被销毁时调用

示例代码：  

package cn.wangbaiyuan.activity; 
import android.app.Activity; 
import android.os.Bundle; 
import android.util.Log; 
public class MyActivity extends Activity { 
private static final String lifeTag = "Activity生命周期"; 
//当Activity第一次被创建时调用,我们可以在这进行初始化操作
public void onCreate(Bundle savedInstanceState) { 
super.onCreate(savedInstanceState); 
        setContentView(R.layout.main); 
        Log.d(lifeTag,"---->oncreate()被执行"); 
    } 

//onStart()方法在Activity开始被执行时调用，它紧随onCreate()方法之后调用
protected void onStart() { 
super.onStart(); 
        Log.d(lifeTag,"---->onStart()被执行"); 
    } 
//onResume()方法在Activity即将与用户交互时调用
protected void onResume() { 
super.onResume(); 
        Log.d(lifeTag,"---->onResume()被执行"); 
    } 

//当Activity从stopped状态启动时会调用onRestart(),后面总是调用onStart()方法
protected void onRestart() { 
super.onRestart(); 
        Log.d(lifeTag,"---->onRestart()被执行"); 
    } 

//在一个Activity启动另一个Activity时调用，它通常被用来持久化数据、停止动画或其他耗费资源的动作，
//下一个Activity必须等待这个方法返回后在启动，所以在这里做过多的操作
protected void onPause() { 
super.onPause(); 
       Log.d(lifeTag,"---->onPause()被执行"); 
    } 

//onStop()方法在一个新的Activity启动、其他的Activity切换到前台、当天Activity被销毁时都会被调用

protected void onStop() { 

super.onStop(); 

        Log.d(lifeTag,"---->onStop()被执行"); 

    } 

//Activitybe被销毁时调用
protected void onDestroy() { 
super.onDestroy(); 
        Log.d(lifeTag,"---->onDestroy()被执行"); 
    } 
}