`uniCloud` 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台。

`uniCloud` 的 web控制台地址：[https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn)


### uniCloud 的价值

- 对于程序员，从此你又get一个新技能，用熟悉的js，轻松搞定前后台整体业务。
- 对于开发商：
    1. 开发成本大幅下降、开发效率大幅提升、上线和迭代速度大幅提速；
    2. 如果你是新创公司，将无需雇佣php或java等服务器工程师，每年至少节省几十万；
    3. 如果你已拥有掌握php和js的全栈，那么改用新的技术栈，一样可以大幅提升开发效率、降低成本；
    4. 你只需专注于你的业务，其他什么服务器运维、弹性扩容、大并发承载、防DDoS攻击，全都不需要操心；
    5. 除了开发成本，云资源租用成本也将大幅下降
    6. 如果不发布H5版，你将不需要购买备案域名。小程序和App可以免域名使用服务器；


### 看视频，只需25分钟，快速入门uniCloud

<a target="_blank" href="https://www.bilibili.com/video/BV17p4y1a71x?p=9">
    <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/707756af-e9a9-4d08-8db9-5d1f34b84ea6.jpg" alt="腾讯课堂uniCloud视频教程" style="width: 70%;">
</a>

### uniCloud是什么和不是什么

uniCloud是DCloud在阿里云和腾讯云的serverless服务上封装而成的。

它包含IaaS层（由阿里云和腾讯云提供硬件和网络）和PaaS层（由DCloud提供开发环境）。

开发者可以自主选择uniCloud的硬件和网络资源的供应商，在阿里云版和腾讯云版之间切换。

开户和付费虽然通过DCloud渠道，但实际上开发者自动在云厂商处建立了账户和充值了余额。DCloud只获取云服务厂商的返佣。

开发时虽使用DCloud的工具，但应用上线时，手机端是直连阿里云或腾讯云的serverless，不经由DCloud的服务器。

### 什么是serverless？

serverless是目前很火的概念，它是下一代云技术，是真正的“云”。

传统的云服务，让开发者免于购买实体服务器硬件，改为购买虚拟机。但开发者仍然要自己装操作系统、web服务器、数据库，自己处理热备，自己新购服务器来应对高并发，自己抗DDOS攻击...

这不是成熟的“云”！

真正的云计算，就像用水用电，没有复杂的门槛，即用即有、按需付费。

简单回顾下用电的历史。几十年前，很多单位都有专门管电的工程师，当单位的电力负荷不够时，就需要找这个管电的工程师扩容发电机。

现在这个管电工程师的岗位已经淘汰了，电已经变成随用随取、按需付费了。

传统云模式下，开发商仍然需要一个管服务器的工程师，当用户量激增或被攻击时，甚至需要半夜把工程师叫醒来扩容。这当然不合理。

serverless的云，真正的把计算、存储的能力进行了云化，开发者只需要按量租用这些计算和存储能力，再也不用关心扩容和攻击。

开发者不再有“服务器”的概念，因为没有一台具体的机器。就像现在的你再也找不到自己的发电机一样。

当用户量激增时，开发者什么都不用做，系统自动承载更高并发。开发者只需要按照对资源的消耗付费即可。

同理，如果没有用户使用，即没有资源消耗，则根本无需为云资源付费。

开发者写好云端业务代码，即js编写的云函数，通过HBuilderX部署到uniCloud上即可。

云端庞大的serverless资源池，有无数个node进程待命。当手机用户发起请求时，serverless系统会调配闲置的资源来运行开发者相应的云函数。

- serverless，让一个不懂服务器运维的开发者，可以只处理自己的业务，再不用关心热备、负载、增容、DDOS等事情。
- serverless，让一个大学生，也可以享受世界最顶级的IT基础设置。

serverless在国外兴起，但国内的发展速度已经超过了国外。微信、支付宝、百度、字节跳动、快应用联盟都上线了自己的serverless云开发。

目前国内已经有超过60万开发者在使用serverless云开发，包括腾讯、阿里、DCloud的很多自有业务都在使用。

就像uni-app可跨端一样，uniCloud可跨云。基于uniCloud，无需担心使用云开发被绑定到专用的小程序平台。uni-app + uniCloud 是跨端跨云的开发方案。

