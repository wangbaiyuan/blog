---
title: 安卓按钮的监听事件的两种方式
url: 1085.html
id: 1085
categories:
  - 软件开发
abbrlink: 11610
date: 2015-04-13 11:35:25
tags: ''
---

按钮的监听事件
-------

在上面的应用截图中我们看到游戏开始界面使用了"开始游戏"和"退出游戏"的两个按钮。两个按钮分别触发正式游戏和关闭游戏程序的两个行为。所以要为两个按钮的点击事件（OnClickListener）绑定监听器。 安卓中为按钮绑定监听器的方式有两种：①布局文件中声明②代码中新建监听器并绑定； 在实现"BY战机"中，我采用了第二种，即在代码中建立监听器。 为了以后复习学习和网友交流，在此我同时介绍一下第一种绑定按钮监听器的方法。

*   布局文件中声明绑定按钮监听器
    --------------
    

布局文件中声明就像为布局声明属性一样，只需要在按钮的属性字段中添加： android:onClick="Button\_Click" 然后在java代码中定义Button\_Click方法，定义按钮点击触发事件的内容 public void Button_Click (View source) { //补充代码：点击按钮后的动作 }

*   代码中新建监听器并绑定按钮监听器
    ----------------
    

话不多说，先上代码：

        button\_begin=(Button)findViewById(R.id.button\_begin);
        button\_exit=(Button)findViewById(R.id.button\_exit);
       
        Button.OnClickListener control=new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                switch (view.getId()){
                    case R.id.button_begin:
                    	
                        Intent game=new Intent(MainActivity.this,game_main.class);
                        startActivity(game);
                        break;
                    case R.id.button_exit:
                    	
                    	System.exit(0);
                        break;
                }
            }
        };
        button_begin.setOnClickListener(control);
        button_exit.setOnClickListener(control);

  这是"BY战机"项目中我为"开始游戏"和"结束游戏"绑定监听器及其动作代码。 先通过findViewById获取两个按钮，通过代码：button_begin.setOnClickListener(control); 为两个按钮设置它们的监听器为control，在上面的代码中我定义control的内容，为了让两个按钮共用一个监听器，我使用view.getId()获取点击的按钮的来源ID，然后通过switch选择语句区分两个按钮的执行动作：startActivity(game) 【进入游戏activity】和System.exit(0)【退出当前安卓程序】。