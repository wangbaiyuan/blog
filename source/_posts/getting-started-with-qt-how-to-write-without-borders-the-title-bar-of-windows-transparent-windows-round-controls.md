---
title: QT入门：怎么写无边框（标题栏）的窗口、透明窗口、圆角控件
tags:
  - QT
url: 432.html
id: 432
categories:
  - 算法语言
abbrlink: 17871
date: 2014-12-27 00:01:45
---

对于QT的初学者来说，去除边框，实现窗口透明度可能是美化GUI的基本要求，笔者综合了网上的代码，进行了总结：

无边框（标题栏）的窗口
-----------

//无边框（标题栏）的窗口

QApplication a(argc, argv); 
 MainWindow w; 
 w.setWindowOpacity(1);
 w.setWindowFlags(Qt::FramelessWindowHint);
 w.setAttribute(Qt::WA_TranslucentBackground);
 w.show();

  setWindowOpacity(1)这一句代码实现窗口的透明效果，函数里面的参数是透明度，1表示不透明 setWindowFlags(Qt::FramelessWindowHint);隐藏窗口的标题栏和边框  

背景刷成黑色,前景色设为白色。
---------------

方法一、paltette方式，经测试，该方法不会影响到其他控件,推荐使用  

QPalette bgpal = palette();
bgpal.setColor (QPalette::Background, QColor (0, 0 , 0, 255));
//bgpal.setColor (QPalette::Background, Qt::transparent);
bgpal.setColor (QPalette::Foreground, QColor (255,255,255,255)); 
setPalette (bgpal);

  方法二、stylesheet方式 影响子控件的方法是：  

setStyleSheet ("background-color: rgb(0,0,0);color: rgb(255,255,255);");

  不影响子控件的方法是：  

setStyleSheet ("venus--TitleBar {background-color: rgb(0,0,0);color: rgb(255,255,255);}");

   

圆角控件 用stylesheet方式
------------------

 

setStyleSheet ("border-radius:10px;");

 

  圆角窗口 
-------

 

RoundRectWin::RoundRectWin() { QPalette p = palette(); QPixmap img("roundrect.png");
    QBitmap mask("roundrect_mask.png");
    p.setBrush(QPalette::Window, QBrush(img));
    setPalette(p);
    setMask(mask);
    resize(img.size());
    //setWindowFlags(Qt::FramelessWindowHint);//这句会去掉标题栏 } 注意:mask的图多余部分设为白色

   

半透明窗口
-----

 

1.  窗口整体透明，但是窗体上的控件不透明。 通过设置窗体的背景色来实现，将背景色设置为全透。 试验效果：
    
     QPalette pal = palette(); 
    pal.setColor(QPalette::Background, QColor(0x00,0xff,0x00,0x00)); setPalette(pal);
    
    窗体标题栏不透明；   窗体客户区上的控件不透明，QLabel控件只是字显示，控件背景色透明； 窗体客户区完全透明。 另外从网上看到的方法：
    
     setAttribute(Qt::WA_TranslucentBackground, true)；
    
    试验的结果是类似于上面的方法，但有时候窗体会被一些杂色斑点填充，未找到原因。
2.  窗口及其上面的控件都半透明： 
    
    setWindowOpacity(0.7)
    
      试验效果：窗口及控件都半透明。注意不能够setWindowFlags(Qt::FramelessWindowHint);要不就不起作用  
3.  窗口整体不透明，局部透明：在Paint事件中使用Clear模式绘图。  
    
    void TestWindow::paintEvent( QPaintEvent* ) 
    { QPainter p(this); 
     p.setCompositionMode( QPainter::CompositionMode_Clear );
     p.fillRect( 10, 10, 300, 300, Qt::SolidPattern );
     }
    
      试验效果：绘制区域全透明。如果绘制区域有控件不会影响控件。 以上实验均是基于Directfb的Qte测试。在Linux下及Windows下效果会略有不同。 比如在Windows下第3个实验，绘制区域就是一个黑窟窿，如果Window本身半透，则是Window下面的内容加上半透效果，不是全透明效果。    

控制QPixmap的alpha
---------------

   

QPixmap temp(pixmapTop.size()); 
temp.fill(Qt::transparent);
    QPainter p(&temp);
    p.setCompositionMode(QPainter::CompositionMode_Source);
    p.drawPixmap(0, 0, pixmapTop);
    p.setCompositionMode(QPainter::CompositionMode_DestinationIn);
    p.fillRect(temp.rect(), QColor(0, 0, 0, alpha)); //--lable显示前景图片
 ui->label->setScaledContents(true);
    ui->label->setPixmap(temp);

 

 layout 的边界
-----------

 

 layout->setMargin (0);

   

> 以上代码来自互联网，经本人整理发布,后续笔者研究后发布拖动窗口代码