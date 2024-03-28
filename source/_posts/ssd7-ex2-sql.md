---
title: SSD7_EX2【SQL】
tags:
  - MySql
  - SSD7
url: 1143.html
id: 1143
categories:
  - 技术
abbrlink: 10338
date: 2015-04-30 12:01:41
---

> 这是SSD7练习的EX2，预计极客人将会写一个系列，更新频率会和NWPU数据库系统实验课2013级进度同步。点击标签或在本站搜索“SSD7”即可获取已更新的SSD7答案。[上一练习：SSD7_EX1【关系型数据库】](http://baiyuan.wang/ssd7-ex1-relational-database.html)

运行给定的SQL脚本来创建一个图书馆的数据库。注意，Book表中的每一行指的是一本书的副本。 因此， 如果一个数据库有三本"DBMS"， 那么Book表中将会有三行，一行一个副本。 编写SQL语句来完成下列操作。（注意：对于每个操作，你必须用一条SQL语句来表达你的查询。 但是在一个语句中可以含有子查询）： ![SSD7](http://baiyuan.wang/wp-content/uploads/2015/04/SSD7.jpg) 英语原文：Run the SQL script given to you to create a Library database. Note that each row in the Book table denotes a book copy. Thus, if the library carries three copies of the title "DBMS", there will be three rows in the Book table, one for each copy. Write the SQL statements to do the following against the database (Note: You must express your query in a single SQL statement for each of the following. However, that statement could have sub-queries.):   _**作业还是自己做的好，以下是我做的结果，作交流学习之用，不要盲目抄袭，东西学会了才是自己的！如果答案有纰漏，欢迎指正，水平有限，仅供参考：**_

1\. 列出"Churchill"写的所有的书的书名，以及它们的出版日期。
-------------------------------------

select t1.name,t1.year
from title t1,author a1
where t1.callnumber=a1.callnumber and a1.lname='Churchill';

 

2\. 检索出名为"John" 或 "Susan" 的会员借出的所有书的书名。
---------------------------------------

select name
from title
where callnumber in(
select callnumber
from book
where borrowermemno in
(select memno
from member
where (fname='John' or fname='Susan'))
)

 

3\. 列出那些已借了"Iliad"和"Odyssey"这两本书的所有会员的姓名和ID。
--------------------------------------------

/*第3题*/
select fname, lname,memno
from member
where memno in(
select borrowermemno
from book
where callnumber in(
select callnumber
from title
where name='Iliad'
))and memno in(
select borrowermemno
from book
where callnumber in(
select callnumber
from title
where name='Odyssey'
)
);

 

4\. 列出那些已借了"Collins"写的所有的书的所有会员的姓名和ID。假设，一名会员或许已经借了多本同样的书。
----------------------------------------------------------

/*第4题*/
select  m1.fname,m1.Lname,m1.MemNo
from author a1,book b1,member m1
where a1.lname='Collins'and b1.callnumber=a1.callnumber and m1.MemNo=b1.BorrowerMemNo
GROUP BY m1.MemNo
HAVING COUNT(DISTINCT b1.callnumber)=(SELECT COUNT(DISTINCT callnumber)
FROM author
WHERE lname='Collins'
);

 

5\. 找出那些借了一本姓"Tanenbaum"的作者写的书的所有会员的电话号码
----------------------------------------

/*第5题*/
select m1.PhoneNumber
from author a1,book b1,member m1
where a1.lname='Tanenbaum'and b1.callnumber=a1.callnumber and b1.BorrowerMemNo=m1.MemNo
GROUP BY b1.BorrowerMemNo
HAVING COUNT(*)=1;

 

6\. 找出那些借了至少三本书的成员，并列出它们的姓名，ID 以及他们借出的书的数量。 按借出书的数量将序排列找到的结果。
-------------------------------------------------------------

/*第6题*/
select m1.Fname,m1.Lname,COUNT(b1.BorrowerMemNo) '借书总数'
FROM book b1,member m1
where m1.MemNo=b1.BorrowerMemNo
GROUP BY b1.BorrowerMemNo
HAVING COUNT(*)>=3
ORDER BY b1.BorrowerMemNo;

 

7\. 列出没有借任何书的会员
---------------

/*第7题*/
select Fname,Lname
from member
where NOT EXISTS(
SELECT *
from book
where member.MemNo=BorrowerMemNo
);

 

8\. 以字母序列出那些匹兹堡居民（电话号码以"412"开头）并且没有并且没有"Pitt Roads"这本书的会员的名。
------------------------------------------------------------

/*第8题*/
select Lname
from member
where MemNo NOT IN
(select b1.BorrowerMemNo
from title t1,book b1
where t1.Name='Pitt Roads' and t1.CallNumber=b1.CallNumber)
AND PhoneNumber like '412%';