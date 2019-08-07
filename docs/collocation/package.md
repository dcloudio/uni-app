package.json 是一个可选的配置文件，如果项目的根目录中存在这个文件，且根节点下含有`uni-app`节点，则支持自定义条件编译平台（如钉钉小程序、H5-weixin等）。

如下是一个自定义微信服务号平台（H5-WEIXIN）的示例配置：
 
```json
"uni-app": {
    "scripts": {
        "h5-weixin": { //自定义编译平台配置，可通过cli方式调用
            "env": {//环境变量
                "UNI_PLATFORM": "h5"  //基准平台 
             },
            "define": { //自定义条件编译
                "H5-WEIXIN": true //自定义常量，建议为大写
            }
        }
    }    
}
```

开发者可在代码块中使用`H5-WEIXIN`变量，如下：

```
// #ifdef H5-WEIXIN
微信服务号特有代码
// #endif
```

开发者可通过如下命令，启动微信服务号平台（H5-WEIXIN）平台的编译：
```
npm run dev:custom h5-weixin 
npm run build:custom h5-weixin
```

Tips：

- `UNI_PLATFORM`仅支持填写`uni-app`默认支持的基准平台，目前仅限如下枚举值：`app-plus`、`h5`、`mp-weixin`、`mp-alipay`、`mp-baidu`、`mp-toutiao`、`mp-qq`。
