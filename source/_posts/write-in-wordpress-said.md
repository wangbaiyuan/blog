---
title: 在wordpress上写说说/短微博
tags:
  - wordpress
url: 945.html
id: 945
categories:
  - 技术应用
abbrlink: 13758
date: 2015-03-10 16:59:01
---

在我们写博客的时候，有时候只要简单记录一下程序的一个bug怎样解决，或者只言片语抒发一下点滴感想，如果长篇大论起来未免繁琐，但是几句话也当做一篇文章看起来感觉莫名其妙。wordpress是最受欢迎的博客程序之一，但是却没有其它有些博客CMS程序的“微语”这样的功能。有时候我们只想用一两句话抒发一下自己的情绪，就想用wordpress发个微博，发个说说；没有必要写成长篇大论，如果凑字数就完全失去了“抒发”的真谛。上次写了一篇用wordpress写说说的文章，访友们很是踊跃，希望做成插件。

一、插件
----

\[button class="demo" size="lg" href="https://github.com/geekeren/WordPressShuoShuo" title="在Github上StarWordPress说说插件"\]在Github上Star\[/button\] 本插件处于许多网友的要求为wordpress提供说说功能，wordpress不仅仅可以长篇大论，而可以微言大义。

二、使用注意
------

由于本人不是专业的wordpress开发者，没有大量时间优化这项功能。**本插件提供发表说说等功能**，至于说说页面的**样式界面文件只分享本人正在使用的**，_**我的界面样式可能并不适合你**_，这可能需要你自己根据自己的主题适配说说展示页界面布局和样式。

三、插件截图
------

#### 预览地址：[http://wangbaiyuan.cn/shuoshuo](http://wangbaiyuan.cn/shuoshuo)

### 电脑端界面：

