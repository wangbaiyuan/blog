---
title: 新建NodeJS Web服务的几个最佳实践
tags:
  - DevOps
  - Node.JS
url: 3191.html
id: 3191
categories:
  - 技术
abbrlink: 20233
date: 2019-05-16 12:28:32
---

在项目建立初期引入一些最佳实践可以避免后期大量复杂的重构工作，本文总结了在使用Node JS构建Web服务时的一些最佳实践，同时涉及的具体的操作步骤。

一、使用初始化脚手架
----------

所谓脚手架，就是在初始化代码库时，脚手架可以帮助自动生成一些代码和项目结构，注入一些框架。对于一个NodeJS项目，不需要我们从npm init初始化起，自己一步步安装一些依赖。

### Express命令

Express是目前最流行的NodeJS web框架。全局安装一个express-generator，用来初始化express项目。

*   全局安装命令：`npm install express-generator -g`
*   新建一个名为**hello-express**项目: `express hello-express`
    
    \[caption id="attachment_3211" align="aligncenter" width="1170"\][![使用脚手架初始化Express项目](https://wangbaiyuan.cn/wp-content/uploads/2019/05/Screen-Shot-2019-05-16-at-12.42.38.png)](https://wangbaiyuan.cn/wp-content/uploads/2019/05/Screen-Shot-2019-05-16-at-12.42.38.png) 使用脚手架初始化Express项目\[/caption\]
    

### 使用Swagger脚手架

当使用NodeJS 开发Web API时，强烈建议使用[Swagger](https://links.jianshu.com/go?to=https%3A%2F%2Fswagger.io)进行API构建与管理，以及提供API文档服务。全局安装swagger命令也可以实现初始化一个swagger项目。swagger命令可以让你在浏览器上实时直接编辑你的API定义和调试API。

#### 初始化swagger项目

*   安装命令：`npm install swagger -g`
*   新建Swagger API项目：`swagger project create hello-swagger`，在这过程中会让你选择使用哪种Web服务器，当选择express时就可以自动引入express框架
*   项目结构：

.
├── README.md
├── api
│   ├── controllers
│   │   ├── README.md
│   │   └── hello_world.js
│   ├── helpers
│   │   └── README.md
│   ├── mocks
│   │   └── README.md
│   └── swagger
│       └── swagger.yaml
├── app.js
├── config
│   ├── README.md
│   └── default.yaml
├── package-lock.json
├── package.json
└── test
    └── api
        ├── controllers
        │   ├── README.md
        │   └── hello_world.js
        └── helpers
            └── README.md

 

#### 实时编辑和语法校验

*   启动在线编辑：`swagger project edit`, 此时会打开系统浏览器，在浏览器中可以直接编辑swagger文档，并进行实时语法检查，同时浏览器里面的编辑变更会回写到代码。

![](https://wangbaiyuan.cn/wp-content/uploads/2019/05/20190516042224214.jpg)

Swagger实时编辑和语法校验

#### 在线调试API

上图右侧部分，就是类似于 `postman`的API调试工具。

二、Swagger文档服务
-------------

Swagger是一个最流行的的API构建与管理工具，在各种语言和框架都有相应的库可以支持，同时安装swagger-ui扩展进行API文档管理和在线调试。 其遵循[OpenAPI标准](https://links.jianshu.com/go?to=https%3A%2F%2Fswagger.io%2Fblog%2Fapi-strategy%2Fdifference-between-swagger-and-openapi%2F)，OpenAPI定义了诸如路由转发、参数定义与校验等一整套API规范。

*   OpenAPI规范文档：[https://swagger.io/specification/](https://links.jianshu.com/go?to=https%3A%2F%2Fswagger.io%2Fspecification%2F)
*   在线API编辑器预览：[https://editor.swagger.io](https://links.jianshu.com/go?to=https%3A%2F%2Feditor.swagger.io%2F)

### 发布swagger文档

上面的swagger命令适合在本地编辑、调试使用，当在产品（Production）环境发布文档服务时，适合引入 swagger UI 中间件

app.use(SwaggerUi(swaggerExpress.runner.swagger));

访问[http://localhost:10010/docs/#/](https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A10010%2Fdocs%2F%23%2F)即可查看API文档：

![](https://wangbaiyuan.cn/wp-content/uploads/2019/05/20190516042224316.jpg)

Swagger UI

*   在线预览：[https://petstore.swagger.io/](https://links.jianshu.com/go?to=https%3A%2F%2Fpetstore.swagger.io%2F)

*   完整代码如下：
```
SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  swaggerExpress.register(app);

  const port = 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths\['/hello'\]) {
    console.log('try this:\\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
```
 

三、启用ES6 JS语法
------------

ECMAScript 是 JS 的语言标准，ES6是新的JS语法标准。在没有其它配置的情况下使用ES6语法会出现一下错误。我们需要引入babel做语法转换。
```
import SwaggerExpress from 'swagger-express-mw';
       ^^^^^^^^^^^^^^

SyntaxError: Unexpected identifier
    at Module._compile (internal/modules/cjs/loader.js:760:23)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:827:10)
```
### 什么是babel

Babel 是一个 JavaScript 编译器，工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。更多文档可参考：[https://www.babeljs.cn/docs/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2F)

### 如何配置？

*   安装依赖：
```
npm install -D @babel/core @babel/cli @babel/preset-env @babel/node
```
 

*   在根目录创建.babelrc文件，内容如下

```json
{ 
  "presets": \["@babel/preset-env"\] 
}
```

*   使用babel-node命令代替node
```json
"scripts": {
    "start": "npm run prod",
    "server": "node ./app.js"  // -> "babel-node ./app.js"
}
```

### 如何处理已有的非ES6项目？

*   安装一个npm module `cjs-to-es6` 可以做一些简单的ES6语法转化：`npm install -g cjs-to-es6`

### 参考资料

*   [https://www.babeljs.cn/docs/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2F)
*   How to enable ES6 (and beyond) syntax with Node and Express：[https://medium.freecodecamp.org/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab](https://links.jianshu.com/go?to=https%3A%2F%2Fmedium.freecodecamp.org%2Fhow-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab)

四、文件变动监听并自动重启服务
---------------

每次修改代码时我们需要重启Express来查看效果，`nodemon`可以在指定的文件发生修改后，帮助我们自动重启服务，提高开发效率。

*   安装nodemon：`npm i -D nodemon`
*   在根目录添加配置文件nodemon.json：

{
  "exec": "npm run dev",
  "watch": \["src/*", "public/*"\],
  "ext": "js, html, css, json"
}

 

*   参考文档可以更多配置：[https://github.com/remy/nodemon#nodemon](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fremy%2Fnodemon%23nodemon)

五、使用ES Lint做代码风格扫描
------------------

ES Lint是一款代码风格扫描工具，尤其是在团队开发时可以帮助我们规范我们的代码风格，并提供与IDE的集成做到代码纠错。

*   安装eslint `npm i -D eslint`
*   参考文档：[https://eslint.org/docs/user-guide/getting-started](https://links.jianshu.com/go?to=https%3A%2F%2Feslint.org%2Fdocs%2Fuser-guide%2Fgetting-started)

六、在代码提交时触发指定操作
--------------

常常有这样的场景，持续集成要求我们在提交代码之前测试在本地是可以通过的。这个时候我们可以在注册“钩子”的方式，在代码提交之前在本地运行测试，如果测试不通过则不允许提交。那么使用`husky`可以这一需求：

*   husky文档：[https://github.com/typicode/husky#readme](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ftypicode%2Fhusky%23readme)

### 例子1： 在git push 之前运行测试

"husky": {
    "hooks": {
      "pre-push": "npm run coverage && npm run pact:test"
    }
  },

### 例子2： 在git commit 之前运行代码风格检查和自动纠正

"husky": {
    "hooks": {
      "pre-commit": "npm lint"
    }
  },

 

七、开启Gzip压缩提高服务响应速度
------------------

开启gzip压缩可以显著提高HTTP的服务的访问速度，安装`compression`中间件可以非常方便地启用：

import compression from 'compression';
...
app.use(compression());