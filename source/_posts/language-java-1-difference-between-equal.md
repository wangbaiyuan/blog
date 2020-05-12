---
title: 【语言-java】1、"=="和"equal"的区别
tags:
  - JAVA
  - 应聘复习
url: 1635.html
id: 1635
categories:
  - 技术
abbrlink: 32956
date: 2016-03-18 20:08:36
---

对于一些基本数据类型，int，long，bool，还有char!，“==”都是表示值相等的意思，没有equal方法。 equal方法是object对象里面的方法，java中String不是基本数据类型，而是一个类，它们都是继承object类，还有Integer和int的区别也是Integer是一个类！ 在object类中，equal方法与“==”是等同的，“==”不是表示值相等，而是比较对象的地址是否相等！Integer和String都重写了（没错！就是重写，重载是写多个函数名相同但参数不同的函数；重写是对父类的方法重新定义，体现了多态性），equal方法经过String、Integer重写后，是比较值而非地址。