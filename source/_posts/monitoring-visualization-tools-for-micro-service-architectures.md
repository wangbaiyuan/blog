---
title: 【译】微服务架构的监控与可视化工具
tags:
  - 应用监控
  - 微服务
url: 2590.html
id: 2590
categories:
  - 技术
abbrlink: 38074
date: 2018-05-04 15:44:32
---

> 最近一直在考虑如果有个东西展示我们的多个微服务之间调用关系，以及显示它们的状态，并通过网络拓扑图的方式显示数据的流向、错误追溯，如果做的通用起来一定是个好的框架。主要的思路就是给各个微服务制定一定的通信协议，让他们遵守一定协议上报到服务器，服务器进行UI展示。常言道，“国外的公司会玩”，才发现一些公司已经给做出来了。 本文翻译自：[Tools to Monitor and Visualize Microservices Architecture | ProgrammableWeb](https://www.programmableweb.com/news/tools-to-monitor-and-visualize-microservices-architecture/analysis/2016/12/14)

构建和部署分布式应用程序后，监视和可视化它至关重要，以确保软件的可靠性，可用性和预期的性能。这并不容易。 由微服务架构驱动的应用程序的异构和分布式特性使得监视，可视化和分析成为一个难题。传统的应用程序监控和性能管理（APM）解决方案不适合当今复杂的分布式应用程序。 幸运的是，在过去的几年里已经推出了几种新的APM解决方案来解决这些问题。这些APM解决方案利用人工智能（AI），机器学习和图形分析等先进技术来监控，可视化和分析微服务架构。许多现代APM解决方案还包括有效管理微服务体系结构所需的分布式跟踪和拓扑可视化功能。

分布式跟踪和拓扑可视化
-----------

当前的开源分布式跟踪系统包括Zipkin，HTrace，X-Trace和Trace。还有[OpenTracing项目](http://opentracing.io/)，旨在提供与供应商[无关的](https://docs.oracle.com/cd/E13222_01/wls/docs100/programming/context.html) API，以便可以在所有流行的平台上实施分布式跟踪和[上下文传播](https://docs.oracle.com/cd/E13222_01/wls/docs100/programming/context.html)。 Battery Ventures的技术研究员，Netflix前任首席架构师Adrian Cockcroft在[最近的一次演讲中](http://www.slideshare.net/adriancockcroft/microservices-application-tracing-standards-and-simulators-adrians-at-oscon)描述了分布式跟踪，他说：“分布式跟踪系统几乎实时地收集端到端延迟图（迹线）。你可以比较痕迹来理解为什么某些请求需要比其他请求更长的时间。 并非所有可用的开源分布式跟踪系统都包含拓扑可视化功能，这可能是一项重要功能。拓扑可视化对微应用架构和其他分布式应用程序中的应用程序布局进行映射或图表化。当您需要发现性能问题和其他问题时，这样做非常重要。

![](http://baiyuan.wang/wp-content/uploads/2018/05/20180504154312115.jpg)

SimianViz演示屏幕截图，更复杂的Netflix可视化：[查看现场演示](http://simianviz.surge.sh/netflix)。 Adrian Cockcroft最近发布了一个新的开源工具[SimianViz](https://github.com/adrianco/spigo)（以前称为Spigo），它可以生成对复杂微服务的大规模模拟。公司可以使用这些模拟来进行拓扑可视化，并且可以对微服务监控解决方案进行压力测试，而无需设置大型测试配置。 Netflix和LinkedIn等主要技术公司已经建立了自己的分布式跟踪和性能监控解决方案。对于Netflix而言，由于其需要可扩展性，因此对其多种分布式跟踪工具的需求受到驱动，因为大多数商业工具无法在Netflix所需的级别进行扩展。Netflix还使用各种可视化工具，包括按需CPU [火焰图](http://techblog.netflix.com/2016/04/saving-13-million-computational-minutes.html)来分析和优化Java和Node.js应用程序的性能。 LinkedIn有一个实时[分布式跟踪系统](https://engineering.linkedin.com/distributed-service-call-graph/real-time-distributed-tracing-website-performance-and-efficiency)，它使用Apache Samza结果来构建实时呼叫图。调用图用于LinkedIn分布式架构的性能优化和根本原因分析。 大多数公司没有像LinkedIn和Netflix这样的公司的大量资源，因此从头开始构建定制的分布式跟踪和性能监控解决方案可能是不可能的。幸运的是，任何规模公司的开发人员都可以使用许多工具来监视和可视化分布式应用程序。

微服务架构的监控和可视化
------------

任何构建于微服务架构上的系统都有很多。微服务体系结构通常由几十个甚至几百个细粒度的服务组成; 每个用户交易都经历了许多这些服务。另外，事务通常是异步的，涉及多个并发服务请求。传统的APM产品通常无法监控处理多个并发服务请求的分布式应用程序。 它们固有的复杂性和高可扩展性要求导致了使用机器学习，图形分析，分布式跟踪，拓扑可视化和其他尖端技术的应用程序监视和可视化工具的创建。 以下是这些解决方案的几个示例，因此您可以了解可用的工具以帮助您了解软件中发生的情况。

AppDynamics
-----------

![](http://baiyuan.wang/wp-content/uploads/2018/05/20180504154315215.png)

图片来源：[AppDynamics](https://www.appdynamics.com/product/application-performance-management/) 虽然[AppDynamics](https://www.appdynamics.com/product/application-performance-management/)已经有相当长的一段时间了，但该公司在2015年6月推出了机器学习驱动的APM产品，以监控，管理和分析诸如微服务之类的复杂体系结构。AppDynamics实时显示应用程序性能并自动发现应用程序拓扑和相互依赖关系。其APM工具还包括分布式跟踪，拓扑可视化和动态标记。 开发人员可以使用AppDynamics来确定分布式应用程序的运行状况，了解事务路径，确定服务失败的根本原因，并获得对微服务体系结构的其他重要见解。AppDynamics API可以帮助扩展和定制平台的功能。

Instana
-------

![](http://baiyuan.wang/wp-content/uploads/2018/05/20180504154434319.png)

图片来源：[Instana](https://www.instana.com/) Instana是Web应用程序的监控和管理平台，成立于2015年4月。其关键特征之一是智能虚拟机器人助理Stan。 Stan帮助Instana用户（即开发人员和DevOps）通过即时通知来监控和优化复杂的应用程序和体系结构。Stan拥有丰富的DevOps知识，并不断学习和理解尖端的应用程序组件和体系结构。机器人助手依赖于多种技术，包括动态依赖图，自动发现和传感以及组件和系统的健康预测。Instana还包含一个实时知识引擎，可自动发现应用拓扑和相互依赖关系。 Instana使用机器学习，数学算法和专有知识系统来提供动态图形和可视化。Instana公司承诺，开发人员可以测量分布式应用程序的健康状况（延迟，错误率等），了解服务关系和相互依赖性，调查特定事件和服务故障（实时和历史），并获得更好的理解的整体应用程序。

Netsil
------

![](http://baiyuan.wang/wp-content/uploads/2018/05/20180504154436413.png)

图片来源：[Netsil](http://netsil.com/product/) [Netsil](http://netsil.com/product/)分布式应用监控和分析平台成立于2016年，自动发现完整的应用拓扑结构，持续监控分布式应用，执行分布式跟踪以及分析应用指标（从历史到现在）。 基于微服务的应用程序由多个服务组成，通常使用不同的语言和框架构建。虽然分布式应用程序的服务可能使用多种语言和框架，但这些服务的协议通常是相同的（REST，HTTP，RPC，pub / sub等）。像Netsil这样的一些APM工具可以与这些通用协议监控服务集成，无论语言或框架如何。 Netsil监视和捕获分布式应用程序服务交互数据，以创建可视化，帮助开发人员发现和管理事件，衡量应用程序的整体运行状况，并理解应用程序的组件和依赖关系。

OpsClarity
----------

![](http://baiyuan.wang/wp-content/uploads/2018/05/20180504154440513.jpg)

图片来源：[OpsClarity](https://www.opsclarity.com/) [OpsClarity](https://www.opsclarity.com/)于2015年12月推出，是一款面向高速Web规模应用的智能监控和分析平台。OpsClarity承诺的功能包括自动拓扑发现和度量收集，拓扑可视化和性能监控。 它的一个组成部分是一个操作知识图表，它理解并不断学习操作数据模型，服务拓扑和其他应用程序/系统性能基线。开发人员可以利用OpsClarity [RESTful API](https://support.opsclarity.com/hc/en-us/articles/213700557-Custom-metrics-API)来捕获自定义指标，为每个指标标注注释，并推送指标和事件。OpsClarity还提供了监视和分析工具，可显示自上而下的统一视图以及深入数据可视化。 OpsClarity使用AI和图形分析来可视化和分析大规模分布式应用程序。基础架构主机地图显示每台主机或服务的运行状况; 拓扑图帮助开发人员了解服务依赖性和基础架构组件; 时间线功能使开发人员能够回顾并查看以前的系统状态，以了解错误和失败的发生情况。

共同能力
----

本文中突出显示的大多数APM工具都包含常见功能，例如自动发现应用程序拓扑和相互依赖性，监视应用程序运行状况，服务级别警报以及重播系统状态。 自动发现应用程序拓扑和相互依赖性可节省开发人员的时间，并缩短平均修复时间（MTTR）。开发人员不必花费数小时就可以找出服务关联和映射应用程序组件。应用程序拓扑的可视化可以帮助开发人员识别和减少服务依赖性中的瓶颈。 分布式应用程序中的服务可能存在延迟问题，错误和其他影响应用程序整体运行状况的问题。监视应用运行状况并提供服务级别警报的工具可帮助开发人员快速发现并修复应用程序问题 一些APM解决方案包括历史重播功能，可帮助开发人员调查和确定服务故障和错误的根本原因。系统状态的历史回放还可以帮助开发人员发现拓扑变化并更好地了解整体应用。

新一代APM工具
--------

复杂的分布式应用程序数量持续增长，需要新型的应用程序监控和可视化工具来帮助烦恼的开发人员迷失在调试迷宫中，弄清楚：“为什么不按照它应该的方式工作？ ！” 多个应用程序监视和管理平台正在尽力让开发人员洞察这些复杂的，相互关联的应用程序。这些APM平台利用了人工智能，机器学习和图形分析等先进技术。 传统的应用程序监视和管理平台已经不够用了。随着应用程序体系结构的不断发展和变得越来越复杂，监控，分析和管理应用程序的工具也必须发展。