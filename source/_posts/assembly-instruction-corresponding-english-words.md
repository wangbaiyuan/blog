---
title: 汇编指令对应的英文单词
tags:
  - 帮助文档
  - 汇编
url: 1507.html
id: 1507
categories:
  - 技术
  - 百元百科
abbrlink: 58006
date: 2015-10-16 21:21:18
---

学习汇编中碰到的很多命令书上都是强行给出，丝毫不讲命令用词的原由，命令究竟是哪个英文单词的缩写，这样记起来很是麻烦，现总结一下，以方便记忆。

一、寄存器类（register）：
-----------------

1.  通用寄存器:AX,BX,CX,DX——这几个没什么好写的，就是这样了。
2.  段寄存器：代码段寄存器CS--code segment , 数据段寄存器DS--data segment , 堆栈段寄存器SS--stack segment ，附加段寄存器ES--extra segment 。
3.  特殊功能寄存器：指令指针寄存器IP--instruction pointer ，堆栈指针SP--stack pointer ，基址指针BP--base pointer ，源变址寄存器SI--source index ，目标变址寄存器DI--destination index ，标志寄存器FR--flag register（或者叫程序状态字PSW--program status word）。
4.  PSW常用的标志有：

标志 值为1时的标记 值为0时的标记

*   OF(overflow flag) OV(overflow) NV(not overflow)
*   ZF(zero flag) ZR(zero) NZ(not zero)
*   PF(parity flag) PE(parity even) PO(parity odd)
*   CF(carry flag) CY(carried) NC(not carried)
*   DF(direction flag) DN(down) UP(up)
*   SF(sign flag) NG(negtive) PL(plus)
*   TF(trap flag)
*   IF(interrupt flag)
*   AF(auxiliary flag)

[![help](http://baiyuan.wang/wp-content/uploads/2015/08/help.jpg)](http://baiyuan.wang/wp-content/uploads/2015/08/help.jpg)

命令类
---

### 1.通用数据传送指令.

*   MOV----> move
*   MOVSX---->extended move with sign data
*   MOVZX---->extended move with zero data
*   PUSH---->push
*   POP---->pop
*   PUSHA---->push all
*   POPA---->pop all
*   PUSHAD---->push all data
*   POPAD---->pop all data
*   BSWAP---->byte swap
*   XCHG---->exchange
*   CMPXCHG---->compare and change
*   XADD---->exchange and add
*   XLAT---->translate

### 2.输入输出端口传送指令.

*   IN---->input
*   OUT---->output

### 3.目的地址传送指令.

*   LEA---->load effective address
*   LDS---->load DS
*   LES---->load ES
*   LFS---->load FS
*   LGS---->load GS
*   LSS---->load SS

 

### 4.标志传送指令.

*   LAHF---->load AH from flag
*   SAHF---->save AH to flag
*   PUSHF---->push flag
*   POPF---->pop flag
*   PUSHD---->push dflag
*   POPD---->pop dflag

二、算术运算指令
--------

*   ADD---->add
*   ADC---->add with carry
*   INC---->increase 1
*   AAA---->ascii add with adjust
*   DAA---->decimal add with adjust
*   SUB---->substract
*   SBB---->substract with borrow
*   DEC---->decrease 1
*   NEC---->negative
*   CMP---->compare
*   AAS---->ascii adjust on substract
*   DAS---->decimal adjust on substract
*   MUL---->multiplication
*   IMUL---->integer multiplication
*   AAM---->ascii adjust on multiplication
*   DIV---->divide
*   IDIV---->integer divide
*   AAD---->ascii adjust on divide
*   CBW---->change byte to word
*   CWD---->change word to double word
*   CWDE---->change word to double word with sign to EAX
*   CDQ---->change double word to quadrate word

三、逻辑运算指令
--------

*   AND---->and
*   OR---->or
*   XOR---->xor
*   NOT---->not
*   TEST---->test
*   SHL---->shift left
*   SAL---->arithmatic shift left
*   SHR---->shift right
*   SAR---->arithmatic shift right
*   ROL---->rotate left
*   ROR---->rotate right
*   RCL---->rotate left with carry
*   RCR---->rotate right with carry

四、串指令
-----

*   MOVS---->move string
*   CMPS---->compare string
*   SCAS---->scan string
*   LODS---->load string
*   STOS---->store string
*   REP---->repeat
*   REPE---->repeat when equal
*   REPZ---->repeat when zero flag
*   REPNE---->repeat when not equal
*   REPNZ---->repeat when zero flag
*   REPC---->repeat when carry flag
*   REPNC---->repeat when not carry flag

五、程序转移指令
--------

———————————————————————————————————————

### 1>无条件转移指令(长转移)

*   JMP---->jump
*   CALL---->call
*   RET---->return
*   RETF---->return far

### 2>条件转移指令(短转移,-128到+127的距离内)

*   JAE---->jump when above or equal
*   JNB---->jump when not below
*   JB---->jump when below
*   JNAE---->jump when not above or equal
*   JBE---->jump when below or equal
*   JNA---->jump when not above
*   JG---->jump when greater
*   JNLE---->jump when not less or equal
*   JGE---->jump when greater or equal
*   JNL---->jump when not less
*   JL---->jump when less
*   JNGE---->jump when not greater or equal
*   JLE---->jump when less or equal
*   JNG---->jump when not greater
*   JE---->jump when equal
*   JZ---->jump when has zero flag
*   JNE---->jump when not equal
*   JNZ---->jump when not has zero flag
*   JC---->jump when has carry flag
*   JNC---->jump when not has carry flag
*   JNO---->jump when not has overflow flag
*   JNP---->jump when not has parity flag
*   JPO---->jump when parity flag is odd
*   JNS---->jump when not has sign flag
*   JO---->jump when has overflow flag
*   JP---->jump when has parity flag
*   JPE---->jump when parity flag is even
*   JS---->jump when has sign flag

### 3>循环控制指令(短转移)

*   LOOP---->loop
*   LOOPE---->loop equal
*   LOOPZ---->loop zero
*   LOOPNE---->loop not equal
*   LOOPNZ---->loop not zero
*   JCXZ---->jump when CX is zero
*   JECXZ---->jump when ECX is zero

### 4>中断指令

*   INT---->interrupt
*   INTO---->overflow interrupt
*   IRET---->interrupt return

### 5>处理器控制指令

*   HLT---->halt
*   WAIT---->wait
*   ESC---->escape
*   LOCK---->lock
*   NOP---->no operation
*   STC---->set carry
*   CLC---->clear carry
*   CMC---->carry make change
*   STD---->set direction
*   CLD---->clear direction
*   STI---->set interrupt
*   CLI---->clear interrupt

六、伪指令
-----

*   —————————————————————————————————————
*   DW---->definw word
*   PROC---->procedure
*   ENDP---->end of procedure
*   SEGMENT---->segment
*   ASSUME---->assume
*   ENDS---->end segment
*   END---->end