---
title: Ruby解析bmp文件及图片处理算法（一）
tags:
  - ruby
url: 1833.html
id: 1833
categories:
  - 算法语言
abbrlink: 16972
date: 2016-12-30 14:37:26
---

一、BMP文件格式详解（BMP file format）
----------------------------

BMP文件格式，又称为Bitmap（位图）或是DIB(Device-Independent Device，设备无关位图)，是Windows系统中广泛使用的图像文件格式 下面以Notepad++为分析工具，结合Windows的位图[数据结构](http://lib.csdn.net/base/datastructure)对BMP文件格式进行一个深度的剖析。 BMP文件的数据按照从文件头开始的先后顺序分为四个部分： **bmp文件头(bmp file header)：**提供文件的格式、大小等信息 **位图信息头(bitmap information)：**提供图像数据的尺寸、位平面数、压缩方式、颜色索引等信息 **调色板(color palette)：** 可选，如使用索引来表示图像，调色板就是索引与其对应的颜色的映射表 Ø **位图数据(bitmap data)：**就是图像数据啦^_^ 下面结合Windows结构体的定义，通过一个表来分析这四个部分。

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143602111.jpg)

BMP文件数据结构

我们一般见到的图像以24位图像为主，即R、G、B三种颜色各用8个bit来表示，这样的图像我们称为真彩色，这种情况下是不需要调色板的，也就是所位图信息头后面紧跟的就是位图数据了。因此，我们常常见到有这样一种说法：位图文件从文件头开始偏移54个字节就是位图数据了，这其实说的是24或32位图的情况。这也就解释了我们按照这种程序写出来的程序为什么对某些位图文件没用了。

### BMP文件头数据结构

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143602218.jpg)

Paste_Image.png

### 位图信息头数据结构

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143602311.jpg)

位图信息头数据结构

### **位图数据**

每个像素占一个字节，取得这个字节后，以该字节为索引查询相应的颜色，并显示到相应的显示设备上就可以了。 注意：由于位图信息头中的图像高度是正数，所以位图数据在文件中的排列顺序是**从左下角到右上角，以行为主序排列的。**

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143602417.jpg)

也即我们见到的第一个像素60是图像最左下角的数据，第二个人像素60为图像最后一行第二列的数据，…一直到最后一行的最后一列数据，后面紧接的是倒数第二行的第一列的数据，依此类推。

*   如果图像是24位或是32位数据的位图的话，位图数据区就不是索引而是实际的像素值了。下面说明一下，此时位图数据区的每个像素的RGB颜色阵列排布：
*   24位RGB按照BGR的顺序来存储每个像素的各颜色通道的值，一个像素的所有颜色分量值都存完后才存下一个下一个像素，不进行交织存储。
*   32位数据按照BGRA的顺序存储，其余与24位位图的方式一样。 像素的排布规则与前述一致。

**对齐规则** 讲完了像素的排列规则以及各像素的颜色分量的排列规则，最后我们谈谈数据的对齐规则。我们知道Windows默认的扫描的最小单位是4字节，如果数据对齐满足这个值的话对于数据的获取速度等都是有很大的增益的。因此，BMP图像顺应了这个要求，要求每行的数据的长度必须是4的倍数，如果不够需要进行比特填充（以0填充），这样可以达到按行的快速存取。这时，位图数据区的大小就未必是 图片宽×每像素字节数×图片高 能表示的了，因为每行可能还需要进行比特填充。 填充后的每行的字节数为：

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143603516.jpg)

，其中BPP（Bits Per Pixel）为每像素的比特数。 在程序中，我们可以表示为： **int iLineByteCnt = (((m\_iImageWidth * m\_iBitsPerPixel) + 31) >> 5) << 2;** 这样，位图数据区的大小为： **m\_iImageDataSize = iLineByteCnt * m\_iImageHeight;** 我们在扫描完一行数据后，也可能接下来的数据并不是下一行的数据，可能需要跳过一段填充数据： **skip = 4 - ((m\_iImageWidth * m\_iBitsPerPixel)>>3) & 3;**

二、Ruby实现BMP图片的解析
----------------

