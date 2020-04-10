vue.config.js 是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被自动加载，一般用于配置 webpack 等编译选项，具体规范参考：[vue.config.js](https://cli.vuejs.org/zh/config/#vue-config-js)

**支持情况**
* CLI 工程 
* HBuilderX 2.1.5 及以上版本

**注意事项**

仅vue页面生效

部分配置项会被编译配置覆盖，例如：

* publicPath  不支持，如果需要配置，请在 manifest.json->h5->router->base 中配置，参考文档：[h5-router](collocation/manifest?id=h5-router)
* outputDir  不支持
* assetsDir 固定 static
* pages  不支持
* runtimeCompiler 固定 false
* productionSourceMap 固定 false
* css.extract  H5 平台固定 false，其他平台固定 true
* parallel 固定 false
* 使用cli项目时，默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在transpileDependencies中列出来。[详情参考](https://cli.vuejs.org/zh/config/#transpiledependencies)

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

**发布时删除console**

`HBuilderX 2.6.8+`支持

```js
module.exports = {
	chainWebpack: (config) => {
		// 发行或运行时启用了压缩时会生效
		config.optimization.minimizer('terser').tap((args) => {
			const compress = args[0].terserOptions
			// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
			compress.drop_console = true
			compress.pure_funcs = [
				'__f__', // App 平台 vue 移除日志代码
				// 'console.debug' // 可移除指定的 console 方法
			]
			return args
		})
	}
}
```
