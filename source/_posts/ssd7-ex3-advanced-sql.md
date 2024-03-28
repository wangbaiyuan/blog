---
title: SSD7_EX3【高级SQL】
tags:
  - SSD7
url: 1178.html
id: 1178
categories:
  - 技术
abbrlink: 22725
date: 2015-05-11 19:31:05
---

> 这是SSD7练习的EX3，预计极客人将会写一个系列，更新频率会和NWPU数据库系统实验课2013级进度同步。点击标签或在本站搜索“SSD7”即可获取已更新的SSD7答案。[上一练习：SSD7_EX2【SQL】](http://baiyuan.wang/ssd7-ex2-sql.html)

原题摘要:
-----

此练习以图书馆系统library schema为案例，案例包含了图书馆书籍信息、图书馆成员信息，图书馆借阅信息（某本书被某个读者借阅几次），提供书籍的出版社信息，出版社订单信息。为了与其他练习作区分，本次练习的每个关系名字最后一个字符为阿拉伯数字‘4’。 使用CREATE TABLE and INSERT statements提供的SQL语句创建你的所有关系，要求在一个空的数据库中运行提供的SQL语句创建数据库。

英文：
---

For this exercise, we will use the library schema. [![SSD7_EX3高级SQL](http://baiyuan.wang/wp-content/uploads/2015/05/clip_image001_thumb.png "SSD7_EX3高级SQL")](http://baiyuan.wang/wp-content/uploads/2015/05/clip_image001.png) It includes information about book titles in the library, information about library members, about the number of times the books were read by members, about the suppliers who supply books to the library, and about orders placed with the suppliers. To distinguish the table names used in this exercise from the table names in other exercise, each table name in this exercise ends with the character '4'. Point of clarification: The ReceivedDate column refers to the date when the Order was received by the system (i.e., recorded in the database). It does not refer to the date a consumer received the items ordered by him.  

> _**作业还是自己做的好，以下是我做的结果，作交流学习之用，不要盲目抄袭，东西学会了才是自己的！答案可能有纰漏，欢迎指正，水平有限，仅供参考：**_

  1.运行提供的SQL语句，完成关系的创建和部分数据插入。 2.书写SQL语句，删除所有关系中的数据，将你的答案书写在一个名为delete_rows.sql的文件中。

delete_rows.sql
---------------

USE libsupply;
DELETE FROM book4;
DELETE FROM title4;
DELETE FROM member4;

    3.按照要求书写SQL语句，并运行它们，完成对数据库的修改和完善。  

alter_tables.sql：
-----------------

alter table libsupply.title4
add constraint ak_isbn  alternate KEYS title4(isbn);
alter table libsupply.title4
add constraint ak_isbn  alternate KEYS title4(name);

alter table libsupply.MEMBER4
add Join_date DATE;
alter table libsupply.MEMBER4
add Gender CHAR(1);
ALTER TABLE libsupply.book4
add CONSTRAINT fk_callnumber FOREIGN KEY(callnumber) REFERENCES libsupply.title4(callnumber);
ALTER TABLE libsupply.book4
add CONSTRAINT fk_borrowerid FOREIGN KEY(borrowerid) REFERENCES libsupply.member4(libid);
CREATE TABLE PURCHASE_ORDER4(
PoNum char(8),
Qty INT, 
OrderDate DATE, 
DueDate DATE, 
ReceivedDate DATE,
PRIMARY KEY(PoNum)
);
CREATE TABLE SUPPLIER4(
Supplier_Id char(8), 
Name varchar(30),
Address VARCHAR(100),
PRIMARY KEY(Supplier_Id)
);

CREATE TABLE READ_BY4(
callnumber  char(8) NOT NULL,
LibId char(6) NOT NULL,
TimesRead INT,
Primary KEY(CallNumber, LibId),
FOREIGN KEY(CallNumber) REFERENCES libsupply.title4(CallNumber),
FOREIGN KEY(LibId) REFERENCES libsupply.MEMBER4(LibId)
);

CREATE TABLE ORDERED4(
CallNumber char(8) NOT NULL,
PoNum char(8),
Supplier_Id char(8),
PRIMARY KEY(CallNumber, PoNum, Supplier_Id),
FOREIGN KEY(CallNumber) REFERENCES libsupply.TITLE4(CallNumber),
FOREIGN KEY(PoNum) REFERENCES libsupply.PURCHASE_ORDER4(PoNum),
FOREIGN KEY(Supplier\_Id) REFERENCES libsupply.SUPPLIER4(Supplier\_Id)
);
ALTER TABLE READ_BY4
add CONSTRAINT CK_TR CHECK(TimesRead>=0);

2）运行INSERT SQL statements提供的SQL语句插入数据 3）按照以下查询要求书写SQL语句，将你的答案书写在一个名为queries.sql的文件中。

（1）列出符合以下要求的所有图书馆成员的ID，第一名字和Join_date;
--------------------------------------

ID以字符“A%B”或者“A&B”开始。●不晚于Nov. 30, 1997加入图书馆

SELECT libid,fname,Join_date
FROM libsupply.member4
WHERE (libid LIKE 'A/%B%' ESCAPE '/' or libid LIKE 'A&B%')AND JOIN_date<'1997-11-30';

 

（2）列出符合以下要求的所有书的名字、ISBN、CallNumber。
-----------------------------------

●由两个或两个以上的出版社提供。 ●所有的订单总量在10本以上。 ●按照订单总量递减的顺序排列结果。

USE libsupply;

SELECT
	t4.name,t4.isbn,t4.callnumber
FROM
	title4 t4,ordered4 o4,purchase_order4 po4,supplier4 s4
WHERE
	t4.callnumber = o4.callnumber
AND o4.ponum = po4.ponum
AND o4.supplier\_id = s4.supplier\_id
GROUP BY t4.callnumber
HAVING COUNT(O4.SUPPLIER_ID)>=2 and SUM(po4.Qty)>=10
ORDER BY o4.supplier_id;

  /*

(3）列出符合以下要求的所有图书馆成员ID和第一名字。
---------------------------

●借阅书的次数小于图书馆所有书借阅次数综合的5%。 ●按照借阅次数的递增顺序排列结果。 */

SELECT m4.libid,m4.fname
from member4 m4,read_by4 rb4
WHERE m4.libid=rb4.libid
GROUP BY rb4.libId
HAVING SUM(rb4.TimesRead)<(SELECT SUM(TimesRead)
from read_by4)*0.05
ORDER BY SUM(rb4.TimesRead);

 

（4）列出符合以下要求的所有图书馆成员的ID和第一名字。
----------------------------

●性别为女。 ●在图书馆有借阅记录（读某本书一次）。 ●按名字的字母顺序排列结果。

SELECT libid,fname
from member4
WHERE libid in(
SELECT libid
from read_by4
)and Gender='F'
ORDER BY fname;

（5）列出符合以下要求的所有出版的名字，ID，和订书总量。
-----------------------------

●平均订书量（某个出版社收到的订书总量除以该出版社收到的订单数）低于系统的平均订书量（系统收到的订书总量除以所有订单数）。 */

select s4.Name,s4.Supplier_Id,SUM(po4.Qty)/COUNT(o4.PoNum),SUM(po4.Qty),COUNT(o4.PoNum)
from ordered4 o4, supplier4 s4,purchase_order4 po4
where o4.PoNum=po4.PoNum and o4.Supplier\_Id=s4.Supplier\_Id
GROUP BY o4.Supplier_Id
HAVING SUM(po4.Qty)/COUNT(o4.PoNum)<(
SELECT AVG(Qty)
FROM purchase_order4
);

  /*

（6）列出符合以下要求的所有图书馆成员的第一名字，ID。
----------------------------

●性别为男。 ●Oct. 10, 1995前加入图书馆。 ●阅读不同标题（title）书籍的次数在5次或5次以下。 ●阅读同一书籍（同一title）的次数在两次或两次以上 */

SELECT m4.libid,m4.fname
from member4 m4,read_by4 rb4,title4 t4
where m4.gender='M'
and m4.JOIN_date<='1995-10-10' 
and t4.callnumber=rb4.callnumber 
and m4.libid=rb4.libid 
AND rb4.TimesRead>=2
GROUP BY (m4.LibId)
HAVING COUNT(DISTINCT t4.name)<=5;