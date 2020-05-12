---
title: AndroidStudio代码混淆和NDK预防apk反编译
tags:
  - android
  - Android Studio
  - C++
  - 汇编
url: 1601.html
id: 1601
categories:
  - 技术应用
  - 软件开发
abbrlink: 11889
date: 2016-01-09 11:53:32
---

代码混淆
----

### 什么是代码混淆

Java 是一种跨平台的、解释型语言，Java 源代码编译成中间”字节码”存储于 class 文件中。由于跨平台的需要，Java 字节码中包括了很多源代码信息，如变量名、方法名，并且通过这些名称来访问变量和方法，这些符号带有许多语义信息，很容易被反编译成 Java 源代码。为了防止这种现象，我们可以使用 Java 混淆器对 Java 字节码进行混淆。 混淆就是对发布出去的程序进行重新组织和处理，使得处理后的代码与处理前代码完成相同的功能，而混淆后的代码很难被反编译，即使反编译成功也很难得出程序的真正语义。被混淆过的程序代码，仍然遵照原来的档案格式和指令集，执行结果也与混淆前一样，只是混淆器将代码中的所有变量、函数、类的名称变为简短的英文字母代号，在缺乏相应的函数名和程序注释的况下，即使被反编译，也将难以阅读。同时混淆是不可逆的，在混淆的过程中一些不影响正常运行的信息将永久丢失，这些信息的丢失使程序变得更加难以理解。 混淆器的作用不仅仅是保护代码，它也有精简编译后程序大小的作用。由于以上介绍的缩短变量和函数名以及丢失部分信息的原因， 编译后 jar 文件体积大约能减少25% ，这对当前费用较贵的无线网络传输是有一定意义的。

```
-optimizationpasses 5          # 指定代码的压缩级别
-dontusemixedcaseclassnames   # 是否使用大小写混合
-dontpreverify           # 混淆时是否做预校验
-verbose                # 混淆时是否记录日志

-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*  # 混淆时所采用的算法

-keep public class * extends android.app.Activity      # 保持哪些类不被混淆
-keep public class * extends android.app.Application   # 保持哪些类不被混淆
-keep public class * extends android.app.Service       # 保持哪些类不被混淆
-keep public class * extends android.content.BroadcastReceiver  # 保持哪些类不被混淆
-keep public class * extends android.content.ContentProvider    # 保持哪些类不被混淆
-keep public class * extends android.app.backup.BackupAgentHelper # 保持哪些类不被混淆
-keep public class * extends android.preference.Preference        # 保持哪些类不被混淆
-keep public class com.android.vending.licensing.ILicensingService    # 保持哪些类不被混淆

-keepclasseswithmembernames class * {  # 保持 native 方法不被混淆
    native <methods>;
}
-keepclasseswithmembers class * {   # 保持自定义控件类不被混淆
    public <init>(android.content.Context, android.util.AttributeSet);
}
-keepclasseswithmembers class * {# 保持自定义控件类不被混淆
    public <init>(android.content.Context, android.util.AttributeSet, int);
}
-keepclassmembers class * extends android.app.Activity { # 保持自定义控件类不被混淆
    public void *(android.view.View);
}
-keepclassmembers enum * {     # 保持枚举 enum 类不被混淆
    public static **\[\] values();
    public static ** valueOf(java.lang.String);
}
-keep class * implements android.os.Parcelable { # 保持 Parcelable 不被混淆
    public static final android.os.Parcelable$Creator *;
}
```
 

NDK将应用的核心代码或通讯协议打包成so文件
-----------------------

NDK可以实现代码的保护，由于apk的java层代码很容易被反编译，而C/C++库反汇难度较大。

因为java是半解释半编译性语言，，先将java的代码解释成CLASS文件，然后编译给计算机中的JVM虚拟机，然后由虚拟机调用相应的计算机部件进行运算，而安卓的SO文件是linux下的文件，用c或者c++写的，c++你可以看做是C的扩充版，C有良好的机器兼容性，就是因为它可以直接编译为机器指令，执行效率相对java高，而java是跨平台移可植性强大。

C/C++更接近底层系统实现和依赖于编译器，不同编译器生成的二进制代码会相对不同平台有所区别，甚至同一操作系统不同系列的编译器都会有一点差异，比如在linux下编译C/C++得到的二进制代码就很难或无法运行在windows平台上，反之亦然，所以反编译很困难，现在大多数反编译软件都只能反编译成汇编。有一些号称可以反编译成C或者C++的工具，但反编译出来的结果大多看不明白，还不如用汇编。