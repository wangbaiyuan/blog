---
title: PHP用SMTP发邮件(支持SSL)
tags:
  - PHP
url: 1279.html
id: 1279
categories:
  - 技术
abbrlink: 2930
date: 2015-06-14 09:40:35
---

在做安卓大作业时，考虑到可以在APP加入邮件通知、忘记密码邮件重置密码的功能，极客人在虚拟主机中加入PHP用SMTP发邮件(支持SSL)的代码，同时使用自己的域名邮箱leavepaper@baiyuan.wang进行了测试。

测试效果：
-----

[![PHP用SMTP发邮件支持SSL](http://baiyuan.wang/wp-content/uploads/2015/06/baiyuan.wang_2015-06-12_19-42-47.jpg)](http://baiyuan.wang/wp-content/uploads/2015/06/baiyuan.wang_2015-06-12_19-42-47.jpg) PHP用SMTP发邮件支持SSL

PHP用SMTP发邮件(支持SSL)代码
--------------------

注意：请自行下载PHPMailer_v5.1解压到虚拟主机，引入PHPMailer的核心文件class.phpmailer.php。（代码来自互联网，终极来源存疑）

<?PHP
header("Content-Type:text/html;charset=utf-8");
//引入PHPMailer的核心文件 使用require_once包含避免出现PHPMailer类重复定义的警告
require_once("phpmailer/class.phpmailer.php"); 
//示例化PHPMailer核心类
$mail = new PHPMailer();
 
//是否启用smtp的debug进行调试 开发环境建议开启 生产环境注释掉即可 默认关闭debug调试模式
$mail->SMTPDebug = 1;
 
//使用smtp鉴权方式发送邮件，当然你可以选择pop方式 sendmail方式等 本文不做详解
//可以参考http://phpmailer.github.io/PHPMailer/当中的详细介绍
$mail->isSMTP();
//smtp需要鉴权 这个必须是true
$mail->SMTPAuth=true;
//链接qq域名邮箱的服务器地址
$mail->Host = 'smtp.qq.com';
//设置使用ssl加密方式登录鉴权
$mail->SMTPSecure = 'ssl';
//设置ssl连接smtp服务器的远程服务器端口号 可选465或587
$mail->Port = 465;
//设置smtp的helo消息头 这个可有可无 内容任意
$mail->Helo = 'Hello smtp.qq.com Server';
//设置发件人的主机域 可有可无 默认为localhost 内容任意，建议使用你的域名
//$mail->Hostname = 'jjonline.cn';
//设置发送的邮件的编码 可选GB2312 我喜欢utf-8 据说utf8在某些客户端收信下会乱码
$mail->CharSet = 'UTF-8';
//设置发件人姓名（昵称） 任意内容，显示在收件人邮件的发件人邮箱地址前的发件人姓名
$mail->FromName = 'BY请假条系统';
//smtp登录的账号 这里填入字符串格式的qq号即可
$mail->Username ='leavepaper@baiyuan.wang';
//smtp登录的密码 这里填入“独立密码” 若为设置“独立密码”则填入登录qq的密码 建议设置“独立密码”
$mail->Password = 'xxxxxxxxx';
//设置发件人邮箱地址 这里填入上述提到的“发件人邮箱”
$mail->From = 'leavepaper@baiyuan.wang';
//邮件正文是否为html编码 注意此处是一个方法 不再是属性 true或false
$mail->isHTML(true); 
//设置收件人邮箱地址 该方法有两个参数 第一个参数为收件人邮箱地址 第二参数为给该地址设置的昵称 不同的邮箱系统会自动进行处理变动 这里第二个参数的意义不大
$mail->addAddress('1586320567@qq.com','BY请假条系统');
//添加多个收件人 则多次调用方法即可
//$mail->addAddress('xxx@163.com','晶晶在线用户');
//添加该邮件的主题
$mail->Subject = 'BY请假条系统发送邮件的示例';
//添加邮件正文 上方将isHTML设置成了true，则可以是完整的html字符串 如：使用file\_get\_contents函数读取本地的html文件
$mail->Body = "这是一个<b style=\\"color:red;\\">BY请假条系统</b>发送邮件的一个测试用例";
//为该邮件添加附件 该方法也有两个参数 第一个参数为附件存放的目录（相对目录、或绝对目录均可） 第二参数为在邮件附件中该附件的名称
//$mail->addAttachment('./d.jpg','mm.jpg');
//同样该方法可以多次调用 上传多个附件
//$mail->addAttachment('./Jlib-1.1.0.js','Jlib.js');
 
 
//发送命令 返回布尔值 
//PS：经过测试，要是收件人不存在，若不出现错误依然返回true 也就是说在发送之前 自己需要些方法实现检测该邮箱是否真实有效
$status = $mail->send();
 
//简单的判断与提示信息
if($status) {
 echo '发送邮件成功';
}else{
 echo '发送邮件失败，错误信息未：'.$mail->ErrorInfo;
}
?>