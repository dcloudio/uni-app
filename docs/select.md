#### uni-app选型评估23问

如果你关心竞品对比，这里有几份详尽对比：
1. 多端开发框架对比横评，参考：[https://juejin.im/post/5e8e8d5a6fb9a03c6d3d9f42](https://juejin.im/post/5e8e8d5a6fb9a03c6d3d9f42)
2. 只做App，flutter、react native等App跨平台框架对比，参考：[https://ask.dcloud.net.cn/article/36083](https://ask.dcloud.net.cn/article/36083)
3. 只做小程序，原生wxml开发、wepy、mpvue、taro的对比，[https://ask.dcloud.net.cn/article/35867](https://ask.dcloud.net.cn/article/35867)
4. uni-app和微信原生开发的详细比较评测，参考：[https://ask.dcloud.net.cn/article/36484](https://ask.dcloud.net.cn/article/36484)

**uni-app收费吗？**

```uni-app``` 是免费并且属于Apache2.0开源协议的产品。DCloud官方承诺永远不会变更开源协议。无论HBuilderX、uni-app、App，面向中国人永久免费。大家可以放心使用。

DCloud的盈利方式在帮助开发者进行推广和流量变现上，而不在开发工具收费上。

**跨端会造成功能受限制吗？**

```uni-app```在跨平台的过程中，不牺牲平台特色，不限制平台的能力使用。

应用开发中，90%的常规开发，比如界面组件、联网等api，```uni-app```封装为可跨多端的API。

各个端的特色功能，```uni-app```引入[条件编译](http://uniapp.dcloud.io/platform)。可以优雅的在一个项目里调用不同平台的特色能力。比如push，微信小程序里不支持，但可以在App里使用，还有很多原生sdk，在App时难免涉及，这些都可以正常的在```uni-app```框架下使用。

下图是```uni-app```产品功能框架图，```uni-app```在保持uni规范跨平台的前提下，还可实现每个平台特有的平台能力(如微信小程序平台，可继续调用微信卡劵等微信特有业务API)。

![](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni1222.png)

在做小程序时，小程序所有的api都可以使用；而输出到App时，原生渲染引擎、原生sdk集成和混写都支持，使得原生的所有api都可以使用。

同时注意，条件编译不同于代码里if逻辑判断。条件编译块里的代码或指定的文件，只有在特定平台才会被编译进去，不会把不能用的其他平台代码混在一个包里。如果大量使用if判断，会增大体积和影响性能，而条件编译则没有这些问题，减少包体积，减少互相的干扰。

**uni-app的手机端用户体验如何？**

使用```uni-app```开发的微信小程序，因为智能的处理的数据的diff，比大多人手写的原生小程序的性能还好。详细数据评测参考：[https://juejin.im/post/5ca1736af265da30ae314248](https://juejin.im/post/5ca1736af265da30ae314248)

```uni-app```打包成App后，支持webview渲染和weex原生渲染这2种引擎，可以任由开发者切换使用。

- webview渲染方式，架构和微信小程序一样。微信小程序的Hybrid应用框架是业内体验上的标杆，实践证明这种体验足以承载一线互联网开发商获得上亿用户。uni-app的App端体验同微信小程序，超过其他平台的小程序，超过一般的hybrid框架。
- 原生渲染方式，是DCloud改造了weex引擎，在weex上实现了uni-app的组件和API。达到更优秀的用户体验。

由于有丰富的插件市场，以及支持所有小程序SDK在App端的使用，使得```uni-app```拥有更庞大的应用生态。

**只开发小程序，需要uni-app吗？**

是的，单独开发小程序，也应该使用uni-app。它比其他小程序框架或原生小程序开发更有优势。原因如下：
1. uni-app无需追随微信升级，可不受限在条件编译里使用wx的现在或未来的所有api
2. uni-app的性能比一般人手写的微信原生代码性能更高。就像vue操作比一般人写js操作dom性能更高一样。底层自动diff差量更新数据，比手动setData性能更高。评测数据见下文
3. uni-app是纯vue语法，不必另学一种dsl。开发不同项目时，思维不用切换
4. uni-app的组件、模板非常丰富，插件市场数千款插件。如富文本解析、图表等组件，uni-app版插件性能均超过了wxparse、wx-echart等微信小程序组件
5. HBuilderX比微信工具更强大，开发效率更高。哪怕使用vscode等工具，由于这些工具对vue的支持强于对wxml的支持，所以开发效果也会更高
6. 微信原生开发对webpack、预编译语言、工程流程管理很多功能都不支持，大公司很少用微信原生开发，都是在用框架来提升开发效率
7. uni-app支持双向数据绑定、vuex状态管理，比小程序原生开发方便的多
8. 迟早会有多端需求，使用`uni-app`再无后续顾虑
9. uni-app并非仅用于做跨端的，只用uni-app做小程序、只做H5、只做App的，案例是一样多的，详见：https://uniapp.dcloud.io/case
关于uni-app和微信开发的详细比较评测，参考：https://ask.dcloud.net.cn/article/36484

- 评测1、uni-app和原生wxml开发、wepy、mpvue、taro的对比，[https://ask.dcloud.net.cn/article/35867](https://ask.dcloud.net.cn/article/35867)
- 评测2、uni-app和微信原生开发的详细比较评测，参考：[https://ask.dcloud.net.cn/article/36484](https://ask.dcloud.net.cn/article/36484)

**只开发App，需要uni-app吗？**

```uni-app```是更好的跨平台开发框架，开发一次iOS、Android都有了。体验好、开发效率高。

<!-- ```uni-app```在App侧可以使用小程序引擎或weex引擎渲染，性能体验高于其他Hybrid框架。 -->

```uni-app```在App端，基于能力层/渲染层分离的架构设计（见下图），渲染层是webview和weex二选一，能力调用都是共同的plus api，比如蓝牙、扫码等能力；也就是weex被内置到```uni-app```中，并且被强化了。

![](https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/frame_app.png)

过去weex有个很大的问题是api太少，开发时必须iOS、Android原生和前端3拨团队协作开发，实际上react native也如此，因为他们的核心只是高性能渲染器。

plus api的结合解决了这个问题，大多数App的开发不再需要原生介入了，从而把跨平台开发省成本这个核心目的落地了。

```uni-app```在App侧可以使用丰富的小程序sdk，如网易云信、环信、七牛等众多sdk厂商均原厂维护其小程序sdk版本，而这些sdk均可直接用于uni-app并发布为iOS、Android的App。

```uni-app```的插件市场里有非常多的ui库、组件、模板，可以大幅提升开发效率。

相比纯原生开发，```uni-app```体验可商用，也不会限制功能调用，但开发效率和开发成本更优于原生开发。

如果你已经有了原生App，那么可以局部使用```uni-app```，内嵌SDK，让工程逐步跨平台化。

**uni-app是多端写在一个项目统一升级维护，还是每个端不同的项目，只复用部分代码**

```uni-app```是多端写在一个基础项目下，差异使用条件编译来管理。

这有个巨大的好处是一套工程代码，升级时可多端同时更新。

如果把不同端的项目分开，那么维护升级时非常麻烦，无法方便同步升级。

所以```uni-app```开发微信小程序时，不止编码，包括域名校验等配置均在HBuilderX里完成，不需要在微信开发者工具里二次调整。


**uni-app 学习成本高吗？基于什么技术栈？**

```uni-app```简单来说是 vue的语法 + 小程序的api。

它遵循```Vue.js```语法规范，组件和API遵循```微信小程序命名```，这些都属于通用技术栈，学习它们是前端必备技能，```uni-app```没有太多额外学习成本。

有一定 Vue.js 和微信小程序开发经验的开发者可快速上手 ```uni-app``` 。

没学过vue的同学，也不用掌握vue的全部，只需了解vue基础语法、虚拟dom、数据绑定、组件、vuex，其他如路由、loader 不用学，cli、node.js、webpack也不需要学。

官方有入门培训视频，且还有众多培训渠道加入```uni-app```生态，可参考[培训教程资源汇总](http://uniapp.dcloud.io/resource)。

**uni-app 开发体验如何？支持现代前端开发流程吗？**

```uni-app``` 积极拥抱社区现有的现代开发流程，包括但不限于：

- 内置了webpack
- NPM 包管理系统，详见[参考](http://uniapp.dcloud.io/frame?id=npm%E6%94%AF%E6%8C%81)
- es6+ 语法（发布时会自动编译为es5），详见[参考](http://uniapp.dcloud.io/frame?id=es6-%E6%94%AF%E6%8C%81)
- 各种预处理器（less、scss、stylus、typescript）
- uni-app的官方ide：HBuilderX，在vue、json、markdown、代码提示、操作效率上，有非常明显的优势，可帮助开发者大幅提高工作效率
- uni-app同时也提供了cli方式，可使用其他开发工具如vscode开发，当然开发效率不如HBuilderX。对比详见[https://ask.dcloud.net.cn/article/35451](https://ask.dcloud.net.cn/article/35451)


**uni-app 生态开放性如何？能否直接利用现有前端社区资源？**

```uni-app``` 提供了开放性的生态：

- 丰富的插件市场为开发者提供数千款现成的轮子，[https://ext.dcloud.net.cn](https://ext.dcloud.net.cn)
- 兼容微信小程序 JS SDK，丰富的小程序生态内容可直接引入uni-app，并且在App侧通用，[参考](http://ask.dcloud.net.cn/article/35070)
- 兼容微信小程序自定义组件，并且App侧通用，[参考](http://uniapp.dcloud.io/frame?id=小程序组件支持)
- 支持 NPM 包管理系统，[参考](http://uniapp.dcloud.io/frame?id=npm%E6%94%AF%E6%8C%81)
- 支持 mpvue 项目及组件，[参考](http://ask.dcloud.net.cn/article/34945)
- 支持原生插件，见插件市场：[https://ext.dcloud.net.cn](https://ext.dcloud.net.cn)
- 支持App原生工程里嵌入uni-app的sdk。

需要注意的是，```uni-app``` 采用```Vue.js```方案，限制了dom操作，因此所有基于dom的前端库都无法直接使用；所幸的是目前基于微信小程序的库已经非常多了，这个生态也很完善，所有微信小程序的库在```uni-app``` 里都能用，不止是在微信里能用，在App下也能用。

**uni-app 支持的手机版本最低到多少？**

Android4.4、iOS9是官方会保障兼容的。
要知道Android4.4已经是2013年发布的手机了，正常用户不会还在用这么久远的手机。

**uni-app成熟度高吗？**

```uni-app```是目前最成熟的多端开发框架，已迭代几十个版本，拥有几十个开发者交流群，几十万应用案例。

阿里小程序IDE官方内嵌`uni-app`，uni-app没有让阿里巴巴失望，也不会让你失望。详见：[https://ask.dcloud.net.cn/article/36485](https://ask.dcloud.net.cn/article/36485)

**uni-app的社区活跃吗？**

加入```uni-app```的群就知道，几十个QQ/微信群每天数万条聊天记录，非常活跃。论坛里每天数百个帖子。

插件市场内容也非常丰富，各种轮子方便可用。[https://ext.dcloud.net.cn/](https://ext.dcloud.net.cn/)，并且很多轮子的uni-app版，性能功能都强于微信小程序版。

基于```uni-app```的三方培训也很多。腾讯课堂官方亲自为uni-app制作了课程。


**uni-app 有哪些已上线的成功案例？**

开发者分享的案例参考[uni-app 应用案例](http://uniapp.dcloud.io/case)

**DCloud是家什么公司，是否可信赖**

```DCloud```从2013年开始做HBuilder，目前380万前端开发者在使用```DCloud```的开发工具，HBuilder百度指数与sublime、webstorm等全球知名工具相同。是中国唯一一家成功的开发工具厂商。

```DCloud```是明星创业公司，融资已经过了B2轮，且均为知名VC或战略投资人。

```DCloud```是HTML5中国产业联盟的发起单位和秘书单位。该联盟隶属于工信部信通院标准所。

```DCloud```产品中使用的HTML5Plus规范，为联盟的标准规范而非私有api。

```DCloud```的产品技术一直引领业内，2015年就上线业内第一个"小程序"：DCloud流应用。随后DCloud广泛推动业内各大公司上线"小程序"，普及该技术广泛应用。

数年来只有其他公司侵权DCloud，这些作恶公司已被法院判决给DCloud赔款道歉，DCloud从未有劣迹，诚信立足于行业。

阿里小程序IDE官方内嵌`uni-app`，uni-app没有让阿里巴巴失望，也不会让你失望。详见：[https://ask.dcloud.net.cn/article/36485](https://ask.dcloud.net.cn/article/36485)

**App打包必须上传DCloud云端吗？代码会泄露吗？**

代码可以云打包，也可以离线打包。

即使使用云打包，DCloud也不会保留开发者的代码，云端打包完成后程序不会持久化存储相关文件，DCloud不愿也不敢沾惹这方面的麻烦。

之所以提供云打包，是方便不熟悉原生的前端工程师直接生成App安装包。包括让没有mac电脑的工程师也可以打出iOS的包。

**DCloud提供哪些技术支持？碰到框架bug影响业务怎么办？**

```uni-app``` 是DCloud全力打造的重点产品，不是非专业公司的KPI项目。不会因为某些负责人的流动导致框架烂尾。
```uni-app``` 的github上的dev分支是日更的，可随时修复bug。并且作为开源产品，开发者也可以修改源码。
```uni-app``` 的app引擎，支持原生扩展，只要你会原生扩展，就不怕app引擎有限制，大不了自己补一个原生插件进去。
```uni-app``` 开发小程序，无需依赖微信等平台升级。它们升级后，uni-app是可以直接使用的，不需要等待uni-app升级才能使用微信的新功能。

开发者碰到问题，可以通过如下途径进行反馈交流：
- ask社区：[https://ask.dcloud.net.cn/explore/category-12](https://ask.dcloud.net.cn/explore/category-12)
- QQ群：参考官网左侧导航显示的QQ群列表

另外，如果您确实需要商业化的保障才安心，也可以申请付费技术支持。[参考](https://ask.dcloud.net.cn/article/13015)

**大型互联网公司发布的开源框架，是不是更有影响力？**

大型互联网公司在自用某个项目时，解决了某个问题，把它摘出来开源，这个是众多大公司开源项目的来源和初衷。

而之所以把内部自用的框架开源出来，基本是为了在技术圈塑造形象和威望。对团队而言，有助于招聘；对负责人个人而言，有助于晋升和提升名气。

这类开源项目被戏称为KPI项目，往往逃不开4个魔咒：
1. 很多项目开源后一旦取得成绩，负责人就升职调岗，或者因为其他原因最初立项负责人离职，于是之前的开源项目就慢慢变凉。
2. 其设计初衷是为公司内部使用的，不是站在广泛的开发者需求角度设计的，其他开发者使用时会遇到各种问题。
3. 大型互联网公司的主业都是toC的，而不是to开发者。投很多资源持续维护这些开源项目并不是其公司目标，也不会有回报。
4. 优秀的程序员和优秀的开发框架设计者是2个层面的问题，不是说某些互联网大厂的前端技术人员水平不足，而是他们缺少面向开发者设计产品的经验，这种经验需要长期为开发者提供服务的团队才能具备。经验不足者设计的产品不会好用。

而```DCloud```这家公司就是为开发者而生的，优秀的人才和资源全部是为开发者服务的，产品立项之初广泛调研不同开发者的需求，产品发布后持续迭代，让开发者们使用的更便利。