[![shuoshuo](http://wangbaiyuan.cn/wp-content/uploads/2015/08/shuoshuo.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/08/shuoshuo.jpg)

### 手机端界面：

[![mobileshuoshuo](http://wangbaiyuan.cn/wp-content/uploads/2015/08/mobileshuoshuo.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/08/mobileshuoshuo.jpg)   下面主要介绍一下核心代码： 首先在主题的functions.php里面加入以下代码：

四、代码部分
------

//新建说说功能 
add\_action('init', 'my\_custom_init');
function my\_custom\_init()
{ $labels = array( 'name' => '说说',
'singular_name' => '说说', 
'add_new' => '发表说说', 
'add\_new\_item' => '发表说说',
'edit_item' => '编辑说说', 
'new_item' => '新说说',
'view_item' => '查看说说',
'search_items' => '搜索说说', 
'not_found' => '暂无说说',
'not\_found\_in_trash' => '没有已遗弃的说说',
'parent\_item\_colon' => '', 'menu_name' => '说说' );
$args = array( 'labels' => $labels,
'public' => true, 
'publicly_queryable' => true,
'show_ui' => true,
'show\_in\_menu' => true, 
'exclude\_from\_search' =>true,
'query_var' => true, 
'rewrite' => true, 'capability_type' => 'post',
'has_archive' => false, 'hierarchical' => false, 
'menu_position' => null, 'supports' => array('editor','author','title', 'custom-fields') );
register\_post\_type('shuoshuo',$args); 
}

  然后新建一个页面模板，如“page-shuoshuo.php”

<?php /*
Template Name: 说说
author: 王柏元
url: http://wangbaiyuan.cn
*/

get_header(); ?> 
<link rel="stylesheet" type="text/css" href="<?php echo THEME_URI.'/includes/css/my.css' ?>">
<div class="ssbody">
<div class="shuoshuo">
<ul class="archives-monthlisting">
<?php query\_posts("post\_type=shuoshuo&post\_status=publish&posts\_per\_page=-1");if (have\_posts()) : while (have\_posts()) : the\_post(); ?>
<li><span class="tt"><?php the_time('Y年n月j日G:H'); ?></span>
<div class="shuoshuo-content"><?php the\_content(); ?><br/><div class="shuoshuo-meta"><span >—<?php the\_author() ?></span></div></div><?php endwhile;endif; ?></li>
</ul>
</div> 
</div>
<?php get_footer('simple');?>

CSS样式：
------

\[toggle hide="yes" title="我的css样式：" color="red"\]

#content-container{
background: url() top left repeat,url(http://wangbaiyuan.cn/wp-content/uploads/2015/01/background.jpg) top center no-repeat;
background-attachment: fixed;
background-size: 2px 2px,cover;
}
#body-container{
background: #72d0eb;
background-attachment: fixed;
background-size: 2px 2px,cover;
}body
.ssbody{
max-width:900px;
margin:0px auto;
background-attachment:fixed;
background-repeat: repeat;
color: #FFFFFF;
font-family: 隶书;
}

.shuoshuo {
position: relative;
padding: 10px 0;
}
.shuoshuo li {
padding: 8px 0;
display: block;
}
.shuoshuo-content {
color: #FFFFFF;
font-family: 隶书;
box-shadow: 0 0 3px RGBA(0,0,0,.15);
background-color: rgba(148, 137, 137, 0.43);
border:1px #FFF solid;
border-radius: 4px;
font-size: 1.2em;
line-height:1.5em;
margin:0 150px 0 200px;
letter-spacing: 1px;
padding: 20px 20px 5px 30px;
min-height:60px;
position: relative;
white-space: pre; /* CSS 2.0 */
white-space: pre-wrap; /* CSS 2.1 */
white-space: pre-line; /* CSS 3.0 */
white-space: -pre-wrap; /* Opera 4-6 */
white-space: -o-pre-wrap; /* Opera 7 */
white-space: -moz-pre-wrap; /* Mozilla */
white-space: -hp-pre-wrap; /* HP Printers */
word-wrap: break-word; /* IE 5+, 文本行的任意字内断开 */
}
.shuoshuo-content p{margin:0;}
/*作者*/
.shuoshuo-meta {
text-align: right;
letter-spacing: 0px;
margin-top:-10px;
}
/*时间*/
.shuoshuo .tt{margin: 35px 0 0 15px;float:left;}
.shuoshuo li em{float:left;background:url("http://www.wuover.com/wp-content/themes/QIUYE/images/bolangxian.png") repeat-y;width:50px;height:10px;margin:42px 0 0 28px;}
.shuoshuo li:hover .tt {color:#0c0;font-weight:bold;}
/*头像*/
.shuoshuo .zhutou{border-radius: 50%;margin: 25px 35px 0 5px;float:right;padding: 2px;border: 1px #ddd solid;display: block;transition: .5s;width: 40px;height: 40px;overflow:hidden;}
.shuoshuo li:hover .zhutou {
transform: rotate(720deg);-webkit-transform: rotate(720deg);-moz-transform: rotate(720deg);border-color: #0c0;}
/*前面的轴*/
.shuoshuo:before {
height: 100%;
width: 2px;
background: #eee;
position: absolute;
left: 164px;
content: "";
top:0px;
}
.shuoshuo-content:before {
position: absolute;
top: 40px;
bottom: 0px;
left: -42px;
background: #fff;
height: 12px;
width: 12px;
border-radius: 6px;
content: "";
box-shadow: inset 0 0 2px #0c0;
}
.shuoshuo-content:after {
position: absolute;
top: 42px;
bottom: 0px;
left: -40px;
background: #ccc;
height: 8px;
width: 8px;
border-radius: 6px;
content: "";
}
.shuoshuo li:hover .shuoshuo-content:after {
background: #0c0;
-webkit-transform: scale(1.3);
-moz-transform: scale(1.3);
-ms-transform: scale(1.3);
-o-transform: scale(1.3);
}
.shuoshuo li:hover .shuoshuo-content:before {-webkit-transform: scale(1.3);
-moz-transform: scale(1.3);
-ms-transform: scale(1.3);
-o-transform: scale(1.3);}
/*后面的轴*/
.shuoshuo:after {
height: 100%;
width: 2px;
background: #eee;
position: absolute;
right: 100px;
content: "";
top:0px;
}
.shuoshuo-meta:before {
position: absolute;
top: 42px;
bottom: 0px;
right: -56px;
background: #fff;
height: 12px;
width: 12px;
border-radius: 6px;
content: "";
z-index:2;
box-shadow: inset 0 0 2px #0c0;
}
.shuoshuo-meta:after {
position: absolute;
top: 44px;
bottom: 0px;
right: -54px;
background: #ccc;
height: 8px;
width: 8px;
z-index:2;
border-radius: 6px;
content: "";
}
.shuoshuo li:hover .shuoshuo-meta:after {
background: #0c0;
}
@media screen and (max-width: 800px) {
.shuoshuo-content {margin:0 60px 0 70px;padding: 10px 10px 5px 10px;}
.shuoshuo .tt{width:30px;font-weight:bold;margin: 30px 0 0 1px;height: 20px;}
.shuoshuo li:hover .tt {color:#0c0;font-size:1.2em;}
.shuoshuo:before {left: 50px;}
.shuoshuo-content:before {left: -26px;top:30px;}
.shuoshuo-content:after {left: -24px;top:32px;}

.shuoshuo:after {right: 27px;}
.shuoshuo-meta:before {right: -39px;top:33px;}
.shuoshuo-meta:after {right: -37px;top:35px;}

.shuoshuo .zhutou{margin: 17px 5px 0 5px;}
.shuoshuo li em{float:left;width:39px;height:10px;margin:34px 0 0 -1px;}
}

\[/toggle\] 然后新建一个页面，使它的页面模板为“说说”样式。你可以访问我的“[博客说说](http://wangbaiyuan.cn/shuoshuo/ "说说")”预览一