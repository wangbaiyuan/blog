---
title: PHP生成字母、符号、数字验证码图片
tags:
  - PHP
url: 1334.html
id: 1334
categories:
  - 百元百科
abbrlink: 32339
date: 2015-06-29 11:27:42
---

最近王柏元的博客频遭机器人注册或者恶意登录尝试，有时候一晚上能收到100条垃圾注册记录，10分钟能收到100条登录错误邮件通知，让极客人很无语和烦闷。尝试屏蔽IP等方法仍然收效甚微的情况下，极客人无奈考虑加入验证码了，目前只在注册页面加入了验证码，在控制登录上使用了Limit Login Attempts插件（本插件的汉化版见文章：）。 下面是PHP生成字母、符号、数字验证码图片的代码，是极客人对互联网的代码做了部分修改：其中$strpol定义了使用哪些字母、符号、数字绘制验证码。

效果演示：
-----

http://wangbaiyuan.cn/others/tools/captcha.php

php代码生成字母、符号、数字验证码图片
--------------------

<?php  
session_start();
//生成验证码图片
Header("Content-type: image/PNG");
$im = imagecreate(55,22); // 画一张55*122的图片
$back = ImageColorAllocate($im, rand(220,255),rand(220,255),rand(220,255)); // 定义背景颜色RGB值220-255之间的随机数，背景相当较亮
imagefill($im,0,0,$back); //把背景颜色填充到刚刚画出来的图片中
$vcodes = "";

//生成4位数字
for($i=0;$i<4;$i++){
$font = ImageColorAllocate($im, rand(50,200),rand(50,200),rand(50,200)); // 生成随机颜色
$strPol = "123456789ABCDEFGHIJKLMNabcdefghijklm@#&+?$";//随机字符串，定义你的验证码显示哪些字符
$max = strlen($strPol)-1;
$authnum=$strPol\[rand(0,$max)\];//随机选择字符
$vcodes.=$authnum;
//将随机字符串画到画布中，大小为5，字符间距离rand(9,12),形成交错和高低起伏
imagestring($im,5, 5+$i*rand(9,12),rand(1,6), $authnum, $font);
}
$_SESSION\['captcha'\] = $vcodes;

for($i=0;$i<100;$i++) //加入干扰象素
{
$randcolor = ImageColorallocate($im,rand(150,200),rand(100,255),rand(0,255));
imagesetpixel($im, rand()%70 , rand()%30 , $randcolor); // 画像素点函数
}
ImagePNG($im);
ImageDestroy($im);
?>