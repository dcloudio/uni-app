# uniCloud 更新日志
======================================
#### 2020-09-16
  + 腾讯云 支持云函数固定出口IP，支持微信公众号开发 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=eip)

#### 2020-08-20
  + 阿里云 升级mongoDB到4.0版本，现已支持地理位置
  + 优化 云函数插件支持写入components、js_sdk、static目录

#### 2020-08-12
  + web控制台 阿里云 新增 数据库集合导入导出功能 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-database?id=export)
  + web控制台 腾讯云 新增 资源概况页面

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
* 【服务端SDK】
  + 阿里云 修复 云函数无法接收微信支付回调的Bug

#### 2020-04-21
* 【服务端SDK】
  + 腾讯云 修复 云函数互调某些情况下报签名错误的Bug
  + 腾讯云 修复 elemMatch 内使用 neq 报错的Bug [详情](https://ask.dcloud.net.cn/question/91531)
  + 阿里云 调整 云函数Url化最大可返回1MB数据，调整前为4KB

#### 2020-04-08
* 【web 控制台】
  + 阿里云 新增 支持云函数定时触发
  + 阿里云 优化 云函数上传并运行时会运行更新之前的云函数的问题

#### 2020-03-27
* 【web 控制台】
  + 阿里云 新增 支持云函数Url化

#### 2020-03-26
* 【web 控制台】
  + 新增 腾讯云服务空间，需发送邮件获取体验资格
  + 新增 云函数运行日志
  + 新增 云存储权限
  + 新增 公共模块
  + 阿里云 优化 文件存储上传体验
  + 阿里云 优化 云数据库搜索体验
  + 阿里云 修复 删除索引报错的Bug
  + 阿里云 修复 云存储文件后缀为大写文件不显示的Bug
  + 阿里云 修复 云数据库字段为空或为 null 时显示错误的Bug
 

#### 2020-03-04
* 【web 控制台】
  + 阿里云 新增 云数据库分页
  + 阿里云 新增 云数据库索引
  + 控制台 新增 服务空间快捷切换选项卡
  + 控制台 优化 云数据库长文本显示收起展开按钮
  + 控制台 优化 云数据库搜索体验

#### 2020-02-27
* 【IDE】
  + db_init.json 调整 添加索引方向时应使用字符串

#### 2020-02-26
* 【服务端SDK】
  + 阿里云 新增 云数据库支持 add 批量添加数据 [详情](https://uniapp.dcloud.io/uniCloud/cf-database?id=add)

#### 2020-02-24
* 【服务端SDK】
  + 阿里云 新增 云函数互调功能 [详情](https://uniapp.dcloud.io/uniCloud/cf-functions?id=callbyfunction)
