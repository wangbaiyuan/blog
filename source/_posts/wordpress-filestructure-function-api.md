---
title: wordpress文件结构和函数帮助文档大全
tags:
  - PHP
  - wordpress
  - 帮助文档
url: 613.html
id: 613
categories:
  - 百元百科
abbrlink: 23246
date: 2015-01-13 08:08:00
---

WordPress模板基本文件
---------------

模板基本文件（在你的网站根目录/wp-content/themes/下）

> style.css 样式表文件 index.php 主页文件 single.php 日志单页文件 page.php 页面文件 archvie.php 分类和日期存档页文件 searchform.php 搜索表单文件 search.php 搜索页面文件 comments.php 留言区域文件(包括留言列表和留言框) 404.php 404错误页面 header.php 网页头部文件 sidebar.php 网页侧边栏文件 footer.php 网页底部文件

WordPress Header头部 PHP代码（注: 也就是位于<head>和</head>之间的PHP代码）
--------------------------------------------------------

> <?php bloginfo(’name’); ?> 网站标题 <?php wp\_title(); ?> 日志或页面标题 <?php bloginfo(’stylesheet\_url’); ?> WordPress主题样式表文件style.css的相对地址 <?php bloginfo(’pingback\_url’); ?> WordPress博客的Pingback地址 <?php bloginfo(’template\_url’); ?> WordPress主题文件的相对地址 <?php bloginfo(’version’); ?> 博客的WordPress版本 <?php bloginfo(’atom\_url’); ?> WordPress博客的Atom地址 <?php bloginfo(’rss2\_url’); ?> WordPress博客的RSS2地址 <?php bloginfo(’url’); ?> WordPress博客的绝对地址 <?php bloginfo(’name’); ?> WordPress博客的名称 <?php bloginfo(’html_type’); ?> 网站的HTML版本 <?php bloginfo(’charset’); ?> 网站的字符编码格式

WordPress 主体模板 PHP代码
--------------------

> <?php the\_content(); ?> 日志内容 <?php if(have\_posts()) : ?> 确认是否有日志 <?php while(have\_posts()) : the\_post(); ?> 如果有，则显示全部日志 <?php endwhile; ?> 结束PHP函数”while” <?php endif; ?> 结束PHP函数”if” <?php get\_header(); ?> header.php文件的内容 <?php get\_sidebar(); ?> sidebar.php文件的内容 <?php get\_footer(); ?> footer.php文件的内容 <?php the\_time(’m-d-y’) ?> 显示格式为”02-19-08″的日期 <?php comments\_popup\_link(); ?> 显示一篇日志的留言链接 <?php the\_title(); ?> 显示一篇日志或页面的标题 <?php the\_permalink() ?> 显示一篇日志或页面的永久链接/URL地址 <?php the\_category(’, ‘) ?> 显示一篇日志或页面的所属分类 <?php the\_author(); ?> 显示一篇日志或页面的作者 <?php the\_ID(); ?> 显示一篇日志或页面的ID <?php edit\_post\_link(); ?> 显示一篇日志或页面的编辑链接 <?php get\_links\_list(); ?> 显示Blogroll中的链接 <?php comments\_template(); ?> comments.php文件的内容 <?php wp\_list\_pages(); ?> 显示一份博客的页面列表 <?php wp\_list\_cats(); ?> 显示一份博客的分类列表 <?php next\_post\_link(’ %link ‘) ?> 下一篇日志的URL地址 <?php previous\_post\_link(’%link’) ?> 上一篇日志的URL地址 <?php get\_calendar(); ?> 调用日历 <?php wp\_get\_archives() ?> 显示一份博客的日期存档列表 <?php posts\_nav_link(); ?> 显示较新日志链接(上一页)和较旧日志链接（下一页） <?php bloginfo(’description’); ?> 显示博客的描述信息

其它的一些WordPress模板代码
------------------

> /%postname%/ 显示博客的自定义永久链接 <?php the\_search\_query(); ?> 搜索表单的值 <?php \_e(’Message’); ?> 打印输出信息 <?php wp\_register(); ?> 显示注册链接 <?php wp\_loginout(); ?> 显示登入/登出链接 <!–next page–> 在日志或页面中插入分页 <!–more–> 截断日志 <?php wp\_meta(); ?> 显示管理员的相关控制信息 <?php timer\_stop(1); ?> 显示载入页面的时间 <?php echo get\_num_queries(); ?> 显示载入页面查询

wordpress调用最新、最热、随机文章
---------------------

### 1\. wordpress调用最新文章

> WordPress最新文章的调用可以使用一行很简单的模板标签wp\_get\_archvies来实现. 代码如下： <?php get\_archives(‘postbypost’, 10); ?> (显示10篇最新更新文章) 或者 <?php wp\_get\_archives(‘type=postbypost&limit=20&format=custom’); ?> 后面这个代码显示你博客中最新的20篇文章，其中format=custom这里主要用来自定义这份文章列表的显示样式。具体的参数和使用方法你可 以参考官方的使用说明- wp\_get\_archvies。(fromat=custom也可以不要，默认以UL列表显示文章标题。) 补充: 通过WP的query\_posts()函数也能调用最新文章列表， 虽然代码会比较多一点，但可以更好的控制Loop的显示，比如你可以设置是否显示摘要。具体的使用方法也可以查看官方的说明。

