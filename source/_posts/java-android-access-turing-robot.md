---
title: JAVA（安卓）接入图灵机器人
tags:
  - JAVA
  - json
  - 人工智能
url: 1195.html
id: 1195
categories:
  - 技术应用
  - 算法语言
  - 软件开发
abbrlink: 39208
date: 2015-05-18 08:57:27
---

图灵机器人是极客人在一个公众号使用过程中发现的，它是一款人工智能的免费开放的API，可以对用户输入的问题（天气、问候、查火车票、看新闻、讲笑话等等）进行人性化的回复，然后我将其引入到了自己的微信公众号。在学习安卓开发过程中，我就想到将其加到java中，下面是我实现的无界面控制台代码。如果你对图灵机器人感兴趣，不妨关注我的公众号。

JAVA（安卓）接入图灵机器人代码
-----------------

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import org.json.JSONException;//引入json.jar
import org.json.JSONObject;
public class TulingRobots {
private static String ApiKey="yourApiKey";
public static void main(String\[\] args) throws IOException {
	BufferedReader  reader= new BufferedReader(new InputStreamReader(System.in));
	String yourQuestion;
	while((yourQuestion=reader.readLine())!="退出"||(yourQuestion!= null)){
		 //System.out.println(yourQuestion);
		 String Info=URLEncoder.encode(yourQuestion, "utf-8"); 
		String url_path = "http://www.tuling123.com/openapi/api?key="+ApiKey+"&info="+Info;
		//System.out.println(url_path);
		URL getUrl = new URL(url_path); 
	    HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection(); 
	    connection.connect();
	    BufferedReader replyReader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));//约定输入流的编码
	    String reply=replyReader.readLine();
	    try {
			JSONObject Json=new JSONObject(reply);
			reply=Json.getString("text");//获取“text”的键值
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    System.out.println(reply);//打印图灵机器人的回复
	    
	}
}
}

上面的代码需要引入json.jar包，因为图灵机器人返回的是个json格式字符串，需要用户自己做json解析。对于json解析的方法，我的前面一片转载文章又详细介绍：[解析json数据](http://wangbaiyuan.cn/parsing-json-data-android-development.html)，你在申请图灵机器人的API后，将

private static String ApiKey="yourApiKey";

这句代码中的"yourapikey"换成你自己的。

测试效果：
-----

[![图灵机器人引入java](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-17_03-27-22.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/05/wangbaiyuan.cn_2015-05-17_03-27-22.jpg) 图灵机器人引入java