---
title: 无向图个数最少且元素间不相连的子集
tags:
  - C++
  - 个人程序库
url: 1520.html
id: 1520
categories:
  - 算法语言
abbrlink: 37565
date: 2015-11-15 13:11:20
---

问题
--

设给定一个任意的无向图，将图划分若干的子集，子集集合中任意俩个节点不相连，使用贪心算法使子集个数最少。

**算法步骤或流程：**
------------

*   构造一个向量A按结点度大小加入。
*   构建向量B为空，B存储最后的结果，其元素为子集
*   取向量A的第一个元素m（即度最大）加入向量B，遍历B中的元素，如果m与B中元素（子集）中的元素都不相连，则加入到当前子集，如果相连则创建新子集。
*   将向量A中m除去，重新对向量A按度大小排序，重复3

[![undirectGraph](http://baiyuan.wang/wp-content/uploads/2015/11/undirectGraph.png)](http://baiyuan.wang/wp-content/uploads/2015/11/undirectGraph.png)

C++代码
-----

#include<iostream>
#include <algorithm>
using namespace std;
#include<vector>
vector < vector < int >*>*vec;
const int size = 5 ;
char undirectedGraph\[size\]\[size\];
vector<vector<int> > sortvector;
vector < vector < int >*>\*getGreedySet(vector < vector < int >\*>*_vec, int n)
{
    cout<<(char)(65 + n)<<endl;
    vector < vector < int >*>::iterator it1;
    vector < int >::iterator it2;
    bool linkext = false;
    for (it1 = \_vec->begin(); it1 != \_vec->end(); it1++)  //外集合
    {
        vector < int >\*temp1 = \*it1;
        int link = 0;
        for (it2 = temp1->begin(); it2 != temp1->end(); it2++)
        {
            if (undirectedGraph\[n\]\[*it2\] == '1')
            {
                link++;
                break;
            }
// cout<<"("<<*it2<<","<<n<<")";
        }
        if (link == 0)
        {
            temp1->push_back(n);
            linkext = true;
            break;

        }


    }

    if (!linkext)
    {
        vector < int >*nodeset = new vector < int >();
        nodeset->push_back(n);
        \_vec->push\_back(nodeset);

    }
    return _vec;
};
int charToInt(char cr)
{
    if(cr=='1')
        return 1;
    else
        return 0;
}

int getDegreeOfNode(int i)
{
    int result=0;
    for(int j=i+1; j<sortvector.size(); j++)
    {
        int x=sortvector\[i\]\[1\];
        int y=sortvector\[j\]\[1\];
        result+=charToInt(undirectedGraph\[x\]\[y\]);
    }

    for(int m=0; m<i; m++)
    {
        int x=sortvector\[m\]\[1\];
        int y=sortvector\[i\]\[1\];
        result+=charToInt(undirectedGraph\[x\]\[y\]);
    }

    return result;
}

int getinitDegreeOfNode(int i)
{
    int result=0;
    for(int j=i+1; j<size; j++) result+=charToInt(undirectedGraph\[i\]\[j\]);
    for(int m=0; m<i; m++) result+=charToInt(undirectedGraph\[m\]\[i\]);
    return result;
}
bool greaterMark(vector<int> a,vector<int> b)
{
    return a\[0\]> b\[0\];
}

int main()
{
    vec = new vector < vector < int >*>();
    vector < int >*nodeset = new vector < int >();
    vector < vector < int >*>::iterator it1;
    vector < int >::iterator it2;
    cout <<
         "请输入无向图顶点连接情况：\\n(1表示连通，0表示未连通)"
         << endl;
    cout << " >";
    for (int i = 0; i < size; i++) cout << (char)(65 + i);
    cout << endl;
    for (int i = 0; i < size; i++)
    {
        cout << (char)(65 + i) << ">";
        cin >> undirectedGraph\[i\];

    }


    for (int i = 0; i < size; i++)
    {
        vector<int> temp;
        temp.push_back(getinitDegreeOfNode(i));
        temp.push_back(i);
        sortvector.push_back(temp);
    }
    while(sortvector.size()>0)
    {
        std::sort(sortvector.begin(),sortvector.end(),greaterMark);//对无向图进行按照度大小排序

        vec = getGreedySet(vec, sortvector\[0\]\[1\]);
        sortvector.erase(sortvector.begin());
        int i=sortvector.size();
        for(int j=0; j<i; j++) sortvector\[j\]\[0\]=getDegreeOfNode(j);
    }

    cout << "\\n个数最少且元素间不相连的子集有:" << endl;
    for (it1 = vec->begin(); it1 != vec->end(); it1++)
    {
        vector < int >\*temp1 = \*it1;

        for (it2 = temp1->begin(); it2 != temp1->end(); it2++) cout << (char)(65 + *it2);
        cout << "  ";
    }
}