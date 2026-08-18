<!-- ## unicloud-db -->

::: sourceCode
## unicloud-db
:::

> 组件类型：[UniCloudDBElement](#uniclouddbelement) 

 是一个数据库查询组件，它将clientDB的API封装为组件，进一步减少开发者使用所需的代码量。


### 兼容性 <Help />
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.25 | 3.93 | 4.11 | 4.61 |


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| id | string([string.IDString](/uts/data-type.md#ide-string)) | Web: -; 微信小程序: -; 支付宝小程序: 5.25; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS: 4.61 | 唯一标识 |
| v-slot:default | string | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | {data, loading, hasMore, pagination, error} |
| collection | string([string.DBCollectionString](/uts/data-type.md#ide-string)) | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 表名 |
| field | string([string.DBFieldString](/uts/data-type.md#ide-string)) | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 查询字段，多个字段用 `,` 分割 |
| where | string([string.JQLString](/uts/data-type.md#ide-string)) | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 查询条件 |
| orderby | string | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 排序字段及正序倒序设置 |
| groupby | string | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 对数据进行分组 |
| group-field | string | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 对数据进行分组统计 |
| distinct | boolean | Web: 4.0; 微信小程序: -; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11 | 是否对数据查询结果中重复的记录进行去重 |
| page-data | string | Web: 4.0; 微信小程序: -; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | add 多次查询的集合, replace 当前查询的集合 |
| page-current | number | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 当前页 |
| page-size | number | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 每页数据数量 |
| getone | boolean | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: x; iOS: x; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.0 | 指定查询结果是否返回数组第一条数据，默认 false。在false情况下返回的是数组，即便只有一条结果，也需要\[0]的方式获取。在true下，直接返回结果数据，少一层数组 |
| getcount | boolean | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 是否查询总数量 |
| gettree | boolean | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 是否查询树状结构数据 |
| startwith | string | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | gettree的第一层级条件，此初始条件可以省略，不传startWith时默认从最顶级开始查询 |
| limitlevel | number | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | gettree查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1 |
| manual | boolean | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 是否手动加载数据，默认为 false，页面onLoad时自动联网加载数据 |
| loadtime | string | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 加载数据时机，默认auto，可选值 auto\|onready\|manual |
| ~~action~~ | string([string.ClientDBActionString](/uts/data-type.md#ide-string)) | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: x; iOS: x; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.0 | 云端执行数据库查询的前或后，触发某个action函数操作，进行预处理或后处理(推荐改用JQL触发器) |
| @load | (data : Array\<UTSJSONObject>, ended : boolean, pagination : [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 成功回调。如联网返回结果后，想修改下数据再渲染界面，则在本方法里对data进行修改 |
| @error | (event: [UniEvent](/component/common.md#unievent)) => void | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 失败回调 |

#### v-slot:default 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| data | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 查询结果，类型为Array\<UTSJSONObject> |
| loading | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 查询中的状态。可根据此状态，在template中通过v-if显示等待内容 |
| hasMore | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 是否有更多数据。可根据此状态，在template中通过v-if显示没有更多数据了 |
| error | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 查询错误。可根据此状态，在template中通过v-if显示等待内容 |
| pagination | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 分页属性 |

##### pagination 的属性描述

| 合法值 | 描述 |
| :- | :- |
| current | 当前页号 |
| size | 分页大小 |
| count | 数据库的总数据量, 设置 :getcount=true 时有效 |

#### distinct 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| true | Web: -; 微信小程序: 4.41; 支付宝小程序: 5.25; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 去重 |
| false | Web: -; 微信小程序: -; 支付宝小程序: 5.25; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 不去重 |

#### page-data 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| add | Web: -; 微信小程序: 4.41; 支付宝小程序: 5.25; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS: 4.61 | 多次查询的集合 |
| replace | Web: -; 微信小程序: -; 支付宝小程序: 5.25; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS: 4.61 | 当前查询的集合 |

#### loadtime 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 页面就绪后或属性变化后加载数据，默认为auto |
| onready | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 页面就绪后不自动加载数据，属性变化后加载。适合在onLoad中接收上个页面的参数作为where条件时 |
| manual | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.25; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61 | 手动模式，不自动加载数据。如果涉及到分页，需要先手动修改当前页，在调用加载数据 |



### UniCloudDBElement

#### UniCloudDBElement 的属性值
| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| dataList | Array\<UTSJSONObject> | 是 | 已加载的数据 |
#### UniCloudDBElement 的方法
##### loadData(options?: UTSJSONObject \| null): void @loaddata
加载数据
当 \<unicloud-db> 组件的 manual 属性设为 true 或者 loadtime 属性设置为 manual 时，不会在页面初始化时联网查询数据，此时需要通过本方法在需要的时候手动加载数据。

##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **UniCloudDBComponentLoadDataOptions** | 否 | 可选参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 描述 |
| :- | :- | :- | :- | :- |
| clear | boolean | 否 | false | 是否清空数据 |
| current | number | 否 |  | 当前第几页 |
| success | (res?: T) => void | 否 |  | 成功回调 |
| fail | (err?: any) => void | 否 |  | 失败回调 |
| complete | () => void | 否 |  | 完成回调 | 




##### loadMore(): void @loadmore
加载更多数据
在列表的加载下一页场景下，使用ref方式访问组件方法，加载更多数据，每加载成功一次，当前页 +1





##### add(value: UTSJSONObject, options?: UTSJSONObject \| null): void @add
新增数据

##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| value | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 新增数据. |
| options | **UniCloudDBComponentAddOptions** | 否 | 可选参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 描述 |
| :- | :- | :- | :- | :- |
| showToast | boolean | 否 | true | 是否显示 Toast |
| toastTitle | string | 否 |  | Toast 标题 |
| needLoading | boolean | 否 | true | 是否需要 Loading |
| loadingTitle | string | 否 |  | Loading 标题 |
| success | (res?: T) => void | 否 |  | 成功回调 |
| fail | (err?: any) => void | 否 |  | 失败回调 |
| complete | () => void | 否 |  | 完成回调 | 




##### remove(): void @remove
移除数据





##### remove(id?: any, options?: UTSJSONObject \| null): void @remove


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| id | any | 否 |
| options | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | 




##### update(id: string, value: UTSJSONObject, options?: UTSJSONObject \| null): void @update
更新数据

##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| id | string | 是 | 数据库字段的唯一标识. |
| value | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 需要修改的新数据. |
| options | **UniCloudDBComponentUpdateOptions** | 否 | 可选参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 描述 |
| :- | :- | :- | :- | :- |
| showToast | boolean | 否 | true | 是否显示更新后 Toast |
| toastTitle | string | 否 | "" | 更新成功后 Toast 标题 |
| confirmTitle | string | 否 |  | 确认框标题 |
| confirmContent | string | 否 |  | 确认框内容 |
| needConfirm | boolean | 否 | true | 是否显示更新确认框 |
| needLoading | boolean | 否 | true | 是否需要 Loading |
| loadingTitle | string | 否 |  | Loading 标题 |
| success | (res?: T) => void | 否 |  | 成功回调 |
| fail | (err?: any) => void | 否 |  | 失败回调 |
| complete | () => void | 否 |  | 完成回调 | 







### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/unicloud-db/unicloud-db.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/unicloud-db/unicloud-db.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/unicloud-db/unicloud-db

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/unicloud-db/unicloud-db

>示例
```vue
<template>
  <view class="content">
    <page-intro content="本页演示 unicloud-db 云数据库组件：集合查询、分页与 loadtime manual，列表展示与 Add/Get 操作，可跳转通讯录等 mixin-datacom 示例。"></page-intro>
    <unicloud-db ref="udbRef" v-slot:default="{data, pagination, loading, error}" :collection="collection" :getcount="true"
      loadtime="manual">
      <list-view v-if="data.length>0" ref="listViewRef" class="list" :scroll-y="true" @scrolltolower="loadMore()">
        <list-item class="list-item" v-for="(item, _) in data" :key="item.getString('_id')">
          <view class="list-item-fill">
            <text>{{item}}</text>
          </view>
          <view>
            <text class="list-item-remove" @click="remove(item.getString('_id')!)">❌</text>
          </view>
        </list-item>
      </list-view>
      <text class="loading" v-if="loading">Loading...</text>
      <view v-if="error!=null">{{error.errMsg}}</view>
      <view class="pagination" v-if="data.length>0">
        <text class="pagination-item">{{data.length}} / {{pagination.count}}</text>
      </view>
    </unicloud-db>
    <view class="btn-group">
      <button class="btn" @click="add()">Add</button>
      <button class="btn" @click="get()">Get</button>
    </view>
  </view>
</template>

<script setup lang="uts">

const db = uniCloud.databaseForJQL()

// Template refs
const udbRef = ref<UniCloudDBElement | null>(null)
const listViewRef = ref<UniListViewElement | null>(null)

// Data
const collection = ref('unicloud-db-test')
const collectionList = ref([
  db.collection('book').where('name == "水浒传"').getTemp(),
] as UTSJSONObject[])
const isTesting = ref(false)
const addResult = ref({})
const updateResult = ref({})
const removeResult = ref({})

// Methods
function loadMore() {
  udbRef.value!.loadMore()
}

function get() {
  udbRef.value!.loadData({
    clear: true
  })
}

function showError(err : any | null) {
  const error = err as UniCloudError
  uni.showModal({
    content: error.errMsg,
    showCancel: false
  })
}

function add() {
  const value = {
    title: "title-" + Date.now(),
    comment: "comment" + Date.now()
  }
  udbRef.value!.add(value, {
    showToast: false,
    success: (res : UniCloudDBAddResult) => {
      addResult.value = {
        id: res.id
      }
      get()
    },
    fail: (err : any | null) => {
      showError(err)
    }
  })
}

function update(id : string) {
  const value = {
    title: "title-" + Date.now(),
    comment: "comment" + Date.now()
  }
  udbRef.value!.update(id, value, {
    showToast: false,
    needLoading: true,
    needConfirm: false,
    loadingTitle: "正在更新...",
    success: (res : UniCloudDBUpdateResult) => {
      updateResult.value = {
        updated: res.updated
      }
    },
    fail: (err : any | null) => {
      showError(err)
    }
  })
}

function remove(id : string) {
  udbRef.value!.remove(id, {
    showToast: false,
    needConfirm: false,
    needLoading: false,
    success: (res : UniCloudDBRemoveResult) => {
      removeResult.value = {
        deleted: res.deleted
      }
      get()
    },
    fail: (err : any | null) => {
      showError(err)
    }
  })
}

function onQueryLoad(data : Array<UTSJSONObject>, ended : boolean, pagination : UTSJSONObject) {
  console.log(data, ended, pagination)
}

// Lifecycle
onReady(() => {
  get()
})

onPullDownRefresh(() => {
  udbRef.value!.loadData({
    clear: true,
    success: (_ : UniCloudDBGetResult) => {
      uni.stopPullDownRefresh()
    }
  })
})

// #ifdef VUE3-VAPOR
let checkMethods = false

function checkUdbRefMethods() : boolean {
  const udb = udbRef.value
  if (udb == null) {
    checkMethods = false
    return checkMethods
  }

  const hasLoadData = udb.loadData != null
  const hasLoadMore = udb.loadMore != null
  const hasAdd = udb.add != null
  const hasRemove = udb.remove != null
  const hasUpdate = udb.update != null

  checkMethods = hasLoadData && hasLoadMore && hasAdd && hasRemove && hasUpdate
  return checkMethods
}

defineExpose({
  checkUdbRefMethods
})

// #endif

</script>

<style>
  .content {
    flex: 1;
    flex-direction: column;
  }

  .list {
    flex: 1;
    flex-direction: column;
  }

  .list-item {
    flex-direction: row;
    padding: 10px;
  }

  .list-item-fill {
    flex: 1;
  }

  .list-item-remove {
    padding: 10px;
  }

  .loading {
    padding: 10px;
    text-align: center;
  }

  .pagination {
    flex-direction: row;
    background-color: #f2f2f2;
  }

  .pagination-item {
    margin: auto;
    padding: 5px 10px;
  }

  .btn-group {
    flex-direction: row;
  }

  .btn {
    flex: 1;
    margin: 10px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.unicloud.unicloud-db)
- [unicloud-db组件教程](https://doc.dcloud.net.cn/uniCloud/unicloud-db.html)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=unicloud-db&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=unicloud-db&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=unicloud-db&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=unicloud-db&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=unicloud-db&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=unicloud-db)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=unicloud-db&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
