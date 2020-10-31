## 开发期间打印日志

云函数内使用`console.log`、`console.info`、`console.warn`、`console.error`四种方式打印日志。

HBuilderX中查看日志的教程在 [快速上手章节](/uniCloud/quickstart?id=rundebug)

## 运行期记录日志，在web控制台查看

系统上线后，也需要记录云函数的日志。此时不是打印在HBuilderX控制台，也不是使用`console.log`，而是使用下面的API来记录日志。

调用这些API打印的日志，会记录在uniCloud的[web控制台](https://unicloud.dcloud.net.cn)。以此方式输出的日志会持久化存储（有效期30天）。

|接口									|描述											|
|:-:									|:-:											|
|uniCloud.logger.log	|以 log 日志等级输出日志	|
|uniCloud.logger.info	|以 info 日志等级输出日志	|
|uniCloud.logger.warn	|以 warn 日志等级输出日志	|
|uniCloud.logger.error|以 error 日志等级输出日志|
