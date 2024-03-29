---
title: Android开发权限大全
tags:
  - android
  - android开发
  - 帮助文档
url: 1442.html
id: 1442
categories:
  - 技术
abbrlink: 31112
date: 2015-08-23 20:27:18
---

在安卓开发中，应用在访问手机硬件资源如SD读写、网络访问、定位、调用摄像头，或者联系人、打电话等系统服务时都要向android系统申请权限。权限机制有利于保护使用者的手机安全。曾经碰到许多木马软件在后台给你发短信，神不知鬼不觉就扣了话费。这种木马软件能发送短信的前提就是向android系统申请了发送短信的权限。现在许多的安全软件都有禁止应用权限的功能，即使 手机应用在申请了访问一些手机资源的权限也可以强行禁止访问。 [![permit](http://baiyuan.wang/wp-content/uploads/2015/08/permit.jpg)](http://baiyuan.wang/wp-content/uploads/2015/08/permit.jpg) 对于开发者，为应用申请权限的方法就是在项目清单文件中<manifest />添加如： <uses-permission android:name="android.permission.CALL_PHONE（权限名）" /> 下面是安卓开发应用权限大全：

Android开发权限大全
-------------

访问登记属性

android.permission.ACCESS\_CHECKIN\_PROPERTIES ，读取或写入登记check-in数据库属性表的权限

获取错略位置

android.permission.ACCESS\_COARSE\_LOCATION，通过WiFi或移动基站的方式获取用户错略的经纬度信息，定位精度大概误差在30~1500米

获取精确位置

android.permission.ACCESS\_FINE\_LOCATION，通过GPS芯片接收卫星的定位信息，定位精度达10米以内

访问定位额外命令

android.permission.ACCESS\_LOCATION\_EXTRA_COMMANDS，允许程序访问额外的定位提供者指令

获取模拟定位信息

android.permission.ACCESS\_MOCK\_LOCATION，获取模拟定位信息，一般用于帮助开发者调试应用

获取网络状态

android.permission.ACCESS\_NETWORK\_STATE，获取网络信息状态，如当前的网络连接是否有效

访问Surface Flinger

android.permission.ACCESS\_SURFACE\_FLINGER，Android平台上底层的图形显示支持，一般用于游戏或照相机预览界面和底层模式的屏幕截图

获取WiFi状态

android.permission.ACCESS\_WIFI\_STATE，获取当前WiFi接入的状态以及WLAN热点的信息

账户管理

android.permission.ACCOUNT_MANAGER，获取账户验证信息，主要为GMail账户信息，只有系统级进程才能访问的权限

验证账户

android.permission.AUTHENTICATE\_ACCOUNTS，允许一个程序通过账户验证方式访问账户管理ACCOUNT\_MANAGER相关信息

电量统计

android.permission.BATTERY_STATS，获取电池电量统计信息

绑定小插件

android.permission.BIND_APPWIDGET，允许一个程序告诉appWidget服务需要访问小插件的数据库，只有非常少的应用才用到此权限

绑定设备管理

android.permission.BIND\_DEVICE\_ADMIN，请求系统管理员接收者receiver，只有系统才能使用

绑定输入法

android.permission.BIND\_INPUT\_METHOD ，请求InputMethodService服务，只有系统才能使用

绑定RemoteView

android.permission.BIND_REMOTEVIEWS，必须通过RemoteViewsService服务来请求，只有系统才能用

绑定壁纸

android.permission.BIND_WALLPAPER，必须通过WallpaperService服务来请求，只有系统才能用

使用蓝牙

android.permission.BLUETOOTH，允许程序连接配对过的蓝牙设备

蓝牙管理

android.permission.BLUETOOTH_ADMIN，允许程序进行发现和配对新的蓝牙设备

变成砖头

android.permission.BRICK，能够禁用手机，非常危险，顾名思义就是让手机变成砖头

应用删除时广播

android.permission.BROADCAST\_PACKAGE\_REMOVED，当一个应用在删除时触发一个广播

收到短信时广播

android.permission.BROADCAST_SMS，当收到短信时触发一个广播

连续广播

android.permission.BROADCAST_STICKY，允许一个程序收到广播后快速收到下一个广播

WAP PUSH广播

android.permission.BROADCAST\_WAP\_PUSH，WAP PUSH服务收到后触发一个广播

拨打电话

android.permission.CALL_PHONE，允许程序从非系统拨号器里输入电话号码

通话权限

android.permission.CALL_PRIVILEGED，允许程序拨打电话，替换系统的拨号器界面

拍照权限

android.permission.CAMERA，允许访问摄像头进行拍照

改变组件状态

android.permission.CHANGE\_COMPONENT\_ENABLED_STATE，改变组件是否启用状态

改变配置

android.permission.CHANGE_CONFIGURATION，允许当前应用改变配置，如定位

改变网络状态

android.permission.CHANGE\_NETWORK\_STATE，改变网络状态如是否能联网

改变WiFi多播状态

android.permission.CHANGE\_WIFI\_MULTICAST_STATE，改变WiFi多播状态

改变WiFi状态

android.permission.CHANGE\_WIFI\_STATE，改变WiFi状态

清除应用缓存

android.permission.CLEAR\_APP\_CACHE，清除应用缓存

清除用户数据

android.permission.CLEAR\_APP\_USER_DATA，清除应用的用户数据

底层访问权限

android.permission.CWJ_GROUP，允许CWJ账户组访问底层信息

手机优化大师扩展权限

android.permission.CELL\_PHONE\_MASTER_EX，手机优化大师扩展权限

控制定位更新

android.permission.CONTROL\_LOCATION\_UPDATES，允许获得移动网络定位信息改变

删除缓存文件

android.permission.DELETE\_CACHE\_FILES，允许应用删除缓存文件

删除应用

android.permission.DELETE_PACKAGES，允许程序删除应用

电源管理

android.permission.DEVICE_POWER，允许访问底层电源管理

应用诊断

android.permission.DIAGNOSTIC，允许程序到RW到诊断资源

禁用键盘锁

android.permission.DISABLE_KEYGUARD，允许程序禁用键盘锁

转存系统信息

android.permission.DUMP，允许程序获取系统dump信息从系统服务

状态栏控制

android.permission.EXPAND\_STATUS\_BAR，允许程序扩展或收缩状态栏

工厂测试模式

android.permission.FACTORY_TEST，允许程序运行工厂测试模式

使用闪光灯

android.permission.FLASHLIGHT，允许访问闪光灯

强制后退

android.permission.FORCE_BACK，允许程序强制使用back后退按键，无论Activity是否在顶层

访问账户Gmail列表

android.permission.GET_ACCOUNTS，访问GMail账户列表

获取应用大小

android.permission.GET\_PACKAGE\_SIZE，获取应用的文件大小

获取任务信息

android.permission.GET_TASKS，允许程序获取当前或最近运行的应用

允许全局搜索

android.permission.GLOBAL_SEARCH，允许程序使用全局搜索功能

硬件测试

android.permission.HARDWARE_TEST，访问硬件辅助设备，用于硬件测试

注射事件

android.permission.INJECT_EVENTS，允许访问本程序的底层事件，获取按键、轨迹球的事件流

安装定位提供

android.permission.INSTALL\_LOCATION\_PROVIDER，安装定位提供

安装应用程序

android.permission.INSTALL_PACKAGES，允许程序安装应用

内部系统窗口

android.permission.INTERNAL\_SYSTEM\_WINDOW，允许程序打开内部窗口，不对第三方应用程序开放此权限

访问网络

android.permission.INTERNET，访问网络连接，可能产生GPRS流量

结束后台进程

android.permission.KILL\_BACKGROUND\_PROCESSES，允许程序调用killBackgroundProcesses(String).方法结束后台进程

管理账户

android.permission.MANAGE_ACCOUNTS，允许程序管理AccountManager中的账户列表

管理程序引用

android.permission.MANAGE\_APP\_TOKENS，管理创建、摧毁、Z轴顺序，仅用于系统

高级权限

android.permission.MTWEAK_USER，允许mTweak用户访问高级系统权限

社区权限

android.permission.MTWEAK_FORUM，允许使用mTweak社区权限

软格式化

android.permission.MASTER_CLEAR，允许程序执行软格式化，删除系统配置信息

修改声音设置

android.permission.MODIFY\_AUDIO\_SETTINGS，修改声音设置信息

修改电话状态

android.permission.MODIFY\_PHONE\_STATE，修改电话状态，如飞行模式，但不包含替换系统拨号器界面

格式化文件系统

android.permission.MOUNT\_FORMAT\_FILESYSTEMS，格式化可移动文件系统，比如格式化清空SD卡

挂载文件系统

android.permission.MOUNT\_UNMOUNT\_FILESYSTEMS，挂载、反挂载外部文件系统

允许NFC通讯

android.permission.NFC，允许程序执行NFC近距离通讯操作，用于移动支持

永久Activity

android.permission.PERSISTENT_ACTIVITY，创建一个永久的Activity，该功能标记为将来将被移除

处理拨出电话

android.permission.PROCESS\_OUTGOING\_CALLS，允许程序监视，修改或放弃播出电话

读取日程提醒

android.permission.READ_CALENDAR，允许程序读取用户的日程信息

读取联系人

android.permission.READ_CONTACTS，允许应用访问联系人通讯录信息

屏幕截图

android.permission.READ\_FRAME\_BUFFER，读取帧缓存用于屏幕截图

读取收藏夹和历史记录

com.android.browser.permission.READ\_HISTORY\_BOOKMARKS，读取浏览器收藏夹和历史记录

读取输入状态

android.permission.READ\_INPUT\_STATE，读取当前键的输入状态，仅用于系统

读取系统日志

android.permission.READ_LOGS，读取系统底层日志

读取电话状态

android.permission.READ\_PHONE\_STATE，访问电话状态

读取短信内容

android.permission.READ_SMS，读取短信内容

读取同步设置

android.permission.READ\_SYNC\_SETTINGS，读取同步设置，读取Google在线同步设置

读取同步状态

android.permission.READ\_SYNC\_STATS，读取同步状态，获得Google在线同步状态

重启设备

android.permission.REBOOT，允许程序重新启动设备

开机自动允许

android.permission.RECEIVE\_BOOT\_COMPLETED，允许程序开机自动运行

接收彩信

android.permission.RECEIVE_MMS，接收彩信

接收短信

android.permission.RECEIVE_SMS，接收短信

接收Wap Push

android.permission.RECEIVE\_WAP\_PUSH，接收WAP PUSH信息

录音

android.permission.RECORD_AUDIO，录制声音通过手机或耳机的麦克

排序系统任务

android.permission.REORDER_TASKS，重新排序系统Z轴运行中的任务

结束系统任务

android.permission.RESTART_PACKAGES，结束任务通过restartPackage(String)方法，该方式将在外来放弃

发送短信

android.permission.SEND_SMS，发送短信

设置Activity观察其

android.permission.SET\_ACTIVITY\_WATCHER，设置Activity观察器一般用于monkey测试

设置闹铃提醒

com.android.alarm.permission.SET_ALARM，设置闹铃提醒

设置总是退出

android.permission.SET\_ALWAYS\_FINISH，设置程序在后台是否总是退出

设置动画缩放

android.permission.SET\_ANIMATION\_SCALE，设置全局动画缩放

设置调试程序

android.permission.SET\_DEBUG\_APP，设置调试程序，一般用于开发

设置屏幕方向

android.permission.SET_ORIENTATION，设置屏幕方向为横屏或标准方式显示，不用于普通应用

设置应用参数

android.permission.SET\_PREFERRED\_APPLICATIONS，设置应用的参数，已不再工作具体查看addPackageToPreferred(String) 介绍

设置进程限制

android.permission.SET\_PROCESS\_LIMIT，允许程序设置最大的进程数量的限制

设置系统时间

android.permission.SET_TIME，设置系统时间

设置系统时区

android.permission.SET\_TIME\_ZONE，设置系统时区

设置桌面壁纸

android.permission.SET_WALLPAPER，设置桌面壁纸

设置壁纸建议

android.permission.SET\_WALLPAPER\_HINTS，设置壁纸建议

发送永久进程信号

android.permission.SIGNAL\_PERSISTENT\_PROCESSES，发送一个永久的进程信号

状态栏控制

android.permission.STATUS_BAR，允许程序打开、关闭、禁用状态栏

访问订阅内容

android.permission.SUBSCRIBED\_FEEDS\_READ，访问订阅信息的数据库

写入订阅内容

android.permission.SUBSCRIBED\_FEEDS\_WRITE，写入或修改订阅内容的数据库

显示系统窗口

android.permission.SYSTEM\_ALERT\_WINDOW，显示系统窗口

更新设备状态

android.permission.UPDATE\_DEVICE\_STATS，更新设备状态

使用证书

android.permission.USE_CREDENTIALS，允许程序请求验证从AccountManager

使用SIP视频

android.permission.USE_SIP，允许程序使用SIP视频服务

使用振动

android.permission.VIBRATE，允许振动

唤醒锁定

android.permission.WAKE_LOCK，允许程序在手机屏幕关闭后后台进程仍然运行

写入GPRS接入点设置

android.permission.WRITE\_APN\_SETTINGS，写入网络GPRS接入点设置

写入日程提醒

android.permission.WRITE_CALENDAR，写入日程，但不可读取

写入联系人

android.permission.WRITE_CONTACTS，写入联系人，但不可读取

写入外部存储

android.permission.WRITE\_EXTERNAL\_STORAGE，允许程序写入外部存储，如SD卡上写文件

写入Google地图数据

android.permission.WRITE_GSERVICES，允许程序写入Google Map服务数据

写入收藏夹和历史记录

com.android.browser.permission.WRITE\_HISTORY\_BOOKMARKS，写入浏览器历史记录或收藏夹，但不可读取

读写系统敏感设置

android.permission.WRITE\_SECURE\_SETTINGS，允许程序读写系统安全敏感的设置项

读写系统设置

android.permission.WRITE_SETTINGS，允许读写系统设置项

编写短信

android.permission.WRITE_SMS，允许编写短信

写入在线同步设置

android.permission.WRITE\_SYNC\_SETTINGS，写入Google在线同步设置