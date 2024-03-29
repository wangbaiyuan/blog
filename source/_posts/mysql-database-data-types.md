---
title: MySQL数据库的数据类型
tags:
  - MySql
  - 数据库
url: 1137.html
id: 1137
categories:
  - 技术
abbrlink: 20961
date: 2015-04-28 12:54:40
---

数据类型是定义列中可以存储什么数据以及该数据实际怎么存储的基本规则。Mysql的常用数据类型主要有：

一、串数据类型
-------

最常用的数据类型，有两种基本的串类型：分别为定长串和不定长串。定长串结束长度固定的字符，其长度是创建表是指定的，不允许多于指定的字符数据，它们分配的存储空间与指定的一样多，CHAR属于定长串类型。变长串存储长度可变的文本，有些变长数据类型具有最大的定长，而有些则是完全变长的，不管哪种只有指定的数据得到保存（不会添加额外的空格保存），TEXT属于变长串类型。变长数据类型灵活，定长数据类型高效，Mysql处理定长数据类型比变长列快很多，Mysql不允许对变长列（或一个列的可变部分）进行索引，这会极大影响性能。具体类型描述如下表：

数据类型

说明

CHAR

1~255个字符的定长串，它的长度必须在创建时指定，否则MySQL假定为CHAR（1）

VARCHAR

可变长度，最多不超过255字节，如在创建时指定VARCHAR（n），则可存储0~n个字符的变长串

TINYTEXT

同TEXT，最大长度为255字节

MEDUIMTEXT

同TEXT，最大长度为16K

TEXT

最大长度为64K的变长文本

LONGTEXT

同Text，最大长度为4GB（纯文本，一般不会到4G）

ENUM

接受最多64K个串组成的预定义集合的某个串

SET

接受最多64K个串组成的预定义集合的零个或多个串

注意：不管任何形式的串数据类型，串值都必须在引号内（通常单引号更好）；如果数值是计算中使用的数值，则应存储在数值数据类型列中，如果作为字符串使用（如电话号码、邮政编码）则应保存在串数据类型列中。

二、数值数据类型：
---------

存储数值，每种类型具有不同的存储范围，支持取值范围越大，所需存储空间越多。所有数值类型（除BIT和Boolean外）都可以有符号或无符号，有符号数据列可存储正或负的数值，默认情况为有符号。

类型说明

存储需求

取值范围

tinyint\[(m)\]

1字节

有符号值：-128 到127（- 2^7 到2^7 – 1）无符号值：0到255（0 到2^8 – 1）

smallint\[(m)\]

2字节

有符号值：-32768 到32767（- 2^15 到2^15 – 1）无符号值：0到65535（0 到21 6 – 1）

mediumint\[(m)\]

3字节

有符号值：-8388608 到8388607（- 2^23 到2^23 – 1 ）无符号值：0到16777215（0 到2^24 – 1）

int\[(m)\]

4字节

有符号值：-2147683648 到2147683647（- 2^31 到2^31- 1）无符号值：0到4294967295（0 到2^32 – 1）

bigint\[(m)\]

8字节

有符号值：-9223372036854775808 到9223373036854775807（- 2^63到2^63-1）无符号值：0到18446744073709551615（0到2^64 – 1）

float\[(m, d)\]

4字节

最小非零值：±1.175494351e – 38

double\[(m, d)\]

8字节

最小非零值：±2.2250738585072014e – 308

decimal (m, d)

m字节（mysql < 3.23），m+2字节（mysql > 3.23 ）

可变；其值的范围依赖于m 和d

*   **mysql提供了5种整型**： tinyint、smallint、mediumint、int和bigint(字节数1、2、3、4、8)，这些类型在可表示的取值范围上是不同的。整数列可定义为unsigned从而禁用负值；这使列的取值范围为0以上。
*   **mysql 提供三种浮点类型**： float、double和decimal。与整型不同，浮点类型不能是unsigned的，其取值范围也与整型不同，这种不同不仅在于这些类型有最大值，而且还有最小非零值。最小值提供了相应类型精度的一种度量，这对于记录科学数据来说是非常重要的（当然，也有负的最大和最小值）。

在选择了某种数值类型时，应该考虑所要表示的值的范围，只需选择能覆盖要取值的范围的最小类型即可。选择较大类型会对空间造成浪费，使表不必要地增大，处理起来没有选择较小类型那样有效。对于整型值，如果数据取值范围较小，如人员年龄或兄弟姐妹数，则tinyint最合适。mediumint能够表示数百万的值并且可用于更多类型的值，但存储代价较大。bigint在全部整型中取值范围最大，而且需要的存储空间是表示范围次大的整型int类型的两倍，因此只在确实需要时才用。对于浮点值，double占用float的两倍空间。除非特别需要高精度或范围极大的值，一般应使用只用一半存储代价的float型来表示数据。 在定义整型列时，可以指定可选的显示尺寸m。如果这样，m应该是一个1 到255的整数。它表示用来显示列中值的字符数。例如，mediumint(4)指定了一个具有4个字符显示宽度的mediumint列。如果定义了一个没有明确宽度的整数列，将会自动分配给它一个缺省的宽度。缺省值为每种类型的"最长"值的长度。如果某个特定值的可打印表示需要不止m个字符，则显示完全的值；不会将值截断以适合m个字符。需要注意的是，使用一个宽度指示器不会影响字段的大小和它可以存储的值的范围。 对每种浮点类型，可指定一个最大的显示尺寸m 和小数位数d。m 的值应该取1 到255。d的值可为0 到3 0，但是不应大于m – 2（如果熟悉odbc 术语，就会知道m 和d 对应于odbc 概念的"精度"和"小数点位数"）。m和d对float和double 都是可选的，但对于decimal是必须的。在选项m 和d时，如果省略了它们，则使用缺省值。

