---
title: 免插件百度链接提交-实时主动推送
tags:
  - PHP
  - SEO
  - wordpress
url: 1219.html
id: 1219
categories:
  - 算法语言
abbrlink: 23732
date: 2015-05-25 21:44:12
---

对于广大站长来说，文章第一时间被百度收录，或自己的原创文章第一时间被百度认定为原创相当重要。不止一次文章被转载，但是因为别人的网站权重比自己高，百度收录速度或百度搜索文章标题的排名却不及转载网站的，这是一件十分让人苦恼的一件事。

百度站长平台消息：
---------

5月25日，百度站长工具发布消息：

> sitemap实时推送功能6月份开始逐步下线，我们推出了更加强大的链接提交主动推送功能做为替代。[新的主动推送功能更加强大](http://zhanzhang.baidu.com/college/articleinfo?id=336)：提交数据方式更简单，返回码达意更清晰（可立即知晓数据提交是否成功），可以做到实时向百度推送新数据。

相关信息详见：  [http://zhanzhang.baidu.com/college/articleinfo?id=336](http://zhanzhang.baidu.com/college/articleinfo?id=336 "http://zhanzhang.baidu.com/college/articleinfo?id=336") sitemap广大网站使用，搜索引擎通过爬行网站地图可以发现网站的新链接，并定期访问。但是搜索引擎的爬行频率有限且具有规律性，自己的原创文章并不能第一时间被百度等发现。 下面是百度官方给出三种提交链接的方式总结：

*   主动推送：百度推荐的**最为快速的提交方式**，建议将站点当天新链接立即通过此方式推送给百度获取最快收录。
*   sitemap：百度会周期性检查您提交的Sitemap，对链接进行处理，收录速度慢于主动推送。
*   手工提交：手动将链接提交给百度。

这里的手工提交不同于“链接提交”
----------------

这里的手工提交是指对于百度站长验证站点提供的快速提交方式，支持批量多链接提交；而通常的“链接提交”是不需要你的网站是”百度站长平台验证站点“的，提交比较随意。 [![提交链接到百度](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-26_00-01-43.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-26_00-01-43.jpg) 提交链接到百度 [![手动提交](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-26_00-01-41.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-26_00-01-41.jpg) 手动提交 [![实时提交](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-26_00-01-38.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-26_00-01-38.jpg) 实时提交 而百度站长平台新推出的“实时主动推送”为验证站点站长分配了一个token准入密钥，一般可认为只有站长或者知晓密钥的网站管理员才有权限提交，所以提交需谨慎，极客人建议大家用它提交一些质量比较高的文章，不要提交垃圾链接，同时需要提醒大家的是：目前这种方式提交的URL是有限额的，比如王柏元的博客每天只能用实时主动提交方式提交50条，大量自动提交垃圾文章可能导致失去提交权限！

免插件百度链接提交-实时主动推送
----------------

通过百度官方给出的PHP推送样例，极客人制作出了针对wordpress博客实时推送的PHP代码程序，将下列代码加入主题文件夹下functions.php最后一行“?>”之前极客，本代码将在每次发布文章时执行将新文章链接实时主动推送给百度，同时在与代码所处文件同目录中生成日志文件“by_baiduSubmit.txt”。你可以查看日志文件了解是否推送成功。如果此程序出现错误或无法正确向百度实时提交新链接，欢迎在本页面反馈。

<?php 
date\_default\_timezone_set('Asia/Shanghai');
add\_action('publish\_post', 'publish\_bd\_submit', 999);
function publish\_bd\_submit($post_ID){
    global $post;
    $bd\_submit\_enabled = true;
    if($bd\_submit\_enabled){
        $bd\_submit\_site = "wangbaiyuan.cn";//此处填写你的域名
        $bd\_submit\_token ="yourtoken";//此处填写你的token
        $api ="http://data.zz.baidu.com/urls?site=".$bd\_submit\_site."&token=".$bd\_submit\_token;
        if($post->post_status != "publish"){
            $url = get\_permalink($post\_ID);
            $ch = curl_init();
            $options =  array(
                CURLOPT_URL => $api,
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POSTFIELDS => $url,
                CURLOPT_HTTPHEADER => array('Content-Type: text/plain')
            );
            curl\_setopt\_array($ch, $options);
            $result = curl_exec($ch);
            $result = json_decode($result, true);
			     $time = time();
                $file =  dirname(\_\_FILE\_\_).'/by_baiduSubmit.txt';//生成日志文件,与代码所处文件同目录
                if(date('Y-m-d',filemtime($file)) != date('Y-m-d')){
                    $handle = fopen($file,"w");
                }else{
                    $handle = fopen($file,"a");
                }
		$resultMessage="";
            if($result\['message'\]){
               $resultMessage= date('Y-m-d G:i:s',$time)."\\n提交失败：".$result\['message'\].":\\n网址：".$url."\\n\\n";
            }
            if($result\['success'\]){
$resultMessage= date('Y-m-d G:i:s',$time)."\\n提交成功：".":".$url."\\n\\n";
            }
                fwrite($handle,$resultMessage);
                fclose($handle);
        }
    }
}
?>