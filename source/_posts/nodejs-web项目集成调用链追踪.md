title: NodeJs web项目集成调用链追踪
url: 3532.html
id: 3532
categories:
  - 技术
abbrlink: 22206
tags: ''
date: 2019-12-23 13:11:14
---
在微服务架构中，一次用户请求往往调用多个服务，微服务调用链追踪工具可以

*   在用户请求发生错误时，帮助我们定位root cause
*   在性能优化时提供可观测性指标，找到架构中最耗时的服务和API请求，帮助我们对症下药

现在的NodeJs web项目比较流行地采用express作为服务器，axios也是一款比较流行的HTTP客户端。微服务的特点之一，自己作为服务端的同时，也为作为客户端访问其它服务。所以集成调用链追踪的关键在于：

*   集成server，处理客户端请求。通常会有现成的框架实现了此功能：构造新的，或者从上游的HTTP 请求的header中获取一个包含tracing的结构体（如x-b3-spanid）
*   集成client，在发出请求和返回数据时记录请求，zipkin等工具需要知道每个请求的请求时间、返回码、路径等等。
*   将server的请求头tracing数据传递到客户端

传统微服务（非istio）
-------------

### 工具方法

[![](https://baiyuan.wang/wp-content/uploads/2019/12/zipkin-architecture.png)](https://baiyuan.wang/wp-content/uploads/2019/12/zipkin-architecture.png)

```js

const { Tracer, ExplicitContext, ConsoleRecorder } = require('zipkin');
const { expressMiddleware }= require('zipkin-instrumentation-express');
const recorder = new ConsoleRecorder();
const { get } = require('lodash');

const zipkinTracer = new Tracer({
  ctxImpl: new ExplicitContext(),
  recorder,
  localServiceName: '<YOUR\_SERVICE\_NAME>'
});
const zipkinMiddleware = expressMiddleware({ tracer: zipkinTracer });
const getTraceIdFromRequest = req => get(req, '\_trace\_id');
const isolateZipkinContextByRequest = (req, res, next) => {
  zipkinTracer.scoped(() => {
    zipkinTracer.setId(getTraceIdFromRequest(req));
    next();
  });
};
module.exports = {
  zipkinTracer,
  zipkinMiddleware,
  isolateZipkinContextByRequest,
};
```
 

### express 服务器路由集成zipkin
 
```js
router.use(zipkinMiddleware);
router.use(isolateZipkinContextByRequest);
```

由于nodejs是主线程为单线程的服务器语言，高并发由异步消息队列完成。所以保证从服务器端传递tracing信息和客户端tracing信息在同一个“上下文”，不能简单地采用一个全局变量来保存tracing信息。此处的isolateZipkinContextByRequest至关重要，  

### axios客户端集成zipkin

```js
const axios = require('axios');
const wrapAxios = require('zipkin-instrumentation-axiosjs');
const { Tracer, ExplicitContext, ConsoleRecorder } = require('zipkin');

const ctxImpl = new ExplicitContext();
const recorder = new ConsoleRecorder();
const localServiceName = 'service-a'; // name of this application
const tracer = new Tracer({ ctxImpl, recorder, localServiceName });

const remoteServiceName = 'weather-api';
const zipkinAxios = wrapAxios(axios, { tracer, remoteServiceName });

zipkinAxios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
  详见：https://github.com/openzipkin/zipkin-js/tree/master/packages/zipkin-instrumentation-axiosjs  

istio
-----

相比传统的K8S架构，由于service mesh使用sidecar的方式代理了pod的所有网络请求，构造请求头、和记录请求路径、请求返回码等操作可以在sidebar等istio组件上实现。 所以在istio语境下我们只需要实现HTTP header中的tracing信息从服务端到客户端的传递。同样的原因，nodejs是单线程语言，不能通过一个thread级别隔离的全局变量来保存tracing信息，同时通过层层函数调用栈的方式来传递request的tracing信息则过于麻烦。express库本身没有提供类似于spring或者PHP中的session的会话对象，这里会引入一个“express-http-context”的npm库完成request之间的数据“隔离”。

### 获取请求中的tracing header

```js
const { pick } = require('lodash');
module.exports = {
  getForwardHeaders(req) {
    return pick(req.headers,
      ['x-request-id',
        'x-b3-traceid',
        'x-b3-spanid',
        'x-b3-parentspanid',
        'x-b3-sampled',
        'x-b3-flags',
        'x-ot-span-context',
        'x-datadog-trace-id',
        'x-datadog-parent-id',
        'x-datadog-sampled'
      ]
    ) || {};
  }
};
```

express的集成代码：

```js
const { getForwardHeaders } = require('./util/tracer');
const app = express();
const httpContext = require('express-http-context');
app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set('traceHeaders', getForwardHeaders(req));
  next();
});

client的集成代码：

```js
const axios = require('axios');
const httpContext = require('express-http-context');

// 关键代码
config.headers = Object.assign(config.headers || {}, httpContext.get('traceHeaders'));
axios(config)
    .then(res => {
      //
    })
    .catch(err => {
     //
    })
```
  参考资料  

*   zipkin链路追踪原理：https://www.cnblogs.com/iiiiiher/p/10256676.html