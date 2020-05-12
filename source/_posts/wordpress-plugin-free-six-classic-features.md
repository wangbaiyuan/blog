---
title: wordpress无插件实现六个经典功能
tags:
  - PHP
  - wordpress
url: 790.html
id: 790
categories:
  - 技术应用
  - 软件开发
abbrlink: 40201
date: 2015-01-29 09:14:29
---

wordpress建站系统为我们提供了丰富的插件功能，但是使用太多的插件往往会拖慢网站的速度，其实一些小插件的功能我们完全可以自己用代码实现，下面是我为大家整理的一些wordpress经典功能的无插件纯代码实现方法，代码来自互联网。如果没有特殊说明，下面的代码请放在主题文件夹（…/wp-content/themes/你的主题/）的模板函数functions.php文件里，修改方法：将下面代码复制粘贴到functions.php的<?php……..?>局域内。

wordpress无插件实现六个经典功能
====================

修改wordpress代码实现smtp邮件功能
-----------------------

相关插件：easy wp smtp 下载地址（(经本人汉化)）\[button class="download" size="lg" href="http://pan.baidu.com/s/1mgqV5Rq" title="easy wp smtp"\]密码：0bmd \[/button\]

//使用smtp发邮件
add\_action('phpmailer\_init', 'mail_smtp');
function mail_smtp( $phpmailer ) {
$phpmailer->IsSMTP();
$phpmailer->SMTPAuth = true;//启用SMTPAuth服务
$phpmailer->Port = 465;//MTP邮件发送端口，这个和下面的对应，如果这里填写25，则下面为空白
$phpmailer->SMTPSecure ="ssl";//是否验证 ssl，这个和上面的对应，如果不填写，则上面的端口须为25
$phpmailer->Host ="smtp.gmail.com";//邮箱的SMTP服务器地址，如果是QQ的则为：smtp.exmail.qq.com
$phpmailer->Username = "admin@gmail.com";//你的邮箱地址
$phpmailer->Password ="******";//你的邮箱登陆密码
}

 

WordPress无插件代码实现评论回复邮件通知
------------------------

 

//comment\_mail\_notify(所有的回复都会发邮件通知)

function comment\_mail\_notify($comment_id) {
$comment = get\_comment($comment\_id);
$parent\_id = $comment->comment\_parent ? $comment->comment_parent : '';
$spam\_confirmed = $comment->comment\_approved;
if (($parent\_id != '') && ($spam\_confirmed != 'spam')) {
$wp\_email = 'no-reply@' . preg\_replace('#^www.#', '', strtolower($\_SERVER\['SERVER\_NAME'\]));//发件人e-mail地址
$to = trim(get\_comment($parent\_id)->comment\_author\_email);
$subject = '您在\['.get_option("blogname").'\]的留言有了回复';
$message = '
<div style="background-color:#eef2fa; border:1px solid #d8e3e8; color:#111; padding:0 15px; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px;">
<p>'.trim(get\_comment($parent\_id)->comment_author).', 您好!</p>
<p>这是您在《'.get\_the\_title($comment->comment\_post\_ID).'》中的留言:<br />'
.trim(get\_comment($parent\_id)->comment_content).'</p>
<p>以下是'.trim($comment->comment_author).' 给您的回复:<br />'
.trim($comment->comment_content).'<br /></p>
<p>您可以<a href="' . htmlspecialchars(get\_comment\_link($parent_id)) . '">点击这里查看回复的完整内容.</a></p>
<p>欢迎再度光临 <a href="' . get\_option('home') . '">' . get\_option('blogname') . '</a></p>
<p>(注:此邮件由系统自动发出,请勿回复!)</p>
</div>';
$from = "From: "" . get\_option('blogname') . "" <$wp\_email>";
$headers = "$fromnContent-Type: text/html; charset=" . get\_option('blog\_charset') . "n";
wp_mail( $to, $subject, $message, $headers );
//echo 'mail to ', $to, '<br/> ' , $subject, $message; // for testing
}
}
add\_action('comment\_post', 'comment\_mail\_notify');

 

文章图片自动添加alt和title信息
-------------------

