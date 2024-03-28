---
title: 'PHP实现酒店查询:WEB+SQL数据库+JSON-API'
tags:
  - API
  - json
  - PHP
url: 1399.html
id: 1399
categories:
  - 技术
abbrlink: 36408
date: 2015-07-27 21:56:20
---

项目复述：
-----

**PROBLEM : HOTEL RESERVATION** A hotel chain operating in Miami wishes to offer room reservation services over the internet. They have three hotels in Miami: Lakewood, Bridgewood and Ridgewood. Each hotel has separate weekday and weekend (Saturday and Sunday) rates. There are special rates for rewards customer as a part of loyalty program. Each hotel has a rating assigned to it.

1.  Lakewood with a rating of 3 has weekday rates as 110$ for regular customer and 80$ for rewards customer. The weekend rates are 90$ for regular customer and 80$ for a rewards customer.
2.  Bridgewood with a rating of 4 has weekday rates as 160$ for regular customer and 110$ for rewards customer. The weekend rates are 60$ for regular customer and 50$ for a rewards customer.
3.  Ridgewood with a rating of 5 has weekday rates as 220$ for regular customer and 100$ for rewards customer. The weekend rates are 150$ for regular customer and 40$ for a rewards customer.

Write a program to help an online customer find the cheapest hotel. The input to the program will be a range of dates for a regular or rewards customer. The output should be the cheapest available hotel. In case of a tie, the hotel with highest rating should be returned.

项目思路和特点
-------

### 数据利于维护

对于一个实际生活中的项目，一个酒店的星级、价格不可能是一成不变的，为了更好地维护酒店和价格信息，利于系统后期的修改，极客人决定采用数据库管理数据。鉴于本题的要求，本项目在实现时只写了客户查询酒店信息的WEB界面，对于管理人员可能后续修改酒店的星级、名称、价格可以在数据库进行操作，本项目未予实现利于管理员操作的管理界面。

### 平台易拓展

本项目虽然采用PHP实现功能，客户的查询操作在WEB平台上实现，但是极客人特地在服务器上部署了生成JSON数据包的代码，利于将相关功能拓展到JAVA/C/C++等平台上。注：由于不涉及隐私信息，HTTP传值方式暂定为GET，当然post方式原理大致相同。

使用Bootstrap前端库构建界面
------------------

为了尽快实现界面和界面的美观，本项目采用开源WEB前端库：Bootstrap

项目文件结构
------

