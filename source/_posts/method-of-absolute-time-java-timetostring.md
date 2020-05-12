---
title: 自制绝对时间相对化java方法TimeToString
url: 1304.html
id: 1304
categories:
  - 百元百科
abbrlink: 10604
date: 2015-06-23 08:54:49
tags: ''
---

本方式实现将绝对日期如2015-6-23 8:00:00时间字符串转换为昨天8：00，明天21:00，今天5:23等等。在安卓开始中涉及时间显示相当实用。 注意按代码中要求传入时间字符串time的参数

TimeToString(String time)代码：
----------------------------

	@SuppressWarnings("deprecation")
	public static String TimeToString(String time) {
		String timeString=time;
		try {
			SimpleDateFormat dateFormat;

			dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat dateFormat2 = new SimpleDateFormat("HH:mm");
			SimpleDateFormat dateFormat3 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			dateFormat.setLenient(false);
			Date timeDate = dateFormat.parse(time);
//			Long timeStamp = timeDate.getTime();
//			Long currentStamp = new Date().getTime();
//			Long timetogo = currentStamp - timeStamp;
			Calendar calDateA = Calendar.getInstance();
			Calendar calDateB = Calendar.getInstance();
			calDateB.setTime(timeDate);
			int year=calDateA.get(Calendar.YEAR);
			int mon=calDateA.get(Calendar.MONTH);
			int day=calDateA.get(Calendar.DATE);
			int currentyear=calDateB.get(Calendar.YEAR);
			int currentmon=calDateB.get(Calendar.MONTH);
			int currentday=calDateB.get(Calendar.DATE);
			Log.e("bypaper",currentyear+" "+currentmon+" "+year+" "+day+"　");
			if (year==currentyear&&mon==currentmon&&day==currentday) {
				timeString="今天"+dateFormat2.format(timeDate);
			}else if (year==currentyear&&mon==currentmon&&(day-currentday)==1) {
				timeString="昨天"+dateFormat2.format(timeDate);
			}else if (year==currentyear&&mon==currentmon&&(day-currentday)==-1) {
				timeString="明天"+dateFormat2.format(timeDate);
			}else {
				timeString=dateFormat3.format(timeDate);
			}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}// util类型

		return timeString;

	}