---
title: 怎样在网页中加入“网站已运行多少天”
tags:
  - JS
  - PHP
url: 247.html
id: 247
categories:
  - 算法语言
abbrlink: 30134
date: 2014-12-14 15:08:00
---

现在有很多 网页会在页脚版权部分加入网站已运行多少天的信息，本文章以我的博客为例向大家分享一下代码，代码非本人原创 代码如下：

王柏元的博客已运行

<div class="yunxing">
王柏元的博客已运行
<span id="span_time"></span>
<SCRIPT language=javascript>
<!--
//document.write("");
function show\_date\_time(){
window.setTimeout("show\_date\_time()", 1000);
BirthDay=new Date("12-02-2014"); //提示：这里的12-02-2014是指建站日期
today=new Date(); timeold=(today.getTime()-BirthDay.getTime());
sectimeold=timeold/1000
secondsold=Math.floor(sectimeold);
msPerDay=24\*60\*60*1000
e_daysold=timeold/msPerDay
daysold=Math.floor(e_daysold);
e\_hrsold=(daysold-e\_daysold)*-24;
hrsold=Math.floor(e_hrsold);
e\_minsold=(hrsold-e\_hrsold)*-60;
minsold=Math.floor((hrsold-e_hrsold)*-60);
seconds=Math.floor((minsold-e_minsold)*-60);
span_time.innerHTML=daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒" ;
}
show\_date\_time();
//-->
</SCRIPT>
</div>