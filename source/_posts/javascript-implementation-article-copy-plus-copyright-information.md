---
title: JavaScript实现文章复制加版权信息
tags:
  - JS
  - PHP
  - 文章版权保护
url: 965.html
id: 965
categories:
  - 算法语言
abbrlink: 39543
date: 2015-03-14 17:27:03
---

俗话说“天下网站一般抄”，网上的博客文章常常被转载了无数次，虽然写博客没收入，我想写文章也应该是有版权的。尽管博客文章下面常常加了“转载请申请来源”的版权信息，比如我的是“除特别注明外，本站所有文章均为王柏元的博客原创，为了尊重作者的劳动成果，转载请注明出处[http://baiyuan.wang](http://baiyuan.wang)”；但是有些拿来主义者就是“懒得抽筋”，直接复制粘贴不加版权申明。 下面的代码是针对懒得抽筋的人设计的，是使用JavaScript实现文章复制时，在复制内容里自动添加版权信息的功能，如果这样还有人把版权信息有意删除，我就无语了。  

JavaScript实现文章复制加版权信息
=====================

1.后台主题选项加入自定义代码
---------------

<script type='text/javascript'>
function addLink() {
    var body_element = document.getElementsByTagName('body')\[0\];
    var selection;
if(window.getSelection){//DOM,FF,Webkit,Chrome,IE10
selection = window.getSelection();
alert("文字复制成功！若有文字残缺请用右键复制\\n转载请注明出处："+document.location.href);

}else if(document.getSelection){//IE10
selection= document.getSelection();
alert("文字复制成功！若有文字残缺请用右键复制\\n转载请注明出处："+document.location.href);

}else if(document.selection){//IE6+10-
selection= document.selection.createRange().text;
alert("文字复制成功！若有文字残缺请用右键复制\\n转载请注明出处："+document.location.href);
}else{
selection= "";
alert("浏览器兼容问题导致复制失败！");
}
    var pagelink = "<br /><br /> 转载请注明来源: <a href='"+document.location.href+"'>"+document.location.href+"</a>"; 
    var copy_text = selection + pagelink;
    var new_div = document.createElement('div');
    new_div.style.left='-99999px';
    new_div.style.position='absolute';
    body\_element.appendChild(new\_div );
    new\_div.innerHTML = copy\_text ;
    selection.selectAllChildren(new_div );
    window.setTimeout(function() {
        body\_element.removeChild(new\_div );
    },0);
}
document.body.oncopy = addLink;
</script>

  你可以将上述代码加进网页尾部,如果你的主题没有加入自定义代码的功能，你也可以这样参考下面的方法：

2.functions.php中加入js脚本函数
------------------------

将以下代码放到模板函数文件中(最后一个“?>”之前)：默认在页脚加载代码。

function add\_copyright\_text() { ?>

//把方法1的js代码复制粘贴到此处

<;?php

}

add\_action( 'wp\_footer', 'add\_copyright\_text');