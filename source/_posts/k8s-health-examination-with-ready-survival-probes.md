---
title: K8S使用就绪和存活探针配置健康检查
tags:
  - 分布式系统
  - 微服务
  - 架构
url: 2894.html
id: 2894
categories:
  - 技术
abbrlink: 52212
date: 2019-01-17 18:30:19
---

健康检查
----

健康检查（Health Check）可用于服务运行的状态监控，比如腾讯旗下的DNSPOD的D监控，要求配置一个访问路径以判断网站是否可以正常访问实际上就是一个健康检查，当发现健康检查失败时会发送一个邮件通知或者短信来告知网站管理员进行维修。

![K8S流量转发](https://wangbaiyuan.cn/wp-content/uploads/2019/01/20190117183007118.jpg "K8S流量转发")

而在现代一些分布式系统中，用户访问不再是单台主机，而是一个由成百上千台实例组成的**集群**，用户请求通过**负载均衡器**分发到不同的实例，**负载均衡**帮助解决单台服务器的访问压力，同时提高了系统的**高可用性**，而**健康检查**常常作为当前实例是否“可用”的判断标准。即：**当系统发现某台实例健康检查不通过，负载均衡器将不会把流量导向该实例**。 现在的云服务厂商比如AWS一般都为负载均衡配备了健康检查，而**Kubernetes**提供了两种探针来检查容器的状态，Liveliness和Readiness，根据[官方文档](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#define-readiness-probes)，Liveliness探针是为了查看容器是否正在运行，翻译为**存活探针**（livenessProbe），Readiness探针是为了查看容器是否准备好接受HTTP请求，翻译为**就绪探针**（readinessProbe）。 在Kubernetes中，Pod是Kubernetes创建及管理的最小的可部署的计算单元，一个Pod由一个或者多个容器（Docker，rocket等等）组成，这些容器共享内存，网络以及运行容器的方式。 在Kubernetes上下文中**存活探针和就绪探针**被称作**健康检查**。这些容器探针是一些周期性运行的小进程，这些探针返回的结果（成功，失败或者未知）反映了容器在Kubernetes的状态。基于这些结果，Kubernetes会判断如何处理每个容器，以保证弹性，高可用性和更长的正常运行时间。

就绪探针
----

就绪探针旨在让Kubernetes知道你的应用**是否准备好为请求提供服务**。Kubernetes只有在就绪探针通过才会把流量转发到Pod。如果就绪探针检测失败，Kubernetes将停止向该容器发送流量，直到它通过。

存活探针
----

Liveness探测器是让Kubernetes知道你的**应用是否活着**。如果你的应用还活着，那么Kubernetes就让它继续存在。如果你的应用程序已经死了，Kubernetes将移除Pod并重新启动一个来替换它。

工作过程
----

让我们看看两个场景，来看看就绪探针和存活探针怎样帮助我们构建更高可用的的系统。

### 就绪探针

一个应用往往需要一段时间来预热和启动，比如一个后端项目的启动需要连接数据库执行数据库迁移等等，一个Spring项目的启动也需要依赖Java虚拟机。即使该过程已启动，您的服务在启动并运行之前也无法运行。应用在完全就绪之前不应接收流量，但默认情况下，Kubernetes会在容器内的进程启动后立即开始发送流量。通过就绪探针探测，直到应用程序完全启动，然后才允许将流量发送到新副本。

![就绪探针的工作过程](https://wangbaiyuan.cn/wp-content/uploads/2019/01/20190117183008212.jpg "就绪探针的工作过程")

就绪探针的工作过程

### 存活探针

让我们想象另一种情况，当我们的应用在成功启动以后因为一些原因“宕机”，或者遇到死锁情况，导致它无法响应用户请求。 在默认情况下，Kubernetes会继续向Pod发送请求，通过使用存活探针来检测，当发现服务不能在限定时间内处理请求（请求错误或者超时），就会重新启动有问题的pod。

![存活探针的工作过程](https://wangbaiyuan.cn/wp-content/uploads/2019/01/20190117183008319.jpg "存活探针的工作过程")

存活探针的工作过程

探针类型
----

探针类型是指通过何种方式来进行健康检查，K8S有三种类型的探测：HTTP，Command和TCP。 **HTTP** HTTP探测可能是最常见的探针类型。即使应用不是HTTP服务，也可以创建一个轻量级HTTP服务器来响应探测。比如让Kubernetes通过HTTP访问一个URL，如果返回码在200到300范围内，就将应用程序标记为健康状态，否则它被标记为不健康。 更多关于HTTP探测可参考[这里](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#define-a-liveness-http-request)。 **命令** 对于命令探测，是指Kubernetes在容器内运行命令。如果命令以退出代码0返回，则容器将标记为正常。否则，它被标记为不健康。 更多关于命令探测可参考[这里](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#define-a-liveness-command)。 **TCP** 最后一种类型的探测是TCP探测，Kubernetes尝试在指定端口上建立TCP连接。如果它可以建立连接，容器被认为是健康的; 如果它不能被认为是不健康的。这常用于对[gRPC](https://grpc.io/)或FTP服务的探测。 更多关于TCP探测可参考[这里](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#define-a-tcp-liveness-probe)。

### 初始探测延迟

我们可以配置K8S健康检查运行的频率，检查成功或失败的条件，以及响应的超时时间。可参考[有关配置探针的文档](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)。 存活探针探测失败会导致pod重新启动，所以配置初始探测延迟 **initialDelaySeconds**十分重要，要确保在应用准备之后探针才启动。否则，应用将无限重启！ 我建议使用[p99](https://www.quora.com/What-is-p99-latency)启动时间作为initialDelaySeconds，或者取平均启动时间外加一个buffer。同时根据应用程序的启动时间更新这个值。

举例
--

以下面的一个K8S的配置代码为例，

apiVersion: apps/v1beta1
kind: Deployment
...
...
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 120
          timeoutSeconds: 10
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 60
          timeoutSeconds: 10
          periodSeconds: 5

 

*   K8S将在Pod开始**启动后120s(initialDelaySeconds)后**利用HTTP访问8080端口的 **/actuator/health**，如果**超过10s**或者返回码不在200~300内，就绪检查就失败
*   类似的，在Pod运行过程中，K8S仍然会每隔5s(periodSeconds检测8080端口的 **/actuator/health**

**参考资料**

*   [【Kubernetes best practices: Setting up health checks with readiness and liveness probes】](https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes)
*   [【Kubernetes存活探针和就绪探针的最佳实践】](http://dockone.io/article/8367)