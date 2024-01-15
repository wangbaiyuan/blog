---
title: 【2】模块控制-Pcduino平台下的智能小车
tags:
  - IoT
url: 2052.html
id: 2052
categories:
  - 技术应用
abbrlink: 17030
date: 2018-03-19 22:04:10
---

一、 L298P电机控制
------------

L298P扩展板可以通过接口电路来实现PWM调速以及控制电机正反方向转动实现前进和后退。PWM调速的基本原理是通过晶体管的开关特性来调制固定电压的直流电源,通过按照一个特定的频率来实现电路的接通和断开,并根据需要改变一个周期内接通和断开时间的长短,通过改变直流伺服电动机上电压的占空比，从而改变平均电压的大小来控制电动机的转速。 基于上述论述,可以写出以下测试代码对直流电机进行速度控制，运行下面测试代码将会使直流电机缓缓加速，到达最大速度后维持3s后停止，并如此反复。

int E1 = 10;  
int M1 = 12;
int E2 =11;                        
int M2 = 13;                          
void setup()
{
    pinMode(M1,OUTPUT);  
    pinMode(M2,OUTPUT);
}
 
void loop()
{
   {
int value;
  for(value = 0 ; value <= 255; value+=5)
  {
   	 	digitalWrite(M1,LOW);  
    	digitalWrite(M2,LOW);      
    	analogWrite(E1,value);   //PWM调速
    	analogWrite(E2,value);   //PWM调速
   		delay(30);
 	}
delay(3000);
analogWrite(E1,0
analogWrite(E2,0);
}
}

 

二、舵机转向控制
--------

舵机控制模块是由直流电机、减速齿轮组、控制电路组成的转向控制系统。通过舵机的控制信号，可以指定输出轴的旋转角度，当输入特定角度的控制信号后，舵机会产生偏向这个角度的转动，如果控制信号持续一段时间，舵机会偏到这个角度之后保持静止。舵机模块除了应用于汽车模型的转向，还应用于机器人手臂控制、航模等等。 舵机的控制信号进入信号调制芯片，获得一个直流偏置电压，它的内部有一个产生周期为20ms，宽度为1.5ms的基准信号的基准电路，将获得的直流偏置电压与电位器的电压比较，产生电压差输出，电压差的正负输出到电机的驱动芯片就可以决定电机的正反转。当电机转速一定时，通过齿轮带动电位器旋转，如果电压差为0，电机则停止转动。 舵机的控制一般需要一个20ms左右的时基脉冲，该脉冲的高电平部分一般为0.5ms到2.5ms范围内的角度控制脉冲部分。以180度角度伺服为例，0.5ms的高电平脉冲将产生0度偏转，1.5ms的高电平脉冲将产生90度，此时可以控制小车的舵机偏到中间， 2.5ms的高电平脉冲将产生180度

#define PWM_PERIOD 20000
//向pin号引脚在20ms内输出pulse微秒高电平
void servoSetPulse(int pin,int pulse)
{
	digitalWrite(pin,HIGH);// 输出高电平
	delayMicroseconds(pulse);//延时pulse 微秒
	digitalWrite(pin,LOW); // 输出低电平
	delayMicroseconds(PWM\_PERIOD - pulse); //延时（PWM\_PERIOD – pulse）微秒
}

[![](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-3.png)](http://baiyuan.wang/wp-content/uploads/2018/03/Picture1-3.png)