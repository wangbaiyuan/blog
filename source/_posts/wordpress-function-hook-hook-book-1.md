---
title: wordpress函数钩子（hook）大全(1)
tags:
  - API
  - wordpress
  - wordpress插件制作
  - 帮助文档
url: 1243.html
id: 1243
categories:
  - 百元百科
abbrlink: 22253
date: 2015-05-28 07:44:40
---

一、在典型请求中运行的动作钩子
---------------

当已登录用户在默认主题打开网站主页时，WordPress会运行以下动作钩子函数：

*   plugins_loaded
*   sanitize\_comment\_cookies
*   setup_theme
*   auth\_cookie\_malformed
*   auth\_cookie\_valid
*   set\_current\_user
*   init
*   widgets_init
*   parse_request
*   send_headers
*   pre\_get\_posts
*   posts_selection
*   wp
*   template_redirect
*   get_header
*   wp_head
*   wp\_print\_styles
*   wp\_print\_scripts
*   loop_start
*   loop_end
*   get_sidebar
*   wp_meta
*   get_footer
*   wp_footer

二、日志、页面、附件以及类别相关的动作钩子函数
-----------------------

### add_attachment

附件文件首次加入数据库时，执行add_attachment函数。函数接收的参数：附件ID。

### add_category

与create_category相同。

### clean\_post\_cache

清除日志缓存时，执行该动作函数。函数接收的参数：日志ID。参见clean\_post\_cache()。

### create_category

生成新类别时，执行该动作函数。函数接收的参数：类别ID。

### delete_attachment

从数据库和相应链接/日志中删除某个类别后，执行该动作函数。函数接收的参数：类别ID。

### delete_post

将要删除某篇日志或页面时，执行该动作函数。函数接收的参数：日志ID或页面ID。

### deleted_post

删除某篇日志或页面后，执行该动作函数。函数接收的参数：日志ID或页面ID。

### edit_attachment

数据库中附件文件被更新时执行该动作函数。函数接收的参数：附件ID。

### edit_category

更新/编辑某个类别时（包括添加/删除日志或博客反向链接，或更新日志/博客反向链接的类别），执行该动作函数。函数接收的参数：类别ID。

### edit_post

更新/编辑某篇日志或页面时（包括添加/更新评论，这会导致日志评论总数的更新），执行该动作函数。函数接收的参数：日志ID或页面ID。

### pre\_post\_update

更新日志或页面前执行该动作函数。函数接收的参数：日志ID。

### private\_to\_publish

当日志状态从private（私密）更改为published（公开）时，执行该动作函数。函数接收的参数：日志对象。（用以翻译日志状态的动作函数目前可用；参见wp\_transition\_post_status()）。

### publish_page

发表页面或编辑某个状态为“published”的页面时，执行该动作函数。函数接收的参数：页面ID。（警告：该动作函数不能在WordPress 2.3以及更高版本中运行；但动作函数'transition\_post\_status'能够运行。更新信息：publish_page动作函数可在WordPress 2.6及之后版本中运行。）

### publish_phone

通过电子邮件添加新日志后，执行该动作函数。函数接收的参数：日志ID。

### publish_post

发表日志或编辑某个状态为“published”的日志时，执行该动作函数。函数接收的参数：日志ID。

### save_post

新建或更新一篇日志/页面时，执行该动作函数。更新可以来自导入、日志/页面编辑框、xmlrpc或邮件日志。函数接收的参数：日志ID。

更新信息存入数据库后执行该动作函数。

注意：日志ID可能会参照日志的修改版而不是最新发布版。wp\_is\_post_revision可获取日志最新版的ID。

### wp\_insert\_post

与save_post相同，更新信息存入数据库后执行该动作函数。

### xmlrpc\_public\_post

通过XMLRPC请求发表日志，或通过XMLRPC编辑某个状态为“published”的日志时，执行该动作函数。函数接收的参数：日志ID。

三、评论、Ping以及引用通告相关动作钩子函数
-----------------------

### comment_closed

尝试显示评论输入框而日志却设置为不允许评论时，执行该动作函数。函数接收的参数：日志ID。

### comment\_id\_not_found

试图显示评论或评论输入框却未找到日志ID时，执行该动作函数。函数接收的参数：日志ID。

### comment\_flood\_trigger

调用wp_die以阻止接收评论前，若检测到评论数量异常增多，执行该动作函数。函数接收的参数：上一次评论发表时间，当前评论发表时间。

### comment\_on\_draft

日志为草稿状态却试图显示评论或评论输入框时，执行该动作函数。函数接收的参数：日志ID。

### comment_post

评论刚被存入数据库时，执行此动作函数。函数接收的参数：评论ID，评论审核状态（"spam"，0（表示未审核），1（表示已审核））。

### edit_comment

数据库中的评论被更新或编辑后，执行此动作函数。函数接收的参数：评论ID。

### delete_comment

评论即将被删除前，执行此动作函数。函数接收的参数：评论ID。

### pingback_post

日志新添加pingback后，执行此动作函数。函数接收的参数：评论ID。

### pre_ping

执行pingback前，执行此动作函数。函数接收的参数：将要处理的日志链接数组，以及日志的“pung”设置。

### trackback_post

日志新添加trackback后，执行此动作函数。函数接收的参数：评论ID。

### wp\_blacklist\_check

执行该动作函数以判断评论是否应被禁止。函数接收的参数：评论者的名称、电子邮件、URL、评论内容、IP地址、用户代理（浏览器）。该函数可执行wp_die以拒绝评论，也可以修改某个参数以使评论中可包含用户在WordPress选项中设置的黑名单关键词。

### wp\_set\_comment_status

评论状态发生改变时，执行此动作函数。函数接收的参数：评论ID，表明新状态的状态字符串（"delete", "approve", "spam", "hold"）。