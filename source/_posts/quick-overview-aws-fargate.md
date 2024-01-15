---
title: AWS Fargate速览
tags:
  - AWS
  - DevOps
url: 2785.html
id: 2785
categories:
  - 技术
abbrlink: 56800
date: 2018-11-05 10:16:48
---

AWS Fargate 发布于2017年11月的re:Invent 大会，是一项让您无需管理服务器或集群即可运行容器的技术，我们只用关心应用镜像及其所需的资源即可。

![AWS Fargate在技术雷达上的位置](https://baiyuan.wang/wp-content/uploads/2019/04/20190416185422120.png) AWS Fargate在技术雷达上的位置

AWS Fargate: 关键词
----------------

*   DevOps、云计算领域
*   AWS的一个云服务
*   Severless：无服务器化
*   容器运行平台
*   和EC2 Instance在一个层次
*   支持ECS、EKS：Amazon ECS/EKS 具有两种模式：Fargate 启动类型和 EC2 启动类型

因为ECS而具备的属性
-----------

*   监控
*   弹性伸缩
*   健康检查
*   蓝绿部署
*   负载均衡
*   ECR：AWS镜像仓库
*   定时任务
*   网络配置
*   Cloudformation: 基础设施即代码

从容器运行平台方面：Fargate相比EC2 Instance 的不同、优势
--------------------------------------

![EC2 vs Fargate：架构](https://baiyuan.wang/wp-content/uploads/2019/04/20190416185423211.png) EC2 vs Fargate：架构

### EC2 Instance vs Fargate：安全性

安全职责转移给云服务厂商

*   AMI:
    *   系统更新
    *   安全漏洞
*   SSH
    *   SSH key
    *   堡垒机

### EC2 Instance vs Fargate：计价方式

*   Fargate 总费用 (以资源为单位) = vCPU 总费用 + 内存总费用
    *   vCPU 总费用 = vCPU 数 x 每 CPU-秒价格 x 使用CPU持续时间 (秒)
    *   内存总费用 = 任务数 x 内存数 (GB) x 每 GB 价格 x 每天内存持续时间 (秒) x 天数
*   EC2 Instance 总费用（以Instance为单位 = Instance Type的单价/小时 x 小时数

从Serverless角度对比Fargate和Lambda
-----------------------------

维度

Fargate

Lambda

运行单元

容器，易于迁移

Function

应用语言

无限制

语言有限，不支持复杂应用

运行时间限制

无限制

5分钟

自动扩展

可配置弹性伸缩

默认支持

存储仓库

ECR

S3

部署难度

一般

简单

持久化

有状态

无状态

计价方式

资源 \* 秒数

代码执行时间 （100ms为单位）* 代码触发次数