# UTS 运行时已知问题

本文档用于记录与追踪 UTS 运行时的已知问题，便于定位、规避与修复。

##  java.lang.StackOverflowError

### 问题说明

StackOverflowError通常是由于程序中的递归或方法调用链过深，超出了栈的容量。

一般来说现代的移动硬件设备会给每个线程分配足够的栈空间，因此：

+ 绝大多数的栈溢出都是因为程序逻辑问题，触发死循环递归导致

+ 极少部分情况是因为程序复杂，控制不善，真实的压栈过深导致。


### 死循环递归的情况

举例：

```
java.lang.StackOverflowError: stack size 8188KB
11:27:17.144 	at io.dcloud.uts.Map.entrySet(Map.kt:19)
11:27:17.144 	at io.dcloud.px.r.a(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:3)
11:27:17.144 	at io.dcloud.uniapp.runtime.CSSStyleDeclaration.putAll(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:1)
11:27:17.144 	at io.dcloud.uniapp.runtime.UniElementImpl.<init>(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:1381)
11:27:17.144 	at io.dcloud.uniapp.runtime.UniElementImpl.<init>(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:3400)
11:27:17.144 	at io.dcloud.uniapp.runtime.UniViewElementImpl.<init>(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:1)
11:27:17.145 	at io.dcloud.px.v2$d$a.a(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:443)
11:27:17.145 	at io.dcloud.px.v2.createNode(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:5)
11:27:17.145 	at io.dcloud.px.v2.createNode(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:1)
11:27:17.145 	at io.dcloud.uniapp.dom.UniNativeDocumentImpl.createElement(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:10)
11:27:17.145 	at io.dcloud.uniapp.dom.UniNativeDocumentImpl.createElement(r8-map-id-46ae994bfc64fb01690a5f42986f2c98bdb324bdb5ac5c3a8f6a1696d1eb4611:4)
11:27:17.145 	at io.dcloud.uniapp.vue.IndexKt.mountElement(index.kt:7044)
11:27:17.145 	at io.dcloud.uniapp.vue.IndexKt.processElement(index.kt:6654)
11:27:17.145 	at io.dcloud.uniapp.vue.IndexKt.patch(index.kt:6585)
11:27:17.145 	at io.dcloud.uniapp.vue.IndexKt.mountChildren(index.kt:7093)
11:27:17.145 	at io.dcloud.uniapp.vue.IndexKt.mountChildren$default(index.kt:7087)
11:27:17.145 	at io.dcloud.uniapp.vue.IndexKt.mountElement(index.kt:7054)
11:27:17.146 	at io.dcloud.uniapp.vue.IndexKt.processElement(index.kt:6654)
11:27:17.146 	at io.dcloud.uniapp.vue.IndexKt.patch(index.kt:6585)
11:27:17.146 	at io.dcloud.uniapp.vue.IndexKt.mountChildren(index.kt:7093)
11:27:17.146 	at io.dcloud.uniapp.vue.IndexKt.mountChildren$default(index.kt:7087)
11:27:17.146 	at io.dcloud.uniapp.vue.IndexKt.mountElement(index.kt:7054)
11:27:17.146 	at io.dcloud.uniapp.vue.IndexKt.processElement(index.kt:6654)
11:27:17.146 	at io.dcloud.uniapp.vue.IndexKt.patch(index.kt:6585)

```

真实的日志大约4000多行，每一行都是对应的方法栈帧，与常规的Java异常分析不同，栈溢出的错误分析最后或者最初的几个栈帧没有意义。

我们需要分析是在这4000多行中频繁重复出现的方法。通过分析此日志定位到下面几行代码频繁出现

```
io.dcloud.uniapp.vue.IndexKt.mountChildren(index.kt:7093)
io.dcloud.uniapp.vue.IndexKt.mountChildren$default(index.kt:7087)
io.dcloud.uniapp.vue.IndexKt.mountElement(index.kt:7054)
```

也就是说： mountChildren/mountElement 在一次方法调用中频繁调用自身。这显然是不正常的。

接下来我们的问题就转换为了：

调查 mountChildren/mountElement 多次频繁调用自身的原因，进而解决此问题。


### 压栈过深的情况

还有极少部分情况，开发者的逻辑并没有触发死循环递归，而是因为程序控制不善导致，下面列出常见的场景。

+ 递归深度过大，超出栈容量。

```
function  factorial(n: number):number {
	if (n == 1) return 1;
	return n * factorial(n - 1); // 深度为 n 的递归
}
// 调用 factorial(100000) 可能导致栈溢出
```

+ 非递归方法层层嵌套调用

```
function methodA() { methodB(); }
function methodB() { methodC(); }
// ... 数十层调用 ...
```


+ 方法中声明大量局部变量（尤其是对象数组），占用过多栈空间。

```
function largeLocalVars() {
    kotlin.Int[] hugeArray = new kotlin.Int[1000000]; // 大对象占用栈帧空间
}
```


