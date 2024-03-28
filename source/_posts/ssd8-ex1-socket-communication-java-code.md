---
title: SSD8_EX1【socket通信的java实现代码】
tags:
  - SSD8
url: 1197.html
id: 1197
categories:
  - 技术
  - 计算机技术
  - 软件开发
abbrlink: 25587
date: 2015-05-17 11:42:37
---

问题概述
====

实现EchoServer和EchoClient类，其中EchoServer监听某一端口号（启动时，通过参数传入），等待客户端访问；EchoClient根据启动时传入的服务器地址（IP地址或域名）和端口号连接该服务；连接后，读取用户在命令行下的输入，将该输入传输给EchoServer；EchoServer接收后，向EchoClient返回_“EchoServer received: ” + 用户输入信息_；EchoClient接收到返回信息后输出到命令行，并继续等待用户输入

1、客户端EchoClient.java代码
----------------------

package cn.wangbaiyuan;
import java.io.*;
import java.net.*;
import java.util.Scanner;

/\*\*
 \* socket通信客户端类
 \* 
 \* @author 王柏元
 *
 */

public class EchoClient {

	/\*\*
	 \* PORT 一个初始化端口
	 */
	static int PORT = 12340; // 连接端口
	/\*\*
	 \* HOST一个初始化主机名
	 */
	static String HOST = "192.168.4.21"; // 连接地址
	/\*\*
	 \* socket 客户端socket
	 \* 
	 */
	Socket socket;

	public EchoClient() throws UnknownHostException, IOException {
		socket = new Socket(HOST, PORT); // 创建客户端套接字
	}

	/\*\*
	 \* 实现发送消息
	 */
	public void send() {
		try {
			// 客户端输出流，向服务器发消息
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
					socket.getOutputStream()));
			// 客户端输入流，接收服务器消息
			BufferedReader br = new BufferedReader(new InputStreamReader(
					socket.getInputStream()));
			PrintWriter pw = new PrintWriter(bw, true); // 装饰输出流，及时刷新
			Scanner in = new Scanner(System.in); // 接受用户信息
			String msg = null;
			while ((msg = in.next()) != null) {
				pw.println(msg); // 发送给服务器端
				System.out.println(br.readLine()); // 输出服务器返回的消息
				if (msg.equals("quit")) {
					break; // 退出
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != socket) {
				try {
					socket.close(); // 断开连接
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static void main(String\[\] args) throws UnknownHostException,
			IOException {
		BufferedReader strin = new BufferedReader(new InputStreamReader(
				System.in));
		System.out.println("请输入连接地址：");
		HOST = strin.readLine();
		System.out.println("请输入连接端口：");
		PORT = Integer.parseInt(strin.readLine());
		new EchoClient().send();
	}
}

 

2、单线程服务器端EchoServer.java代码
--------------------------

package cn.wangbaiyuan;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

/\*\*
 \* @author 王柏元
 *socket通信服务器类
 */

public class EchoServer {
	/**
	 *
	 */
	
	ServerSocket serverSocket;
	private final int PORT = 12340; // 端口
/\*\*
 \* 新建EchoServer类时建立一个ServerSocket
 \* @throws IOException
 */
	public EchoServer() throws IOException {
		serverSocket = new ServerSocket(PORT); // 创建服务器端套接字
		System.out.println("服务器启动。");
	}
/\*\*
 \* 启动服务器socket服务，监听客户端消息
 */

	public void servic() {
		Socket socket = null;
		while (true) {
			try {
				socket = serverSocket.accept(); // 等待并取出用户连接，并创建套接字
				System.out.println("新连接，连接地址：" + socket.getInetAddress() + "："
						\+ socket.getPort()); // 客户端信息
				// 输入流，读取客户端信息
				BufferedReader br = new BufferedReader(new InputStreamReader(
						socket.getInputStream(), "UTF-8"));// 涉及到安卓客户端，为留设置编码
				// 输出流，向客户端写信息
				BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
						socket.getOutputStream(), "UTF-8"));
				PrintWriter pw = new PrintWriter(bw, true); // 装饰输出流，true,每写一行就刷新输出缓冲区，不用flush
				String info = null; // 接收用户输入的信息
				while ((info = br.readLine()) != null) {
					System.out.println(info); // 输出用户发送的消息
					pw.println("you said:" + info); // 向客户端返回用户发送的消息，println输出完后会自动刷新缓冲区
					if (info.equals("quit")) { // 如果用户输入“quit”就退出
						break;
					}
				}
			} // 如果客户端断开连接，则应捕获该异常，但不应中断整个while循环，使得服务器能继续与其他客户端通信
			catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (null != socket) {
					try {
						socket.close(); // 断开连接
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
/\*\*
 \* EchoServer main静态类，启动时开启服务器端服务
 \* @param args
 \* @throws IOException
 */
	public static void main(String\[\] args) throws IOException {
		new EchoServer().servic(); // 启动服务
	}
}

3、多线程服务器端代码
-----------

### ThreadEchoServer.java:

package cn.wangbaiyuan;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class ThreadEchoServer {
	ServerSocket serverSocket;
	private final int PORT=1245; //端口

	public ThreadEchoServer() throws IOException{
	serverSocket=new ServerSocket(PORT); //创建服务器端套接字
	System.out.println("服务器启动。");
	}

	//servic()方法
	public void service(){
		while(true){
		Socket socket=null;
		try {
		socket=serverSocket.accept();
		Thread work=new Thread(new Handler(socket)); //为客户连接创建工作线程
		work.start();
		} catch (IOException e) {
		e.printStackTrace();
		}
		}
		}

	public static void main(String\[\] args) throws IOException {
	new ThreadEchoServer().service(); //启动服务
	}
	}

### Handler.java

package cn.wangbaiyuan;

import java.io.*;
import java.net.Socket;

public class Handler implements Runnable { // 负责与单个客户通信的线程
	private Socket socket;
	BufferedReader br;
	BufferedWriter bw;
	PrintWriter pw;

	public Handler(Socket socket) {
		this.socket = socket;
	}

	public void initStream() throws IOException { // 初始化输入输出流对象方法
		br = new BufferedReader(new InputStreamReader(socket.getInputStream(),"UTF-8"));
		bw = new BufferedWriter(
				new OutputStreamWriter(socket.getOutputStream(),"UTF-8"));
		pw = new PrintWriter(bw, true);
		System.out.println("新连接，连接地址："+socket.getInetAddress()+"："+socket.getPort());
	
	}

	public void run() { // 执行的内容
		try {
			initStream(); // 初始化输入输出流对象
			String info = null;
			while (null != (info = br.readLine())) {
				System.out.println(socket.getInetAddress()+"say："+info);
				pw.println("you said:" + info);
				// 返回用户发送的消息
				if (info.equals("quit")) {
					System.out.println(socket.getInetAddress()+"已退出："+info);// 如果用户输入“quit”就退出
					pw.println("你已退出");
					break;
				}
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