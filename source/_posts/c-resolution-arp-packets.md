---
title: C++解析ARP数据包（可选网卡）
tags:
  - C++
  - 网络安全
url: 1522.html
id: 1522
categories:
  - 技术
abbrlink: 20215
date: 2015-11-17 15:47:29
---

在网络通讯时，源主机的应用程序知道目的主机的IP地址和端口号，却不知道目的主机的硬件地址，而数据包首先是被网卡接收到再去处理上层协议的，如果接收到的数据包的硬件地址与本机不符，则直接丢弃。因此在通讯前必须获得目的主机的硬件地址。ARP协议就起到这个作用。源主机发出ARP请求，询问“IP地址是192.168.0.1的主机的硬件地址是多少”，并将这个请求广播到本地网段（以太网帧首部的硬件地址填FF:FF:FF:FF:FF:FF表示广播），目的主机接收到广播的ARP请求，发现其中的IP地址与本机相符，则发送一个ARP应答数据包给源主机，将自己的硬件地址填写在应答包中。

每台主机都维护一个ARP缓存表，可以用arp -a命令查看。缓存表中的表项有过期时间（一般为20分钟），如果20分钟内没有再次使用某个表项，则该表项失效，下次还要发ARP请求来获得目的主机的硬件地址。 本项目是基于win cap的，要想成功运行本代码，你需要下载安装win cap以及WpdPack并在visual studio中配置wincap的库。

