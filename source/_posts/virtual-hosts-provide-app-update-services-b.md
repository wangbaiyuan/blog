---
title: 依托虚拟主机为APP提供软件更新服务（二）
tags:
  - android
  - json
  - 虚拟主机
url: 1122.html
id: 1122
categories:
  - 软件开发
abbrlink: 58641
date: 2015-04-22 15:11:08
---

在上一篇博文中，我向大家介绍了依托虚拟主机为自制APP提供软件更新服务的第一节，向大家介绍了用PHP做软件更新信息API的具体过程，在上节我成功利用自己的虚拟主机建立了自己的API，通过URL传入ID值，获取了软件信息的JSON字符如下： \[callout class="info" title="使用PHP制作的API"\]{"sw\_id":"1","sw\_name":"BY通讯录","sw\_version":"1.2","sw\_url":"http://wangbaiyuan.cn/api/software/Contactss\_1\_2.apk","sw_description":" 1.BY通讯录，是王柏元自主开发的APP，作安卓开发入门试验之用；\\n 2.调用在自己虚拟主机上的数据库搭建的API，实现了版本更新功能；\\n 3.使用一些新的安卓技术。"}\[/callout\] 接下来，我以安卓为例向大家介绍在安卓开发中调用API并实现软件的检测更新、更新提示、下载更新、安装更新的系列过程。

依托虚拟主机为自制APP提供软件更新服务（二）——安卓解析JSON、实现软件更新、自动安装
=============================================

   

一、获取网络JSON数据的工具类
----------------

下面是结合网上代码实现的一个联网获取JSON数据的工具类，类名为：HttpUtils，下面的代码我将在文章后面提供下载链接。

package cn.wangbaiyuan.http;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import android.util.Log;
import android.widget.Toast;

/\*\*
\* @author 王柏元
*
*/

public class HttpUtils {

public HttpUtils() {
// TODO Auto-generated constructor stub
}

/\*\*
\* @param url_path json的URL
\* @return
*/
public static String getJsonContent(String url_path){

String jsonString = "";
try {
URL url = new URL(url_path);
HttpURLConnection connection = (HttpURLConnection)url.openConnection();
connection.setRequestMethod("GET");
connection.setConnectTimeout(3000);
connection.setDoInput(true);  //从服务器获得数据
connection.connect();
int responseCode = connection.getResponseCode();
Log.d("log_tag",responseCode+"");
if (200 == responseCode) {
jsonString = changeInputStream(connection.getInputStream());

}
//            else{
//                 jsonString = responseCode+"";
//            }

} catch (Exception e) {
Log.d("log_tag",e.toString());
jsonString ="获取服务器信息出错";
// TODO: handle exception
}

//
return jsonString;
}

private static String changeInputStream(InputStream inputStream){
// TODO Auto-generated method stub
String  jsonString ="";

ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
byte\[\] data = new byte\[1024\];
int len = 0;
try {
while((len=inputStream.read(data))!=-1){
outputStream.write(data, 0, len);
}
} catch (IOException e) {
// TODO Auto-generated catch block
e.printStackTrace();
}

jsonString = new String(outputStream.toByteArray());
return jsonString;
}

}

  在上面的代码中，getJsonContent函数的参数为url_path，返回值为String，实现了连接网络、并获取对应URL的JSON数据的功能。getJsonContent函数是HttpUtils类的一个静态方法，你只需要在任意项目引入这个文件，使用HttpUtils.getJsonContent(API的网址)来获取网络上API的数据。  

二、在安卓代码中使用getJsonContent(API的网址)获取数据并解析
---------------------------------------

在任意项目引入上述文件HttpUtils.java，使用HttpUtils.getJsonContent(API的网址)来获取网络上API的数据，这个过程需要新建一个线程，不然程序会在联网时受到阻塞，停止运行，线程里面的代码如下：

