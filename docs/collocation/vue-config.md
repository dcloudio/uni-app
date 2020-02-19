vue.config.js 是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被自动加载，一般用于配置 webpack 等编译选项，具体规范参考：[vue.config.js](https://cli.vuejs.org/zh/config/#vue-config-js)

**支持情况**
* CLI 工程 
* HBuilderX 2.1.5 及以上版本

**注意事项**

部分配置项会被编译配置覆盖，例如：

* publicPath  不支持，如果需要配置，请在 manifest.json->h5->router->base 中配置，参考文档：[h5-router](collocation/manifest?id=h5-router)
* outputDir  不支持
* assetsDir 支持，默认值 static
* pages  不支持
* runtimeCompiler 支持，默认值 false
* productionSourceMap 支持，默认值 false
* css.extract  支持，H5 平台默认值 false，其他平台默认值 true
* parallel 支持，默认值 false

**使用示例**

**自定义静态资源目录**

```js
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([
				{
					from: path.join(__dirname, 'src/images'),
					to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'images')
				}
			])
		]
	}
}
```

**注入全局依赖**

```js
const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				'localStorage': ['mp-storage', 'localStorage'],
				'window.localStorage': ['mp-storage', 'localStorage']
			})
		]
	}
}
```

