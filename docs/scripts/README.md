# 辅助脚本
## init-search.js
用于初始化 index.html 中 search->paths 的值，以达到首次访问即可搜索全部的文档内容，否则只能搜索访问过的内容。
## sercice.js
## 启动一个本地的服务，便于预览文档,而且提供 LiveReload 功能，可以让实时的预览。
```
$ npm run serve
```
便于爬虫
```
$ npm run dev
```
启动线上服务（依赖pm2）。
```
$ npm start
```
启动服务后，直接访问 [http://localhost:3000](http://localhost:3000) 即可。

## preview.js
老的本地预览方案，不走 SSR。
```
$ node preview.js
```

## version.js
每次更新文档时，更新 index.html 中部分资源的后缀。