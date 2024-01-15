---
title: 支持自动提示的多引擎的搜索框
tags:
  - CSS
  - JS
  - 网站优化
url: 1575.html
id: 1575
categories:
  - 技术应用
  - 算法语言
abbrlink: 3992
date: 2015-12-30 12:01:08
---

使用网上开源的导航站源码制作了我的导航网页“百元导航”后，总觉得它丢掉了导航网站的一个很重要的东西—搜索框。于是极客人为自己的导航站加入了搜索框的功能，支持百度搜索、好搜、极客搜、CSDN搜索、蒲公英PT搜索等（可以加代码轻松扩展），除了网站界面使用了网上的代码，逻辑处理部分的js代码全由本人实现。 [![带搜索提示的搜索框百元导航网](https://baiyuan.wang/wp-content/uploads/2019/04/20190423121246120.jpg)](https://baiyuan.wang/wp-content/uploads/2019/04/20190423121246120.jpg) 带搜索提示的搜索框百元导航网

html代码：
-------

下面是搜索框的界面的html部分：

 <div class="search radius6">
            <form id="searchform" method="GET" action="https://www.baidu.com/s" target="_blank">
                <div id="params" style="display:none">
                    <input name="ie" value="UTF-8" type="hidden">
                </div>
                <select id="choose" value="0">
                    <option value="0">百度</option>
                    <option value="1">极客搜</option>
                    <option value="2">谷歌</option>
                    <option value="3">好搜</option>
                    <option value="4">搜狗</option>
                </select>
                <input baiduSug="1" class="inp_srh" id="keyword" name="wd" placeholder="请输入您要搜索的内容">
                <input class="btn_srh" id="submit" type="submit" value="搜索">
            </form>
        </div>

CSS代码
-----

*{margin:0;padding:0}
input,select{vertical-align:middle;font-size:9pt;font-family:微软雅黑}
input,textarea{padding:0;word-wrap:break-word;word-break:break-all}
li{list-style-type:none}
img{border:0 none}
a{color:#333;text-decoration:none}
a:hover{color:#1974a1}
a:link,a:visited{outline:0;color:#333;text-decoration:none}
a:hover{color:#0e4470;text-decoration:none}
.search{margin:40px auto 0;width:525px;height:35px;border:1px solid #f58400;background-color:hsla(0,0%,100%,.66);font-family:微软雅黑}
.search select{position:relative;float:left;width:95px;height:35px;background:url(images/search_ico.png) no-repeat 5pc center;color:#100909;text-indent:9px;font-weight:700;font-size:14px;line-height:35px}
option{background:#efefef;font-size:1pc}
.search input.btn\_srh,.search input.inp\_srh{float:left;height:35px;border:none;background:0 0;line-height:35px}
.search input.inp_srh{margin-left:5px;width:365px;outline:0;font-size:15px}
.search input.btn_srh{width:60px;background:#f58400;color:#fff;font-size:15px;font-family:"微软雅黑"}

 

javascript代码
------------

要想搜索框支持多搜索引擎切换，首先需要掌握搜索引擎搜索关键词的URL参数，查看有几个GET参数（搜索引擎一般都是用GET传值的），比如下面是搜索引擎搜索“王柏元的博客”的结果页的URL： https://www.baidu.com/s?ie=UTF-8&wd=%E7%8E%8B%E6%9F%8F%E5%85%83 ？ie后面是编码格式，wd后面是搜索的关键词的URLEncode编码。 所以只要做一个表单，在表单内部加入name="ie"的DOM元素，这个元素没有必要在界面上显示，可以在CSS样式中加入“display:none”，下面的addparams函数实现的就是这一功能；再加入name="wd"的文本框，就是输入关键词的那个搜索框。最后将表单的action设置为百度搜索关键词网址：https://www.baidu.com/s 下面的setEngine函数就是切换搜索引擎的函数。传入searchIndex，就是html中select下option的value；

 <script type="text/javascript">
        function addParams(name,value){
            $("#params").append('<input name="'+name+'" value="'+value+'" type="hidden">');
        }
        function setSearchEngine(searchIndex){
            var jk="http://so.baiyuan.wang/cse/search";
            var bd="https://www.baidu.com/s";
            var gg="https://www.google.com/search";
            var hs="https://www.haosou.com/s";
            var sg="https://www.sogou.com/sogou";
            var actions=\[bd,jk,gg,hs,sg\];

            $.cookie("searchId",searchIndex,
                    {expires:30}
            );
            var keywordflag=\["wd","q","q","q","query"\];
            $("#params").empty();
            $("#searchform").attr("action",actions\[searchIndex\]);
            $("#keyword").attr("name",keywordflag\[searchIndex\]);
            switch(searchIndex){
                case "0":
                    addParams("ie","UTF-8");
                    break;
                case "1":
                    addParams("s","12193527087847762795");
                    addParams("nsid","1");
                    addParams("entry","1");
                    break;
                case "2":
                    addParams("ie","UTF-8");
                    break;
                case "3":
                    addParams("ie","UTF-8");
                    break;
                case "4":
                    addParams("ie","UTF-8");
                    break;
                default:
                    addParams("ie","UTF-8");
            }
        }

为了在用户切换搜索引擎后，再次打开导航页默认显示切换后的搜索引擎，可采用cookie记录searchIndex。

var serachId=Number($.cookie("searchId"));
            if(serachId !== null && serachId !== undefined)
                serachId=serachId;
            else
                serachId=0;

            $("#choose option\[value='"+serachId+"'\]").attr("selected", "selected");
            setSearchEngine(serachId.toString());
            $("#keyword").focus();

下面的代码用以在切换搜索引擎时，如果搜索框不为空则自动搜索搜索框内关键词，不用点击“搜索按钮”。

<script language="JavaScript">
    $(document).ready(function(){
        $("#choose").change(function(){
            var sindex=$("#choose").val();
            setSearchEngine(sindex);
            function isNull( str ){
                if ( str == "" ) return true;
                var regu = "^\[ \]+$";
                var re = new RegExp(regu);
                return re.test(str);
            }
            var strings=$("#keyword").val();
            if (!isNull( strings ))
            {
                $("#submit").click();
            }

        });
        $.ajaxSetup({
            cache: true,
            scriptCharset:'GBK'
        });
      
    });
</script>

搜索框加入百度搜索自动提示
-------------

其中搜索自动提示的功能采用了百度开放的百度搜索框提示：引入一个百度的opensug.js文件，然后在要绑定搜索提示的文本框input元素中加入baiduSug="1"。这样在绑定的搜索框中输入文字即可获得和百度一样的搜索提示。 比如：

  <input baiduSug="1" class="inp_srh" id="keyword" name="wd" placeholder="请输入您要搜索的内容">

网上说百度搜索提示还有很多高级用法，比如自定义搜索提示的背景颜色、字体等等。不过极客人试过发现并不支持，你可以自行尝试，成功了欢迎来王柏元的博客交流！