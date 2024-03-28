---
title: Android开发解析JSON数据
tags:
  - android
  - API
  - json
url: 1070.html
id: 1070
categories:
  - 技术
abbrlink: 1346
date: 2015-04-07 13:30:17
---

对于服务器端来说，返回给客户端的数据格式一般分为html、xml和json这三种格式，那么本篇随笔将讲解一下json这个知识点，包括如何通过json-lib和gson这两个json解析库来对解析我们的json数据，以及如何在我们的Android客户端解析来自服务器端的json数据，并更新到UI当中。

一、什么是json
---------

json(Javascript Object Notation)是一种轻量级的数据交换格式，相比于xml这种数据交换格式来说，因为解析xml比较的复杂，而且需要编写大段的代码，所以客户端和服务器的数据交换格式往往通过json来进行交换。尤其是对于web开发来说，json数据格式在客户端直接可以通过javascript来进行解析。 json一共有两种数据结构，一种是以 (key/value)对形式存在的无序的jsonObject对象，一个对象以“{”（左花括号）开始，“}”（右花括号）结束。每个“名称”后跟一个“:”（冒号）；“‘名称/值’ 对”之间使用“,”（逗号）分隔。 ![](http://images.cnitblog.com/blog/432441/201311/27202314-f6689071fd2444f18e2db818071ad990.gif) 例如：{"name": "xiaoluo"}， 这就是一个最简单的json对象，对于这种数据格式，key值必须要是string类型，而对于value，则可以是string、number、object、array等数据类型： [![27202406-3f9f3a202a1046009a10c90891d7ecf6](http://baiyuan.wang/wp-content/uploads/2015/04/27202406-3f9f3a202a1046009a10c90891d7ecf6.gif)](http://baiyuan.wang/wp-content/uploads/2015/04/27202406-3f9f3a202a1046009a10c90891d7ecf6.gif) 另一种数据格式就是有序的value的集合，这种形式被称为是jsonArray，数组是值（value）的有序集合。一个数组以“\[”（左中括号）开始，“\]”（右中括号）结束。值之间使用“,”（逗号）分隔。 ![](http://images.cnitblog.com/blog/432441/201311/27202539-5ecbee4dffaa4388998dd3118948ec48.gif) 更多的有关json数据格式可以参加json的官网，[http://www.json.org/json-zh.html](http://www.json.org/json-zh.html)

二、解析json数据格式
------------

这里将使用两种json的解析库来对我们的json数据格式进行解析以及生成我们的json数据格式。 1.json-lib([http://json-lib.sourceforge.net/](http://json-lib.sourceforge.net/)) 使用json-lib来进行解析，我们需要引入第三方的包，因为json-lib分为了两个版本，一个版本是针对于jdk1.3的，一个版本是针对于jdk1.5的，这里我们下载jdk1.5的这个json-lib包，其中还需要引入其他的几个jar包： [![27203549-51a3bc4d1b604714aeef0562142e4fe9](http://baiyuan.wang/wp-content/uploads/2015/04/27203549-51a3bc4d1b604714aeef0562142e4fe9.jpg)](http://baiyuan.wang/wp-content/uploads/2015/04/27203549-51a3bc4d1b604714aeef0562142e4fe9.jpg) 下载好这几个jar包后，加入到classpath中即可。我们来看看json-lib给我们提供的API。 我们最常用的两个类就是  JSONObject和JSONArray这两个类，分别代表了json对象和json数组，这两个类都实现了 JSON 这个接口，下面我们通过几个小例子来看看如何将我们常见的几种数据格式转换成我们的json对象(我们一般称之为JSON数据的序列化)以及再将json对象在转换成我们的数据格式(称之为反序列化)。 ①简单的javabean的序列化和反序列化  

public class Person
{
    private int id;
    private String name;
    private String address;

    public Person()
    {
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public Person(int id, String name, String address)
    {
        super();
        this.id = id;
        this.name = name;
        this.address = address;
    }

    @Override
    public String toString()
    {
        return "Person \[id=" + id + ", name=" + name + ", address=" + address
                \+ "\]";
    }

}

  首先我们定义一个简单的javabean对象，然后将一个Person对象转换成json对象，然后再将这个json对象反序列化成我们的Person对象。 我们先定义一个JsonTools类，这个类有两个静态方法，我们可以通过这两个方法来得到一个JSON类型的字符串对象，以及一个JSON对象  

public class JsonTools
{
    /\*\*
     \* 得到一个json类型的字符串对象
     \* @param key
     \* @param value
     \* @return
     */
    public static String getJsonString(String key, Object value)
    {
        JSONObject jsonObject = new JSONObject();
        //put和element都是往JSONObject对象中放入 key/value 对
//        jsonObject.put(key, value);
        jsonObject.element(key, value);
        return jsonObject.toString();
    }
    
    /\*\*
     \* 得到一个json对象
     \* @param key
     \* @param value
     \* @return
     */
    public static JSONObject getJsonObject(String key, Object value)
    {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(key, value);
        return jsonObject;
    }
    
}

  我们可以直接通过 JSONObject jsonObject = new JSONObject(); 这个方法就可以得到一个json对象，然后通过element()或者是put()方法来给我们的json对象添加key/value对。我们先来看看第一个例子，实现一个简单的Person对象和json对象的转换

　　　　 Person person = new Person(1, "xiaoluo", "广州");
        //    将Person对象转换成一个json类型的字符串对象
        String personString = JsonTools.getJsonString("person", person);
        System.out.println(personString.toString());

我们看看控制台的输出：

{"person":{"address":"广州","id":1,"name":"xiaoluo"}}

整个外面的大括号是一个json对象，里面有一对key/value，其中里面的{"address":"广州","id":1,"name":"xiaoluo"}就是我们转换成的json字符串对象 再来看看如何将json对象转换成我们的bean对象

　　　　 JSONObject jsonObject = JsonTools.getJsonObject("person", person);
        //    通过JSONObject的toBean方法可以将json对象转换成一个javabean
        JSONObject personObject = jsonObject.getJSONObject("person");
        Person person2 = (Person) JSONObject.toBean(personObject, Person.class);
        System.out.println(person2);

Person \[id=1, name=xiaoluo, address=广州\]

②转换List<Person>类型的对象  

　　@Test
    public void testPersonsJson()
    {
        List<Person> persons = new ArrayList<Person>();
        Person person = new Person(1, "xiaoluo", "广州");
        Person person2 = new Person(2, "android", "上海");
        persons.add(person);
        persons.add(person2);
        String personsString = JsonTools.getJsonString("persons", persons);
        System.out.println(personsString);
        
        JSONObject jsonObject = JsonTools.getJsonObject("persons", persons);
        //    List<Person>相当于一个JSONArray对象
        JSONArray personsArray = (JSONArray)jsonObject.getJSONArray("persons");
        List<Person> persons2 = (List<Person>) personsArray.toCollection(personsArray, Person.class);
        System.out.println(persons2);
    }

 

{"persons":\[{"address":"广州","id":1,"name":"xiaoluo"},{"address":"上海","id":2,"name":"android"}\]}
\[Person \[id=1, name=xiaoluo, address=广州\], Person \[id=2, name=android, address=上海\]\]

③List<Map<String, String>>类型的json对象转换  

　　 @Test
    public void testMapJson()
    {
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        Map<String, String> map1 = new HashMap<String, String>();
        map1.put("id", "001");
        map1.put("name", "xiaoluo");
        map1.put("age", "20");
        Map<String, String> map2 = new HashMap<String, String>();
        map2.put("id", "002");
        map2.put("name", "android");
        map2.put("age", "33");
        list.add(map1);
        list.add(map2);
        String listString = JsonTools.getJsonString("list", list);
        System.out.println(listString);
        
        JSONObject jsonObject = JsonTools.getJsonObject("list", list);
        JSONArray listArray = jsonObject.getJSONArray("list");
        List<Map<String, String>> list2 = (List<Map<String, String>>) listArray.toCollection(listArray, Map.class);
        System.out.println(list2);
    }

 

{"list":\[{"id":"001","age":"20","name":"xiaoluo"},{"id":"002","age":"33","name":"android"}\]}
\[{id=001, name=xiaoluo, age=20}, {id=002, name=android, age=33}\]

通过上面的例子，我们可以了解了如何通过json-lib这个解析库来实现javabean、List、Map等数据和json数据的互相转换 2.gson([http://code.google.com/p/google-gson/](http://code.google.com/p/google-gson/)) 下面我们来看看Google提供的gson这个json解析库，同样我们需要去下载gson这个jar包，导入到我们的项目中 使用gson，我们可以非常轻松的实现数据对象和json对象的相互转化，其中我们最常用的就是两个方法，一个是fromJSON()，将json对象转换成我们需要的数据对象，另一个是toJSON()，这个就是将我们的数据对象转换成json对象。下面我们也通过一个综合的例子来看看gson的使用方法：  

public class JsonService
{
    public Person getPerson()
    {
        Person person = new Person(1, "xiaoluo", "广州");
        return person;
    }
    
    public List<Person> getPersons()
    {
        List<Person> persons = new ArrayList<Person>();
        Person person = new Person(1, "xiaoluo", "广州");
        Person person2 = new Person(2, "android", "上海");
        persons.add(person);
        persons.add(person2);
        return persons;
    }
    
    public List<String> getString()
    {
        List<String> list = new ArrayList<String>();
        list.add("广州");
        list.add("上海");
        list.add("北京");
        return list;
    }
    
    public List<Map<String, String>> getMapList()
    {
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        Map<String, String> map1 = new HashMap<String, String>();
        map1.put("id", "001");
        map1.put("name", "xiaoluo");
        map1.put("age", "20");
        Map<String, String> map2 = new HashMap<String, String>();
        map2.put("id", "002");
        map2.put("name", "android");
        map2.put("age", "33");
        list.add(map1);
        list.add(map2);
        return list;
    }
}

   

public static void main(String\[\] args)
    {
        Gson gson = new Gson();
        JsonService jsonService = new JsonService();
        Person person = jsonService.getPerson();
        System.out.println("person: " + gson.toJson(person));
        //    对于Object类型，使用 fromJson(String, Class)方法来将Json对象转换成Java对象
        Person person2 = gson.fromJson(gson.toJson(person), Person.class);
        System.out.println(person2);
        System.out.println("------------------------------------------------");
        
        List<Person> persons = jsonService.getPersons();
        System.out.println("persons: " + gson.toJson(persons));
        /\*
         \* 对于泛型对象，使用fromJson(String, Type)方法来将Json对象转换成对应的泛型对象
         \* new TypeToken<>(){}.getType()方法
         */
        List<Person> persons2 = gson.fromJson(gson.toJson(persons), new TypeToken<List<Person>>(){}.getType());
        System.out.println(persons2);
        System.out.println("------------------------------------------------");
        
        List<String> list = jsonService.getString();
        System.out.println("String---->" + gson.toJson(list));
        List<String> list2 = gson.fromJson(gson.toJson(list), new TypeToken<List<String>>(){}.getType());
        System.out.println("list2---->" + list2);
        System.out.println("------------------------------------------------");
        
        List<Map<String, String>> listMap = jsonService.getMapList();
        System.out.println("Map---->" + gson.toJson(listMap));
        List<Map<String, String>> listMap2 = gson.fromJson(gson.toJson(listMap), new TypeToken<List<Map<String, String>>>(){}.getType());
        System.out.println("listMap2---->" + listMap2);
        System.out.println("------------------------------------------------");
    }

  看看控制台的输出：  

person: {"id":1,"name":"xiaoluo","address":"广州"}
Person \[id=1, name=xiaoluo, address=广州\]
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
persons: \[{"id":1,"name":"xiaoluo","address":"广州"},{"id":2,"name":"android","address":"上海"}\]
\[Person \[id=1, name=xiaoluo, address=广州\], Person \[id=2, name=android, address=上海\]\]
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
String---->\["广州","上海","北京"\]
list2---->\[广州, 上海, 北京\]
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
Map---->\[{"id":"001","age":"20","name":"xiaoluo"},{"id":"002","age":"33","name":"android"}\]
listMap2---->\[{id=001, age=20, name=xiaoluo}, {id=002, age=33, name=android}\]
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

三、在Android客户端解析服务器端的json数据
--------------------------

下面我们来完成一个综合的例子，Android客户端通过一个AsyncTask异步任务请求服务器端的某些数据，然后在解析完这些数据后，将得到的数据内容更新到我们的Spinner这个UI控件当中。 我们首先来看下服务器端的代码：  

@WebServlet("/CityServlet")
public class CityServlet extends HttpServlet
{
    private static final long serialVersionUID = 1L;

    public CityServlet()
    {
        super();
    }

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException
    {
        this.doPost(request, response);
    }

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        
        String type = request.getParameter("type");
        if("json".equals(type))
        {
            List<String> cities = new ArrayList<String>();
            cities.add("广州");
            cities.add("上海");
            cities.add("北京");
            cities.add("湖南");
            Map<String, List<String>> map = new HashMap<String, List<String>>();
            map.put("cities", cities);
            String citiesString = JSON.toJSONString(map);
            writer.println(citiesString);
        }
        
        writer.flush();
        writer.close();
    }

}

  如果客户端请求的参数是type=json，则响应给客户端一个json数据格式 接着来看看客户端的代码，首先看看客户端的布局文件，其实就是一个按钮和一个Spinner控件，当点击按钮后，通过http协议请求服务器端的数据，然后在接收到后再更新我们的Spinner控件的数据  

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout\_width="match\_parent"
    android:layout\_height="match\_parent" >

    <TextView
        android:id="@+id/textView1"
        android:layout\_width="wrap\_content"
        android:layout\_height="wrap\_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentTop="true"
        android:layout_marginLeft="64dp"
        android:layout_marginTop="64dp"
        android:textSize="20sp"
        android:text="城市" />
    
    <Spinner 
        android:id="@+id/spinner"
        android:layout\_width="wrap\_content"
        android:layout\_height="wrap\_content"
        android:layout_alignTop="@id/textView1"
        android:layout_toRightOf="@id/textView1"/>

    <Button
        android:id="@+id/button"
        android:layout\_width="wrap\_content"
        android:layout\_height="wrap\_content"
        android:layout_alignLeft="@+id/textView1"
        android:layout_below="@+id/spinner"
        android:layout_marginLeft="22dp"
        android:layout_marginTop="130dp"
        android:text="加载数据" />

</RelativeLayout>

  在Android客户端写一个解析json数据格式的类：  

public class JsonUtils
{
    /\*\*
     \* @param citiesString    从服务器端得到的JSON字符串数据
     \* @return    解析JSON字符串数据，放入List当中
     */
    public static List<String> parseCities(String citiesString)
    {
        List<String> cities = new ArrayList<String>();
        
        try
        {
            JSONObject jsonObject = new JSONObject(citiesString);
            JSONArray jsonArray = jsonObject.getJSONArray("cities");
            for(int i = 0; i < jsonArray.length(); i++)
            {
                cities.add(jsonArray.getString(i));
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        
        return cities;
    }
}

  当然我们的HttpUtils类也不可少：  

public class HttpUtils
{
    /\*\*
     \* @param path    请求的服务器URL地址
     \* @param encode    编码格式
     \* @return    将服务器端返回的数据转换成String
     */
    public static String sendPostMessage(String path, String encode)
    {
        String result = "";
        HttpClient httpClient = new DefaultHttpClient();
        try
        {
            HttpPost httpPost = new HttpPost(path);
            HttpResponse httpResponse = httpClient.execute(httpPost);
            if(httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
            {
                HttpEntity httpEntity = httpResponse.getEntity();
                if(httpEntity != null)
                {
                    result = EntityUtils.toString(httpEntity, encode);
                }
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            httpClient.getConnectionManager().shutdown();
        }
        
        return result;
    }
}

  最后来看看我们的MainActivity类：  

public class MainActivity extends Activity
{
    private Spinner spinner;
    private Button button;
    private ArrayAdapter<String> adapter;
    private ProgressDialog dialog;
    private final String CITY\_PATH\_JSON = "http://172.25.152.34:8080/httptest/CityServlet?type=json";
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        spinner = (Spinner)findViewById(R.id.spinner);
        button = (Button)findViewById(R.id.button);
        dialog = new ProgressDialog(MainActivity.this);
        button.setOnClickListener(new OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
                dialog.setTitle("提示信息");
                dialog.setMessage("loading......");
                dialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
                dialog.setCancelable(false);
                
                new MyAsyncTask().execute(CITY\_PATH\_JSON);
            }
        });
    }

    public class MyAsyncTask extends AsyncTask<String, Void, List<String>>
    {
        @Override
        protected void onPreExecute()
        {
            dialog.show();
        }
        @Override
        protected List<String> doInBackground(String... params)
        {
            List<String> cities = new ArrayList<String>();
            String citiesString = HttpUtils.sendPostMessage(params\[0\], "utf-8");
            //    解析服务器端的json数据
            cities = JsonUtils.parseCities(citiesString);return cities;
        }
        @Override
        protected void onPostExecute(List<String> result)
        {
            adapter = new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple\_spinner\_item, result);
            adapter.setDropDownViewResource(android.R.layout.simple\_spinner\_dropdown_item);
            spinner.setAdapter(adapter);
            dialog.dismiss();
        }
    }
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

}

  当然别往了开启我们的网络授权

<uses-permission android:name="android.permission.INTERNET"/>

最后我们来看看效果图： [![27213759-1bac990703384d64975cbb3b677ef158](http://baiyuan.wang/wp-content/uploads/2015/04/27213759-1bac990703384d64975cbb3b677ef1581.jpg)](http://baiyuan.wang/wp-content/uploads/2015/04/27213759-1bac990703384d64975cbb3b677ef1581.jpg)[![27213921-51d04301cf714adfb2fc48963be47500](http://baiyuan.wang/wp-content/uploads/2015/04/27213921-51d04301cf714adfb2fc48963be47500.jpg)](http://baiyuan.wang/wp-content/uploads/2015/04/27213921-51d04301cf714adfb2fc48963be47500.jpg) 这样我们就完成了客户端与服务器端通过json来进行数据的交换 总结：本篇随笔主要讲解了JSON这种轻量级的数据交换格式的概念，以及讲解了两种解析json数据的解析类(json-lib以及gson)，最后通过一个小例子实现了在Android客户端和服务器端使用json这种数据格式来进行数据的交换。