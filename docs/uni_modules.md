# uni_modules

### 什么是 uni_modules
### 目录结构
### 配置
#### package.json

package.json在每个uni_modules插件中都必须存在，包含了插件的基本信息。以下是package.json的详细配置说明（拷贝代码记得去掉注释！）
```json
// 注意，不能直接拷贝本段代码到编辑器中，package.json目前不支持注释。本段代码加的注释只是用于解释代码。
{
    "id": "作者ID-插件英文名称", // 必填，插件ID，格式为：'作者ID-插件英文名称'，例如：'xx-yy'，其中作者ID和插件名称只能包含英文、数字，作者ID不能使用'DCloud'、'uni'等关键字
    "displayName": "插件显示名称", // 必填，用于展示在插件市场的显示名称
    "version": "1.0.0", // 必填，插件版本
    "description": "插件描述", // 必填，插件描述
    "keywords": [], // 必填，插件标签关键词，最多5个
    "repository": "github:user/repo", // 仓库地址
    "engines": { // HBuilderX/cli 最低兼容版本
        "HBuilderX": "^2.7.0"
    },
    "dcloudext": { // DCloud插件市场配置
      "category": ["前端组件", "通用组件"], // 必填， 插件市场分类
      "screenshots": [], // 插件截图说明，仅支持插件内相对路径
      "sale": { // 销售
          "regular": { // 普通授权版价格，单位为元，如果为免费插件，设置普通授权版价格为 0 即可。
              "price": 0.00
          },
          "sourcecode": { // 源码授权版价格，单位为元
              "price": 0.00
          }
      },
      "contact": { // 插件作者 QQ，方便管理员审核时与作者快速沟通。
          "qq": ""
      },
      "declaration": { // 隐私、权限及商业化声明
          "ads": "", //  必填，本插件是否包含广告，如包含需详细说明广告表达方式、展示频率，请如实填写，如不包含，可填“无”
          "data": "", // 必填，本插件采集的数据、发送的服务器地址、以及数据用途说明，请如实填写，如不采集任何数据，可填写“插件不采集任何数据”，如果使用的三方SDK需要采集数据，可填写“插件使用的 XX SDK会采集数据，详情可参考：https://other-sdk.com/"
          "permissions": "" // 必填，本插件需要申请的系统权限列表，请如实填写，如不需要任何权限，可填“无”
      },
      "npmurl":"" // npm 地址
    },
    "_dp_nativeplugin": { // 原生插件相关配置
      "android": {},
      "ios": {}
    },
    "uni_modules": { // uni_modules配置
        "dependencies": [], // 依赖的 uni_modules 插件ID列表
        "encrypt": [ // 配置云函数，公共模块，clientDB Action加密
            "uniCloud/cloudfunctions/uni-admin/controller/permission.js"
        ],
        "platforms": { // 平台兼容性：y 表示 Yes，支持；n 表示 No，不支持；u 表示 Unknown，不确定；默认为 u
            "cloud": { // 云端平台兼容性
                "tcb": "y",
                "aliyun": "y"
            },
            "frontend": { // 前端平台兼容性
                "App": {
                    "app-vue": "y",
                    "app-nvue": "n"
                },
                "H5-mobile": {
                    "Safari": { // 当需要指定最小版本才支持时，可以配置minVersion
                        "minVersion": "14.0.2"
                    },
                    "Android Browser": "y",
                    "微信浏览器(Android)": "u",
                    "QQ浏览器(Android)": "u"
                },
                "H5-pc": {
                    "Chrome": "y",
                    "IE": "u",
                    "Edge": "u",
                    "Firefox": "u",
                    "Safari": "u"
                },
                "小程序": {
                    "微信": "y",
                    "阿里": "y",
                    "百度": "y",
                    "字节跳动": "y",
                    "QQ": "y"
                },
                "快应用": {
                    "华为": "u",
                    "联盟": "u"
                }
            }
        }
    }
}
```

### 使用 uni_modules
### 开发 uni_modules