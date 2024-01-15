---
title: Ruby图片处理基本算法（二）二值、灰度、浮雕...
tags:
  - ruby
url: 1844.html
id: 1844
categories:
  - 算法语言
abbrlink: 56024
date: 2016-12-30 15:20:45
---

一、灰度算法
------

彩色照片每一个像素的颜色值由红、绿、蓝三种值混合而成，红绿蓝的取值分别由很多种，于是像素的颜色值也可以有很多种颜色值，这就是彩色图片的原理，而灰度照片则只有256种颜色，一般的处理方法是将图片颜色值的RGB三个通道值设为一样，这样图片的显示效果就会是灰色。 灰度处理一般有三种算法：

*   1 最大值法：即新的颜色值R＝G＝B＝Max(R，G，B)，这种方法处理后的图片看起来亮度值偏高。
*   2 平均值法：即新的颜色值R＝G＝B＝(R＋G＋B)／3，这样处理的图片十分柔和
*   3 加权平均值法：即新的颜色值R＝G＝B＝(R ＊ Wr＋G＊Wg＋B＊Wb)，一般由于人眼对不同颜色的敏感度不一样，所以三种颜色值的权重不一样，一般来说绿色最高，红色其次，蓝色最低，最合理的取值分别为Wr ＝ 30％，Wg ＝ 59％，Wb ＝ 11％

下面是加权平均值法的Ruby实现：

  #灰度化图片
  #取RGB三色平均值
  def self.grey(bmp)
    for i in 0 .. bmp.height - 1
      for j in 0 .. bmp.width - 1
        rgb = bmp.getRGB(i, j)
        grey = rgb.r.to\_f * 0.3+rgb.g.to\_f \*0.59 +rgb.b.to\_f \* 0.11.to\_i
        bmp.setRGB(i, j, RGB.new(grey, grey, grey))
      end
    end
  end

 

### 灰度效果：

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230151843110.jpg)

out_grey.jpg

二、二值化
-----

图像二值化就是将图像上的像素点的灰度值设置为0或255，也就是将整个图像呈现出明显的黑白效果。所有灰度大于或等于阈值的像素被判定为属于特定物体，其灰度值为255表示，否则这些像素点被排除在物体区域以外，灰度值为0，表示背景或者例外的物体区域。 图像二值化常常用于破解验证码等图片识别应用上

#二值化图片
 #小于一定阈值设为0 0 0，大于设置为255 255 255
  def self.binarization(bmp)
    imageGreyLevel = bmp.getGreyLevel
    for i in 0 .. bmp.height - 1
      for j in 0 .. bmp.width - 1
        rgb = bmp.getRGB(i, j)
        if rgb.getGreyLevel<imageGreyLevel
          bmp.setRGB(i, j, RGB.new(0, 0, 0))
        else
          bmp.setRGB(i, j, RGB.new(255, 255, 255))
        end
      end

    end
  end

   

### 二值化效果

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230151844218.jpg)

out_binary.jpg

三、底片
----

底片效果的实现很简单，就是将RGB的每一个通道值取反，就是用255去减

#底片化图片
  #RGB取反色255-
  def self.contraryColor(bmp)
    for i in 0 .. bmp.height - 1
      for j in 0 .. bmp.width - 1
        rgb = bmp.getRGB(i, j)
        bmp.setRGB(i, j, rgb.getContrary)
      end
    end
  end

 

### 底片效果

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230151844320.jpg)

out_contrary.jpg

四、浮雕效果
------

浮雕的算法相对复杂一些，用当前点的RGB值减去相邻点的RGB值并加上128作为新的RGB值。由于图片中相邻点的颜色值是比较接近的，因此这样的算法处理之后，只有颜色的边沿区域，也就是相邻颜色差异较大的部分的结果才会比较明显，而其他平滑区域则值都接近128左右，也就是灰色，这样 就具有了浮雕效果。 在实际的效果中，这样处理后，有些区域可能还是会有”彩色”的一些点或者条状痕迹，所以最好再对新的RGB值做一个灰度处理。

#浮雕效果
  #浮雕的算法相对复杂一些，用当前点的RGB值减去相邻点的RGB值并加上128作为新的RGB值。由于图片中相邻点的颜色值是比较接近的，
  #因此这样的算法 处理之后，只有颜色的边沿区域，也就是相邻颜色差异较大的部分的结果才会比较明显，而其他平滑区域则值都接近128左右，
  #也就是灰色，这样就具有了浮雕效果。
  #在实际的效果中，这样处理后，有些区域可能还是会有”彩色”的一些点或者条状痕迹，所以最好再对新的RGB值做一个灰度处理。
  def self.emboss(bmp)

    preRGB=RGB.new(128, 128, 128)

    for i in 0 .. bmp.height - 1
      for j in 0 .. bmp.width - 1
        currentRGB=bmp.getRGB(i, j)
        r=(currentRGB.r-preRGB.r)*1+128
        g=(currentRGB.g - preRGB.g)*1+128
        b=(currentRGB.b-preRGB.b)*1+128

        bmp.setRGB(i, j, RGB.new(r,g,b).getGreyRGB)
        preRGB = currentRGB
      end
    end

  end

 

### 浮雕效果

![](http://baiyuan.wang/wp-content/uploads/2016/12/20161230151844418.jpg)

out_emboss.jpg

项目主页
----

[geekeren](https://github.com/geekeren)/**[RubyImageProcess](https://github.com/geekeren/RubyImageProcess)**