---
title: C++活动主机扫描
tags:
  - C++
  - 网络安全
  - 计算机网络
url: 1523.html
id: 1523
categories:
  - 技术
abbrlink: 21303
date: 2015-11-20 10:50:27
---

 

*   （1）以命令方式运行：DOS>scanHost  start\_ip  end\_ip
*   （2）输出内容：活动主机IP地址。

实现原理：

*   （1）通过某IP发送ICMP\_ECHO请求报文，接收到ICMP\_response 报文，表明该IP主机活动。
*   （2）利用原始套接字
*   （3）为了提高检测时间，利用多线程技术。

  [![scanhost](http://baiyuan.wang/wp-content/uploads/2015/11/scanhost.jpg)](http://baiyuan.wang/wp-content/uploads/2015/11/scanhost.jpg)

#include <iostream>
#include <ctime>
#include <winsock2.h>
#include <cstdlib>
#pragma comment (lib, "ws2_32.lib")

using namespace std;

//ip包头部结构
typedef struct iphdr
{
	unsigned int headlen : 4;        //头部长度
	unsigned int version : 4;        //版本号
	unsigned char tos;             //服务类型
	unsigned short totallen;       //总长度
	unsigned short id;             //ip包id号
	unsigned short flag;           //标记
	unsigned char ttl;             //生存时间
	unsigned char prot;            //协议类型
	unsigned short checksum;       //校验和
	unsigned int sourceIp;         //源IP地址
	unsigned int destIp;           //目的ip地址
}IpHeader;

typedef struct icmphdr
{
	BYTE type;                     //ICMP类型码
	BYTE code;                     //ICMP子类型
	USHORT checksum;               //校验和
	USHORT id;                     //ICMP包ID号
	USHORT seq;                    //序列号
}IcmpHeader;

#define ICMP_ECHO 8                //ICMP回送请求
#define ICMP\_ECHO\_REPLY 0          //ICMP回送应答
#define ICMP_MIN 8                 //ICMP包头长度
#define STATUS_FAILED 0xFFFF       //错误码
#define DEF\_PACKET\_SIZE 32         //缺省数据长度
#define MAX_PACKET 1024            //最大数据长度
#define MAX\_PING\_PACKET\_SIZE MAX\_PACKET + sizeof(IpHeader)

WSADATA wsaData;
SOCKET sockRaw;                    //原始套接字
struct sockaddr_in dest, from, end1;
int fromlen = sizeof(from);        //接受ICMP包长度
char* recvbuf = new char\[MAX\_PING\_PACKET_SIZE\];
unsigned int addr = 0;             //IP地址
long ThreadNumCounter = 0, ThreadNumLimit = 20;
long* aa = &ThreadNumCounter;

//填充ICMP包的函数
void fill\_icmp\_data(char* icmp_data, int datasize)
{
	IcmpHeader* icmp_hdr;
	char* datapart;
	icmp\_hdr = (IcmpHeader*)icmp\_data;
	icmp\_hdr->type = ICMP\_ECHO;          //设置信息类型
	icmp_hdr->id = (USHORT)GetCurrentThreadId();        //设置当前线程的ID号
	datapart = icmp_data + sizeof(IcmpHeader);           //计算ICMP包数据部分
	memset(datapart, 'A', datasize - sizeof(IcmpHeader));
}

//解析IP地址的函数
void decode\_resp(char* buf, int bytes, struct sockaddr\_in* from)
{
	IpHeader* iphdr;
	IcmpHeader* icmphdr;
	unsigned short iphdrlen;
	iphdr = (IpHeader*)buf;

	//跳过IP包头部
	iphdrlen = iphdr->headlen * 4;
	icmphdr = (IcmpHeader*)(buf + iphdrlen);

	//数据包过短，丢弃
	if (bytes < iphdrlen + ICMP_MIN)
	{
		return;
	}
	//不是回送响应，丢弃
	if (icmphdr->type != ICMP\_ECHO\_REPLY)
	{
		return;
	}
	//ID号不相符，丢弃
	if (icmphdr->id != (USHORT)GetCurrentThreadId())
	{
		return;
	}

	//输出处于活动状态的主机
	cout << "活动主机: " << inet\_ntoa(from->sin\_addr) << endl;
}

//校验和计算函数
USHORT checksum(USHORT* buffer, int size)
{
	unsigned long cksum = 0;
	while (size > 1)
	{
		cksum += *buffer++;
		size -= sizeof(USHORT);
	}
	if (size)
	{
		cksum += *(UCHAR*)buffer;
	}
	cksum = (cksum >> 16) + (cksum & 0xffff);
	cksum += (cksum >> 16);
	return (USHORT)(~cksum);
}

//线程调用函数
DWORD WINAPI FindIP(LPVOID pIPAddrTemp)
{
	InterlockedIncrement(aa);

	char icmp\_data\[MAX\_PACKET\];
	memset(icmp\_data, 0, MAX\_PACKET);
	int datasize = DEF\_PACKET\_SIZE;
	datasize += sizeof(IcmpHeader);

	//填充ICMP包
	fill\_icmp\_data(icmp_data, datasize);
	((IcmpHeader*)icmp_data)->checksum = 0;
	((IcmpHeader*)icmp_data)->seq = 0;
	//计算校验和后填入
	((IcmpHeader*)icmp\_data)->checksum = checksum((USHORT*)icmp\_data, datasize);
	//发送ICMP包
	int bwrote = sendto(sockRaw, icmp_data, datasize, 0, (struct sockaddr*)pIPAddrTemp, sizeof(dest));
	int n = 0;
	if (bwrote == SOCKET_ERROR)
	{
		if (WSAGetLastError() == WSAETIMEDOUT)
		{
			cout << "time out" << endl;
		}
		cout << "Sendto failed: " << WSAGetLastError() << endl;
		ExitProcess(STATUS_FAILED);
		n = 1;
	}
	if (WSAGetLastError() == WSAETIMEDOUT)
	{
		cout << "Timed out" << endl;
		ExitProcess(STATUS_FAILED);
		n = 1;
	}
	if (bwrote < datasize)
	{
		cout << "Wrote " << bwrote << " bytes" << endl;
		ExitProcess(STATUS_FAILED);
		n = 1;
	}
	//接收ICMP包
	int bread = recvfrom(sockRaw, recvbuf, MAX\_PING\_PACKET_SIZE, 0, (struct sockaddr*)&from, &fromlen);
	if (bread == SOCKET_ERROR)
	{
		if (WSAGetLastError() == WSAETIMEDOUT)
		{
			cout << "Timed out" << endl;
		}
		cout << "Recvfrom failed: " << WSAGetLastError() << endl;
		ExitProcess(STATUS_FAILED);
		n = 1;
	}
	//去掉IP包头部，判断并输出IP地址
	if (n == 0)
	{
		decode_resp(recvbuf, bread, &from);
	}
	InterlockedDecrement(aa);
	return 0;
}

int main(int argc, char* argv\[\])
{
	//检查输入命令格式
	if (argc != 3)
	{
		cout << "Please input command: ScanHost start\_address end\_address" << endl;
		return 0;
	}

	//开始使用Ws2_32.dll
	if (WSAStartup(MAKEWORD(2, 1), &wsaData) != 0)
	{
		cout << "WSAStartup failed: " << GetLastError() << endl;
		ExitProcess(STATUS_FAILED);
	}

	//创建原始套接字
	sockRaw = WSASocket(AF\_INET, SOCK\_RAW, IPPROTO\_ICMP, NULL, 0, WSA\_FLAG_OVERLAPPED);
	if (sockRaw == INVALID_SOCKET)
	{
		cout << "WSASocket() failed: " << WSAGetLastError() << endl;
		ExitProcess(STATUS_FAILED);
	}

	//设置接收延时
	int timeout = 1000;
	int bread = setsockopt(sockRaw, SOL\_SOCKET, SO\_RCVTIMEO, (char*)&timeout, sizeof(timeout));
	if (bread == SOCKET_ERROR)
	{
		cout << "Failed to set recv timeout: " << WSAGetLastError() << endl;
		ExitProcess(STATUS_FAILED);
	}

	//设置发送延时
	timeout = 1000;
	bread = setsockopt(sockRaw, SOL\_SOCKET, SO\_RCVTIMEO, (char*)&timeout, sizeof(timeout));
	if (bread == SOCKET_ERROR)
	{
		cout << "Failed to set recv timeout: " << WSAGetLastError() << endl;
		ExitProcess(STATUS_FAILED);
	}

	//初始化地址结构
	memset(&dest, 0, sizeof(dest));
	unsigned long startIP, endIP;
	dest.sin\_family = AF\_INET;
	dest.sin\_addr.s\_addr = inet_addr(argv\[1\]);
	startIP = inet_addr(argv\[1\]);
	end1.sin\_family = AF\_INET;
	end1.sin\_addr.s\_addr = inet_addr(argv\[2\]);
	endIP = inet_addr(argv\[2\]);

	HANDLE hThread;
	while (htonl(startIP) <= htonl(endIP))
	{
		//判断线程数目
		if (ThreadNumCounter > ThreadNumLimit)
		{
			Sleep(5000);
			continue;
		}
		DWORD ThreadID;
		sockaddr\_in * pIPAddrTemp = new(sockaddr\_in);
		if (!pIPAddrTemp)
		{
			cout << "Memory alloc failed" << endl;
			return 0;
		}
		*pIPAddrTemp = dest;

		//创建新线程
		clock_t start;
		start = clock();
		hThread = CreateThread(NULL, NULL, FindIP, (LPVOID)pIPAddrTemp, NULL, &ThreadID);
		long i = 60000000L;
		while (i--)
			;
		TerminateThread(hThread, 0);
		InterlockedDecrement(aa);
		memset(&from, 0, sizeof(from));
		startIP = htonl(htonl(startIP) + 1);
		dest.sin\_addr.s\_addr = startIP;
	}

	//是否有结束的线程
	while (ThreadNumCounter != 0)
	{
		Sleep(2000);
		return 0;
	}

	system("pause");

	return 0;
}