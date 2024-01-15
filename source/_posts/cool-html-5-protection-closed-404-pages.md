---
title: 一个炫酷的HTML5 “闭站保护中”404页面
tags:
  - SEO
  - Web
url: 1547.html
id: 1547
categories:
  - 算法语言
abbrlink: 52083
date: 2015-12-18 09:41:23
---

网站一夜关键词降为0
----------

王柏元的博客疑似被百度搜索K掉，自上个月17号以来关键词个数一路走低，直到这个月降为0，昨天甚至通过“王柏元的博客”、“王柏元”这样的关键词我的网站不在前5名、甚至无法搜索到我的网站，初步判断的原因可能是我上个月解析的www.baiyuan.wang到本网站因为疏忽没有实行301重定向到baiyuan.wang，导致百度搜索认为我的网站被镜像。在未找到确切原因之前，我决定通过百度站长平台采取闭站保护，防止不明原因对网站SEO进一步产生影响。   [![王柏元的博客被K](http://baiyuan.wang/wp-content/uploads/2015/12/baiyuan.wang_2015-12-18_09-23-29.jpg)](http://baiyuan.wang/wp-content/uploads/2015/12/baiyuan.wang_2015-12-18_09-23-29.jpg)   闭站保护申请期间，百度要求被保护的网站要出于不能访问状态：全站HTTP状态码设置为404，或者将服务器关机服务器。通过域名不解析的方法是不能通过闭站保护审核的。所以对于虚拟主机用户不能切断服务器电源情况下，可以采用全站404的方式申请闭站保护。

新建如下内容的index.php实现全站404
-----------------------

你可以将原来根目录的原index.php文件改名，新建一个index.php内容如下：

<?
@header("http/1.1 404 not found"); 
@header("status: 404 not found"); 
?>


<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>闭站保护中……</title>

</head>

<body>

<!--
Recreating Apple Watch's Utility face <http://www.apple.com/watch/design/> in HTML+CSS+JS
-->



<style>
    body {
        background: black;
    }

    .clock {
        position: absolute;
        opacity: 1;
    }

    .fill .clock {
        left: 50%;
        top: 50%;
    }

    .centre {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
    }

    .expand {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }

    .anchor {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
    }

    .element {
        position: absolute;
        top: 0;
        left: 0;
    }

    .round {
        border-radius: 296px;
    }

    .circle-1 {
        background: white;
        width: 12px;
        height: 12px;
    }

    .circle-2 {
        background: #FA9F22;
        width: 8px;
        height: 8px;
    }

    .circle-3 {
        background: black;
        width: 4px;
        height: 4px;
    }

    .second {
        transform: rotate(180deg);
    }

    .minute {
        transform: rotate(54deg);
    }

    .second-hand {
        width: 2px;
        height: 164px;
        background: #FA9F22;
        transform: translate(-50%,-100%) translateY(24px);
    }

    .hour {
        transform: rotate(304.5deg);
    }

    .thin-hand {
        width: 4px;
        height: 50px;
        background: white;
        transform: translate(-50%,-100%);
    }

    .fat-hand {
        width: 10px;
        height: 57px;
        border-radius: 10px;
        background: white;
        transform: translate(-50%,-100%) translateY(-18px);
    }

    .minute-hand {
        height: 112px;
    }

    .hour-text {
        position: absolute;
        font: 40px Hei, Helvetica, Arial, sans-serif;
        color: white;
        transform: translate(-50%,-50%);
    }

    .hour-10 {
        padding-left: 0.4ex;
    }
    .hour-11 {
        padding-left: 0.25ex;
    }

    .minute-text {
        position: absolute;
        font: 12px Avenir Next, Helvetica, Arial, sans-serif;
        color: white;
        transform: translate(-50%,-50%);
    }

    .minute-line {
        background: white;
        width: 1px;
        height: 9px;
        transform: translate(-50%,-100%) translateY(-131px);
        opacity: 0.34;
    }
</style>
<h1 style="color:white">王柏元的博客 闭站保护中……</h1>
<div class="fill">
    <div class="reference"></div>
    <div class="clock" id="utility-clock">
        <div class="centre">
            <div class="dynamic"></div>
            <div class="expand round circle-1"></div>
            <div class="anchor hour">
                <div class="element thin-hand"></div>
                <div class="element fat-hand"></div>
            </div>
            <div class="anchor minute">
                <div class="element thin-hand"></div>
                <div class="element fat-hand minute-hand"></div>
            </div>
            <div class="anchor second">
                <div class="element second-hand"></div>
            </div>
            <div class="expand round circle-2"></div>
            <div class="expand round circle-3"></div>
        </div>
    </div>
</div>

<script>
    var clock = document.querySelector('#utility-clock')
    utilityClock(clock)

    if (clock.parentNode.classList.contains('fill')) autoResize(clock, 295 + 32)

    function utilityClock(container) {
        var dynamic = container.querySelector('.dynamic')
        var hourElement = container.querySelector('.hour')
        var minuteElement = container.querySelector('.minute')
        var secondElement = container.querySelector('.second')
        var minute = function(n) {
            return n % 5 == 0 ? minuteText(n) : minuteLine(n)
        }
        var minuteText = function(n) {
            var element = document.createElement('div')
            element.className = 'minute-text'
            element.innerHTML = (n < 10 ? '0' : '') + n
            position(element, n / 60, 135)
            dynamic.appendChild(element)
        }
        var minuteLine = function(n) {
            var anchor = document.createElement('div')
            anchor.className = 'anchor'
            var element = document.createElement('div')
            element.className = 'element minute-line'
            rotate(anchor, n)
            anchor.appendChild(element)
            dynamic.appendChild(anchor)
        }
        var hour = function(n) {
            var element = document.createElement('div')
            element.className = 'hour-text hour-' + n
            element.innerHTML = n
            position(element, n / 12, 105)
            dynamic.appendChild(element)
        }
        var position = function(element, phase, r) {
            var theta = phase * 2 * Math.PI
            element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
            element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
        }
        var rotate = function(element, second) {
            element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
        }
        var animate = function() {
            var now = new Date()
            var time = now.getHours() * 3600 +
                    now.getMinutes() * 60 +
                    now.getSeconds() * 1 +
                    now.getMilliseconds() / 1000
            rotate(secondElement, time)
            rotate(minuteElement, time / 60)
            rotate(hourElement, time / 60 / 12)
            requestAnimationFrame(animate)
        }
        for (var i = 1; i <= 60; i ++) minute(i)
        for (var i = 1; i <= 12; i ++) hour(i)
        animate()
    }

    function autoResize(element, nativeSize) {
        var update = function() {
            var scale = Math.min(window.innerWidth, window.innerHeight) / nativeSize
            element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
        }
        update()
        window.addEventListener('resize', update)
    }
</script>

</body>

</html>
<?
exit(); 
?>

这个网页是可以访问但是http状态返回码是404，通过html5实现，能满足404要求，并且界面还是很炫酷的啦！

预览
--

![HTML5-404-闭站保护王柏元的博客](http://baiyuan.wang/wp-content/uploads/2015/12/baiyuan.wang_2015-12-18_09-37-54.jpg) \[button class="demo" size="lg" href="http://baiyuan.wang/others/index404.php" title="一个炫酷的HTML5 “闭站保护中”404页面"\]演示效果 \[/button\]