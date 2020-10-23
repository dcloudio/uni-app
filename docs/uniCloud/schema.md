# DB Schema

DB Schema是一种基于 JSON 格式定义的数据结构的规范。

* 描述现有的数据格式。
* 提供清晰的人类和机器可读文档，你可以一目了然的阅读每个表、每个字段的用途。
* 完整的结构验证，可用于验证客户端提交的数据及自动化测试。
* 可自动生成ui维护界面，比如新建页面和编辑页面，自动处理校验规则。（暂未上线）

> MongoDB支持通过 [$jsonSchema 操作符](https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/index.html)在插入和更新文档时进行结构验证（非空、类型校验等）， $jsonSchema 支持 JSON Schema的草案4，包括[core specification](https://tools.ietf.org/html/draft-zyp-json-schema-04)和[validation specification](https://tools.ietf.org/html/draft-fge-json-schema-validation-00)。uniCloud在MongoDB基础上进行了JSON Schema扩展。


#### 如何体验

1. 登录 uniCloud控制台 [https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn)
2. 选择 “服务空间/创建服务空间”，然后在左侧栏选择 “云数据库”
3. 选择 已有表或新建表，点击表右侧页签 “表结构”
4. 点击 “编辑” 按钮，在编辑区域编写 Schema，编写完毕后记得点保存按钮。
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/e237cb60-ff2d-11ea-8a36-ebb87efcf8c0.png)


编写好schema后，您可以进一步导出表单校验规则。方法如下：
1. 点击 “导出表单校验规则”，在左侧选择要校验的字段，然后点击“下载zip”按钮，将导出一个工程源码压缩包，其中js_sdk目录下validator/validator/下的js文件。该文件包含了根据schema生成的校验规则。
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/ba87a6b0-1519-11eb-81ea-f115fe74321c.png)

  A. 字段列表

  B. 导出文件清单

  C. 组件列表

  D. 扩展校验函数，每个函数是一个文件

  E. 验证规则，和表名一致

  F. vue 页面，包含新增和修改

  G. 文件预览 (仅支持预览 vue页面，校验规则)

2. 解压导出的zip包，拷贝到已有工程(以后会支持直接导入到HBuilderX)
- 如果你已经自行编写过`db-permission`文件，注意不要把`db-permission`也覆盖了，如果您未编写过`db-permission`，可以覆盖过去，并打开该文件根据自己的需求进行修改。

注意数据校验，只有使用clientDB 2.0+，才有效。不用clientDB，在云函数中直接操作数据库无法使用该校验规则。

#### Schema字段@segment

|属性|类型|描述|
|:-|:-|:-|
|required|array|必填的下级字段名称。required可以在表级的描述出现，约定该表有哪些字段必填。也可以在某个字段中出现，如果该字段是一个json，可以对这个json中的哪些字段必填进行描述。详见下方示例|
|bsonType|any|字段类型，如json object、字符串、bool值，具体见下表bsonType可用类型|
|enum|Array|字段值枚举范围，数组中至少要有一个元素，且数组内的每一个元素都是唯一的。|
|maximum|number|如果bsonType为数字时，可接受的最大值|
|exclusiveMaximum|boolean|是否排除 maximum|
|minimum|number|如果bsonType为数字时，可接受的最小值|
|exclusiveMinimum|boolean|是否排除 minimum|
|minLength|number|最小长度|
|maxLength|number|最大长度|
|title|string|标题，开发者维护时自用|
|description|string|描述，开发者维护时自用|
|format|'url'&#124;'email'|数据格式|
|pattern|String|正则表达式，如设置为手机号的正则表达式后，不符合该正则表达式则校验失败|
|validateFunction|string|扩展校验函数名|
|permission|Object|数据库权限，参考: [https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=db-permission](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=db-permission)|
|foreignKey|String|关联字段，形如`表名.字段名`|
|label|string|字段标题。用于生成数据维护ui界面时，渲染表单项前面的label标题|
|defaultValue|string&#124;Object|默认值|
|forceDefaultValue|string&#124;Object|强制默认值，不可通过clientDB的代码修改，常用于存放用户id、时间、客户端ip等固定值。具体参考下表的defaultValue|
|errorMessage|string&#124;Object |当数据写入或更新时，校验数据合法性失败后，返回的错误提示|
|group|string|分组id。生成数据维护ui界面时，多个字段对应的表单项可以合并显示在一个uni-group组件中|
|order|int|表单项排序序号。生成数据维护ui界面时，该字段对应的表单项所处排序位置的序号。如果被包含在uni-group中，按同组排序|
|component|Object&#124;Array|生成数据维护ui界面时，使用什么组件渲染这个表单项。比如使用input输入框。详见下方示例|

