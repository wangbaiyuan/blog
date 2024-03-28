---
title: 信息查询开放平台API大全
tags:
  - API
  - 在线应用
url: 900.html
id: 900
comments: false
categories:
  - 技术
abbrlink: 5560
date: 2015-03-04 13:33:20
---

使用API可以方便网站实现一些信息查询功能，通过连接第三方服务器请求数据为自己所用，下面是我为大家整理的信息查询开放平台API大全

注意事项：
-----

① Appkey请使用的微信公众号，不要使用默认的trailuser ② 接口返回类型为文本、图文、及音乐三种基本消息 ③ 请在所有消息底部主动加上“技术支持 方倍工作室” ④ JSON验证网址 [http://apix.sinaapp.com/json/](http://apix.sinaapp.com/json/) ⑤ 接口将不定期增加或更新，欢迎指出错误 ⑥ 如果有想要实现的，请在下面评论中列出并提供数据来源 ⑦ 提供的例子为天气、笑话、点歌功能，其他接口可以同样的调用 ⑧ 每个IP每天免费最大调用次数为200次，不要使用公用IP，如SAE或BAE ⑨ SAE每日运行需要开支，欢迎主动付费使用，付费用户功能上将不受任何限制 ⑩ 不必费尽心思使用虚假的appkey，它仅为统计使用，真实appkey能得到更快更好的程序响应

API大全
-----

001\. 天气预报接口 \[20130901\]

city：城市名，传递时须做urlencode
http://apix.sinaapp.com/weather/?appkey=trialuser&city=%E6%B7%B1%E5%9C%B3

002\. 空气质量指数接口 \[20130901\]

city：城市名，传递时须做urlencode
http://apix.sinaapp.com/airquality/?appkey=trialuser&city=%E6%B7%B1%E5%9C%B3

003\. 快递查询接口 \[20130901\] \[toggle hide="yes" title="点击查看英文代码列表" color="red"\]

序号

英文代码

快递公司中文名

1

aae

AAE快递

2

anjie

安捷快递

3

anneng

安能物流

4

anxun

安迅物流

5

aoshuo

奥硕物流

6

aramex

Aramex国际快递

7

baiqian

百千诚国际物流

8

balunzhi

巴伦支

9

baotongda

宝通达

10

benteng

成都奔腾国际快递

11

changtong

长通物流

12

chengguang

程光快递

13

chengji

城际快递

14

chengshi100

城市100

15

chuanxi

传喜快递

16

chuanzhi

传志快递

17

chukouyi

出口易物流

18

citylink

CityLinkExpress

19

coe

东方快递

20

coscon

中国远洋运输(COSCON)

21

cszx

城市之星

22

dada

大达物流

23

dajin

大金物流

24

datian

大田物流

25

dayang

大洋物流快递

26

debang

德邦物流

27

dhl

DHL快递

28

diantong

店通快递

29

disifang

递四方速递

30

dpex

DPEX快递

31

dsu

D速快递

32

ees

百福东方物流

33

ems

EMS快递

34

eyoubao

E邮宝

35

fanyu

凡宇快递

36

fardar

Fardar

37

fedex

国际Fedex

38

fedexcn

Fedex国内

39

feibao

飞豹快递

40

feihang

原飞航物流

41

feite

飞特物流

42

feiyang

飞洋快递

43

feiyuan

飞远物流

44

fengda

丰达快递

45

gangkuai

港快速递

46

gaotie

高铁快递

47

gdyz

广东邮政物流

48

gnxb

邮政小包

49

gongsuda

共速达物流|快递

50

guanda

冠达快递

51

guotong

国通快递

52

haihong

山东海红快递

53

haolaiyun

好来运快递

54

haosheng

昊盛物流

55

hebeijianhua

河北建华快递

56

henglu

恒路物流

57

hengyu

恒宇运通

58

hkpost

香港邮政

59

huacheng

华诚物流

60

huahan

华翰物流

61

huahang

华航快递

62

huangmajia

黄马甲快递

63

huaqi

华企快递

64

huayu

华宇物流

65

huitong

汇通快递

66

hutong

户通物流

67

hwhq

海外环球快递

68

intmail

国际邮政快递

69

jiahuier

佳惠尔快递

70

jiaji

佳吉快运

71

jiayi

佳怡物流

72

jiayu

佳宇物流

73

jiayunmei

加运美快递

74

jiete

捷特快递

75

jinda

金大物流

76

jingdong

京东快递

77

jingguang

京广快递

78

jinyue

晋越快递

79

jiuyi

久易快递

80

jixianda

急先达物流

81

jldt

嘉里大通物流

82

jppost

日本邮政

83

kangli

康力物流

84

kcs

顺鑫(KCS)快递

85

kuaijie

快捷快递

86

kuaitao

快淘速递

87

kuaiyouda

快优达速递

88

kuanrong

宽容物流

89

kuayue

跨越快递

90

lanhu

蓝弧快递

91

lejiedi

乐捷递快递

92

lianhaotong

联昊通快递

93

lijisong

成都立即送快递

94

lindao

上海林道货运

95

longbang

龙邦快递

96

menduimen

门对门快递

97

mengsu

蒙速快递

98

minbang

民邦快递

99

mingliang

明亮物流

100

minsheng

闽盛快递

101

nanbei

南北快递

102

nell

尼尔快递

103

nengda

能达快递

104

nsf

新顺丰（NSF）快递

105

ocs

OCS快递

106

peixing

陪行物流

107

pinganda

平安达

108

pingyou

中国邮政

109

ppbyb

贝邮宝

110

quanchen

全晨快递

111

quanfeng

全峰快递

112

quanritong

全日通快递

113

quanyi

全一快递

114

ririshun

日日顺物流

115

riyu

日昱物流

116

rpx

RPX保时达

117

rufeng

如风达快递

118

ruifeng

瑞丰速递

119

saiaodi

赛澳递

120

santai

三态速递

121

scs

伟邦(SCS)快递

122

shengan

圣安物流

123

shengbang

晟邦物流

124

shengfeng

盛丰物流

125

shenghui

盛辉物流

126

shentong

申通快递（可能存在延迟）

127

shiyun

世运快递

128

shunfeng

顺丰快递

129

simai

思迈快递

130

singpost

新加坡邮政

131

suchengzhaipei

速呈宅配

132

suijia

穗佳物流

133

sure

速尔快递

134

suteng

速腾快递

135

sutong

速通物流

136

tiantian

天天快递

137

tnt

TNT快递

138

tongzhishu

高考录取通知书

139

ucs

合众速递

140

ups

UPS快递

141

usps

USPS快递

142

wanbo

万博快递

143

wanjia

万家物流

144

wanxiang

万象物流

145

weitepai

微特派

146

wuhuan

五环速递

147

xianglong

祥龙运通快递

148

xinbang

新邦物流

149

xinfeng

信丰快递

150

xingchengzhaipei

星程宅配快递

151

xiyoute

希优特快递

152

yad

源安达快递

153

yafeng

亚风快递

154

yanwen

燕文物流

155

yibang

一邦快递

156

yinjie

银捷快递

157

yishunhang

亿顺航快递

158

yousu

优速快递

159

ytfh

北京一统飞鸿快递

160

yuancheng

远成物流

161

yuantong

圆通快递

162

yuefeng

越丰快递

163

yuhong

宇宏物流

164

yumeijie

誉美捷快递

165

yunda

韵达快递

166

yuntong

运通中港快递

167

zengyi

增益快递

168

zhaijisong

宅急送快递

169

zhengzhoujianhua

郑州建华快递

170

zhima

芝麻开门快递

171

zhongtian

济南中天万运

172

zhongtie

中铁快运

173

zhongtong

中通快递

174

zhongxinda

忠信达快递

175

zhongyou

中邮物流

176

ztwl

中铁物流

177

zuochuan

佐川急便

\[/toggle\]

company：快递公司英文代码
number：快递单号
http://apix.sinaapp.com/express/?appkey=trialuser&company=yuantong&number=3143490877

新版Web页查询
http://apix.sinaapp.com/express2/index.php

004\. 智能快递查询接口 \[20130901\]

number：快递单号
http://apix.sinaapp.com/expressauto/?appkey=trialuser&number=3143490877
备注：支持EMS,申通快递,圆通快递,中通快递,汇通快递,天天快递,韵达快递,顺丰快递,宅急送,速尔快递,德邦物流,联昊通物流,全峰快递,中国邮政，如风达

005\. 股票查询接口 \[20130901\]

code：股票代码\[通达信代码\]
http://apix.sinaapp.com/stock/?appkey=trialuser&code=000063

006\. 股票分析接口 \[20131004\]

code：股票代码
http://apix.sinaapp.com/stockanalysis/?appkey=trialuser&code=000063

007\. 公交线路接口 \[20131004\]

city：城市名，传递时须做urlencode
line：线路，传递时须做urlencode
http://apix.sinaapp.com/busline/?appkey=trailuser&city=%E6%B7%B1%E5%9C%B3&line=209

008\. 公交、地铁换乘接口 \[20131004\]

city：城市名，传递时须做urlencode
start：起点，传递时须做urlencode
end：终点，传递时须做urlencode
http://apix.sinaapp.com/bus/?appkey=trailuser&city=%E6%B7%B1%E5%9C%B3&start=%E4%B8%96%E7%95%8C%E4%B9%8B%E7%AA%97&end=%E7%AB%B9%E5%AD%90%E6%9E%97

009\. 地铁查询接口 \[20131004\]

http://apix.sinaapp.com/subway/?appkey=trialuser

010\. 火车查询 \[20131004\]

http://apix.sinaapp.com/train/?appkey=trialuser

011\. 汽车查询接口 \[20131004\]

http://apix.sinaapp.com/coach/?appkey=trialuser

012\. 自驾线路 \[20131004\]

startcity：起点城市，传递时须做urlencode
startplace：起点地名，传递时须做urlencode
endcity：终点城市，传递时须做urlencode
endplace：终点地名，传递时须做urlencode
http://apix.sinaapp.com/driving/?appkey=trailuser&startcity=%E5%8C%97%E4%BA%AC&startplace=%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6&endcity=%E5%8C%97%E4%BA%AC&endplace=%E5%A4%A9%E5%AE%89%E9%97%A8

013\. 出租车费用 \[20131004\]

city：城市名，传递时须做urlencode
start：起点，传递时须做urlencode
end：终点，传递时须做urlencode
http://apix.sinaapp.com/taxi/?appkey=trailuser&city=%E5%8C%97%E4%BA%AC&start=%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6&end=%E5%A4%A9%E5%AE%89%E9%97%A8

014\. 航班状态接口 \[20131004\]

number：航班号
http://apix.sinaapp.com/flight/?appkey=trialuser&number=ca1111

015\. 笑话接口 \[20131004\]

http://apix.sinaapp.com/joke/?appkey=trialuser

016\. 周公解梦接口 \[20131004\]

content: 梦见内容，传递时须做urlencode
http://apix.sinaapp.com/dream/?appkey=trialuser&content=%E8%80%81%E5%B8%88

017\. 中英互译 \[20131104\]

content: 翻译内容，传递时须做urlencode
http://apix.sinaapp.com/translate/?appkey=trialuser&content=%E8%A1%A8%E7%A4%BA

018\. 星座运势接口 \[20131104\]

name: 星座名，传递时须做urlencode
http://apix.sinaapp.com/astrology/?appkey=trialuser&name=%E7%99%BD%E7%BE%8A%E5%BA%A7

019\. 彩票开奖结果接口 \[20131104\]

name：彩票名称，传递时须做urlencode
http://apix.sinaapp.com/lottery/?appkey=trailuser&name=%E5%8F%8C%E8%89%B2%E7%90%83
备注：支持双色球,大乐透,3D,排列3,排列5,七星彩,七乐彩,胜负彩,任选九,六场半全场,四场进球

020\. 苹果IMEI/序列号查询接口 \[20131104\]

number: IMEI号或序列号
http://apix.sinaapp.com/apple/?appkey=trialuser&number=358031058974471

021\. 百科全书接口 \[20131204\]

word: 词条，传递时须做urlencode
http://apix.sinaapp.com/encyclopedia/?appkey=trialuser&word=%e5%be%ae%e4%bf%a1

022\. 图书介绍 \[20131104\]

name: 图书名，传递时须做urlencode
http://apix.sinaapp.com/book/?appkey=trialuser&name=%E7%9B%97%E5%A2%93%E7%AC%94%E8%AE%B0

023\. 歌曲介绍 \[20131104\]

name: 音乐名，传递时须做urlencode
http://apix.sinaapp.com/song/?appkey=trialuser&name=%E6%96%B0%E5%B9%B4%E5%A5%BD

024\. 影片介绍 \[20131104\]

name: 电影名，传递时须做urlencode
http://apix.sinaapp.com/movie/?appkey=trialuser&name=%E9%BE%99%E7%8C%AB

025\. 历史上的今天接口 \[20140104\]

http://apix.sinaapp.com/history/?appkey=trialuser

026\. 经济指标 027. 财经大事 028. 手机充值

http://apix.sinaapp.com/recharge/?appkey=trialuser
备注：腾讯财付通官方网站充值接口，基于微信安全支付

029\. 城市团购 \[20140104\]

city: 城市名，传递时须做urlencode，你可以指定一个固定城市 [查看支持城市列表](http://apix.sinaapp.com/groupon/support/)
keyword：关键字，传递时须做urlencode，可为商户名、商品名、地址等
http://apix.sinaapp.com/groupon/?appkey=trialuser&city=%E6%B7%B1%E5%9C%B3&keyword=%E5%8D%8E%E5%BC%BA%E5%8C%97

030\. 城市优惠 031. 黄金 032. 白银 033. 外汇 034. 图片检索 035. 视频检索 036. 地图位置服务 \[20140104\]

lat：纬度
lng：经度
entity：查询名称，传递时须做urlencode
http://apix.sinaapp.com/map/?appkey=trialuser&lat=39.915&lng=116.404&entity=%E5%8C%BB%E9%99%A2

037\. 菜谱 \[20140104\]

name: 菜谱名称，传递时须做urlencode
http://apix.sinaapp.com/recipe/?appkey=trialuser&name=%E5%89%81%E6%A4%92%E9%B1%BC%E5%A4%B4

038\. 手机号码归属地查询接口 \[20140105\]

number: 手机号码
http://apix.sinaapp.com/mobilephone/?appkey=trialuser&number=13456789000

039\. 身份证归属查询查询接口 \[20140105\]

number: 15或18位身份证号码
http://apix.sinaapp.com/idcard/?appkey=trialuser&number=542621201212210003

040\. 电视节目表 \[20140116\]

http://apix.sinaapp.com/tvprogram/?appkey=trialuser

041\. IP地址查询接口 \[20140116\]

http://apix.sinaapp.com/ip/?appkey=trialuser&ip=202.203.208.80

042\. 每日宜忌查询接口 \[20140116\]\[源网站已关闭，失效\]

http://apix.sinaapp.com/almanac/?appkey=trialuser

043\. 疾病查询 \[20140121\]

name: 疾病名，传递时须做urlencode
http://apix.sinaapp.com/illness/?appkey=trailuser&name=%E6%84%9F%E5%86%92

044\. 号码吉凶 045. 邮政编码

code：邮政编码
http://apix.sinaapp.com/postcode/?appkey=trailuser&code=518057

046\. 产品比价查询接口 \[20140118\]

name: 商品名，传递时须做urlencode
http://apix.sinaapp.com/price/?appkey=trialuser&name=iphone%205s

047\. 食物热量查询接口 \[20140120\]

name：食物名
http://apix.sinaapp.com/calorie/?appkey=trailuser&name=%E9%B8%A1%E8%9B%8B

048\. 人品计算 \[20140118\]

name: 人名，传递时须做urlencode
http://apix.sinaapp.com/moral/?appkey=trialuser&name=%E5%BC%A0%E4%B8%89

049\. 违章查询 \[20140118\]

http://apix.sinaapp.com/peccancy/?appkey=trialuser

050\. 药物查询 \[20140117\]

name: 药物名，传递时须做urlencode
http://apix.sinaapp.com/medicine/?appkey=trialuser&name=%E9%9D%92%E9%9C%89%E7%B4%A0

051\. 周易算命 \[20140117\]

name: 人名，传递时须做urlencode
http://apix.sinaapp.com/fortune/?appkey=trailuser&name=%E5%BC%A0%E4%B8%89

052\. 机票查询 \[20140118\]

http://apix.sinaapp.com/airline/?appkey=trialuser

053\. 酒店查询 \[20140119\]

http://apix.sinaapp.com/hotel/?appkey=trialuser

054\. 驾照模拟考试 \[20140119\]

http://apix.sinaapp.com/drivingtest/?appkey=trialuser

056\. 在线点歌查询接口 \[20140119\]

singer: 歌手名，传递时须做urlencode
song: 歌曲名，传递时须做urlencode
http://apix.sinaapp.com/music/?appkey=trialuser&singer=%E5%87%A4%E5%87%B0%E4%BC%A0%E5%A5%87&song=%E6%9C%80%E7%82%AB%E6%B0%91%E6%97%8F%E9%A3%8E

057\. 车牌归属地吉凶 \[20140119\]

number：车牌号码。例如：湘C12345，传递时须做urlencode
http://apix.sinaapp.com/platenumber/?appkey=trialuser&number=%E6%B9%98C12345

058\. 冬吴相对论 \[20140120\]

number：节目期号
http://apix.sinaapp.com/dongwu/?appkey=trialuser&number=123

059\. 每日英语 \[20140120\]

type：类型，目前支持translation, listening
http://apix.sinaapp.com/daily/?appkey=trailuser&type=translation

060\. 实时路况 \[20140120\]

http://apix.sinaapp.com/traffic/?appkey=trialuser

061\. 菜价查询 \[20140121\]

http://apix.sinaapp.com/foodprice/?appkey=trialuser

062\. 成语词典 \[20140121\]

word：成语名，传递时须做urlencode
http://apix.sinaapp.com/idiom/?appkey=trailuser&word=%E6%96%B9%E5%85%B4%E6%9C%AA%E8%89%BE

063\. 人脸识别接口 \[20140315\]

picurl：图片地址，传递时须做urlencode
http://apix.sinaapp.com/face/?appkey=trialuser&picurl=http://www.ineiyi.com/uploads/allimg/1312/79-131213142315.jpg

064\. 四六级成绩查询接口
---------------

http://apix.sinaapp.com/cet/?appkey=trialuser