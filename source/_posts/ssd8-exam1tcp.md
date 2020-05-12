---
title: 'SSD8_Exam1[TCP Chat Server]'
tags:
  - SSD8
url: 2374.html
id: 2374
categories:
  - Algorithm language
abbrlink: 62920
date: 2015-05-29 12:55:44
---

This is Exam1 for SSD8 practice. It is expected that the extreme guests will write a series. The update frequency will be synchronized with the 2013 level progress of the NWPU Network and Distributed Computing Lab.Click on the tag or search for "SSD8" on this site to get updated SSD8 answers.The previous exercise: SSD8_EX2 \[UDP vs TCP\]; if you want to continue tracking SSD practice, it is recommended to subscribe to this site. This exercise uses a multi-threaded, TCP communication protocol to create a multi-user chat software, which broadcasts user online and offline messages and normal exchange information to all connected users.The main idea of ​​the very guest is to create a hash map of the socket, traverse the hashmap and communicate with many clients.

First, the experimental topics
------------------------------

According to the list of chat protocols given below, use Java sockets to implement a simple TCP chat server.The server should have the following features: Reading information from each client (2); Can forward the read information to all clients; 3. Obtain the port information through the command line; 4. Listen for specific port (port) request information; 5. Ability to handle concurrent connections, which requires the use of multiple threads to handle each connection. A graphical client GUIClient.jar has been provided in the question.

### **GUIClient.jar decompiled file in "Related Downloads", which is the client's source code**

Second, Chat Server server code
-------------------------------

### Chat Server.java:

Package cn.wangbaiyuan;

Import java.io.DataInputStream;
Import java.io.DataOutputStream;
Import java.io.IOException;
Import java.io.PrintWriter;
Import java.io.UnsupportedEncodingException;
Import java.net.ServerSocket;
Import java.net.Socket;
Import java.text.SimpleDateFormat;
Import java.util.Calendar;
Import java.util.Date;
Import java.util.HashMap;
Import java.util.Iterator;
Import java.util.NoSuchElementException;
Import java.util.StringTokenizer;

/\*\*
 \* ChatServer class to start the server service
 \* 
 \* @author <a href="http://wangbaiyuan">Wang Baiyuan</a>
 *The code is <a href="http://wangbaiyuan">Wang Baiyuan</a> original and it is released synchronously in
 *<a href="http://wangbaiyuan.cn/ssd8-exam1%e3%80%90tcp-chat-server%e3%80%91.html">Wang Baiyuan's blog</a> reproduced please indicate the source
 */
Public class ChatServer {
	Private static HashMap<String, Socket> serverSocketMap = new HashMap<String, Socket>();
	ServerSocket serverSocket;
	Private int port = 1234;
/\*\*
 \* Start chat server service
 \* @throws IOException throws IOException
 */
	Public ChatServer() throws IOException {
		serverSocket = new ServerSocket(port);
		System.out.println("ChatServer server startup...");
	}

	Public void service() {
		While (true) {
			Socket socket = null;
			Try {
				Socket = serverSocket.accept();
				Thread work = new Thread(new Handler(socket)); // Create worker thread for client connection
				Work.start();
			} Catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/\*\*
	 \* Handle child thread classes
 \* @author <a href="http://wangbaiyuan">Wang Baiyuan</a>
 *The code is <a href="http://wangbaiyuan">Wang Baiyuan</a> original and it is released synchronously in
 *<a href="http://wangbaiyuan.cn/ssd8-exam1%e3%80%90tcp-chat-server%e3%80%91.html">Wang Baiyuan's blog</a> reproduced please indicate the source
 */
	Public class Handler implements Runnable { // thread responsible for communicating with a single client
		Private Socket socket;
		DataInputStream br;
		DataOutputStream bw;
		PrintWriter pw;

		Public Handler(Socket socket) throws UnsupportedEncodingException,
				IOException {
			This.socket = socket;
		}

		@SuppressWarnings("deprecation")
		/\*\*
		 \* Initialize when there is a new connection and broadcast information to connected users
		 \* @throws IOException
		 */
		Public void initStream() throws IOException { // Initialize input and output stream object methods
			Br = new DataInputStream(socket.getInputStream());
			Bw = new DataOutputStream(socket.getOutputStream());
			String str1 = br.readUTF();
			System.out.println(str1);
			StringTokenizer localStringTokenizer1 = new StringTokenizer(str1,
					"^");//split the string
			Try {
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
			} Catch (NoSuchElementException localNoSuchElementException) {
				System.out.println("GUIClient: No Such Element Exception");
			}
		}

		/\*\*
		 \* Mass messaging
		 \* @param name
		 \* News source of group messaging - nickname
		 \* @param message
		 \* Bulk news message
		 \* @throws IOException
		 */
		Public void sentoAll(String name, String message) throws IOException {
			Iterator iterator = serverSocketMap.keySet().iterator();
			While (iterator.hasNext()) {
				String key = (String) iterator.next();
				Socket received = serverSocketMap.get(key);
				Bw = new DataOutputStream(received.getOutputStream());
				bw.writeUTF(message);

			}
		}
/\*\*
 \* Get current time
 \* @return current time
 */
		Public String nowTime() {
			Calendar c = Calendar.getInstance();
			c.setTimeInMillis(new Date().getTime());
			SimpleDateFormat dateFormat = new SimpleDateFormat(
					"yy-MM-dd HH:mm:ss");
			Return dateFormat.format(c.getTime());
		}

		/\*\*
		 \* Execute sending content
		 */
		Public void run() { // Execution contents
			Try {
				System.out.println(socket.getInetAddress() + "joined group chat");
				initStream(); // Initialize input/output stream object
				String info = null;
				While (null != (info = br.readUTF())) {
					StringTokenizer localStringTokenizer1 = new StringTokenizer(
							Info, "^");
					Try {
						String head = localStringTokenizer1.nextToken();
						String nameIP = localStringTokenizer1.nextToken();
						StringTokenizer localStringTokenizer2 = new StringTokenizer(
								nameIP, "@");
						String name = localStringTokenizer2.nextToken();
						String ip = localStringTokenizer2.nextToken();
						String member = localStringTokenizer1.nextToken();
						String message = localStringTokenizer1.nextToken();
						If (head.equals("m")) {
							String message_exchange = "m^" + name
									\+ "@10.22.56.186^all^" + message
									\+ "___\[time:" + nowTime() + "\]^";
							sentoAll(name, message_exchange);

						} Else if (head.equals("j")) {
							String message_join = "j^system@10.22.56.186^all^"
									\+ name + " has joined from " + ip
									\+ "___\[time:" + nowTime() + "\]^";
							sentoAll(name, message_join);

						} Else if (head.equals("p")) {
							String message_exit = "m^system@10.22.56.186^all^"
									\+ name + " has leaved! ___\[time:"
									\+ nowTime() + "\]^";
							serverSocketMap.remove(name);
							sentoAll(name, message_exit);
						}
					} Catch (NoSuchElementException localNoSuchElementException) {
						System.out
								.println("GUIClient: No Such Element Exception");
					}
					System.out.println(info);
				}
			} Catch (IOException e) {
				e.printStackTrace();
			} finally {
				If (null != socket) {
					Try {
						Socket.close();
					} Catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	Public static void main(String\[\] args) throws IOException {
		New ChatServer().service(); // Start the service
	}
}