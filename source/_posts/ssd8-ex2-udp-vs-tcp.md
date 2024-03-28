---
title: SSD8_EX2【UDP vs TCP】
tags:
  - SSD8
url: 1216.html
id: 1216
categories:
  - 技术
abbrlink: 61801
date: 2015-05-22 19:59:03
---

这是SSD8练习的EX2，预计极客人将会写一个系列，此系列全为王柏元个人原创，更新频率会和NWPU数据库系统实验课2013级进度同步。点击标签或在本站搜索“SSD8”即可获取已更新的SSD8答案。上一练习：[SSD8_EX1【Socket通信的Java实现代码】](http://baiyuan.wang/ssd8-ex1-socket-communication-java-code.html);如果你想继续跟踪SSD练习进展，建议[订阅本站](http://baiyuan.wang/newsletter?action=subscribe)。

问题简述
----

用Java写一个简单的基于C/S（客户机/服务器）模式的数据报（datagram）程序。客户端设置一个计时器，开始计时后，分别利用UDP和TCP协议向服务器发送一个字节的数据包，并等待服务器返回消息。计算平均往返时间,同时计算UDP传输过程中丢包数量并实现丢包重发。

一、用UDP实现丢包重发、丢包计数和传输计时
----------------------

### 1.UDP服务端程序UDPServer.java

package cn.wangbaiyuan;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
/\*\*
\* 基于UDP协议的服务器端，对来自客户端的数据包进行应答
\* @author  <a href="http://wangbaiyuan">王柏元</a>
*
*/
public class UDPServer {
    /\*\*
     \* 端口
     */
    int port=1888;
    DatagramSocket socket; 
    public UDPServer() throws SocketException{
    socket=new DatagramSocket(port);  //服务端DatagramSocket
    System.out.println("服务器启动。");
    }
    public void service() throws IOException{
    while(true){
    DatagramPacket dp=new DatagramPacket(new byte\[512\],512);
    socket.receive(dp); //接收客户端信息
    socket.send(dp);  //回复数据
    }
    }
    public static void main(String\[\] args) throws SocketException, IOException {
    new UDPServer().service();
    }

}

 

### 2.UDP客户端程序UDPClient.java

package cn.wangbaiyuan;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.net.SocketException;
import java.net.SocketTimeoutException;
/\*\*
\* 基于UDP协议的客户端类,完成用UDP协议向服务器发送数据包
\* @author 王柏元
*{@linkplain http://baiyuan.wang} 
*/
public class UDPClient {
    static int remotePort=1888; //服务器端口
    static String remoteIp="10.22.56.186";  //服务器IP
    static DatagramSocket socket;//客户端DatagramSocket
    static int times=1000;
    
    public UDPClient() throws SocketException{
     
    }
    public static void main(String\[\] args) throws InterruptedException, SocketException {
        
        SocketAddress socketAddres=new InetSocketAddress(remoteIp,remotePort);
        DatagramPacket inputdp=new DatagramPacket(new byte\[512\],512);
        String s="d";
        int timeout=1;
        long toalTime=0;
        long startTime = 0;
int failTimes=0;

        socket=new DatagramSocket();
        socket.setSoTimeout(timeout);
        byte\[\] info=s.getBytes();
        DatagramPacket dp=new DatagramPacket(info,info.length,socketAddres);
        
        for(int i=1;i<=times;i++){
            Boolean received=false;
            while(received==false){
            try {
                startTime=System.currentTimeMillis();
                socket.send(dp);
                socket.receive(inputdp);

                long endTime=System.currentTimeMillis();
                toalTime+=(endTime-startTime);
                received=true;
                System.out.println("第"+i+"次发送并接受回复成功!");
                
            } catch (SocketTimeoutException e) {
                failTimes++;
                received=false;
                System.out.println("第"+i+"次接收成功应答超时，尝试重发");// TODO Auto-generated catch block
            } catch (IOException e) {
                // TODO Auto-generated catch block
                System.out.println("第"+i+"次接收成功应答失败，尝试重发");
                failTimes++;
            }
            }
        }
        System.out.println("失败次数："+failTimes);
        float averTime=(float)toalTime/1000;
        System.out.println("平均耗时："+averTime+"豪秒");
        }

}

 

二、用TCP实现传输计时
------------

### 1.TCP服务端程序TcpServer.java

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
\* 基于TCP协议的服务器端，对来自客户端的数据包进行应答
\* @author  <a href="http://wangbaiyuan">王柏元</a>
*
*/

public class TcpServer {

    ServerSocket serverSocket;
    private final int PORT = 12340; // 端口
/\*\*
\* 新建EchoServer类时建立一个ServerSocket
\* @throws IOException
*/
    public TcpServer() throws IOException {
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
                // 输入流，读取客户端信息
                BufferedReader br = new BufferedReader(new InputStreamReader(
                        socket.getInputStream(), "UTF-8"));// 涉及到安卓客户端，为留设置编码
                // 输出流，向客户端写信息
                BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
                        socket.getOutputStream(), "UTF-8"));
                PrintWriter pw = new PrintWriter(bw, true); // 装饰输出流，true,每写一行就刷新输出缓冲区，不用flush
                String info = null; // 接收用户输入的信息
                while ((info = br.readLine()) != null) {
                    pw.println( info); // 向客户端返回用户发送的消息，println输出完后会自动刷新缓冲区
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
        new TcpServer().servic(); // 启动服务
    }
}

 

### 2.基于TCP协议的客户端类

package cn.wangbaiyuan;

import java.io.*;
import java.net.*;
import java.util.Scanner;

/\*\*
 \* socket TCP通信客户端类
 \* 
 \* @author 王柏元
 *
 */

public class TcpClient {

	/\*\*
	 \* PORT 一个初始化端口
	 */
	static int PORT = 12340; // 连接端口
	/\*\*
	 \* HOST一个初始化主机名
	 */
	static String HOST = "10.22.56.186"; // 连接地址
	/\*\*
	 \* socket 客户端socket
	 \* 
	 */
	static Socket socket;

	public TcpClient() throws UnknownHostException, IOException {
		
	}
	/\*\*
	 \* 实现发送消息
	 */
	

	public static void main(String\[\] args) throws UnknownHostException,
			IOException {
		BufferedReader strin = new BufferedReader(new InputStreamReader(
				System.in));
		System.out.println("请输入连接地址：");
		HOST = strin.readLine();
		System.out.println("请输入连接端口：");
		PORT = Integer.parseInt(strin.readLine());
		long toalTime=0;
		long startTime = 0;
		for(int i=1;i<=1000;i++){
			socket = new Socket(HOST, PORT); // 创建客户端套接字
			System.out.print("第"+i+"次建立链接"); 
			try {
				// 客户端输出流，向服务器发消息
				BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
						socket.getOutputStream()));
				// 客户端输入流，接收服务器消息
				BufferedReader br = new BufferedReader(new InputStreamReader(
						socket.getInputStream()));
				PrintWriter pw = new PrintWriter(bw, true); // 装饰输出流，及时刷新
			String msg="a";
			startTime=System.currentTimeMillis();
			pw.println(msg); // 发送给服务器端
			System.out.print("，第"+i+"次接收到"+br.readLine()); // 输出服务器返回的消息
			long endTime=System.currentTimeMillis();
			toalTime+=(endTime-startTime);

			
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (null != socket) {
					try {
						socket.close();// 断开连接
						System.out.println("，链接成功断开");
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		float averTime=(float)toalTime/1000;
		System.out.println("平均耗时："+averTime+"豪秒");
	}
}