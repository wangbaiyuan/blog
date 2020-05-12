---
title: 解决htacess RewriteRule中含有？的问题
url: 1735.html
id: 1735
categories:
  - 算法语言
abbrlink: 27686
date: 2016-11-07 22:23:46
tags: ''
---

最近分别用PHP和java写个一个IP寻找地理位置的在线API，由于想让自己的URL看起来更加漂亮，便使用了htaccess Rewrite语法对URL进行了重写，其中出现无法匹配“？”的情况，最后解决了，在此给大家分享一下： 我想实现的效果是把

api.php?format=js&ip=10.22.56.0 重写为 api.js?ip=10.22.56.0

api.php?format=json&ip=10.22.56.0 重写为 api.json?ip=10.22.56.0

于是很容易写了下面规则：

RewriteRule api\\.(txt|html|json|js)\\?(.*)$ api.php?format=$1&$2 \[L\]

然后始终无法实现相关效果，初步原因是rewrite不能把带问号的QUERY_STRING进行匹配，最后使用下面的规则成功了：

RewriteRule  api\\.(txt|html|json|js)(.*)$ api.php?format=$1&%{QUERY_STRING} \[L\]

%{变量名}可以获取请求的参数