---
title: 安卓实现倒计时按钮效果
tags:
  - android
  - android开发
url: 1424.html
id: 1424
categories:
  - 前端
  - 算法语言
  - 软件开发
abbrlink: 33546
date: 2015-08-20 11:10:57
---

安卓手机管家类软件，在对手机的应用权限进行管理时常常会跳出这样的弹出框。 [![button](http://baiyuan.wang/wp-content/uploads/2015/08/button.jpg)](http://baiyuan.wang/wp-content/uploads/2015/08/button.jpg) 这样的按钮出现在很多场合，系统会给一定时间比如30s提示用户选择操作“禁止”还是“允许”，并设置倒计时，并在倒计时为零后系统会为用户选择默认行为执行。这个设计十分智能化，在无人使用手机时实现了自动化处理。下面介绍使用handler和Runnable实现这样的按钮是效果：

安卓实现倒计时按钮效果
-----------

在极客人的一篇转载文章[《Android使用线程更新UI的几种方法》](http://baiyuan.wang/several-methods-of-using-threads-update-android-ui.html)中，提到了用在Android里使用 Runnable和 Handler.PostDelayed(Runnable,Time) 定时更新界面。下面我讲解的便是使用Runnable和 Handler.PostDelayed(Runnable,Time) 实现倒计时效果的按钮。 假设点击倒计时按钮的动作为运行函数 function(),按钮变量名为forbiddenBtn下面是实现的代码：

Handler timerHandler = new Handler();
int autoRun=30;//设置倒计时时间30s
second=autoRun;
    Runnable timerRunnable = new Runnable() {
        @Override
        public void run() {
            if (second == 0) {
                forbiddenBtn.setText("禁止");
                timerHandler.removeCallbacks(timerRunnable);//清除定时
                second =autoRun;
                function();//执行默认操作
            } else {
                forbiddenBtn.setText("禁止 (" + second-- + "秒...)");
                timerHandler.postDelayed(this, 1000);
            }
        }
    };

原理
--

上面代码实现的原理是使用timeHander.postDelayed(context,int)函数定时调用一个Runnable呢，这里是延时1000ms执行一下timerRunnable。调用上述倒计时的代码为：

timerHandler.postDelayed(timerRunnable, 0);

即立即执行timerRunnable；当执行timerRunnable时，由于second初始化为30s,if语句执行else部分，second在button上显示出来后执行减1，然后通过timerHandler.postDelayed(this, 1000); 在1秒后再次执行timerRunnable，此时second=29……依此类推，当second=0时，就会执行function()，执行倒计时归零后的默认操作，