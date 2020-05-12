---
title: 【开源】Terraform实现在Team中分享Azure订阅
tags:
  - 基础设施
url: 3505.html
id: 3505
categories:
  - 作品
  - 技术
abbrlink: 55443
date: 2019-10-25 14:59:22
---

假设你属于组织中的某个团队，现在你们只有一份Azure subscription，而你是Azure订阅的所有者。那怎么怎么把一个subscription分享给其它人，同时实现：

*   与您的团队共享Azure，每个人都可以在您的订阅中使用Azure资源。
*   每个人的环境是隔离的，比如你操作不了或者至少看不见别人创建的资源
*   每个人的私有资源组只能由其所有者管理。
*   可以与所有团队成员共享一个公共资源组。
*   当有人离开团队时，他的资源很容易被销毁避免收费。

文章 [https://lennilobel.wordpress.com/2018/10/15/adding-a-user-to-your-azure-subscription-with-resource-group-access/](https://lennilobel.wordpress.com/2018/10/15/adding-a-user-to-your-azure-subscription-with-resource-group-access/) 介绍了在Azure后台UI上实现这一需求，主要是在Resource Group级别进行了IAM控制。 同时，极客人将其进行了代码化：[https://github.com/tf-module/azure-user-resource-group](https://github.com/tf-module/azure-user-resource-group) ，它实现过程如下（详情请移步开源地址）

*   创建一个Azure AD用户组，其中包含您的团队成员，也就是你提供的邮件地址
*   分别为每个成员创建它以其姓名命名的私人资源组，利用role assignment，将自己配置为私人资源组的owner。
*   一个给整个团队共享的公共资源组，每个成员都是其贡献者，利用role assignment，将用户组配置为该资源组的contributor。