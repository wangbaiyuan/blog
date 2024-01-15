---
title: 一瓶啤酒烫烫烫
tags:
  - C++
url: 1514.html
id: 1514
categories:
  - 算法语言
abbrlink: 24877
date: 2015-11-01 22:36:58
---

现在网上很多人黑程序员，“只有程序员才能听懂的笑话”常常出现在朋友圈，各种娱乐化程序员，极客人有时候也表示很无辜。听人讲起下面这个程序员的笑话，逼格算是比较高了，哈哈！

> 两个字符串走进酒吧。 第一个字符串对服务员说：“给我来一瓶啤酒烫烫烫烫烫烫烫烫烫烫烫烫烫烫烫”。 “请原谅我的朋友，”第二个字符串说：“他忘了加\\0”。

  初听这个所谓笑话的时候感觉莫名奇妙，直到昨天调代码遇到字符数组中出现的情况才明白了一二: [![QQ图片20151101222601](http://baiyuan.wang/wp-content/uploads/2015/11/baiyuan.wang_2015-11-01_22-26-13.png)](http://baiyuan.wang/wp-content/uploads/2015/11/baiyuan.wang_2015-11-01_22-26-13.png) **至于出现烫烫烫的原因，下面是从百度抠下来的解释：** 在用VC写代码时，经常会遇到在栈中申请空间的并且没有被初始化的字符数组就会显示"烫烫烫烫。。。"，虽然是知道编译器对栈中没有初始化的数据会进行默认的初始化工作。如下面的代码：

int main(void)
{
	char x\[4\];
	return 0;
}

代码很简单，就是在栈中申请了一个大小为4个字节的字符数组。 用断点查看X的值，可以发现，“烫烫”出现了： x 0x0012ff60 "烫烫烫烫?" char \[4\]

查看反汇编：
------

 

 1: int main(void)
     2: {
004113A0 55               push        ebp  
004113A1 8B EC            mov         ebp,esp 
004113A3 81 EC CC 00 00 00 sub         esp,0CCh 
004113A9 53               push        ebx  
004113AA 56               push        esi  
004113AB 57               push        edi  
004113AC 8D BD 34 FF FF FF lea         edi,\[ebp-0CCh\] 
004113B2 B9 33 00 00 00   mov         ecx,33h 
004113B7 B8 CC CC CC CC   mov         eax,0CCCCCCCCh 
004113BC F3 AB            rep stos    dword ptr es:\[edi\] 
     3: 	char x\[4\];
     4: 	return 0;
004113BE 33 C0            xor         eax,eax 
     5: }

  简单解释一下关键句的含义： 004113AC 8D BD 34 FF FF FF lea         edi,\[ebp-0CCh\] 将获得的0CCh大小的栈空间首地址赋给edi 004113B2 B9 33 00 00 00   mov         ecx,33h rep的循环次数为33h 004113B7 B8 CC CC CC CC   mov         eax,0CCCCCCCCh eax = 0CCCCCCCCh 004113BC F3 AB            rep stos    dword ptr es:\[edi\] 将栈空间的33H个双字节赋值为0CCCCCCCCh 而0xcccc用汉语表示刚好就是“烫” oxcc正好是中断int 3的指令 起到保护作用

（参考：）
-----

在Debug 模式下，VC 会把未初始化的栈内存全部填成0xcc。会把未初始化的堆内存全部填成0xcd。但是Release 模式下不会有这种附加动作，原来那块内存里是什么就是什么。 未初始化的变量会被系统赋初值为0xCC,超过了ASCII码0-127这个范围，因此这个“字符串”被系统当成了宽字符组成的字符串，即两个字节数据组成一个字符，而0xCCCC表示的宽字符正好是乱码中的那个“烫”字。同理，0Xcdcd就是“屯”字。   [![360截图-171395703](http://baiyuan.wang/wp-content/uploads/2015/11/baiyuan.wang_2015-11-01_22-41-48.jpg)](http://baiyuan.wang/wp-content/uploads/2015/11/baiyuan.wang_2015-11-01_22-41-48.jpg) [![360截图-171437546](http://baiyuan.wang/wp-content/uploads/2015/11/baiyuan.wang_2015-11-01_22-41-53.jpg)](http://baiyuan.wang/wp-content/uploads/2015/11/baiyuan.wang_2015-11-01_22-41-53.jpg)

‘\\0’的含义
--------

‘\\0’在很多编程语言中代表着一段字符的结尾，编译器判断我们字符串到哪个地方结束都是根据'\\0'判断的，如果遇到'\\0',就停止读取字符串，如果一直没有碰到'\\0'，会继续往下找。