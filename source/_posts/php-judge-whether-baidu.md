---
title: PHP实现判断文章是否被百度收录
url: 989.html
id: 989
categories:
  - 技术
abbrlink: 48174
date: 2015-03-18 23:23:10
tags: ''
---

一般判断一个页面是否被百度收录都采用“site+网址”搜索命令进行检查，在这里向大家分享一下用php自动判断文章是否被百度收录的方法，并在页面没有被百度的情况下一键点击直接提交网址给百度。 将下面的代码加进主题模板文件functions.php里，然后在输出是否收录的结果信息处加入“<span><?php baidu_record(); ?></span>”即可；

PHP实现判断文章是否被百度收录
----------------

function baidu_check($url){
    global $wpdb;
    $post\_id = ( null === $post\_id ) ? get\_the\_ID() : $post_id;
    $baidu\_record  = get\_post\_meta($post\_id,'baidu_record',true);
    if( $baidu_record != 1){
        $url='http://www.baidu.com/s?wd='.$url;
        $curl=curl_init();
        curl\_setopt($curl,CURLOPT\_URL,$url);
        curl\_setopt($curl,CURLOPT\_RETURNTRANSFER,1);
        $rs=curl_exec($curl);
        curl_close($curl);
        if(!strpos($rs,'没有找到')){
            if( $baidu_record == 0){
                update\_post\_meta($post\_id, 'baidu\_record', 1);
            } else {
                add\_post\_meta($post\_id, 'baidu\_record', 1, true);
            }
                return 1;
        } else {
            if( $baidu_record == false){
                add\_post\_meta($post\_id, 'baidu\_record', 0, true);
            }
            return 0;
        }
    } else {
       return 1;
    }
}
function baidu_record() {
    if(baidu\_check(get\_permalink()) == 1) {
        echo '<a target="\_blank" title="点击查看" rel="external nofollow" href="http://www.baidu.com/s?wd='.get\_the_title().'"><i class="fa fa-check-circle-o"></i> 已被百度收录</a>';
   } else {
        echo '<a style="color:red;" rel="external nofollow" title="点击提交，谢谢您！" target="\_blank" href="http://zhanzhang.baidu.com/sitesubmit/index?sitename='.get\_permalink().'"><i class="fa fa-times"></i>未收录,点击提交</a>';
   }
}