Runnable checkupdate = new Runnable(){

@Override
public void run() {
String url_path = "http://wangbaiyuan.cn/api/update.php?id=1";

String jsonString = HttpUtils.getJsonContent(url_path);

try {
JSONObject Json=new JSONObject(jsonString);//根据API内容实例化一个JSONObject 对象
sw\_version=Json.getString("sw\_version");//获取JSONObject 的键“sw_version”对应的值；
version\_des=Json.getString("sw\_description");//获取JSONObject 的键“sw_description”对应的值；

download\_url=Json.getString("sw\_url");//获取JSONObject 的键“sw_url”对应的值；

} catch (JSONException e) {
// TODO Auto-generated catch block
e.printStackTrace();
Log.e("log_tag",e.toString());
}
hander.sendEmptyMessage(0x123);
}

};

  通过上述代码我获取了软件的版本号、版本描述、版本下载地址。

三、安卓开发获取软件版本号
-------------

要想实现版本更新，肯定要把网络上发布的最新版本和正在使用的版本号进行比较，所以需要获取当前软件的版本号，实现代码如下：

PackageManager packageManager = getPackageManager();
// getPackageName()是你当前类的包名，0代表是获取版本信息
PackageInfo packInfo = packageManager.getPackageInfo(getPackageName(),0);
ApplicationInfo applicationInfo = packageManager.getApplicationInfo(getPackageName(), 0);
current_version = packInfo.versionName;//获取当前版本
String applicationName = (String) packageManager.getApplicationLabel(applicationInfo);
version\_label.setText(applicationName+current\_version);//让界面上一个textview显示版本号

四、比较版本号判断是否选择更新；
----------------

获取当前使用的版本号后，需要对最新版本和正在使用的版本号进行比较，比较代码如下：

Double latest\_Version=Double.parseDouble(sw\_version);
if(Double.parseDouble(current\_version)<latest\_Version)
{

//如果版本有更新怎么办？添加版本有更新时的代码
}
else
Toast.makeText(about.this, "当前是最新版本", 5).show();

 

### 五、版本有更新时弹出版本更新提示框

AlertDialog.Builder builder=new AlertDialog.Builder(about.this)
.setTitle("版本更新")
.setMessage(version_des);//版本更新说明
builder.setPositiveButton("下载更新", download_listener);//设置按钮“下载更新”点击的监听器
builder.setNegativeButton("以后再说", null);
builder.create();
builder.show();

 

### 六、处理下载更新：下载软件并自动执行安装

//打开到url的连接

OnClickListener download_listener =new OnClickListener() {

@Override
public void onClick(DialogInterface dialog, int which) {
new Thread(download).start();
Toast.makeText(about.this, "开始下载……", Toast.LENGTH_LONG).show();
}
};
Runnable download = new Runnable(){

@Override
public void run() {
String sdcard=Environment.getExternalStorageDirectory()+"/";
String filepath=sdcard+"BYContacts/";//新安装包会下载到 “内存卡\\BYContacts”文件夹下

download\_url=(download\_url.startsWith("http://"))?download\_url:"http://"+download\_url;
try {
URL url = new URL(download_url);
//打开到url的连接
HttpURLConnection connection = (HttpURLConnection)url.openConnection();
//以下为java IO部分，大体来说就是先检查文件夹是否存在，不存在则创建,然后的文件名重复问题，没有考虑
InputStream istream=connection.getInputStream();
String filename=download\_url.substring(download\_url.lastIndexOf("/")+1);

File dir=new File(filepath);
if (!dir.exists()) {
dir.mkdir();
}
File file=new File(filepath+filename);
file.createNewFile();

OutputStream output=new FileOutputStream(file);
byte\[\] buff = new byte\[1024\];
int hasRead = 0;
// 将URL对应的资源下载到本地
while((hasRead = istream.read(buff)) > 0)
{
output.write(buff, 0 , hasRead);
}
output.flush();
output.close();
istream.close();
hander.sendEmptyMessage(012);
Log.e("log_tag",file.toString());

openFile(file);//打开安装包
} catch (Exception e) {
Log.e("log_tag","下载错误"+e.toString());
e.printStackTrace();
}
}
};

 

七、下载完毕执行自动安装函数openFile(File file)的代码
------------------------------------

private void openFile(File file) {
Log.e("OpenFile", file.getName());
Intent intent = new Intent();
intent.addFlags(Intent.FLAG\_ACTIVITY\_NEW_TASK);
intent.setAction(android.content.Intent.ACTION_VIEW);
intent.setDataAndType(Uri.fromFile(file),
"application/vnd.android.package-archive");
startActivity(intent);
}

  此函数的作用打开下载好的安装包，进入安装过程。

八、源码下载
------