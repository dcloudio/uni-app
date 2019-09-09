`uni-app`的js代码，h5端运行于浏览器中。非h5端，Android平台运行在v8引擎中，iOS平台运行在iOS自带的jscore引擎中。

即便非H5端，虽然不支持window、document、navigator等浏览器的js API，但也支持标准ECMAScript。

开发者不要把浏览器里的js等价于标准js。

ECMAScript由Ecma国际管理，是基础js语法。浏览器基于标准js扩充了window、document等js API；Node.js基于标准js扩充了fs等模块；小程序也基于标准js扩展了各种wx.xx、my.xx、swan.xx的API。

所以uni-app的非H5端，一样支持标准js，支持if、for等语法，支持字符串、数组、时间等变量及各种处理方法。仅仅是不支持浏览器专用对象。

标准ecmascript的API非常多，这里没有必要列全，仅以console、settimeout为例做简要说明。

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
