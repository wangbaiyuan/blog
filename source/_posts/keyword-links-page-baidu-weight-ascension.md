---
title: 流量关键词链接页面提升百度权重
tags:
  - SEO
  - Web
url: 1556.html
id: 1556
categories:
  - 技术应用
abbrlink: 50544
date: 2015-12-20 14:39:56
---

百度搜索的排名常常根据页面搜索进入的流量大小进行变化，如果对于一个关键词很多人都会进入同一个网页，百度会认为这个网页能很好地解决这个问题，从而使这个网页在该关键词搜索时排在其它网页的前面。在百度站长平台的后台，我们可以知道有哪些关键词被百度搜索以及是否进入了我们的网页。我们可以通过做一个这个页面，里面全是搜索这些关键词的网址，访问以后进入我们的网站，从而提升我们的网站排名。[![百度流量关键词](http://wangbaiyuan.cn/wp-content/uploads/2015/12/wangbaiyuan.cn_2015-12-20_14-35-04.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/12/wangbaiyuan.cn_2015-12-20_14-35-04.jpg)

流量关键词链接页面提升百度权重
---------------

以下的代码是我写的一个流量关键词链接页面，里面全部是我的百度关键词。我们和偶尔点一下，提升相应关键词排名。使用方法是将百度流量关键词导出后放在一个keyword.txt文件里，关键词每行一个，文件路径与下面的PHP代码文件相同。

<html>
<body>
<title>百度关键词|王柏元的博客</title>
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">
<style>
    .link{
        float:left;
        margin-left:12px;
        padding:2px;
    }
    a:visited {
        color:#00FF00;
        text-decoration:none;
    }

</style>
<?php
/\*\*
 \* Created by PhpStorm.
 \* project： wordpress-blog
 \* User: BrainWang
 \* Author_URL: http://wangbaiyuan.cn
 \* Date: 2015/12/20
 \* Time: 14:03
 */


$file = fopen("keyword.txt", "r") or exit("Unable to open file!");
$url="https://www.baidu.com/s?ie=UTF-8&wd=";
//Output a line of the file until the end is reached
while(!feof($file))
{   $key=fgets($file);
    $EncodeStr=urlencode($key);
    echo '<li class="link"><a href="'.$url.$EncodeStr.'" target="_blank" >'.$key.'</a><br /></li>';
}
fclose($file);
?>
</body>
</html>