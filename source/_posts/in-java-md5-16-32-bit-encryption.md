---
title: java中MD5 16和32位加密
tags:
  - JAVA
  - 个人程序库
url: 1492.html
id: 1492
categories:
  - 技术
abbrlink: 14443
date: 2015-10-04 22:57:26
---

java中MD5 16和32位加密，下面的Md5类中，通过构造函数Md5(String sourceStr)传入加密字符串，而get16和get32顾名思义是分别获取字符串的16位和32位MD5哈希值。Md5加密方式不能反向解密，任何一个字符串乃至一个超大文件都可以获得MD5值，并且是独一无二的。一个4G大的文件加密为一段32位字符串后，即使对文件改了哪怕一个字节，算出来的Md5和原文件的Md5都会有天壤之别，所以Md5算法常作为大文件完整性的校验。

在线Md5加密、“解密”网站
--------------

网址：http://www.cmd5.com/ 需要指出的是，虽然Md5是难以解密的，但是由于同一字符串只能得到唯一的字符串，如果我们维护一个数据库记录下一些常用字符串的原值和Md5值，当输入的Md5能在数据库中找到记录的话，就能很快找到Md5值对应的原值。即所谓“解密”。

java中MD5 16和32位加密代码
-------------------

package cn.wangbaiyuan.toolsl;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/\*\*
 \* Created by WBY on 2015/10/4.
 */
public class Md5 {
    private String md5_32;
    private String md5_16;
public Md5(String sourceStr){
    String result = "";
    try {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(sourceStr.getBytes());
        byte b\[\] = md.digest();
        int i;
        StringBuffer buf = new StringBuffer("");
        for (int offset = 0; offset < b.length; offset++) {
            i = b\[offset\];
            if (i < 0)
                i += 256;
            if (i < 16)
                buf.append("0");
            buf.append(Integer.toHexString(i));
        }
        result = buf.toString();
        md5_32=result;
        md5_16= buf.toString().substring(8, 24);
    } catch (NoSuchAlgorithmException e) {
        System.out.println(e);
    }
}
    public String get16(){
        return md5_16;
    }
    public String get32(){
        return md5_32;
    }

}