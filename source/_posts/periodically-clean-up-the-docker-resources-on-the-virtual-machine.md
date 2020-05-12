---
title: 定期清理虚拟机上的docker资源
url: 3526.html
id: 3526
categories:
  - 技术
abbrlink: 20866
date: 2019-12-19 10:15:46
tags: ''
---

在部署持续集成流水线项目的虚拟机上，随着构建次数的增加，机器上的docker镜像等资源会越来越多，最终将机器占满。本项目是帮助DevOps人员自动清理机器上的docker资源。

*   开源项目：https://github.com/geekeren/docker-cleaner

定期清理脚本
------
```sh
#!/bin/bash
set -e
while true; do
  echo "Starting an new job to clean Docker..."
  echo "CLEAN\_FILTER:${CLEAN\_FILTER}, CLEAN\_INTERVAL: ${CLEAN\_INTERVAL}"
  docker system prune -a -f --filter ${CLEAN_FILTER}
  echo "All docker images after cleaning are at below:"
  docker images -a
  echo "Clean Docker job finised, next job will start after ${CLEAN_INTERVAL} seconds"
  sleep $CLEAN_INTERVAL
done
```
 

Dockerfile
----------
```Dockerfile
FROM docker
ENV CLEAN_INTERVAL=3600
ENV CLEAN_FILTER="until=48h"
WORKDIR /app
COPY . .
CMD \["sh", "./clean_docker.sh"\]
```
 

K8S部署
-----

为什么是K8S部署？理论上K8S部署的服务我们一般不会关心服务的docker镜像会不会把机器占满的问题，那么为什么我还要写K8S部署呢？ 这主要用于 CI Agent跑在K8S上的情况。以微软Azure DevOps K8S Agent为例，https://github.com/Azure/helm-vsts-agent，其agent会将宿主机的docker.sock挂载在K8S node上，如果agent存在构建docker镜像的行为，就会导致agent构建出来的docker 镜像已经“脱离”了K8S的控制

```yaml
---
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: docker-cleaner
  namespace: devops
spec:
  selector:
    matchLabels:
      app: docker-cleaner
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 10%
  template:
    metadata:
      labels:
        app: docker-cleaner
    spec:
      volumes:
        - name: dockersocket
          hostPath:
            path: /var/run/docker.sock
      containers:
      - name: docker-cleaner
        image: bywang/docker-cleaner
        imagePullPolicy: Always
        env:
        - name: CLEAN_INTERVAL
          value: 14400
        resources:
          requests:
            cpu: 10m
            memory: 40Mi
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
```