### 2\. wordpress调用随机文章

<?php
$rand\_posts = get\_posts(‘numberposts=10&orderby=rand’);
foreach( $rand_posts as $post ) :
?>
<!–下面是你想自定义的Loop–>
<li><a href=”<?php the\_permalink(); ?>”><?php the\_title(); ?></a></li>
<?php endforeach; ?>

 

### 3\. wordpress调用最新留言

下面是我之前在一个WordPress主题中代到的最新留言代码，具体也记不得是哪个主题了。该代码直接调用数据库显示一份最新留言。其中 LIMIT 10限制留言显示数量。绿色部份则是每条留言的输出样式。

<?php
global $wpdb;
$sql = “SELECT DISTINCT ID, post\_title, post\_password, comment_ID,
comment\_post\_ID, comment\_author, comment\_date\_gmt, comment\_approved,
comment\_type,comment\_author_url,
SUBSTRING(comment\_content,1,30) AS com\_excerpt
FROM $wpdb->comments
LEFT OUTER JOIN $wpdb->posts ON ($wpdb->comments.comment\_post\_ID =
$wpdb->posts.ID)
WHERE comment\_approved = ’1′ AND comment\_type = ” AND
post_password = ”
ORDER BY comment\_date\_gmt DESC
LIMIT 10″;
$comments = $wpdb->get_results($sql);
$output = $pre_HTML;   foreach ($comments as $comment) {
$output .= “n<li>”.strip\_tags($comment->comment\_author)
.”:” . ” <a href=”" . get_permalink($comment->ID) .
“#comment-” . $comment->comment_ID . “” title=”on ” .
$comment->post\_title . “”>” . strip\_tags($comment->com_excerpt)
.”</a></li>”;
}   $output .= $post_HTML;
echo $output;?>

 

### 4.wordpress调用相关文章

