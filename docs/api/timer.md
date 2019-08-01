## setTimeout(callback, delay, rest)

设定一个定时器。在定时到期以后执行注册的回调函数

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|callback|Function|是|回调函数|
|delay|Number|否|延迟的时间，函数的调用会在该延迟之后发生，单位 ms|
|rest|Any|否|param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数|


**返回值**

|返回值|类型|说明|
|:-|:-|:-|
|timeoutID|Number|定时器的编号，这个值可以传递给 [clearTimeout](/api/timer?id=cleartimeout) 来取消该定时|

## clearTimeout(timeoutID)

取消由 setTimeout 设置的定时器。

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|timeoutID|Number|是|要取消的定时器的 ID|


## setInterval(callback, delay, rest)
设定一个定时器。按照指定的周期（以毫秒计）来执行注册的回调函数

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|callback|Function|是|回调函数|
|delay|Number|否|延迟的时间，函数的调用会在该延迟之后发生，单位 ms|
|rest|Any|否|param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数|


**返回值**

|返回值|类型|说明|
|:-|:-|:-|
|intervalID|Number|定时器的编号，这个值可以传递给 [clearInterval](/api/timer?id=clearinterval) 来取消该定时|


## clearInterval(intervalID)

取消由 setInterval 设置的定时器。

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|intervalID|Number|是|要取消的定时器的 ID|