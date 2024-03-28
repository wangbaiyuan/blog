---
title: Android webview广告过滤的实现
url: 1656.html
id: 1656
categories:
  - 技术
abbrlink: 7942
date: 2016-05-02 11:46:38
tags: ''
---

现在大部分的android平台的浏览器都具有广告过滤的功能，同时大部分网站都有广告。广告行业是个盈利巨大的产业，就我看来，现在绝大部分的互联网产品，一般有两种营利模式：免费有广告和会员无广告；他们大部分（包括网站和APP等）盈利来源就是广告。作为用户而言，对广告十分反感，但是互联网上的服务我们能免费享受与支撑这些服务得以延续与成长却得益于广告。 [![优酷广告](http://baiyuan.wang/wp-content/uploads/2016/05/baiyuan.wang_2016-05-02_11-46-22.jpg)](http://baiyuan.wang/wp-content/uploads/2016/05/baiyuan.wang_2016-05-02_11-46-22.jpg) 百度了一下，网上竟然没有Android浏览器屏蔽广告的代码实现，所以极客人只能自己动手了。网页上的广告一般是站长在网页植入一段js代码，要想屏蔽广告只需要将这些js屏蔽掉即可。

WebViewClient的几个回调函数
--------------------

要想对Webview实现一些高级操作，首先要学习WebViewClient的用法，这是Webview几个常用回调函数

*   1、**public boolean shouldOverrideUrlLoading(WebView view, String url)** ： 在点击请求的是链接是才会调用，重写此方法返回true表明点击网页里面的链接还是在当前的webview里跳转，不跳到浏览器那边。
*   2、**public void onReceivedSslError(WebView view, SslErrorHandler handler, android.net.http.SslError error)**： 重写此方法可以让webview处理https请求。
*   3、**public boolean shouldOverrideKeyEvent(WebView view, KeyEvent event)**：重写此方法才能够处理在浏览器中的按键事件。
*   4、 **public void onLoadResource(WebView view, String url)** ：在加载页面资源时会调用，每一个资源（比如图片）的加载都会调用一次。
*   5、 **public void onPageStarted(WebView view, String url, Bitmap favicon)** ：在页面加载开始时调用。
*   6、**public void onPageFinished(WebView view, String url)** ：在页面加载结束时调用。

初看上面的回调函数，极客人发现了一个巨大的坑，拦截广告就是拦截加载广告的js，上面的onLoadResource似乎是很合适的函数，只要判断onLoadResource的参数url是否是加载广告js的即可，如果不是广告相关的url正常加载，如果是则不加载。但是在使用onLoadResource之后才发现根本不行。 这里引用WebViewClient另外一个回调函数：**public WebResourceResponse shouldInterceptRequest(WebView view, String url)** shouldInterceptRequest有两种重载。

*   **public WebResourceResponse shouldInterceptRequest (WebView view, String url)** 从API 11开始引入，API 21弃用
*   **public WebResourceResponse shouldInterceptRequest (WebView view, WebResourceRequest request)** 从API 21开始引入

这里极客人暂且使用shouldInterceptRequest (WebView view, String url)完成对webview广告的拦截。

拦截广告资源URL
---------

在Webview加载资源时会回调shouldInterceptRequest函数，我们可以通过重写shouldInterceptRequest函数实现对webview的资源请求进行处理。进行处理后返回数据。如果主程序返回的数据为null，WebView会自行请求网络加载资源。这里有个坑：不是shouldInterceptRequest函数返回null就能屏蔽掉请求！正确的屏蔽请求的方式：

@Override
    public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        url = url.toLowerCase();
 if (!ADFilterTool.hasAd(context, url)) {
                return super.shouldInterceptRequest(view, url);//正常加载
            }else{
                return new WebResourceResponse(null,null,null);//含有广告资源屏蔽请求
            }
    }

下面是极客人写的屏蔽广告的**NoAdWebViewClient类： **只需使用webview.setWebViewClient(NoAdWebViewClient webclient)即可屏蔽指定webview的广告。

package cn.wangbaiyuan.webviewadblock;

import android.content.Context;
import android.util.Log;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/\*\*
 \* Created by BrainWang on 05/01/2016.
 */
public class NoAdWebViewClient extends WebViewClient {
    private  String homeurl;
    private Context context;

    public NoAdWebViewClient(Context context,String homeurl) {
        this.context = context;
        this.homeurl = homeurl;
    }
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        url = url.toLowerCase();
        if(!url.contains(homeurl)){
            if (!ADFilterTool.hasAd(context, url)) {
                return super.shouldInterceptRequest(view, url);
            }else{
                return new WebResourceResponse(null,null,null);
            }
        }else{
            return super.shouldInterceptRequest(view, url);
        }


    }
}

判断URL是否含广告的**ADFilterTool类：**该类通过判断url是否包含在广告拦截库中

### ADFilterTool.java

package cn.wangbaiyuan.webviewadblock;

import android.content.Context;
import android.content.res.Resources;
import android.util.Log;

/\*\*
 \* Created by BrainWang on 05/01/2016.
 */
public class ADFilterTool {
    public static boolean hasAd(Context context, String url) {
        Resources res = context.getResources();
        String\[\] adUrls = res.getStringArray(R.array.adBlockUrl);
        for (String adUrl : adUrls) {
            if (url.contains(adUrl)) {
                return true;
            }
        }
        return false;
    }
}

### 广告url资源文件（广告拦截库可自行百度更新）：AdUrlString.xml

所谓广告拦截库，实际上是请求广告资源的url合集，网络上有大量的广告拦截库，读者可以定期更新一下文件来实现对广告的高效过滤。本文屏蔽的方式比较粗暴，凡是含有广告资源的域名统统禁止。要想实现更精准的过滤，访友你可以使用通配符匹配url的方式进行拦截，现在PC端的浏览器正是这样做的。

<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string-array name="adBlockUrl">
        <item>ubmcmm.baidustatic.com</item>
        <item>cpro2.baidustatic.com</item>
        <item>cpro.baidustatic.com</item>
        <item>s.lianmeng.360.cn</item>
        <item>nsclick.baidu.com</item>
        <item>pos.baidu.com</item>
        <item>cbjs.baidu.com</item>
        <item>cpro.baidu.com</item>
        <item>images.sohu.com/cs/jsfile/js/c.js</item>
        <item>union.sogou.com/</item>
        <item>sogou.com/</item>
        <item>a.baidu.com</item>
        <item>c.baidu.com</item>

    </string-array>
</resources>