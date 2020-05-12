---
title: Wordpress函数钩子(Hook)大全(3)
tags:
  - API
  - wordpress
  - wordpress插件制作
  - 帮助文档
url: 1245.html
id: 1245
categories:
  - 百元百科
abbrlink: 63905
date: 2015-05-30 06:53:38
---

管理界面相关
------

activate_(插件文件名)

首次激活某插件时执行此动作函数。参见常用函数-register\_activation\_hook。

activity\_box\_end

在控制板界面上的活动框末端执行该动作函数。

add\_category\_form_pre

添加分类的文本框尚未显示在管理菜单的界面上时，执行此动作函数。

admin_head

在控制板的HTML版块<head>中执行此动作函数。

admin\_head-(page\_hook)或admin\_head-(plguin\_page)

在插件所生成页面的控制板的HTML版块<head>中执行此动作函数。

admin_init

加载管理界面前执行该动作函数。参见wp-admin/admin.php ，wp-admin/admin-post.php ，以及wp-admin/admin-ajax.php 。

admin_footer

在主标签中的控制板末端执行该动作函数。

admin\_print\_scripts

在HTML的信息头部分执行此动作函数，以使插件将JavaScript脚本添加到所有管理界面。

admin\_print\_styles

在HTML的信息头部分执行此动作函数，以使插件将CSS或样式表单添加到所有管理界面。

admin\_print\_scripts-(page\_hook) 或 admin\_print\_scripts-(plugin\_page)

执行此动作函数，以便将JavaScript脚本输入某个由插件生成的管理页面的HTML信息头部分。使用add\_management\_page(), add\_options\_page()等函数将插件菜 单选项添加到管理菜单中时，返回(page_hook)。示例如下：

