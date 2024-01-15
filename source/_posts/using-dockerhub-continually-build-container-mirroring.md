---
title: 使用Dockerhub持续构建容器镜像
tags:
  - CI/CD
  - Docker
url: 2695.html
id: 2695
categories:
  - 技术
abbrlink: 60434
date: 2018-08-22 11:35:13
---

Context
-------

Docker作为一个轻量的的虚拟化容器技术，在现在的自动化运维上被广泛使用，同时伴随着各大云平台AWS、Aliyun，以及容器编排引擎kubernetes也都是基于Docker作为服务的基本单元，所以部署应用的第一步往往就是制作应用镜像，也就是编写Dockerfile，比如

From openjdk:8-jdk-alpine
COPY ./build/app.jar ./
CMD "java -jar app.jar"

  其基本过程是：

*   基于一个基础镜像，比如Java:alpine
*   构建项目，生成一个成果物，比如jre
*   定义镜像的入口即ENTRYPOINT或者CMD，"java -jar xx.jre"

在实际的项目中，编写的Dockerfile远非如此简单，比如openjdk提供的基础镜像里面可能没有我们需要的环境依赖，比如我们构建一个java项目时需要gradle支持；比如有一个依赖包它发布在github上，我们需要一个git命令；又比如我们在镜像的运行时，需要用gitcrypt解密一些敏感的环境变量；这就意味着我们需要基于基础镜像对一定的改造，比如加入：`RUN apk add git` 当随着项目环境依赖越来越多时，我们会发现越来越臃肿的Docker镜像会严重拖慢项目构建的时间，每一次我们的CI/CD服务器部署一次都会下载大量依赖。一个Best Practice是为项目制作自己的基础镜像，意味着下一次构建直接使用之前构建的基础镜像。 那么我们构建的基础镜像放在哪呢？

Docker Hub
----------

> 如果你第一次听说Docker Hub的话，可以这么理解，软件界有两个最大的公有仓库，一个是放代码的，叫github；还有一个是放docker镜像的，叫Dockerhub。

![Github & Docker Hub](http://baiyuan.wang/wp-content/uploads/2018/08/20180822113513119.jpg)

Github & Docker Hub

Docker Hub是世界上最大的Docker镜像公共存储库，全世界大量的Docker开发人员，开源项目和独立软件供应商（ISV）都会在这里构建和分发他们的镜像。Docker Hub也是Docker的官方仓库，当在运行命令`docker pull alpine`就是从Docker Hub上拉取的alpine镜像。 我们可以从Docker Hub上免费拉取与上传我们的镜像，如果经费充裕的话，我们也可以使用Docker Hub作为私服。 在极客人的实际项目开发中，我还没有用到Docker Hub的私服属性，一方面平时用到AWS镜像仓库ECR极其廉价也方便至极。

### 一般，我会使用Docker Hub，

*   **Docker化自己的开源项目，方便演示**

在Github开源自己的项目时，是否有演示关系到他人对项目的第一印象，使用docker可以方便快捷、无需考虑各种环境地在本地搭建出开源的项目，比如[@geekeren/magpie](https://hub.docker.com/r/bywang/magpie/)，就是存放在Docker Hub，你只需 `docker run -p 80:80 bywang/magpie`即可轻松演示。

*   **存放团队项目的基础镜像**

**_基础镜像镜像并不是应用镜像，不包含我们的项目代码_**，可以方便自己或他人复用我们的Docker镜像，也可以为社区做贡献。

*   **减轻CI压力并加快构建速度** 环境依赖变更的低频性决定我们的基础镜像不需要频繁更新，也无需频繁构建，将基础镜像存放于Docker Hub上可以将构建基础镜像的过程从CI中剥离。

Docker Hub的自动化构建
----------------

Docker Hub自动化构建允许我们关联GitHub 、 BitBucket 项目并根据指定Dockerfile自动构建镜像，同时webhook通知更新机制可以实现当github上的dockerfile有更新时触发Docker Hub构建，从而保证镜像为最新版本。

### 实践

下面为大家介绍怎样使用Docker Hub自动化构建

*   1.点击导航栏“create”选择“Automated Build”

![Create automated build](http://baiyuan.wang/wp-content/uploads/2018/08/20180822113514210.jpg)

Create automated build

*   2.关联Github账号，中间可能要求登录Github账号

![关联Github](http://baiyuan.wang/wp-content/uploads/2018/08/20180822113514313.jpg)

关联Github

*   3.选择一个Github的Dockerfile项目 这里我使用的是一个在gradle里面集成git-crypt的docker项目：[https://github.com/geekeren/docker-gradle-gitcrypt](https://github.com/geekeren/docker-gradle-gitcrypt)

![选择Github项目](http://baiyuan.wang/wp-content/uploads/2018/08/20180822113515419.jpg)

选择Github项目

*   4.创建一个Dockerhub Repo

![ 创建一个Dockerhub Repo](http://baiyuan.wang/wp-content/uploads/2018/08/20180822113516517.jpg)

*   5\. 创建一个Dockerhub Repo

![正在构建的Docker Image](http://baiyuan.wang/wp-content/uploads/2018/08/20180822113517610.jpg)

正在构建的Docker Image

这时一个[Docker Hub repo](https://hub.docker.com/r/bywang/gradle-gitcrypt/)已经大工告成，我们就可以在项目的应用镜像中使用：

FROM geekeren/gradle-gitcrypt
COPY . .
CMD xxx