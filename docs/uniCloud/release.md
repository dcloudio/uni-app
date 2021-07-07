#### 2021-07-07
  + 【重要】云函数支持创建时选择 nodejs 版本 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-functions.md?id=runtime)
  + 新增 内容安全公共模块，包含图片鉴黄、文字内容违规检测，免费且全端可用 [详情](https://ext.dcloud.net.cn/plugin?id=5460)
  + clientDB 新增 multiSend 接口，用于多个clientDB联网请求合并为一次联网 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=multi-send)
  + unicloud-db组件和API 新增 getTemp 接口，用于在 multiSend 内使用 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=multi-send)
  + uni-id 调整 3.1.1版本发布，使用兼容uniCloud响应体规范的新错误码格式 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=errcode)
  + uniCloud本地调试插件 修复 部分情况下出现 MaxListenersExceededWarning 警告的Bug
  + uniCloud本地调试插件 修复 项目内存在项目外文件的软链时，修改无法实时生效的Bug
  + JQL数据库管理 修复 部分情况下执行数据库操作无响应的Bug
  + 客户端SDK 修复 nvue 页面无法触发 App.vue 内注册的 db.on('error')、db.on('refreshToken') 等回调的Bug

#### 2021-07-06
  + web控制台 新增 违规文件列表
  + web控制台 修复 云存储删除文件总数不变的Bug
  + web控制台 调整 云函数日志默认查询开始时间为2小时前
  + web控制台 腾讯云 新增 数据库导入、导出
  + web控制台 腾讯云 新增 前端网页托管可开启HTTP强制跳转HTTPS
  + web控制台 腾讯云 新增 云函数url化允许 / 作为触发路径
  + web控制台 阿里云 新增 前端网页托管域名归属验证

