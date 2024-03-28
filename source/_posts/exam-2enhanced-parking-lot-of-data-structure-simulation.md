---
title: '数据结构Exam 2:Enhanced Parking Lot Simulation'
tags:
  - C++
  - 数据结构
  - 栈
url: 123.html
id: 123
categories:
  - 技术
abbrlink: 10818
date: 2014-12-08 21:49:13
---

> **Description**  
> 
> > **This assessment tests your ability to use the STL stack adapter, the STL vector container, and the STL find algorithm to solve a problem. You are asked to finish the implementation of a program that simulates a multiple-aisle parking lot. When cars are parked bumper-to-bumper, each aisle in this parking lot can hold three cars. There are five aisles in the parking lot. It is your task to finish the implementation of the simulation that processes the vehicle arrivals and departures. The goal of the simulation is to keep track of and report how many times individual cars are moved while handling the departure of other cars. The simulation also displays an alphabetized list of all the cars that visited the parking lot during the simulation.**
> 
>  

* * *

   

> 答案：main.cpp

#include <iostream>
#include <fstream>
#include <cstdlib>
#include <string>
#include <stack>
#include <stdexcept>
#include <vector>
#include <algorithm>
#include "car.h"
using namespace std;
const unsigned int PARKING\_SPOTS\_PER_AISLE = 3;
const unsigned int NUMBER\_OF\_AISLES = 5;

void handle_arrival(vector<Car>&, vector<stack<string> >&, const string&);
void handle_departure(vector<Car>&, vector<stack<string> >&, const string&);
Car& find_car(vector<Car>&, string);

int main(int argc, char* argv\[\])
{

    try
    {

        if (argc != 2)
        {
            cerr << "Usage:n" << argv\[0\] << " data-file";
            return EXIT_FAILURE;
        }
        ifstream inf(argv\[1\]);
        if (! inf)
        {
            cerr << "Could not open " << argv\[1\];
            return EXIT_FAILURE;
        }

        vector<Car> cars;
        vector< stack<string> > parking\_lot(NUMBER\_OF_AISLES);

        while (! inf.eof())
        {

            string action, plate;
            inf >> plate >> action;

            if (action == "arrives")
            {
                handle\_arrival(cars, parking\_lot, plate);
            }
            else if (action == "departs")
            {
                handle\_departure(cars, parking\_lot, plate);
            }
            else
            {
                cerr << "Unknown action: " << action << endl;
            }

        }
        inf.close();

        cout << "nHere are all the cars that visited the lot today:n";


        sort(cars.begin(),cars.end());
        for(int i=0; i<cars.size(); i++)
            cout<<cars\[i\].getPlate()<<"     "<<cars\[i\].getAisle()<<"   aisle     moved     "<<cars\[i\].getTimesMoved()<<"    times    "<<endl;

        // TODO: Output the license plates of all the
        // cars that visited the lot, in alphabetical order


        return EXIT_SUCCESS;

    }
    catch (exception& e)
    {
        cerr << e.what() << endl;
    }
    catch (...)
    {
        cerr << "Unknown exception caught!" << endl;
    }

    return EXIT_FAILURE;
}

void handle\_arrival(vector<Car>& cars, vector< stack<string> >& parking\_lot, const string& plate)
{
for(int i=0;i<parking_lot.size();i++){
	if(parking\_lot\[i\].size()<PARKING\_SPOTS\_PER\_AISLE)
		{parking_lot\[i\].push(plate);
	cars.push_back(Car(plate,i));
	break;}
	else if(parking\_lot\[i\].size()>NUMBER\_OF_AISLES)
		cout<<"停车场所有过道已满";
}

    // TODO: Handle car arrivals
}

void handle\_departure(vector<Car>& cars, vector< stack<string> >& parking\_lot, const string& plate)
{
Car Target\_car=find\_car(cars,plate);
int Target\_aisle =Target\_car.getAisle();
stack<string> temp;
	while(!(parking\_lot\[Target\_aisle\].top()==plate))
	{Car *tempcar=&find\_car(cars,parking\_lot\[Target_aisle\].top());
		tempcar->setTimesMoved(tempcar->getTimesMoved()+1);
		temp.push(parking\_lot\[Target\_aisle\].top());
		parking\_lot\[Target\_aisle\].pop();

	}  parking\_lot\[Target\_aisle\].pop();
	while(temp.size()!=0)
	{
parking\_lot\[Target\_aisle\].push(temp.top());
		temp.pop();
	}
}

Car& find_car(vector<Car>& cars, string plate)
{
  for(int i = 0; i < cars.size(); i++)
{
	if(cars\[i\].getPlate()==plate)
		return cars\[i\];

}
    // TODO: Return a reference to the
    // the Car object whose license plate equals
    // the parameter 'plate'

}