[![hotel](http://baiyuan.wang/wp-content/uploads/2015/07/hotel.jpg)](http://baiyuan.wang/wp-content/uploads/2015/07/hotel.jpg)    

公用代码
----

类hotelOrder：酒店订购安排类，构造函数传入开始时间，结束时间，顾客类型代号

<?php
/\*\*
 \* 酒店订购安排类，构造函数传入开始时间，结束时间，顾客类型代号
 \* 通过getCheapest()返回订购最佳选择，通过CountOfWeekend_WeekDay()等私有方法遍历指定日期间周末和工作日的天数
 */
class hotelOrder {
	private $startDate;
	private $endDate;
	private $customertype;
	function hotelOrder($istartDate, $iendDate, $icustomertype)//构造函数
	{

		$this -> startDate = $istartDate;//开始时间
		$this -> endDate = $iendDate;//结束时间
		$this -> customertype = $icustomertype;//顾客类型代号，0：普通顾客；1：rewards顾客

	}

	function getChoices() {
	//	$CheapestHotelName = "null";
		require ('../db_connect.php');
		$string = "select * from HOTEL_RESERVATION ";
		$str = @mysqli\_query($software\_db, $string);

		while ($row = mysqli\_fetch\_array($str, MYSQLI_ASSOC)) {
			$countsOfDay=$this->CountOfWeekend_WeekDay();
			
					if($this->customertype==0){//普通顾客
	$totalPrice\['name'\]=$row\['name'\];
		$totalPrice\['price'\]=$countsOfDay\['Weekend'\]*$row\['rates\_for\_regular\_In\_weekend'\]
		+$countsOfDay\['WeekDay'\]*$row\['rates\_for\_regular\_In\_weekday'\];
		
	$totalPrice\['rating'\]=$row\['rating'\];
		
		$choice\[\]=$totalPrice;
			}elseif($this->customertype==1){//rewards顾客
			$totalPrice\['name'\]=$row\['name'\];
		$totalPrice\['price'\]=$countsOfDay\['Weekend'\]*$row\['rates\_for\_rewards\_In\_weekend'\]
		+$countsOfDay\['WeekDay'\]*$row\['rates\_for\_rewards\_In\_weekday'\];
		$totalPrice\['rating'\]=$row\['rating'\];		
		
		$choice\[\]=$totalPrice;
			}
			
		}
//echo $countsOfDay\['Weekend'\]." ".$countsOfDay\['WeekDay'\];
//		$json = json_encode($choice);
//		return $json;
		return $choice;
	}

	function getCheapest() {
		$choices=$this->getChoices();
		$prices = array();
		$ratings = array();
		foreach ($choices as $choice){
			$prices\[\]=$choice\['price'\];
			$ratings\[\]=$choice\['rating'\];
		}
		
		array\_multisort($prices, SORT\_ASC, $ratings, SORT_ASC, $choices);
		return $choices;
	}

	/\*\*
	 \* 判断日期是不是周末
	 */
	private function isWeekend($date) {
		date\_default\_timezone_set('PRC');
		$w = intval(date('w', strtotime($date)));
		if ($w === 0 || $w === 6) {
			return true;
		} else
			return false;
	}

	/\*\*
	 \* 获取指定时间段内周末和工作日天数
	 */
	private function CountOfWeekend_WeekDay() {
		$count\['Weekend'\]=0;
		$count\['WeekDay'\]=0;
		date\_default\_timezone_set('PRC');
		for ($start = strtotime($this ->startDate); $start <strtotime($this ->endDate)+86400; $start += 86400)
		//这里遍历日期，所以每次增加86400秒
		{
			//echo $start.'  ';
		$w = intval(date('w', $start));
		if ($w === 0 || $w === 6) {
			$count\['Weekend'\]++;
		} 
		else
			$count\['WeekDay'\]++;
	}
		return $count;
		}

	

}
?>

web界面代码：
--------

查询首页index.php:

<html>
<head>
<meta name='viewport' content='width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;' />
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="css/common.css"/>
<script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/login.js" type="text/javascript" charset="utf-8"></script>
<title>酒店预订-powered by 王柏元</title>				
</head>
<body>
<div class="container">
<div class="jumbotron">
<h1>酒店预订查询系统</h1> 
</div>
        <h2 class="form-signin-heading">输入你下榻的起始-结束日期</h2>
  	 <form class="form-signin" action="result.php" method="get">
  	 	<div class="panel panel-default">
  	 	<div class="panel-body">
    <div class="checkbox">
        	 <label for="startDate">开始日期：</label>
          <input id="startDate" type="date" name="startDate" value="2015-07-26"/>
          <label for="endDate">结束日期：</label>
          <input id="endDate" type="date" name="endDate" value="2015-08-01"/>
        </div>
  </div>
   <div class="input-group">
    
        <span class="input-group-addon">
        <input type="radio"  value="0" checked="true" name="type" aria-label="..."/>regular customer
      </span>
        <span class="input-group-addon">
        <input type="radio" value="1" name="type" aria-label="..."/>rewards customer
     </span> 
      </span>
    </div><!-- /input-group -->
        <button class="btn btn-lg btn-primary btn-block" type="submit">查询</button>
</div>
         </form>
    </div>
</body>

</html>

 

查询结果页：
------

result.php:

<?php
header("Content-Type:text/html;charset=utf-8");
//require\_once('../db\_connect.php');
include_once ("hotelOrder.php");
//$str = file\_get\_contents("php://input");
//$arr=array();
//parse_str($str,$arr);
$startDate = $_GET\['startDate'\];
$endDate = $_GET\['endDate'\];
$customertype = $_GET\['type'\];
$hotelorder = new hotelOrder($startDate, $endDate, $customertype);
//echo json_encode($hotelorder->getChoices());
//echo json_encode($hotelorder->getCheapest());
$choices = $hotelorder -> getCheapest();
?>
<html>
	<head>
		<meta name='viewport' content='width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;' />
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/common.css"/>
		<script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/login.js" type="text/javascript" charset="utf-8"></script>
		<title>
			酒店预订查询结果-powered by 王柏元
		</title>
	</head>
	<body>
		<div class="container">
			<div class="jumbotron">
				<h1>酒店预订查询结果</h1>
				<p><a href="./" role="button">返回</a></p>
			</div>
			<div class="panel panel-default">
				<!\-\- Default panel contents -->
				<div class="panel-heading">优先级从高到低</div>
				<!\-\- Table -->
				<table class="table">
					<thead><tr><th>酒店名称</th>
							<th>总价格</th>
							<th>酒店等级</th></tr>
					</thead>
<?php
foreach ($choices as $choice){
echo "<tr><td>".$choice\['name'\]."</td><td>".$choice\['price'\]."</td><td>".$choice\['rating'\]."</td></tr>";
}
?>
				</table>
			</div>
		</div>
	</body>
</html>

*   **演示网址：[http://baiyuan.wang/others/hotel_reservation/index.php](http://baiyuan.wang/others/hotel_reservation/index.php)**
*   **演示截图：**

[![360截图-27702189](http://baiyuan.wang/wp-content/uploads/2015/07/baiyuan.wang_2015-07-27_21-52-44.jpg)](http://baiyuan.wang/wp-content/uploads/2015/07/baiyuan.wang_2015-07-27_21-52-44.jpg) [![360截图-27714919](http://baiyuan.wang/wp-content/uploads/2015/07/baiyuan.wang_2015-07-27_21-52-46.jpg)](http://baiyuan.wang/wp-content/uploads/2015/07/baiyuan.wang_2015-07-27_21-52-46.jpg)

可扩展到其他平台的JSON输出代码
-----------------

JsonCheapestHotel.php:

<?php
header("Content-Type:text/html;charset=utf-8");
include_once ("hotelOrder.php");
$startDate=$_GET\['startDate'\];
$endDate=$_GET\['endDate'\];
$customertype=$_GET\['type'\];
$hotelorder=new hotelOrder($startDate,$endDate,$customertype);
echo json_encode($hotelorder->getCheapest());
?>

*   **输出实例：\[{"name":"Lakewood","price":720,"rating":"3"},{"name":"Ridgewood","price":780,"rating":"5"},{"name":"Bridgewood","price":870,"rating":"4"}\]**