---
title: SSD7_Exam2【规范化、E-R映射】
tags:
  - SSD7
  - 数据库
url: 1272.html
id: 1272
categories:
  - 算法语言
abbrlink: 28904
date: 2015-06-10 20:00:00
---

*   1.下表表示了那些零件供应商可以提供哪些零件。可以通过零件的ID查找到供应商的ID和名称。值得注意的是，一个零件可以由多个供应商提供，同时一个供应商可以提供多种零件

**PartID**

**PartName**

**SupplierID**

**SupplierName**

1234

Nut

223

ProMetal

1234

Nut

224

Biscayne

2134

Bolt

223

ProMetal

*   2.把下列E-R关系模型进行E-R映射算法转换。按照练习七的九个步骤进行映射，明确标示出每一步骤，没有此步骤这标志“无”

\[caption id="attachment_1273" align="aligncenter" width="643"\][![SSD7_ER_规范化](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-10_20-11-26.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2015/06/wangbaiyuan.cn_2015-06-10_20-11-26.jpg) SSD7\_ER\_规范化\[/caption\]  

一）规范化
-----

1.PK(PartID,SupplierID) 2.FD(PartID->PartName,SupplierID->SupplierName) 3.这个表属于第一范式（1NF）, 因为上述关系中，PartID、PartName、SupplierID、SupplierName等几个分量都是不可分的数据项。 同时它又不满足第二范式的非主属性完全依赖于码。 4.第一步：从1NF到2NF（对码完全依赖）： 在上述关系模式中，因为PartID->PartName（F）,SupplierID->SupplierName(F),所以应该将上述关系模式拆分为三个关系模式 ①Part(PartID,PartName) PK(PartID); FD(PartID->PartName)(F:完全函数依赖) ②Supplier(SupplierID,SupplierName) PK（SupplierID） FD(SupplierID->SupplierName)(F:完全函数依赖) ③SP(SupplierID,PartID) PK（SupplierID,PartID） 第二步：从2NF到3NF，（不部分依赖，也不传递依赖） 上述关系模式已满足要求

二）E-R映射
-------

Step 1 : 新建表 Coach(Name, Age)  PK(Name) 新建表 Player(Name, Age)  PK(Name) 新建表 Team(Name,Color) PK(Name) 新建表 Game(Number,Score,Time,Date) 新建表 Stadium(Name,Size,Location) Step 2:无 Step 3:无 Step4: Team添加属性CoachName、TeamplayWith Team(Name,CoachName,TeamplayWith) FK(CoachName)->Coach(Name), FK(TeamplayWith)->Team(Name) Step 5: Game新建属性HostName、VisitorName Game: Game(Number,HostName,VisitorName,Score,Time,Date) FK(HostName)->Team(Name) FK(VisitorName)->Team(Name) Player新建属性TeamName FK(TeamName)->Team(Name) Step 6: 新建表 TeamStadiumRecord(TeamName,StadiumName) PK(TeamName,StadiumName) FK(TeamName)->Team(Name) FK(StadiumName)->Stadium(Name) Step 7: 新建表：TeamColor(TeamName,TeamColor) PK(TeamName,TeamColor) FK(TeamName)->Team(Name) FK(TeamColor)->Team(Color) Step 8:无 Step 9:无 总结： 新建表 Coach(Name, Age,CoachName,TeamplayWith)  PK(Name) 新建表 Team(Name,Color) PK(Name) FK(CoachName)->Coach(Name) FK(TeamplayWith)->Team(Name) 新建表 Player(Name, Age,TeamName)  PK(Name) FK(TeamName)->Team(Name) 新建表 Game(Number,HostName,VisitorNameScore,Time,Date) FK(HostName)->Team(Name) FK(VisitorName)->Team(Name) 新建表 Stadium(Name,Size,Location) 新建表 TeamStadiumRecord(TeamName,StadiumName) PK(TeamName,StadiumName) FK(TeamName)->Team(Name) FK(StadiumName)->Stadium(Name) 新建表：TeamColor(TeamName,TeamColor) PK(TeamName,TeamColor) FK(TeamName)->Team(Name) FK(TeamColor)->Team(Color)