vue.config.js 是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被自动加载，具体规范参考：[vue-config.js](https://cli.vuejs.org/zh/config/#vue-config-js)

**支持情况**
* CLI 工程 
* HBuilderX 2.1.5 及以上版本

**注意事项**

部分配置项会被编译配置覆盖，例如：

* publicPath  不支持，如果需要配置，请在 manifest.json->h5->router->base 中配置，参考文档：[h5-router](collocation/manifest?id=h5-router)
* outputDir  不支持
* assetsDir 固定 static
* pages  不支持
* runtimeCompiler 固定 false
* productionSourceMap 固定 false
* css.extract  H5 平台固定 false，其他平台固定 true
* parallel 固定 false