# DB Schema

`DB Schema`是基于 JSON 格式定义的数据结构的规范。

它有很多重要的作用：

- 描述现有的数据格式。可以一目了然的阅读每个表、每个字段的用途。
- 设定数据操作权限(permission)。什么样的角色可以读/写哪些数据，都在这里配置。
- 设定字段值域能接受的格式(validator)，比如不能为空、需符合指定的正则格式。
- 设置数据的默认值(defaultValue/forceDefaultValue)，比如服务器当前时间、当前用户id等。
- 设定多个表的字段间映射关系(foreignKey)，将多个表按一个虚拟表直接查询，大幅简化联表查询。
- 根据schema自动生成表单维护界面，比如新建页面和编辑页面，自动处理校验规则。

> MongoDB支持通过 [$jsonSchema 操作符](https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/index.html)在插入和更新文档时进行结构验证（非空、类型校验等）， $jsonSchema 支持 JSON Schema的草案4，包括[core specification](https://tools.ietf.org/html/draft-zyp-json-schema-04)和[validation specification](https://tools.ietf.org/html/draft-fge-json-schema-validation-00)。uniCloud在MongoDB基础上进行了JSON Schema扩展。

编写`DB Schema`是uniCloud的数据库开发的重要环节。但如果在云函数里操作数据库，`DB Schema`只能发挥描述作用，无法提供实际功能。通过`clientDB`在前端操作数据库才能发挥`DB Schema`的各种功能。

一般建议开发者在前端操作数据库，在云数据库里配好`DB Schema`，然后就不再编写服务器代码了。也就是传统开发中在服务器端写的各种代码，包括对数据格式的校验、权限的管控，全都通过`DB Schema`设置，而不是写服务器代码。这种做法可以大幅提升开发效率、降低开发成本。

同时这要求开发者有一定的思路转换，需要一个角色站在数据库设计角度统筹所有规则。将原有的业务规则，都转换为数据库规则。

#### 如何编写DB Schema

1. 登录 [uniCloud控制台](https://unicloud.dcloud.net.cn)，选中一个数据表
2. 点击表右侧页签 “表结构”，点击 “编辑” 按钮，在编辑区域编写 Schema，编写完毕后点保存按钮即可生效。
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/e237cb60-ff2d-11ea-8a36-ebb87efcf8c0.png)

`DB Schema`在保存后是实时生效的，请注意对现网商用项目的影响。

### Schema字段@segment

|属性|类型|描述|
|:-|:-|:-|
|bsonType|any|字段类型，如json object、字符串、数字、bool值，具体见下表bsonType可用类型|
|title|string|标题，开发者维护时自用。如果不填label属性，将在生成前端表单代码时，默认用于表单项前面的label|
|description|string|描述，开发者维护时自用。在生成前端表单代码时，如果字段未设置component，且字段被渲染为input，那么input的placehold将默认为本描述|
|required|array|是否必填。支持填写必填的下级字段名称。required可以在表级的描述出现，约定该表有哪些字段必填。也可以在某个字段中出现，如果该字段是一个json，可以对这个json中的哪些字段必填进行描述。详见下方示例|
|enum|Array|字段值枚举范围，数组中至少要有一个元素，且数组内的每一个元素都是唯一的。|
|maximum|number|如果bsonType为数字时，可接受的最大值|
|exclusiveMaximum|boolean|是否排除 maximum|
|minimum|number|如果bsonType为数字时，可接受的最小值|
|exclusiveMinimum|boolean|是否排除 minimum|
|minLength|number|最小长度|
|maxLength|number|最大长度|
|format|'url'&#124;'email'|数据格式，不符合格式的数据无法入库。目前只支持'url'和'email'，未来会扩展其他格式|
|pattern|String|正则表达式，如设置为手机号的正则表达式后，不符合该正则表达式则校验失败，无法入库|
|validateFunction|string|扩展校验函数名|
|errorMessage|string&#124;Object |当数据写入或更新时，校验数据合法性失败后，返回的错误提示|
|defaultValue|string&#124;Object|默认值|
|forceDefaultValue|string&#124;Object|强制默认值，不可通过clientDB的代码修改，常用于存放用户id、时间、客户端ip等固定值。具体参考下表的defaultValue|
|foreignKey|String|关联字段。表示该字段的原始定义指向另一个表的某个字段，值的格式为`表名.字段名`，比如订单表的下单用户uid字段指向uni-id-users表的_id字段，那么值为`uni-id-users._id`。关联字段定义后可用于[联表查询](https://uniapp.dcloud.net.cn/uniCloud/database?id=lookup)，通过关联字段合成虚拟表，极大的简化了联表查询的复杂度|
|permission|Object|数据库权限，控制什么角色可以对什么数据进行读/写，可控制表和字段，可设置where条件。见下文[详述](https://uniapp.dcloud.net.cn/uniCloud/database?id=permission)|
|label|string|字段标题。生成前端表单代码时，渲染表单项前面的label标题|
|group|string|分组id。生成前端表单代码时，多个字段对应的表单项可以合并显示在一个uni-group组件中|
|order|int|表单项排序序号。生成前端表单代码时，默认是以schema中的字段顺序从上到下排布表单项的，但如果指定了order，则按order规定的顺序进行排序。如果表单项被包含在uni-group中，则同组内按order排序|
|component|Object&#124;Array|生成前端表单代码时，使用什么组件渲染这个表单项。比如使用input输入框。详见下方示例|

**注意：**
1. `DB Schema`的各种功能均只支持`clientDB`。如果使用云函数操作数据库，schema的作用仅仅是描述字段信息。同时强烈推荐使用HBuilderX 2.9.5以上版本使用`clientDB`。
2. 生成表单页面的功能，入口在uniCloud web控制台的数据库schema界面，注意该功能需搭配HBuilderX 2.9.5+版本。
3. 暂不支持子属性校验


### 字段类型bsonType

|名称		|
|:-			|
|string		|
|double		|
|int		|
|object		|
|array		|
|bool		|
|timestamp	|

<!-- schema里时间格式只允许时间戳是不够的 -->

### 基本示例

假使一个表有5个字段："name", "year", "major", "address", "gpa"。其中前4个字段是必填字段，然后"address"字段类型为json object，它下面又有若干子字段，其中"city"字段必填。

则schema按如下编写。

```json
{
  "required": ["name", "year", "major", "address"],
  "properties": {
    "name": {
      "bsonType": "string",
      "description": "must be a string and is required"
    },
    "year": {
      "bsonType": "int",
      "minimum": 2017,
      "maximum": 3017,
      "description": "must be an integer in [ 2017, 3017 ] and is required"
    },
    "major": {
      "enum": ["Math", "English", "Computer Science", "History", null],
      "description": "can only be one of the enum values and is required"
    },
    "gpa": {
      "bsonType": ["double"],
      "description": "must be a double if the field exists"
    },
    "address": {
      "bsonType": "object",
      "required": ["city"],
      "properties": {
        "street": {
          "bsonType": "string",
          "description": "must be a string if the field exists"
        },
        "city": {
          "bsonType": "string",
          "description": "must be a string and is required"
        }
      }
    }
  }
}
```


uniCloud推出了`openDB`开源数据库规范，包括用户表、文章表、商品表等很多模板表，这些模板表均已经内置`DB Schema`，可学习参考。[详见](https://gitee.com/dcloud/opendb)

### 默认值defaultValue/forceDefaultValue

- defaultValue指定新增时当前字段默认值，客户端可以修改此值。
- forceDefaultValue也是指定新增时当前字段的默认值，与defaultValue不一样，forceDefaultValue不可被客户端修改。

在实际开发中，forceDefaultValue常用于设置为当前服务器时间、当前登录用户id、客户端ip时。

这些数据都不能通过前端上传，不安全。过去只能在云端写云函数操作。在schema配置后则可以不用写云函数。`clientDB`在新增数据记录时会自动补齐这些数据。

其中uid是和`uni-id`绑定的。如果用户没有登录，则无法获取uid，无法写入数据。


`defaultValue/forceDefaultValue`内可以使用一些预置变量，形式如下：

```json
"forceDefaultValue": {
  "$env": "now"
}
```

`$env`可取值如下：

|变量			|说明																								|
|:-:			|:-:																								|
|now			|当前时间戳																					|
|clientIP	|当前客户端IP																				|
|uid			|当前用户Id，如果当前用户未登录或登录状态无效会报错	|

示例：

```json
// 指定默认值为true
"defaultValue": true

// 指定强制默认值为当前服务器时间戳
"forceDefaultValue": {
  "$env": "now"
}

// 指定强制默认值为当前客户端IP
"forceDefaultValue": {
  "$env": "clientIP"
}

// 指定强制默认值为当前客户id
"forceDefaultValue": {
  "$env": "uid"
}
```


默认值 `"defaultValue": ...`，指定默认值为当前时间戳。新增记录时，若前端不传该字段，则默认为当前时间。若前端传一个指定的值，则以传的值为准。

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "create_time": {
      "bsonType": "timestamp",
      "label": "创建时间",
      "defaultValue": {
        "$env": "now"
      }
    }
  }
}
```


强制默认值，覆盖默认值 `"forceDefaultValue": ...`，指定默认值为当前时间戳。此时前端传任何值均无效，新增记录时一定会变成当前时间。

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "create_time": {
      "bsonType": "timestamp",
      "label": "创建时间",
      "forceDefaultValue": {
        "$env": "now"
      }
    }
  }
}
```


### 字段值域校验系统validator@validator

与字段值域校验相关的配置，不符合配置的数据无法入库。

`DB Schema`里的字段值域校验系统由3部分组成。
1. 各种属性配置：是否必填（required）、数据类型（bsonType）、数字范围（maximum、minimum）、字符串长度范围（minLength、maxLength）、format、pattern正则表达式
2. 扩展校验函数：validateFunction。当属性配置不满足需求，需要写js函数进行校验时，使用本功能
3. 错误提示：errorMessage。常见错误有默认的错误提示语。开发者也可以自定义错误提示语

#### 各种校验属性配置

- 必填字段，`"required": ["name"]`

```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "errorMessage": "{label}不能为空"
    }
  }
}
```


`required`包含`name`时，要求必须传入`name`。`required`不包含`name`时，如果传入的数据包含`name`会对name进行校验，否则忽略name的校验规则。以下面的代码为例，如果不传name能通过校验，如果传了name则要求name最小长度为2.

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "minLength": 2,
      "errorMessage": {
        "required": "{label}不能为空",
        "minLength": "{label}不能小于 {minLength} 个字符"
      }
    }
  }
}
```


- 类型 `"bsonType": "string"`

```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "errorMessage": "{label}类型无效"
    }
  }
}
```


- 格式 `"format": "email"`

```json
{
  "bsonType": "object",
  "required": ["email"],
  "properties": {
    "email": {
      "bsonType": "string",
      "label": "邮箱",
      "format": "email",
      "errorMessage": {
        "required": "{label}不能为空",
        "format": "{label}格式无效"
      }
    }
  }
}
```


- 正则 `"pattern": ""`

例如: 验证手机号 `"pattern": "^\\+?[0-9-]{3,20}$"`


```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "pattern": "",
      "errorMessage": {
        "required": "{label}不能为空",
        "pattern": "{label}格式无效"
      }
    }
  }
}
```


#### validateFunction扩展校验函数@validateFunction

扩展校验函数

当属性配置不满足需求，需要写js函数进行校验时，使用本功能。

如何使用

1. uniCloud 控制台，选择服务空间，切换到数据表

2. 底部 “扩展校验函数” 点击 “+” 增加校验函数 ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/2f4d0230-12a2-11eb-b244-a9f5e5565f30.png)

给函数起个名字，比如叫“checkabc”，然后写具体的js代码，如下

```
// 扩展校验函数示例
exports = function (rule, value, data, callback) {
  // rule  当前规则
  // value 当前规则校验数据
  // data  全部校验数据
  // callback 可选，一般用于自定义 errorMessage，如果执行了callback return 值无效，callback 传入的 message 将替换 errorMessage
  // callback(new Error('message')) 传入 Error 类型时校验不通过
  // callback('message') 传入 String 类型时通过
  return value.length < 10
}
```

3. 在表结构 schema 编辑页面中的`validateFunction`属性中配置上面编写的 扩展校验函数 的名称，保存生效

```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "validateFunction": "checkabc",
      "errorMessage": {
        "required": "{label}不能为空"
      }
    }
  }
}
```



#### errorMessage自定义错误提示

数据不符合schema配置的规范时，无法入库，此时会根据errorMessage的定义报出错误提示。

errorMessage支持字符串，也支持json object。类型为object时，可定义多个校验提示。

{} 为占位符，可在其中引用已有属性。

|属性		|类型	|描述	|
|:-			|:-		|:-		|
|minLength	|string	|消息	|
|maxLength	|string	|消息	|
|...		|...	|...	|

示例

```json
{
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "minLength": 2,
      "maxLength": 8,
      "errorMessage": {
        "required": "{label}必填",
        "minLength": "{label}不能小于{minLength}个字符",
        "maxLength": "{label}不能大于{maxLength}个字符"
      },
      ...
    },
    "age": {
      "bsonType": "int",
      "label": "年龄",
      "minimum": 1,
      "maximum": 150,
      "errorMessage": "{label}应该大于 {minimum} 岁，小于 {maximum} 岁"
    }
  }
}
```

从示例可以看出，errorMessage支持配一条，也支持根据不同的错误类型配不同的errorMessage。

- 每个校验相关的属性不通过，可以以属性名为key配置它的错误提示语。
- 如果是扩展校验函数，可以在其内部写callback来自定义错误提示语。

**其他注意事项**

“数据库中某字段值不能在多条记录中重复”，这个需求一般不是在字段值域校验里实现，而是在数据库索引里配置该字段为唯一索引。

可以在web控制台配置索引，db_init.json也可以创建索引。注意如果数据库中多条记录中该字段已经有重复内容，那么设该字段为唯一索引时会报错，需先把重复数据去掉。

### 数据权限系统permission@permission

#### 概述

`DB Schema`的数据权限系统，是为`clientDB`设计的。

因为在云函数中操作数据库，是管理员权限。云函数代码可以完整控制数据库的增删改查操作。而前端是不能任意操作数据库的。

在过去，开发者需要在后端写代码来处理权限控制，但实际上有了`DB Schema`，这种权限控制的后台代码就不用再写了。

只要配好`DB Schema`，放开让前端写业务即可。配置里声明不能读写的数据，前端就无法读写。

`DB Schema`的permission规则，分为两部分，一边是对操作数据的指定，一边是对角色的指定，规则中对两者进行关联，匹配则校验通过。

1. 对数据的指定
- 可以对整个表进行`增删改查`控制
- 可以针对字段进行`读写`控制
- 可以配置具体的where规则，对指定的数据记录进行`删改查`控制
- 默认自带一个特殊数据的描述，就是当前请求计划操作的数据（doc），后面会详解用法
2. 对角色的指定
- 不限定角色，即使游客都可以操作数据
- 符合`uni-id`定义的角色
	* 开发者可以在`uni-id`中自定义各种角色，比如部门管理员，然后在`DB Schema`的permission中配置其可操作的数据。详见[uni-id的角色权限](/uniCloud/uni-id?id=rbac)
	* 默认自带一个特殊角色是自己（auth.uid），该角色仍然基于`uni-id`，但无需额外在`uni-id`的角色表中配置。只要登录的身份是自己即可。后面会详解用法

**注意**：如果登录用户是`uni-id`的admin角色，则不受`DB Schema`的配置限制的，admin角色拥有对所有数据的读写权限。

例如在`uniCloud admin`等管理端系统，只要使用admin用户登录就可以在前端操作数据库。


#### 表级权限控制

表级控制，包括增删改查四种权限，分别称为：create、delete、update、read。（注意这里使用的是行业通用的crud命名，与操作数据库的方法add()、remove()、update()、get()在命名上有差异，但表意是相同的）

所有的操作的默认值均为false。也就是不配置permission代表前端不能操作数据库（admin用户例外）。

例如一个user表，里面有_id、name、pwd等字段，该表的`DB Schema`如下，代表前端用户可读（包括游客），但前端非admin用户不可新增、删除、更新数据记录。

```json
// user表的schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": true, // 任何用户都可以读
    "create": false, // 禁止新增数据记录（admin权限用户不受限）
    "update": false, // 禁止更新数据（admin权限用户不受限）
    "delete": false // 禁止删除数据（admin权限用户不受限）
  },
  "properties": {
    "_id":{},
	"name":{},
    "pwd": {}
  }
}
```

Tips：为方便演示，上述json代码包含了注释。如要复制到`DB Schema`中时，需删除这些注释。在HBuilderX中，可以批选注释，批量删除（选中一个//，然后按选择所有相同词【win：ctrl+alt+e、mac：ctrl+alt+d】，然后【shift+end】选到行尾即可删除掉全部注释）

#### 字段级权限控制

permission的字段级控制，包括读写两种权限，分别称为：read、write。

也就是对于一个指定的字段，可以控制什么样的角色可以读取该字段内容，什么样的角色可以修改写入字段内容。

以上述的user表为例，假如要限制前端禁止读取pwd字段，那么按如下配置，在字段pwd下面再写permission节点，设定read为false。

```json
// user表的schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": true, // 任何用户都可以读
    "create": false, // 禁止新增数据记录（admin权限用户不受限）
    "update": false, // 禁止更新数据（admin权限用户不受限）
    "delete": false // 禁止删除数据（admin权限用户不受限）
  },
  "properties": {
    "_id":{
	},
	"name":{
	},
    "pwd": {
      "bsonType": "string",
      "title": "密码",
      "permission": {
        "read": false, // 禁止读取 pwd 字段的数据（admin权限用户不受限）
        "write": false // 禁止写入 pwd 字段的数据（admin权限用户不受限）
      }
    }
  }
}
```

按上述配置，前端查询数据时，如果不包含pwd字段，仍然可以查询。但如果查询请求包含pwd字段，该请求会被拒绝，提示无权访问。

同时可以看出，权限规则发生冲突时，下级节点的定义会覆盖上级节点。虽然整表是前端可读，但设定了pwd字段不可读时，该优先级更高。

#### 指定数据集权限控制

`DB Schema`提供了一个内置变量doc，表示要意图操作的数据记录。并支持用各种表达式来描述指定的记录。

仍然以user表举例，假使该表有个字段叫`status`表示用户是否被禁用。`status`是bool值，true代表用户状态正常，false代表被禁用。

然后有个需求，前端只能查用户状态正常的用户信息。那么schema配置如下，表级控制的read节点的值不再是简单的true/false，而是变成一个表达式：`"doc.status==true"`

```json
// user表的schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": "doc.status==true", // 任何用户都可以读status字段的值为true的记录，其他记录不可读
    "create": false, // 禁止新增数据记录（admin权限用户不受限）
    "update": false, // 禁止更新数据（admin权限用户不受限）
    "delete": false // 禁止删除数据（admin权限用户不受限）
  },
  "properties": {
    "_id":{
	},
	"name":{
	},
    "pwd": {
      "bsonType": "string",
      "title": "密码",
      "permission": {
        "read": false, // 禁止读取 pwd 字段的数据（admin权限用户不受限）
        "write": false // 禁止写入 pwd 字段的数据（admin权限用户不受限）
      }
    },
	"status": {
		"bsonType": "bool",
		"title": "用户状态",
		"description": "true代表用户正常。false代表用户被禁用"
	}
  }
}
```

根据这个配置，如前端查询user表的所有数据，则会报权限校验失败；如前端的查询里在where条件里声明了只查询status字段为true的数据，则查询会放行。

#### 权限规则的变量和运算符

除了上述例子提到的doc变量，事实上`DB Schema`的权限规则支持很多变量和运算符，可以满足各种配置需求。

**权限规则内可用的全局变量**

|变量名			|说明																																						|
|:-:			|:-:																																						|
|auth.uid		|用户id																																						|
|auth.role		|用户角色数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)，注意`admin`为内置的角色，如果用户角色列表里包含`admin`则认为此用户有完全数据访问权限|
|auth.permission|用户权限数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)																								|
|doc			|数据库中的目标数据记录，用于匹配记录内容/查询条件（需要注意的是，规则内的doc对象并不是直接去校验存在于数据库的数据，而是校验客户端的查询条件）							|
|now			|当前服务器时间戳（单位：毫秒），时间戳可以进行额外运算，如doc.publish\_date > now - 60000表示publish\_date在最近一分钟											|
|action			|数据操作请求同时指定的uni-clientDB-action。用于指定前端的数据操作必须同时附带执行一个action云函数，如未触发该action则权限验证失败					|

注意`uni-id`的角色和权限，也即auth.role和auth.permission是不一样的概念。注意阅读[uni-id 角色权限](/uniCloud/uni-id?id=rbac)

**权限规则内可以使用的运算符**

|运算符			|说明			|示例									|示例解释(集合查询)														|
|:-:			|:-:			|:-:									|:-:																	|
|==				|等于			|auth.uid == 'abc'						|用户id为abc															|
|!=				|不等于			|auth.uid != null						|用户要处于登录状态											|
|>				|大于			|doc.age>10								|查询条件的 age 属性大于 10												|
|>=				|大于等于		|doc.age>=10							|查询条件的 age 属性大于等于 10											|
|<				|小于			|doc.age<10								|查询条件的 age 属性小于 10												|
|<=				|小于等于		|doc.age<=10							|查询条件的 age 属性小于等于 10											|
|in				|存在在数组中	|doc.status in ['a','b']				|查询条件的 status 是['a','b']中的一个，数组中所有元素类型需一致		|
|!				|非				|!(doc.status in ['a','b'])				|查询条件的 status 不是['a','b']中的任何一个，数组中所有元素类型需一致	|
|&&				|与				|auth.uid == 'abc' && doc.age>10		|用户id 为 abc 并且查询条件的 age 属性大于 10							|
|&#124;&#124;	|或				|auth.uid == 'abc'&#124;&#124;doc.age>10|用户Id为abc或者查询条件的 age 属性大于 10								|


我们继续使用user表举例，目前需求如下，前端用户如果登录，那么该用户可以修改自己的name字段。此时需要在schema中配置name字段的permission为`"write":"(doc._id == auth.uid)"`

```json
// user表的schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": "doc.status==true", // 任何用户都可以读status字段的值为true的记录，其他记录不可读
    "create": false, // 禁止新增数据记录（admin权限用户不受限）
    "update": false, // 禁止更新数据（admin权限用户不受限）
    "delete": false // 禁止删除数据（admin权限用户不受限）
  },
  "properties": {
    "_id":{
	},
	"name":{
		"bsonType": "string",
		"title": "名称",
		"permission": {
		  "read": true, 
		  "write": "(doc._id == auth.uid)" // 允许登录的用户修改自己的name字段
		}
	},
    "pwd": {
      "bsonType": "string",
      "title": "密码",
      "permission": {
        "read": false, // 禁止读取 pwd 字段的数据（admin权限用户不受限）
        "write": false // 禁止写入 pwd 字段的数据（admin权限用户不受限）
      }
    },
	"status": {
		"bsonType": "bool",
		"title": "用户状态",
		"description": "true代表用户正常。false代表用户被禁用"
	}
  }
}
```

根据这个配置，如前端应用已经登录，且登录的用户发起修改自己的name的请求，则允许修改。其他修改数据请求则会被拒绝。

**注意**

要分清 数据权限permission 和 字段值域校验validator 的区别。

在权限规则的变量中只有数据库中的数据doc，并没有前端提交的待入库数据data。所以如果要对待入库的数据data做校验，应该在字段值域validator中校验，而不是在权限permission中校验。

如果想获取和判断目标数据记录doc之外的其他数据，则需要使用get方法，见下一章节。

很多需求貌似属于 数据权限校验 ，但实际不用写权限规则：
- 例如在news表新增一条记录，权限需求是“未登录用户不能创建新闻”，其实不需要在news表的create权限里写`auth.uid != null`。只需把news表的uid字段的forceDefaultValue设为`"$env": "uid"`即可，未登录用户自然无法创建。


**变量action的说明**

action是`clientDB`的一个配套功能。它的作用是在前端发起数据操作请求时，附带一个action的name，则会同时执行一个`uni-clientDB-action`的云函数。[详见](/uniCloud/database?id=action)

有些复杂业务，要求必须同时执行一个action云函数，才能允许前端对特定数据的修改。

以user表为例，假使用户在修改自己的name时，必须要触发一个名为changenamelog的action云函数，在该云函数里会记录一条留痕日志，如果没有记录日志则不允许修改name。那么在`DB Schema`里要配置`action == 'changenamelog'`

```json
// user表的schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": "doc.status==true", // 任何用户都可以读status字段的值为true的记录，其他记录不可读
    "create": false, // 禁止新增数据记录（admin权限用户不受限）
    "update": false, // 禁止更新数据（admin权限用户不受限）
    "delete": false // 禁止删除数据（admin权限用户不受限）
  },
  "properties": {
    "_id":{
	},
	"name":{
		"bsonType": "string",
		"title": "名称",
		"permission": {
		  "read": true, 
		  "write": "(doc._id == auth.uid) && (action == 'changenamelog')" // 允许登录的用户修改自己的name字段，但必须同时触发执行action云函数changenamelog
		}
	},
    "pwd": {
      "bsonType": "string",
      "title": "密码",
      "permission": {
        "read": false, // 禁止读取 pwd 字段的数据（admin权限用户不受限）
        "write": false // 禁止写入 pwd 字段的数据（admin权限用户不受限）
      }
    },
	"status": {
		"bsonType": "bool",
		"title": "用户状态",
		"description": "true代表用户正常。false代表用户被禁用"
	}
  }
}
```

前端提交代码，必须带上action参数
```js
const db = uniCloud.database();
db.collection("user").action("changenamelog").doc("xxx").update({
	name:"newname"
})
```

action云函数中记录日志的代码，此处省略。

根据上述配置，如前端应用已经登录，且登录的用户发起修改自己的name的请求，且同时前端的改库请求伴随action云函数changenamelog，则允许修改。其他修改数据请求则会被拒绝。

`action`有很多用途，有的权限规则比较复杂，需要写很多js代码，此时也可以在`action`的before中进行校验。

但注意导出`db_init.json`时不会包含`action`，`action`属于云函数。导出`db_init.json`只会包含schema和validateFunction。


#### 权限规则内的数据库查询get方法

权限规则内置了doc变量，但只能用于要操作的数据表的判断，如果要获取其他表的数据做判断就需要get方法了。

权限规则内通过get方法，根据id获取数据库中的数据。get方法接收一个字符串作为参数，字符串形式为`database.表名.记录ID`

例如有个论坛，要求用户积分大于100分才可以发帖。那么帖子表的create权限应该配成：

```json
// 使用模板字符串语法拼接产生`database.表名.记录ID`形式字符串
"create": get(`database.uni-id-users.${auth.uid}`).score > 100"
```

使用get方法时需要注意get方法的参数必须是唯一确定值，例如schema配置的get权限如下：

```json
// 这句的含义是，本次查询where条件内传入的shop_id需要满足以下条件：shop表内_id为此shop_id的记录的owner字段等于当前用户uid
"get(`database.shop.${doc.shop_id}`).owner == auth.uid"
```

前端js如下：
```js
// 此条件内doc.shop_id只能是'123123'，可以通过get(`database.shop.${doc.shop_id}`)获取shop表内_id为123123的记录验证其owner是否等于当前用户uid
db.collection('street').where("shop_id=='123123'").get()