#### 2021-06-23
  + 新增 uniCloud响应体规范，方便前端拦截器统一处理、方便国际化 [详情](https://uniapp.dcloud.net.cn/uniCloud/unicloud-response-format)
  + 客户端 新增 添加拦截器、移除拦截器API [详情](https://uniapp.dcloud.net.cn/uniCloud/client-sdk?id=add-interceptor)
  + 客户端 修复 HBuilderX 3.1.17-alpha 引出的 db.on("error") 回调不执行的Bug
  + 客户端 修复 leftWindow、topWindow 中使用 uniCloud 腾讯云报错的Bug [详情](https://ask.dcloud.net.cn/question/125039)
  + DB Schema 调整 enum 属性最大可枚举500条数据

#### 2021-06-03
  + 修复 HBuilderX 3.1.16 引出的未关联服务空间时无法获取 uniCloud.mixinDatacom 的Bug
  + 修复 HBuilderX 3.1.16 引出的某些情况下关联腾讯云服务空间的项目运行报错的Bug
  + uniCloud本地调试插件 修复 HBuilderX 3.1.16 引出的云函数日志内的文件链接点击无法跳转到对应文件的Bug

#### 2021-05-26
  + clientDB 新增 使用副表 foreignKey 进行联表查询时增加 _value 用于存储主表关联字段原始值 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=st-foreign-key)
  + clientDB 修复 部分情况下 action.after 会重复执行一次的bug
  + JQL数据管理 修复 使用云端 schema 时找不到 schema 的Bug [详情](https://ask.dcloud.net.cn/question/123285)
  + web控制台 腾讯云 调整 云函数超时时间最大可配置为900秒

#### 2021-05-25
  + web控制台 腾讯云 调整 云函数Url化需要配置CNAME为腾讯云给定的域名，此前配置为默认域名 [详情](https://uniapp.dcloud.net.cn/uniCloud/http)

#### 2021-05-18
  + 【重要】新增 uni-starter 集成商用项目开发常见功能的云端一体项目模板 [详情](https://ext.dcloud.net.cn/plugin?id=5057)
  + clientDB 修复 删除记录、统计记录数时受字段权限影响的bug [详情](https://ask.dcloud.net.cn/question/122846)
  + clientDB 修复 日期类型（date）数据校验出错的Bug [详情](https://ask.dcloud.net.cn/question/122517)
  + clientDB 修复 action、validateFunction 内打印日志无法在web控制台查看的Bug
  + unicloud-db组件 修复 联表查询时无法调用remove方法的问题 [详情](https://ask.dcloud.net.cn/question/122934)

#### 2021-04-30
  + 【重要】clientDB联表查询策略调整，请参考此文档进行进行排查并调整：[clientDB联表查询策略调整](https://ask.dcloud.net.cn/article/38966)
  + clientDB 新增 联表查询支持副表foreignKey联查，即副表字段的foreignKey指向主表，把副表数据挂在主表下面 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=st-foreign-key)
  + uniCloud本地调试插件 修复 阿里云偶发启动时多请求并发报错的Bug

#### 2021-04-16
  + 【重要】clientDB联表查询策略调整，请参考此文档进行进行排查并调整：[clientDB联表查询策略调整](https://ask.dcloud.net.cn/article/38966)
  + unicloud-db组件 新增 loadtime 属性，替代 manual 属性 [详情](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=props)
  + unicloud-db组件 新增 foreignKey 属性，用于存在多个foreignKey关系时指定要使用的foreignKey [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup-foreign-key)
  + uniCloud.mixinDataCom 新增 foreignKey 属性，用途同上 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup-foreign-key)
  + uni-id 修复 3.0.7 版本引出的多个用户访问时可能出现30201报错的Bug
  + uni-id 新增 bindMobile 接口支持通过一键登录的方式绑定 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=bind-mobile)
  + uni-id 调整 bindTokenToDevice 选项默认值改为 false，即默认不再与设备绑定，方便多设备登录
  + 修复 uniCloud.chooseAndUploadFile 在iOS微信小程序真机无法唤起选择文件的Bug
  + uniCloud admin 优化错误提示、键盘响应等众多细节，更新uni-id等众多依赖 [详情](https://ext.dcloud.net.cn/plugin?id=3268)

#### 2021-04-07
  + 新增 [uni-upgrade-center](https://uniapp.dcloud.io/uniCloud/upgrade-center)，提供了简单、易用、统一的App管理、App版本管理、安装包发布管理，升级检测更新管理。
  + uniCloud本地调试插件 修复 3.1.5 版本引出的腾讯云连接本地云函数运行一段时间后报错的Bug [详情](https://ask.dcloud.net.cn/question/119089)
  + 阿里云 新增 支持对云函数设置单实例并发度 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=concurrency)
  + 阿里云 新增 支持TTL索引 [详情](https://uniapp.dcloud.net.cn/uniCloud/db-index?ttl)

#### 2021-03-16
  + unicloud-db组件 add、update、remove方法新增可选参数needConfirm、needLoading、loadingTitle [详情](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=add)
  + unicloud-db组件 新增 load 事件支持 pagination [详情](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=loadevent)
  + DB Schema 修复 exclusiveMinimum|exclusiveMaximum 默认验证提示语不准确的问题
  + uniCloud本地调试插件 修复 公共模块修改之后无法立即生效的Bug
  + schema2code 新增 导出 uni_modules
  + schema2code 修复 生成 uni-file-picker 组件的属性 file-extname 类型错误的问题
  + schema2code 优化 导出 admin list页面的批量删除逻辑，没有选择项时禁用批量删除按钮
  + schema2code 优化 生成的前端 list 页面，增加无数据提示语 "没有更多数据"

#### 2021-03-05
  + DB Schema 修复 exclusiveMinimum|exclusiveMaximum 默认验证提示语不准确的问题（重新保存schema后生效）
  + schema2code 优化 生成的前端 list 页面，增加无数据提示语 "没有更多数据"

#### 2021-03-04
  + schema2code 新增 导出 uni_modules
  + schema2code 调整 导出 components 目录为 uni_modules 结构
  + schema2code 优化 导出 admin list页面的批量删除逻辑，没有选择项时禁用批量删除按钮
  + schema2code 修复 生成 uni-file-picker 组件的属性 file-extname 类型错误的问题

#### 2021-03-03
  + clientDB 修复 数据库运算方法in报错的Bug
  + clientDB 修复 jql非运算表现异常的Bug
  + clientDB 优化 部分场景下getCount性能
  + clientDB 优化 部分场景下jql联表查询性能

#### 2021-02-04
  + 修复 uniCloud.getCurrentUserInfo 报错的Bug

#### 2021-02-02
  + 【重要】客户端 新增 uniCloud.mixinDatacom 混入，方便快速开发datacom组件，无需自行处理云数据绑定 [详情](https://uniapp.dcloud.net.cn/component/datacom?id=mixindatacom)
  + 客户端 新增 uniCloud.chooseAndUploadFile API，选文件后直接上传到uniCloud云存储 [详情](https://uniapp.dcloud.net.cn/uniCloud/storage?id=chooseanduploadfile)
  + 【重要】uni-id 新增 在token内默认缓存角色权限，云端获取角色权限不再查库，提升clientDB性能 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=cachepermissionintoken)
  + uni-id 新增 支持苹果登录 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=loginbyapple)
  + uni-id 新增 客户端获取用户信息接口，包括权限角色 [详情](https://uniapp.dcloud.net.cn/uniCloud/client-sdk?id=client-getcurrentuserinfo)
  + 云函数 新增 获取客户端标识 deviceId [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=intro)
  + 阿里云 新增 云函数支持 uploadFile 接口（本地调试暂不支持）[详情](https://uniapp.dcloud.net.cn/uniCloud/storage?id=clouduploadfile)
  + 阿里云 新增 云数据库 add update 可以传入日期对象
  + 阿里云 新增 getTempFileURL 接口（仅为抹平和腾讯云的接口差异）[详情](https://uniapp.dcloud.net.cn/uniCloud/storage?id=cloudgettempfileurl)
  + web控制台 阿里云 新增 慢查询日志，有助于分析数据库设计缺陷
  + uniCloud本地调试插件 新增 支持 uni_modules
  + uniCloud本地调试插件 修复 cli 项目无法使用 uniCloud 本地调试的Bug
  + uniCloud本地调试插件 修复 客户端连接本地云函数时云函数内 callFunction 返回格式不正确的Bug
  + DB Schema 字段类型bsonType 新增 file、date类型 [详情](https://uniapp.dcloud.io/uniCloud/schema?id=bsontype)
  + DB Schema 字段类型bsonType 为 array 时，新增 arrayType 子类型，描述数组里项目的类型。比如 arrayType 设为 file，表示一组文件 [详见](https://uniapp.dcloud.io/uniCloud/schema?id=arraytype)
  + DB Schema 新增 fieldRules 用于描述字段之间的关系，如字段“开始时间”需小于字段“结束时间” [详情](https://uniapp.dcloud.net.cn/uniCloud/schema?id=field-rules)
  + DB Schema 新增 count 权限 [详情](https://uniapp.dcloud.net.cn/uniCloud/schema?id=col-permission)
  + DB Schema 新增 validateFunction 配置是否在客户端生效 [详情](https://uniapp.dcloud.net.cn/uniCloud/schema?id=validatefunction)
  + clientDB 新增 数据库运算符，可在 where、field、groupBy、groupField 以及 DB Schema 的 fieldRules 内使用 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=where)
  + clientDB 新增 支持 groupBy 对数据进行分组统计 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=groupby)
  + clientDB 新增 支持 distinct 对数据进行去重 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=distinct)
  + clientDB 修复 JQL 写法内使用下标访问数组内的元素报错的Bug
  + unicloud-db组件 add、update 方法支持调用 action云函数 [详情](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=add)
  + schema2code 新增 生成前端页面时补充list.vue、detail.vue页面
  + schema2code 调整 之前的 component 改名为 componentForEdit，并新增 componentForShow 。一个字段可以分别控制它在表单页面（add、edit）和展示页面（list、detail）所使用的组件
  + schema2code 新增 展示页面可直接显示bool值为√或×，显示DB Schema里enum的text内容。

#### 2021-02-01
  + web控制台 新增 云数据库慢查询日志，帮助开发者优化数据库查询性能，仅阿里云支持

#### 2021-01-09
  + DB Schema 新增 支持对 string 类型数据配置 trim ，可自动对字符串去除前后空白字符 [详情](https://uniapp.dcloud.net.cn/uniCloud/schema?id=trim)
  + DB Schema 修复 部分情况下使用 enum 报错的Bug
  + DB Schema 修复 exclusiveMinimum、exclusiveMaximum 无效的bug
  + clientDB 修复 查询树形结构时使用 startWith 某些写法导致报错的Bug
  + clientDB 修复 field 内使用JQL联表查询语法时多个右花括号连续出现导致报错的Bug
  + clientDB 修复 field 中包含`-`时报错的Bug
  + uniCloud本地调试插件 修复 部分日志导致本地调试服务崩溃的Bug
  + unicloud-db组件 支持tree查询，新增属性 gettree、startwith、limitlevel [详情](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=props)

#### 2021-01-08
  + web控制台 新增 协作者可访问被授权的空间 
  + web控制台 新增 云函数批量删除
  + web控制台 新增 数据表批量删除
  + web控制台 新增 公共模块批量删除
  + web控制台 新增  action 批量删除

#### 2020-12-30
  + uniCloud本地调试插件 修复 调试时较早请求云函数且无法连接本地调试服务时报错的Bug
  + uniCloud本地调试插件 修复 部分日志格式错误的Bug
  + uniCloud本地调试插件 修复 本地云函数向云数据库插入值为 null 的字段会报错的Bug
  + uniCloud本地调试插件 调整 输出调整复杂类型时调整最大展示层级为20级

#### 2020-12-28
  + clientDB API 新增 树形数据查询 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=gettree)

#### 2020-12-25
  + clientDB 新增 数据库错误 error 事件 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=error)
  + clientDB 调整 refreshToken 事件由 db.auth 移至 db ，旧写法仍兼容 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=refreshtoken)
  + uniCloud本地调试插件 修复 本地运行云函数运行结果显示不全的Bug

#### 2020-12-23
  + uniCloud本地调试插件 修复 windows 平台未打印输出对应的文件名和行号的Bug
  + uniCloud本地调试插件 优化 多参数的 console.log 输出展现

#### 2020-12-19
  + 【重要】调整 前端内置了`<unicloud-db>`组件，无需再人工引入插件市场的[clientDB组件插件](https://ext.dcloud.net.cn/plugin?id=3256) [规范](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db)
  + 【重要】新增 uniCloud 本地服务。支持前端项目在控制台切换连接云环境还是本地服务。本地修改直接生效，不用上传即可联调 [详情](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=calllocalfunction)
  + 【重要】调整 uniCloud 项目目录结构调整。根目录下为uniCloud目录，其下有二级目录 cloudfunctions 和 database。database目录存放数据表schema和扩展验证函数。并提供了目录结构迁移向导 [详情](https://ask.dcloud.net.cn/article/38028)
  + 【重要】新增 HBuilderX 本地编写 DB Schema，即数据表的表结构。支持新建、上传、下载表结构，支持代码提示。
  + 【重要】新增 `<unicloud-db>`组件（即之前的clientDB组件）支持代码提示。可提示JQL语法，在本地有schema的情况下可提示数据库表名字段。大幅提升开发效率 
  + HBuilderX 新增 编写 validateFunction，即数据库扩展校验函数。支持新建、上传、下载validateFunction
  + HBuilderX 优化 uniCloud 关联云服务空间的选择方式。并支持关联其它项目服务空间，实现多个项目连接一个服务空间 [详情](https://ask.dcloud.net.cn/article/37949)
  + HBuilderX 新增 可视化管理公共模块依赖 （对云函数点右键->管理公共模块依赖）
  + HBuilderX 优化 上传uni-id公共模块时，增加校验，对比配置密钥是否一致
  + HBuilderX 修复 云函数本地运行 控制台日志打印`null`和`undefined`值错误的Bug
  + HBuilderX 修复 前端网页托管 某些情况下，上传网站到服务器，控制台显示(0 MB)大于上传限制(0 MB)的Bug [详情](https://ask.dcloud.net.cn/question/111228)
  + uni-id 新增 App端一键登录 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=univerify)
  + 其他云端更新日志另见：[https://uniapp.dcloud.io/uniCloud/release](https://uniapp.dcloud.io/uniCloud/release)

#### 2020-12-10
  + web控制台 新增 阿里云新增稀疏索引 [详情](https://uniapp.dcloud.net.cn/uniCloud/hellodb?id=dbindex)
  + web控制台 新增 腾讯云云存储新增批量删除功能
  + web控制台 新增 前端网页托管批量删除
  + web控制台 新增 腾讯云 概览页面新增clientDB资源用量
  + web控制台 新增 导出 db_init.json 新增是否导出 ID
  + web控制台 新增 云函数、公共模块、action 列表新增操作者邮箱
  + web控制台 优化 数据库记录编辑窗口
  + web控制台 修复 腾讯云 云存储文件夹过多时上拉加载错误的BUG

#### 2020-11-21
  + clientDB 新增 jql写法支持在field内写别名 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=alias)
  + clientDB 新增 schema内enum支持使用云端数据 [详情](https://uniapp.dcloud.net.cn/uniCloud/schema?id=enum)
  + clientDB 新增 schema内bsonType支持password，设置后所有用户均不可读取此字段
  + clientDB 优化 索引冲突时返回更友好的提示及错误码 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=returnvalue)

#### 2020-11-14
  + uni-id 调整 2.0.0版本起验证码表名改为`opendb-verify-codes`
  + uni-id 调整 2.0.0版本起encryptPwd接口返回值调整 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=encrypt-password)
  + uni-id 新增 修改passwordSecret功能 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=modifysecret)

#### 2020-11-13
  +  阿里云支持事务（startTransaction方式，暂不支持runTransaction）[详情](https://uniapp.dcloud.net.cn/uniCloud/cf-database?id=starttransaction)

#### 2020-10-31
  + 新增 `<uni-clientDB>`组件支持remove方法，封装了删除确认框、删除数据库、删除前端data等操作，开发更便利 [详情](https://uniapp.dcloud.io/uniCloud/uni-clientdb-component?id=%e6%96%b9%e6%b3%95)
  + 优化 提升云函数执行速度几十毫秒。非冷启动时与传统服务器性能拉齐（需重新部署云函数）

#### 2020-10-24
  + clientDB 去除schema内permission中的点，例：`.write`改为`write`，旧写法仍然支持。
  + clientDB 优化无权限操作时的报错提示

#### 2020-10-24
  + 【重要】新增 clientDB 支持 `jql` 查询语法，大幅降低数据库操作难度 [详情](https://uniapp.dcloud.net.cn/uniCloud/database?id=jsquery)、大幅简化联表查询 [详情](https://uniapp.dcloud.net.cn/uniCloud/database?id=lookup)
  + 【重要】新增 uni-clientDB 组件，在前端通过组件直接获得云数据库内容，并直接绑定到界面上，大幅提升开发效率 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component)
  + 【重要】调整 clientDB内置，云端不再需要单独的clientDB云函数，前端无需引用clientDB的js sdk，直接在前端写`const db = uniCloud.database()`即可 [详情](https://uniapp.dcloud.net.cn/uniCloud/database)
  + 【重要】调整 uni-clientDB-actions 目录调整到 cloudfunctions 根目录 [详情](https://uniapp.dcloud.net.cn/uniCloud/database?id=action)
  + 【重要】调整 clientDB云函数的permission和validator子目录废除，只需在 DB Schema 中书写permission和validator内容，保存即可直接生效，无需再次导出
  + 【重要】新增 `uniCloud Admin 基础框架`（HBuilderX新建项目可选择该模板） [详情](https://uniapp.dcloud.net.cn/uniCloud/admin)
  + 【重要】新增 web控制台 云数据库配置 DB Schema 后，可直接生成前端工程，含数据表单新增、修改页面，以及校验规则。大幅提升开发效率
  + 【重要】腾讯云 正式商用 [详见](https://uniapp.dcloud.net.cn/uniCloud/price)
  + 新增 web控制台 云数据库支持导出db_init.json
  + 新增 web控制台 服务空间改名
  + 新增 web控制台 云数据库支持`扩展校验函数`，可自主编程实现更复杂的数据校验逻辑，同时在 DB Schema 中引用这些`扩展校验函数`
  + 修复 阿里云 数据库set方法表现不正确的Bug
  + uni-id 新增 开发者callFunction时可自行传入uniIdToken，此时不再从storage获取token

#### 2020-10-13
  + 腾讯云 全面开放企业用户按量计费服务空间的购买 [详情](https://uniapp.dcloud.net.cn/uniCloud/price?id=price-info)

#### 2020-09-29
  + 腾讯云 开放包年包月套餐购买 [详情](https://uniapp.dcloud.net.cn/uniCloud/price?id=price-month)

#### 2020-09-26
  + 【重要】新增 腾讯云 云函数固定出口IP，可用于微信公众号开发等要求配置ip的场景 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=eip)
  + 【重要】uni-clientDB 2.0 重大更新，可完整方便的控制权限和数据验证。大多数场景不再需要编写云函数 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB)
  + 【重要】uni-id 新增 角色权限相关功能 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=rbac)
  + 【重要】云数据库支持JSON Schema规范，可在Web控制台数据库管理界面对数据进行格式描述 [详情](https://uniapp.dcloud.net.cn/uniCloud/schema)
  + 阿里云 去除客户端上传文件类型限制

#### 2020-09-16
  + 腾讯云 支持云函数固定出口IP，支持微信公众号开发 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=eip)

#### 2020-09-03
  + 修复 某些情况下，上传公共模块，UI卡顿的Bug
  + 调整 阿里云放开文件上传类型限制

#### 2020-08-29
  + 新增 本地运行 加入显示调试行号等信息
  + 修复 当npm镜像源为淘宝源时，某些云函数或公共模块上传失败的Bug

#### 2020-08-20
  + 阿里云 升级mongoDB到4.0版本，现已支持地理位置
  + 优化 云函数插件支持写入components、js_sdk、static目录

#### 2020-08-12
  + web控制台 阿里云 新增 数据库集合导入导出功能 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-database?id=export)
  + web控制台 腾讯云 新增 资源概况页面

#### 2020-08-05
  + 阿里云 新增 支持协作者本地运行云函数
  + 修复 HBuilderX 2.8.0引出的 公共模块右键菜单 更新依赖本模块的云函数菜单丢失的Bug

#### 2020-08-04
  + 新增 3个内置短信模板 [详情](https://uniapp.dcloud.net.cn/uniCloud/send-sms)

#### 2020-08-04
  + 阿里云 新增 支持协作者本地运行云函数

#### 2020-07-24
  + 阿里云 修复 本地运行时云函数互调报错的Bug

#### 2020-07-21
  + 【重要】新增 本地运行云函数，可连接远程数据库和云存储，大幅提升开发效率，同时方便数据导入导出 [详情](https://uniapp.dcloud.net.cn/uniCloud/local)
  + 【重要】新增 插件市场支持云函数付费销售，欢迎插件作者们提交高质量可售卖插件
  + 【重要】新增 uniCloud.sendSms 短信发送能力，可方便、便宜的发送验证码短信 [详情](https://uniapp.dcloud.net.cn/uniCloud/send-sms)
  + 修复 2.7.12版本引出的支付宝小程序、百度小程序下使用 uniCloud 报错的Bug
  + 修复 2.7.12版本引出的H5端 main.js 内使用 uniCloud 导致 uniCloud 不可使用的Bug

#### 2020-07-10
  + web控制台 新增 云数据库新增、管理记录可全屏编辑
  + web控制台 优化 云数据库数据的展现形式
  + web控制台 修复 云数据库选项卡快速切换导致内容显示不正确的Bug

#### 2020-07-01
  + 【重要】新增[uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id)，实现简单、统一、可扩展的用户中心，推荐每个 uniCloud 开发者使用
  + 新增 callfunction时自动携带`uni-id`的token，无需自行开发token管理方案
  + 新增 web控制台 腾讯云 云数据库备份和恢复功能 [详情](https://uniapp.dcloud.io/uniCloud/cf-database?id=backup)
  + 新增 web控制台 腾讯云 云数据库集合名称修改功能
  + 修复 云函数内获取客户端系统类型可能为空的Bug
  + 修复 HBuilderX 导入包含common目录的云函数模板，导致原common目录被覆盖的Bug
  + 优化 HBuilderX 新建公共模块增加名称不能包含大写字母的限制
  * 修复 HBuilderX 某些情况下，上传公共模块，出现npm install失败的Bug
  + 修复 HBuilderX 公共模块 右键菜单出现两个上传公共模块菜单的Bug
  + 修复 HBuilderX 上传公共模块没有填写appid时的错误提示与上传云函数不一致的Bug

#### 2020-06-24
  + 腾讯云 新增 数据库回档功能 [详情](https://uniapp.dcloud.io/uniCloud/cf-database?id=backup)
  + 腾讯云 修复 web控制台修改日期格式字段会变成字符串的Bug，目前显示为 {$date:xxx} 形式

#### 2020-06-15
  + 腾讯云 优化 开发期间客户端直连云函数

#### 2020-06-13
  + 阿里云 新增 前端网站部署功能 [详情](https://uniapp.dcloud.io/uniCloud/hosting)

#### 2020-06-10
  + 阿里云 调整 定时触发的云函数，运行超时时间上限可设置为600秒，便于大数据量的跑批任务执行
  + 腾讯云 新增 前端网站部署功能 [详情](https://uniapp.dcloud.io/uniCloud/hosting)

#### 2020-06-04
  + 腾讯云 新增 云数据库支持批量插入数据 [详情](https://uniapp.dcloud.io/uniCloud/cf-database?id=add)

#### 2020-05-21
  + 新增 云函数内获取客户端ua、ip [详情](https://uniapp.dcloud.io/uniCloud/cf-functions)

#### 2020-05-16
  + 开放腾讯云创建入口

#### 2020-05-15
  + 阿里云 优化 云函数冷启动时间，经测试冷启动时间平均减少800ms

#### 2020-04-29
  + 阿里云 修复 某些情况下 neq 操作符无法正常使用的Bug
  + web控制台 调整 阿里云去除云存储文件类型限制

#### 2020-04-23
  + 阿里云 修复 云函数无法接收微信支付回调的Bug

#### 2020-04-21
  + 腾讯云 修复 云函数互调某些情况下报签名错误的Bug
  + 腾讯云 修复 elemMatch 内使用 neq 报错的Bug [详情](https://ask.dcloud.net.cn/question/91531)
  + 阿里云 调整 云函数Url化最大可返回1MB数据，调整前为4KB

#### 2020-04-08
  + web控制台 新增 阿里云支持云函数定时触发
  + web控制台 优化 阿里云云函数上传并运行时会运行更新之前的云函数的问题

#### 2020-03-27
  + web控制台 新增 阿里云支持云函数Url化

#### 2020-03-26
  + web控制台 新增 腾讯云服务空间，需发送邮件获取体验资格
  + web控制台 新增 云函数运行日志
  + web控制台 新增 云存储权限
  + web控制台 新增 公共模块
  + web控制台 优化 阿里云文件存储上传体验
  + web控制台 优化 阿里云云数据库搜索体验
  + web控制台 修复 阿里云删除索引报错的Bug
  + web控制台 修复 阿里云云存储文件后缀为大写文件不显示的Bug
  + web控制台 修复 阿里云云数据库字段为空或为 null 时显示错误的Bug

#### 2020-03-04
  + web控制台 新增 阿里云支持云数据库分页
  + web控制台 新增 阿里云支持云数据库索引
  + web控制台 新增 服务空间快捷切换选项卡
  + web控制台 优化 云数据库长文本显示收起展开按钮
  + web控制台 优化 云数据库搜索体验

#### 2020-02-27
  + db_init.json 调整 添加索引方向时应使用字符串

#### 2020-02-26
  + 阿里云 新增 云数据库支持 add 批量添加数据 [详情](https://uniapp.dcloud.io/uniCloud/cf-database?id=add)

#### 2020-02-24
  + 阿里云 新增 云函数互调功能 [详情](https://uniapp.dcloud.io/uniCloud/cf-functions?id=callbyfunction)