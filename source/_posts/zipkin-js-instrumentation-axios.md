title: '【开源】zipkin-js-instrumentation-axios: 集成axios和zipkin'
tags:
  - JS
  - 微服务
url: 2914.html
id: 2914
categories:
  - 技术
abbrlink: 51735
date: 2019-02-19 13:47:00
---
Zipkin 是由Twitter公司开发并开源的分布式追踪系统，而axios则是常用的Javascript HTTP客户端。由于zipkin-js官方没有提供axios的适配，同时同类型库zipkin-jinstrumentation-axios已经破坏了axios的原有功能，为此极客人制作了本库用于集成zipkin和axios，可以支持axios原有的所有方法属性，其用法和axios完全一致。

zipkin-js-instrumentation-axios
===============================

Adds Zipkin tracing support for the [axios](https://www.npmjs.com/package/axios) JS HTTP client library. It **supports all features of `axios`**.

[](https://github.com/geekeren/zipkin-js-instrumentation-axios#installation)Installation
----------------------------------------------------------------------------------------

npm install zipkin-js-instrumentation-axios --save

[](https://github.com/geekeren/zipkin-js-instrumentation-axios#usage)Usage
--------------------------------------------------------------------------

You need to use `wrapAxios` fucntion to wrap the native `axios` instance, and the `axios` instance's type/functions/attributes are not affected. As a result, you can use `zipkinAxios` the same as `axios` For example:
```javascript
const axios = require('axios');
const wrapAxios = require('zipkin-js-instrumentation-axios');
const { Tracer, ExplicitContext, ConsoleRecorder } = require('zipkin');

const ctxImpl = new ExplicitContext();
const recorder = new ConsoleRecorder();
const localServiceName = 'service-a'; // name of this application
const tracer = new Tracer({ ctxImpl, recorder, localServiceName });

const remoteServiceName = 'weather-api';
const zipkinAxios = wrapAxios(axios, { tracer, localServiceName, remoteServiceName });

zipkinAxios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
 

### [](https://github.com/geekeren/zipkin-js-instrumentation-axios#interceptors-of-axios-also-supported)Interceptors of Axios also supported

You can intercept requests or responses before they are handled by then or catch.
```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```
 

### [](https://github.com/geekeren/zipkin-js-instrumentation-axios#the-test-cases-all-passed)The test cases all passed
```
 axios instrumentation - integration test
    ✓ should add headers to requests
    ✓ should support request shorthand (defaults to GET)
    ✓ should support both url and uri options
    ✓ should support promise callback
    ✓ should report 404 when path does not exist
    ✓ should report when service does not exist (41ms)
    ✓ should report when service returns 400
    ✓ should report when service returns 500
```