---
title: phinx数据库查询-Phinx教程(3)
tags:
  - Phinx
  - Web
  - 帮助文档
  - 翻译文章
url: 1457.html
id: 1457
categories:
  - 技术
abbrlink: 10441
date: 2015-08-28 16:20:41
---

执行查询
----

Phinx进行数据库查询可以执行 execute()和 query()方法。 execute()方法返回的是执行数据库查询时数据库受影响的行数，而 query()方法返回的结果是一个数组。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        // execute()
        $count = $this->execute('DELETE FROM users'); // returns the number of affected rows

        // query()
        $rows = $this->query('SELECT * FROM users'); // returns the result as an array
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

  注意:这些命令运行基于使用PHP数据对象(PDO) 扩展，它定义了一个轻量级的、一致的接口在PHP中访问数据库。总是确保你的查询与之前使用pdo同在 execute()命令。这是特别重要的在使用分隔符在插入的存储过程或触发器不支持分隔符。

### 获取行

phinx有两种方法可以获取行：fetchRow()方法将获取单个行,而 fetchAll()方法将返回多行。这两种方法都接受原生的SQL语句作为他们唯一的参数。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        // fetch a user
        $row = $this->fetchRow('SELECT * FROM users');

        // fetch an array of messages
        $rows = $this->fetchAll('SELECT * FROM messages');
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

 

处理数据表
-----

### 表对象

表对象是一个Phinx提供最有用的的api。它允许您使用PHP代码轻松操纵数据库表。您可以通过table()方法对表对象进行实例化，从而实现数据库迁移。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('tableName');
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

然后您可以使用表对象提供方法来操纵这个表:

### 创建表

使用表对象创建一个表十分简单，以下举例创建一个表来存储用户:

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $users = $this->table('users');
        $users->addColumn('username', 'string', array('limit' => 20))
              ->addColumn('password', 'string', array('limit' => 40))
              ->addColumn('password_salt', 'string', array('limit' => 40))
              ->addColumn('email', 'string', array('limit' => 100))
              ->addColumn('first_name', 'string', array('limit' => 30))
              ->addColumn('last_name', 'string', array('limit' => 30))
              ->addColumn('created', 'datetime')
              ->addColumn('updated', 'datetime', array('null' => true))
              ->addIndex(array('username', 'email'), array('unique' => true))
              ->save();
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

*   添加列:addColumn()方法；
*   添加索引:addIndex()方法：上面使用用户名和电子邮件来创建一个惟一索引列，最后调用save()将更改提交到数据库。
*   注意：Phinx自动为每个表创建一个名为“id”的自增列作为主键。

我们也可以使用表对象自行指定一个主键。一下代码会禁用Phinx自动生成 “id”的自增列作为主键，并使用其中 的两列创建一个主键:

<?php
use Phinx\\Migration\\AbstractMigration;
class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('followers', array('id' => false, 'primary\_key' => array('user\_id', 'follower_id')));
        $table->addColumn('user_id', 'integer')
              ->addColumn('follower_id', 'integer')
              ->addColumn('created', 'datetime')
              ->save();
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

  若设置一个 primary\_key但不使用自增属性 AUTO\_INCREMENT，需要指定一个id来覆盖默认的 id字段名:

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('followers', array('id' => 'user_id'));
        $table->addColumn('user_id', 'integer')
              ->addColumn('follower_id', 'integer')
              ->addColumn('created', 'datetime', array('default' => 'CURRENT_TIMESTAMP'))
              ->save();
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

 

### 有效的列数据类型

列属性的数据类型指定为字符串，可以下列类型之一:

*   biginteger
*   binary
*   boolean
*   date
*   datetime
*   decimal
*   float
*   integer
*   string
*   text
*   time
*   timestamp
*   uuid

此外，MySQL还支持 enum和 set列类型，Postgres支持 json和 jsonb列类型(PostgreSQL 9.3及以上)。

### 判断是否存在一个表： hasTable()

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $exists = $this->hasTable('users');
        if ($exists) {
            // do something
        }
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

 

### 删除表

