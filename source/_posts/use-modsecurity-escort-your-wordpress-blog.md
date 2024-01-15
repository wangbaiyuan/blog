---
title: 利用ModSecurity为你的wordpress博客保驾护航
tags:
  - 网站安全
url: 2960.html
id: 2960
categories:
  - 技术
abbrlink: 34084
date: 2019-03-12 15:28:12
---

ModSecurity是一个入侵探测与阻止的引擎，它主要是用于Web应用程序所以也可以叫做Web应用程序防火墙；它可以作为Apache Web服务器的一个模块或单独的应用程序来运行。ModSecurity的目的是为增强Web应用程序的安全性，来保护Web应用程序避免遭受攻击. ![24173056_1dMG.gif](https://baiyuan.wang/wp-content/uploads/2019/03/20190312152420118.gif)

Availability of ModSecurity 2.9.1

ModSecurity功能特点
---------------

### HTTP流量记录

web服务器已有的日志功能已经足够进行访问请求分析，但是就web的应用分析还有些不足，特别是大多情况下没办法记录下请求体。你的对手很清楚这 一点，所以很多时候的攻击是通过POST请求产生，并导致您的系统失明。ModSecurity充分的获取HTTP交互中的所以内容，并记录完整的请求和 响应。其日志功能可以允许您更细致的做出判断究竟什么是登录的时候，并确保相关的数据都被记录下来。一些请求和响应中的某些关键字段可能包含敏感数 据，ModSecurity可以被配置成在记录这些审计日志前隐藏它。

### 实时监控和攻击检测

除了提供记录日志功能外，ModSecurity还能实时的监控HTTP的流量以检测攻击。在某些时候，ModSecurity做为一个WEB入侵检测工具，可以让你对发生在WEB系统上的一些可疑事件做出响应。

### 攻击防御和及时修补

ModSecurity能够立即针对你的WEB应用系统进行攻击防御，有三种通用的方法： 1、消极(negative)安全模型：消极安全模型监控那些异常的、不常用的和通用的WEB攻击类请求。它统计每个请求的有关IP地址、应该连接、和用户帐户的异常分数，当出现较高的异常分数时，会记录日志并完全的阻止访问。 2、积极安全模开型：部署积极安全模型后，只有那些明确的请求被允许通过，其它的一律禁止。这个模式要求你对需要保护的WEB应用要非常的了解。因此积极安全模式最好是用于那种大量访问却很少更新的系统，这样才能使这种模型的维护工作量降到最低。 3、已知漏洞攻击：其规则语言使ModSecurity成为一个理想的外部修补工具，外部修补（有时是指虚拟修补）可以减少机会之窗。一些 组织修补这些应用的漏洞通常需要几周的时间，使用ModSecurity，应用系统可以从外部修补，根本不用改应用的源码（甚至时不用去管它），可以保证 你的系统安全直到有一个合适的补丁来应用到系统中。

### 灵活的规则引擎

灵活的规则引擎是ModSecurity的核心，其实现了ModSecurity的规则语言，这是一个专用的程序语言设计的用于处理HTTP的传输 数据。ModSecurity规则语言被设计的简单易用，非常的灵活：通用的操作是简单的，而复杂的操作也是可以实现的。经过认证的 ModSecurity规则，放在ModSecurity中，包含了一整套规则，它实现了通用目的强化、协议正规化和对一些通用web应用安全问题的检 测。大量评论认为，这些规则可以用于学习研究使用。

### 嵌入式模式部署

ModSecurity是一个可嵌入式的WEB应用防火墙，意思就是它可以做为以apache为基础的已经提供WEB服务的WEB服务器的一部分。这样的部署译意风一些特殊的优势： 1、不改变已有的网络结构。只需要花几分钟就可以为你的WEB服务器添加ModSecurity，而且由于它默认被设计为完全的被动方式，你可以自由的逐步部署并且只使用你需要的特性。同样也可以根据你的需要轻松的删除或停用它。 2、不存在单点故障。与网络设备部署方式不同，你不会给你的系统带来新的故障点。 3、绝对支持负载均衡。因为它以嵌入方式运行在WEB服务器上，ModSecurity会自动的利用附加的负载均衡特性。你不需要考虑负载均衡，除非你的系统本来就需要它。 4、极少开销。因为它在WEB服务器进程内工作，不会带来网络间接通信的负载，而且只进行最小的分析和数据交换开销。 5、加密或压缩内容没问题。许多IDS系统分析SSL流量的时候很困难，但对于ModSecurity没有麻烦，因为它工作于已解密和解压的数据环节。

### 基于网络的部署

在基于apache的反向代理模式上ModSecurity同样能工作的很好，我们很多客户选择这样做。在这种情形下，装了ModSecurity的可以保护任一一种WEB服务器（即使它不是apache的）。  

基于Wordpress Docker镜像安装ModSecurity
---------------------------------

### Dockerfile

FROM wordpress:4.9.8-php5.6-apache
RUN apt-get update && apt-get install -y libapache2-mod-security2
RUN a2enmod security2

### 在站点配置文件中启用mod-security

SecRuleEngine On

<VirtualHost *:80>
    ServerName baiyuan.wang
	ServerAdmin blog@mail.baiyuan.wang
	DocumentRoot /var/www/html
	ErrorLog ${APACHE\_LOG\_DIR}/error.log
	CustomLog ${APACHE\_LOG\_DIR}/access.log cdn_combined
</VirtualHost>

### 测试

*   XSS 测试

curl 'https://baiyuan.wang/?q="><script>alert(1)</script>'

*   SQL 注入

curl "https://baiyuan.wang/?q='1 OR 1=1"

开源项目
----

*   [https://github.com/geekeren/wordpress-env](https://github.com/geekeren/wordpress-env) : 基于wordpress官方镜像添加HTTPS、HTTP2、Mod-Security、mod-headers支持，同时支持使用docker-compose一键构建包含mysql、redis、datadog的wordpress博客环境