/\* 文章图片自动添加alt和title信息 */
function tin\_image\_alt($content){
global $post;
$pattern = "/<img(.*?)src=('|\\")(.*?).(bmp|gif|jpeg|jpg|png)('|\\")(.*?)>/i";
$replacement = '<img$1src=$2$3.$4$5 alt="'.$post->post\_title.'" title="'.$post->post\_title.'"$6>';
$content = preg_replace($pattern,$replacement,$content);
return $content;
}
add\_filter('the\_content','tin\_image\_alt',15);

  WordPress文字标签关键词自动内链
----------------------

 

/\* WordPress文字标签关键词自动内链*/
$match\_num\_from = 1; //一篇文章中同一個標籤少於幾次不自動鏈接
$match\_num\_to = 4; //一篇文章中同一個標籤最多自動鏈接幾次
function tag_sort($a, $b){
if ( $a->name == $b->name ) return 0;
return ( strlen($a->name) > strlen($b->name) ) ? -1 : 1;
}
function tin\_tag\_link($content){
global $match\_num\_from,$match\_num\_to;
$posttags = get\_the\_tags();
if ($posttags) {
usort($posttags, "tag_sort");
$ex_word = '';
$case = '';
foreach($posttags as $tag) {
$link = get\_tag\_link($tag->term_id);
$keyword = $tag->name;
$cleankeyword = stripslashes($keyword);
$url = "<a href=\\"$link\\" class=\\"tooltip-trigger tin\\" title=\\"".str\_replace('%s',addcslashes($cleankeyword, '$'),\_\_('查看更多关于 %s 的文章'))."\\"";
$url .= ' target="_blank"';
$url .= ">".addcslashes($cleankeyword, '$')."</a>";
$limit = rand($match\_num\_from,$match\_num\_to);
$content = preg\_replace( '|(<a\[^>\]+>)(.*)<pre.*?>('.$ex\_word.')(.*)<\\/pre>(</a\[^>\]*>)|U'.$case, '$1$2$4$5', $content);
$content = preg\_replace( '|(<img)(.*?)('.$ex\_word.')(.*?)(>)|U'.$case, '$1$2$4$5', $content);
$cleankeyword = preg_quote($cleankeyword,'\\'');
$regEx = '\\'(?!((<.*?)|(<a.*?)))('. $cleankeyword . ')(?!((\[^<>\]*?)>)|(\[^>\]*?</a>))\\'s' . $case;
$content = preg_replace($regEx,$url,$content,$limit);
$content = str\_replace( '', stripslashes($ex\_word), $content);
}
}
return $content;
}
add\_filter('the\_content','tin\_tag\_link',12);

 Avatar改用多说gravatar服务器或SSL链接
----------------------------

 

/\* Avatar改用多说gravatar服务器或SSL链接 */
function mytheme\_get\_avatar($avatar) {
if(ot\_get\_option('gravatar_source') == 'duoshuo'){
$avatar = str_replace(array("www.gravatar.com","0.gravatar.com","1.gravatar.com","2.gravatar.com"),"gravatar.duoshuo.com",$avatar);
}elseif(ot\_get\_option('gravatar_source') == 'ssl'){
$avatar = preg_replace('/.*\\/avatar\\/(.*)\\?s=(\[\\d\]+)(&?.*)/','<img src="https://secure.gravatar.com/avatar/$1?s=$2" class="avatar avatar-$2" height="$2" width="$2">',$avatar); 
}
return $avatar;
}
add\_filter( 'get\_avatar', 'mytheme\_get\_avatar');

 替换文章或评论内容外链为内链
---------------

 

/\* 替换文章或评论内容外链为内链*/
function convert\_to\_internal_links($content){
preg\_match\_all('/\\shref=(\\'|\\")(\[^\\'\\"#\]*?)(\\'|\\")(\[\\s\]?)/',$content,$matches);
if($matches){
foreach($matches\[2\] as $val){
if(strpos($val,home_url())===false){
$rep = $matches\[1\]\[0\].$val.$matches\[3\]\[0\];
$new = '"'.home\_url().'/redirect?url='.base64\_encode($val).'"';
$content = str_replace("$rep","$new",$content);
}
}
}
return $content;
}
add\_filter('the\_content','convert\_to\_internal_links',99);
add\_filter('comment\_text','convert\_to\_internal_links',99);
add\_filter('get\_comment\_author\_link','convert\_to\_internal_links',99);