使用 dropTable()方法，同时你最好在 down()方法写上如何再重新创建此表（极客人注：便于后续向下迁移恢复）。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $this->dropTable('users');
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {
        $users = $this->table('users');
        $users->addColumn('username', 'string', array('limit' => 20))
              ->addColumn('password', 'string', array('limit' => 40))
              ->addColumn('password_salt', 'string', array('limit' => 40))
              ->addColumn('email', 'string', array('limit' => 100))
              ->addColumn('first_name', 'string', array('limit' => 30))
              ->addColumn('last_name', 'string', array('limit' => 30))
              ->addColumn('created', 'datetime')
              ->addColumn('updated', 'datetime', array('null' => true))
              ->addIndex(array('username', 'email'), array('unique' => true))
              ->save();
    }
}

 

### 重命名表

重命名表通过访问表对象的一个实例,然后调用 rename()方法实现。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('users');
        $table->rename('legacy_users');
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {
        $table = $this->table('legacy_users');
        $table->rename('users');
    }
}

 

使用列
---

### 得到一个列列表：getColumns()方法

要检索所有表列，可以简单地创建一个表对象然后调用getColumns()方法，该方法将返回一个数组。例子如下:

<?php

use Phinx\\Migration\\AbstractMigration;

class ColumnListMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $columns = $this->table('users')->getColumns();
        ...
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {
        ...
    }
}

 

### 检查是否存在一个列：hasColumn()方法

你可以使用 hasColumn()方法检查是否存在某一列。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Change Method.
     */
    public function change()
    {
        $table = $this->table('user');
        $column = $table->hasColumn('username');

        if ($column) {
            // do something
        }

    }
}

 

### 重命名一个列:  renameColumn()

访问表对象的一个实例，然后调用 renameColumn()方法。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('users');
        $table->renameColumn('bio', 'biography');
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {
        $table = $this->table('users');
        $table->renameColumn('biography', 'bio');
    }
}

 

### 有顺序添加列

要想在一个列后跟着添加一个新列，使用 after选项来实现。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Change Method.
     */
    public function change()
    {
        $table = $this->table('users');
        $table->addColumn('city', 'string', array('after' => 'email'))
              ->update();
    }
}

 

### 删除一个列: removeColumn()方法

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Change Method.
     */
    public function change()
    {
        $table = $this->table('users');
        $table->removeColumn('short_name')
              ->update();
    }
}

 

### 设定列属性限制

可以使用 limit选项限制列的最大长度:

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Change Method.
     */
    public function change()
    {
        $table = $this->table('tags');
        $table->addColumn('short_name', 'string', array('limit' => 30))
              ->update();
    }
}

 

使用索引
----

添加一个索引表您可以简单地调用表对象的 addIndex()方法。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('users');
        $table->addColumn('city', 'string')
              ->addIndex(array('city'))
              ->save();
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

  默认情况下Phinx会让_数据库_适配器创建一个正常的索引。我们也可以通过一个额外的参数 addIndex()方法来指定一个唯一的索引。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('users');
        $table->addColumn('email', 'string')
              ->addIndex(array('email'), array('unique' => true))
              ->save();
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

  删除多个索引调用 removeIndex()方法，你必须为每个索引调用这个方法。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('users');
        $table->removeIndex(array('email'));
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

  请注意： 当使用方法 removeIndex()，不需要再调用 save()，索引会在方法执行后立即删除。

操作外键
----

Phinx支持创建外键来约束你的数据库表。以下为添加外键的一个例子

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('tags');
        $table->addColumn('tag_name', 'string')
              ->save();

        $refTable = $this->table('tag_relationships');
        $refTable->addColumn('tag_id', 'integer')
                 ->addForeignKey('tag\_id', 'tags', 'id', array('delete'=> 'SET\_NULL', 'update'=> 'NO_ACTION'))
                 ->save();

    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

  “删除”和“更新”操作定义的“删除”和“更新”选项数组。可能性值“SET\_NULL”,“NO\_ACTION”、“级联”和“限制”。 我们也可以轻松地检查是否存在外键:

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('tag_relationships');
        $exists = $table->hasForeignKey('tag_id');
        if ($exists) {
            // do something
        }
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}

  最后删除外键使用 dropForeignKey方法。

<?php

use Phinx\\Migration\\AbstractMigration;

class MyNewMigration extends AbstractMigration
{
    /\*\*
     \* Migrate Up.
     */
    public function up()
    {
        $table = $this->table('tag_relationships');
        $table->dropForeignKey('tag_id');
    }

    /\*\*
     \* Migrate Down.
     */
    public function down()
    {

    }
}