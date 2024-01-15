---
title: AndroidFragment生命周期详解
tags:
  - android
  - android开发
url: 1284.html
id: 1284
categories:
  - 百元百科
  - 软件开发
abbrlink: 32964
date: 2015-06-15 21:55:57
---

1   生命周期两张图
-----------

### Fragment生命周期图：

  [![android-fragment生命周期](http://baiyuan.wang/wp-content/uploads/2015/06/baiyuan.wang_2015-06-16_21-55-22.png)](http://baiyuan.wang/wp-content/uploads/2015/06/baiyuan.wang_2015-06-16_21-55-22.png) android-fragment生命周期

### Fragment与Activity生命周期对比图：

![android-fragment生命周期2](http://baiyuan.wang/wp-content/uploads/2015/06/baiyuan.wang_2015-06-16_21-55-18.png)

2   生命周期分析
----------

### 1\. 当一个fragment被创建的时候，它会经历以下状态.

*   onAttach()
*   onCreate()
*   onCreateView()
*   onActivityCreated()

### 2\. 当这个fragment对用户可见的时候，它会经历以下状态。

*   onStart()
*   onResume()

### 3\. 当这个fragment进入“后台模式”的时候，它会经历以下状态。

*   onPause()
*   onStop()

### 4\. 当这个fragment被销毁了（或者持有它的activity被销毁了），它会经历以下状态。

*   onPause()
*   onStop()
*   onDestroyView()
*   onDestroy() // 本来漏掉类这个回调，感谢xiangxue336提出。
*   onDetach()

### 5\. 就像activitie一样，在以下的状态中，可以使用Bundle对象保存一个fragment的对象。

*   onCreate()
*   onCreateView()
*   onActivityCreated()

### 6\. fragments的大部分状态都和activitie很相似，但fragment有一些新的状态。

*   onAttached() —— 当fragment被加入到activity时调用（在这个方法中可以获得所在的activity）。
*   onCreateView() —— 当activity要得到fragment的layout时，调用此方法，fragment在其中创建自己的layout(界面)。
*   onActivityCreated() —— 当activity的onCreated()方法返回后调用此方法
*   onDestroyView() —— 当fragment中的视图被移除的时候，调用这个方法。
*   onDetach() —— 当fragment和activity分离的时候，调用这个方法。

一旦activity进入resumed状态（也就是running状态），你就可以自由地添加和删除fragment了。因此，只有当activity在resumed状态时，fragment的生命周期才能独立的运转，其它时候是依赖于activity的生命周期变化的。