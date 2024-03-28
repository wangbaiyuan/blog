---
title: Ubuntu下利用Java CV获取双目摄像头图像
tags:
  - JAVA
  - 个人程序库
url: 1892.html
id: 1892
categories:
  - 技术
abbrlink: 21354
date: 2017-03-06 20:08:25
---

毕业设计的项目是做一个通过双目摄像头测出物体的距离，然后控制模型车避开较近的障碍物，所以需要将安装在模型车上双目摄像头的图像传输，发送到电脑端进行双目测距算法的计算，然后电脑将计算的结果发送到小车，小车控制行驶方向从而避开障碍物。小车上使用Pcduino开发板，安装Ubuntu系统，外插Arduino扩展板，连接小车的硬件部分。 从淘宝上买回的双目摄像头后，使用java cv获取到双目摄像头图像的方式与单目摄像头的方式是类似的。不同的地方是要想分离双目摄像头的画面需要设置代码中的分辨率参数。

package cn.wangbaiyuan.doublecamera;

import javax.swing.JFrame;

import org.bytedeco.javacv.CanvasFrame;
import org.bytedeco.javacv.OpenCVFrameConverter;
import org.bytedeco.javacv.FrameGrabber.Exception;
import org.bytedeco.javacv.OpenCVFrameGrabber;

/\*\*
\* 调用本地摄像头窗口视频
\* @author BrainWang
\* @version 2017年3月6日
*/

public class Camera
{
public static void main(String\[\] args) throws Exception, InterruptedException
{
OpenCVFrameGrabber grabber = new OpenCVFrameGrabber(1);//设备号，你的电脑上可能有多个摄像头，0和1自己试试分别对应哪一个
grabber.start(); //开始获取摄像头数据
CanvasFrame canvas = new CanvasFrame("摄像头");//新建一个窗口
canvas.setDefaultCloseOperation(JFrame.EXIT\_ON\_CLOSE);
canvas.setAlwaysOnTop(true);

while(true)
{
if(!canvas.isDisplayable())
{//窗口是否关闭
grabber.stop();//停止抓取
System.exit(2);//退出
}

canvas.showImage(grabber.grab());//获取摄像头图像并放到窗口上显示， 这里的Frame frame=grabber.grab(); frame是一帧视频图像

Thread.sleep(50);//50毫秒刷新一次图像
}
}
}

如果不对分辨率进行任何的设置，得到的效果是这样的：

![](http://baiyuan.wang/wp-content/uploads/2017/03/20170306200826116.jpg)

双目摄像头画面

是不是似曾相识，我们在电影院看3D电影不戴眼镜看到的就是这样的。对于开发者来说两路图片混合在一起显然不是好事，需要在代码里做如下设置。

   int captureWidth = 1280;
        int captureHeight = 480;
        grabber.setImageWidth(captureWidth);
        grabber.setImageHeight(captureHeight);

因为笔者手中的摄像头每一只分辨率为640_480,所以将分辨率改成1280_480，可以成功的将图片分离。

package cn.wangbaiyuan.doublecamera;

import javax.swing.JFrame;

import org.bytedeco.javacv.CanvasFrame;
import org.bytedeco.javacv.OpenCVFrameConverter;
import org.bytedeco.javacv.FrameGrabber.Exception;
import org.bytedeco.javacv.OpenCVFrameGrabber;

/\*\*
 \* 调用本地摄像头窗口视频
 \* @author BrainWang
 \* @version 2017年3月6日
 */

public class Camera
{
    public static void main(String\[\] args) throws Exception, InterruptedException
    {
        OpenCVFrameGrabber grabber = new OpenCVFrameGrabber(1);
       int captureWidth = 1280;
        int captureHeight = 480;
        grabber.setImageWidth(captureWidth);
        grabber.setImageHeight(captureHeight);

        grabber.start();   //开始获取摄像头数据
        CanvasFrame canvas = new CanvasFrame("摄像头");//新建一个窗口
        canvas.setDefaultCloseOperation(JFrame.EXIT\_ON\_CLOSE);
        canvas.setAlwaysOnTop(true);

        while(true)
        {
            if(!canvas.isDisplayable())
            {//窗口是否关闭
                grabber.stop();//停止抓取
                System.exit(2);//退出
            }


            canvas.showImage(grabber.grab());//获取摄像头图像并放到窗口上显示， 这里的Frame frame=grabber.grab(); frame是一帧视频图像

            Thread.sleep(50);//50毫秒刷新一次图像
        }
    }
}

图片分离以后的效果是这样的：

![](http://baiyuan.wang/wp-content/uploads/2017/03/20170306200827214.jpg)

双目摄像头图像分离

> 代码使用了java cv的库，如果是maven项目，需要这样配置依赖： 在pom.xml中project节点下添加：
> 
> <dependencies>
>         <dependency>
>             <groupId>org.bytedeco</groupId>
>             <artifactId>javacv-platform</artifactId>
>             <version>1.3.1</version>
>         </dependency>
>     </dependencies>
> 
> 更多的环境配置可以访问 java cv的官方Github主页。