### uniCloud为何可降低云服务租用成本

1、传统云服务的租用，按占用的硬件资源的上限值+固定时长来租用。

选择CPU和内存的配置，不到满配时，资源是浪费的，接近满配就需要立即扩容新的配置。

serverless不是传统云，它不需要开发者选择CPU和内存配置，也没有操作系统的选择。开发者编写云函数代码，上传到uniCloud的阿里云版或腾讯云版。

阿里云和腾讯云搭建了巨大的serverless资源池，有众多node进程用于云函数的运行。

这些资源是复用和共享的，并不存在某个开发者租用了3G CPU和8G内存，这些硬件就只能为他所用。

因为共享大资源池，云服务厂商的成本大幅下降，开发者无需为闲置资源付费，云函数被调用才计费。

从技术原理上serverless就有明显成本优势，所以租用serverless比租用传统云要便宜的多。

2、没有名目繁多的收费项

在传统云的世界里，有大量的收费产品。

在阿里云和腾讯云的官网可以看到长长的收费产品列表，比如负载均衡、高防、安全中心...

在uniCloud的世界，简单清晰，没有这些收费项。

只需按对计算资源、存储资源的消耗计费，只需关心业务，无需关心其他各种名目的增值产品，也无需为它们付费。

要知道一个用于防DDoS的高防套餐，每个月至少几万元。而这些费用，在uniCloud中无需支付。

展开说下uniCloud为什么不用买高防也不害怕DDoS：由于阿里云和腾讯云的serverless有巨大的资源池，且serverless没有固定ip，云函数使用的是阿里云和腾讯云的自有域名，前端网页托管在cdn上，DDoS攻击者打不起、也打不挂uniCloud。

3、云厂商的促销补贴

目前阿里云为uniCloud提供了纯免费的云资源，不但云函数、云数据库免费，连存储和cdn都免费。

腾讯云也提供了一个免费服务空间，此外再建服务空间的收费也比传统云要低很多。

基于以上3点原因，uniCloud大幅降低了开发者云资源的租用成本。

除了云资源的成本，uniCloud还可以减少开发商的人工成本、招聘成本、沟通管理成本，这些成本往往远大于云资源成本。

### uniCloud降低前端掌握后端的门槛

前端工程师想掌握后端开发，有6大门槛：
- 学习php、java等非js的语言
- 学习数据库设计
- 学习SQL
- 学习linux、nginx等系统和三方软件
- 学习服务器运维：熟悉负载均衡、大并发处理。了解各种复杂的云厂商产品目录和报价
- 学习系统安全：避免业务安全漏洞（权限漏洞、防SQL注入）、操作系统和三方软件补丁、DDoS等网络攻击