三、日期和时间数据类型：
------------

MySQl中有多种表示日期和时间的数据类型。其中YEAR表示年份，DATE表示日期，TIME表示时间，DATETIME和TIMESTAMP表示日期和实践。具体如下表：

数据类型

存储字节数

取值范围

DATE

4

1000-01-01——9999-12-31

TIME

3

-838:59:59——838:59:59

DATETIME

8

1000-01-01 00:00:00——9999-12-31 23:59:59

TIMESTAMP

4

19700101080001——20380119111407

YEAR

1

1901——2155

当插入值超出有效取值范围时，系统会报错，并将零值插入到数据库中。 1.MySQL是以YYYY-MM-DD格式来显示DATE类型的值，插入数据时，数据可以保持这种格式。另外，MySQL还支持一些不严格的语法格式，分隔符"-"可以用"@"、"."等符号来替代。 在插入数据时，也可以使用"YY-MM-DD"格式，YY转化成对应的年份的规则与YEAR类型类似。如果我们想插入当前系统的时间，则可以插入CURRENT\_DATE或者NOW()。 2.TIME类型表示为"时：分：秒"，尽管小时范围一般是0~23，但是为了表示某些特殊时间间隔，MySQL将TIME的小时范围扩发了，而且支持负值。对TIME类型赋值，标准格式是'HH：MM：SS'，但不一定非要是这种格式。 如果插入的是'D HH：MM：SS'格式，则类似插入了'（D*24+HH）：MM：SS'。比如插入'2 23:50:50'，相当于插入了'71:50:50'。如果插入的是'HH：MM'或'SS'格式，则效果是其他未被表示位的值赋为零值。比如插入'30'，相当于插入了'00:00:30'；如果插入'11:25'，相当于插入了'11:25:00'。在MySQl中，对于'HHMMSS'格式，系统能够自动转化为标准格式。如果我们想插入当前系统的时间，则可以插入CURRENT\_TIME或者NOW()。 3.DATETIME类型准格式为"YYYY-MM-DD HH：MM：SS"，具体赋值方法与上面的方法相似。 4.TIMESTAMP的取值范围比较小，没有DATETIME的取值范围大，因此输入值时一定要保证在TIMESTAMP的范围之内。它的插入也与插入其他日期和时间数据类型类似。那么TIMESTAMP类型如何插入当前时间？第一，可以使用CURRENT_TIMESTAMP；第二，输入NULL，系统自动输入当前的TIMESTAMP；第三，无任何输入，系统自动输入当前的TIMESTAMP。 另外有很特殊的一点：TIMESTAMP的数值是与时区相关。 5.给YEAR类型复制可以有三种方法： 第一种是直接插入4位字符串或者4位数字； 第二种是插入2位字符串，这种情况下如果插入'00'~'69'，则相当于插入2000~2069；如果插入'70'~'99'，则相当于插入1970~1999。第二种情况下插入的如果是'0'，则与插入'00'效果相同，都是表示2000年； 第三种是插入2位数字，它与第二种（插入两位字符串）不同之处仅在于：如果插入的是一位数字0，则表示的是0000，而不是2000年。所以在给YEAR类型赋值时，一定要分清0和'0'，虽然两者相差个引号，但实际效果确实相差了2000年。

四、枚举和集合类型
---------

**枚举(ENUM)类型**：最多可以定义65535种不同的字符串从中做出选择，只能并且必须选择其中一种，占用存储空间是一个或两个字节，由枚举值的数目决定； **集合(SET)类型**：最多可以有64个成员，可以选择其中的零个到不限定的多个，占用存储空间是一个到八个字节，由集合可能的成员数目决定。 举个例子来说，在sql server(WINDOWS平台上强大的数据库平台)中，你可以节约到用一个BIT类型来表示性别(男/女)，但MySQL(和PHP搭配之最佳组合)没有BIT，用TINTINT吗?不，可以用ENUM(’帅哥’,’美眉’)，只有两种选择，所以只需一个字节——跟TINYINT一样大，但却可以直接用字符串’帅哥’和’美眉’来存取。

五、二进制数据类型：
----------

二进制类型可存储任何数据，如文字、图像、多媒体等。具体类型描述如下：

数据类型

说明

TITYBLOB

最大长度为255字节

BLOB

最大长度为64KB

MEDIUMBLOB

最大长度为16MB

LONGBLOB

最大长度为4GB