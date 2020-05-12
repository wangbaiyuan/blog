---
title: PHP用json_encode转换数组中文乱码
tags:
  - API
  - PHP
url: 1066.html
id: 1066
categories:
  - 软件开发
abbrlink: 34006
date: 2015-04-05 10:45:14
---

由于在安卓软件开发实践中，笔者想给软件加上软件更新服务，于是决定依托自己的虚拟主机，用php制作一个自己的API。再通过json标准格式输出数据库的查询结果。

一、实例展示
------

API制作代码的简单形式是：

<?php
$id = $_GET\['id'\];//get接受传值
api($id);//执行函数
//定义函数
function api($id){
//函数体
$array= array(1,2,3);//这是只是示意，表示$array是数组
$json=jsons\_encode($array);//通过jsons\_encode函数输出数组的json格式
echo $json;
}
?>

通过jsons_encode函数把数组转换成json格式时，会发现形如这样的中文乱码： \\u901a\\u8baf\\u5f55\\uff0c\\u662f\\u738b\\u67cf\\u5143\\u81ea\\u4e3b\\u5f00\ 在反复检查PHP使用编码和数据库编码后，笔者才发现这是jsons_encode函数的问题，造成的原因如下：

二、原因分析:
-------

在存储到数据库时!MySQL 不会存储 unicode 字符：MySQL 仅支持从基本的多语种平面字符 (0×0000-0xFFFF)。请尝试存储一个同义词相反:) 更新： MySQL 5.5.3 上 (其中尚未 GA), 支持补充字符如果您使用 UTF8MB4 编码。 json_encode中文的时候，会把每个中文字符encode成“uxxxx”,而存进数据库的时候，“”被屏蔽了，直接变成”uxxxx”

三、 解决问题：
--------

### 1\. 避免json_encode将中文转换unicode编码.

PHP5.4版本，已经给Json新增了一个选项: JSON\_UNESCAPED\_UNICODE。加上这个选项后，就不会自动把中文编码了。 $json= json\_encode("王柏元的博客", JSON\_UNESCAPED_UNICODE);

### 2\. 先将中文字段urlencode，json_encode后，再用urldecode，也可以保证中文不会被转成unicode。

$json=urldecode(json_encode(array('brief'=>urlencode('王柏元的博客),'title'=>urlencode(王柏元的博客)));

四、解决问题的代码
---------

上面分析了问题出现的原因，如果你的PHP版本在5.4或以上，你可以使用上面的解决方案一。 第二种方案是个通解，下面我来提供自己的代码给大家参考：

<?php
function jsons_encode($array){
//遍历已有数组，将每个值 urlencode 一下
foreach($array as $key=>$value){
$array\[$key\]=urlencode($value);
 }
//用urldecode将值反解
 return urldecode(json_encode($array));
}
/**注意：中间省略了数组获取的代码，
你可以使用上面的jsons_encode函数对你的数组进行转换
*/

$json=jsons_encode($array);
echo $json;
?>