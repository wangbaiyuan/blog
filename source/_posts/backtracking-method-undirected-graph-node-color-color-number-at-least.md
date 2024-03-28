---
title: 回溯法求无向图结点涂色最少颜色数
tags:
  - C++
  - 个人程序库
  - 回溯法
url: 1536.html
id: 1536
categories:
  - 技术
abbrlink: 22889
date: 2015-12-06 19:34:51
---

回溯法通过深度优先遍历的策略遍历解空间树，其实现过程是：从根节点出发搜索它的所有孩子树或者孩子结点，对于每个结点判断其是否满足约束条件和判定函数，如果满足则进入此结点同样以此结点搜索它的子结点。拥有子节点的结点称之为活节点，当搜索至到没有活节点时则返回原父节点继续寻找活节点，以此类推，直到回溯算法搜索完解空间树。 回溯法由于是遍历完解决问题的所有可能解，所以称它是解决问题的万能算法，只要正确构建了解空间树，通过回溯遍历解空间树即可。回溯算法可以解出解决问题的所有可能解，而在实际解决一些最优解问题时我们可以通过剪枝函数剪掉比中间结果比已求得最优解还差的子树。

无向图的m着色问题的m的最小值求解
-----------------

// mColor.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include<iostream>
using namespace std;
class mColor{
	friend mColor mColoring(int n, char **a);
private:	
	
	bool Ok(int k);
	void Backtrack(int t);
	int nodeNumber, m;
	char **a;
public:
	int types, \*x,\*tempx;


};
bool mColor::Ok(int k){
	for (int j = 0; j <nodeNumber; j++)
	if ((a\[k\]\[j\] == '1') && (tempx\[j\] == tempx\[k\])) return false;
	
	return  true;
	}
void mColor::Backtrack(int t){

	if (t >nodeNumber){
		types = (m <types) ? m:types;
	}
	else{

		for (int i = 1; i <=types; i++){
			tempx\[t - 1\] = i;
			if (Ok(t-1)) {
				m = i;
				//cout << i << endl;
				Backtrack(t + 1); 
				x\[t - 1\] = (x\[t - 1\] == 0  )? i:x\[t - 1\];
			}
			else{
				tempx\[ t - 1\] = 0;
			}
		}
	}


}


mColor mColoring(int n, char **a){
		 mColor X;
	X.m = n;
	X.types = n;
	X.nodeNumber =n;
	X.a = a;
	X.tempx = new int\[n\];
	X.x = new int\[n\];

	for (int i = 0; i < n; i++){
	X.tempx\[i\] = 0;
	X.x\[i\] = 0;
	}
	
	X.Backtrack(1);

	return X;
	}
int main()
{
	int size;
	cout << "输入顶点个数："; 
	cin >> size;
	char \*\*p = new char\*\[size\];
	for (int i = 0; i<size; ++i)
p\[i\] = new   char\[size\];
	cout <<
		"请输入无向图顶点连接情况：\\n(1表示连通，0表示未连通)"
		<< endl;
	cout << " >";
	for (int i = 0; i < size; i++) cout << (char)(65 + i);
	cout << endl;
	for (int i = 0; i < size; i++)
	{
		cout << (char)(65 + i) << ">";
		cin >> p\[i\];

	}
	mColor x = mColoring(size, p);
	cout << "涂以上几个点所需要最少的颜色数为：" << x.types << endl;
	cout << "涂色方案如下：" << endl;
	for (int i = 0; i < size;i++){
		int s = x.x\[i\];
		cout << (char)(65 + i)<<"----颜色" << s<<" "<< endl;
	}


}