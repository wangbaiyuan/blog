---
title: 【5】双目摄像头的实时图像传输-Pcduino平台下的智能小车
tags:
  - IoT
url: 2096.html
id: 2096
categories:
  - 技术
abbrlink: 22200
date: 2018-03-27 20:27:16
---

一、Mjpg-streamer开源库
------------------

由于开发实时视频推送系统，可能会涉及到流媒体服务器的实现，但是通过“MJPG-streamer”开源工具可以快捷地实现。“MJPG-streamer”是成熟的轻量级的视频服务器软件，可以利用它获取摄像头画面然后发布在实时视频服务器。MJPG-streamer采用模块化的设计思路，包括输入模块和输出模块，输入模块定义了输入来源，比如摄像头、文件等等，MJPG-streamer然后将视频通过输出模块输出，比如有http等网络输出，也有文件的本地输出\[8\]。 本文采用支持UVC协议的双目摄像头作为图像数据的输入来源，选用http协议推送视频流，所以涉及的组件有output\_http输出组件和input\_uvc输入组件。通过MJPG-streamer，可以方便地将pcDuino上双目摄像头的视频通过http协议推送。

二、实现与测试
-------

使用MJPG-streamer库开发实时图像传输系统方便高效，其安装命令如下：

sudo apt-get install cmake libjpeg8-dev -f
sudo mkdir -p /home/workspace/mjpg-streamer
cd /home/workspace/mjpg-streamer
sudo git clone https://github.com/jacksonliam/mjpg-streamer.git
cd mjpg-streamer/mjpg-streamer-experimental/
sudo make && sudo make install

安装完毕可以使用命令：

mjpg\_streamer -i "input\_uvc.so -d /dev/video0 -y -r 1280x480 -f 10" -o "output\_http.so -p 8090 -w /var/www/mjpg\_streamer"

mjpg\_streamer安装后可作为系统服务启动，同时配置输入输出参数才能正常工作。在上述命令上涉及以下命令： -i "input\_uvc.so -d /dev/video0 -y -r 1280x480 -f 10"部分是输入参数，

*   so表示使用input_uvc.so作为输入模块
*   -d /dev/video0 定义了访问的摄像头的设备路径为/dev/video0。
*   -r 1280x480 定义了摄像头的分辨率为1280x480
*   -f 定义了实时视频的帧率为每秒10帧
*   -y 表示启用mjpg\_streamer的YUV模式。由于mjpg\_streamer处理的视频数据格式为MJPEG，而本设计采用的摄像头是YUV格式，启用mjpg_streamer的YUV模式就是为了兼容摄像头的视频流格式。

-o "output\_http.so -p 8090 -w /var/www/mjpg\_streamer"部分是输出参数，

*   so表示使用output_http.so作为输出模块
*   -p定义了http输出端口为8090
*   -w 定义了http服务的根目录

在命令行中启动后如下：   [![](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-6.png)](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-6.png) 启动mjpg\_streamer视频服务器后，可以在Chrome浏览器中输入智能车的IP和服务端口测试。mjpg\_streamer默认视频端口是8090，当然也可以在启动参数进行设置。 假设智能车IP为192.168.137.2，则可访问[http://192.168.137.2:8090/?action=stream](http://192.168.137.2:8090/?action=stream)访问动态的视频流，访问[http://192.168.137.2:8090/?action=snapshot](http://192.168.137.2:8090/?action=stream)访问静态的抓拍图片。 当在浏览器访问上面的URL时，浏览器实际上渲染的页面源代码是： <img src=”[http://192.168.137.2:8090/?action=snapshot](http://192.168.137.2:8090/?action=snapshot%20) ”/\> <img src=”[http://192.168.137.2:8090/?action=stream](http://192.168.137.2:8090/?action=stream)”/\> 也就是说浏览器使用了img图片标签显示双目摄像头视频，值得注意的是即使是当action参数为stream时，这个img标签竟然可以持续地、动态地拉取和显示来自与服务器的视频流，这是一件很有趣的现象： [![](http://baiyuan.wang/wp-content/uploads/2018/03/Picture2-1.png)](http://baiyuan.wang/wp-content/uploads/2018/03/Picture2-1.png) 当然，使用img标签显示动态视频流并不是在所有浏览器都得到支持，例如IE就不行。 为了研究img标签显示视频流问题，可使用Chrome调试工具“审查元素”对这个HTTP请求进行分析： [![](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-7.png)](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-7.png) 依上图所示，根据这个HTTP请求的响应头，可以知道其文件扩展名Content-Type(Mime-Type)为multipart/x-mixed-replace。 HTTP超文本协议中，HTTP请求的响应消息由状态行、消息报头、正文组成 \[10\] ，其中消息报头是一些描述响应数据的描述性信息，包括服务器信息、状态码、缓存控制策略等等，其中包括的Content-Type(Mime-Type)是为了告知浏览器当前传输数据的数据格式、类型。 Web服务器在响应客户端的HTTP请求时，返回的数据使用MIME报文格式进行封装。一般来说，一个HTTP响应只能包含一个数据块，但是，MIME有一种特殊的MIME类型：“multipart/mixed”， 这种MIME类型可用一个HTTP响应数据块来表示多个数据块。其中 multipart/x-mixed-replace MIME类型就是 “multipart/mixed”中的一种，其中 “replace”表示每一个新数据块都会代替前一个数据块，这告诉浏览器，这种类型的新数据块不是追加到旧数据块后面，而是替代它\[15\]。本文中浏览器中img标签显示视频流也正是这个原因，它意味着视频图片帧会被不断刷新，最后形成连贯的视频。