---
title: SSD7_EX1【关系型数据库】
tags:
  - MySql
  - SSD7
url: 1139.html
id: 1139
categories:
  - 技术
abbrlink: 46892
date: 2015-04-28 20:34:12
---

第一部分（PART1）：
============

1．按照以下要求标识出每个关系的关键字（主键、备用键、外键）。对于此练习，选择关键字的时候可以忽略性能因素。

*    1）标识出每个关系的主键，如果没有主键，做适当的论述证明你的答案。
*    2）标识出每个关系的备用键，如果没有备用键，做适当的论述证明你的答案。
*    3）标识出每个关系的外键和完整性约束，并做适当的论述证明你的答案。

2.列出每个关系的属性名，和每个属性的域（数据类型和格式），并做适当的论述证明你的答案。 在每一个HTML表格中，列出至少四行正确的数据（可自己假设，要求合理、符合实际即可），将你的答案书写在一个名为BookPublisher.html的HTML页面中提交： **BookPublisher.html：**

Books
-----

Primary Author<varchar(20)>

Title<varchar(50)>

ISBN**(Primary Key)**<char(12)>

PublisherID**(FOREIGN Key)**<int>

Edition<varchar(10)>

Date of Publication<date>

Price<float(4, 2)>

Book Description<varchar(200)>

赵静

数学建模与数学实验

9787040400038

1

第4版

2000.11

22.00

指导数学建模与数学实验

许建平

英汉互译实践与技巧

9787302146728

2

第4版

2012.8

38.00

本书是为非英语专业的大学生及研究生编写的英汉互译教程。

庄茁

基于ABAQUS的有限元分析和应用

9787302188162

2

第2版

2006.5

69.00

《基于ABAQUS的有限元分析和应用》是基于ABAQUS软件6.7版本进行有限元分析与应用的入门指南和工程分析与科学研究教程

王正林

精通MATLAB

9787121187315

3

第3版

2013.1

69.00

紧密结合实例，对MATLAB的使用进行了全面且详尽的阐述，并通过大量的实例讲述如何实现MATLAB的基本操作和实际使用。

路遥

平凡的世界(套装共3册)

9787530212004

4

第1版

2012.3

26.60

《平凡的世界(套装共3册)》是一部现实主义小说，也是小说化的家族史。

books论述：
--------

上面是Books表的数据，并在列名表明了数据类型及长度和主外键：

*   **1.Primary Author <varchar(20)>**：可变字符串，最长20

完整性约束：PrimaryAuthor VARCHAR(20) NOT NULL DEFAULT "未知作者",

*   **2.Title <varchar(50)>**：可变字符串，最长50

Title VARCHAR(50) NOT NULL DEFAULT "默认标题",

*   **3.ISBN <char(12)>(Primary Key)：**主键，因为ISBN对于每本书是唯一的，满足主键是唯一且不为空的条件，用以标识唯一一本书。

ISBN CHAR(13) NOT NULL DEFAULT "0000000000000" PRIMARY KEY,

*   **4.PublisherID<int>(FOREIGN Key)：**int类型、外键，

PublisherID INT(4) NOT NULL DEFAULT 0 , FOREIGN KEY (PublisherID) REFERENCES publisher(PublisherID) 因为Books和Publishers表拥有相同的属性**PublisherID，**并且PublisherID是Publishers表的主键，使用其作为外键，两个表就可以建立联系 ；

*   **5.Edition<varchar(10)>：**可变字符串，最长10

Edition VARCHAR(10) NOT NULL DEFAULT 0 ,

*   **6.Date of Publication <date>：**日期类型

DateofPublication DATE NOT NULL DEFAULT '1970-01-01' ,

*   **7.Price<float(4, 2)>：**float类型，小数点两位

Price float(4, 2) NOT NULL DEFAULT 0 ,

*   **8.Book Description<varchar(200)>：**可变字符串，最长200

BookDescription varchar(200) NOT NULL DEFAULT '描述为空' , **主键(PK)： ISBN**，因为ISBN对于每本书是唯一的，满足主键是唯一且不为空的条件，用以标识唯一一本书。 **外键(FK)： **PublisherID为Books和Publishers表拥有相同的属性**PublisherID，**并且PublisherID是Publishers表的主键，使用其作为外键，两个表就可以建立联系 ； **备用键(AK)：**没有备用键，除主键**ISBN**外其他列都无法唯一标识一本书，存在相同标题、出版社、价格、出版时间等的书籍。

Publishers
----------

PublisherID **(Primary Key)**<int>

Name<varchar(50)>

Address<varchar(100)>

04

高等教育出版社

北京市西城区德胜门外大街4号

302

清华大学出版社

北京市海淀区清华大学出版社

5053

电子工业出版社

北京市丰台区万寿路南口金家村288号华信大厦

5302

北京十月文艺出版社

北京市海淀区十月文艺出版社

*   **1.PublisherID <int>(Primary Key)：**主键，因为PublisherID可以唯一标识出版社；
*   **2.Name<varchar(50)>：**可变字符串，最长50；
*   **3.Address <varchar(100)>：**可变字符串，最长100。

**主键(PK)：**PublisherID，因为PublisherID可以唯一标识出版社； **外键(FK)：**显然没有； **备用键(AK)：**Name，出版社名可以唯一标识出版社。