[![arp](http://baiyuan.wang/wp-content/uploads/2015/11/arp.png)](http://baiyuan.wang/wp-content/uploads/2015/11/arp.png)

// ParseArp.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include<vector>
#include<conio.h>
#include<iostream>
#include<fstream>
#include<iomanip>
#include "pcap.h"
#include<winsock2.h>
using namespace std;
#pragma comment(lib,"ws2_32.lib")
#pragma comment(lib,"wpcap.lib")
//定义ARP包数据
struct arppkt
{
	unsigned short hdtyp;              //硬件类型
	unsigned short protyp;             //协议类型
	unsigned char hdsize;              //硬件地址长度
	unsigned char prosize;             //协议地址长度
	unsigned short op;                //（操作类型）操作值:   ARP/RARP
	u_char smac\[6\];                  //源MAC地址
	u_char sip\[4\];                    //源IP地址
	u_char dmac\[6\];                  //目的MAC地址
	u_char dip\[4\];                    //目的IP地址
};
void packet\_handler(const pcap\_pkthdr \*header, const u\_char \*pkt\_data, ostream& out)
{
	//从ARP包中找到头部位置
	arppkt* arph = (arppkt *)(pkt_data + 14);
	//输出源IP地址
	for (int i = 0; i<3; i++)
		out << int(arph->sip\[i\]) << '.';
	out.setf(ios::left);
	out << setw(3) << int(arph->sip\[3\]) << "  ";
	out.unsetf(ios::left);
	//输出源MAC地址
	char oldfillchar = out.fill('0');
	out.setf(ios::uppercase);
	for (int i = 0; i<5; i++)
		out << hex << setw(2) << int(arph->smac\[i\]) << '-';
	out << hex << setw(2) << int(arph->smac\[5\]) << "  ";
	out.fill(oldfillchar);
	out.unsetf(ios::hex | ios::uppercase);
	//输出目的IP地址
	for (int i = 0; i<3; i++)
		out << int(arph->dip\[i\]) << '.';
	out.unsetf(ios::left);
	out << setw(3) << int(arph->dip\[3\]) << ' ';
	out.unsetf(ios::left);
	//输出目的MAC地址
	out.fill('0');
	out.setf(ios::uppercase);
	for (int i = 0; i<5; i++)
		out << hex << setw(2) << int(arph->dmac\[i\]) << '-';
	out << hex << setw(2) << int(arph->dmac\[5\]) << " ";
	out.fill(oldfillchar);
	out.unsetf(ios::hex | ios::uppercase);
	//输出操作类型
	out << ntohs(arph->op) << "   ";
	//输出操作时间
	time_t t;
	time(&t);
	out << ctime(&t);

	out.fill(oldfillchar);
	out << endl;
}
void main(int argc, char *argv\[\])//命令行参数
{
	//检查输入命令格式
	if (argc != 2)
	{
		cout << "Please  input  command: ParseArp output_file" << endl;


		return;
	}
	//初始化网络设备相关参数
	pcap\_if\_t *alldevs;
	pcap\_if\_t *d;
	pcap_t *adhandle;
	char errbuf\[PCAP\_ERRBUF\_SIZE\];
	u_int netmask;
	char packet_filter\[\] = "ether proto \\\arp";
	struct bpf_program fcode;
	struct pcap_pkthdr *header;
	const u\_char *pkt\_data;
	vector<pcap\_if\_t* > devices;
	vector<pcap_t *> adhandles;
	//获取网络设备列表
	if (pcap_findalldevs(&alldevs, errbuf) == -1)
	{
		cout << "Error in pcap_find　all　devs:" << errbuf;
		return;
	}
	//选取一个Ethernet网卡
	for (d = alldevs; d!=NULL; d = d->next)
	{
		//    网卡设为混杂模式，接收所有帧
		if ((adhandle = pcap\_open\_live(d->name, 1000, 1, 300, errbuf)) == NULL)
		{
			cout << "\\nUnable to open the adapter.";
			pcap_freealldevs(alldevs);
			return;
		}
		//检查数据链路是否为Ethernet
		if (pcap\_datalink(adhandle) == DLT\_EN10MB&&d->addresses != NULL){
	devices.push_back(d);
	adhandles.push_back(adhandle);
		}
		
	}

	vector<pcap\_if\_t *>::iterator it;
	for (int i = 0; i < devices.size(); i++)
		cout << "网卡：" << i + 1 << ":" << devices\[i\]->description << endl;

	int i = 0;
	cout << "请输入网卡";
	cin >> i;
	//获得子网掩码
	d = devices\[i - 1\];
	netmask = ((sockaddr\_in *)(d->addresses->netmask))->sin\_addr.S\_un.S\_addr;
	//编译过滤器，只捕获ARP包
	if (pcap\_compile(adhandles\[i - 1\], &fcode, packet\_filter, 1, netmask)<0)
	{
		cout << "\\nUnable to compile the packet filter.Check the syntax.\\n";
		pcap_freealldevs(alldevs);
		return;
	}
	//设置过滤器
	if (pcap_setfilter(adhandles\[i - 1\], &fcode)<0)
	{
		cout << "\\nError setting the filter.\\n";
		pcap_freealldevs(alldevs);
		return;
	}
	//显示提示信息及每项含义
	cout << "listening on " << d->description << "..." << endl << endl;

	ofstream fout(argv\[1\], ios::app);   //日志记录文件
	//为了查看日志时的方便，其中加入了日期记录
	time_t t;
	time(&t);
	fout.seekp(0, ios::end);
	if (fout.tellp())
		fout << endl;
	fout << "\\t\\tARP request(1)/reply(2) on" << ctime(&t);
	cout << "Sour Ip Addr" << "  " << "Sour MAC Address" << "   " << "Des Ip Addr" << "   " << "Des MAC Address" << "   " << "OP" << "   " << "Time" << endl;
	fout << "Sour Ip Addr" << "  " << "Sour MAC Address" << "   " << "Des Ip Addr" << "   " << "Des MAC Address" << "   " << "OP" << "   " << "Time" << endl;
	//释放设备列表
	pcap_freealldevs(alldevs);
	//开始截获ARP包
	int result;
	while ((result = pcap\_next\_ex(adhandles\[i-1\], &header, &pkt_data)) >= 0)
	{   //循环解析ARP数据包
		if (result == 0)
			continue;
		//解析ARP包，结果输出到屏幕与文件
		packet\_handler(header, pkt\_data, cout);
		packet\_handler(header, pkt\_data, fout);
	}
}