而有了uniCloud，这些门槛全都降了下去：
1. uniCloud采用js编写后端服务代码，无需单独学习php或java，甚至也无需提前掌握nodejs。看下uniCloud的api文档即可。
2. uniCloud基于serverless，开发者无需了解linux、nginx，无需熟悉负载均衡、大并发处理，不用关心系统补丁和DDoS攻击，只需要用js写好云端业务代码，上传到uniCloud即可。
3. uniCloud推出了[opendb](https://gitee.com/dcloud/opendb)，包含了大量的开源数据库模板，常见数据表无需自己设计。通过opendb模板，开发者可以快速掌握数据库设计。
4. SQL在过去也需要单独学习，尤其是复杂的联表查询、Tree查询，掌握很不容易。uniCloud推出了JQL（Javascript Query Language），会js即可掌握数据库查询，更对联表查询、Tree查询提供了非常简便的操作封装。
5. uniCloud提供了[uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id)，无需自己开发账户体系，登录、注册、修改密码、角色权限体系、token管理一应俱全。
6. uniCloud在[DB Schema](https://uniapp.dcloud.net.cn/uniCloud/schema)中提供了与[uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id)的角色权限体系配套的数据权限控制方案。这套方案让小白也不会在权限控制中犯错。在一目了然的权限配置清单中可以轻松发现漏做的事情，比以往在大坨php代码中分析是否存在权限漏洞要简单的多。这套方案还能让多人协作、或项目二次开发变的更容易，因为规范的存在，新人可以轻易读懂老代码的权限体系逻辑。

所以说，uniCloud是前端变全栈的最佳机会，只需花点时间熟读uniCloud的文档，你就可以成为全栈！


### uniCloud如何提升10倍开发效率？

uniCloud最吸引人的是，它将开发效率提升了10倍以上。

在uniCloud推出的一年时间里，uni-app + uniCloud 已经变成了一个庞大的生态。包括非常多的工具、模块。

开发效率提升10倍，并非某个杀手功能的功劳，而是庞大的生态共同的作用。本章节篇幅较长，请耐心阅读。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/80364c0b-2dd8-4629-b0f7-cbead0df7922.png)

#### 一个故事
2020年初，uniCloud刚发布，新冠肺炎突然来袭，各地涌现大量抗疫项目需求。

uni-app + uniCloud成为大家和病毒抢时间的重要利器。

各地迅速涌现了数百个基于uni体系的抗疫项目。详见：[https://www.dcloud.io/ncp.html](https://www.dcloud.io/ncp.html)

当时一个抗疫项目的开发，仍然需要几十人天。

以[出入管理登记](https://gitee.com/dcloud/xinguan2020-alien-registration)的项目为例，第一版做了10天，有4-5位全职或兼职工程师参与。

一年后的2021年春节，各地又大量出现了[返乡人员信息登记](https://gitee.com/dcloud/returnees)的需求。

项目需求类似，但此时的uniCloud生态建设已经完善，基于各种利器，返乡人员登记系统的开发人天数大幅削减，只花费0.0625人天！

1年时间，开发效率提升了将近1000倍！

uni云端一体生态的内容太多，让我们抽丝剥茧、归纳分类，以容易理解的方式讲解开发效率是怎么提升的。

开发效率提升，分7个层次：
1. 提供众多现成轮子，不用自己写代码
2. 如果没有现成轮子，那么用[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)代码生成工具，生成数据库的增删改查页面（是直接生成页面，不是生成接口）
3. 如果schema2code搞不定，需要手写代码，那么使用[clientDB](https://uniapp.dcloud.net.cn/uniCloud/clientdb)，将节省80%的服务端开发工作
4. HBuilderX在云端协同中提供工具助力
5. 端和云的语言统一，提高了沟通效率、招聘效率
6. 代码量的减少到原来的十分之一，让code review效率和测试的效率也提升了十倍
7. serverless让开发者专注于业务，无需分心运维

我们来依次展开介绍每一层。

#### 第一层提效：提供众多现成的轮子
这是云端一体生态里最容易理解的价值：大量开源模块。

以前的开源模块，基本端是端、云是云，没听说过云端一体的开源模块。

以用户模块为例，其实它有前端、也有云端。前端有注册、登录、修改密码等页面，云端有对应的逻辑代码和数据库。

现在有了uni-id，一个开源的、功能完善的、云端一体的用户模块。立即节省数人月的开发工作量。

下面列举些常用的轮子

**1. 官方维护的插件**

- uni-id：不用再开发用户系统。用户注册、登录（含社交登录、短信验证码登录、App一键登录）、修改或重置密码、token管理、图形验证码、RBAC权限角色系统...所有与用户相关的，不管前端还是云端，代码都是现成的。[详见](https://uniapp.dcloud.net.cn/uniCloud/uni-id)
- uniPay：不管微信还是支付宝，不管App、微信小程序、还是支付宝小程序，不管前端还是服务端，一切都现成的，拿来即用。[详见](https://uniapp.dcloud.net.cn/uniCloud/unipay)
- uSearch：云端一体搜索。搜索页面、输入联想、搜索历史记录、热搜词分析提取...一应俱全。[详见](https://ext.dcloud.net.cn/plugin?id=3851)
- uni-starter：云端一体应用快速开发基本项目模版，实现快速搭建一款应用。它集成了很多通用的功能，比如登录注册、头像、设置、拦截器、banner...[详见](https://ext.dcloud.net.cn/plugin?id=5057)
- uniCloud Admin：全端可用的admin后台。自带用户管理、权限管理、角色管理、菜单管理。更有众多admin插件，比如cms插件、banner管理插件、App升级管理插件...[详见](https://uniapp.dcloud.net.cn/uniCloud/admin)
- uni-file-picker：前端直传uniCloud存储组件。[详见](https://ext.dcloud.net.cn/plugin?id=4079)
- uni-captcha：云端一体图形验证码组件。[详见](https://ext.dcloud.net.cn/plugin?id=4048)

**2. 社区的优秀插件**

- cms
- 城市选择
- banner管理
- 留言反馈
- IM
- 日志管理
- 敏感词过滤
- push
- 图表统计

**3. 项目模板**

上面的轮子，是与业务无关的通用轮子。除此之外，还有大量的云端一体的项目模板。
使用这些现成的项目模板，那开发效率更是极大幅的提升。过去5、6人月的项目，现在几天就能搞定上线！

|				|			|					|
|--				|--			|--					|
|电商			|博客		|排班				|
|网赚合成游戏	|社交		|预约预订			|
|O2O			|短视频		|家谱				|
|外卖			|音乐		|头像挂件			|
|影视			|记账		|人像抠图、漫画脸	|
|新闻			|考勤打卡	|红包封面			|


在这里，我们还必须提到2个新概念：`uni_module`和`datacom`。
- uni_module：云端一体组件最佳的承载方式。传统的npm无法处理云端一体的需求，把前端和云端的代码，一起打包到一个uni_module中，整体传播与发布，对云端一体组件的生态有重大的帮助。[详见](https://uniapp.dcloud.net.cn/uni_modules)
- datacom：datacom是一种在前端绑定后端数据源的组件。[详见](https://uniapp.dcloud.net.cn/component/datacom)

优良的模块化方案让生态越发繁荣。

#### 第二层提效：schema2code自动生成代码

如果在第一层提效中，找不到现成的轮子，需要自己写代码时。那么首先要做的，是使用[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)这个神器，自动生成代码。

uniCloud云数据的schema，是一项重要的创新。
为数据表编写schema，可以实现非常多功能：数据结构定义、权限管理、数据值域管理，以及非常神奇的功能 -- 《[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)》

在传统开发中，有了数据库，可以生成crud后台接口。然后前端再写代码调用接口。

但在uni云端一体生态中，有了数据库的schema，可以直接生成云端一体的页面。而不仅仅是只生成接口。

[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)，可以生成手机端的列表、详情或增删改页面，也可以生成admin管理端的所有数据管理功能的页面。

如下是[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)的操作演示视频：

<video style="width:50vw;height:28vw;" id="video" preload="none" controls="controls"
	poster="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b537e2ca-0f4e-4ff0-a097-48fdeafb9873/bfcc37f1-389f-40e9-a538-bf6d53ab0990.mp4?x-oss-process=video/snapshot,t_1000,f_jpg" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b537e2ca-0f4e-4ff0-a097-48fdeafb9873/bfcc37f1-389f-40e9-a538-bf6d53ab0990.mp4"></video>


可以实战体验这个[云端一体通讯录](https://ext.dcloud.net.cn/plugin?id=2574)的项目，几乎没有单独写代码。设计好通讯录的表schema，用[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)即可生成这个项目。

前述提到的返乡人员管理项目，之所以只花费了半小时就可以做好，也是[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)的功劳。

数据的权限管理也很简单，在schema中可以快速定义指定的数据记录或字段，只能由什么样角色或权限的人来操作。

数据入库的值域校验就更简单了。传统开发中，一个手机号的校验，需要在前端页面写一遍，服务器入库前再检查一遍，很多余。既然云端协同了，自然会优化掉这个问题。

现在只需在DB Schema中定义好手机号这个字段的可选值域，比如一个正则，那么[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)将自动生成前端表单，且遵循schema的定义，只接受相同正则。

这样不但提高了开发效率，还可以避免传统开发中各种漏洞，保持严谨和一致性。

[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)生成的代码清晰易读，易于二次开发。这比低代码平台更有效率、且完全开放开源，随意扩展。


#### 第三层提效：clientDB，让服务器代码减少80%

如果schema2code仍不能满足你的需求，需要单独开发，那么只要操作数据库，[clientDB](https://uniapp.dcloud.net.cn/uniCloud/clientdb)就是推荐使用的利器。

传统开发中，前端写request联网，后台写接收请求去查库，再返给前端，然后前台再绑定到data上....天天干这么枯燥的事情不烦吗？

uni-app提供了`<unicloud-db>`组件（代码块触发键是udb），在前端直接访问数据库，前所未有的高效和简洁，在大多数场景下完全不用写服务器代码！

比如uniCloud的云数据库有个user表，里面有字段id、name，查询id=1的用户数据，把名字显示在界面上，写法如下：

```html
<template>  
  <view>  
    <unicloud-db v-slot:default="{data, loading, error, options}" collection="user" field="name" :getone="true" where="id=='1'">  
      <view>  
          {{ data.name}}  
      </view>  
    </unicloud-db>  
  </view>  
</template>
```

是的，仅需5行代码，就可以完成过去前后端合计得写几十行代码才能完成的事情，代码量大幅减少到原来的十分之一。

无需担心前端直接访问数据库会造成安全隐患，上一节提过了DB Schema，在云端的schema中可以定义什么角色可以操作数据库。[详见](https://uniapp.dcloud.net.cn/uniCloud/schema?id=permission)

clientDB技术，有前端的[JS API](https://uniapp.dcloud.net.cn/uniCloud/clientdb)和[前端组件](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db)，为了进一步提高开发效率，clientDB还提供了几大利器：
[JQL](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=jsquery)是一种基于js的数据库操作语言，它改进了SQL语言的诸多不便之处。
- 在传统mysql或MongoDB中，联表查询的写法非常麻烦，tree查询mysql根本没有，需要oracle等专业数据库。但在uniCloud中，只需在数据库的schema中定义两个表的字段之间的关系，比如是引用关系（foreignKey）、还是父子关系(parentKey)，前端就可以直接查询，轻松完成[联表查询](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup)和[tree查询](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=gettree)
- SQL语言的运算方法非常少，而JQL则提供了大量的运算方法，比如日期运算dayOfMonth()、字符串操作方法substr()、数字运算方法add()...可以对数据库字段的值直接进行运算和筛选。比如对数据库2个字段进行加权求和然后排序，这传统的SQL语句可搞不定了

可以看出，在uni云端一体生态中，开发者不但提高了效率、减少了成本，还得到了更强大的赋能工具。

#### 第四层提效：HBuilderX工具助力

HBuilderX、uni-app、uniCloud是三位一体、高效协同的。

HBuilderX提升了uni-app的开发效率，自然也将提升uniCloud的开发效率。并且三位一体，实现了以前无法想象的新突破。

以下图为例：

在传统开发中，item是一个通过request返回的json，ide是不可能知道这个json的数据结构的，也就无法提示。

由于三位一体协同，HBuilderX可以解析本地schema文件，直接提示item后面的数据结构。避免开发者写错代码、减少服务器联调工作。
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/88f093d0-1abd-487d-bf24-e0627c471977.jpg)


#### 第五层提效：语言统一的价值

前端和云端都使用js编程语言，提高了沟通效率。

js和其他服务器语言，比如php或java，在过去需要Mock来翻译，这很多余。

在实际开发中，开发商应该安排人员按业务分工，专注于业务，一个业务模块的前端后端都由一个人负责。开发效率会比以前更高。

由于统一了技术栈，招聘效率、管理效率也会相应提升。。

#### 第六层提效：测试效率的提升

代码量的减少到原来的十分之一，这自然可以让code review效率和白盒测试的效率也提升了十倍。

黑盒测试中，前后端对不齐的bug、权限漏洞等发生的概率也大幅减少。

现在，开发、测试都将变的更加轻松。

#### 第七层提效：serverless让开发者专注于业务，无需分心运维

因为serverless的免运维特点，开发商再也不用操心扩容、高并发、ddos攻击、安全漏洞补丁等一系列麻烦事。只需专注于自己的业务。


uniCloud是开发界的革命。在HBuilderX、uni-app、uniCloud三位一体的协同下、创新的功能设计下、丰富的生态和轮子支持下，开发者的开发效率，超过传统开发10倍以上。

