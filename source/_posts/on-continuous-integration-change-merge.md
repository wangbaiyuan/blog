---
title: 关于持续集成-变更合并
tags:
  - CI/CD
  - 敏捷
url: 2935.html
id: 2935
categories:
  - 技术
abbrlink: 31541
date: 2019-02-21 15:47:29
---

发布的时候，各特性分支才merge到master，如果几个特性分支修改了相同文件并造成冲突，如果发布周期比较长的话，merge的时候可能就会造成大量冲突。个人经验，一般是尽量做到持续发布、快速迭代（尽快merge到master），其次这要求写故事卡的童鞋遵循INVEST，卡尽量小且功能无依赖并独立。在以往项目的实践一般比较灵活，小feature直接在master搞），变更比较大的在特性分支上，很少有人喜欢用feature toggle。