第二部分（part-2）
============

按照要求书写SQL语句，将你的答案书写在一个名为createDB.Sql的文件中提交。 1）使用CREATE TABLE关键字创建两个关系，要求标识出每个关系的主键和备用键。 2）使用INSERT关键字向每个关系中插入四行数据（第一你部分列出的数据）。 3）书写SQL语句查询出某两个作者…… 4）书写SQL语句查询出某本书的出版社名字。

**文件createDB.Sql：**
-------------------

CREATE TABLE \`publisher\` (
  \`PublisherID\` int(4) NOT NULL DEFAULT 0 PRIMARY KEY ,
  \`Name\` varchar(50) not NULL DEFAULT "未知出版社",
  \`Address\` varchar(100) NOT NULL DEFAULT "未知地址"
);
CREATE TABLE Books(
PrimaryAuthor VARCHAR(20) NOT NULL DEFAULT "未知作者",
Title VARCHAR(50)  NOT NULL DEFAULT "默认标题",
ISBN CHAR(13) NOT NULL DEFAULT "9780000000000"  PRIMARY KEY,
PublisherID INT(4) NOT NULL DEFAULT 1 ,
Edition VARCHAR(10) NOT NULL DEFAULT 0 , 
DateofPublication DATE NOT NULL DEFAULT '1970-01-01' ,
Price float(4, 2) NOT NULL DEFAULT 0 ,
BookDescription varchar(200) NOT NULL DEFAULT "本书暂无描述",
FOREIGN KEY (PublisherID) REFERENCES publisher(PublisherID)
);
INSERT INTO \`publisher\` (\`PublisherID\`, \`Name\`, \`Address\`)
 VALUES ('1', '高等教育出版社', '北京市西城区德胜门外大街4号');
INSERT INTO \`publisher\` (\`PublisherID\`, \`Name\`, \`Address\`)
 VALUES ('2', ' 清华大学出版社 ', '北京市海淀区清华大学出版社 ');
INSERT INTO \`publisher\` (\`PublisherID\`, \`Name\`, \`Address\`)
 VALUES ('3', '电子工业出版社', '北京市丰台区万寿路南口金家村288号华信大厦 ');
INSERT INTO \`publisher\` (\`PublisherID\`, \`Name\`, \`Address\`)
 VALUES ('4', '北京十月文艺出版社', '北京市海淀区十月文艺出版社');

INSERT INTO Books(PrimaryAuthor,Title,ISBN,PublisherID,Edition,DateofPublication,Price,BookDescription)
 VALUE('赵静','数学建模与数学实验','9787040400038',1,'第4版','2000-11-01',22.00,
'指导数学建模与数学实验');
INSERT INTO Books(PrimaryAuthor,Title,ISBN,PublisherID,Edition,DateofPublication,Price,BookDescription)
 VALUE('许建平', '英汉互译实践与技巧','9787302146728',2,'第4版','2012-08-01',38.00,
'本书是为非英语专业的大学生及研究生编写的英汉互译教程.');
INSERT INTO Books(PrimaryAuthor,Title,ISBN,PublisherID,Edition,DateofPublication,Price,BookDescription)
 VALUE('庄茁','基于ABAQUS的有限元分析和应用','9787302188162',2,'第2版','2006-05-01',69.00,
'基于ABAQUS软件6.7版本进行有限元分析与应用的入门指南和工程分析与科学研究教程');
INSERT INTO Books(PrimaryAuthor,Title,ISBN,PublisherID,Edition,DateofPublication,Price,BookDescription)
 VALUE('王正林','精通MATLAB','9787121187315',3,'第3版','2013-01-01',69.00,
' 紧密结合实例，对MATLAB的使用进行了全面且详尽的阐述，并通过大量的实例讲述如何实现MATLAB的基本操作和实际使用。 ');
INSERT INTO Books(PrimaryAuthor,Title,ISBN,PublisherID,Edition,DateofPublication,Price,BookDescription)
 VALUE('路遥',' 平凡的世界(套装共3册) ','9787530212004',4,'第1版','2012-03-01',26.60,
' 《平凡的世界(套装共3册)》是一部现实主义小说，也是小说化的家族史。 ');


SELECT Title,Price
FROM books
where PrimaryAuthor='路遥' OR PrimaryAuthor='许建平';
SELECT p1.Name
FROM publisher p1,books b1
where p1.PublisherID=b1.PublisherID AND b1.Title='精通MATLAB';

** 文件Rel-ops.txt：** \[infobg class="tips" closebtn="" color="" bgcolor=""\] SELECT Title,Price FROM books where PrimaryAuthor='路遥' OR PrimaryAuthor='许建平'; 此语句完成查询出某两个作者（例如"路遥" 、 "许建平"）出版的所有书的标题和价格； 解释：从books表中选择Title,Price两列，约束条件为作者是"路遥"或"许建平"。 SELECT p1.Name FROM publisher p1,books b1 where p1.PublisherID=b1.PublisherID AND b1.Title='精通MATLAB'; 使用连接查询，p1、b1分别是publisher和books中的对象，使用PublisherID连接两者，令b1.Title='精通MATLAB'，选择p1.Name得出查询结果 \[/infobg\]