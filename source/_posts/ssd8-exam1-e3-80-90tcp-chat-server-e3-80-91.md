---
title: SSD8_Exam1【TCP Chat Server】
tags:
  - SSD8
url: 1246.html
id: 1246
categories:
  - 算法语言
abbrlink: 32005
date: 2015-05-29 12:55:44
---

这是[SSD8](http://wangbaiyuan.cn/tag/ssd8 "查看更多关于 SSD8 的文章")练习的Exam1，预计极客人将会写一个系列，更新频率会和NWPU网络与分布式计算实验课2013级进度同步。点击标签或在本站搜索“[SSD8](http://wangbaiyuan.cn/tag/ssd8 "查看更多关于 SSD8 的文章")”即可获取已更新的SSD8答案。上一练习：[SSD8_EX2【UDP vs TCP】](http://wangbaiyuan.cn/ssd8-ex2-udp-vs-tcp.html);如果你想继续跟踪SSD练习进展，建议[订阅本站](http://wangbaiyuan.cn/newsletter?action=subscribe)。 本次练习采用多线程、TCP通信协议制作一个多人聊天软件，将用户上线下线消息、正常交流信息对所有连接的用户进行广播。极客人的主要思维是建立socket的hashmap，遍历hashmap与众多客户端通信。

一、实验题目
------

根据题目下文给出的聊天协议列表，使用Java sockets实现一个简单的TCP聊天服务器。该服务器应该具有以下功能： 1. 从每一个客户端（client）读取信息； 2. 能将读取的信息转发给所有客户端； 3. 通过命令行获得端口（port）信息； 4. 监听特定端口（port）的请求信息； 5. 能够处理并发连接，即需要使用多线程来处理每一个连接。 题中已经提供了一个图形化客户端**GUIClient.jar。**

### **GUIClient.jar反编译文件在“相关下载中”，这是客户端的源代码**

二、Chat Server服务器端代码
-------------------

### Chat Server.java:

package cn.wangbaiyuan;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.ServerSocket;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.StringTokenizer;

/\*\*
 \* ChatServer类启动服务器服务
 \* 
 \* @author <a href="http://wangbaiyuan">王柏元</a>
 *代码为<a href="http://wangbaiyuan">王柏元</a>原创，并同步发布在
 *<a href="http://wangbaiyuan.cn/ssd8-exam1%e3%80%90tcp-chat-server%e3%80%91.html">王柏元的博客</a>转载请注明来源
 */
public class ChatServer {
	private static HashMap<String, Socket> serverSocketMap = new HashMap<String, Socket>();
	ServerSocket serverSocket;
	private int port = 1234;
/\*\*
 \* 启动聊天服务端服务
 \* @throws IOException 抛出IOException
 */
	public ChatServer() throws IOException {
		serverSocket = new ServerSocket(port);
		System.out.println("ChatServer服务器启动……");
	}

	public void service() {
		while (true) {
			Socket socket = null;
			try {
				socket = serverSocket.accept();
				Thread work = new Thread(new Handler(socket)); // 为客户连接创建工作线程
				work.start();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/\*\*
	 \* 处理子线程类
 \* @author <a href="http://wangbaiyuan">王柏元</a>
 *代码为<a href="http://wangbaiyuan">王柏元</a>原创，并同步发布在
 *<a href="http://wangbaiyuan.cn/ssd8-exam1%e3%80%90tcp-chat-server%e3%80%91.html">王柏元的博客</a>转载请注明来源
 */
	public class Handler implements Runnable { // 负责与单个客户通信的线程
		private Socket socket;
		DataInputStream br;
		DataOutputStream bw;
		PrintWriter pw;

		public Handler(Socket socket) throws UnsupportedEncodingException,
				IOException {
			this.socket = socket;
		}

		@SuppressWarnings("deprecation")
		/\*\*
		 \* 有新连接时初始化,并向已连接用户广播信息
		 \* @throws IOException
		 */
		public void initStream() throws IOException { // 初始化输入输出流对象方法
			br = new DataInputStream(socket.getInputStream());
			bw = new DataOutputStream(socket.getOutputStream());
			String str1 = br.readUTF();
			System.out.println(str1);
			StringTokenizer localStringTokenizer1 = new StringTokenizer(str1,
					"^");//分割字符串
			try {
				String head = localStringTokenizer1.nextToken();
				System.out.println(head);
				String nameIP = localStringTokenizer1.nextToken();
				StringTokenizer localStringTokenizer2 = new StringTokenizer(
						nameIP, "@");
				String name = localStringTokenizer2.nextToken();
				serverSocketMap.put(name, socket);
				String ip = localStringTokenizer2.nextToken();
				String member = localStringTokenizer1.nextToken();
				String message = localStringTokenizer1.nextToken();
				String message_join = "m^system@10.22.56.186^all^" + name
						\+ " has joined from " + ip + "__\[time:" + nowTime()
						\+ "\]^";
				sentoAll(name, message_join);
			} catch (NoSuchElementException localNoSuchElementException) {
				System.out.println("GUIClient: No Such Element Exception");
			}
		}

		/\*\*
		 \* 群发消息
		 \* @param name
		 \*            群发消息的消息源\-昵称
		 \* @param message
		 \*            群发消息的消息
		 \* @throws IOException
		 */
		public void sentoAll(String name, String message) throws IOException {
			Iterator iterator = serverSocketMap.keySet().iterator();
			while (iterator.hasNext()) {
				String key = (String) iterator.next();
				Socket received = serverSocketMap.get(key);
				bw = new DataOutputStream(received.getOutputStream());
				bw.writeUTF(message);

			}
		}
/\*\*
 \* 获取当前时间
 \* @return 当前时间
 */
		public String nowTime() {
			Calendar c = Calendar.getInstance();
			c.setTimeInMillis(new Date().getTime());
			SimpleDateFormat dateFormat = new SimpleDateFormat(
					"yy-MM-dd HH:mm:ss");
			return dateFormat.format(c.getTime());
		}

		/\*\*
		 \* 执行发送内容
		 */
		public void run() { // 执行的内容
			try {
				System.out.println(socket.getInetAddress() + "加入了群聊");
				initStream(); // 初始化输入输出流对象
				String info = null;
				while (null != (info = br.readUTF())) {
					StringTokenizer localStringTokenizer1 = new StringTokenizer(
							info, "^");
					try {
						String head = localStringTokenizer1.nextToken();
						String nameIP = localStringTokenizer1.nextToken();
						StringTokenizer localStringTokenizer2 = new StringTokenizer(
								nameIP, "@");
						String name = localStringTokenizer2.nextToken();
						String ip = localStringTokenizer2.nextToken();
						String member = localStringTokenizer1.nextToken();
						String message = localStringTokenizer1.nextToken();
						if (head.equals("m")) {
							String message_exchange = "m^" + name
									\+ "@10.22.56.186^all^" + message
									\+ "___\[time:" + nowTime() + "\]^";
							sentoAll(name, message_exchange);

						} else if (head.equals("j")) {
							String message_join = "j^system@10.22.56.186^all^"
									\+ name + " has joined from " + ip
									\+ "___\[time:" + nowTime() + "\]^";
							sentoAll(name, message_join);

						} else if (head.equals("p")) {
							String message_exit = "m^system@10.22.56.186^all^"
									\+ name + " has leaved! ___\[time:"
									\+ nowTime() + "\]^";
							serverSocketMap.remove(name);
							sentoAll(name, message_exit);
						}
					} catch (NoSuchElementException localNoSuchElementException) {
						System.out
								.println("GUIClient: No Such Element Exception");
					}
					System.out.println(info);
				}
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (null != socket) {
					try {
						socket.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	public static void main(String\[\] args) throws IOException {
		new ChatServer().service(); // 启动服务
	}
}