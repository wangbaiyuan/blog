---
title: ElasticSearch增量数据同步与无缝升级
url: 2632.html
id: 2632
categories:
  - 技术
abbrlink: 20378
date: 2018-10-07 12:32:59
tags: ''
---

ElasticSearch作为一款开源的全文搜索引擎在如今的软件开发得到了越来越广泛的应用，在业务功能开发方面，可以选用ElasticSearch提供比数据库查询更强大的搜索方式，同时基于搜索结果评分（权重）和高亮让我们很轻易地通过它实现一个站内的搜索引擎。

ElasticSearch VS 数据库
--------------------

刚接触ElasticSearch（ES）时我们经常将它与数据库类比起来学习，从结构上：

*   Indices类似于数据库的database
*   Type类似于数据库的table
*   Fields类似于数据表的列
*   Documents类似于数据表的行（即每条记录） 同时，数据库提供的搜索语法都能在ES上找到影子，比如数据库提供AND、OR逻辑运算符，ES中有must, should，而数据库的如“like”等文字匹配功能在ES中则更加强大。

尽管如此，ES本质上的定位仍是一个搜索引擎。NoSQL和ES一样都有着相同松散的结构，虽然我们也有一些讨论是否可以[用ES来替代非关系型数据库](https://www.zhihu.com/question/25535889)(撇开ES是不是一种NoSQL)，但是一个现实是ES和NoSQL依旧是互有利弊；再者，传统关系型数据库的事务性、多表关联结构也是ES无法提供的。 所以，在实际的开发过程中，关系型数据库、NoSQL、ES依旧是相辅相成的关系，我们一般只会在较复杂的搜索场景下会选用ES提供搜索服务，而其源数据依旧来自于数据库，所以这就引出了ES与数据库之间的数据同步问题。

全量数据导入
------

在第一次将存储在数据库里面的数据导入到ES需要执行全量导入，当后续有数据更新时通过消息队列通知ES更新数据。

使用消息队列实现ES增量同步
--------------

消息队列在软件开发领域是一个十分常见的名词。

在操作系统层面，我们可以利用消息队列做进程间的通信；在一个单体应用，比如Android应用，利用一个MessageQueue类来解决UI线程与耗时子线程之间的界面刷新问题，在物联网领域，基于发布/订阅模型模型的MQTT协议被广泛应用于平台对海量设备的消息分发，而在分布式系统，以及最近几年日益热门的微服务架构中，是一个十分常用的实现异步消息、解耦应用、最终一致性的组件。

常见的消息队列采用“发布-订阅”模式，初入门者几乎可以认为这是个“观察者模式”。

![消息队列模式-“发布-订阅”模式](https://baiyuan.wang/wp-content/uploads/2019/03/20190314095430110.jpg)

消息队列模式-“发布-订阅”模式

目前常用的消息队列框架有Kafka、RabbitMQ。

消息队列实现增量同步的方式，是在主服务对数据库进行创建、删除、修改一条记录时，发布一条主题消息给消息队列，同时同步服务需要订阅相关主题，这样消息队列就可以将更新的记录转发给同步服务，同步服务再根据消息的内容在ES里面进行更新记录。

消息队列实现增量同步除了可以解耦主服务和同步服务，还有一个好处就是保证同步的容错性，比如当数据库添加一条记录时，如果直接采用HTTP的方式（可能是一个post请求）与同步服务取得联系时出现连接失败、post请求失败的时候，如果不采取任何措施这条记录就会无法得到同步。而消息队列的失败重发的机制可以很好的解决这个问题，同时消息队列，FIFO（先进先出）的机制也保证了消息转发的顺序。

ES索引更改后怎样做无缝重建
--------------

ES索引更改发生在ElasticSearch 索引结构发生变化，比如随着业务的发展对Type中字段的增减以及字段类型的更改，或者发生在ES版本升级带来的结构变化时，例如ES 5.0版本将之前的string类型拆分为text和keyword类型，当我们希望对ES进行版本升级时，那么之前的string类型就不可再用了。

与常见的Web服务的蓝绿部署实现无宕机升级类似，ES无缝升级也可以类比实现。Web服务的蓝绿部署的原理是使用LoadBalancer（负载均衡器）做流量切换，新旧服务都有不同的访问URL，但是只有LoadBalancer的URL对外可访问，即：

*   服务升级前：负载均衡指向旧服务V1
*   服务升级中：发布新服务V2，负载均衡依旧指向旧服务，此时存在新旧服务同时存在
*   服务升级完成：新服务V2启动完成，负载均衡切换指向，将访问流量导向新服务V2
*   服务升级完成：负载均衡切换指向后停掉旧服务V1

![蓝绿部署](https://baiyuan.wang/wp-content/uploads/2019/03/20190314095430213.jpg)

蓝绿部署

### ES索引的别名

ES提供了通过索引别名（alias）来访问索引的方式：比如

curl -XPOST 'http://localhost:9200/_aliases' -d 
{
    "actions": \[
        {"add": {"index": "test_20181007", "alias": "test"}}
    \]
}

就为索引test\_20181007创建了一条别名test，这样访问localhost:9200/test/\_search和localhost:9200/test\_20181007/\_search都可以搜索索引里面的内容。

ES的别名的存在为ES的无缝升级和切换提供了可能，类似于负载均衡切换指向一样，我们可以让ES别名在升级前后，指向新旧不同版本的索引即可。

### ES无缝升级

*   新建带版本的新索引
*   暂停增量更新 由于在升级期间我们不希望后续的记录更新到旧索引上，所以需要将消息队列进行暂停（pause）操作，在新索引创建成功后再开启。
*   执行全量数据导入
*   切换对外别名指向 一个别名可以指向多个索引，所以我们在添加别名到新索引的同时必须从旧的索引中删除它。这个操作需要原子化，这意味着我们需要使用 _aliases 操作：

POST /_aliases
{
    "actions": \[
        { "remove": { "index": "test_v1", "alias": "test" }},
        { "add":    { "index": "test_v2", "alias": "test" }}
    \]
}

*   删除旧索引

DELETE /test_v1

*   开启增量更新 这样在升级过程中的数据库中有更新的记录将会在新索引上同步