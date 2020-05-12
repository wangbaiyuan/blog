---
title: React Native中添加Base64支持
tags:
  - React Native
url: 1901.html
id: 1901
categories:
  - 算法语言
abbrlink: 23715
date: 2017-03-08 16:43:49
---

> 最近极客人在使用React Native制作的自己的博客客户端，客户端在调用Wordpress Rest API时有些操作需要使用HTTP认证，而HTTP认证中主要就是在HTTP请求中的头部加入 "Authorization"字段，Authorization字段的内容时 用户名:密码 的base64编码

环境依赖
----

Base64编解码算法在Nodejs的buffer组件中有支持，首先我们需要在React Native项目根目录下运行命令行安装buffer依赖： `npm install buffer --save` 安装完毕后，React Native根目录的app.json中的dependencies便会自动加入下面一条：

![](http://wangbaiyuan.cn/wp-content/uploads/2017/03/20170308164248117.jpg)

React Native中添加Base64支持

使用方式
----

### 引入

`var Buffer = require('buffer').Buffer`

### 编码

`var base64Str= new Buffer(rawStr).toString('base64');`

### 解码

var b = new Buffer(base64Str, 'base64')
var s = b.toString();

 

Buffer项目主页：
-----------

更多buffer的使用方法参考Buffer主页：[https://github.com/feross/buffer](https://github.com/feross/buffer)