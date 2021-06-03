# uni_modules

### 什么是 uni_modules
`uni_modules`是uni-app的插件模块化规范（HBuilderX 3.1.0+支持），通常是对一组js sdk、组件、页面、uniCloud云函数、公共模块等的封装，用于嵌入到uni-app项目中使用，也支持直接封装为项目模板。

插件开发者，可以像开发uni-app项目一样编写一个`uni_modules`插件，并在HBuilderX中直接上传至[插件市场](https://ext.dcloud.net.cn/)。

插件使用者，可以在[插件市场](https://ext.dcloud.net.cn/)查找符合自己需求的`uni_modules`插件，使用HBuilderX 3.1.0+直接导入到自己的uni-app项目中。后续还可以在HBuilderX中直接点右键升级插件。

相对于普通的插件，`uni_modules`插件拥有更强的独立性，拥有独立的目录结构，可以更加方便的发布，更新，卸载（HBuilderX 3.1.0+对`uni_modules`插件提供了右键菜单，支持发布，更新，安装依赖等）

相对于node_modules（node.js模块），`uni_modules`的三方依赖安装时默认最新版本，插件均直接安装在`uni_modules`目录下，不做嵌套，当然，如果开发者希望固定某个版本的依赖，可以将该三方依赖包含到自己的插件包内。

为什么有了`node_modules`，还需要再发明一个`uni_modules`的轮子？
1. `node_modules` 不满足云端一体的需求。uniCloud的云函数、公共模块、schema和前端的各种js_sdk、组件、页面、项目，无法在`node_modules`模式下有效融合。
2. `uni_modules`有付费和商业的插件，DCloud插件市场提供了版权保护。而`node_modules`不支持付费和版权保护。
3. `node_modules` 是开发者友好而影响终端用户性能的模式。开发者为了省事，层层嵌套`node_modules`，造成数量惊人的文件数目。`uni_modules`不支持module嵌套，鼓励开发者优化包体积
4. `uni_modules`鼓励开发者总是使用最新版。并在HBuilderX中提供了版本内容对比工具
5. `uni_modules`里也支持放置`node_modules`，没有强行排斥。

与之前插件市场的普通插件相比，`uni_modules`有何优势？
1. 支持在HBuilderX里直接发布、更新、删除
2. 支持依赖（在package.json中配置）
3. 插件文件位置统一，不会造成下载一个插件，不知道给工程下多少个目录写入了多少个文件。删除插件时也可以一点删除

### 目录结构
`uni_modules`插件如果是项目类型的插件，只需要在项目的根目录下放一个符合`uni_modules`规范的package.json。

如果是非项目类型的插件，比如组件、js sdk、页面模板、云函数，则需要放置在项目的`uni_modules`目录下。

此时`uni_modules`目录下的目录结构和uni-app的项目结构是一致的，如下：

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
uni_modules                                项目根目录下
└── [plugin_id] // 插件 ID
    ├── uniCloud                           插件内的uniCloud内容会被虚拟合并到项目根目录的uniCloud中（注意：插件内的uniCloud目录，没有-aliyun,-tcb后缀）
    ├── components                         符合vue组件规范的uni-app组件目录，支持easycom规范
    ├── hybrid                             存放本地网页的目录，<a href="/component/web-view">详见</a>
    ├── pages                              业务页面文件存放的目录 
    ├── static                             存放应用引用静态资源（如图片、视频等）的目录，<b>注意：</b>静态资源只能存放于此
    └── wxcomponents                       存放小程序组件的目录，<a href="/frame?id=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6%E6%94%AF%E6%8C%81">详见</a>
    ├── license.md                         插件使用协议说明
    ├── package.json                       插件配置，必选(除此之外均`可选`)                          
    ├── readme.md                          插件文档
    ├── changelog.md                       插件更新日志
    ├── menu.json                          如果是uniCloud admin插件，可以通过menu.json注册动态菜单，<a href="/uniCloud/admin?id=admin-%e6%8f%92%e4%bb%b6%e5%bc%80%e5%8f%91">详见 menu.json 配置</a>
	</code>
</pre>
**Tips**
- 插件目录不支持pages.json、App.vue、main.js、manifest.json、uni.scss文件，如果需要插件使用者修改这些文件内容，请在插件文档(readme.md)中详细说明。
- 在插件内部引用资源、跳转页面时，请尽量使用相对路径。
- 插件内components目录同样支持easycom规范，插件使用者可以直接在项目中使用插件内符合easycom规范的组件，当项目或插件内存在easycom组件冲突，编译时会给予提示，您可以通过修改组件目录及组件文件名称来解决冲突问题。

### 配置
#### package.json

package.json在每个`uni_modules`插件中都必须存在，包含了插件的基本信息。以下是package.json的详细配置说明
```json
{
    // 注意，不能直接拷贝本段代码到编辑器中，package.json 目前不支持注释。本段代码加的注释只是用于解释代码。
    "id": "作者ID-插件英文名称", // 必填，插件ID，格式为：'作者ID-插件英文名称'，例如：'xx-yy'，其中作者ID和插件名称只能包含英文、数字，作者ID不能使用'DCloud'、'uni'等关键字
    "displayName": "插件显示名称", // 必填，用于展示在插件市场的显示名称
    "version": "1.0.0", // 必填，插件版本
    "description": "插件描述", // 必填，插件描述
    "keywords": [], // 必填，插件标签关键词，最多5个
    "repository": "github:user/repo", // 仓库地址
    "engines": { // HBuilderX/cli 最低兼容版本
        "HBuilderX": "^3.1.0"
    },
    "dcloudext": { // DCloud插件市场配置
      "category": ["前端组件", "通用组件"], // 必填， 插件市场分类
      "sale": { // 销售 （目前仅限uniCloud类插件）
          "regular": { // 普通授权版价格，单位为元，如果为免费插件，设置普通授权版价格为 0 即可。
              "price": "0.00"
          },
          "sourcecode": { // 源码授权版价格，单位为元
              "price": "0.00"
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
            "client": { // 前端平台兼容性
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
**Tips**
- 上述配置基于npm [package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)规范扩展，故标准的package.json属性也同样支持，比如可以通过files来控制要上传的插件包内容

#### uni_modules.config.json
`uni_modules.config.json`在项目根目录，可以配置插件更新后的触发脚本（通常用于执行自定义的自动化任务），插件uniCloud支持的服务空间。以下是`uni_modules.config.json`的详细配置说明
```json
{
	"scripts": {
		"postupdate": "node scripts/upgrade.js", // 更新插件后执行该脚本，可从process.env.UNI_MODULES_ID获取当前被更新的插件ID，如果存在多个，以,隔开
		"preupload": "node scripts/preupload.js", // 上传插件之前执行该脚本，可从process.env.UNI_MODULES_ID获取当前被更新的插件ID，如果存在多个，以,隔开
		"postupload": "node scripts/postupload.js" // 上传插件之后(无论上传成功还是失败)执行该脚本，可从process.env.UNI_MODULES_ID获取当前被更新的插件ID，如果存在多个，以,隔开
	},
	"uni_modules": {
		"uni-id": { // 插件ID
			"uniCloud": ["aliyun", "tcb"] // 当项目同时存在aliyun，tcb时可手动指定该插件所属的服务空间
		}
	}
}
```

**Tips**
- 当项目内仅关联了一个服务空间，此时uni_modules插件内的uniCloud相关资源会自动归属至该服务空间，无需在uni_modules.config.json中配置uniCloud所属服务空间
- 当项目内关联了两个服务空间（阿里云和腾讯云同时存在）
  * 若未在uni_modules.config.json中配置平台，则上传该插件uniCloud资源时，会提示上传至选择哪个服务空间
  * 若已在uni_modules.config.json中配置平台，则上传时以配置为准，自动归属至指定的服务空间


### 开发 uni_modules 插件
#### 新建uni_modules目录
在uni-app项目根目录下，创建uni_modules目录，在HBuilderX中可以项目右键菜单中点击`新建uni_modules目录`

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/de27eb20-6217-11eb-8a36-ebb87efcf8c0.png)

**Tips:**
- 如果是vue-cli项目，uni_modules目录，位于`src`下，即`src/uni_modules`

#### 新建uni_modules插件
1. 在HBuilderX中uni_modules目录右键点击`新建uni_modules插件`

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/dd758b10-6217-11eb-8a36-ebb87efcf8c0.png)

2. 填写正确的插件ID，选择插件分类

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/dcc6d480-6217-11eb-8a36-ebb87efcf8c0.png)

插件ID命名规范：
- 格式为：'作者ID-插件英文名称'，示例：'xx-yy'，其中作者ID和插件英文名称只能包含英文、数字
- 作者ID由插件作者自定义，不能使用'DCloud'、'uni'等关键字，长度要求至少2位字符
- 插件名称需直观表达插件的作用，例如：tag、button等

**Tips**
- `uni_modules`插件可以在package.json的`uni_modules->dependencies`节点配置三方依赖（依赖的插件也必须是`uni_modules`插件），如果是依赖了三方的npm插件，可以使用标准的dependencies节点配置。

#### 发布到插件市场
当您的插件开发完毕，可以直接发布到[插件市场](https://ext.dcloud.net.cn/)供其他人免费或付费使用，插件市场提供了变现、评价等机制，优秀的插件作者，可以做到月入好几万。

发布流程：

1. 在HBuilderX中插件目录右键点击`发布到插件市场`
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/5a4b97a0-6219-11eb-8ff1-d5dcf8779628.png)
2. 填写插件信息
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9cbc6970-6219-11eb-b997-9918a5dda011.png)
**Tips**
- 如果需要发布为项目模板，请在项目根目录创建package.json，然后右键菜单发布到插件市场。
- 发布插件时，可以选择上传当前项目作为示例工程，完整的示例工程，可以方便用户快速上手。
#### 修改插件基本信息
当您的插件发布到插件市场后，如果需要调整插件市场上的一些基本信息，比如插件中文名称，描述，关键词，readme.md等，可以直接在插件目录右键`修改插件基本信息`

1. 在HBuilderX中插件目录右键点击`修改插件基本信息`
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/451fb530-6225-11eb-918d-3d24828c498c.png)
2. 修改插件基本信息
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/345b6910-6225-11eb-8ff1-d5dcf8779628.png)

#### 发布新版本
当您的插件增加了新的功能或修复了Bug，需要发布新版本时，操作与第一次发布一样，可以直接在插件目录右键`发布到插件市场`

**Tips**
- 在发布窗口中填写的更新日志，会自动与根目录的changelog.md保持同步

### 使用 uni_modules 插件
#### 添加uni_modules插件
1. 在[插件市场](https://ext.dcloud.net.cn/)查找符合自己需求的uni_modules插件
2. 在插件详情页,右侧会标明该插件是否支持uni_modules，点击`使用 HBuilderX 导入插件`
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/3f6e2c00-622c-11eb-bdc1-8bd33eb6adaa.png)
3. 选择要导入的uni-app项目
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/eb6722a0-622c-11eb-a16f-5b3e54966275.png)

**Tips**
- uni_modules支持组件easycom，使用者可以直接使用插件内符合easycom规范的组件
- 其他资源，如图片，js等，在项目中可以直接按目录结构引入即可使用，如：
```js
import {test} from '@/uni_modules/xx-yy/js_sdk/test.js'
```
- 如果要使用uni_modules中的页面，您需要在自己项目根目录的pages.json中添加对应的页面配置
```json
{
  "pages":[{
    "path":"uni_modules/xx-yy/pages/demo/demo" // 按插件所在目录引入对应的页面
  }]
}
```

#### 安装uni_modules插件依赖
1. 导入插件时，HBuilderX会自动安装当前插件的所有三方依赖。
2. 您还可以在插件目录右键手动执行`安装插件三方依赖`
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/eef13280-62d6-11eb-918d-3d24828c498c.png)
#### 更新uni_modules插件
1. 可以通过插件目录右键`从插件市场更新`，来检查更新当前所使用的插件
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/ccb42320-622d-11eb-8ff1-d5dcf8779628.png)
2. 对比插件，确认更新内容
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9069d370-62d6-11eb-a16f-5b3e54966275.png)
#### 卸载uni_modules插件
uni_modules插件目录是独立存在的，如果您不再需要该插件，可以直接删除该插件目录。

**Tips**
- 导入uni_modules规范插件需要使用 3.1.0 以上版本的 HBuilderX

### 已有插件迁移为 uni_modules 插件指南

1. 将插件内容迁移至您的uni-app示例项目根目录`uni_modules`下以插件ID命名的目录下，举例，若您已有的插件ID为`xx-yy`，则目录结构为：`uni_modules/xx-yy`
2. 运行自己的示例项目，验证插件迁移目录后，所有功能是否正常
 - 目录迁移，通常会遇到资源引用路径问题，尽可能将所有路径引用修改为相对路径
 - 如果插件带有uniCloud的云函数或数据库，迁移时，注意，插件目录内的uniCloud不能带有厂商后缀，您可以在发布插件时，指定插件支持的云服务商
 - 插件目录不支持pages.json、App.vue、main.js、manifest.json、uni.scss文件，如果需要插件使用者修改这些文件内容，请在插件文档(readme.md)中详细说明。
3. 当迁移后的所有插件功能均正常时，您就可以向插件市场发布新的支持uni_modules的插件版本（插件市场会同时保留您最后一个非uni_modules插件版本）
 - 在插件根目录创建package.json，您可以先简单的仅填写一个插件ID即可，其他信息可以通过发布窗口填写（会自动同步回package.json）
```
{
  "id":"您的插件ID"
}
```
 - 插件文档，迁移至插件根目录的readme.md中
 - 右键package.json，点击`发布到插件市场`，选择分类，填写插件信息（尽可能与插件市场已有信息保持一致）
 - 发布成功后，您可以在插件市场的插件详情页右侧，查看到您的插件已同时提供了uni_modules版本和非uni_modules版本（仅保留最后一个非uni_modules版本）
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/47c2a2f0-62db-11eb-a16f-5b3e54966275.png)
