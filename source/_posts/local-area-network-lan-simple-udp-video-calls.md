---
title: 一个简单的局域网UDP实时视频
tags:
  - android
  - android开发
url: 1641.html
id: 1641
categories:
  - 算法语言
abbrlink: 36206
date: 2016-04-12 16:50:02
---

之前一直有打算做一个局域网上基于UDP通信的视频通话软件，一直不知道视频流在网络上以怎样的形式传输，虽然知道几个视频流的编码格式，但是其实一直没有进行付诸实践； 最近在学习安卓手表开发时，在github上看到一个将手机的实时视频传输到手表的项目，发现一个似乎低级但是在局域网应该还是比较实用的局域网视频传输方法：直接将从摄像头获取的图像压缩以后进行发送。本项目GitHub主页：[https://github.com/retravel/AndroidRealTimeVideo](https://github.com/retravel/AndroidRealTimeVideo)

获取摄像头实时图片、UDP发送图片
-----------------

private void initCanmera() {
        int cameras = Camera.getNumberOfCameras();
        Camera.CameraInfo info = new Camera.CameraInfo();
        for (int i = 0; i < cameras; i++) {
            Camera.getCameraInfo(i, info);
            if (info.facing == Camera.CameraInfo.CAMERA\_FACING\_FRONT) {
                camera = Camera.open(i);
                break;
            }
        }
        //没有前置摄像头
        if (camera == null) camera = Camera.open();
        try {
            camera.setPreviewDisplay(surfaceHolder);
            camera.setPreviewCallback(this);
        } catch (Exception e) {
            camera.release();//释放资源
            camera = null;
        }
    }

    @Override
    public void onPreviewFrame(byte\[\] data, Camera camera) {

        Camera.Size previewSize = camera.getParameters().getPreviewSize();

        int\[\] rgb = decodeYUV420SP(data, previewSize.width, previewSize.height);
        Bitmap bmp = Bitmap.createBitmap(rgb, previewSize.width, previewSize.height, Bitmap.Config.ARGB_8888);
        int smallWidth, smallHeight;
        int dimension = 200;

        if (previewSize.width > previewSize.height) {
            smallWidth = dimension;
            smallHeight = dimension * previewSize.height / previewSize.width;
        } else {
            smallHeight = dimension;
            smallWidth = dimension * previewSize.width / previewSize.height;
        }

        Matrix matrix = new Matrix();
        matrix.postRotate(mCameraOrientation);

        Bitmap bmpSmall = Bitmap.createScaledBitmap(bmp, smallWidth, smallHeight, false);
        Bitmap bmpSmallRotated = Bitmap.createBitmap(bmpSmall, 0, 0, smallWidth, smallHeight, matrix, false);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bmpSmallRotated.compress(Bitmap.CompressFormat.WEBP, 80, baos);

        up.sendMsg(baos.toByteArray());


    }

    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        initCanmera();
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
        int currentCamera = Camera.CameraInfo.CAMERA\_FACING\_FRONT;
        Camera.Parameters parameters = camera.getParameters();//得到相机设置参数
        Camera.Size size = camera.getParameters().getPreviewSize(); //获取预览大小

        parameters.setPictureFormat(PixelFormat.JPEG);//设置图片格式
        Camera.CameraInfo info = new Camera.CameraInfo();
        camera.getCameraInfo(currentCamera, info);
        int rotation = this.getWindowManager().getDefaultDisplay().getRotation();
        int degrees = 0;
        switch (rotation) {
            case Surface.ROTATION_0:
                degrees = 0;
                break;
            case Surface.ROTATION_90:
                degrees = 90;
                break;
            case Surface.ROTATION_180:
                degrees = 180;
                break;
            case Surface.ROTATION_270:
                degrees = 270;
                break;
        }
        int resultA = 0, resultB = 0;
        if (currentCamera == Camera.CameraInfo.CAMERA\_FACING\_BACK) {
            resultA = (info.orientation - degrees + 360) % 360;
            resultB = (info.orientation - degrees + 360) % 360;
            camera.setDisplayOrientation(resultA);
        } else {
            resultA = (360 + 360 - info.orientation - degrees) % 360;
            resultB = (info.orientation + degrees) % 360;
            camera.setDisplayOrientation(resultA);
        }
        camera.setPreviewCallback(this);
        parameters.setRotation(resultB);
        mCameraOrientation = resultB;
        camera.setParameters(parameters);
        camera.startPreview();//开始预览
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        if (camera != null) {
            camera.setPreviewCallback(null);
            camera.stopPreview();
            camera.release();
            camera = null;
        }
    }

 UDP server
-----------

package cn.wangbaiyuan.androidsocketav;

/\*\*
 \* Created by BrainWang on 2016/3/21.
 */

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.net.SocketException;

/\*\*
 \* 基于UDP协议的服务器端，对来自客户端的数据包进行应答
 \*
 \* @author <a href="http://wangbaiyuan">王柏元</a>
 */
public class UDPServer {
    /\*\*
     \* 端口
     */
    //int port=1888;
    DatagramSocket socket;
    String lastString = (-1 + "");
    int sameTime = 0;
    public handleReceiveData callback;

    public UDPServer(int port) throws SocketException {

        socket = new DatagramSocket(port);  //服务端DatagramSocket
        System.out.println("服务器启动。");
    }

    public void setReceiveCallback(handleReceiveData call) {
        callback = call;
    }

    public void service() throws IOException {
        while (true) {
            DatagramPacket dp = new DatagramPacket(new byte\[102400\], 102400);
            socket.receive(dp); //接收客户端信息

            byte\[\] data = dp.getData();
            callback.handleReceive(data);
        }
    }

    public void start() throws SocketException, IOException {
        service();
    }

    public void sendMsg(final byte\[\] data) {

        Thread send = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (socket != null) {

                        SocketAddress socketAddres = new InetSocketAddress("192.168.1.110", 8804);
                        socket.send(new DatagramPacket(data, data.length, socketAddres));
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        send.start();
    }


}