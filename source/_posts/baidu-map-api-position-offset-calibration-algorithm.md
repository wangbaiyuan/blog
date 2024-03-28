---
title: 百度地图API位置偏移的校准算法
tags:
  - android开发
  - API
  - C++
  - JAVA
  - Web
  - 微信
url: 1611.html
id: 1611
categories:
  - 技术
  - 软件开发
abbrlink: 48033
date: 2016-02-17 12:17:28
---

在开始使用百度地图API进行开发时可能会遇到一件相当奇怪的事情，使用百度定位的经纬度在地图上显示相当不准确，这一问题我在微信开发和安卓开始时都遇到过。第一次使用百度地图api获取位置并在地图上显示是在微信开发的时候，那是不知道具体原因无奈在微信获取的地理位置上加了一个偏移量进行校准，虽能勉强解决，但是不太准确。后来在安卓开始也同样遇到了这个问题，才发现百度地图API定位偏移已经不是一个偶然问题了。

百度地图API定位偏移的原因
--------------

以下来自互联网：

### **一、坐标体系**

首先我们要明白，开发者能接触到哪些坐标体系呢？

#### 第一种分类：

1、 GPS，WGS-84，原始坐标体系。一般用国际标准的GPS记录仪记录下来的坐标，都是GPS的坐标。很可惜，在中国，任何一个地图产品都不允许使用GPS坐标，据说是为了保密。GPS坐标形式如图，度分秒形式的经纬度： [![百度地图API位置偏移的校准算法1](http://baiyuan.wang/wp-content/uploads/2016/02/baiyuan.wang_2016-02-17_12-15-34.jpg)](http://baiyuan.wang/wp-content/uploads/2016/02/baiyuan.wang_2016-02-17_12-15-34.jpg)

百度地图API位置偏移的校准算法1
 
 [![百度地图API位置偏移的校准算法2](http://baiyuan.wang/wp-content/uploads/2016/02/baiyuan.wang_2016-02-17_12-15-54.jpg)](http://baiyuan.wang/wp-content/uploads/2016/02/baiyuan.wang_2016-02-17_12-15-54.jpg)
 
 百度地图API位置偏移的校准算法2
  
  2、 GCJ-02，国测局02年发布的坐标体系。又称“火星坐标”。在中国，必须至少使用GCJ-02的坐标体系。比如谷歌，腾讯，高德都在用这个坐标体系。**GCJ-02****也是国内最广泛使用的坐标体系**。 3、 其他坐标体系。一般都是由GCJ-02进过偏移算法得到的。这种体系就根据每个公司的不同，坐标体系都不一样了。比如，百度和搜狗就使用自己的坐标体系，与其他坐标体系不兼容。

#### 第二种分类：

首先明白，所有坐标体系的原点，都是非洲。 [![百度地图API位置偏移的校准算法3](http://baiyuan.wang/wp-content/uploads/2016/02/baiyuan.wang_2016-02-17_12-16-11.jpg)](http://baiyuan.wang/wp-content/uploads/2016/02/baiyuan.wang_2016-02-17_12-16-11.jpg) 百度地图API位置偏移的校准算法3 1、 经纬度。这个是球面坐标，对于北京来说，就是(116.38817139.935961)这样的坐标。比如腾讯、高德、百度都是这样的经纬度坐标。谷歌是经纬度顺序写反的经纬度坐标。 如果是度分秒坐标，需要进行转换，才能得到这样的经纬度坐标。详见坐标转换。 2、 墨卡托坐标。平面坐标，相当于是直线距离，数字一般都比较大，像这样的。(215362.00021333335 99526.00034912192) 墨卡托坐标，主要用于程序的后台计算。直线距离嘛，加加减减几乎计算方便。 搜狗地图API就是直接使用的墨卡托坐标。

### **二、坐标转换**

在各种web端平台，或者高德、腾讯、百度上取到的坐标，都不是GPS坐标，都是GCJ-02坐标，或者自己的偏移坐标系。 比如，你在谷歌地图API，高德地图API，腾讯地图API上取到的，都是GCJ-02坐标，他们三家都是通用的，也适用于大部分地图API产品，以及他们的地图产品。 例外，百度API上取到的，是BD-09坐标，只适用于百度地图相关产品。 例外，搜狗API上取到的，是搜狗坐标，只适用于搜狗地图相关产品。 例外，谷歌地球，google earth上取到的，是GPS坐标，而且是度分秒形式的经纬度坐标。在国内不允许使用。必须转换为GCJ-02坐标。

#### 1、度分秒坐标转换为经纬度

比如，在GPS记录仪，或者google earth上采集到的是39°31'20.51，那么应该这样换算，31分就是31/60度，20.51秒就是20.51/3600度，结果就是39 + 31/60 + 20.51/3600 度。

#### 2、 GPS转换为GCJ-02坐标

谷歌，高德，腾讯的地图API官网上，都不直接提供这样的坐标转换。如果要得到GCJ-02坐标，最好在他们的地图上直接取点，或者通过地址解析得到。（这个工具我后续会贴出来的。我就爱干这样的事情，哈哈。） 不过，在网上搜到了这样的接口，该接口的type=1就是GPS转到GCJ-02的墨卡托坐标。请大家对接口保密，哈哈。详见： http://map.sogou.com/api/documentation/javascript/api2.5/interface\_translate.html#late\_intro

#### 3、GCJ-02与BD-09之间互转

国测局GCJ-02坐标体系（谷歌、高德、腾讯），与百度坐标BD-09体系的转换，在CSDN上有很详细的讲解： http://blog.csdn.net/coolypf/article/details/8569813 不过也有更简单的算法，线性算法（lat和lng是经纬度，球面坐标）： To\_B是转到百度，To\_G是转到GCJ-02。 var TO\_BLNG = function(lng){return lng+0.0065;}; var TO\_BLAT = function(lat){return lat+0.0060;}; var TO\_GLNG = function(lng){return lng-0.0065;}; var TO\_GLAT = function(lat){return lat-0.0060;};

#### 4、经纬纬度转成墨卡托

网上也有详细讲解： http://bbs.esrichina-bj.cn/esri/viewthread.php?tid=78245 （大家发现没，高德是api，腾讯和百度是mapapi，说明什么？） **三、坐标偏移** 如果您的坐标在转换之后，还有偏移，那么考虑以下几个方面。 A、原始坐标系弄错，比如以为自己是GPS坐标，但其实已经是GCJ-02坐标。 解决方案：请确保采集到的数据是哪个坐标体系，需要转换到哪个坐标系，再进行坐标转换。 B、原始坐标准确度不够 解决方案：如果您是GPS坐标，请确保采集GPS数据时，搜到至少4颗以上的卫星。并且GPS数据准不准，还取决于周围建筑物的高度，越高越不准，因为有遮挡。 如果本来就是GCJ-02坐标，在不同地图放大级别的时候，看到的地方可能不一样。比如你在地图级别4（国家）取到的坐标，放大到地图12级（街道）时，坐标就偏了。请确保在地图最大放大级别时，拾取坐标。 C、度分秒的概念混淆 比如，在google earth上采集到的是39°31'20.51，那么应该这样换算，31分就是31/60度，20.51秒就是20.51/3600度，结果就是39 + 31/60 + 20.51/3600 度。 D、经纬度顺序写反了 有些公司（比如高德，百度，腾讯）是先经度，再纬度，即Point(lng lat)。但谷歌坐标的顺序恰好相反，是(lat lng)。 相关问题的[百度解释：http://developer.baidu.com/map/question.htm](http://developer.baidu.com/map/question.htm)

百度地图API位置偏移的校准算法
----------------

package cn.wangbaiyuan.translate.tools;

/\*\*
 \* 各地图API坐标系统比较与转换;
 \* WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系,
 \* 谷歌地图采用的是WGS84地理坐标系（中国范围除外）;
 \* GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。
 \* 谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系;
 \* 搜狗坐标系、图吧坐标系等，估计也是在GCJ02基础上加密而成的。 chenhua
 */
public class PositionUtil {

    public static final String BAIDU\_LBS\_TYPE = "bd09ll";

    public static double pi = 3.1415926535897932384626;
    public static double a = 6378245.0;
    public static double ee = 0.00669342162296594323;

    /\*\*
     \* 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System
     \*
     \* @param lat
     \* @param lon
     \* @return
     */
    public static Gps gps84\_To\_Gcj02(double lat, double lon) {
        if (outOfChina(lat, lon)) {
            return null;
        }
        double dLat = transformLat(lon - 105.0, lat - 35.0);
        double dLon = transformLon(lon - 105.0, lat - 35.0);
        double radLat = lat / 180.0 * pi;
        double magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        double sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        double mgLat = lat + dLat;
        double mgLon = lon + dLon;
        return new Gps(mgLat, mgLon);
    }

    /\*\*
     \* \* 火星坐标系 (GCJ-02) to 84 * * @param lon * @param lat * @return
     \* */
    public static Gps gcj\_To\_Gps84(double lat, double lon) {
        Gps gps = transform(lat, lon);
        double lontitude = lon * 2 - gps.getWgLon();
        double latitude = lat * 2 - gps.getWgLat();
        return new Gps(latitude, lontitude);
    }

    /\*\*
     \* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
     \*
     \* @param gg_lat
     \* @param gg_lon
     */
    public static Gps gcj02\_To\_Bd09(double gg\_lat, double gg\_lon) {
        double x = gg\_lon, y = gg\_lat;
        double z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
        double theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
        double bd_lon = z * Math.cos(theta) + 0.0065;
        double bd_lat = z * Math.sin(theta) + 0.006;
        return new Gps(bd\_lat, bd\_lon);
    }

    /\*\*
     \* \* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param
     \* bd\_lat * @param bd\_lon * @return
     */
    public static Gps bd09\_To\_Gcj02(double bd\_lat, double bd\_lon) {
        double x = bd\_lon - 0.0065, y = bd\_lat - 0.006;
        double z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
        double theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
        double gg_lon = z * Math.cos(theta);
        double gg_lat = z * Math.sin(theta);
        return new Gps(gg\_lat, gg\_lon);
    }

    /\*\*
     \* (BD-09)-->84
     \* @param bd_lat
     \* @param bd_lon
     \* @return
     */
    public static Gps bd09\_To\_Gps84(double bd\_lat, double bd\_lon) {

        Gps gcj02 = PositionUtil.bd09\_To\_Gcj02(bd\_lat, bd\_lon);
        Gps map84 = PositionUtil.gcj\_To\_Gps84(gcj02.getWgLat(),
                gcj02.getWgLon());
        return map84;

    }

    public static boolean outOfChina(double lat, double lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    }

    public static Gps transform(double lat, double lon) {
        if (outOfChina(lat, lon)) {
            return new Gps(lat, lon);
        }
        double dLat = transformLat(lon - 105.0, lat - 35.0);
        double dLon = transformLon(lon - 105.0, lat - 35.0);
        double radLat = lat / 180.0 * pi;
        double magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        double sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        double mgLat = lat + dLat;
        double mgLon = lon + dLon;
        return new Gps(mgLat, mgLon);
    }

    public static double transformLat(double x, double y) {
        double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
                \+ 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    public static double transformLon(double x, double y) {
        double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
                \* Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
                \* pi)) * 2.0 / 3.0;
        return ret;
    }

    public static void main(String\[\] args) {

        // 北斗芯片获取的经纬度为WGS84地理坐标 31.426896,119.496145
        Gps gps = new Gps(31.426896, 119.496145);
        System.out.println("gps :" + gps);
        Gps gcj = gps84\_To\_Gcj02(gps.getWgLat(), gps.getWgLon());
        System.out.println("gcj :" + gcj);
        Gps star = gcj\_To\_Gps84(gcj.getWgLat(), gcj.getWgLon());
        System.out.println("star:" + star);
        Gps bd = gcj02\_To\_Bd09(gcj.getWgLat(), gcj.getWgLon());
        System.out.println("bd  :" + bd);
        Gps gcj2 = bd09\_To\_Gcj02(bd.getWgLat(), bd.getWgLon());
        System.out.println("gcj :" + gcj2);
    }
}

### C++算法

#include   
  
const double x_pi = 3.14159265358979324 * 3000.0 / 180.0;  
  
void bd\_encrypt(double gg\_lat, double gg\_lon, double &bd\_lat, double &bd_lon)  
{  
    double x = gg\_lon, y = gg\_lat;  
    double z = sqrt(x * x + y * y) + 0.00002 * sin(y * x_pi);  
    double theta = atan2(y, x) + 0.000003 * cos(x * x_pi);  
    bd_lon = z * cos(theta) + 0.0065;  
    bd_lat = z * sin(theta) + 0.006;  
}  
  
void bd\_decrypt(double bd\_lat, double bd\_lon, double &gg\_lat, double &gg_lon)  
{  
    double x = bd\_lon - 0.0065, y = bd\_lat - 0.006;  
    double z = sqrt(x * x + y * y) - 0.00002 * sin(y * x_pi);  
    double theta = atan2(y, x) - 0.000003 * cos(x * x_pi);  
    gg_lon = z * cos(theta);  
    gg_lat = z * sin(theta);  
}