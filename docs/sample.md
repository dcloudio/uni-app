# 源码和示例

官方有6个开源项目比较重要
- [hello uts](https://gitcode.com/dcloud/hello-uts)：uts的语法和内置对象的使用示例
- [hello uvue](https://gitcode.com/dcloud/hello-uvue)：vue语法的使用示例
- [hello uni-app x](https://gitcode.com/dcloud/hello-uni-app-x)：uni内置组件和API的使用示例，也包括一些常见但复杂的模板示例
- [uni-api](https://gitcode.com/dcloud/uni-api)：uni api的实现源码。大量uts API插件源码，适合uts插件作者学习
- [uni-component](https://gitcode.com/dcloud/uni-component)：内置组件的实现源码。uts组件插件源码，适合uts插件作者学习
- [uni-ai-x](https://ext.dcloud.net.cn/plugin?name=uni-ai-x)：用于快速搭建 AI 聊天类应用的开源插件，适合开发者学习 AI 功能与 uni-app x 结合的开发方案



这些开源项目的master分支对应着HBuilderX最新正式版，alpha分支对应着最新alpha版。

关于[uni-api](https://gitcode.com/dcloud/uni-api)和[uni-component](https://gitcode.com/dcloud/uni-component)，再强调说明下：

uni-app x的组件和API，大多是uts语言开发的。和开发者做的uts插件是一样的。\
它们都符合[exi api](https://uniapp.dcloud.net.cn/api/extapi.html)规范，也就是说，把这些uni_modules复制到工程下，会替换内置API和组件的实现。

所以如需修改uni-app x的组件和API，比如修复一些bug或添加一些功能，可以通过这种方式来实现。

如果这些改动有助于其他开发者，欢迎给开源项目回提pr。

在uni-app x的组件和API文档页面的右上角，也有每个组件和API的源码，都是链接到[uni-api](https://gitcode.com/dcloud/uni-api)和[uni-component](https://gitcode.com/dcloud/uni-component)项目。

除此之外，插件市场还有众多插件，[详见](https://ext.dcloud.net.cn/?uni-appx=1)

目前插件市场已经有近千款适配uni-app x的插件，不管是uts还是uvue，已有大量开发者在使用。

上线的App案例：
由于uni-app x没有运行时数据采集，所以DCloud并不知道哪些开发者在真实使用uni-app x。\
希望大型开发者，能主动给本文档提交pr，贡献案例，帮助uni-app x生态发展。

以下列出部分案例：

- e线签（天津数字认证有限公司）：[Android](https://sj.qq.com/appdetail/com.tjca.elinesign)、[iOS](https://apps.apple.com/cn/app/e%E7%BA%BF%E7%AD%BE/id6743433163)
- Tevau 海外应用：[Google Play](https://play.google.com/store/apps/details?id=uni.UNI2317D55&hl=zh&pli=1)、[iOS](https://apps.apple.com/cn/app/tevau/id6504911110)
- 舆情秘书专业版：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.istarshine.yqms4harmonyos)
- 我要查快递（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.youjuda.woyaochakuaidi)
- 账王业财（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=cn.cash360.lionhm)
- 台球追分记分（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=zhuifen.huawei.com)
- 学识魔方（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.XueShiMoFang.huawei)
- 环保计算小帮手（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ahzx.jzssds)
- RiceUI（组件库）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.rice.xui)
- 手机数据库（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.xingyueldh.phonedatabase)
- 信息安全速记助手（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ruixiang.xxaqsjzs)
- 都测（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.hime.dotest)
- 典萃诗词（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ahzx.dcsc)
- HUD抬头显示（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.szzhongke.hud_hm)
- 大咖复刻（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ahzx.dkfk)
- 名人妙语通（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ahzx.mrmyt)
- OC智联（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=cn.ocdw.app.oczl)
- 远火（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=hm.yuanhuo.cn)
- 月月好（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.menstrual.period)
- 格式转换专家（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.gszh.app)
- 数学公式导航仪（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ahzx.sxgsdhy)
- 海江消防：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.hjnet.app.harmons)
- 诗律魔方（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ahzx.slmf)
- 词林探秘（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ahzx.cltm)
- 生态调查（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=ecological_investigation.www.gzqtai.com)
- 注册环保工程师大全（学习）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.relations.huanbao)
- 大张（OA）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=elan.mobile.dazhang)
- 掌上粤剧宝（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.ZhangShangYueJuBao.huawei)
- ProcessOn思维导图（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.processon.app)
- 星云办公（OA）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.xdong.cloudclient)
- AI问邮（问答工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.isoftstone.AIStamp)
- 友友露营（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.LuYingZhuShou.huawei)
- 宝贝成长记录（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.bbczjl.huawei)
- 粤语点读工具（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=hxl.yyddgj.huawei)
- 京唐签到（OA）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.example.sgjt_daka_jiaqin)
- 轻松化学宝典（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.QingSongHuaXueBaoDian.huawei)
- 金鸣表格文字识别（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=cn.jm189.hm)
- 小羊口袋粤语（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.KouDaiYueYu.huawei)
- 安全审批（OA）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.tec.approval)
- 芯片助手ICHELPS（电商）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.ichelps.huawei)
- 租客管家（租房）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.ZuKeGuanJia.com)
- 喵大大（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.MiaoDaDa.huawei)
- 厦团团（旅游）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.liuchangos.xiatuantuan)
- 相约乒乓（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.XiangYuePingPang.huawei)
- 小易CRM助手（客户管理）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.CRMZhuShou.huawei)
- 花草君（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=xmshannian.huaca.huawei.com)
- 能源帮帮记（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.NengYuanBangBangJi.huawei)
- 旅途管家（出行）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.tojoy.kangbosstriph)
- Ozon运费（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.xixisys.ozonship)
- 露营仓库（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.luyi.weilei)
- 图片压缩精灵（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.tpys.app)
- 怡宁网院平台医生（平台）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.hlwxm.hlwxmMedicalCare.construction)
- 甘肃党建（党建信息化平台）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=cn.gov.gsdj.app.hmos)
- 清科锐华（OA）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=cn.reachway.cemis.reachway.huawei)
- 现在种什么（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.suye.xzzsm)
- 广州公务出行（交通）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=gz.gwcx.huawei)
- BKT智能（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.bktclub.bkthm)
- 云医点餐（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.easyhospital.rest)
- 应安联（应急安全服务平台）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.aky.yal.huawei)
- IRTool（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=cn.cenz.irtool)
- 备考注册道路工程师（教育）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=com.relations.daolu)
- 街舞口袋宝（工具）：[鸿蒙](https://appgallery.huawei.com/app/detail?id=Huangwj.JieWuKouDaiBao.huawei)
- W Life（租房）：[Android](https://appgallery.huawei.com/app/C114037237)、[iOS](https://apps.apple.com/cn/app/w-life/id6742771365?uo=4)
- 维度新闻（黑龙江官媒）：[Android](https://sj.qq.com/appdetail/uni.UNIDB3060D)
- 鲨推AI（工具）：[Android](https://sj.qq.com/appdetail/com.shatui.ai)
- Atter（AI工具）：[Android](https://sj.qq.com/appdetail/com.wbgrecordx.app)、[iOS](https://apps.apple.com/us/app/atter-ai-voice-to-text-notes/id6747348330)
- 崇胜AI助手（工具）：[Android](https://appgallery.huawei.com/app/C110643037)、[iOS](https://apps.apple.com/bn/app/%E5%B4%87%E8%83%9Cai%E5%8A%A9%E6%89%8B-ai%E8%A7%86%E9%A2%91%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%85%B7/id6479941790)
- 知食有为（AI健康）：[Android](https://sj.qq.com/appdetail/cn.sshcn.nutrition.m)、[iOS](https://apps.apple.com/hk/app/%E7%9F%A5%E9%A3%9F%E6%9C%89%E4%B8%BA/id6739123603)
- 智能PPT生成器（工具）：[Android](https://app.mi.com/details?id=com.pptgen.Intelligent)
- 格式作坊（工具）：[Android](https://sj.qq.com/appdetail/com.gszf.app)、[iOS](https://apps.apple.com/cn/app/%E6%A0%BC%E5%BC%8F%E4%BD%9C%E5%9D%8A-%E6%A0%BC%E5%BC%8F%E8%BD%AC%E6%8D%A2%E5%99%A8/id6472780051)
- 金股讯（金融）：[Android](https://sj.qq.com/appdetail/com.jinguxun.app)、[iOS](https://apps.apple.com/cn/app/%E9%87%91%E8%82%A1%E8%AE%AF/id1615272585)
- 应安联（政务）：[Android](https://sj.qq.com/appdetail/com.aky.yal)、[iOS](https://apps.apple.com/cn/app/%E5%BA%94%E5%AE%89%E8%81%94/id1566809671)
- 智慧强安（政务）：[Android](https://sj.qq.com/appdetail/com.demlution.aatianfangyetan)、[iOS](https://apps.apple.com/cn/app/%E6%99%BA%E6%85%A7%E5%BC%BA%E5%AE%89/id6476082028)
- 脱单吧（社交）：[Android](https://sj.qq.com/appdetail/com.liewu.desingle)、[iOS](https://apps.apple.com/cn/app/%E8%84%B1%E5%8D%95%E5%90%A7/id1560465075)
- 缘乐多（社交）：[Android](https://sj.qq.com/appdetail/com.adaphan.myloves)
- 面具漂流瓶（社交）：[Android](https://appgallery.huawei.com/app/C113757831)
- 一起超慢跑（健身）：[Android](https://sj.qq.com/appdetail/com.cloud.dema.jog)
- 萤科物联（物联网）：[Android](https://sj.qq.com/appdetail/iot.ykwl.vip)、[iOS](https://apps.apple.com/cn/app/%E8%90%A4%E7%A7%91%E7%89%A9%E8%81%94/id6741841541)
- 牛轻松（物联网）：[Android](https://sj.qq.com/appdetail/com.wuitu.nqs)
- 小溪相册（物联网）：[Android](https://app.mi.com/details?id=com.yanxi.xiaoxizaijia)、[iOS](https://apps.apple.com/vn/app/%E5%B0%8F%E6%BA%AA%E7%9B%B8%E5%86%8C/id6593673873)
- 灵犀一点（物联网）：[Android](https://sj.qq.com/appdetail/uni.qinhua)、[iOS](https://apps.apple.com/cn/app/%E7%81%B5%E7%8A%80%E4%B8%80%E7%82%B9/id1661770402)
- HDK车联网（物联网）：[Android](https://sj.qq.com/appdetail/com.hdk.app)、[iOS](https://apps.apple.com/cn/app/hdk%E8%BD%A6%E8%81%94%E7%BD%91/id6740163146)
- 易瓜优选（电商）：[Android](https://sj.qq.com/appdetail/huaban.yigua)
- 槟购跨境（电商）：[Android](https://sj.qq.com/appdetail/com.bingo.bg)、[iOS](https://apps.apple.com/hk/app/%E6%A7%9F%E8%B4%AD%E8%B7%A8%E5%A2%83/id1463306856)
- 嘟卡邦（电商）：[Android](https://sj.qq.com/appdetail/com.dukabang.app)
- 百佣（电商）：[Android](https://app.mi.com/details?id=com.baiyong.yuehu)、[iOS](https://apps.apple.com/cn/app/%E7%99%BE%E4%BD%A3/id6451459018)
- 华杰全优采（医药电商）：[Android](https://sj.qq.com/appdetail/com.wta.NewCloudApp.jiuwei314439)、[iOS](https://apps.apple.com/cn/app/%E5%8D%8E%E6%9D%B0%E5%85%A8%E4%BC%98%E9%87%87/id1577869835)
- 时一助手（工具）：[App端](http://app.yuteng.vip/sy/index.html)
- 拾用视频去水印（工具）：[Android](https://sj.qq.com/appdetail/io.video.convertApp)
- 176乐园（网赚）：[Android](https://sj.qq.com/appdetail/uni.UNI1A7CD2D)
- 云旅迹：[Android](https://sj.qq.com/appdetail/com.yunlvji.trip)
- uyultax（维吾尔族多语言应用）：[Android](https://sj.qq.com/appdetail/com.android.uyultax)
- 我爱点读（教育）：[Android](https://sj.qq.com/appdetail/com.aiduowan.diandu)
- 天玑智研（教育）：[Android](https://sj.qq.com/appdetail/com.phadscholar)、[iOS](https://apps.apple.com/us/app/%E5%A4%A9%E7%8E%91%E6%99%BA%E7%A0%94/id6743391396)
- 金玉良言（教育）：[Android](https://sj.qq.com/appdetail/uni.app.UNI1F8CF4F)
- 治学课堂（教育）：[Android](https://sj.qq.com/appdetail/com.zhixuerj.zxkt)、[iOS](https://apps.apple.com/cn/app/%E6%B2%BB%E5%AD%A6%E8%AF%BE%E5%A0%82/id6737838504)
- 课教帮（教育）：[Android](https://sj.qq.com/appdetail/com.dw.kejiaobang)
- 同年数科（交通）：[Android](https://sj.qq.com/appdetail/kemi.io.com)
- 汇成车队（交通）：[Android](https://sj.qq.com/appdetail/cn.dsknykj.hccd)、[iOS](https://apps.apple.com/lb/app/%E6%B1%87%E6%88%90%E8%BD%A6%E9%98%9F/id6744993779)
- 觅数（交通）：[Android](https://sj.qq.com/appdetail/com.jspdg.mishu)
- 亦如茶（社交）：[Android](https://sj.qq.com/appdetail/com.yiru.cha)、[iOS](https://apps.apple.com/cn/app/%E4%BA%A6%E5%A6%82%E8%8C%B6/id1544325304)
- 桔子家（家装O2O）：[Android](https://sj.qq.com/appdetail/com.juzijia.app)
- PowerMJ（企业管理）[Android](https://sj.qq.com/appdetail/com.power.powermj)、[iOS](https://apps.apple.com/hk/app/powermj/id6738763443)
- 融合办公（企业管理）[Android](https://sj.qq.com/appdetail/com.gsxx.office)
- 智沄+（酒店管理）： [Android](https://sj.qq.com/appdetail/com.zhiyun.pms)
- 智控节能（物业管理）：[Android](https://sj.qq.com/appdetail/uni.UNIFA742E9)
- 企财网（企服）：[Android](https://sj.qq.com/appdetail/com.dx.qicaiwang)
- 中财企服：[Android](https://sj.qq.com/appdetail/com.zhongcaiqifu)
- 泡泡配送（外卖）：[Android](https://app.mi.com/details?id=com.wxh66.dc.android)
- 招财猫计算器（记账）：[Android](https://sj.qq.com/appdetail/com.zhaocaimao.cal)、[iOS](https://apps.apple.com/cn/app/%E6%8B%9B%E8%B4%A2%E7%8C%AB%E8%AE%A1%E7%AE%97%E5%99%A8-%E6%96%B0%E7%89%88%E6%97%A0%E5%B9%BF%E5%91%8A%E8%AE%A1%E7%AE%97%E6%9C%BA/id6742278907)
- 智消云管家（消防）：[Android](https://sj.qq.com/appdetail/com.jbufa.iot3)、[iOS](https://apps.apple.com/sa/app/%E6%99%BA%E6%B6%88%E4%BA%91%E7%AE%A1%E5%AE%B6/id6499505198)
- ABSign（电子合同）：[iOS](https://apps.apple.com/us/app/absign/id6751777998)

插件市场的云端一体项目模板，这些项目的客户端和服务器的源码都是现成的，可直接购买：
- 快亿商城：[App端插件](https://ext.dcloud.net.cn/plugin?id=15458)、[管理端插件](https://ext.dcloud.net.cn/plugin?id=15568)
- [ai(chatGPT)聊天对话，uni-app x(uvue+uts)和uniCloud云端一体完整项目模板](https://ext.dcloud.net.cn/plugin?id=17075)

其实uni-app x最大的案例就是uni-app x自身，
1. uni-app x有几十个组件（form类、video）、以及界面有关的API（showModel、showActionSheet、previewImage、chooseLocation、scanCode等）都是用uvue实现的。
2. uni-app x的几百个API，都是用uts实现的。
这些组件和API的文档上都列有源码链接。
