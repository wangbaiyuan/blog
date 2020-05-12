---
title: 依托虚拟主机为自制APP提供软件更新服务（一）
tags:
  - android
  - API
  - 虚拟主机
url: 1121.html
id: 1121
categories:
  - 软件开发
abbrlink: 10577
date: 2015-04-21 23:09:47
---

学了一个月的安卓，写了几个小程序，总是觉得缺少点什么。看到一般市场上的软件都提供软件更新服务，极客人想自己也有个虚拟主机，是不是可以自己搭建一个软件更新服务器呢？百度了一下“依托虚拟主机为自制APP提供软件更新服务”，可惜找遍整个百度也没找到解决方案，所以一穷二白，自己干。 要想实现软件更新，肯定有个服务器端发布的最新软件版本号与用户端当前使用的版本进行比对。如果版本号相同，则提示用户“当前为最新版本”；如果服务器上发布的最新版本高于用户使用的，则提示“版本更新”，并提供下载功能，下载完毕之后自动执行安装。要想获取最新版本号，必须读取数据库，如果直接用用户加密码的方式直接连接数据库的话，这无疑不安全，因为如果反编译或者破解了你的软件，你的数据库将会任人宰割。所以，我想到的解决方案是，自己在服务器端利用PHP做一个API，使用API请求的方法获取最新版本号和版本描述及下载地址。在奋斗几个星期后，下面是我的具体实现步骤：

依托虚拟主机为自制APP提供软件更新服务（一）——使用PHP制作API
===================================

1.新建软件数据库表，添加软件ID、版本号、下载地址、版本描述等列；
----------------------------------

SQL语句如下：

CREATE TABLE \`my_software\` (
  \`sw\_id\` bigint(20) unsigned NOT NULL AUTO\_INCREMENT,
  \`sw_name\` varchar(255) CHARACTER SET gbk NOT NULL DEFAULT '',
  \`sw_version\` varchar(20) CHARACTER SET gbk NOT NULL DEFAULT '',
  \`sw_url\` varchar(255) CHARACTER SET gbk NOT NULL DEFAULT '',
  \`sw_description\` varchar(255) CHARACTER SET gbk NOT NULL DEFAULT '',
  PRIMARY KEY (\`sw_id\`),
  KEY \`sw\_version\` (\`sw\_version\`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

  建立的数据库表名为：mysoftware,结构如图： [![image](http://wangbaiyuan.cn/wp-content/uploads/2015/04/image_thumb8.png "image")](http://wangbaiyuan.cn/wp-content/uploads/2015/04/image8.png)

2.PHP调用数据库返回JSON格式字符串
---------------------

我在自己的虚拟主机根目录新建了命名为“api”文件夹，在“api”文件夹下建立两个php文件：update.php和db\_connect.php。 其中db\_connect.php是连接数据库的PHP文件，里面记录了连接数据库的数据库名、用户名、主机、密码、编码格式，代码如下：

<?php
define('DB_NAME', 'wangbaiyuan');

/\*\* MySQL数据库用户名 */
define('DB_USER', 'wangbaiyuan');

/\*\* MySQL数据库密码 */
define('DB_PASSWORD', 'wangbaiyuan');

/\*\* MySQL主机 */
define('DB_HOST', 'wangbaiyuan');

/\*\* 创建数据表时默认的文字编码 */
define('DB_CHARSET', 'utf8');
$software\_db=@mysqli\_connect(DB\_HOST,DB\_USER,DB\_PASSWORD,DB\_NAME) OR die('无法连接到软件数据库'.mysqli\_connect\_error());
mysqli\_set\_charset($software\_db,DB\_CHARSET);
?>

  你可以访问该PHP的URL测试改文件是否正确。 update.php是返回JSON字符串的PHP文件。它的作用是调取软件数据库表内的内容，并通过GET方法返回数据。 其代码如下：

<?php
header("Content-Type:text/html;charset=utf-8");
//get接受传值
$id = $_GET\['id'\];
//执行函数
update($id);

function update($id){
    require('db_connect.php');
    //函数体
   $string = "select * from my\_software where sw\_id=".$id;
   //echo $string;
   $str = @mysqli\_query($software\_db,$string);
   $array=mysqli\_fetch\_array($str,MYSQLI_ASSOC);
   //$array =jsonify($array);
$json=jsons_encode($array);
echo $json;
    mysqli\_close($software\_db);
}
//定义函数
function  jsons_encode($array){

      //遍历已有数组，将每个值 urlencode 一下
      foreach($array as $key=>$value){
           $array\[$key\]=urlencode($value);
      }
      //用urldecode将值反解
      return urldecode(json_encode($array));
}
?>

  在这个文件里，通过”[http://wangbaiyuan.cn/api/update.php?id=1](http://wangbaiyuan.cn/api/update.php?id=1 "http://wangbaiyuan.cn/api/update.php?id=1")”GET方式接受传值，然后调用了db_connect.php文件连接的数据库，执行$string = "select * from my\_software where sw\_id=".$id;语句，然后对结果进行解析返回标准的JSON格式字符串。其中jsons_encode函数你可以参考我之前的一篇文章：[PHP用json_encode转换数组中文乱码进行理解](http://wangbaiyuan.cn/php-using-json-encode-an-array-of-chinese-characters.html "PHP用json_encode转换数组中文乱码")； 下面我制作成功后访问[http://wangbaiyuan.cn/api/update.php?id=1](http://wangbaiyuan.cn/api/update.php?id=1)的网页内容： \[callout class="info" title="使用PHP制作的API"\]{"sw\_id":"1","sw\_name":"BY通讯录","sw\_version":"1.2","sw\_url":"http://wangbaiyuan.cn/api/software/Contactss\_1\_2.apk","sw_description":" 1.BY通讯录，是王柏元自主开发的APP，作安卓开发入门试验之用；\\n 2.调用在自己虚拟主机上的数据库搭建的API，实现了版本更新功能；\\n 3.使用一些新的安卓技术。"}\[/callout\] 看到这段字符串你可能大脑就会兴奋了，你可能能想到下面就是根据不同平台对JSON数据进行解析的工作了

依托虚拟主机为自制APP提供软件更新服务（二）——安卓解析API数据
==================================

在下一节我将通过安卓示例，向大家讲解对JSON数据进行解析为自制APP提供软件更新服务，[查看下一节](http://wangbaiyuan.cn/relying-on-virtual-hosts-to-provide-homemade-app-software-update-services-b.html "依托虚拟主机为自制APP提供软件更新服务（二）")。

代码下载
----