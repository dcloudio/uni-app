# Android平台内存泄漏排查教程

> HBuilderX4.81+版本真机运行支持自动检测内存泄漏  

## 内存泄漏概念

内存泄漏（Memory Leak）是指应用在申请内存后，无法释放已申请的内存空间，导致系统无法再次将该内存分配给其他应用使用。在Android应用中，内存泄漏会导致：

- **应用内存占用不断增长**：随着时间推移，应用占用的内存越来越多
- **性能下降**：可用内存减少，导致频繁的垃圾回收，影响应用流畅度
- **OOM（Out Of Memory）错误**：严重时会导致应用崩溃
- **系统卡顿**：影响整个系统的性能表现

### 内存泄漏的本质
在Java/Kotlin中，当一个对象不再被需要时，垃圾回收器（GC）应该能够回收它占用的内存。但如果该对象仍然被其他对象持有引用，GC就无法回收它，从而造成内存泄漏。

## 常见内存泄漏

常见的Android内存泄漏类型包括：
- 静态变量持有Activity/Context引用
- 全局集合对象持有UI元素引用
- 响应式数据（Vue data）被全局引用
- 监听器、回调未及时注销
- 资源（文件、网络连接）未关闭



## HBuilderX 自动检测内存泄漏

Android平台`标准基座`及`自定义调试基座`已集成内存泄漏检测工具 [LeakCanary](https://github.com/square/leakcanary)，通过HBuilderX真机运行时会自动检测内存泄漏。

### LeakCanary介绍
LeakCanary是Square公司开源的Android内存泄漏检测库，它能够：
- **自动检测**：无需手动触发，自动监控Activity、Fragment等组件的生命周期
- **详细报告**：提供完整的引用链路径，帮助定位泄漏源头
- **实时通知**：发现泄漏时立即在控制台输出详细信息

如果发现内存泄漏，在HBuilderX控制台中会显示内存泄漏信息，包括详细的引用链分析日志。

![img](https://web-ext-storage.dcloud.net.cn/doc/hx/leak_hx.png)


## 如何解决内存泄漏问题

### 日志结构解析

LeakCanary输出的内存泄漏日志包含以下关键信息：

#### 头部信息
```
[retained bytes] bytes retained by leaking objects
```
- **retained bytes**：泄漏对象占用的内存大小

#### 引用链分析
```
┬───
│ GC Root: Input or output parameters in native code
│
├─ [引用链节点]
│    Leaking: YES/NO (原因说明)
│    ↓ 引用字段名
╰→ [最终泄漏对象]
     Leaking: YES (泄漏原因)
```

### 关键字段含义
- **GC Root**：垃圾回收的根节点
- **Leaking: YES/NO**：该对象是否泄漏
- **↓**：引用方向，表示从上一个对象指向下一个对象
- **Retaining X kB in Y objects**：该对象持有的内存和对象数量
- **mDestroyed = true**：Activity已被销毁但仍被引用

### 泄漏日志分析技巧

在分析内存泄漏日志时，可以运用以下技巧快速定位问题：

- **关注包名定位泄漏源**：
  - **UTS插件泄漏**：如果引用链中出现 `uts.sdk.modules` 开头的包名，通常表示泄漏发生在某个UTS插件中。应重点排查该插件的静态变量、全局集合或未注销的监听器。
  - **uvue页面泄漏**：如果引用链中出现 `uni.${appid}`（如 `uni.UNI511CEBA`）开头的类名，这通常指向一个uvue页面。泄漏很可能与该页面的全局变量、`data`中被外部引用的数据或未在 `onUnload` 生命周期中清理的资源有关。

- **识别关键引用字段**：
  - LeakCanary日志中带有下划波浪线（`~`）的变量（例如 `↓ static IndexKt.leakActivitys` 下的 `~~~~~~~~~~~~~`）是核心线索。它明确指出了是哪个字段持有了对下一个对象的引用。沿着这些带波浪线的字段追溯，就能完整地理解整个引用链，找到泄漏的根源。


## 内存泄漏问题案例分析

### 案例1：UTS插件静态变量持有Activity引用

#### 问题代码
```js
//UTS插件中
import Activity from "android.app.Activity";

const leakActivitys: Activity[] = []  // 应用级全局变量

export function leakActivity() {
    const topActivity = UTSAndroid.getTopPageActivity()
    if (topActivity != null) {
        leakActivitys.push(topActivity)
    }
}
```

#### 页面调用
```js
import { leakActivity } from "@/uni_modules/leak-leakcanary"
export default {
    data() {
        return {}
    },
    onReady() {
        leakActivity()
    },
    methods: {}
}
```

#### 泄漏日志分析
```
┬───
│ GC Root: Input or output parameters in native code
│
├─ dalvik.system.PathClassLoader instance
│    Leaking: NO (IndexKt↓ is not leaking and A ClassLoader is never leaking)
│    ↓ ClassLoader.runtimeInternalObjects
├─ java.lang.Object[] array
│    Leaking: NO (IndexKt↓ is not leaking)
│    ↓ Object[890]
├─ uts.sdk.modules.leakLeakcanary.IndexKt class  // UTS插件类
│    Leaking: NO (a class is never leaking)
│    ↓ static IndexKt.leakActivitys               // 问题根源：静态变量
│                     ~~~~~~~~~~~~~
├─ io.dcloud.uts.UTSArray instance               // UTS数组
│    Leaking: UNKNOWN
│    Retaining 212.3 kB in 3987 objects
│    ↓ ArrayList.elementData
│                ~~~~~~~~~~~
├─ java.lang.Object[] array
│    Leaking: UNKNOWN
│    Retaining 212.3 kB in 3986 objects
│    ↓ Object[0]
│            ~~~
╰→ io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity instance
     Leaking: YES (ObjectWatcher was watching this because io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity
     received Activity#onDestroy() callback and Activity#mDestroyed is true)  // Activity已销毁但仍被引用
     Retaining 52.9 kB in 994 objects
     key = 2abb5312-246c-4978-8f88-fd1a4aad7403
     watchDurationMillis = 12084
     retainedDurationMillis = 7084
```

#### 泄漏原因分析
1. **静态变量持有引用**：`static IndexKt.leakActivitys` 是静态变量，生命周期与应用相同
2. **Activity已销毁**：`Activity#mDestroyed is true` 表明Activity已经调用了onDestroy()
3. **引用链完整**：从GC Root → 类加载器 → UTS插件类 → 静态数组 → Activity
4. **内存占用**：泄漏的Activity持有52.9 kB内存和994个对象

#### 解决方案
```js
import Activity from "android.app.Activity";

const leakActivitys: Activity[] = [] // 应用级全局变量

export function leakActivity() {
    const topActivity = UTSAndroid.getTopPageActivity()
    if (topActivity != null) {
        leakActivitys.push(topActivity)
    }
}

// 添加清理方法 - 移除特定Activity
export function removeActivity(activity: Activity) {
    const index = leakActivitys.indexOf(activity)
    if (index > -1) {
        leakActivitys.splice(index, 1)
    }
}

// 页面销毁时移除当前Activity
export function removeCurrentActivity() {
    const topActivity = UTSAndroid.getTopPageActivity()
    if (topActivity != null) {
        removeActivity(topActivity)
    }
}
```

**页面中正确使用：**
```js
import { leakActivity, removeCurrentActivity } from "@/uni_modules/leak-leakcanary"
export default {
    data() {
        return {}
    },
    onReady() {
        leakActivity()
    },
    onUnload() {
        // 页面销毁时清理引用
        removeCurrentActivity()
    },
    methods: {}
}
```

---

### 案例2：全局变量持有UniElement引用

#### 问题代码
```js
//uvue中
let globalElement: UniElement[] = [] // 应用级全局变量
export default {
    data() {
        return {
            element: null as UniElement | null
        }
    },
    onReady(){
        this.element = uni.getElementById("xx")
        if (this.element != null) {
            globalElement.push(this.element)
        }
    },
    methods: {}
}
```

#### 泄漏日志分析
```
┬───
│ GC Root: Input or output parameters in native code
│
├─ dalvik.system.PathClassLoader instance
│    Leaking: NO (IndexKt↓ is not leaking and a ClassLoader is never leaking)
│    ↓ ClassLoader.runtimeInternalObjects
├─ java.lang.Object[] array
│    Leaking: NO (IndexKt↓ is not leaking)
│    ↓ Object[1658]
├─ uni.UNI511CEBA.IndexKt class               // 页面编译后的类
│    Leaking: NO (a class is never leaking)
│    ↓ static IndexKt.globalElement           // 问题：全局变量持有元素
│                     ~~~~~~~~~~~~~
├─ io.dcloud.uts.UTSArray instance
│    Leaking: UNKNOWN
│    Retaining 632.6 kB in 10655 objects     // 大量内存被占用
│    ↓ ArrayList.elementData
│                ~~~~~~~~~~~
├─ java.lang.Object[] array
│    Leaking: UNKNOWN
│    Retaining 632.5 kB in 10654 objects
│    ↓ Object[0]
│            ~~~
├─ io.dcloud.uniapp.runtime.UniTextElementImpl instance  // UniElement实例
│    Leaking: UNKNOWN
│    Retaining 105.6 kB in 1778 objects
│    ↓ PropsNode.pageNode                     // 元素持有页面节点
│                ~~~~~~~~
├─ io.dcloud.uniapp.dom.node.PageNode instance
│    Leaking: UNKNOWN
│    Retaining 102.9 kB in 1712 objects
│    ↓ PageNode.frameView                     // 页面节点持有框架视图
│               ~~~~~~~~~
├─ io.dcloud.uniapp.appframe.ui.PageFrameView instance
│    Leaking: YES (View.mContext references a destroyed activity)  // 视图持有已销毁的Activity
│    Retaining 2.1 kB in 42 objects
│    View not part of a window view hierarchy
│    View.mAttachInfo is null (view detached)
│    View.mID = R.id.null
│    View.mWindowAttachCount = 1
│    mContext instance of io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity with mDestroyed = true
│    ↓ View.mContext
╰→ io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity instance
     Leaking: YES (ObjectWatcher was watching this because io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity
     received Activity#onDestroy() callback and Activity#mDestroyed is true)
     Retaining 48.3 kB in 971 objects
```

#### 泄漏原因分析
1. **全局变量持有UI元素**：`static IndexKt.globalElement` 全局数组持有UniElement
2. **UI元素持有页面引用**：UniElement → PageNode → PageFrameView → Activity
3. **视图与Activity绑定**：`View.mContext references a destroyed activity`
4. **引用链路径**：全局数组 → UI元素 → 页面视图 → 已销毁的Activity

#### 解决方案
```js
let globalElement: UniElement[] = [] // 应用级全局变量
export default {
    data() {
        return {
            element: null as UniElement | null
        }
    },
    onReady(){
        this.element = uni.getElementById("xx")
        if (this.element != null) {
            globalElement.push(this.element)
        }
    },
    onUnload() {
        // 页面销毁时移除特定元素引用
        if (this.element != null) {
            const index = globalElement.indexOf(this.element)
            if (index > -1) {
                globalElement.splice(index, 1)
            }
            this.element = null
        }
    },
    methods: {}
}
```

---

### 案例3：响应式数据（Vue data）被全局引用

#### 问题代码
```js
let globalElement: UniElement[][] = [] // 应用级全局变量
export default {
    data() {
        return {
            elements: [] as UniElement[]  // Vue响应式数组
        }
    },
    onReady(){
        const element1 = uni.getElementById("xx")
        const element2 = uni.getElementById("yy")
        
        if (element1 != null) {
            this.elements.push(element1)
        }
        if (element2 != null) {
            this.elements.push(element2)
        }
        globalElement.push(this.elements)  // 将响应式数组推入全局数组
    },
    methods: {}
}
```

#### 泄漏日志分析
```
┬───
│ GC Root: Input or output parameters in native code
│
├─ dalvik.system.PathClassLoader instance
│    Leaking: NO (IndexKt↓ is not leaking and A ClassLoader is never leaking)
│    ↓ ClassLoader.runtimeInternalObjects
├─ java.lang.Object[] array
│    Leaking: NO (IndexKt↓ is not leaking)
│    ↓ Object[2146]
├─ uni.UNI511CEBA.IndexKt class
│    Leaking: NO (a class is never leaking)
│    ↓ static IndexKt.globalElement           // 全局变量
│                     ~~~~~~~~~~~~~
├─ io.dcloud.uts.UTSArray instance
│    Leaking: UNKNOWN
│    Retaining 541.6 kB in 9236 objects
│    ↓ ArrayList.elementData
│                ~~~~~~~~~~~
├─ java.lang.Object[] array
│    Leaking: UNKNOWN
│    Retaining 541.5 kB in 9235 objects
│    ↓ Object[0]
│            ~~~
├─ io.dcloud.uniapp.vue.UTSReactiveArray instance  // 关键：Vue响应式数组
│    Leaking: UNKNOWN
│    Retaining 108.1 kB in 1844 objects
│    ↓ UTSReactiveArray.__v_raw               // 响应式数组的原始数据
│                       ~~~~~~~
├─ io.dcloud.uts.UTSArray instance            // 原始数组
│    Leaking: UNKNOWN
│    Retaining 108.1 kB in 1843 objects
│    ↓ ArrayList.elementData
│                ~~~~~~~~~~~
├─ java.lang.Object[] array
│    Leaking: UNKNOWN
│    Retaining 108.1 kB in 1842 objects
│    ↓ Object[0]
│            ~~~
├─ io.dcloud.uniapp.runtime.UniTextElementImpl instance
│    Leaking: UNKNOWN
│    Retaining 2.7 kB in 66 objects
│    ↓ PropsNode.pageNode
│                ~~~~~~~~
├─ io.dcloud.uniapp.dom.node.PageNode instance
│    Leaking: UNKNOWN
│    Retaining 102.6 kB in 1709 objects
│    ↓ PageNode.frameView
│               ~~~~~~~~~
├─ io.dcloud.uniapp.appframe.ui.PageFrameView instance
│    Leaking: YES (View.mContext references a destroyed activity)
│    Retaining 2.0 kB in 41 objects
│    View not part of a window view hierarchy
│    View.mAttachInfo is null (view detached)
│    View.mID = R.id.null
│    View.mWindowAttachCount = 1
│    mContext instance of io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity with mDestroyed = true
│    ↓ View.mContext
╰→ io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity instance
     Leaking: YES (ObjectWatcher was watching this because io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity
     received Activity#onDestroy() callback and Activity#mDestroyed is true)
     Retaining 48.1 kB in 969 objects
```

#### 泄漏原因分析
1. **响应式数组被全局引用**：`UTSReactiveArray` 是Vue的响应式数组
2. **双重引用结构**：响应式数组包含原始数组（`__v_raw`），形成双重持有
3. **复杂引用链**：全局数组 → 响应式数组 → 原始数组 → UI元素 → Activity
4. **Vue内部机制**：响应式数组内部持有原始数据的引用，增加了泄漏风险

#### 解决方案
```js
let globalElement: UniElement[][] = [] // 应用级全局变量
export default {
    data() {
        return {
            elements: [] as UniElement[]
        }
    },
    onReady(){
        const element1 = uni.getElementById("xx")
        const element2 = uni.getElementById("yy")
        
        if (element1 != null) {
            this.elements.push(element1)
        }
        if (element2 != null) {
            this.elements.push(element2)
        }
        // 避免直接推入响应式数组，使用副本
        globalElement.push([...this.elements])
    },
    onUnload() {
        // 找到并移除当前页面的elements数组
        const index = globalElement.indexOf(this.elements)
        if (index > -1) {
            globalElement.splice(index, 1)
        }
        // 清空当前页面的elements数组
        this.elements.splice(0, this.elements.length)
    },
    methods: {}
}
```


### 案例4：全局监听回调持有页面`this`引用

#### 问题代码
```javascript
//uvue中
export default {
    data() {
        return {}
    },
    onReady() {
        // 注册一个全局应用主题变化监听器
        // 回调函数隐式地捕获了当前页面的`this`实例
        uni.onAppThemeChange(()=>{
            console.log("Theme changed, page this:", this);
        })
    },
    methods: {}
}
```

#### 泄漏日志分析
```
┬───
│ GC Root: Thread object
│
├─ android.os.HandlerThread instance
│    Leaking: NO (PathClassLoader↓ is not leaking)
│    Thread name: 'LeakCanary-Heap-Dump'
│    ↓ Thread.contextClassLoader
├─ dalvik.system.PathClassLoader instance
│    Leaking: NO (UniAppThemeManager↓ is not leaking and A ClassLoader is never leaking)
│    ↓ ClassLoader.runtimeInternalObjects
├─ java.lang.Object[] array
│    Leaking: NO (UniAppThemeManager↓ is not leaking)
│    ↓ Object[753]
├─ io.dcloud.uniapp.appframe.UniAppThemeManager class
│    Leaking: NO (a class is never leaking)
│    ↓ static UniAppThemeManager.appThemeChangeListeners  // 问题根源：静态的监听器集合
│                                ~~~~~~~~~~~~~~~~~~~~~~~
├─ java.util.concurrent.ConcurrentHashMap instance
│    Leaking: UNKNOWN
│    Retaining 333.6 kB in 5195 objects
│    ↓ ConcurrentHashMap[instance @322967640 of java.lang.Integer]
│                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
├─ uts.sdk.modules.DCloudUniTheme.IndexKt$onAppThemeChange$1$1 instance
│    Leaking: UNKNOWN
│    Retaining 111.0 kB in 1727 objects
│    Anonymous subclass of kotlin.jvm.internal.Lambda
│    ↓ IndexKt$onAppThemeChange$1$1.$callback
│                                   ~~~~~~~~~
├─ uni.UNI511CEBA.GenPagesFourthFourth$1$1 instance // 页面生成的回调函数实例
│    Leaking: UNKNOWN
│    Retaining 111.0 kB in 1726 objects
│    Anonymous subclass of kotlin.jvm.internal.Lambda
│    ↓ GenPagesFourthFourth$1$1.this$0  // 关键：回调函数持有页面的`this`引用
│                               ~~~~~~
├─ uni.UNI511CEBA.GenPagesFourthFourth instance // 页面实例
│    Leaking: UNKNOWN
│    Retaining 111.0 kB in 1725 objects
│    ↓ Page.$nativePage
│           ~~~~~~~~~~~
├─ io.dcloud.uniapp.appframe.UniNativePageImpl instance
│    Leaking: UNKNOWN
│    Retaining 764 B in 23 objects
│    ↓ UniNativePageImpl.container
│                        ~~~~~~~~~
├─ io.dcloud.uniapp.appframe.ui.PageFrameView instance
│    Leaking: YES (View.mContext references a destroyed activity)
│    ↓ View.mContext
╰→ io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity instance
​     Leaking: YES (ObjectWatcher was watching this because io.dcloud.uniapp.appframe.activity.UniPortraitPageActivity received Activity#onDestroy() callback and Activity#mDestroyed is true)
```

#### 泄漏原因分析
1.  **静态监听器集合**：`uni.onAppThemeChange` 将回调函数存储在一个静态的、全局的 `UniAppThemeManager.appThemeChangeListeners` 集合中。这个集合的生命周期与整个应用相同。
2.  **回调函数捕获`this`**：日志中的 `GenPagesFourthFourth$1$1.this$0` 字段明确指出，传递给监听器的回调函数（Lambda）捕获了其所在的页面实例的 `this` 引用。
3.  **形成强引用链**：一条无法被打破的强引用链形成：`静态管理器` → `静态监听器集合` → `回调函数实例` → `页面实例(this)` → `Activity`。
4.  **页面无法释放**：当页面关闭并销毁时，由于这个全局的引用链依然存在，垃圾回收器无法回收页面实例及其关联的Activity，导致内存泄漏。

#### 解决方案
对于这种基于回调的监听器，必须在页面销毁时手动注销监听，切断引用链。

```javascript
export default {
    data() {
        return {
            callbackId: -1
        }
    },
    onReady() {
        // 注册监听
        this.callbackId = uni.onAppThemeChange(() => {
            console.log("Theme changed, page this:", this);
        })
    },
    onUnload() {
        // 页面销毁时，必须注销监听
        uni.offAppThemeChange(this.callbackId)
    },
    methods: {}
}
```



## 内存泄漏问题实践总结

### 1. 识别泄漏模式
通过日志关键信息快速识别泄漏类型：
- 看到 `static` 字段：静态变量泄漏
- 看到 `UTSReactiveArray`：Vue响应式数据泄漏

### 2. 生命周期管理
- **onReady** 中添加的引用在 **onUnload** 中移除

### 3. 避免常见陷阱
- 不在全局变量中直接持有UI元素或Activity
- 注意Vue响应式数据的特殊性，避免将其推入全局集合
- 及时清理监听器、定时器等长生命周期资源