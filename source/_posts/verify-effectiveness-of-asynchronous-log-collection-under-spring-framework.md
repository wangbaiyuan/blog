---
title: Spring框架下异步日志收集及验证是否生效
tags:
  - JAVA
  - Spring
url: 3181.html
id: 3181
categories:
  - 技术
abbrlink: 23420
date: 2019-05-15 17:04:20
---

Logback+AsyncAppender
---------------------

logback的介绍. Logback是由log4j创始人设计的另一个开源日志组件。 为了避免日志记录会给服务带来性能问题，在项目中决定采用“异步记录日志”进行记录。这里就要使用到**Logback的AsyncAppender组件**。简而言之，就是AsyncAppender会在请求处理的主线程以外**新建一个子线程 -“日志记录线程**”进行日志输出。**避免日志输出造成主线程阻塞**。 在运行过程中，主线程不会直接输出日志，而是将**日志以Event的方式发给日志线程**，Event在日志线程中会形成一条队列。而AsyncAppender的配置项很多都是对队列的配置，比如：

*   queueSize int BlockingQueue的最大容量，默认情况下，大小为256。
*   discardingThreshold int 默认情况下，当BlockingQueue还有20%容量，他将丢弃TRACE、DEBUG和INFO级别的event，只保留WARN和ERROR级别的event。为了保持所有的events，设置该值为0。
*   includeCallerData boolean 提取调用者数据的代价是相当昂贵的。为了提升性能，默认情况下，当event被加入到queue时，event关联的调用者数据不会被提取。默认情况下，只有"cheap"的数据，如线程名。

需要注意到点：

*   AsyncAppender只是实现将日志事件缓存到队列，具体怎么输出日志需要在 <appender-ref ref="xxxx"/>中实现，完整代码如下：

<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <springProperty scope="context" name="appName" source="spring.application.name"/>
    <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>
    <appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>info</level>
        </filter>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"service":"${appName}"}</customFields>
        </encoder>
    </appender>
    <appender name="ASYNC\_CONSOLE\_JSON" class="ch.qos.logback.classic.AsyncAppender">
        <neverBlock>true</neverBlock>
        <discardingThreshold>0</discardingThreshold>
        <queueSize>1000</queueSize>
        <appender-ref ref="JSON"/>
    </appender>
    <root level="info">
        <appender-ref ref="ASYNC\_CONSOLE\_JSON"/>
    </root>
</configuration>

Shutdown hook
-------------

为了在JVM虚拟机退出之前，能将日志线程的队列中的日志处理完毕，需要注册一个**shutdown hook** 详见： https://logback.qos.ch/manual/appenders.html#AsyncAppender

怎样验证异步日志收集是否生效
--------------

按照Logback的文档实现异步日志很简单，那么怎么验证异步日志有没有生效就是个问题。这里引入一个“**VisualVM**”工具，它可以列出一个Java进程所包含的线程。可以看到下面的AsyncAppender-Works-xxx就是日志收集线程。 [![](https://baiyuan.wang/wp-content/uploads/2019/05/WechatIMG371.png)](https://baiyuan.wang/wp-content/uploads/2019/05/WechatIMG371.png)

扩展资料
----

*   Java日志框架：logback详解：https://www.cnblogs.com/xrq730/p/8628945.html
*   Logback AsyncAppender 示例：https://examples.javacodegeeks.com/enterprise-java/logback/logback-ayncappender-example/