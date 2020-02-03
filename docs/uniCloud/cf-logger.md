## 普通日志

开发者在云函数内也可以使用`console.log`、`console.info`、`console.warn`、`console.error`四种方式打印日志。

## 高级日志

高级日志包括以下四种，以此方式输出的日志会持久化存储（有效期30天）。

|接口									|描述											|
|:-:									|:-:											|
|uniCloud.logger.log	|以 log 日志等级输出日志	|
|uniCloud.logger.info	|以 info 日志等级输出日志	|
|uniCloud.logger.warn	|以 warn 日志等级输出日志	|
|uniCloud.logger.error|以 error 日志等级输出日志|
