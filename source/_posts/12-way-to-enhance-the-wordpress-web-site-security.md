---
title: 强化WordPress网站安全的 12 个方法
tags:
  - htaccess
  - wordpress
  - 网站优化
  - 网站安全
url: 1175.html
id: 1175
categories:
  - 计算机技术
abbrlink: 12977
date: 2015-05-09 23:01:36
---

这篇文章主要是利用.htaccess去对网站做设定、限制目录读取，强化WordPress网站整体安全，不过你也别忘了要设定强一点的密码。 接下来极客人要介绍的主要是透过.htaccess对网站做一个基础的强化，保护wp-admin目录、限制wp-includes目录读取、防垃圾留言、禁止目录索引、限制wp-config.php访问权限等等，算是很基础的网站安全防护，不论你网站是否遭受攻击，其实这些都是必要性的安全防护。当然，进行了下面的网站安全防护不代表你被不会被黑客入侵，而是多一层保障、降低一些被攻击几率。 [![01300000165488123666522066630](http://baiyuan.wang/wp-content/uploads/2015/05/01300000165488123666522066630.jpg)](http://baiyuan.wang/wp-content/uploads/2015/05/01300000165488123666522066630.jpg)  

一、限制wp-admin目录IP
----------------

如果你管理wordpress网站一般就只有那么几个IP，而且你对自己的网站安全十分看重，比如你运行一个关系重大的团队网站，同时常常受到黑客的光顾，而且团队运行的登陆者常常使用的几个固定IP，为了保证网站的安全，下面这个方法可以限制读取wp-admin目录的IP或者IP网段，不是指定的IP（或者IP网段）就无法访问后台，这个方法当然不仅仅针对wordpress网站。 用NotePad++新增一个.htaccess文件，在htaccess文件中添加下述代码，并将文件上传到“wp-admin”目录下。 其中的蓝色部分请换成你的IP，这段语法的判断流程简言之就是先封锁有所IP，然后开放允许的IP，所以将“allow from 12.34.56.78”的12.34.56.78改成你的IP。如果是一个网段，可以输入“ 12.34.56.”

AuthUserFile /dev/null
AuthGroupFile /dev/null
AuthName "Wordpress Admin Access Control"
AuthType Basic
<LIMIT GET>
order deny,allow
deny from all
allow from 12.34.56.78
</LIMIT>

 

二、限制存取wp-includes目录
-------------------

“wp-includes”这个目录是系统的一些核心目录，还有”/wp-admin/wp-includes”和，”/wp-includes”在我们的网站页面上并没有哪个页面有URL会指向这些地方（通常这个目录里的文件只能被被管理者修改或者代码里调用的）。用以下这段语法可以限制存取的权限，请将下面的代码加入到根目录的.htaccess文件中。 此为官方建议设定。

\# Block the include-only files.
RewriteEngine On
RewriteBase /
RewriteRule ^wp-admin/includes/ - \[F,L\]
RewriteRule !^wp-includes/ - \[S=3\]
RewriteRule ^wp-includes/\[^/\]+\\.php$ - \[F,L\]
RewriteRule ^wp-includes/js/tinymce/langs/.+\\.php - \[F,L\]
RewriteRule ^wp-includes/theme-compat/ - \[F,L\]
\# BEGIN WordPress

  如果没有加入以上语法，会显示错误讯息；如果加了以上语法，会显示WordPress的默认404页面：告诉你目录不存在，这样是一个比较安全的防护措施。

三、限制wp-login.php登入IP
--------------------

如果你网站没有开放注册，那你可以执行这项的方法，限制允许访问wp-login.php只有网站的管理者，设定方法和前面的限制wp-admin存取IP方法类似，请将“12.34.56.78”改成你允许的IP或是网段。

<Files wp-login.php>
Order deny,allow
Deny from All
Allow from 12.34.56.78
</Files>

 

四、限制上传大小
--------

避免黑客透过Dos攻击，利用传输大文件来冲爆你的流量，所以可以透过限制单档大小来阻绝这样的一个状况发生，将以下语法加入到根目录的.htaccess文件中即可，极客人的预设是10MB。

LimitRequestBody 10240000

 

五、保护wp-config.php配置文件
---------------------

用过WordPress都知道”wp-config.php”这个文件攸关整个系统的运行，少了它或者配置错误连不上数据库，因为这个文件内保存了MySQL的账号与密码，为了保护这个文件，WordPress官方有个建议，就是先将此文件权限设定为”400”，也就是只允许拥有人权读取。不过设400可能会让一些插件例如wp super cache要写入设定值时发生错误，所以请大家斟酌裁定。 不过保护wp-config.php重头戏是设定.htaccess目录，修改根目录的.htaccess目录，加入以下语法，这语法意思是：禁止所有人浏览(主机内的程序是可以正常读取的)。 此为官方建议的设置方法：

<files wp-config.php>
order allow,deny
deny from all
</files>

 

六、防垃圾留言攻击
---------

以下这段语法是保护你的留言防止被机器人垃圾留言攻击，主要屏蔽没有referrer的请求，但极客人使用过后发现成效有限，建议再加装Akismet和quiz保护会更好。请将下述代码加入到根目录的.htaccess文件，其中的”baiyuan.wang”请换成你自己的网站网址。

RewriteEngine On
RewriteCond %{REQUEST_METHOD} POST
RewriteCond %{REQUEST_URI} .wp-comments-post\\.php*
RewriteCond %{HTTP_REFERER} !.\*baiyuan.wang.\* \[OR\]
RewriteCond %{HTTP\_USER\_AGENT} ^$
RewriteRule (.*) ^http://%{REMOTE_ADDR}/$ \[R=301,L\]

 

七、禁止目录索引
--------

如果你的虚拟主机没有开启禁止目录索引功能，请您务必加上此语法以保护没有index目录的目录，避免被恶意人士将网站内容全部下载。

Options -Indexes

 

八、变更数据表前缀
---------

数据表前缀词其实在一开始安装的时候就务必做一个修正的动作，避免使用预设wp的名称，修改请务必小心，否则可能造成网站错误，做任何调整前务必先行备份。

九、合理设置目录权限
----------

网站内该设定的权限务必根据需求调整好，例如wp-config.php就不建议设定为777。

 十、账号安全
-------

WordPress系统默认安装是采用admin账号，不过后来的版本允许使用者自行选择网站管理员账号，以避免恶意用户想要尝试admin登入网站。如果你本身已经使用admin，请赶快换账号吧！不然黑客轻易的就可以猜到你账号，接下来猜出密码应该很快了。另外建议使用Limit Login Attempts强化登入安全，当然您也要设一个不易猜出的密码。

十一、关闭后台主题编辑功能
-------------

WordPress后台的主题一旦权限开放就可以在后台直接编辑，如果没有开放则只可浏览。主机若有安装suPHP默认就是可以编辑。如果你觉得这项功能用不到，建议您可以关闭它，毕竟直接暴露在后台可以编辑是一件很危险的事情，除了可能因为黑客入侵乱改，也可能自己改错造成网站出错。请将以下语法加入倒wp-config.php适当位置，就可以关闭修改的权限了。

define('DISALLOW\_FILE\_EDIT', true);

 

十二、限制 .htaccess 访问权限
--------------------

当以上的东西调整完之后，别忘了强化你的.htaccess目录本身权限。将以下语法加入到.htaccess目录内已启用自我保护。语法是禁止所有人直接浏览该目录，但是系统使用读取是允许的。

<Files .htaccess>
order allow,deny
deny from all
</Files>

  最后各位还是要做好个人的账号密码保护，另外也别在不明的网络、计算机乱登入网站，这都可能造成帐密外泄，除此之外，再次提醒，使用以上方法只会加强WordPress安全，但无法保证百毒不侵，仍有机会遭受到黑客入侵，通常状况可能是您帐密外泄、网站插件、主题有漏洞、系统有不明的漏洞，还有目录权限设定不正确等等的状况，各位还是要多多注意。