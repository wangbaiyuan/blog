---
title: wordpress允许使用邮箱和密码登录的方法
tags:
  - wordpress
url: 992.html
id: 992
categories:
  - 技术
abbrlink: 24352
date: 2015-03-19 13:38:43
---

对于博客来说，一般用户量不会太大，有时候注册的用户不一定会记得自己的注册用户名，但往往知道注册邮箱。其实现在主流的登录系统，一般都同时支持用户名和邮箱登录，这降低了用户忘记用户名的概率，无奈wordpress不支持邮箱登录。为了方便大家的注册访问，王柏元的博客支持QQ登录，但是其实QQ登录的用户名是个长长的看起来没有规律的字符串，用户不可能记住。为了解决这个问题，我向大家介绍实现wordpress允许使用邮箱和密码登录的方法。将下述代码加入主题模板函数文件“functions.php”文件即可。

wordpress允许使用邮箱和密码登录的方法
-----------------------

//替换“用户名”为“用户名 / 邮箱”
function username\_or\_email_login() {
    if ( 'wp-login.php' != basename( $\_SERVER\['SCRIPT\_NAME'\] ) )
        return;
 
    ?><script type="text/javascript">
    // Form Label
    if ( document.getElementById('loginform') )
        document.getElementById('loginform').childNodes\[1\].childNodes\[1\].childNodes\[0\].nodeValue = '< ?php echo esc\_js( \_\_( '用户名/邮箱', 'email-login' ) ); ?>';
 
    // Error Messages
    if ( document.getElementById('login_error') )
        document.getElementById('login\_error').innerHTML = document.getElementById('login\_error').innerHTML.replace( '< ?php echo esc\_js( \_\_( '用户名' ) ); ?>', '< ?php echo esc\_js( \_\_( '用户名/邮箱' , 'email-login' ) ); ?>' );
    </script><?php
}
add\_action( 'login\_form', 'username\_or\_email_login' );

使用邮箱登录wordpress的相关插件有WP Email Login，但是个人觉得使用纯代码完全可以替代。使用过多的插件对网站速度有负面影响。

附录
--

了解更多纯代码实现插件功能的方法，你可以参考[wordpress无插件实现六个经典功能](http://baiyuan.wang/790.html "wordpress无插件实现六个经典功能")