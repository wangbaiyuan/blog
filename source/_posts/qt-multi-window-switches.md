---
title: Qt多窗口切换程序
tags:
  - QT
url: 415.html
id: 415
categories:
  - 算法语言
abbrlink: 26383
date: 2014-12-25 17:07:47
---

 Qt多窗口切换程序
==========

1.ui文件中布局
---------

[![20120323102431765](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102431765.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102431765.jpg)

2.主要程序
------

### main.cpp

#include <QtGui/QApplication> 
#include "mainwindow.h" 
int main(int argc, char *argv\[\]) {
     QApplication a(argc, argv);
     MainWindow w;
     w.show();
     return a.exec();
 }

 

### 主界面程序：mainwindow.h

ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QMainWindow>
#include "dialog1.h"
#include "dialog2.h"
namespace Ui {
class MainWindow;
}
class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();
private slots:
    void on\_pushButton\_clicked();
    void on\_pushButton\_2_clicked();
    void on\_pushButton\_3_clicked();
private:
    Ui::MainWindow *ui;
    Dialog1 dialog1;
    Dialog2 dialog2;
};
#endif // MAINWINDOW_H

### mainwindow.cpp

#include "mainwindow.h"
#include "ui_mainwindow.h"
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}
MainWindow::~MainWindow()
{
    delete ui;
}
void MainWindow::on\_pushButton\_clicked()
{
    this->hide();
    dialog1.show();
    dialog1.exec();
    this->show();
}
void MainWindow::on\_pushButton\_2_clicked()
{
    this->close();
}
void MainWindow::on\_pushButton\_3_clicked()
{
    this->close();
    dialog2.show();
    dialog2.exec();
    this->show();
}

   

### dialog1.cpp

1.  [![20120323102433789](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102433789.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102433789.jpg)#include "dialog1.h"
    #include "ui_dialog1.h"
    Dialog1::Dialog1(QWidget *parent) :
        QDialog(parent),
        ui(new Ui::Dialog1)
    {
        ui->setupUi(this);
    }
    Dialog1::~Dialog1()
    {
        delete ui;
    }
    void Dialog1::on\_pushButton\_clicked()
    {
        this->close();
    }
    
     

dialog2.cpp与Dialog1相似 关键点： this->close(); dialog2.show(); dialog2.exec(); this->show();  

### 通过等待dialog.exec()消息，判断主界面是否回显。

### 运行结果：

[![20120323102434387](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102434387.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102434387.jpg)[![20120323102435896](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102435896.jpg)](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20120323102435896.jpg)