//在文章页显示相关文章
<?php
$tags = wp\_get\_post_tags($post->ID);
if ($tags) {
$first\_tag = $tags\[0\]->term\_id;
$args=array(
‘tag\_\_in’ => array($first\_tag),
‘post\_\_not\_in’ => array($post->ID),
‘showposts’=>10,
‘caller\_get\_posts’=>1
);
$my\_query = new WP\_Query($args);
if( $my\_query->have\_posts() ) {
while ($my\_query->have\_posts()) : $my\_query->the\_post(); ?>
<li><a href=”<?php the\_permalink() ?>” rel=”bookmark” title=”<?php the\_title\_attribute(); ?>”><?php the\_title();?> <?php comments_number(‘ ‘,’(1)’,'(%)’); ?></a></li>
<?php
endwhile;
}
}
wp\_reset\_query();
?>

 

### 5.wordpress调用指定分类的文章

<?php $posts = get_posts( “category=4&numberposts=10″ ); ?>
<?php if( $posts ) : ?>
<ul><?php foreach( $posts as $post ) : setup_postdata( $post ); ?>
<li>
<a href=”<?php the\_permalink() ?>” rel=”bookmark” title=”<?php the\_title(); ?>”><?php the_title(); ?></a>
</li>
<?php endforeach; ?>
</ul>
<?php endif; ?>

 

### 6.wordpress去评论者链接的评论输出

<?php
global $wpdb;
$sql = “SELECT DISTINCT ID, post\_title, post\_password, comment_ID,
comment\_post\_ID, comment\_author, comment\_date\_gmt, comment\_approved,
comment\_type,comment\_author_url,
SUBSTRING(comment\_content,1,14) AS com\_excerpt
FROM $wpdb->comments
LEFT OUTER JOIN $wpdb->posts ON ($wpdb->comments.comment\_post\_ID =
$wpdb->posts.ID)
WHERE comment\_approved = ’1′ AND comment\_type = ” AND
post_password = ”
ORDER BY comment\_date\_gmt DESC
LIMIT 10″;
$comments = $wpdb->get_results($sql);
$output = $pre_HTML;
foreach ($comments as $comment) {
$output .= “n<li>”.strip\_tags($comment->comment\_author)
.”:” . ” <a href=”" . get_permalink($comment->ID) .
“#comment-” . $comment->comment_ID . “” title=”on ” .
$comment->post\_title . “”>” . strip\_tags($comment->com_excerpt)
.”</a></li>”;
}
$output .= $post_HTML;
echo $output;?>

 

### 7.wordpress调用含gravatar头像的评论输出

<?php
global $wpdb;
$sql = “SELECT DISTINCT ID, post\_title, post\_password, comment\_ID, comment\_post\_ID, comment\_author, comment\_date\_gmt, comment\_approved,comment\_author\_email, comment\_type,comment\_author\_url, SUBSTRING(comment\_content,1,10) AS com\_excerpt FROM $wpdb->comments LEFT OUTER JOIN $wpdb->posts ON ($wpdb->comments.comment\_post\_ID = $wpdb->posts.ID) WHERE comment\_approved = ’1′ AND comment\_type = ” AND comment\_author != ‘郑 永’ AND post\_password = ” ORDER BY comment\_date\_gmt DESC LIMIT 10″;
$comments = $wpdb->get_results($sql);
$output = $pre_HTML;
foreach ($comments as $comment) {
$output .= “n<li>”.get\_avatar(get\_comment\_author\_email(‘comment\_author\_email’), 18). ” <a href=”" . get\_permalink($comment->ID) . “#comment-” . $comment->comment\_ID . “” title=”" . $comment->post\_title . ” 上的评论”>”. strip\_tags($comment->comment\_author) .”： “. strip\_tags($comment->com_excerpt) .”</a></li>”;
}
$output .= $post_HTML;
$output = convert_smilies($output);
echo $output;
?>

  上面代码把comment_author的值改成你的ID，18是头像大小，10是评论数量。

### 8.wordpress调用网站统计大全

> 1、日志总数： <?php $count\_posts = wp\_count\_posts(); echo $published\_posts = $count\_posts->publish;?> 2、草稿数目： <?php $count\_posts = wp\_count\_posts(); echo $draft\_posts = $count\_posts->draft; ?> 3、评论总数： <?php echo $wpdb->get\_var(“SELECT COUNT(*) FROM $wpdb->comments”);?> 4、成立时间： <?php echo floor((time()-strtotime(“2008-8-18″))/86400); ?> 5、标签总数： <?php echo $count\_tags = wp\_count\_terms(‘post\_tag’); ?> 6、页面总数： <?php $count\_pages = wp\_count\_posts(‘page’); echo $page\_posts = $count\_pages->publish; ?> 7、分类总数： <?php echo $count\_categories = wp\_count\_terms(‘category’); ?> 8、链接总数： <?php $link = $wpdb->get\_var(“SELECT COUNT(*) FROM $wpdb->links WHERE link\_visible = ‘Y’”); echo $link; ?> 9、用户总数： <?php $users = $wpdb->get\_var(“SELECT COUNT(ID) FROM $wpdb->users”); echo $users; ?> 10、最后更新： <?php $last = $wpdb->get\_results(“SELECT MAX(post\_modified) AS MAX\_m FROM $wpdb->posts WHERE (post\_type = ‘post’ OR post\_type = ‘page’) AND (post\_status = ‘publish’ OR post\_status = ‘private’)”);$last = date(‘Y-n-j’, strtotime($last\[0\]->MAX\_m));echo $last; ?>

### 9.wordpress判断语句

> is\_single() 判断是否是具体文章的页面is\_single(’2′) 判断是否是具体文章（id=2）的页面is\_single(’Beef Stew’) 判断是否是具体文章（标题判断）的页面is\_single(’beef-stew’) 判断是否是具体文章（slug判断）的页面comments\_open() 是否留言开启pings\_open() 是否开启pingis\_page() 是否是页面is\_page(’42′) id判断，即是否是id为42的页面is\_page(’About Me’) 判断标题is\_page(’about-me’) slug判断is\_category() 是否是分类is\_category(’6′) id判断，即是否是id为6的分类is\_category(’Cheeses’) 分类title判断is\_category(’cheeses’) 分类 slug判断in\_category(’5′) 判断当前的文章是否属于分类5is\_author() 将所有的作者的页面显示出来is\_author(’1337′) 显示author number为1337的页面is\_author(’Elite Hacker’) 通过昵称来显示当前作者的页面is\_author(’elite-hacker’) 下面是通过不同的判断实现以年、月、日、时间等方式来显示归档 is\_date() is\_year() is\_month() is\_day() is\_time() 判断当前是否是归档页面is\_archive() 判断是否是搜索is\_search() 判断页面是否404：is\_404() 判断是否翻页，比如你当前的blog是http://domain.com 显示http://domain.com?paged=2的时候，这个判断将返 回真，通过这个函数可以配合is\_home来控制某些只能在首页显示的界面，

例如：

<?php if(is_single()):?>
//这里写你想显示的内容，包括函数
<?php endif;?>
或者：
<?php if(is\_home() && !is\_paged() ):?>
//这里写你想显示的内容，包括函数
<?php endif;?>

 

### 10.wordpress 非插件调用评论表情

<!–smilies–>
<?php
function wp_smilies() {
global $wpsmiliestrans;
if ( !get\_option(‘use\_smilies’) or (empty($wpsmiliestrans))) return;
$smilies = array_unique($wpsmiliestrans);
$link=”;
foreach ($smilies as $key => $smile) {
$file = get_bloginfo(‘wpurl’).’/wp-includes/images/smilies/’.$smile;
$value = ” “.$key.” “;
$img = “<img src=”{$file}” alt=”{$smile}” />”;
$imglink = htmlspecialchars($img);
$link .= “<a href=”#commentform” title=”{$smile}” onclick=”document.getElementById(‘comment’).value += ‘{$value}’”>{$img}</a>&nbsp;”;
}
echo ‘<div>’.$link.’</div>’;
}
?>
<?php wp_smilies();?>
<!–smilies—>

  将以上代码复制到 comments.php 中合适的位置：