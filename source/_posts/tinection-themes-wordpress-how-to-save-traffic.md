---
title: wordpress使用tinection主题怎样节省流量
tags:
  - wordpress
  - 网站优化
url: 795.html
id: 795
categories:
  - 技术
abbrlink: 53490
date: 2015-01-31 15:51:17
---

做博客站以来，笔者换了不少主题，最后决定使用的是知言创作的tinection主题，这是一款个人认为非常优秀的wordpress主题，但是其缺点也很明显：速度太慢，因为tinection主题代码里加载了太多css，js文件，导致向服务器请求次数极多，好在知言更新主题的速度较快，希望能在以后的更新中精简一下代码和减少文件请求次数。 除了上述缺点，tinection还有一个问题：它耗费流量太大。之前笔者使用的欲思主题在仅本人调试访问的情况下一个月才花费1个G流量，而现在的tinection主题一天就要花费近300M流量，而且扪心自问网站的访问频次并没有之前使用欲思主题的次数多。而对于个人用户来说，大家一般使用的是虚拟主机，空间商提供的月流量常常有限，而且即使使用CDN加速，按照tinection主题的这样的“耗油量”也不够花，为此，笔者琢磨了一下主题的代码，向大家介绍一个实用的wordpress使用tinection主题怎样节省流量的方法。

减少随机缩略图的张数
----------

tinection的文章列表和相关列表都为无图文章随机分配缩略图，但是很“鸡肋”的是随机分配的所有图片竟然有40张之多，其实由于随机分配图片，减少图片张数并不能节省流量，但是在大多数使用了“静态文件缓存”的博客站来说，太多的随机图片将使访问者很难碰到之前缓存的同一文件。所以减少缩略图以提高缓存文件命中概率，是省流量的可行方法。

### 具体方法：

在主题文件夹themes\\tinection\\下找到functions.php，搜索“$random = mt_rand”，这是个产生随机数的函数，你可以根据需要设置为你想要的图片张数。 例如笔者只想使用15张：

$random = mt_rand(1, 15);

这样主题只会调用tinection主题随机图片文件夹“tinection\\images\\random\\”下的“1~15.jpg”图片

推荐：降低缩略图质量减少流量
--------------

笔者通过“审查元素”发现，tinection主题缩略图大小偏大，而且极其可笑的是，竟然有的缩略图片比原图片还大不少。其中有一个原图片54K，缩略之后竟然达到102K！对于大量使用的tinection主题将耗费太多不必要的流量。笔者经过修改代码后把这个图片大小降到了14K，而且图片质量影响不大。

### 具体方法：

在主题文件夹themes\\tinection\\下找到functions.php，搜索“function tin\_thumb\_source”，将该函数内容改成：

/\* 缩略图采用类型
/\* \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- */
function tin\_thumb\_source($src,$w=300,$h=200,$customize=true){
	$timthumb = ot\_get\_option('timthumb');
	$cloudimgsuffix = ot\_get\_option('cloudimgsuffix');
	if($timthumb==='on'){
		if(tin\_is\_mobile()==true){//判断是否是移动设备
		$img = get\_bloginfo('template\_url').'/functions/timthumb.php?src='.$src.'&q=30&w='.$w.'&h='.$h.'&zc=1';}//移动设备图片质量为30
		else{
			$img = get\_bloginfo('template\_url').'/functions/timthumb.php?src='.$src.'&q=80&w='.$w.'&h='.$h.'&zc=1';}//默认图片质量为80
		
	}else{
		if(empty($cloudimgsuffix)||$customize==false) $cloudimgsuffix = '?imageView2/1/w/'.$w.'/h/'.$h.'/q/100';
		$img = $src.$cloudimgsuffix;
	}
	return $img;
}

其中笔者把移动设备的缩略图质量设置成了20，其它设备设置成了80，大家可以根据自己的需要修改。**还有需要指出的是，经本人实践，本主题的缩略图功能对png格式图片缩略效果极差，甚至增加原图片大小，建议大家写文章时插入jpg格式图片**。