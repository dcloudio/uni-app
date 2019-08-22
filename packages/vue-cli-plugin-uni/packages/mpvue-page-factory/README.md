README
===========================
解决mpvue多个页面公用一个vm对象的问题 [mpvue issue 140](https://github.com/Meituan-Dianping/mpvue/issues/140)

### 使用方法:

#### !注意：master分支是基于1.1.2版本的，如果你现有工程用的是1.0.x的版本，因为目录结构不一样会有问题。2个方法解决:

1. 直接使用我的1.0.x的分支，pagckage.json 中添加依赖

```
"mpvue-loader": "git+https://github.com/HelloZJW/mpvue-loader.git#patch1.0.x",
"mpvue-page-factory": "^1.0.0",
```
2. 参考[升级指南](http://mpvue.com/change-log/2018.7.24/)修改工程配置


#### 如果是现有工程使用的是1.1.x版本，直接使用使用[master分支](https://github.com/HelloZJW/mpvue-loader)

pagckage.json 中添加依赖
```
"mpvue-loader": "git+https://github.com/HelloZJW/mpvue-loader.git",
"mpvue-page-factory": "^1.0.0",
```

#### 添加完依赖以后，需要修改页面的main.js入口文件为
 ```javascript
import pageFactory from 'mpvue-page-factory'
import App from './index'

Page(pageFactory(App))
```

### 如果你用了mpvue-entry:

```
"mpvue-loader": "git+https://github.com/HelloZJW/mpvue-loader.git",
"mpvue-page-factory": "^1.0.0",
```
#### 配置方法:
在你的pages.js相同目录下建一个template.js文件，此文件为入口模板；里面内容为:
```
import pageFactory from 'mpvue-page-factory'
import App from '@/App'

Page(pageFactory(App))
```
然后修改build/webpack.base.conf.js 中MpvueEntry.getEntry()方法的入参
```
const entry = MpvueEntry.getEntry({
  pages: './src/pages.js', //可以不填，缺省就是这个
  main: './src/main.js',  //可以不填，缺省就是这个
  template: './src/template.js'
})
```
然后你会发现node_module/mpvue-entry/dist目录里面js文件内容发生了变化。

![image](https://user-images.githubusercontent.com/8361397/45264454-43671a00-b46f-11e8-8b4f-ecfd534a4755.png)

enjoy，其他工程代码不需要修改
