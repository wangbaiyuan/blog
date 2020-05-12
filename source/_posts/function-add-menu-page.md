---
title: wordpress插件开发add_menu_page()函数详解
tags:
  - wordpress
  - wordpress插件制作
url: 998.html
id: 998
categories:
  - 软件开发
abbrlink: 21998
date: 2015-03-20 11:01:56
---

add\_menu\_page()函数是在wordpress的管理后台添加一个管理菜单页面。
----------------------------------------------

用法：
---

<?php add\_menu\_page( $page\_title, $menu\_title, $capability, $menu\_slug, $function, $icon\_url, $position ); ?>

参数说明：
-----

### 1.$page_title (string) (required) 文本是网页的标题标签显示在菜单中选择

Default: None

### 2.$menu_title (string) (required) 该菜单屏幕名称的文本

Default: None

### 3.$capability (string) (required) 这个菜单被显示到用户所需的能力。用户级别是过时的和不应该被用在这里！

Default: None

### 4.$menu_slug (string) (required) 段塞流的名字来引用这个菜单（应为该菜单独特）。

在3版本之前这被称为文件（或处理）参数。如果函数的参数被省略，这menu_slug应该是PHP文件处理菜单页面内容显示。

Default: None

### 5.$function (string) (optional) 显示菜单页面的页面内容的功能。

Default: None. 从技术上讲，函数的参数是可选的，但是如果它没有提供，那么WordPress将假设包括PHP文件将生成管理屏幕，而不调用一个函数。大多数插件作者选择将页面生成代码在函数内主要的插件文件。如果函数的参数是指定的，可以用于文件参数的任何字符串。这允许使用的页面等 ?page=my\_super\_plugin_page instead of ?page=my-super-plugin/admin-options.php.

该函数必须在两种方式中的一种参考:

如果函数是一个类成员内部的插件应该参考阵列（$this, ‘function_name’ ）在所有其他情况下，使用函数的名字本身就足够了

### 6.$icon_url (string) (optional)URL图标可用于此菜单。

此参数是可选的。图标应该是相当小的，约16×16像素的最好的结果。你可以使用plugin\_dir\_url（\_\_file\_\_）功能得到你的插件目录的URL然后添加图像文件给它。你可以设置$icon_url to “div” to have wordpress generate <br> tag instead of <img>.这可以用于更先进的形成通过CSS，如改变图标悬停。

Default:

### 7.$position (integer) (optional) 位置在菜单命令菜单应该出现。

默认情况下，如果这个参数被省略，菜单将出现在菜单的底部结构。数值越高，较低的位置，在菜单。警告：如果两个菜单项使用相同的位置属性，一个项目可能被覆盖，所以只有一项显示！冲突的风险，可以通过使用十进制而不是整数的值减少，例如63.3而不是63（注：使用引号中的代码，即“63.3′）。

Default: 底部的菜单结构

例子
--

<?php
add\_action('admin\_menu', 'register\_custom\_menu_page');
function register\_custom\_menu_page() {
add\_menu\_page('custom menu title', 'custom menu', 'add\_users', 'myplugin/myplugin-index.php', '', plugins\_url('myplugin/images/icon.png'), 6);
}
?>