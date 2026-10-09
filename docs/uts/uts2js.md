# uts2js

uts在编译运行目标为js时，会通过uts2js来编译。

## uts2js的应用范围
- web、小程序
- ios、鸿蒙的非uts插件
- android蒸汽模式的非uts插件

蒸汽模式支持独立的区分uts、ts、js，但需要指定版本以上：
- 在HBuilder 5.31 以前，非uts插件，均执行uts2js。
- 从HBuilder 5.31+，支持独立设置js、ts、uts。独立设置的js将不编译；ts将执行普通的ts编译；主动设置为uts，继续执行uts2js。

从HBuilder 5.31+起，uts2js，主要用于历史代码兼容。新项目推荐使用ts。

## uts2js编译器的功能和特点
由于运行在js运行时，所以uts2js中，不要求强类型，大多数情况与ts是相同的。

如果开发者写了js，可能会在编译器或IDE静态校验时提示类型错误，但不影响实际运行时表现。

1. 为了拉齐uts编译原生强类型的跨端表现，uts编译后的js，与标准js有略微差异：
	+ 支持UTSJSONObject。尤其是UTSJSONObject有几个方法，在标准js object中不存在，包括`parse`,`get`,`set`,`getAny`,`getBoolean`,`getNumber`,`getString`,`getArray`,`getJSON`,`toMap`。
	+ type没有擦除而是编译成了class。这也是为了保持和uts2kt、uts2swift一致。
	+ 把部分js内置API返回值从undefined改为null。因为kt、swift等强类型语言没有undefined概念，为拉齐而反向修改了js端逻辑。以下js内置API在uts2js编译后，会将返回值从undefined改为null：
		* Array.prototype.pop
		* Array.prototype.shift
		* Array.prototype.find
		* Array.prototype.findLast
		* Array.prototype.at
		* Map.prototype.get
		* WeakMap.prototype.get
		* String.prototype.at
		* String.prototype.codePointAt
2. 编译速度慢于普通ts编译器。