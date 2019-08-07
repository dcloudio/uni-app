通过在`package.json`文件中增加`uni-app`扩展节点，可实现自定义条件编译平台（如钉钉小程序、微信服务号等平台）。

package.json扩展配置用法：

```json
{
    /**
     package.json其它原有配置 
     */
    "uni-app": {// 扩展配置
        "scripts": {
            "custom-platform": { //自定义编译平台配置，可通过cli方式调用
                "env": {//环境变量
                    "UNI_PLATFORM": ""  //基准平台 
                 },
                "define": { //自定义条件编译
                    "CUSTOM-CONST": true //自定义常量，建议为大写
                }
            }
        }    
    }
}


```

Tips：

- `UNI_PLATFORM`仅支持填写`uni-app`默认支持的基准平台，目前仅限如下枚举值：`app-plus`、`h5`、`mp-weixin`、`mp-alipay`、`mp-baidu`、`mp-toutiao`、`mp-qq`
- 目前仅`vue-cli`版本支持package.json扩展配置，HBuilderX将于下版支持

#### 示例：钉钉小程序

如下是一个自定义钉钉小程序（MP-DINGTALK）的package.json示例配置（拷贝代码记得去掉注释）：
```json
"uni-app": {
	"scripts": {
		"mp-dingtalk": { //自定义编译平台配置，可通过cli方式调用
			"env": { //环境变量
				"UNI_PLATFORM": "mp-alipay" //基准平台 
			},
			"define": { //自定义条件编译
				"MP-DINGTALK": true //自定义常量，建议为大写
			}
		}
	}
}
```

**在代码中使用自定义平台**

开发者可在代码中使用`MP-DINGTALK`进行条件编译，如下：
```javascript
// #ifdef MP-DINGTALK
钉钉平台特有代码
// #endif
```

**运行及发布项目**

开发者可通过如下命令，启动钉钉小程序平台的编译：
```
npm run dev:custom mp-dingtalk 
npm run build:custom mp-dingtalk
```

Tips：钉钉小程序编译目录依然是`mp-alipay`，需通过支付宝开发者工具，选择“钉钉小程序”，然后打开该目录进行预览及发布。

#### 示例：微信服务号

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
