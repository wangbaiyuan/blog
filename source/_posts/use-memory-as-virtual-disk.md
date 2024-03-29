---
title: 使用内存做虚拟磁盘
url: 1405.html
id: 1405
categories:
  - 技术
abbrlink: 28672
date: 2015-08-14 11:51:35
tags: ''
---

电脑内存盘有多大
--------

使用电脑内存当硬盘来使用将极大地提高程序运行、文件读写的速度，为了有一个直观的了解，极客人使用磁盘速度测试软件测试自己的内存盘（大小为1G）和机械硬盘分区（大小为30G），测试效果如下： [![virtual-disk](http://baiyuan.wang/wp-content/uploads/2015/11/virtual-disk.jpg)](http://baiyuan.wang/wp-content/uploads/2015/11/virtual-disk.jpg) 对比之下，内存和机械硬盘的速度判若云泥，我就发图不解释。

内存的特点
-----

电脑程序一般存储在磁盘中，运行的时候数据会从磁盘读取、存写在内存中，然后CPU处理内存中的数据。由于CPU处理速度较快，磁盘无法满足这样的速度，所以需要将数据中转到高速度的内存中去。通过CPU反复处理数据必然也要频繁读写内存，内存同时对CPU的数据读写请求给予雷霆万钧的响应。 因此，内存的特点除了高速，还有读写频繁、响应速度快。至于虚拟磁盘怎样制作，可以百度关键词“大内存怎样制作虚拟硬盘”。

怎样充分利用虚拟磁盘（内存盘）
---------------

正因为内存具有上述特点，使用内存做虚拟磁盘我们也要把它用在刀刃上。我们不会用虚拟内存存储电影音乐，因为磁盘的速度完全可以满足播放电影音乐的要求（你一般不会发现你把电影保存在本地播放时出现卡顿），同时内存容量小、价格昂贵，用它存电影音乐不太现实。 举电影音乐的例子是说我们不要把读写速度要求不大、大容量的数据放在虚拟硬盘上。那哪些数据对读写速度要求较高且文件体量并不大呢？

### 1.系统、浏览器及其他应用程序缓存

不管你懂不懂什么是缓存，但如果你经常使用电脑管家类软件清理电脑垃圾，对“系统、浏览器及其他应用程序缓存”这些名词必定不会感到陌生。 [![cache](http://baiyuan.wang/wp-content/uploads/2015/11/cache.jpg)](http://baiyuan.wang/wp-content/uploads/2015/11/cache.jpg) 缓存一般是系统和应用程序访问最活跃的文件，同时会产生大量的磁盘碎片（不懂自行百度），而且是读写速度要求也很高。所以把缓存放在内存盘除了提高响应速度，还可以减少对磁盘的伤害。 怎样把缓存放在虚拟磁盘，你可以百度“怎样修改浏览器缓存目录”、“怎样修改XX软件的缓存文件存放位置”

### 2.临时文件

临时文件会带来较多的磁盘碎片，较多的磁盘碎片对磁盘有一定伤害，修改临时文件目录的方法是修改系统环境变量。将环境变量中temp和TMP对应的值改为虚拟磁盘的地址。 右键计算机-属性-高级系统设置-环境变量。  

### 3.软件开发中的项目文件

程序员在调试编译程序时会调用大量的项目文件，磁盘的速度往往是拖累编译速度的罪魁祸首，在没有使用固态硬盘的时候使用虚拟磁盘存放这些文件将会大幅提高编译速度，但是平时存放不要放在虚拟磁盘里，下面是原因：

4.风险
----

内存具有数据易失性，如果电脑意外断电虚拟磁盘里的文件可能将会全部丢失，项目文件只可放在里面编译，如果平时存放其内，可能几天的心血因为突如其来的断电归于虚无。 所以你可以看到，除了项目文件，上面的缓存、临时文件往往是你可有可无的文件，意外丢失也无关紧要，就权当帮你清除了一下电脑垃圾。