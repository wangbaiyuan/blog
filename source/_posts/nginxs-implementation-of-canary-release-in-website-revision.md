---
title: Nginx在网站改版中实现金丝雀发布
tags:
  - 运维
url: 3498.html
id: 3498
categories:
  - 技术
abbrlink: 2623
date: 2019-04-23 21:07:32
---

在网站改版中我们希望选取部分用户进行金丝雀发布来给自己的新网站做“试点”，在确认新网站使用没有问题后，会慢慢加大新网站“试点”的比重，从而用到“金丝雀发布”。 “金丝雀发布”这一典故来源于采煤行业，据说以前矿工挖煤的时候，矿工下矿井前会先把金丝雀放进去，或者挖煤的时候一直带着金丝雀。金丝雀对甲烷和一氧化碳浓度比较敏感，会先报警。 矿工们用金丝雀对矿井进行空气测试的道理没沿用到软件行业。当我们要发布应用的新版本时，我们通常只会将部分流量切到新版本，当测试新版本应用没有问题时，再慢慢加大切向新版本流量的比例，这种发布方式被称为“金丝雀发布”。 那么，我们可以怎样实现金丝雀发布呢？ 在不涉及istio的情况下，我们一般会采用Nginx反向代理服务器来实现这种流量切分，通过编写nginx.conf规则来实现。 

[![Nginx实现金丝雀发布](https://baiyuan.wang/wp-content/uploads/2019/10/baiyuan.wang_2019-10-23_13-25-07.png)](https://baiyuan.wang/wp-content/uploads/2019/10/baiyuan.wang_2019-10-23_13-25-07.png)

方法一：没有“记忆”的随机流量切分
-----------------

```nginx.config
http {
upstream service {
    server {new-website-url} weight=10;
    server {old-website-url} weight=90;
}
server {
    listen       80;
    server_name  baiyuan.wang;
    location / {
        proxy_pass http://service;
    }

}
```

这种方式常常用于配置nginx作为负载均衡时，可以控制流量导向不同应用服务器的比重，当然也可以通过用于新旧版本的流量切分。但这种方式的一个问题是用户在多次请求时，被导向的页面是随机的。比如反复刷新浏览器，有时被导向新版网站，有时被导向旧的，这显然不是我们希望发生的。

方法二：有“记忆”的流量切分
--------------

所以我们希望服务能“记住”每个用户第一次访问的版本，后续的请求依旧导向到改版本。而HTTP请求是无状态的，即每个HTTP请求实际上是独立的，而不是和用户建立一个长久的会话。我们只有设置里一个“特定的标记”，服务器才能知道你是不是同一个用户，所以我们需要使用cookie来标记用户。使用cookie而不是localstorage的原因是cookie是每次都会被浏览器发往服务器端。 这里，我们使用cookie来记录用户第一次访问的版本。后续访问时读取该cookie字段来控制nginx的转发行为。

```nginx.config
http {

    split\_clients "${http\_user\_agent}${date\_gmt}" $app_version {
        10%     new;
        90%     old;
    }

    map $cookie\_split\_version $upstream_group {
        default $app_version;
        "old" "old";
        "new" "new";
    }

    location = / {
        add\_header Set-Cookie "split\_version=$upstream_group;Path=/;Max-Age=21600;";

        if ($upstream_group = "old") {
            proxy\_pass https://$old\_url;
            break;
        }
        if ($upstream_group = "new") {
            proxy\_pass https://$new\_url;
            break;
        }
    }
}
```