function myplugin_menu() {    
  if ( function\_exists('add\_management_page') ) {      
      $page = add\_management\_page( 'myplugin', 'myplugin', 9, \_\_FILE\_\_, 'myplugin\_admin\_page' );      
      add\_action( "admin\_print\_scripts-$page", 'myplugin\_admin_head' );    
   } 

check_passwords

创建新用户账号时，执行该动作函数以验证两次输入的密码是否一致。函数接收的参数：登录名数组，首次输入的密码，第二次输入的密码。

dbx\_page\_advanced

在管理菜单的页面编辑界面上“advanced”版块的最下方执行此动作函数。

dbx\_page\_sidebar

在管理菜单的页面编辑界面工具条的最下方执行此动作函数。

dbx\_post\_advanced

在管理菜单的日志编辑界面上“advanced”版块的最下方执行此动作函数。

dbx\_post\_siderbar

在管理菜单的日志编辑界面工具条的最下方执行此动作函数。WordPress 2.5或更高版本中则执行 \[http://www.wordpress.la/codex-%E5%B8%B8%E7%94%A8%E5%87%BD%E6 %95%B0-add\_meta\_box%28%29.html add\_meta\_box()\]函数。

deactivate_(插件文件名)

禁用插件时执行此动作函数。

delete_user

删除用户时执行此动作函数。函数接收的参数：用户ID。

edit\_category\_form

添加/编辑分类表显示在界面上后（HTML表标签结束前），执行此动作函数。

edit\_category\_form_pre

编辑分类表显示在管理菜单界面前，执行此动作函数。

edit\_tag\_form

添加/编辑标签表显示在界面上后（HTML表标签结束前），执行此动作函数。

edit\_tag\_form_pre

编辑标签表显示在管理菜单界面前，执行此动作函数。

edit\_form\_advanced

在管理菜单中日志编辑框的“advanced”版块前执行此动作函数。

edit\_page\_form

在管理菜单中页面编辑框的“advanced”版块前执行此动作函数。

edit\_user\_profile

在管理菜单中用户资料的最后部分执行此动作函数。

load_(page)

加载管理菜单页面时执行此动作函数。该动作函数不能直接添加——添加管理菜单过程参见定制插件管理菜单。如果希望直接添加该函数，add\_options\_page和类似函数返回的值能够给出动作函数名称。

login_form

在登录框的结尾部分前执行此动作函数。

login_head

在登录界面HTML页眉部分的结尾部分前执行此动作函数。

lost_password

在“通过电子邮件找回密码”显示在登录界面前执行此动作函数。

lostpassward_form

在通过电子邮件找回密码的表格尾部执行此动作函数，使插件能够提供更多字段。

lostpassward_post

用户要求通过电子邮件找回密码时执行此动作函数，使插件能够在找回密码前修改PHP $_POST变量。

manage\_link\_custom_column

反向链接管理界面中出现未知列名称时执行此动作函数。函数接收的参数：列名称，链接ID。参见\[http://www.wordpress.la/codex-%E6%8F%92%E4%BB%B6API%E4%B9%8B %E5%B8%B8%E7%94%A8%E8%BF%87%E6%BB%A4%E5%99%A8%E5%87%BD%E6%95%B0.html 插件API/常用过滤器函数\]中的过滤器函数manage\_links\_columns，该函数可添加自定义列。

manage\_posts\_custom_column

日志管理界面中出现未知列名称时执行此动作函数。函数接收的参数：列名称，日志ID。参见\[http://www.wordpress.la/codex-%E6%8F%92%E4%BB%B6API%E4%B9%8B%E5 %B8%B8%E7%94%A8%E8%BF%87%E6%BB%A4%E5%99%A8%E5%87%BD%E6%95%B0.html 插件API/常用过滤器函数\]中的过滤器函数manage\_posts\_columns，该函数可添加自定义列。（具体用法和示例参见 Scompt's tutorial ）。

manage\_pages\_custom_column

页面管理界面中出现未知列名称时执行此动作函数。函数接收的参数：列名称，页面ID。参见插件API/常用过滤器函数中的过滤器函数manage\_pages\_columns，该函数可添加自定义列。

password_reset

用户将旧密码更改为新密码前执行此动作函数。

personal\_options\_update

用户在控制板中更新设置时执行此动作函数。

plugins_loaded

所有插件加载完毕后执行此动作函数。

profile\_personal\_options

在用户资料编辑iemian的“关于您自己”版块结尾处执行此动作函数。

profile_update

更新用户资料时执行此动作函数。函数结合搜的参数：用户ID。

register_form

在新用户注册表结尾部分前执行此动作函数。

register_post

处理新用户注册请求前执行此动作函数。

restrict\_manage\_posts

需要编辑的日志列表显示在管理菜单界面前，执行此动作函数。

retrieve_password

检索用户密码以发送密码提醒邮件时执行此动作函数。函数接收的参数：登录名。

set\_current\_user

默认函数wp\_set\_current\_user更改用户后，执行此动作函数。注意：wp\_set\_current\_user是一个“插入式”函数，即插件可以改写该函数；参见插件API。

show\_user\_profile

在用户资料编辑界面结尾部分执行此动作函数。

simple\_edit\_form

在控制板的“简单”日志编辑框的结尾部分执行此动作函数（默认情况下，简单编辑框仅用于书签工具——没有“高级”选项）。

update\_option\_(option_name)

update\_option函数更新WordPress选项后，执行该动作函数。函数接收的参数：原选项值，新选项值。用户需要为希望更新的选项添加一个动作函数，例如更新“foo”时用函数update\_option_foo来呼应。

upload\_files\_(tab)

执行该动作函数以显示上传文件管理界面上的某个页面；“tab”是自定义动作函数表的名称。可以用过滤器函数wp\_upload\_tabs来定义自定义表（参见 插件API/常用过滤器函数）。

user_register

首次创建用户资料时执行此动作函数。函数接收的参数：用户ID。

wp\_ajax\_(action)

在管理菜单中执行此动作函数以运行未知类型的AJAX。

wp_authenticate

用户登录时，执行该动作函数以验证用户身份。函数接收的参数：用户名和密码数组。

wp_login

用户登录时执行此动作函数。

wp_logout

用户退出登录时执行此动作函数。

高级动作函数
------

本部分介绍的都是与WordPress查询（决定该显示哪一篇日志）、WordPress主循环、激活插件以及WordPress基础代码相关的动作函数。  
admin_menu  
控制板中的菜单结构显示无误后，执行此动作函数。  
admin_notices  
管理菜单显示在页面上时执行此动作函数。  
blog\_privacy\_selector  
博客默认隐私选项显示在页面上时，执行此动作函数。  
check\_admin\_referer  
系统出于安全考虑检查随机数后在默认函数check\_admin\_referrer中执行check\_admin\_referer动作钩子，使插件因安全原因而强制WordPress停止运行。注意：check\_admin\_referrer也是一个“插入式”函数，即插件可以改写该函数；参见插件API。  
check\_ajax\_referer  
系统从cookies中成功验证用户的登录名和密码后，在默认函数 check\_ajax\_referer（这是在有AJAX请求进入wp-admin/admin-ajax.php脚本时所调用的函数）中执行此动作函数，使插件能够因安全原因强制WordPress停止运行。注意： check\_ajax\_referer函数也是一个“插入式”函数，即插件可以改写该函数；参见插件API。  
generate\_rewrite\_rules  
重写规则生成后，执行此动作函数。函数接收的参数：WP\_Rewrite类变量列表。注意：在修改重写规则时，使用rewrite\_rules_array过滤器函数比使用该动作函数更加方便。  
init  
WordPress加载完毕但尚未发送页眉信息时执行该动作函数。函数适用于解析$\_GET or $\_POST 触发器。  
loop_end  
WordPress主循环最后一篇日志执行完毕后，执行此动作函数。  
loop_start  
执行WordPress主循环第一篇日志前，执行此动作函数。  
parse_query  
在主查询或WP\_Query 的任何实例（如query\_posts，get\_posts或get\_children）中查询解析结束时，执行此动作函数。函数接收的参数：$wp_query 对象内容列表。  
parse_request  
在主WordPress函数wp中解析查询请求后，执行该动作函数。函数接收的参数：引用全局变量$wp对象的数组。  
pre\_get\_posts  
在get\_posts函数开始操作查询前执行此动作函数。函数接收的参数：$wp\_query对象的内容列表。  
sanitize\_comment\_cookies  
HTTP请求读取cookies后执行此动作函数。  
send_headers  
在WordPress主函数wp中发送基本HTTP页眉后执行此动作函数。函数接收的参数：引用全局变量$wp对象的数组。  
shutdown  
页面内容输出完毕后执行此动作函数。  
wp  
在WordPress主函数wp中解析查询、页面加载完毕后，执行模板前，执行此动作函数。函数接收的参数：引用全局变量$wp对象的数组。