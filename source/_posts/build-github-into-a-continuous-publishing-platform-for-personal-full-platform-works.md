---
title: 将Github打造成个人全平台作品的持续发布平台
url: 3559.html
id: 3559
categories:
  - 技术
abbrlink: 19303
date: 2019-12-25 18:47:51
tags: ''
---

> 文章推荐群体：前端Dev、桌面端Dev、DevOps与Github羊毛党

2016年6月，Github发布了GitHub Pages功能，它允许将静态网页文件存放在github仓库上，并将其发布成web网站。借助Hexo博客框架及其周边丰富、优美的博客主题，可以让程序员使用markdown语法搭建出精美、简洁的博客网站。随后，Github page还支持自定义域名、https... 无需服务器、免费https证书，无需操心运维，一时间，不少博客主纷纷放弃wordpress，转战Github Page。 私以为这可谓广大博客主们“薅github羊毛”的迈出的第一步。

> 为什么说“薅github羊毛”，是因为我发现越来越多的项目在极致地开发出github的潜能，比如将github gist作为前端应用的存储后端、homebrew还将github作为包发布和审核平台

Github Page已成历史，而今天我这里介绍的除了Github Page，还将介绍如何在Github上**持续发布**个人**全平台**应用作品。

*   其中，“持续发布”意味着我将介绍：
    *   如何实现作品的多平台自动打包
    *   如何实现自动发布到github release与github page
    *   如何自动生成Release Note
*   而“全平台”包括：
    *   Web端
    *   桌面端（Linux/Windows/Mac）
    *   Docker镜像

这意味你开发的个人作品将支持同时发布在以上各操作系统或运行平台上，想起来是不是有点些小激动呢？

Web端：发布到Github Page
-------------------

鉴于“怎么在Github上部署自己的网站？怎么绑定自定义域名”可以在Google上搜到成千上万条结果，本博客便不赘述相关细节。在这里主要介绍如何将Github Page的发布过程自动化。 在这之前，我们应该有这样一个基本的共识，Github Page只支持纯前端项目。所以我们这里不妨以`React.js`项目为例： `React.js` 采用如下脚本完成打包（包括JS/CSS构建、JS混淆minify、HTML模板渲染、manifest清单文件更新等）  

```json
"build": "react-scripts build",
```
  运行`yarn build`命令后，在build文件夹下将会生成上述构建产物，而使用nginx或者apache这样的HTTP服务器将该目录发布，就可以搭建一个静态网站。 通常情况下，我们常常将github repo的master分支根目录和docs目录作为github的发布目录。**实际上github还支持将“gh-pages”分支作为github page发布分支。** 这里推荐一个npm库`gh-pages`，它可以将指定目录文件发布到`gh-pages`分支的npm库，项目主页：[https://github.com/tschaub/gh-pages](https://github.com/tschaub/gh-pages) 使用`yarn install gh-pages` 后在`package.json`添加发布脚本

```json
"release:web": "gh-pages -d build",
```

运行 `yarn release:web`即可自动发布。

桌面端：基于Electron多平台Web APP
------------------------

[Electron](https://electronjs.org/)是由Github开发，同时包含Chromium和Node.js运行时环境的跨平台桌面应用平台。它可以打包生成运行在Windows、Mac、Linux等多种操作系统的安装包。常用的Virtual Studio Code、Slack APP就是基于Electron开发。

### 实现自动构建多平台版本

建议采用[electron-builder](https://www.electron.build/) npm库打包electron应用

yarn add -D electron-builder

打包脚本`electron-builder.yml`

```yaml
appId: cn.wangbaiyuan.magpie
files:
- build/**/*
- node_modules/**/*
productName: Magpie幸运抽奖
artifactName: '${name}-${version}-for-${os}-${arch}.${ext}'
icon: build/icon.png
nsis:
  runAfterFinish: false
  deleteAppDataOnUninstall: true
  allowToChangeInstallationDirectory: true
  oneClick: false
  installerLanguages: zh_CN
  language: '2052'
  perMachine: true
  createDesktopShortcut: true
win:
  target: nsis
mac:
  target: dmg
linux:
  target: deb
```

electron-builder可以帮助我们完成electron应用的安装包打包，文件名加版本号，以及混淆加密。

Docker
------

Dockerhub除了是一个公用的docker镜像仓库，同时帮助我们在无需CI/CD的情况下免费、自动地构建docker镜像，具体可以参考[https://baiyuan.wang/using-dockerhub-continually-build-container-mirroring.html](https://baiyuan.wang/using-dockerhub-continually-build-container-mirroring.html)

*   实现在Github Release时自动构建Docker镜像并推送到Dockerhub
*   根据Release版本号给镜像打版本标签、Latest标签

利用Release-it自动化发布过程
-------------------

[release-it](https://github.com/release-it/release-it) npm库可以实现发布的自动化，实现以下功能

*   自动升级package.json版本号
*   自动创建Github Release
*   上传产出物（Electron APP）
*   自动添加Release Note

```yaml
hooks:
  after:bump: yarn dist
  after:git:release: yarn release:web

git:
  tagName: v${version}
github:
  release: true
  assets:
  - dist/*-mac.zip
  - dist/*-win.exe
  - dist/*-linux.deb
```
 

开源项目
----

更多请参考示例作品：[https://github.com/geekeren/Magpie-LuckyDraw](https://github.com/geekeren/Magpie-LuckyDraw)