根据上面的BMP图片格式的介绍，我可以写出以下Ruby代码。

    @file = File.open(file, "rb+")
    @bitMapFileHeader = @file.read(14).unpack('a2LS2L')

    @type=@bitMapFileHeader\[0\] #文件类型，BM：BMP图片

    if @type!="BM"
      puts "不是BMP图片"
      exit
    end

    @size=@bitMapFileHeader\[1\] #文件大小
    @offBits=@bitMapFileHeader\[4\] #图像数据的偏移字节
    @bitMapInfoHeader = @file.read(40).unpack('L3S2L6')

    @infoSize=@bitMapInfoHeader\[0\] #图片信息字段大小
    @width=@bitMapInfoHeader\[1\] #图片宽度
    @height=@bitMapInfoHeader\[2\] #图片高度
    @planes=@bitMapInfoHeader\[3\] #平面数
    @bitCountPerPixel=@bitMapInfoHeader\[4\] #图片位数
    @compression=@bitMapInfoHeader\[5\]
    @imageDataSize=@bitMapInfoHeader\[6\] #图片数据段大小
    @xPelsPerMeter=@bitMapInfoHeader\[7\]
    @yPelsPerMeter=@bitMapInfoHeader\[8\]
    @ClrUsed=@bitMapInfoHeader\[9\]
    @ClrImportant=@bitMapInfoHeader\[10\]
    @skipByteALine = 4 - ((@width * @bitCountPerPixel)>>3) & 3
    if @bitCountPerPixel == 24

      iLineByteCnt = (((@width * @bitCountPerPixel) + 31) >> 5) << 2
      @file.seek @offBits
      @imageDataArray= @file.read(@imageDataSize).unpack("C*")
    end

  file对象中的read(length)是从文件指针开始读出length个字节的数据，数据类型是字符串，通过unpack函数，我们可以通过传入unpack参数解析出bmp图片的数据结构。 以`@file.read(14).unpack('a2LS2L')`为例，根据上面的BMP文件数据结构的分析，read(14)是读出bmp文件的前14个字节的文件头，参数'a2LS2L'可以将14个字节的数据解析为 两个字符（1\*2字节）、一个Long型（1\*8字节）、两个Short型（2*2字节），分别取出bmp图片的文件类型（“BM”）、文件大小、两个保留字段、 **图像数据偏移量（@imageDataSize）** 。

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143603620.jpg)

Paste_Image.png

再从文件中读入@imageDataSize个字节的数据，解析为字符数组，里面除了一些因对齐规则以外的数据都是图片的数据；

@imageDataArray= @file.read(@imageDataSize).unpack("C*")

  如果是24位BMP图片，**那么每个像素占据三个字节，分别为RGB中的B、G、R值**。 以一个height=2，width=2的图片为例，其图片数据部分转成单字节数组如下：

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

124

254

258

123

212

21

221

56

107

204

251

100

52

100

111

59

其中每一行的无效数据：skipByteALine = 4 - ((2 * 24)>>3) & 3=2 为了更形象地表示图片像素与RGB数据的对应关系，在此我以二维矩阵的方式展示上面的一维数组：

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143603719.jpg)

Paste_Image.png

由于对齐原则，第一行的7 、8，第二行的15、16元素将被丢弃。 基于以上考虑，可以通过以下Ruby代码获取指定像素位置的RGB值

#图片（i，j）位置的RGB,二维坐标到一维坐标的映射，同时考虑到一个像素的位数以及skip量
def getRGB(i, j) 
 linearIndex = (@width\*i+j)\*(@bitCountPerPixel>>3)+i*@skipByteALine  
RGB.new(@imageDataArray\[linearIndex+2\], @imageDataArray\[linearIndex+1\], @imageDataArray\[linearIndex\])
end

  通过以下Ruby代码设置指定像素位置的RGB值

def setRGB(i, j, rgb)
  linearIndex = (@width\*i+j)\*(@bitCountPerPixel>>3)+i*@skipByteALine  @imageDataArray\[linearIndex+2\] = rgb.r  
@imageDataArray\[linearIndex+1\] = rgb.g  
@imageDataArray\[linearIndex\] = rgb.b
end

 

三、Ruby处理图片
----------

通过上面介绍的setRGB和getRGB方法来修改bmp的图片数据字节数组，我们就可以对bmp的指定像素进行操作了，下面介绍将图片灰度化：

#灰度化图片，取RGB三色平均值
 #灰度化图片
  #取RGB三色平均值
  def self.grey(bmp)
    for i in 0 .. bmp.height - 1
      for j in 0 .. bmp.width - 1
        rgb = bmp.getRGB(i, j)
        grey = rgb.getGreyLevel
        bmp.setRGB(i, j, RGB.new(grey, grey, grey))
      end
    end
  end

  上面的代码我取得所有像素的RGB，然后求出R、G、B值的平均值，RGB值三值相同时像素呈现为灰色 上面的操作只会修改图像数据字节数组，修改完毕需要保存到磁盘，保存方法如下：

def save(file)  
@saveFile = File.open(file, "wb")  
@saveFile.write(@bitMapFileHeader.pack('a2LS2L'))  
@saveFile.write(@bitMapInfoHeader.pack('L3S2L6'))  
@saveFile.write(@imageDataArray.pack('C*'))  
@file.close  @saveFile.close
end

  原图：

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143603811.jpg)

raw.jpg

处理效果：

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230143603918.jpg)

out_grey.jpg

> 下篇文章我将介绍**二值化**、**浮雕滤镜**、**底片滤镜**等图像处理算法 **预览：**
> 
> ![](http://baiyuan.wang/wp-content/uploads/2016/12/201612301436041014.jpg)
> 
> Paste_Image.png

项目主页
----

[geekeren](https://github.com/geekeren)/**[RubyImageProcess](https://github.com/geekeren/RubyImageProcess)**  

### 参考文章

[http://blog.csdn.net/hzqnju/article/details/5927825](http://blog.csdn.net/hzqnju/article/details/5927825) [http://www.jianshu.com/p/30fbaab6d0a6](http://www.jianshu.com/p/30fbaab6d0a6) [http://blog.csdn.net/hxker/article/details/50013303](http://blog.csdn.net/hxker/article/details/50013303) [http://blog.csdn.net/o\_sun\_o/article/details/8351037](http://blog.csdn.net/o_sun_o/article/details/8351037)