---
title: QT中怎样修改系统时间及其时区错误问题
tags:
  - QT
url: 260.html
id: 260
categories:
  - 技术
abbrlink: 15444
date: 2014-12-15 09:47:40
---

最近写了QT4的第一个编码问题：系统时间界面及实现修改系统时间。本人综合网上的资源，在此作了一个总结。

### 首先，Qt本身不提供时间设置的函数

Qt本身不提供时间设置的函数，实现修改系统时间使用windows 的native API函数SetSystemTime 所以，头文件需要加入 #include<windows.h>

### 代码部分

//下面是我的程序的部分代码
void MainWindow::on\_pushButton\_3_clicked()
{
    SYSTEMTIME st;
       GetLocalTime(&st);
       st.wHour=ui->spinBox->value();
       st.wMinute=ui->spinBox_2->value();
       st.wSecond=ui->spinBox_3->value();
       SetLocalTime(&st);
}

### 常见问题：

*   可能有人在网上找到下述代码：

//下面的代码出现时区问题
bool Dialog::timeedit()
{
    SYSTEMTIME st;
    GetSystemTime(&st);
    st.wHour=ui->timeEdit->time().hour();
    st.wMinute=ui->timeEdit->time().minute();
    return SetSystemTime(&st);
}

上述代码的运行结果出现时区不对问题：GetSystemTime()获取的是格林尼治时间;

*   以上都没问题，程序不报错，但是系统时间就是不改变

> 请用 管理员身份运行QTcreator，程序权限不够