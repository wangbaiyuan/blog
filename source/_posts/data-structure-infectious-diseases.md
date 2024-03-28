---
title: 数据结构-传染病问题
tags:
  - C++
  - 数据结构
  - 递归
url: 44.html
id: 44
categories:
  - 技术
abbrlink: 21397
date: 2014-11-30 16:31:08
---

**Description**
---------------

This assignment asks you to finish the implementation of a program that assesses the level of infection in a tissue sample. You are given data representing a rectangular tissue sample, overlaid with a grid. Certain portions of the tissue are infected; others are not. Your goal is to help assess the extent of the infection by writing a program that, given the coordinates of a colony of infection, can determine its size. A typical use of the program follows. The user interacts with the program only through command-line arguments. The user supplies to the program a data filename and the coordinates of a cell in the grid. The coordinates are specified by row and then column, both starting at zero. The program calculates the extent of infection at that coordinate and outputs a two-dimensional representation of the tissue sample. Figure 1 depicts（叙述） the execution（执行） of the program. [![infect](http://baiyuan.wang/wp-content/uploads/2014/11/infect.jpg)](http://baiyuan.wang/wp-content/uploads/2014/11/infect.jpg)

代码
--

#include <iostream>
#include <fstream>

using namespace std;

#include "grid.h"

// You do not need to alter function indexof.
int grid::indexof (int row, int col) const {
  return row*cols+col;
}

// You do not need to alter function infected.
bool grid::infected(int row, int col) const {
  return (area->operator\[\](indexof(row, col)) == INFECTED);
}

// You may need to alter the constructor
grid::grid (string file) {
  ifstream grid_file;

  grid\_file.open (file.c\_str());

  grid_file >> rows;
  grid_file >> cols;

  area = new vector<bool>(rows*cols, NOT_INFECTED);
  note = new vector<string>(rows*cols, "0  ");
  while (true) {

    int blob_row;
    int blob_col;

    grid\_file >> blob\_row;
    grid\_file >> blob\_col;

    if (grid_file.eof()) {
        break;
    }

    area->operator\[\](indexof(blob\_row,blob\_col)) = INFECTED;
    note->operator\[\](indexof(blob\_row,blob\_col)) = "1  ";
  }

  grid_file.close();
}

// You may need to alter the destructor
grid::~grid () {
  delete area;
  delete note;
}

// You will need to alter this function to display the
// plus signs (+) next to the cells that belong to
// a counted colony.
ostream &operator<<(ostream &stream, const grid& ob) {

  for (int row=0; row < ob.rows; row++) {

    for (int col=0; col < ob.cols; col++) {
      //stream << ob.area->operator\[\](ob.indexof(row, col));
      stream << ob.note->operator\[\](ob.indexof(row, col));
    }

    stream << endl;
  }

  stream << endl;
  return stream;
}

// Replace the return statement in this function with your
// recursive implementation of this method */
int grid::count (int row, int col) {
    if(0<=row&&row <  rows&&0<=col&&col < cols)
    {
        if(infected( row,col)&&note->operator\[\](indexof(row,col)) =="1  ")
        {
            note->operator\[\](indexof( row,col)) ="1+ ";
            return 1+count (row+1, col+1)+count (row+1, col)+
                   count (row+1, col-1)+count (row, col-1)+
                   count (row , col+1)+count (row-1, col+1)+
                   count (row-1, col )+count (row-1, col-1);
        }
        else
            return 0;
    }
    else return 0;
}
/*string grid::noteplus(int row,int col) const{
    if(note->operator\[\](indexof(row, col)) == INFECTED){
        return "+  ";
    }
else
        return "   ";
}

*/