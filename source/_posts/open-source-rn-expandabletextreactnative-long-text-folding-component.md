---
title: 【开源】RN-ExpandableText：ReactNative长文本折叠组件
tags:
  - JS
  - React Native
url: 2754.html
id: 2754
categories:
  - 作品
abbrlink: 25118
date: 2018-09-19 09:37:34
---

介绍
--

移动开发经常会遇到这种情况：我们需要内容过长的文本做一个折叠的功能，那么在React Native，RN-ExpandableText就是一个解决这个问题的组件，它的使用方式和原生的**Text**组件一样，但是当你的内容超出指定行数，它会帮你把内容自动折叠。同时点击展开可以显示所有内容。 项目地址：[https://github.com/geekeren/RN-ExpandableText](https://github.com/geekeren/RN-ExpandableText)

安装
--

`npm install rn-expandable-text --save`

ExpandableText Usage
--------------------

import ExpandableText from 'rn-expandable-text'
    
    <ExpandableText
      numberOfLines={10}
      style={styles.expandableText}
      unexpandView={() => null}
      expandView={() =>
        (<View style={styles.arrow} />)
      }
    >
      {content}
    </ExpandableText>

Demos
-----

[![](https://baiyuan.wang/wp-content/uploads/2019/05/20190520083013116.gif)](https://baiyuan.wang/wp-content/uploads/2019/05/20190520083013116.gif)

Properties
----------

Prop

Description

Default

numberOfLines

The max number of lines the content will be, the content exceed this value, the expandview will show.

5

expandView

A callback function to return expand-view, you can customize the expand-view. when it's null, expand-view will disappear

unexpandView

A callback function to return unexpand-view. Usage the same as expandView

onExpand

A callback when the content expands

-

onCollapse

A callback when the content collapses

-

Follow Me
---------

#### Follow me on Wechat

#### ![](https://baiyuan.wang/wp-content/uploads/2019/05/20190520083014211.jpg)