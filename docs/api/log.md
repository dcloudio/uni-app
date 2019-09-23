## console
向控制台打印日志信息。
### debug
向控制台打印 debug 日志

注：App 端自定义组件模式下，debug 方法等同于 log 方法。
### log
向控制台打印 log 日志
### info
向控制台打印 info 日志
### warn
向控制台打印 warn 日志
### error
向控制台打印 error 日志

注意：

- 不同平台对于 console 方法的支持存在差异，建议在开发过程中只使用文档中提到的方法。
- HBuilderX中有2个重要的代码块，敲`clog`：可直接输出`console.log()`；敲`clogv`：可输出`console.log(": " + );`，并且出现双光标，方便把变量名称和值同时打印出来。
- HBuilderX 1.9.7 以上的自定义组件模式，在App端支持打印对象信息到控制台。老版本可使用`clogj`代码块将json对象转为字符串打印出来。
