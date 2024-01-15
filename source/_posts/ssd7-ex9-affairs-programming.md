---
title: SSD7_EX9【事务编程】
url: 1310.html
id: 1310
categories:
  - 算法语言
abbrlink: 41013
date: 2015-06-18 11:22:54
tags: ''
---

>  这是[SSD7](http://baiyuan.wang/tag/ssd7 "查看更多关于 SSD7 的文章")练习的EX9，预计极客人将会写一个系列，更新频率会和NWPU数据库系统实验课2013级进度同步。点击标签或在本站搜索“[SSD7](http://baiyuan.wang/tag/ssd7 "查看更多关于 SSD7 的文章")”即可获取已更新的SSD7答案。[上一练习：SSD7_Exam2【规范化、E-R映射】](http://baiyuan.wang/ssd7-exam2-standardization-e-r-map.html)

下面使用**MySql**上的测试结果：

第一部分：测试数据库事务提交和回滚
-----------------

几乎所有的商业DBMS软件都会支持在事务提交前的回滚，这对于保证事务原子特性非常有用。你可以使用rollback命令撤销掉部分操作。此部分练习将会让你熟悉rollback和commit命令。

### rollback.txt：

\[toggle hide="yes" title="rollback.txt：" color=""\] 第一部分：测试数据库事务提交和回滚 3． 查询活期储蓄账户余额，将查询结果拷贝到rollback.txt文档中。 id balance 1 1105.59 2 2050.59 4． 删除定期和活期两个储蓄账户，将SQL语句拷贝到rollback.txt文档中。 DELETE FROM account 5． 查询两个账户的信息，将结果拷贝入rollback.txt文档中。 Id balance null null 6． 回滚事务。 7． 查询两个账户的余额，将结果拷贝入rollback.txt文档中。 id balance 1 1105.59 2 2050.59 8． 开始一个新事务。 9． 删除定期储蓄账户，将SQL语句拷贝入rollback.txt文档中。 DELETE FROM account WHERE id=1 10． 查询表account的所有行，将结果拷贝入rollback.txt文档中。 id balance 2 2050.59 11． 提交事务。 12． 尝试回滚刚刚提交的事务。查询表中存储的值。解释说明事务提交和回滚产生的不同影响。将结果写入rollback.txt文档中。 id balance 2 2050.59 解释：提交后的数据不可回滚到之前状态 \[/toggle\]

第二部分 测试事务隔离等级
-------------

PostgreSQL支持两种事务隔离等级。完成以下练习，熟悉PostgreSql支持的隔离等级。

### isolation.txt：

\[toggle hide="yes" title="isolation.txt" color=""\]5. 第一个窗口，查询account关系所有行，结果拷贝入isolation.txt文档中，用序号标识出数据来自于窗口一。 窗口① id balance 1 105.59 2 455.66 6. 窗口② id balance 1 105.59 2 1050.59 8.窗口② id balance 1 105.59 2 455.66 第一个窗口的结果已生效，因为窗口①已将数据提交。、 通过select @@tx\_isolation;命令查询到两窗口的当前事务隔离等级都是REPEATABLE-READ。 11.set tx\_isolation='SERIALIZABLE'; 14.窗口① id balance 1 105.59 2 1400 窗口② id balance 1 1 2 455.66 16.窗口①活期储蓄账户值没有更新，窗口②定期储蓄账户值没有更新。 SERIALIZABLE事务隔离级别最严厉， 在进行查询时就会对表或行加上共享锁，其他事务对该表将只能进行读操作， 而不能进行写操作。 17. 窗口① id balance 1 1 2 1400 窗口② id balance 1 1 2 1400\[/toggle\]

第三部分 阻塞和死锁
----------

### 问题

\[toggle hide="false" title="第三部分 阻塞和死锁" color=""\] 1.运行SQL script建立一个小的银行数据库，account关系包含两列，用户id和账户余额。有两行数据，定期储蓄账户（id为1）和活期储蓄账户（id为2）。 2.开始两个PostgreSQL窗口会话。 3.两个窗口都开始一个新事务。 4.第二个窗口中将活期储蓄账户余额更新为455.75. 5.第一个窗口中将活期储蓄账户余额更新为1400，更新能否成功，解释说明，将答案写入deadlock.txt文档中。 6.第二个窗口提交事务，观察第一个窗口变化，解释说明，答案写入deadlock.txt文档中。 7.第一个窗口提交事务。 8.两个窗口开始一个新事务。 9.第二个窗口中将定期储蓄账户余额更新为2400. 10.第一个窗口中将活期储蓄账户余额更新为2000. 11.第一个窗口中将定期储蓄账户余额更新为1400. 12.第二个窗口中将活期储蓄账户余额更新为1000.50. 13.观察结果，试着解释原因。结果写入deadlock.txt文档中。 14.在每个窗口中查询表的数据，你观察到了什么？试做说明 \[/toggle\]

### deadlock.txt

\[toggle hide="yes" title="deadlock.txt" color=""\] 5.第一个窗口中将活期储蓄账户余额更新为1400，更新能否成功，解释说明，将答案写入deadlock.txt文档中。 更新没有成功 6.第二个窗口提交事务，第一个窗成功修改了记录，因为在第二个窗口中将活期储蓄账户余额更新为455.75时已经对该数据进行了封锁 第一个窗口中将活期储蓄账户余额更新为1400时事务一直处于等待状态，当窗口二提交后才完成更新数据 14.运行后报错： Deadlock found when trying to get lock; try restarting transaction 原因分析：事务陷入了死锁：设第一个窗口的事务为T1,，第二个窗口的事务为T2； ①第二个窗口中将定期储蓄账户余额更新为2400时——T2封锁了定期账户余额数据D1； ②第一个窗口中将活期储蓄账户余额更新为2000时——T1封锁了活期账户余额数据D2； ③第一个窗口中将定期储蓄账户余额更新为1400时： T1请求封锁D1，因为T2已经封锁D1，于是T1等待T2释放D1的锁； 之后当第二个窗口中将活期储蓄账户余额更新为1000.50时： T2请求封锁D2，因为此时T1已经封锁D1，于是T2等待T1释放D2的锁；这样出现T1等待T2释放锁，T2等待T1释放锁，于是陷入死锁。 \[/toggle\]