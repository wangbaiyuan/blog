---
title: 百度云推送实现博客新文章提醒
tags:
  - androd
  - PHP
url: 1593.html
id: 1593
categories:
  - 技术
abbrlink: 52458
date: 2016-01-08 00:04:32
---

在开发王柏元的博客客户端时，为了加入新文章发布时实现客户端通知的效果，极客人采用了百度云推送平台，使用百度官方提供的SDK和demo成功实现。服务端发送通知时，客户端会执行onNotificationClicked 回调函数。该函数的形参分别为

*   Context context：上下文
*   String title：通知标题
*   String description：通知内容
*   String customContentString：自定义字段，通过json可获取服务端的传值。

安卓端
---

 @Override
    public void onNotificationClicked(Context context, String title, String description, String customContentString) {
        Intent intent = new Intent();
        intent.setClass(context.getApplicationContext(), SinglePostActivity.class);
        intent.addFlags(Intent.FLAG\_ACTIVITY\_NEW_TASK);
        String postId="";
        try {
            JSONObject jso=new JSONObject(customContentString);
            postId=jso.getString("postId");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        intent.putExtra(SinglePostFragment.ARG\_ITEM\_ID,postId);
       intent.putExtra(SinglePostFragment.ARG\_POST\_TITLE, title);
//        context.startActivity(intent);
        context.getApplicationContext().startActivity(intent);

        String notifyString = "通知点击 title=\\"" + title + "\\" description=\\"" + description + "\\" customContent=" + customContentString;
        Log.d(TAG, notifyString);
    }

服务器端代码需要引入sdk.php，关键是服务器要支持cUrl模块。我的阿里云免费主机就不支持，后来我消息推送的代码放在景安的虚拟主机上，通过阿里云调用URL的方式执行在景安主机上的PHP文件，解决了这一问题。

PHP服务器端
-------

 

function newBlogPushtoAPP($post_ID){
    global $post;
require_once '../sdk.php';

// 创建SDK对象.
$sdk = new PushSDK();


// message content.
$message = array (
    // 消息的标题.
    'title' => $post->post_title,
    // 消息内容 
    'description' => $post->content,

//自定义字段。数组类型
    "custom_content"=> array( 
                    "postId"=> $post->ID
                    )
    
);

// 设置消息类型为 通知类型.
$opts = array (
    'msg_type' => 1 
);

// 向目标设备发送一条消息
$rs = $sdk -> pushMsgToAll($message, $opts);
}
add\_action ( 'publish\_post', 'newBlogPushtoAPP', 1);