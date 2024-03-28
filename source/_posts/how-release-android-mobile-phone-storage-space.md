---
title: 怎样释放Android手机存储空间
tags:
  - android
  - android开发
url: 1881.html
id: 1881
categories:
  - 技术
abbrlink: 53913
date: 2017-02-23 13:38:34
---

Android应用在运行之中会产生一些数据，比如图片的缓存，数据库文件，配置文件等等。我们开发时可能会有这样的一个需求清除应用内缓存的数据，可以让用户选择删除应用内产生的数据，这也是比较人性化的设计点。过多的缓存会占用手机的存储空间，据说也会降低手机的IO性能。 下面这是简书Android APP中提供了清除缓存的设计：

![简书清除缓存](http://baiyuan.wang/wp-content/uploads/2017/02/20170223133730116.jpg)

> 那么Android应用在运行中会产生哪些数据呢？它们都被存放在哪里？然后我们根据产生数据的位置实现清除功能

首先简单讲讲Android的四种数据存储方式
----------------------

### 1、SharePreferenc

一种轻型的数据存储方式，实际上是基于XML文件存储的“key-value”键值对数据；通常用来存储程序的一些配置信息。

#### SharePreference的存储目录：

**其存储在“data/data/程序包名/shared_prefs目录下。**

#### SharePreference修改和存储数据

*   根据Context的getSharedPrerences(key, \[模式\])方法获取SharedPreference对象；
*   利用SharedPreference的editor()方法获取Editor对象；
*   通过Editor的putXXX()方法，将键值对存储数据；
*   通过Editor的commit()方法将数据提交到SharedPreference内

### 2、SQLite

SQLite是一个轻量级关系型数据库，既然是关系型数据库，那操作起来其实跟mysql、sql server差不多的。

> Android提供了强大数据库管理库，同时也支持运行哦原生命令，实现数据库的增删改查

### 3、 File

> Android中可以在设备本身的存储设备或外接的存储设备中创建用于保存数据的文件。在默认状态下，文件是不能在不同程序间共享的。

File可以通过FileInputStream和FileOutputStream对文件进行操作。

### 4、ContentProvider

ContentProvider相对于其它的方式比较复杂，当然其功能相对于其它的方式也是革命性的改变。它能够实现跨应用之间的数据操作。利用ContentResolver对象的delete、update、insert、query等方法去操ContentProvider的对象，让ContentProvider对象的方法去对数据操作。

#### 实现方式为：

*   在A程序中定义一个ContentProvider，重载其增删查改等方法；
*   在A程序中的AndroidManifest.xml中注册ContentProvider；
*   在B程序中通过ContentResolver和Uri来获取ContentProvider的数据，同样利用Resolver的增删查改方法来获得和处理数据

Android应用的数据存储路径
----------------

应用内数据的所有路径和对应的数据清除代码：

*   **/data/data/com.xxx.xxx/cache** \- 应用内缓存（注：对应方法**getCacheDir()** ）
    
      public static void cleanInternalCache(Context context) {
          deleteFilesByDirectory(context.getCacheDir());
      }
    
     
*   **/data/data/com.xxx.xxx/databases** \- 应用内数据库
    
      public static void cleanDatabases(Context context) {
          deleteFilesByDirectory(new File("/data/data/"
                  \+ context.getPackageName() + "/databases"));
      }
    
     
*   **/data/data/com.xxx.xxx/shared_prefs** \- 应用内配置文件

 public static void cleanSharedPreference(Context context) {
        deleteFilesByDirectory(new File("/data/data/"
                \+ context.getPackageName() + "/shared_prefs"));
    }

 

*   **/data/data/com.xxx.xxx/files** \- 应用内文件（注：对应方法getFilesDir())

  public static void cleanFiles(Context context) {
        deleteFilesByDirectory(context.getFilesDir());
    }

  由于Android应用数据存储的权限比较宽泛，一个Android应用几乎可以在SD卡任意位置创建一个目录和文件，所以上面的几个存储路径只是Android应用最基本的存储路径。更多的清除代码实现在下面的清除工具类中将于更详细的讲解