// 此条件内doc.shop_id可能是'123123'也可能是'456456'，`"get(`database.shop.${doc.shop_id}`).owner == auth.uid"`会直接返回false不会获取shop表数据进行验证
db.collection('street').where("shop_id=='123123 || shop_id=='456456'").get()
```

### 前端表单生成系统@autocode

`DB Schema`里有大量的信息，有了这些信息，前端将无需自己开发表单维护界面，uniCloud可以自动生成新增数据、修改数据的表单页面。

为强化表单的自定义性，`DB Schema`还扩展了label、component、group、order等属性。

前端表单生成系统功能包括：
- 自动生成新增、修改表单的页面文件，分别是add.vue和edit.vue
- 自动生成前端表单校验规则

表单校验工作，在前端和后端都需要做。在过去，这造成重复投入。

现在，前后端的表单验证都被统一了。

开发者修改`DB Schema`并保存后，云端的校验规则直接生效。

然后开发者需要把这套校验规则导入到前端项目中。即利用本功能。

DCloud提供了`uni-forms`前端组件，该组件的校验规范完全符合`DB Schema`中的校验规则，实现云端统一。`uni-forms`组件地址：[https://ext.dcloud.net.cn/plugin?id=2773](https://ext.dcloud.net.cn/plugin?id=2773)


1. 在schema界面点击 “导出表单页面”

  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/ba87a6b0-1519-11eb-81ea-f115fe74321c.png)

上图每个区域的解释如下：

- 区域A. 字段列表

这里需要选择在前端表单页面出现的字段，无需用户在表单页面提交的字段（如create_date）不应勾选。

选择字段后，右侧会变化，自动生成代码。

- 区域B. 导出文件清单

这里显示了完整的工程结构。点击右下角的“下载zip”可以把这个工程下载到本地。点击这里的每个文件，在右侧会出现文件相应的代码。

只有自动生成的文件会在右侧显示代码，components目录下的三方库不会在右侧显示代码。

- 区域C. 组件列表

根据`DB Schema`生成的表单页面，是基于`uni-forms`组件的，该组件地址：[https://ext.dcloud.net.cn/plugin?id=2773](https://ext.dcloud.net.cn/plugin?id=2773)

- 区域D. 扩展校验函数，每个函数是一个文件

- 区域E. 表单校验规则，和表名一致，每个表一个文件

在修改schema中的校验规则后，云端是直接生效的。前端部分则需要下载这个js文件到本地工程。

如果直接已经下载过，需要二次更新，也可以在右侧复制源码，增量添加到前端工程的校验规则中。

- 区域F. 新建和编辑页面

自动生成的表单页面，包括新建页面和编辑页面。这些页面均基于clientDB，可直接使用。

- 区域G. 文件预览 (仅支持预览 自动生成的页面和校验规则)

2. 然后点击“下载zip”按钮，将导出一个工程源码压缩包。解压导出的zip包，拷贝到已有工程

**注意：生成的代码，需HBuilderX2.9.5+方可正常运行。**


#### 生成页面控件的默认策略

`DB Schema`配置的字段，在生成页面时使用什么组件渲染？决定关系如下：

- 如果配置了字段的component属性，则严格按component的配置执行。
- 如果没有配置component属性，那么默认有如下策略：
	* 字段类型为bool时，默认使用switch组件
	* 其他字段类型，将生成input组件。如果是数字类型，会同时把input的键盘类型设为数字。
- 如果没有配label，则以title作为label，渲染在表单项前面
- description在渲染为input时会被设为placehold

<!-- 
如果是时间戳，则需要新做一个时间选择组件
如果有枚举，默认为picker
如果是number且有大小范围，默认用步进器
 -->

#### label属性

在[uni-forms组件](https://ext.dcloud.net.cn/plugin?id=2773)中，每个表单项都被包裹在`uni-forms-item`中，该子组件可设置label，即，在表单项如输入框前面或上面放置一个说明性名词。

在`DB Schema`的label属性中设置值后，生成前端表单页面时即可自动给`uni-forms-item`的label属性赋值。

如果未设置label属性，但配置了title属性，生成前端表单页面时会取title作为前端的label。

#### component属性

定义该字段在表单中使用什么样的组件进行渲染，可设置前端的组件名和初始属性。

这里的表单，指的是数据维护表单，比如新建记录或修改记录的表单。

生成的所有表单项，都在[uni-forms组件](https://ext.dcloud.net.cn/plugin?id=2773)下。

|属性|类型|描述|
|:-|:-|:-|
|name|string|组件名称|
|props|Object|组件属性|
|children|String|子组件|
|childrenData|Array|子组件数据|


注意事项
- `checkbox-group`, `radio-group`, 为uni内置组件，可以省略 `children` 属性
- `children` 属性, `{item}` 表示 `childrenData` 数组中的项


示例

```json
{
  "bsonType": "object",
  "required": ["name", "nickname"],
  "permission": {
    "read": false,
    "create": false,
    "update": false,
    "delete": false
  },
  "properties": {
    "_id": {
      "description": "存储文档 ID（用户 ID），系统自动生成"
    },
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "minLength": 2,
      "maxLength": 10,
      "errorMessage": {
        "required": "{label}必填",
        "minLength": "{label}不能小于{minLength}个字符"
      },
      "permission": {
        "read": false,
        "write": false
      },
      "component": {
        "name": "input",
        "props": {
          "placeholder": "请输入姓名"
        }
      }
    },
    "nickname": {
      "bsonType": "string",
      "description": "用户昵称",
      "label": "昵称",
      "errorMessage": "{label}无效",
      "component": {
        "name": "input",
        "props": {
          "placeholder": "请输入昵称"
        }
      }
    },
    "hobby": {
      "bsonType": "array",
      "description": "爱好",
      "label": "爱好",
      "component": {
        "name": "checkbox-group",
        "childrenData": [{
            "label": "游泳",
            "value": 1
          },
          {
            "label": "骑行",
            "value": 2
          },
          {
            "label": "音乐",
            "value": 3
          },
          {
            "label": "美术",
            "value": 4
          }
        ]
      }
    },
    "gender": {
      "bsonType": "int",
      "enum": [0, 1, 2],
      "description": "用户性别：0 未知 1 男性 2 女性",
      "label": "性别",
      "component": {
        "name": "radio-group",
        "childrenData": [{
            "label": "男",
            "value": 1
          },
          {
            "label": "女",
            "value": 2
          }
        ]
      },
      "errorMessage": "{label}无效"
    },
    "email": {
      "bsonType": "string",
      "description": "邮箱地址",
      "format": "email",
      "label": "邮箱",
      "errorMessage": "{label}无效"
    },
    "language": {
      "bsonType": "string",
      "label": "自定义children",
      "component": {
        "name": "select",
        "children": "<option value="{item.value}">{item.label}</option>",
        "childrenData": [{"label": "中文简体", "value": "zh-cn"}]
      }
    }
  }
}
```


component 类型为数组

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "mobile": {
      "bsonType": "string",
      "label": "多个组件",
      "component": [
        {
          "name": "input",
          "props": {
            "placeholder": "电话1"
          }
        },
        {
          "name": "input",
          "props": {
            "placeholder": "电话2"
          }
        }
      ]
    }
  }
}
```


