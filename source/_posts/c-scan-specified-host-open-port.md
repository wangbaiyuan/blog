---
title: C++扫描指定主机开放的端口
tags:
  - C++
  - 网络安全
  - 计算机网络
url: 1524.html
id: 1524
categories:
  - 计算机技术
abbrlink: 18774
date: 2015-11-19 20:55:41
---

C++扫描指定主机开放的端口，OS提供了connect()系统调用，用于与远程主机某端口建立连接，如果远程主机该端口处于帧听状态，则connect()连接成功；否则说明该端口关闭。   [![scanhosts](http://baiyuan.wang/wp-content/uploads/2015/11/scanhosts.jpg)](http://baiyuan.wang/wp-content/uploads/2015/11/scanhosts.jpg)

// ScanPorts.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include<iostream>
using namespace std;
#include<WinSock2.h>
#pragma comment (lib,"ws2_32.lib")
#define STATUS_FALIED 0xFFFF
unsigned long serverIP;
long MaxThread = 200;
long ThreadCount = 0;
long *aa = &ThreadCount;

//扫描端口的线程
DWORD WINAPI ScanPort(LPVOID lpParam){
	short Port = *(short*)lpParam;
	InterlockedIncrement(aa);
	//创建流式套接字
	SOCKET sock = socket(AF\_INET, SOCK\_STREAM,0);
	if (sock == INVALID_SOCKET){
		cout << "创建套接字失败！" << endl;
		return 0;

	}
	else{
		//填充服务器地址
		sockaddr_in severAddr;
		severAddr.sin\_family = AF\_INET;
		severAddr.sin_port = htons(Port);
		severAddr.sin\_addr.S\_un.S_addr = serverIP;
		//判断此机器是否打开
		connect(sock, (sockaddr*)&severAddr, sizeof(severAddr));
		struct fd_set write;
		FD_ZERO(&write);
		FD_SET(sock, &write);
		//初始化超时时间
		struct timeval timeout;
		timeout.tv_sec = 100 / 1000;
		timeout.tv_usec = 0;
		if (select(0,NULL,&write,NULL,&timeout)>0)
		{
			cout << Port <<",";
		};
		closesocket(sock);


	}

	InterlockedDecrement(aa);
	return 0;
}

void main(int argc, char *argv\[\])
{
	if (argc != 2){
		cout << "请输入目的主机IP地址" << endl;
	
	}
	//建立与socket库的绑定
	WSADATA WSAData;
	if (WSAStartup(MAKEWORD(2, 2), &WSAData) != 0)
	{
		cout << "WSAStartup falied!" << GetLastError() << endl;
		ExitProcess(STATUS_FALIED);
	}
	serverIP = inet_addr(argv\[1\]);
	cout << "下列端口已开放：" << endl;
	for (int i = 1; i < 1024; i++){
		//超过最大允许线程数等待
		while (ThreadCount >= MaxThread)
			Sleep(10);
		//创建线程，扫描端口
	DWORD ThreadID;
	CreateThread(NULL, 0, ScanPort, (LPVOID)new short(i), 0, &ThreadID);
	}
	//还有没有结束的线程，等待
	while (ThreadCount>0)
		Sleep(50);

	WSACleanup();

}