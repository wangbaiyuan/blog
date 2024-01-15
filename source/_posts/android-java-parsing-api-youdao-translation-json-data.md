---
title: Android(Java)解析有道翻译API-Json数据
tags:
  - android
  - android开发
  - API
  - JAVA
  - json
  - 个人程序库
  - 在线应用
url: 1435.html
id: 1435
categories:
  - 软件开发
abbrlink: 51595
date: 2015-08-24 08:14:18
---

由于百度翻译、有道翻译等翻译服务都开放了自己的API，开发者可以使用它们提供的API很简单就能开发出自己的翻译软件。自己开发的软件可能在功能上不及它们强大，但是翻译的结果是一样的，同时不会内置其它偷跑流量的进程，同时界面也相对简洁，随心所欲地进行修改。 [![API](http://baiyuan.wang/wp-content/uploads/2015/03/API.jpg)](http://baiyuan.wang/wp-content/uploads/2015/03/API.jpg) 首先在有道API进行申请API ID和KEY后，将下列程序中clientID和clientSecret替换为ID和KEY，通过GET请求获得字符串进行解析。下面是我使用java解析JSON数据的代码：

Android(Java)解析有道翻译API-Json数据
-----------------------------

    
private String clientID="你在有道API申请的ID";
private String clientSecret="你在有道API申请的密钥";
Handler errHander = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            String notice = "";
            switch (msg.what) {
                case 20:
                    notice = "要翻译的文本过长";
                    break;
                case 30:
                    notice = "无法进行有效的翻译";
                    break;
                case 40:
                    notice = "不支持的语言类型";
                    break;
                case 50:
                    notice = "无效的key";
                    break;
                case 60:
                    notice = "无词典结果";
                    break;
            }
            Toast.makeText(MainActivity.this, notice, Toast.LENGTH_SHORT);
        }
    };
    Handler hander = new Handler() {
        @Override
        public void handleMessage(Message msg) {

            if (msg.what == 0x123) {
                toString.setText(reply);
            } else if (msg.what == 0x124) {
                Toast.makeText(MainActivity.this, "查询失败，请检查联网", Toast.LENGTH_SHORT).show();
            }
        }
    };
    private Runnable askForYouDao = new Runnable() {
        @Override
        public void run() {
            try {
                String url_path = "http://fanyi.youdao.com/openapi.do?keyfrom=" + clientID
                        \+ "&key=" + clientSecret + "&type=data&doctype=json&version=1.1&q="
                        \+ URLEncoder.encode(keywords, "utf8");
                URL getUrl = new URL(url_path);
                HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection();
                connection.setConnectTimeout(3000);
                connection.connect();
                BufferedReader replyReader = new BufferedReader(
                        new InputStreamReader(connection.getInputStream(), "utf-8"));//约定输入流的编码
                reply = replyReader.readLine();
                JSONObject replyJson = new JSONObject(reply);
                String errorCode = replyJson.getString("errorCode");
                if (errorCode.equals("0")) {
                    String query = replyJson.getString("query");
                    JSONArray translation
                            = replyJson.has("translation") ? replyJson.getJSONArray("translation") : null;
                    JSONObject basic
                            = replyJson.has("basic") ? replyJson.getJSONObject("basic") : null;
                    JSONArray web
                            = replyJson.has("web") ? replyJson.getJSONArray("web") : null;
                    String phonetic=null;
                    String uk_phonetic=null;
                    String us_phonetic=null;
                    JSONArray explains=null;
                    if(basic!=null){
                      phonetic=basic.has("phonetic")? basic.getString("phonetic"):null;
                       uk_phonetic=basic.has("uk-phonetic")? basic.getString("uk-phonetic"):null;
                       us_phonetic=basic.has("us-phonetic")? basic.getString("us-phonetic"):null;
                        explains=basic.has("explains")? basic.getJSONArray("explains"):null;
                    }
//                    if(web!=null){
//                        JSONArray webs=web.getJSONObject()
//                    }
                    String translationStr="";
                    if(translation!=null){
                        translationStr="\\n翻译：\\n";
                        for(int i=0;i<translation.length();i++){
                            translationStr+="\\t【"+(i+1)+"】"+translation.getString(i)+"\\n";
                        }
                    }
                    String phoneticStr=(phonetic!=null? "\\n发音："+phonetic:"")
                            +(uk\_phonetic!=null? "\\n英式发音："+uk\_phonetic:"")
                            +(us\_phonetic!=null? "\\n美式发音："+us\_phonetic:"");
                    String explainStr="";
                    if(explains!=null){
                        explainStr="\\n\\n释义：\\n";
                        for(int i=0;i<explains.length();i++){
                            explainStr+="\\t【"+(i+1)+"】"+explains.getString(i)+"\\n";
                        }
                    }

                    reply="原文："+query+"\\n"+translationStr+phoneticStr+explainStr;


                    hander.sendEmptyMessage(0x123);
                } else {
//                    Message errorMsg=new Message();
                    int what = Integer.parseInt(errorCode);
//                    errorMsg.what=what;
                    errHander.sendEmptyMessage(what);
                }


            } catch (Exception e) {
                Log.e("errss", e.getMessage());
                hander.sendEmptyMessage(0x124);
            }

        }

    };