#### group属性

将多个表单项合并在一个分组里显示。前端渲染时，group相同的表单项会自动合并在一个uni-group组件中，不同分组的表单项之间有间隔。该组件详见：[https://ext.dcloud.net.cn/plugin?id=3281](https://ext.dcloud.net.cn/plugin?id=3281)

示例

```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "group": "1",
      "minLength": 2,
      "maxLength": 8,
      "errorMessage": {
        "required": "{label}必填",
        "minLength": "{label}不能小于{{minLength}}个字符",
        "maxLength": "{label}不能大于{{maxLength}}个字符"
      },
      "component": {
        "name": "uni-field",
        "props": {
          "placeholder": "请输入姓名",
          "class": "input",
          "hidden": false,
          "readonly": false,
          "disabled": false,
          "value": null
        }
      }
    },
    "age": {
      "bsonType": "int",
      "label": "年龄",
      "group": "1",
      "minimum": 0,
      "maximum": 150,
      "errorMessage": "{label}应该大于 {minimum} 岁，小于 {maximum} 岁",
      "component": {
        "name": "uni-field",
        "props": {
          "placeholder": "请输入年龄",
          "value": null
        }
      }
    }
  }
}
```


生成带有group组件的表单代码

```
<uni-forms>
  <uni-group>
    <uni-forms-item label="姓名"><input placeholder="请输入姓名" class="input" :hidden="false" :readonly="false" :disabled="false" /></uni-forms-item>
    <uni-forms-item label="年龄"><input  placeholder="请输入年龄" /></uni-forms-item>
  </uni-group>
```
