---
title: 【图片去霾算法实践】NDK下二维数组的传递
tags:
  - android开发
url: 1858.html
id: 1858
categories:
  - 技术
abbrlink: 44740
date: 2017-01-16 12:05:07
---

最近看到了一篇关于图片“去霾算法”的文章，一下子就有了兴趣，所以想着能不能实现。由于数学能力捉急，无法理解文章的思想和相关论文。于是在Github上找到了相关的Java代码，算法的效果十分明显：

![](http://baiyuan.wang/wp-content/uploads/2017/02/20170215135427111.jpg)

去霾前的图片

![](http://baiyuan.wang/wp-content/uploads/2017/02/20170215135428211.jpg)

去霾算法处理后的图片

不知道是不是算法太复杂，还是Java效率相对较低的缘故，一个3M的JPG图片处理下来需要近20秒的时间。 效果明显的算法让我萌生了开发一款去霾相机的想法，为了获得更快的处理速度，在研究Java去霾算法代码后，我决定将其写成C++代码，然后通过NDK（Android原生开发）移植到Android平台。 项目的基本思想是在Android/Java下获得图片的Bitmap将其像素点转成二维的int二维数组，然后将int二维数组传入JNI层，交给NDK层C++代码处理，NDK层处理完毕后返回去霾后的int二维数组，由Java层转成Bitmap重新显示或保存。 经过一天的奋斗，我终于实现了用C++代码实现“去霾”算法并顺利移植到Android原生开发中。效果已实现，目前还有很多BUG，图片大小稍大时算法耗费的时间和内存过大.

![](http://baiyuan.wang/wp-content/uploads/2017/02/20170215135429317.jpg)

Android 图片去霾

> 本文预计会写一个系列，后续根据情况可能会开源。如果你对去霾算法实践感兴趣，可以关注我的简书和博客：[http://baiyuan.wang](http://baiyuan.wang/) ,后续将持续更新

本篇文章介绍NDK和Java层**怎样互传二维数组**

NDK->C++
--------

#### ndkArray\[mHeight\]\[mWidth\]->cppArray\[mHeight\]\[mWidth\]

    int \*\*cppArray= new int \*\[mHeight\];

    for (int i = 0; i < mImageHeight; i++) {
        cppArray\[i\] = new int\[mWidth\];
        jintArray intdata = (jintArray) env->GetObjectArrayElement(ndkArray, i);
        cppArray\[i\] = env->GetIntArrayElements(intdata, 0);
        env->DeleteLocalRef(intdata);//释放内存，防止内存泄漏
        }
    }

 

C++->NDK
--------

#### cppArray\[mHeight\]\[mWidth\]->ndkArray\[mHeight\]\[mWidth\]

  jobjectArray ndkArray= env->NewObjectArray(mHeight,env->FindClass("\[I"),NULL);
    for (int i = 0; i < mHeight; i++) {
        jintArray jintArray= env->NewIntArray(mWidth);
        env->SetIntArrayRegion(jintArray, 0, mWidth, out\[i\]);
        env->SetObjectArrayElement(ndkArray, i, jintArray);
        env->DeleteLocalRef(jintArray);
    }

    return ndkArray;