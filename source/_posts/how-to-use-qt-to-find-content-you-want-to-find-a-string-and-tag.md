---
title: 怎样用QT查找字符串并标记要查找的内容
tags:
  - C++
  - QT
url: 421.html
id: 421
categories:
  - 算法语言
abbrlink: 63153
date: 2014-12-26 21:09:51
---

效果预览:
-----

![](http://wangbaiyuan.cn/wp-content/uploads/2014/12/20141226130745_71553.png)

代码分享：
-----

QString searchString = ui->lineEdit_2->text();
    QTextDocument *document = ui->description->document();
    ui->description->setHtml(ui->description->document()->toPlainText());
    int number=0;
    bool found = false;
    QTextCursor highlightCursor(document);
    QTextCharFormat plainFormat(highlightCursor.charFormat());
    QTextCharFormat colorFormat = plainFormat;
    colorFormat.setForeground(Qt::red);
    if(ui->description->toPlainText()==""){
        QMessageBox::information(this, tr("description first"),
                                 "Sorry, please display the description first!");
    }

    else{
        ui->result->setPlainText("");
        QString resultstring="搜索结果：";
        QString laststring;
/\*while循环体是本代码的关键-——开始——\*/ 
while (!highlightCursor.isNull() && !highlightCursor.atEnd()) {
            if(ui->daxiaocheckBox->isChecked()==true){
                highlightCursor = document->find(searchString, highlightCursor,QTextDocument::FindCaseSensitively);
            }//这个是实现大小写区分效果的代码，你可能不需要
        else
                highlightCursor = document->find(searchString, highlightCursor);
            if (!highlightCursor.isNull()) {
                number++;
                found = true;
                highlightCursor.movePosition(QTextCursor::Right,QTextCursor::KeepAnchor,0);
                highlightCursor.mergeCharFormat(colorFormat);
                laststring=QString::number(highlightCursor.position(),10);
                if(ui->onlyTwo->isChecked()==true){
                    if(number<=1)

                        resultstring+="n occurrence"+QString::number(number,10)+":—— position:"+QString::number(highlightCursor.position(),10);

                }//这个是实现大小写区分效果的代码，你可能不需要 
else
                    resultstring+="n occurrence"+QString::number(number,10)+":—— position:"+QString::number(highlightCursor.position(),10);
            }
        }
/*关键代码结束*/
        if(number>1&&ui->onlyTwo->isChecked()==true)
            resultstring+="n occurrence"+QString::number(number,10)+":—— position:"+laststring;
        ui->result->setPlainText(resultstring);
        if (found == false) {
            QMessageBox::information(this, tr("Word Not Found"),
                                     "Sorry, the word cannot be found.");
        }
        else {
            QMessageBox::information(this, tr("Word was Found"),
                                     "the word '"+searchString+"' was found for "+QString::number(number,10)+((number>1)? " times":" time"));
        }
    }

 

> 代码解析将在笔者后续有空闲时间补全,请读者结合自身实际和关键代码分析，以为己用。代码交流，欢迎大家留言