---
title: 网页添加链接调用APP与跳转下载网址
tags:
  - JS
  - 博客客户端
url: 1602.html
id: 1602
categories:
  - 算法语言
abbrlink: 2813
date: 2016-01-09 23:22:02
---

在京东、百度糯米等网站的手机端网页上，常常有有个悬浮提示“点击打开客户端”，如果用户在手机上安装了客户端，将会自动调用客户端打开与当前网页内容一致的客户端页面；如果用户没有安装这些APP，浏览器将会跳转到下载网址，让用户下载客户端。在王柏元的博客客户端中也实现了这一功能。 之前在[《安卓实现打开指定链接调用其他应用程序》](http://wangbaiyuan.cn/android-open-specified-link-call-other-app.html)介绍了如果让客户端点击特定链接（APPLINK）时自动调用客户端软件，在此再次重复一遍： 在打开指定链接需要跳转到的Activity的AndroidManifest.xml清单文件中中加入一条intent-filter标签，并如下面的例子设置scheme、HOST等属性。

 <intent-filter>
 <action android:name="android.intent.action.MAIN" />
 <category android:name="android.intent.category.LAUNCHER" />
 </intent-filter>
 <intent-filter>
 <action android:name="android.intent.action.VIEW"/>
 <category android:name="android.intent.category.DEFAULT" />
 <category android:name="android.intent.category.BROWSABLE" />
 <data android:scheme="wbyblog" android:host="wangbaiyuan.cn"
 android:pathPrefix="/home"/>
</intent-filter>

 <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="wbyblog" android:host="wangbaiyuan.cn"
                    android:pathPrefix="/home"/>
</intent-filter>

怎样链接到客户端指定页面
------------

通过

> category android:name="android.intent.category.BROWSABLE" /> <data android:scheme="wbyblog" android:host="wangbaiyuan.cn" android:pathPrefix="/home"/>

这一Intent调用Activity不仅能在applink被点击时启动该APP，还支持类似HTTP的GET传值，这就是跳转到网页对应的客户端页面的前提。 比如：王柏元的博客客户端注册了android:scheme="wbyblog" android:host="wangbaiyuan.cn" android:pathPrefix="/post" 的Intent的postActivity，在浏览器打开链接："wbyblog://wangbaiyuan.cn/post?postid=1234**&title=网页添加链接调用APP与跳转下载网址 "时，将把postid:1234**和title:网页添加链接调用APP与跳转下载网址 传入postActivity；在postActivity中通过下列代码实现获取传入的值。

 Intent intent=getIntent();
        String action = intent.getAction();
        if(Intent.ACTION_VIEW.equals(action)){
            Uri uri = intent.getData();
            if(uri != null){
                String title = uri.getQueryParameter("title");
                postid= uri.getQueryParameter("postid");
              
            }

这样你就可以根据传值显示特定的app页面了

网页端实现已安装客户端则调用、无则下载
-------------------

在服务端我们需要动态生成当前网页对应的APPLINK，并通过一个悬浮固定的div显示applink，以便醒目吸引用户点击。比如极客人实现的在手机网页、文章页面，生成有该链接的div（电脑不予显示）： [![博客app自动链接调用下载](http://wangbaiyuan.cn/wp-content/uploads/2016/01/wangbaiyuan.cn_2016-01-09_23-20-51.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2016/01/wangbaiyuan.cn_2016-01-09_23-20-51.jpg) 博客app自动链接调用下载

<?php
function addOpenAPPlink(){
   if (wp\_is\_mobile()&&is_single()){
       global $post;
       $postid=$post->ID;
       $posttitle=$post->post_title;
       echo '<div style=" max-height:2.5em; color:white;
             padding: 0.5em;font-size: 1.3em;width: 100%;
             bottom: 0px;z-index: 99999;display: block;
             position: fixed;background-color: rgba(68, 184, 234, 0.8);text-align: center;
            "><img style="width:1.5em;height:1.5em;float:left " src="http://wangbaiyuan.cn/favicon.ico" />王柏元的博客客户端已发布
            <div id="openapp" style="font-size:0.95em;padding:0.1em;float:right;border: 1px solid white;border-radius: 4px;background-color: rgba(108, 207, 216, 0.78); " >点击打开</div></div>'; 
                
             echo 
               '<script type="text/javascript">
               function isInstalled(){
        		var the_href="http://mobile.baidu.com/#/item?docid=8613180";//获得下载链接
        		window.location="wbyblog://wangbaiyuan.cn/post?postid='.$postid.'&title='.$posttitle.'";//打开某手机上的某个app应用
        		
        		setTimeout(function(){
        			window.location=the_href;//如果超时就跳转到app下载页
        		},1000);
        	    }
        	    $("#openapp").click(function(){
        	        isInstalled();
        	    }
        	    );
        	    </script>
       
                '; 
       
   }

}

add\_action ( 'wp\_footer', 'addOpenAPPlink' );
?>

其中关键部分为下面的js代码：

<script type="text/javascript">
               function isInstalled(){
        		var the_href="http://mobile.baidu.com/#/item?docid=8613180";//获得下载链接
        		window.location="wbyblog://wangbaiyuan.cn/post?postid='.$postid.'&title='.$posttitle.'";//打开某手机上的某个app应用
        		
        		setTimeout(function(){
        			window.location=the_href;//如果超时就跳转到app下载页
        		},1000);
        	    }
        	    $("#openapp").click(function(){
        	        isInstalled();
        	    }
        	    );
        	    </script>

js实现了让浏览器打开applink从而自动调用你的app(当然前提是你安装了)，并在1000m后跳转到app下载页面，其它并不能判断你的手机上是否安装了你的APP，但是展现的效果是一样的！