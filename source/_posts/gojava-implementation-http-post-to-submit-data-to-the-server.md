---
title: '[转]java实现Http-post向服务器提交数据'
tags:
  - Http
  - JAVA
  - Web
url: 1263.html
id: 1263
categories:
  - 技术
abbrlink: 58767
date: 2015-06-08 21:27:43
---

在进行安卓学习中，极客人因为需要实现登录认证的功能，要实现http用post方式提交数据。下面是从CSDN转载的文章内容

程序组成部分：
-------

1.客户端用eclipse HttpUtils.java 标准java接口，实现http用post方式提交数据。 （用post方式提交 username 和 password）

重点注意点：
------

### 1\. public static String sendPostMessage(Map<String,String> params , String encode)

目的: 在客户端向服务器端发送 数据 params , 最终获取从服务器返回的输入流，最终将该输入流转换成字符串。注意使用标准java接口如何实现http的post请求，成功与服务器连接，并且获得从服务器端响应返回的数据。

### 2\. public String String changInputStream(InputStream inputStream , String encode)

目的: 将一个输入流按照指定编码方式转变成一个字符串。(本例中是指，将从服务器端返回的输入流InputStream转变成一个字符串String，编码方式是encode方式)

### 3\. Map<String ,String> 的实例化方法及迭代方法

*   Map  的实例化方法：
    
    Map<String, String> params = new HashMap<String, String>();
    params.put("username", "admin");
    params.put("password", "123");
    
*   Map 的迭代方法：

StringBuffer stringBuffer = new StringBuffer();
for (Map.Entry<String, String> entry : params.entrySet()) {
try {
stringBuffer
.append(entry.getKey())
.append("=")
.append(URLEncoder.encode(entry.getValue(), encode))
.append("&");

} catch (UnsupportedEncodingException e) {
// TODO Auto-generated catch block
e.printStackTrace();

}
// 删掉最后一个 & 字符
stringBuffer.deleteCharAt(stringBuffer.length() - 1);

 

程序思路：
-----

*   1\. 客户端建立http链接httpURLConnection，使用OutputStream向服务器传入数据
*   2\. 获得从服务器端返回的输入流InputStream
*   3\. 将InputStream转换成字符串String

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

关键代码：
-----

1\. 客户端 HttpUtils.java

package com.http.post;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class HttpUtils {

  // 表示服务器端的url
  private static String PATH = "http://192.168.0.100:8080/myhttp/servlet/LoginAction";
  private static URL url;

  public HttpUtils() {
    // TODO Auto-generated constructor stub
  }

  static {
    try {
      url = new URL(PATH);
    } catch (MalformedURLException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }

  /\*
   \* params 填写的URL的参数 encode 字节编码
   */
  public static String sendPostMessage(Map<String, String> params,
      String encode) {

    StringBuffer stringBuffer = new StringBuffer();

    if (params != null && !params.isEmpty()) {
      for (Map.Entry<String, String> entry : params.entrySet()) {
        try {
          stringBuffer
              .append(entry.getKey())
              .append("=")
              .append(URLEncoder.encode(entry.getValue(), encode))
              .append("&");

        } catch (UnsupportedEncodingException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        }
      }
      // 删掉最后一个 & 字符
      stringBuffer.deleteCharAt(stringBuffer.length() - 1);
      System.out.println("-->>" + stringBuffer.toString());

      try {
        HttpURLConnection httpURLConnection = (HttpURLConnection) url
            .openConnection();
        httpURLConnection.setConnectTimeout(3000);
        httpURLConnection.setDoInput(true);// 从服务器获取数据
        httpURLConnection.setDoOutput(true);// 向服务器写入数据

        // 获得上传信息的字节大小及长度
        byte\[\] mydata = stringBuffer.toString().getBytes();
        // 设置请求体的类型
        httpURLConnection.setRequestProperty("Content-Type",
            "application/x-www-form-urlencoded");
        httpURLConnection.setRequestProperty("Content-Lenth",
            String.valueOf(mydata.length));

        // 获得输出流，向服务器输出数据
        OutputStream outputStream = (OutputStream) httpURLConnection
            .getOutputStream();
        outputStream.write(mydata);

        // 获得服务器响应的结果和状态码
        int responseCode = httpURLConnection.getResponseCode();
        if (responseCode == 200) {

          // 获得输入流，从服务器端获得数据
          InputStream inputStream = (InputStream) httpURLConnection
              .getInputStream();
          return (changeInputStream(inputStream, encode));

        }

      } catch (IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
    }

    return "";
  }

  /\*
   \* // 把从输入流InputStream按指定编码格式encode变成字符串String
   */
  public static String changeInputStream(InputStream inputStream,
      String encode) {

    // ByteArrayOutputStream 一般叫做内存流
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    byte\[\] data = new byte\[1024\];
    int len = 0;
    String result = "";
    if (inputStream != null) {

      try {
        while ((len = inputStream.read(data)) != -1) {
          byteArrayOutputStream.write(data, 0, len);

        }
        result = new String(byteArrayOutputStream.toByteArray(), encode);

      } catch (IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }

    }

    return result;
  }

  /\*\*
   \* @param args
   */
  public static void main(String\[\] args) {
    // TODO Auto-generated method stub
    Map<String, String> params = new HashMap<String, String>();
    params.put("username", "admin");
    params.put("password", "123");
    String result = sendPostMessage(params, "utf-8");
    System.out.println("-result->>" + result);

  }

}