### 清除工具类的代码实现

为了方便使用，下面时我封装好的数据清除工具类：

package cn.wangbaiyuan.utils;

/\*\*
 \* Created by BrainWang on 2017-02-21.
 */
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import android.content.Context;
import android.os.Environment;

/\*\*
 \* 清除缓存
 *
 */
public class CleanDataUtil {


    /\*\* \* 清除本应用内部缓存(/data/data/com.xxx.xxx/cache) * * @param context */
    public static void cleanInternalCache(Context context) {
        deleteFilesByDirectory(context.getCacheDir());
    }

    /\*\* \* 清除本应用所有数据库(/data/data/com.xxx.xxx/databases) * * @param context */
    public static void cleanDatabases(Context context) {
        deleteFilesByDirectory(new File("/data/data/"
                \+ context.getPackageName() + "/databases"));
    }

    /\*\*
     \* \* 清除本应用SharedPreference(/data/data/com.xxx.xxx/shared_prefs) * * @param
     \* context
     */
    public static void cleanSharedPreference(Context context) {
        deleteFilesByDirectory(new File("/data/data/"
                \+ context.getPackageName() + "/shared_prefs"));
    }

    /\*\* \* 按名字清除本应用数据库 \* \* @param context * @param dbName */
    public static void cleanDatabaseByName(Context context, String dbName) {
        context.deleteDatabase(dbName);
    }

    /\*\* \* 清除/data/data/com.xxx.xxx/files下的内容 * * @param context */
    public static void cleanFiles(Context context) {
        deleteFilesByDirectory(context.getFilesDir());
    }

    /\*\*
     \* \* 清除外部cache下的内容(/mnt/sdcard/android/data/com.xxx.xxx/cache) * * @param
     \* context
     */
    public static void cleanExternalCache(Context context) {
        if (Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED)) {
            deleteFilesByDirectory(context.getExternalCacheDir());
        }
    }

    /\*\* \* 清除自定义路径下的文件，使用需小心，请不要误删。而且只支持目录下的文件删除 \* \* @param filePath */
    public static void cleanCustomCache(String filePath) {
        deleteFilesByDirectory(new File(filePath));
    }

    /\*\* \* 清除本应用所有的数据 \* \* @param context * @param filepath */
    public static void cleanApplicationData(Context context, String... filepath) {
        cleanInternalCache(context);
        cleanExternalCache(context);
        cleanDatabases(context);
        cleanSharedPreference(context);
        cleanFiles(context);
        for (String filePath : filepath) {
            cleanCustomCache(filePath);
        }
    }

    /\*\* \* 删除方法 这里只会删除某个文件夹下的文件，如果传入的directory是个文件，将不做处理 * * @param directory */
    private static void deleteFilesByDirectory(File directory) {
        if (directory != null && directory.exists() && directory.isDirectory()) {
            for (File item : directory.listFiles()) {
                item.delete();
            }
        }
    }

    /\*\*
     \* 清除所有缓存，相当于设置里应用管理中的“清除数据”，清除数据时应用将会退出
     \* @param context
     */
    public static void clearAppUserData(Context context) {
        try {
            Runtime.getRuntime().exec("pm clear " + context.getPackageName());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

 

系统设置应用管理的”清除数据“的实现方法
--------------------

在Android系统设置的应用管理中，提供了”清除数据“的功能，这一功能对应用数据的清除更加彻底，我们可以在代码中实现类似的需求，不过下面代码的执行将使应用退出：

  /\*\*
     \* 清除所有缓存，相当于设置里应用管理中的“清除数据”，清除数据时应用将会退出
     \* @param context
     */
    public static void clearAppUserData(Context context) {
        try {
            Runtime.getRuntime().exec("pm clear " + context.getPackageName());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }