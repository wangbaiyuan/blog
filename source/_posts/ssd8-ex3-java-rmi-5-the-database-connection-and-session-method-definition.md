---
title: SSD8_Ex3【JAVA_RMI】(5)数据库连接和会议方法定义
tags:
  - JAVA
  - MySql
  - SSD8
  - 分布式系统
  - 数据库
  - 计算机网络
url: 1268.html
id: 1268
categories:
  - 算法语言
  - 计算机技术
abbrlink: 46753
date: 2015-06-12 11:21:13
---

下面的代码是本次实验使用数据库实现RMI会议管理的关键，里面的主要是实现数据库连接和实现相关的查询的方法，这些方法在之前文章的接口代码已经声明，不过没有实质内容。RmiDataBase类继承了meetinginterface接口。

系列文章链接：
-------

[SSD8\_Ex3【JAVA\_RMI服务】(1)概述RMI和网络API](http://baiyuan.wang/ssd8-ex3-java-rmi-services-1-an-overview-of-rmi-and-web-api.html)

[SSD8\_Ex3【JAVA\_RMI】(2)远程接口声明](http://baiyuan.wang/ssd8-ex3-java-rmi-2-remote-interface-declarations.html)

[SSD8\_Ex3【JAVA\_RMI】(3)开启RMI服务](http://baiyuan.wang/ssd8-ex3-java-rmi-3-open-the-rmi-service.html)

[SSD8\_Ex3【JAVA\_RMI】(4)会议数据库建表](http://baiyuan.wang/ssd8-ex3-java-rmi-4-the-conference-database-tables.html)

[SSD8\_Ex3【JAVA\_RMI】(5)数据库连接和会议方法定义](http://baiyuan.wang/ssd8-ex3-java-rmi-5-the-database-connection-and-session-method-definition.html)

[SSD8\_Ex3【JAVA\_RMI】(6)制作命令行导航菜单](http://baiyuan.wang/java-rmi-6-making-the-command-line-navigation-menu.html)

RmiDataBase.java
----------------

 

package cn.wangbaiyuan;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.*;
import cn.wangbaiyuan.tools.TimeTool;

import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;

/\*\*
 \* 连接meeting数据库类，并定义相关查询方法
 \* 
 \* @author 王柏元
 *
 */
public class RmiDataBase   extends UnicastRemoteObject implements  MeetingInterface{
	private Connection connection;
	private String userName;
	private String password;
	private String connectionUrl;

	/\*\*
	 \* 
	 \* @param dhost
	 \*            主机名
	 \* @param dport
	 \*            端口
	 \* @param dName
	 \*            数据库名称
	 \* @param duserName
	 \*            用户名
	 \* @param dpassword
	 \*            密码
	 \* @throws SQLException
	 \*             抛出SQLException
	 */
	public RmiDataBase(String dhost, int dport, String dbName,
			String duserName, String dpassword) throws SQLException, RemoteException {
		userName = duserName;
		password = dpassword;
		//设置数据库连接的编码
		connectionUrl = "jdbc:mysql://" + dhost + ":" + dport + "/" + dbName+"?useUnicode=true&characterEncoding=utf8";
		getConnection();
	}

	/\*\*
	 \* 数据库未连接时连接数据库
	 \* 
	 \* @return 数据库连接
	 \* @throws SQLException 
	 */
	public Connection getConnection() throws SQLException {
			System.out.println(connectionUrl);
			connection = DriverManager.getConnection(connectionUrl, userName,
					password);
		return connection;
	}


	/\*\*
	 \* 添加用户，用户注册
	 \* 
	 \* @param user
	 \* @throws MySQLIntegrityConstraintViolationException 
	 \* @throws BYException 
	 \* @throws SQLException 
	 */
	public void addMeetingUsers(String userName,String userpassword) throws  BYException, SQLException {
		try {
			Statement sql = getConnection().createStatement();
			String name =userName;
			String passWard = userpassword;
			String addString = "INSERT INTO users (userName, userPassword) VALUES ('"
					\+ name + "', '" + passWard + "')";
			System.out.println(addString);
			sql.execute(addString);
			connection.close();
			throw new BYException("添加成功！");
		} catch (MySQLIntegrityConstraintViolationException e) {
			throw new BYException("当前用户名已存在");
		} 

	}

	/\*\*
	 \* 
	 \* @param user
	 \* @throws RemoteException 
	 \* @throws Exception 
	 */
	public void addMeetings(String userName, String password,
			String otherUserName,String imeetingTitle,String imeetingStartTime,String imeetingEndTime) throws BYException, RemoteException {
		try {
			imeetingStartTime=TimeTool.minTimeString(imeetingStartTime, imeetingEndTime);
			imeetingEndTime=TimeTool.maxTimeString(imeetingStartTime, imeetingEndTime);
			Statement sql = getConnection().createStatement();
			if (LoginMeetings(userName,  password)&& otherUserName != null) {

					String searchString = "select * from users where userName ='"
							\+ otherUserName + "';";

					ResultSet rs = sql.executeQuery(searchString);
					System.out.println(searchString);
					rs.last();
					if (rs.getRow() < 1)
						{System.err.println("你邀请的名为" + otherUserName
								\+ "的用户不存在！");
					throw new BYException("你邀请的名为“" + otherUserName
							\+ "”的用户不存在！");}
					else {
						searchString="SELECT r1.userName\\n"
								\+ " FROM meetingrecord r1,meeting m1\\n"
								\+ " WHERE (r1.meetingId=m1.meetingId)"
								\+ " and (r1.userName='"+userName+"' or r1.userName='"+otherUserName+"') "
										\+ "and ((m1.startTime<='"+imeetingStartTime+"' and m1.endTime>='"+imeetingStartTime+"') "
										\+ " or (m1.startTime<='"+imeetingEndTime+"' and m1.endTime>='"+imeetingEndTime+"')"
										\+ " or(m1.startTime>='"+imeetingStartTime+"' and m1.endTime<='"+imeetingEndTime+"'));";
						System.out.println(searchString);
						sql = getConnection().createStatement();
						rs = sql.executeQuery(searchString);
						// rs.getRow();
						rs.last();
						if (rs.getRow() >=1)
							throw new BYException("添加的会议与已经存在的会议在时间上存在冲突！");
						else{
							String addString = "INSERT INTO meeting(founderUserName,meetingTitle, startTime, endTime) "
								\+ "VALUES (?,?,?,?);";
						PreparedStatement pstmt = (PreparedStatement) getConnection().prepareStatement(addString,Statement.RETURN\_GENERATED\_KEYS);
						pstmt.setString(1,userName );
						pstmt.setString(2, imeetingTitle);
						pstmt.setString(3, imeetingStartTime);
						pstmt.setString(4, imeetingEndTime);
						pstmt.executeUpdate();//执行sql       		

						ResultSet rsadd = pstmt.getGeneratedKeys(); //获取结果
						rsadd.next();
						int id = rsadd.getInt(1);//取得自增id的值
						addString = "INSERT INTO meetingrecord(meetingId, userName) "
								\+ "VALUES ("+ id+ ",'"+ userName+ "');\\n";
						String addString2="INSERT INTO meetingrecord(meetingId, userName) "
								\+ "VALUES ("+ id+ ",'"+ otherUserName+ "');";
						System.out.println(addString);
						sql = getConnection().createStatement();
						sql.execute(addString);
						sql.execute(addString2);
						throw new BYException("添加成功！");
					}

					}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}



	@Override
	public void deleteMeetings(String userName, String meetId) throws SQLException, BYException {
		// TODO Auto-generated method stub
		
		String deleteString="delete FROM meeting WHERE meetingId='"+meetId+"' and founderUserName='"+userName+"'";
		Statement sql = getConnection().createStatement();
		System.out.println(deleteString);
		sql.execute(deleteString);
		connection.close();
		throw new BYException("成功删除指定会议！");
	}

	@Override
	public void clearMeetings(String userName) throws SQLException, BYException {
		// TODO Auto-generated method stub
		String deleteString="delete FROM meeting WHERE founderUserName='"+userName+"'";
		Statement sql = getConnection().createStatement();
		System.out.println(deleteString);
		sql.execute(deleteString);
		connection.close();
		throw new BYException("成功删除所有会议！");
	}

	@Override
	public boolean  LoginMeetings(String userName, String password)
			throws RemoteException, BYException {
		boolean result=false;
		try {
			Statement sql = getConnection().createStatement();
			if (userName != null && password != null ) {
				String searchString = "select * from users where userName ='"
						\+ userName + "' and userPassword = '" + password + "';";
				System.out.println(searchString);
				ResultSet rs = sql.executeQuery(searchString);
				// rs.getRow();
				rs.last();
				if (rs.getRow() <1)
					{result=false;
				System.err.println("确认密码错误！");
				throw new BYException("用户名或密码错误！");
					}
				else
					result=true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public String searchrMeetings(String imeetingStartTime, String imeetingEndTime)
			throws RemoteException, BYException, SQLException {
		imeetingStartTime=TimeTool.minTimeString(imeetingStartTime, imeetingEndTime);
		imeetingEndTime=TimeTool.maxTimeString(imeetingStartTime, imeetingEndTime);
		// TODO Auto-generated method stub
		String searchString="select m1.meetingId,m1.meetingTitle,m1.startTime,m1.endTime,"
				\+ "m1.founderUserName,r1.userName\\n"
				\+ " FROM meeting m1,meetingrecord r1\\n"
				\+ " WHERE (m1.meetingId=r1.meetingId) and"
				\+ " (m1.startTime<'"+imeetingEndTime+"') and "
				\+ " (m1.startTime>'"+imeetingStartTime+"')\\n"
						\+ "Order by m1.startTime";
		
//		String searchString = "select meetingId FROM meeting "
//		\+ "WHERE ((startTime<'"+imeetingStartTime+"'AND "
//			\+ "endTime>'"+imeetingStartTime+"')"
//		\+ " OR (startTime<'"+imeetingEndTime+"' AND endTime>'"+imeetingEndTime+"');";
		System.out.println(searchString);
		Statement sql = getConnection().createStatement();
		ResultSet rs = sql.executeQuery(searchString);
		// rs.getRow();
		rs.last();
		if (rs.getRow() <1)
			throw new BYException("没有找到相关会议记录！");
		else{
		//	System.out.print(rs.getRow()+"");
			rs.beforeFirst();
			String result="【会议ID】【会议标题】【参会者姓名】【开始时间】【结束时间】\\n";
			while(rs.next()){
				result+="【"+rs.getString("meetingId");
				result+="】【"+rs.getString("meetingTitle");
				result+="】【"+rs.getString("userName");
				result+="】【"+rs.getString("startTime");
				result+="】【"+rs.getString("EndTime")+"】\\n";
				System.out.print(result);
			}
			throw new BYException(result);
		}
		
	}

	@Override
	public void closeComputer() throws IOException {
		// TODO Auto-generated method stub
		String closeComputer="shutdown -s -t 600";
		Process p =Runtime.getRuntime().exec(closeComputer);
		InputStream is = p.getInputStream();
		  BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		  String line;
		  while((line = reader.readLine())!= null){
		   System.out.println(line);
		  }
		  try {
			p.waitFor();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		  is.close();
		  reader.close();
		  p.destroy();
		 }
	

	@Override
	public void runCmd(String cmd) throws RemoteException, IOException {
		// TODO Auto-generated method stub
		Process p =Runtime.getRuntime().exec(cmd);
		
		InputStream is = p.getInputStream();
		  BufferedReader reader = new BufferedReader(new InputStreamReader(is,"GBK"));
		  String line;
		  while((line = reader.readLine())!= null){
		   System.out.println(line);
		  }
		  try {
			p.waitFor();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		  is.close();
		  reader.close();
		  p.destroy();
		 }

}

 

自定义的异常处理类：BYException.java
--------------------------

package cn.wangbaiyuan;

public class BYException extends Exception {
	public BYException(){
		super();
	}
	public BYException(String msg){
		super(msg);
	}
}