**注意：**
1. 数据校验，只有使用clientDB 2.0+，才有效。不用clientDB，在云函数中直接操作数据库无法使用该校验规则
2. 字段属性 `permission`, 仅支持 ".read", ".write"
3. 生成数据维护ui页面，该功能暂未开放。
4. 暂不支持子属性校验


### bsonType可用类型

|类型			|长度	|名称			|
|:-				|:-		|:-				|
|Double			|1		|“double”		|
|String			|2		|“string”		|
|Object			|3		|“object”		|
|Array			|4		|“array”		|
|Boolean		|8		|“bool”		|
|32-bit integer	|16		|“int”		|
|Timestamp		|17		|“timestamp”	|

注意：在schema描述中需要使用上述表格中的“名称”，而不是“类型”。


### 示例

假使一个表有5个字段："name", "year", "major", "address", "gpa"。其中前4个字段是必填字段，然后"address"字段类型为json object，下面又有若干子字段，其中"city"字段必填。

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


### permission属性

数据库权限示例

```json
{
  "bsonType": "object",
  "required": [],
  "permission": {
    ".read": true, // 任何用户都可以读
    ".create": false, // 禁止新增数据记录（admin权限用户不受限）
    ".update": false, // 禁止更新数据（admin权限用户不受限）
    ".delete": false // 禁止删除数据（admin权限用户不受限）
  },
  "properties": {
    ...
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "permission": {
        ".read": false, // 禁止读取 name 字段的数据（admin权限用户不受限）
        ".write": false // 禁止写入 name 字段的数据（admin权限用户不受限）
      }
      ...
    }
  }
}
```


### defaultValue/forceDefaultValue

- defaultValue指定新增时当前字段默认值，客户端可以修改此值。
- forceDefaultValue也是指定新增时当前字段的默认值，与defaultValue不一样，forceDefaultValue不可被客户端修改。

在实际开发中，forceDefaultValue设置为当前时间、用户id、客户端ip时，可以少些很多代码，clientDB在新增数据记录时会自动补齐这些数据。这些数据都不能通过客户端上传，不安全，只能在云端写入。

其中uid是和uni-id绑定的。如果用户没有登录，会报错，无法写入数据。

示例：

```json
// 指定默认值为true
"defaultValue": true

// 指定强制默认值为当前时间戳
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


默认值 `"defaultValue": ...`，指定默认值为当前时间戳。新增记录时，若clientDB不传该字段，则默认为当前时间。若clientDB传一个不同的值，则以传的值为准。

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


强制默认值，覆盖默认值 `"forceDefaultValue": ...`，指定默认值为当前时间戳。此时clientDB传任何值均无效，新增记录时一定会变成当前时间。

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


### 校验规则@validator

与数据校验相关的配置如下：

必填字段，`"required": ["name"]`

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


类型 `"bsonType": "string"`

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


格式 `"format": "email"`

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


正则 `"pattern": ""`

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


### validateFunction属性@validateFunction

扩展校验函数

如何使用

1. uniCloud 控制台，选择服务空间，切换到数据表

2. 底部 “扩展校验函数” 点击 “+” 增加校验函数 ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/2f4d0230-12a2-11eb-b244-a9f5e5565f30.png)


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

3. 在表结构 schema 编辑页面中配置需要校验的函数名称

```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "validateFunction": "name",
      "errorMessage": {
        "required": "{label}不能为空",
        "pattern": "{label}格式无效"
      }
    }
  }
}
```

4. 保存后生效



### errorMessage属性

clientDB的validator校验库，会根据schema配置的规范进行校验。数据不符合要求时，无法入库，此时会根据errorMessage的定义报出错误提示。

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


### component属性

该字段在表单中使用什么样的组件进行渲染，可设置组件名和初始属性。

这里的表单，指的是数据维护表单，比如新建记录或修改记录的表单。

生成的所有表单项，都在uni-form组件下。

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
    ".read": false,
    ".create": false,
    ".update": false,
    ".delete": false
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
        ".read": false,
        ".write": false
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
      "foarmat": "email",
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


### group属性（暂未开放）

将多个表单项合并在一个分组里显示。前端渲染时，group相关的自动会合并在一个uni-group组件中，不同分组的表单项之间有间隔。

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
...
  <uni-group>
    <uni-field label="姓名" placeholder="请输入姓名" class="input" :hidden="false" :readonly="false" :disabled="false" />
    <uni-field label="年龄" placeholder="请输入年龄" />
  </uni-group>
...
```

