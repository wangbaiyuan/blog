---
title: C语言读取串口数据并16进制打印
tags:
  - C++
  - 软件工程
url: 1410.html
id: 1410
categories:
  - 软件开发
abbrlink: 24706
date: 2015-08-05 23:21:49
---

区域控制器串口协议
---------

1、通信格式=\[帧头\]+ \[数据长度\]+ \[指令代码\]+ \[通信内容\]+ \[校验和\]+ \[帧尾\]。 2、数据长度为从帧头至帧尾的所有字节(包含帧头、帧尾)总数； 3、校验和为校验位前面所有字节的异或； 4、RS232 串口通信，波特率 9600，无奇偶校验，8 位数据位，1 位停止位。 5、多字节传送数据时，高位在前，低位在后 [![port](http://wangbaiyuan.cn/wp-content/uploads/2015/08/port.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/08/port.jpg)

关键代码port.cpp
------------

// port.cpp : 定义控制台应用程序的入口点。
//
#include "stdafx.h"
#include <Windows.h>
#include <stdio.h>
HANDLE hCom;
int main(void)
{
	hCom = CreateFile(TEXT("COM1"),//COM1口
		GENERIC\_READ | GENERIC\_WRITE, //允许读和写
		0, //独占方式
		NULL,
		OPEN_EXISTING, //打开而不是创建
		0, //同步方式
		NULL);
	if (hCom == (HANDLE)-1)
	{
		printf("打开COM失败!\\n");
		return FALSE;
	}
	else
	{
		printf("COM打开成功！\\n");
	}
	SetupComm(hCom, 1024, 1024); //输入缓冲区和输出缓冲区的大小都是1024
	COMMTIMEOUTS TimeOuts;
	//设定读超时
	TimeOuts.ReadIntervalTimeout = 1000;
	TimeOuts.ReadTotalTimeoutMultiplier = 5000;
	TimeOuts.ReadTotalTimeoutConstant = 5000;
	//设定写超时
	TimeOuts.WriteTotalTimeoutMultiplier = 5000;
	TimeOuts.WriteTotalTimeoutConstant = 2000;
	SetCommTimeouts(hCom, &TimeOuts); //设置超时
	DCB dcb;
	GetCommState(hCom, &dcb);
	dcb.BaudRate = 9600; //波特率为9600
	dcb.ByteSize = 8; //每个字节有8位
	dcb.Parity = NOPARITY; //无奇偶校验位
	dcb.StopBits = ONE5STOPBITS; //1个停止位
	
	SetCommState(hCom, &dcb);
	DWORD wCount=12;//读取的字节数
	BOOL bReadStat;
	while (1)
	{
		PurgeComm(hCom, PURGE\_TXCLEAR | PURGE\_RXCLEAR); //清空缓冲区
		unsigned char str\[13\] = { 0 };
		printf("%s\\n", str);
		bReadStat = ReadFile(hCom, str,13, &wCount, NULL);
		if (!bReadStat)
		{
			printf("读串口失败!");
			return FALSE;
		}
		else
		{
			str\[12\] = '*';
			for (int i = 0; str\[i\] != '*'; i++){
				printf("%02X ", str\[i\]);
				//printf("%u",str\[i\]);
			}
		}
		//unsigned char a='0';
		//unsigned char b = '0x01';
		if (str\[6\]==0){
			printf(" 无车");

		}
		else if(str\[6\]==1){
			printf(" 有车");
		}
		else
			printf(" 有错");
		printf("\\n");
		Sleep(100);
	}
}