# DB Schema

DB Schema是一种基于 JSON 格式定义的数据结构的规范

* 描述现有的数据格式。
* 提供清晰的人类和机器可读文档。
* 完整的结构验证，有利于自动化测试。
* 完整的结构验证，可用于验证客户端提交的数据。


MongoDB支持JSON Schema的草案4，包括核心规范和验证规范，但有所不同。


使用 DB Schema 表结构来统一管理permission和validator，可以通过表结构一键生成前端页面和clientDB权限及验证规则


#### 如何体验

1. 登录 uniCloud控制台 [https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn)
2. 选择 “服务空间/创建服务空间”，然后在左侧栏选择 “云数据库”
3. 选择 已有表或新建表，点击表右侧页签 “表结构”
4. 点击 “编辑” 按钮，在编辑区域编写 Schema
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/e237cb60-ff2d-11ea-8a36-ebb87efcf8c0.png)
5. 点击 “导出表单页面”，将导出clientDB工程，[详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=structure)
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/38cdc790-ff2e-11ea-9dfb-6da8e309e0d8.png)
6. 解压导出的zip包，拷贝到已有工程(以后支持直接导入到HBuilderX)



#### Schema字段

|属性|类型|描述|
|:-|:-|:-|
|required|array|必填字段|
|bsonType|any|字符类型|
|enum|Array|值范围，数组至少要有一个元素，且数组内的每一个元素都是唯一的。|
|maximum|number|校验最大值(大于)|
|exclusiveMaximum|boolean|是否排除 maximum|
|minimum|number|校验最小值(小于)|
|exclusiveMinimum|boolean|是否排除 minimum|
|minLength|number|校验最小长度|
|maxLength|number|校验最大长度|
|foramat|string|数据格式|
|title|string|标题，一般用来进行简单的描述，可以省略|
|description|string|描述|
|label|string|字段标题|
|format|'url'&#124;'email'|数据格式|
|defaultValue|string&#124;Object|默认值|
|forceDefaultValue|string&#124;Object|覆盖默认值，参考defaultValue|
|errorMessage|string&#124;Object |验证提示|
|order|int|表单排序|
|group|string|分组名称|
|component|Object|组件信息|


### bsonType可用类型

|类型										|长度	|别名					|
|:-|:-|:-|
|Double									|1			|“double”				|
|String									|2			|“string”				|
|Object									|3			|“object”				|
|Array									|4			|“array”				|
|Boolean								|8			|“bool”					|
|32-bit integer					|16			|“int”					|
|Timestamp							|17			|“timestamp”		|



### 示例

```json
{
  "bsonType": "object",
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


### errorMessage属性

类型为对象时可定义多个
{} 为占位符，可定义已有属性

|属性|类型|描述|
|:-|:-|:-|
|minLength|string|消息|
|maxLength|string|消息|
|...|...|...|

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

组件节点信息，包含组件名和属性

|属性|类型|描述|
|:-|:-|:-|
|name|string|组件名称|
|props|Object|组件属性|


### 示例

```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "_id": {
      "description": "存储ID，系统自动生成"
    },
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "minLength": 2,
      "maxLength": 8,
      "errorMessage": {
        "required": "{label}必填",
        "minLength": "{label}不能小于{minLength}个字符"
      },
      "component": {
        "name": "uni-field",
        "props": {
          "placeholder": "请输入姓名",
          "class": "input",
          "hidden": false,
          "readonly": false,
          "disabled": false
        }
      }
    },
    "age": {
      "bsonType": "int",
      "label": "年龄",
      "minimum": 1,
      "maximum": 150,
      "errorMessage": "{label}应该大于 {minimum} 岁，小于 {maximum} 岁",
      "component": {
        "name": "uni-field",
        "props": {
          "placeholder": "请输入年龄"
        }
      }
    },
    "option": {
      "bsonType": "int",
      "label": "选项",
      "enum": [1, 2, 3],
      "errorMessage": "{label}无效",
      "component": {
        "name": "select",
        "props": {
          "range": [
            {
              "label": "选项1",
              "value": 1
            },
            {
              "label": "选项2",
              "value": 2
            },
            {
              "label": "选项3",
              "value": 3
            }
          ],
          "range-key": "label",
          "value": null
        }
      }
    }
  }
}
```



### group属性

将多个组件放到一个分组里

示例
```json
{
  "bsonType": "object",
  "required": ["name"],
  "properties": {
    "name": {
      "bsonType": "string",
      "label": "姓名",
      "group": "基本信息",
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
      "group": "基本信息",
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
  <uni-group title="基本信息">
    <uni-field label="姓名" placeholder="请输入姓名" class="input" :hidden="false" :readonly="false" :disabled="false" />
    <uni-field label="年龄" placeholder="请输入年龄" />
  </uni-group>
...
```


### defaultValue/forceDefaultValue

defaultValue指定新增时当前字段默认值，客户端可以修改此值。forceDefaultValue也是指定新增时当前字段的默认值，与defaultValue不一样，forceDefaultValue不可被客户端修改。

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



### 校验规则@validator

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


数据是否有效， `"required": []` 不包含 `name` 字段，当`name`无值时不校验，有值时校验

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
      "errorMessage": "类型无效"
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


默认值 `"defaultValue": ...`，指定默认值为当前时间戳

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "create_date": {
      "bsonType": "timestamp",
      "label": "创建时间",
      "defaultValue": {
        "$env": "now"
      }
    }
  }
}
```


强制默认值，覆盖默认值 `"forceDefaultValue": ...`，指定默认值为当前时间戳

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "create_date": {
      "bsonType": "timestamp",
      "label": "创建时间",
      "forceDefaultValue": {
        "$env": "now"
      }
    }
  }
}
```

