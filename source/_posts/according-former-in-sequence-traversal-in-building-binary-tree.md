---
title: 根据前中序遍历构建二叉树
tags:
  - C++
  - 个人程序库
  - 递归
url: 1513.html
id: 1513
categories:
  - 算法语言
abbrlink: 2812
date: 2015-11-01 16:16:01
---

根据前序遍历和中序遍历构建二叉树的基本思想是使用递归算法；首先构建根节点的左子树和右子树，而在构建根节点的左右子树的时候又要构建左右子树根节点的左右子树， 所以很容易想到递归算法；本项目构建二叉树的主要函数是CreateBinaryTree，其参数有char \*preorder, char \*inorder, int n，分别是当前构建二叉树的前序排列和中序排列和结点个数；直到构建的子二叉树中节点个数为零，即完成了递归。

根据前中序遍历构建二叉树
------------

// BinaryTree.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include<stdio.h>
#include <stdlib.h>
#include <string.h>
#include<iostream>
using namespace std;

template<class T>
/*构建结构体二叉树结点，采用模板类T*/
struct BinaryNode
{
	T data;
	BinaryNode<T> \*Lchild = NULL, \*Rchild = NULL;
};

int get\_root\_index(char \*preorder, char \*inorder, int n)//返回根节点的序号
{
	int i;
	char ch;
	for (i = 0, ch = preorder\[0\]; i<n; i++)
	if (inorder\[i\] == ch)
		return i;
	return -1;
}
/*递归产生前序序列和中序序列的二叉树*/
BinaryNode<char> \*CreateBinaryTree(char \*preorder, char *inorder, int n)
{
	if (n == 0)
		return NULL;
	int root_val = preorder\[0\];
	int i = get\_root\_index(preorder, inorder, n);//获取根节点在中序遍历中的位置
	BinaryNode<char>\*root = (BinaryNode<char>\*)malloc(sizeof(BinaryNode<char>));
	root->data = root_val;           
	//递归得到当前子树的左子树Lchild，Lchild的前序遍历起始位置为父树的preorder + 1
	root->Lchild = CreateBinaryTree(preorder + 1, inorder, i);
	root->Rchild = CreateBinaryTree(preorder + i + 1, inorder + i + 1, n - i - 1);//递归得到当前子输的右子树
	return root;
}

/*使用递归前序遍历*/
void postorder(BinaryNode<char> *root)
{
	if (root)
	{
		cout << root->data ;
		postorder(root->Lchild);
		postorder(root->Rchild);

	}
}
int main()
{
	char *preorder = "ABCDEF";
	char *inorder = "BCAEDF";
	int n = strlen(preorder);
	BinaryNode<char> *root = CreateBinaryTree(preorder, inorder, n);
	postorder(root);
	printf("\\n");
	return 0;
}