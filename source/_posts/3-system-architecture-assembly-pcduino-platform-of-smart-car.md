---
title: 【3】系统架构与组装-Pcduino平台下的智能小车
tags:
  - IoT
url: 2085.html
id: 2085
categories:
  - 技术应用
abbrlink: 42355
date: 2018-03-27 20:07:06
---

一、系统设计
------

本文设计中，智能车通信控制系统主要由飞思卡尔小车模型、pcDuino开发板及其外接模块、远程控制客户端（智能手机）、无线局域网设备组成，其系统结构示意图如下：[![](http://wangbaiyuan.cn/wp-content/uploads/2018/03/Screen-Shot-2018-03-27-at-20.01.53-750x500.png)](http://wangbaiyuan.cn/wp-content/uploads/2018/03/Screen-Shot-2018-03-27-at-20.01.53.png) 依图所示，为了使用pcDuino对智能车模型的电机、舵机进行控制，本文使用L298P扩展模块插入pcDuino主板上的Arduino兼容硬件接口，由于L298P和pcDuino主板电平不匹配的原因，两者中间通过T board模块完成电平转换。双目摄像头通过USB接口接入pcDuino，由于pcDuino配备了无线WIFI模块，可以通过无线局域网和外部的远程客户端完成组网，实现远程通信和控制。 为了使用智能手机客户端对智能车系统进行控制，本设计中采用智能手机连入局域网向智能车系统发送命令来实现，系统结构是典型的C/S（客户端-服务器）结构，这意味着智能车pcDuino开发板作为服务器，同时pcDuino借助Arduino接口完成电机、舵机等控制。客户端服务器之间的通信指令设计在4.2节中进行了详细论述。除了控制指令，客户端获取实施视频会借助MJPG-streamer来完成，这会在4.3节中详细介绍。  

二、模块组装
------

本系统中的硬件模块及其型号如下：

*   电源：5v 2A可充电锂电池，容量10000mAh；本设计中使用了通用的智能手机使用的移动电源来充当智能车的电源模块，由于pcDuino和电机的要求，2A的电流参数是很必要的。
*   pcDuino V3 3B 双核A20高性能 Cortex-A7开发板；
*   KS352双目摄像头，1280*480分辨率，广角160°；
*   飞思卡尔智能车模型，带舵机电机；
*   L298P Motor Shield 步进 直流电机驱动模块
*   pcDuino V23.3V到5电平转换板

[![](http://wangbaiyuan.cn/wp-content/uploads/2018/03/Picture1-4.png)](http://wangbaiyuan.cn/wp-content/uploads/2018/03/Picture1-4.png)   pcDuino通过USB OTG与移动电源进行连接，通过USB与双目摄像头连接。将电平转换板插接在pcDuino接口上后，再将L298P和电平转换板进行连接。L298P中MA、MB一共四个接头可驱动两个电机，本文使用MA驱动，其引脚号为12；L298P上的9号引脚与舵机相连。 其连接示意图如下：   [![](http://wangbaiyuan.cn/wp-content/uploads/2018/03/Screen-Shot-2018-03-27-at-20.03.46.png)](http://wangbaiyuan.cn/wp-content/uploads/2018/03/Screen-Shot-2018-03-27-at-20.03.46.png)