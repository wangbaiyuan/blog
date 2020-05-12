---
title: 自制软件更新、下载、安装类BYupdate
tags:
  - 个人程序库
url: 1303.html
id: 1303
categories:
  - 百元百科
abbrlink: 8476
date: 2015-06-22 08:47:01
---

类 BYupdate
----------

简述：实现软件信息的展示和软件更新功能

*   java.lang.Object
*   *   cn.wangbaiyuan.tools.BYupdate

*   * * *
    
    public class BYupdate
    extends java.lang.Object
    
    实现软件信息的展示和软件更新功能
    
    作者:
    
    王柏元
    

*   *   ### 字段概要
        
        字段
        
        限定符和类型
        
        字段和说明
        
        `OnClickListener`
        
        `download_listener`
        
    
    *   ### 构造器概要
        
        构造器
        
        构造器和说明
        
        `BYupdate(Context icontext, java.lang.String url, java.lang.String version)`
        
    
    *   ### 方法概要
        
        All MethodsInstance MethodsConcrete Methods
        
        限定符和类型
        
        方法和说明
        
        `void`
        
        `checkupdate()`
        
        检查更新
        
        `void`
        
        `setDownload_url(java.lang.String url)`
        
        设置软件更新服务处理地址
        
        *   ### 从类继承的方法 java.lang.Object
            
            `equals, getClass, hashCode, notify, notifyAll, toString, wait, wait, wait`

*   *   ### 字段详细资料
        
        *   #### download_listener
            
            public OnClickListener download_listener
            
    
    *   ### 构造器详细资料
        
        *   #### BYupdate
            
            public BYupdate(Context icontext,
                            java.lang.String url,
                            java.lang.String version)
            
            参数:
            
            `icontext` \- context一般是引用此类的activity
            
            `url` \- 软件更新服务处理地址
            
            `version` \- 软件当前版本号
            
    
    *   ### 方法详细资料
        
        *   #### setDownload_url
            
            public void setDownload_url(java.lang.String url)
            
            设置软件更新服务处理地址
            
            参数:
            
            `url` -
            
        
        *   #### checkupdate
            
            public void checkupdate()
            
            检查更新
            

代码：
---

package cn.wangbaiyuan.tools;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;
/\*\*
 \* 实现软件信息的展示和软件更新功能
 \* @author 王柏元
 *
 */
public class BYupdate  {

	String sw_version;
	String current_version;
	String version_des;
	String url_path;
	Context context;
	String download_url;
	/\*\*
	 \* 
	 \* @param icontext context一般是引用此类的activity
	 \* @param url 软件更新服务处理地址
	 \* @param version 软件当前版本号
	 */
	public BYupdate(Context icontext,String url, String version){
		context=icontext;
		url_path=url;
		current_version=version;
	}
	/\*\*
	 \* 设置软件更新服务处理地址
	 \* @param url
	 */
	public void setDownload_url(String url){
		url_path=url;
	}
	
	
	Handler hander=new Handler(){
		@Override
		public void handleMessage(Message msg){
			if(msg.what==0x123){
				//version\_label.setText("最新版本："+sw\_version);
				Double latest\_Version=Double.parseDouble(sw\_version);
				if(Double.parseDouble(current\_version)<latest\_Version)
				{

				AlertDialog.Builder builder=new AlertDialog.Builder(context)
				.setTitle("当前版本:"+current\_version+",最新版本:"+latest\_Version)
				.setMessage(version_des);
				builder.setPositiveButton("下载更新", download_listener);
				builder.setNegativeButton("以后再说", null);
				builder.create();
				builder.show();
				}
				else
					Toast.makeText(context, "当前是最新版本", 5).show();
			}
			else if(msg.what==012)
			Toast.makeText(context, "安装包下载完成，进入安装……", Toast.LENGTH_LONG).show();
			else if(msg.what==01244)
				Toast.makeText(context, "下载错误……", Toast.LENGTH_LONG).show();
	            //最后toast出文件名，因为这个程序是单线程的，所以要下载完文件以后才会执行这一句，中间的时间类似于死机，不过多线程还没有学到
			
		}
	};
	/\*\*
	 \* 检查更新
	 */
	public void checkupdate(){
	new Thread(checkupdate).start();
	Toast.makeText(context, "正在检查更新……", 2).show();
	}
	public OnClickListener download_listener =new OnClickListener() {
		
		@Override
		public void onClick(DialogInterface dialog, int which) { 
			new Thread(download).start();

			Toast.makeText(context, "开始下载……", Toast.LENGTH_LONG).show();
		}
	};
	/\*\*
	 \* 下载线程
	 */
	Runnable download = new Runnable(){ 
		  
			@Override  
			public void run() {  
				String sdcard=Environment.getExternalStorageDirectory()+"/";
				String filepath=sdcard+"BYLeavePaper/";
				
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

	                openFile(file);
	            } catch (Exception e) {
	           	 Log.e("log_tag","下载错误:"+e.toString());
	           	hander.sendEmptyMessage(01244);
	           }

				
				
				
       } 
	};
	/\*\*
	 \* 检查更新线程
	 */
	Runnable checkupdate = new Runnable(){  
		  
		@Override  
		public void run() {  
	        String jsonString = BYHttpGet.getJsonContent(url_path);
	        Log.e("bypaperup",jsonString);
	        
	        try {
				JSONObject Json=new JSONObject(jsonString);
				sw\_version=Json.getString("sw\_version");
				 version\_des=Json.getString("sw\_description");
				 download\_url=Json.getString("sw\_url");
				

			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				 Log.e("log_tag",e.toString());
			}
	        hander.sendEmptyMessage(0x123);	
		}  
		
		  }; 
/\*\*
 \* 打开指定APK
 \* @param file APK路径
 */
private void openFile(File file) {
		        Log.e("OpenFile", file.getName());
		        Intent intent = new Intent();
		        intent.addFlags(Intent.FLAG\_ACTIVITY\_NEW_TASK);
		        intent.setAction(android.content.Intent.ACTION_VIEW);
		        intent.setDataAndType(Uri.fromFile(file),
		                "application/vnd.android.package-archive");
		        context.startActivity(intent);
  }
}