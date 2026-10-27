# 为什么使用uni-config-center

实际开发中很多插件需要配置文件才可以正常运行，如果每个插件都单独进行配置的话就会产生下面这样的目录结构

```bash
cloudfunctions
└─────common 公共模块
        ├─plugin-a // 插件A对应的目录
        │  ├─index.js
        │  ├─config.json // plugin-a对应的配置文件
        │  └─other-file.cert  // plugin-a依赖的其他文件
        └─plugin-b // plugin-b对应的目录
           ├─index.js
           └─config.json // plugin-b对应的配置文件
```

假设插件作者要发布一个项目模板，里面使用了很多需要配置的插件，无论是作者发布还是用户使用都是一个大麻烦。

uni-config-center就是用了统一管理这些配置文件的，使用uni-config-center后的目录结构如下

```bash
cloudfunctions
└─────common 公共模块
        ├─plugin-a // 插件A对应的目录
        │  └─index.js
        ├─plugin-b // plugin-b对应的目录
        │  └─index.js
        └─uni-config-center
           ├─index.js // config-center入口文件
           ├─plugin-a
           │  ├─config.json  // plugin-a对应的配置文件
           │  └─other-file.cert  // plugin-a依赖的其他文件
           └─plugin-b
              └─config.json  // plugin-b对应的配置文件
```

使用uni-config-center后的优势

- 配置文件统一管理，分离插件主体和配置信息，更新插件更方便
- 支持对config.json设置schema，插件使用者在HBuilderX内编写config.json文件时会有更好的提示（后续HBuilderX会提供支持）

# 用法

在要使用uni-config-center的公共模块或云函数内引入uni-config-center依赖，请参考：[使用公共模块](https://uniapp.dcloud.net.cn/uniCloud/cf-common)

```js
const createConfig = require('uni-config-center')

const uniIdConfig = createConfig({
    pluginId: 'uni-id', // 插件id
    defaultConfig: { // 默认配置
        tokenExpiresIn: 7200,
        tokenExpiresThreshold: 600,
    },
    customMerge: function(defaultConfig, userConfig) { // 自定义默认配置和用户配置的合并规则，不设置的情况侠会对默认配置和用户配置进行深度合并
        // defaudltConfig 默认配置
        // userConfig 用户配置
        return Object.assign(defaultConfig, userConfig)
    }
})


// 以如下配置为例
// {
//   "tokenExpiresIn": 7200,
//   "passwordErrorLimit": 6,
//   "bindTokenToDevice": false,
//   "passwordErrorRetryTime": 3600,
//   "app-plus": {
//     "tokenExpiresIn": 2592000
//   },
//   "service": {
//     "sms": {
//       "codeExpiresIn": 300
//     }
//   }
// }

// 获取配置
uniIdConfig.config() // 获取全部配置，注意：uni-config-center内不存在对应插件目录时会返回空对象
uniIdConfig.config('tokenExpiresIn') // 指定键值获取配置，返回：7200
uniIdConfig.config('service.sms.codeExpiresIn') // 指定键值获取配置，返回：300
uniIdConfig.config('tokenExpiresThreshold', 600) // 指定键值获取配置，如果不存在则取传入的默认值，返回：600

// 获取文件绝对路径
uniIdConfig.resolve('custom-token.js') // 获取uni-config-center/uni-id/custom-token.js文件的路径

// 引用文件（require）
uniIDConfig.requireFile('custom-token.js') // 使用require方式引用uni-config-center/uni-id/custom-token.js文件。文件不存在时返回undefined，文件内有其他错误导致require失败时会抛出错误。

// 判断是否包含某文件
uniIDConfig.hasFile('custom-token.js') // 配置目录是否包含某文件，true: 文件存在，false: 文件不存在
```