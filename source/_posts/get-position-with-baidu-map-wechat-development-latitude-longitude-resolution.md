---
title: 微信开发获取位置与百度地图经纬度解析
tags:
  - PHP
  - 微信
url: 1545.html
id: 1545
categories:
  - 技术
abbrlink: 12849
date: 2015-12-14 22:12:12
---

微信开发中我们常常需要知道用户的位置，在微信的JS-SDK中提供了访问地理位置的方法，这不需要你的公众号是认证账户，普通未认证的订阅号也有访问地理位置的权限。

微信开发获取位置与百度地图经纬度解析
------------------

根据微信公众号开发者文档中的 JSSDK使用步骤

*   1.1.1 步骤一：绑定域名
*   1.1.2 步骤二：引入JS文件
*   1.1.3 步骤三：通过config接口注入权限验证配置
*   1.1.4 步骤四：通过ready接口处理成功验证
*   1.1.5 步骤五：通过error接口处理失败验证

微信开发获取位置与百度地图经纬度解析,我们可以根据官方文档可以获取很多高级功能，这里就不赘述。可能比较棘手的是后面遇到的消息签名问题。下面是官方给的代码:

<?php
class JSSDK {
  private $appId;
  private $appSecret;

  public function __construct($appId, $appSecret) {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
  }

  public function getSignPackage() {
    $jsapiTicket = $this->getJsApiTicket();

    // 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($\_SERVER\['HTTPS'\]) && $\_SERVER\['HTTPS'\] !== 'off' || $\_SERVER\['SERVER\_PORT'\] == 443) ? "https://" : "http://";
    $url = "$protocol$\_SERVER\[HTTP\_HOST\]$\_SERVER\[REQUEST\_URI\]";

    $timestamp = time();
    $nonceStr = $this->createNonceStr();

    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

    $signature = sha1($string);

    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage; 
  }

  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

  private function getJsApiTicket() {
    // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json\_decode($this->get\_php\_file("jsapi\_ticket.php"));
    if ($data->expire_time < time()) {
      $accessToken = $this->getAccessToken();
      // 如果是企业号用以下 URL 获取 ticket
      // $url = "https://qyapi.weixin.qq.com/cgi-bin/get\_jsapi\_ticket?access_token=$accessToken";
      $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
      $res = json_decode($this->httpGet($url));
      $ticket = $res->ticket;
      if ($ticket) {
        $data->expire_time = time() + 7000;
        $data->jsapi_ticket = $ticket;
        $this->set\_php\_file("jsapi\_ticket.php", json\_encode($data));
      }
    } else {
      $ticket = $data->jsapi_ticket;
    }

    return $ticket;
  }

  private function getAccessToken() {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json\_decode($this->get\_php\_file("access\_token.php"));
    if ($data->expire_time < time()) {
      // 如果是企业号用以下URL获取access_token
      // $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
      $url = "https://api.weixin.qq.com/cgi-bin/token?grant\_type=client\_credential&appid=$this->appId&secret=$this->appSecret";
      $res = json_decode($this->httpGet($url));
      $access\_token = $res->access\_token;
      if ($access_token) {
        $data->expire_time = time() + 7000;
        $data->access\_token = $access\_token;
        $this->set\_php\_file("access\_token.php", json\_encode($data));
      }
    } else {
      $access\_token = $data->access\_token;
    }
    return $access_token;
  }

  private function httpGet($url) {
    $curl = curl_init();
    curl\_setopt($curl, CURLOPT\_RETURNTRANSFER, true);
    curl\_setopt($curl, CURLOPT\_TIMEOUT, 500);
    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
    curl\_setopt($curl, CURLOPT\_SSL_VERIFYPEER, true);
    curl\_setopt($curl, CURLOPT\_SSL_VERIFYHOST, true);
    curl\_setopt($curl, CURLOPT\_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
  }

  private function get\_php\_file($filename) {
    return trim(substr(file\_get\_contents($filename), 15));
  }
  private function set\_php\_file($filename, $content) {
    $fp = fopen($filename, "w");
    fwrite($fp, "<?php exit();?>" . $content);
    fclose($fp);
  }
}

在PHP中调用：

$jssdk = new JSSDK(wx\_appid, wx\_appkey);
$signPackage = $jssdk->GetSignPackage();

在HTML中加入js代码：

<script type="application/javascript">
    wx.config({
        debug: false,
        appId: '<?php echo $signPackage\["appId"\];?>',
        timestamp: <?php echo $signPackage\["timestamp"\];?>,
        nonceStr: '<?php echo $signPackage\["nonceStr"\];?>',
        signature: '<?php echo $signPackage\["signature"\];?>',
        jsApiList: \[
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'openLocation',
            'getLocation',
            'hideOptionMenu'
        \]
    });


</script>

调用js代码获取经纬度：

 wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    ilatitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    ilongitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    ispeed = res.speed; // 速度，以米/每秒计
                    iaccuracy = res.accuracy;//精度

                }

            });

百度地图经纬度解析
---------

微信JS-SDK提供的只是经纬度，而不是像“陕西省西安市”这样的地理位置，下面是将经纬度转为地理位置的PHP函数，调用的是百度地图的web-api：

define('ak', '换成你申请的百度地图API ak');
define('apiUrl', 'http://api.map.baidu.com/geocoder/v2/?ak='.ak.'&');

/\*\*
 \* @param $longitude 经度
 \* @param $latitude 纬度
 \* @return 地理位置
 */
function AddresByGeocoding($longitude,$latitude){
    $url = apiUrl."location=".$latitude.",".$longitude."&output=json&pois=0";
    $result= file\_get\_contents($url);
    $jsondata = json_decode($result,true);
    $address =$jsondata\['result'\]\['formatted_address'\];
    return $address;
}