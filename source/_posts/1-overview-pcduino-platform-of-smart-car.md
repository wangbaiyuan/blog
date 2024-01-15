---
title: 【1】概述-pcduino平台下的智能小车
tags:
  - IoT
url: 2042.html
id: 2042
categories:
  - 技术应用
abbrlink: 58790
date: 2018-03-19 21:36:50
---

 

> 本文使用飞思卡尔汽车模型，它配备了直流电机和模拟电路控制舵机，用来模拟真实汽车。汽车模型上搭载的PcDuino开发板，搭载了Ubuntu操作系统，并兼容Arduino扩展实现硬件控制，与开发板连接的双目摄像头可以采集两路视频并通过网络实时传输，为双目视觉测距提供支持；同时开发出“视觉辅助导航系统”Android端应用，可以远程实时查看智能汽车周围实况和控制汽车。

一、概论
----

Arduino开源硬件平台的出现大大提高了硬件开发的效率，即使是没有任何硬件基础的软件程序员，只要通过使用Arduino提供的开源库，就可以编写简单的代码对硬件进行控制，使用Arduino平台大大降低了本设计的难度。 Arduino还提供了多种型号的扩展板， Arduino生态圈的强大，许多开发者为Arduino开发出周边扩展模块，例如电机模块，红外线控制模块，触摸模块，这些模块大大增强了Arduino的功能，我们可以根据项目需求购买模块，就像拼接积木一样创造出自己的创新作品。但是，Arduino无法胜任大量运算和高复杂度的工程应用，只能做一些对性能要求不高的简单工作，这是受到Arduino的硬件和软件两方面限制的。 目前大部分的Arduino主板都使用MCU作为处理器, 例如Arduino Uno的ATmega328单片机,主频只有16MHz, 内存是只有2KB的SRAM，所以运行速度、代码规模、计算能力都十分有限。此外，如果有一些复杂的工程，需要Linux操作系统支持，Arduino显然是不能达到要求的，比如你想通过一个Arduino做openCv人来做人脸识别。 而pcDuino的出现则解决了这一问题，它基本相当于一款Mini PC，配备高性能的ARM处理器，同时，它又兼容Arduino硬件平台，并能运行Linux和Android操作系统系统，是一个软硬件相结合的开放应用开发平台。\[2\] 兼容Arduino意味着pcDuino不仅可以使用Arduino的扩展模块，还能兼容Arduino的项目代码，在pcDuino完成Arduino编程。

二、硬件选型
------

### PcDuino开发平台

根据需求有众多的版本的开发板，由于本文需要远程控制小车（需要WIFI功能），同时能获取两路摄像头视频（可扩展的USB接口），于是选用了配备1GHz主频的AllWinner A20 SoC ARM中央处理器、无线Wifi网卡的PcDuino 3B型号。 [![](http://baiyuan.wang/wp-content/uploads/2018/03/Picture2.png)](http://baiyuan.wang/wp-content/uploads/2018/03/Picture2.png)

### 电机驱动模块L298P

智能控制的关键之一是对速度的控制,本文使用L298P电机驱动模块对智能小车进行驱动。L298P Shield直流电机驱动器可直接驱动直流电机，驱动电流达2A，并可以通过PWM进行调速，可插接到Arduino上使用，同时它还配备了一个舵机控制插口控制舵机，和蜂鸣器可用于倒车警报。 [![](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-1.png)](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-1.png)

### 舵机控制模块

舵机控制模块是由直流电机、减速齿轮组、控制电路组成的转向控制系统。通过舵机的控制信号，可以指定输出轴的旋转角度，当输入特定角度的控制信号后，舵机会产生偏向这个角度的转动，如果控制信号持续一段时间，舵机会偏到这个角度之后保持静止。舵机模块除了应用于汽车模型的转向，还应用于机器人手臂控制、航模等等。

### 飞思卡尔车模

 

### 双目摄像头

双目摄像头就是具有两个镜头的摄像头，随着VR和3D视频技术的发展，双目摄像头在一些VR摄像机、手机上得到广泛的应用。双目摄像头模仿人的双眼，通过两个摄像头拍摄的不同画面，可以应用于计算机视觉测距。 下图为市场上购买的双目摄像头模块，可以通过USB接口与PC、开发板等相连，同时支持UVC协议。[![](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-2.png)](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-2.png)