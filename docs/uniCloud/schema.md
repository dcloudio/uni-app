# DB Schema

`DB Schema`是基于 JSON 格式定义的数据结构的规范。

它有很多重要的作用：

- 描述现有的数据含义。可以一目了然的阅读每个表、每个字段的用途。
- 设定数据操作权限(permission)。什么样的角色可以读/写哪些数据，都在这里配置。
- 设定字段值域能接受的格式(validator)，比如不能为空、需符合指定的正则格式。
- 设定字段之间的约束关系(fieldRules)，比如字段结束时间需要晚于字段开始时间。
- 设置数据的默认值(defaultValue/forceDefaultValue)，比如服务器当前时间、当前用户id等。
- 设定多个表的字段间映射关系(foreignKey)，将多个表按一个虚拟表直接查询，大幅简化联表查询。
- 根据schema自动生成前端界面（schema2code），包括列表、详情、新建和编辑页面，自动处理校验规则。

> MongoDB支持通过 [$jsonSchema 操作符](https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/index.html)在插入和更新文档时进行结构验证（非空、类型校验等）， $jsonSchema 支持 JSON Schema的草案4，包括[core specification](https://tools.ietf.org/html/draft-zyp-json-schema-04)和[validation specification](https://tools.ietf.org/html/draft-fge-json-schema-validation-00)。uniCloud在MongoDB基础上进行了JSON Schema扩展。

编写`DB Schema`是uniCloud的数据库开发的重要环节。但如果在云函数里操作数据库，`DB Schema`只能发挥描述作用，无法提供实际功能。通过`clientDB`在前端操作数据库才能发挥`DB Schema`的各种功能。

一般建议开发者在前端操作数据库，在云数据库里配好`DB Schema`，然后就不再编写服务器代码了。也就是传统开发中在服务器端写的各种代码，包括对数据格式的校验、权限的管控，全都通过`DB Schema`设置，而不是写服务器代码。这种做法可以大幅提升开发效率、降低开发成本。

同时这要求开发者有一定的思路转换，需要一个角色站在数据库设计角度统筹所有规则。将原有的业务规则，都转换为数据库规则。

#### 如何编写DB Schema

- **方式1，在web控制台编写schema**

1. 登录 [uniCloud控制台](https://unicloud.dcloud.net.cn)，选中一个数据表
2. 点击表右侧页签 “表结构”，点击 “编辑” 按钮，在编辑区域编写 Schema，编写完毕后点保存按钮即可生效。
  ![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/037fc310-549f-11eb-b997-9918a5dda011.png)

**web控制台上编辑`DB Schema`保存后是实时生效的，请注意对现网商用项目的影响。**

- **方式2，在HBuilderX中编写schema**
> 需HBuilderX 3.0+版本

在HBuilderX中编写schema，有良好的语法提示和语法校验，还可以在前端连本地云函数功能中免上传联调测试，是更为推荐的schema编写方案。

**创建schema**

1. 在`uniCloud`项目右键，选择`创建database目录`
2. 在第一步创建的database目录右键选择`新建数据集合schema`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/a9ab149e-6293-49c0-af8e-2db893a956d4.jpg)

**HBuilderX内创建的schema新建和保存时不会自动上传**

**上传schema**

- 在单个schema文件右键可以只上传当前选中的schema。快捷键是【Ctrl+u】。（Ctrl+u是HBuilderX的通用快捷键，不管是发布App还是上传云函数、schema，都是Ctrl+u）
- 在database目录右键可以上传全部schema

**下载schema**

- database目录右键可以下载所有schema及扩展校验函数

HBuilderX中运行前端项目，在控制台选择连接本地云函数，此时本地编写的schema可直接生效，无需上传。方便编写调试。

### Schema的一级节点@schema-root
```json
{
	"bsonType": "object", // 固定节点
	"description": "表的描述",
	"required": [], // 必填字段
	"permission": { 
		"read": false, // 前端非admin的读取记录权限控制。默认值是false，即可以不写。可以简单的true/false，也可以写表达式
		"create": false, // 前端非admin的新增记录权限控制。默认值是false，即可以不写。可以简单的true/false，也可以写表达式 
		"update": false, // 前端非admin的更新记录权限控制。默认值是false，即可以不写。可以简单的true/false，也可以写表达式
		"delete": false, // 前端非admin的删除记录权限控制。默认值是false，即可以不写。可以简单的true/false，也可以写表达式
		"count": false // 前端非admin的求数权限控制。默认值是true，即可以不写。可以简单的true/false，也可以写表达式
	},
	"properties": { // 表的字段清单
		"_id": { // 字段名称，每个表都会带有_id字段
			"description": "ID，系统自动生成"
			// 这里还有很多字段属性可以设置
		}
	},
	"fieldRules":[
		// 字段之间的约束关系。比如字段开始时间小于字段结束时间。也可以只校验一个字段。支持表达式
	]
}
```

**注意**

- 对数据进行数量统计时（包括count方法、及groupField内的count操作）均会同时触发表级的count权限及read权限

### 字段的属性清单@segment

properties里的字段列表，每个字段都有很多可以设置的属性，如下：

|属性|类型|描述|
|:-|:-|:-|
|bsonType|any|字段类型，如json object、字符串、数字、bool值、日期、时间戳，具体见下表bsonType可用类型|
|title|string|标题，开发者维护时自用。如果不填label属性，将在生成前端表单代码时，默认用于表单项前面的label|
|description|string|描述，开发者维护时自用。在生成前端表单代码时，如果字段未设置componentForEdit，且字段被渲染为input，那么input的placehold将默认为本描述|
|required|array|是否必填。支持填写必填的下级字段名称。required可以在表级的描述出现，约定该表有哪些字段必填。也可以在某个字段中出现，如果该字段是一个json，可以对这个json中的哪些字段必填进行描述。详见下方示例|
|enum|Array|字段值枚举范围，数组中至少要有一个元素，且数组内的每一个元素都是唯一的。**enum最多只可以枚举500条**|
|enumType|String|字段值枚举类型，可选值tree。设为tree时，代表enum里的数据为树形结构。此时schema2code可生成多级级联选择组件|
|arrayType|String|数组项类型，bsonType="array" 时有效，HBuilderX 3.1.0+ 支持，具体见下表arrayType可用类型|
|fileMediaType|String|文件类型，可选值 all&#124;image&#124;video 默认值为all,表示所有文件，image表示图片类型文件，video表示视频类型文件  HBuilderX 3.1.0+|
|fileExtName|String|文件扩展名过滤，多个用 "," 分割，例如: jpg,png，HBuilderX 3.1.0+ 支持|
|maximum|number|如果bsonType为数字时，可接受的最大值|
|exclusiveMaximum|boolean|是否排除 maximum|
|minimum|number|如果bsonType为数字时，可接受的最小值|
|exclusiveMinimum|boolean|是否排除 minimum|
|minLength|number|限制字符串或数组的最小长度|
|maxLength|number|限制字符串或数组的最大长度|
|trim|String|去除空白字符，支持 none&#124;both&#124;start&#124;end，默认none，仅bsonType="string"时有效|
|format|'url'&#124;'email'|数据格式，不符合格式的数据无法入库。目前只支持'url'和'email'，未来会扩展其他格式|
|pattern|String|正则表达式，如设置为手机号的正则表达式后，不符合该正则表达式则校验失败，无法入库|
|validateFunction|string|扩展校验函数名|
|errorMessage|string&#124;Object |当数据写入或更新时，校验数据合法性失败后，返回的错误提示|
|defaultValue|string&#124;Object|默认值|
|forceDefaultValue|string&#124;Object|强制默认值，不可通过clientDB的代码修改，常用于存放用户id、时间、客户端ip等固定值。具体参考下表的defaultValue|
|foreignKey|String|关联字段。表示该字段的原始定义指向另一个表的某个字段，值的格式为`表名.字段名`，比如订单表的下单用户uid字段指向uni-id-users表的_id字段，那么值为`uni-id-users._id`。关联字段定义后可用于[联表查询](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup)，通过关联字段合成虚拟表，极大的简化了联表查询的复杂度|
|parentKey|String|同一个数据表内父级的字段。详情参考：[树状数据查询](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=gettree)|
|permission|Object|数据库权限，控制什么角色可以对什么数据进行读/写，可控制表和字段，可设置where条件。见下文[详述](uniCloud/schema?id=permission)|
|label|string|字段标题。schema2code生成前端代码时，渲染表单项前面的label标题|
|group|string|分组id。schema2code生成前端代码时，多个字段对应的表单项可以合并显示在一个uni-group组件中|
|order|int|表单项排序序号。schema2code生成前端代码时，默认是以schema中的字段顺序从上到下排布表单项的，但如果指定了order，则按order规定的顺序进行排序。如果表单项被包含在uni-group中，则同组内按order排序|
|component|Object&#124;Array|schema2code生成前端代码时，使用什么组件渲染这个表单项。已废弃。请使用下面的componentForEdit和componentForShow|
|componentForEdit|Object&#124;Array|HBuilderX 3.1.0+, 生成前端编辑页面文件时(add.vue、edit.vue)，使用什么组件渲染这个表单项。比如使用input输入框。|
|componentForShow|Object&#124;Array|HBuilderX 3.1.0+, 生成前端展示页面时(list.vue、detail.vue)，使用什么组件渲染。比如使用uni-dateformat格式化日期。|

**注意：**
1. `DB Schema`的各种功能均只支持`clientDB`。如果使用云函数操作数据库，schema的作用仅仅是描述字段信息。同时强烈推荐使用HBuilderX 3.0以上版本使用`clientDB`。
2. schema2code，是根据scheme自动生成数据的增删改查页面的功能。入口1在uniCloud web控制台的数据库schema界面，入口2在HBuilderX中点击schema右键菜单。[详见](https://ext.dcloud.net.cn/plugin?id=4684)
3. 暂不支持子属性校验

**一个带有字段的schema基本示例**

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
      "bsonType": "double",
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


#### 字段类型bsonType@bsontype

- bool （布尔值，true|false）
- string （字符串）
- int （整数）
- double （精度数。由于浮点精度问题，慎用）
- object （对象。地理位置也属于object）
- array （数组）
- timestamp （时间戳）
- date （日期）
- file 云存储文件的信息体。不直接存储文件，而是一个json object，包括云存储文件的名称、路径、文件体积等信息。（HBuilderX 3.1.0+ ）
- password （一种特殊的string。这类字段不会通过clientDB传递给前端，所有用户都不能通过clientDB读写，即使是admin管理员）

复杂格式说明：
- timestamp是一串数字的时间戳，一般通过如下js获取`var timestamp = new Date().getTime()；`。它的好处是屏蔽了时区差异。阿里云和腾讯云的云端时区是0，但在HBuilderX本地运行云函数时，如果是中国的电脑，时区则会变成8，导致显示错乱。所以推荐使用时间戳。但时间戳是一串记录毫秒的数字，不合适直接渲染到前端界面上。推荐的做法是在前端渲染时使用[`<uni-dateformat>`组件](https://ext.dcloud.net.cn/plugin?id=3279)。
- 日期和地理位置在web控制台的数据库管理界面上无法直接在引号里录入值，需参考[文档](uniCloud/quickstart?id=editdb)
- double类型慎重，由于js不能精准处理浮点运算，0.1+0.2=0.30000000000000004。所以涉及金额时，建议使用int而不是double，以分为单位而不是以元为单位存储。比如微信支付默认就是以分为单位。如果使用[uniPay](uniCloud/unipay)处理支付的话，它的默认单位也是分。
- file的json object格式存储文件的基本信息和路径，如下：
```json
{
	"name": "filename.jpg",
	"extname": "jpg",
	"fileType": "image",
	"url": "https://xxxx", // 必填
	"size": 0, //单位是字节
	"image": { //图片扩展
		"width":10,//单位是像素
		"height":10
	},
	"video":{ //video和image不会同时存在。此处仅为列举所有数据规范
		"duration":123,//视频时长，单位是秒
		"poster":"https://xxx" //视频封面
	}
}
```

在上述格式中，除了`url`外，其他均为非必填。

`image`键是图片的扩展键，除了基本的宽高像素外，开发者可以自己扩展其他键，比如色位。同理`video`也可以自行扩展。

举例：表的schema中定义了2个字段：_id和image，image为file类型，定义格式如下：

```json
{
  "schema": {
    "bsonType": "object",
    "required": [],
    "properties": {
      "_id": {
        "description": "ID，系统自动生成"
      },
      "image": {
        "bsonType": "file",
        "title": "图片",
        "description": "图片",
        "fileMediaType": "image", // 可选值 all|image|video 默认值为all,表示所有文件，image表示图片类型文件，video表示视频类型文件
        "fileExtName": "jpg,png", // 扩展名过滤，多个用 , 分割
      }
    }
  }
}
```

前端配套组件：

uni-ui组件库中包含组件：`<uni-file-picker>` 。该组件和file字段的数据库完美搭配。组件首先选择文件，并上传到uniCloud云存储，在表单提交后将上传文件的地址写入file字段中。详见：[https://ext.dcloud.net.cn/plugin?id=4079](https://ext.dcloud.net.cn/plugin?id=4079)

schema2code：

DB Schema定义好字段类型为file后，可以通过schema2code工具，直接生成上传表单页面，前端页面包含`<uni-file-picker>`组件，选择、上传、写库一气呵成。详见：[schema2code](/uniCloud/schema?id=autocode)

#### 数组字段类型的子类型arrayType@arraytype

一个字段如果bsonType是array，那么它可以进一步通过arrayType指定这个数组里每个数组项目的bsonType，值域仍然是所有的字段类型。

比如一个字段存储了多张图片，那么可以设置bsonType为array，然后进一步设置arrayType为file。

比如某表的schema定义了2个字段：_id和images，images存储用户批量上传的多张图，如下：

```json
{
  "schema": {
    "bsonType": "object",
    "required": [],
    "properties": {
      "_id": {
        "description": "ID，系统自动生成"
      },
      "images": {
        "bsonType": "array",
        "title": "图片",
        "description": "多张图片",
        "arrayType": "file",
				"multiple": true, // 允许选择多张图片
        "fileMediaType": "image", // 可选值 all|image|video 默认值为all,表示所有文件，image表示图片类型文件，video表示视频类型文件
        "fileExtName": "jpg,png", // 扩展名过滤，多个用 , 分割
        "maxLength": 3 // 限制最大数量
      }
    }
  }
}
```

arrayType为file时，与单独的bsonType为file相同，`<uni-file-picker>`组件和schema2code均可使用。

#### url格式@url

仅对string类型字段生效。

`http://` | `https://` | `ftp://` 开头, `//` 后必须包含一个 `.`(localhost除外)

有效格式
- http://dcloud.io
- https://dcloud.io
- http://localhost

无效格式
- http://dcloud
- https://dcloud
- mailto:dcloud@dcloud.io
- file:\\
- file:\\\

#### trim@trim

仅对string类型字段生效。

|值|描述|
|:-|:-|
|none|不处理|
|both|从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）|
|start|从字符串的开头移除空白字符|
|end|从一个字符串的末端移除空白字符|


#### enum属性@enum

enum，即枚举。一个字段设定了enum后，该字段的合法内容，只能在enum设定的数据项中取值，**enum最多只可以枚举500条**。

enum支持3种数据格式：
1. 简单数组
2. 支持描述的复杂数组
3. 数据表查询


- 简单数组

如下示例的意思是，role字段的合法值域只能是“1”、“2”、“3”中的一个。

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "_id": {
      "description": "存储文档 ID（用户 ID），系统自动生成"
    },
    "role": {
      "bsonType": "array",
      "description": "角色，不允许重复",
      "label": "角色",
      "enum": [1, 2, 3]
    }
  }
}
```

通过schema2code生成前端表单页面时，带有enum的字段会生成[uni-data-checkbox组件](https://ext.dcloud.net.cn/plugin?id=3456)，该组件在界面上渲染时会生成1、2、3这3个候选的复选框。所以一般不推荐使用简单数组，而是推荐下面的 支持描述的数组

- 支持描述的数组

如下示例的意思是，role字段的合法值域只能是“1”、“2”中的一个。但通过schema2code生成前端表单页面时，该字段会生成uni-data-checkbox组件，该组件在界面上渲染时会生成“角色1”、“角色2”这2个候选的复选框。

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "_id": {
      "description": "存储文档 ID（用户 ID），系统自动生成"
    },
    "role": {
      "bsonType": "array",
      "description": "角色，不允许重复",
      "label": "角色",
      "enum": [
        {
          "value": 1,
          "text": "角色1"
        },
        {
          "value": 2,
          "text": "角色2"
        }
      ]
    }
  }
}
```


- 数据表查询

一个字段的合法值域，可以是从另一个数据查询而来。也即，在enum中可以配置jql查询语句。

例如有一个角色表uni-id-roles，里面已经存在若干个角色。那么在用户表uni-id-users的role字段里，就可以在enum里写jql查询，约定用户的角色字段的值，比如是在角色表中已经存在的值。

通过schema2code生成前端表单页面时，该字段会生成uni-data-checkbox组件，该组件在界面上渲染时会自动从角色表中查询数据并显示所有候选的复选框。

```json
{
  "bsonType": "object",
  "required": [],
  "properties": {
    "_id": {
      "description": "存储文档 ID（用户 ID），系统自动生成"
    },
    // role 云端数据, enum属性的值为JQL语法。
    // 通过clientdb提交数据时多一次查库请求以校验数据是否有效
    "role": {
      "bsonType": "array",
      "description": "角色",
      "label": "角色",
      "foreignKey": "uni-id-roles.role_id",
      "enum": {
        "collection": "uni-id-roles", // 表名，这里使用 uni-id-roles表举例，在uniCloud控制台使用 opendb 创建此表
        "field": "role_name as text, role_id as value", //字段筛选，需要 as 成前端组件支持的字段名 text、value。text、value是datacom组件规范的标准
        "where": "", // 查询条件
        "orderby": "" // 排序字段及正序倒叙设置
      }
    }
  }
}
```

除了普通的二维数据表，enum还支持tree型数据。

设置`enumType`为"tree"，代表enum里的数据为树形结构，比如下面的例子，代表opendb-city-china表以getTree方式查询。在schema2code时，可自动生成多级级联选择组件，[详见](/uniCloud/schema?id=schema2picker)
```json
{
  "schema": {
    "bsonType": "object",
    "required": ["city_id"],
    "properties": {
      "_id": {
        "description": "ID，系统自动生成"
      },
      "city_id": {
        "bsonType": "string",
        "title": "地址",
        "description": "城市编码",
        "foreignKey": "opendb-city-china.code",
        "enumType": "tree",
        "enum": {
          "collection": "opendb-city-china",
          "orderby": "value asc",
          "field": "code as value, name as text"
        }
      }
    }
  }
}

```


**注意**

- enum内对普通的二维数据表枚举时，此表数据不可超过500条

#### 默认值defaultValue/forceDefaultValue@defaultvalue

- defaultValue指定新增时当前字段默认值，客户端可以修改此值。
- forceDefaultValue也是指定新增时当前字段的默认值，与defaultValue不一样，forceDefaultValue不可被客户端修改。

在实际开发中，forceDefaultValue常用于设置为当前服务器时间、当前登录用户id、客户端ip时。

这些数据都不能通过前端上传，不安全。过去只能在云端写云函数操作。在schema配置后则可以不用写云函数。在前端通过clientDB方式新增数据记录时会自动补齐这些数据（云端操作数据库不识别schema）。

其中uid是和`uni-id`绑定的。如果用户没有登录，则无法获取uid，此时写入数据会报错。


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
|uid			|当前用户Id，基于`uni-id`。如果当前用户未登录或登录状态无效会报错	|

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

注意只有要对数据库写入内容时（新增记录或修改记录）才涉及字段值域的校验问题。

`DB Schema`里的字段值域校验系统由4部分组成：
1. 字段的属性配置：是否必填（required）、数据类型（bsonType）、数字范围（maximum、minimum）、字符串长度范围（minLength、maxLength）、format、pattern正则表达式
2. 字段的扩展校验函数：validateFunction。当属性配置不满足需求，需要写js编程进行校验时，使用本功能。
3. 字段间的关系约束：fieldRules。在schema一级节点，和properties平级，通过filedRules描述字段之间的关系，比如结束时间需大于开始时间。
4. 错误提示：errorMessage。常见错误有默认的错误提示语。开发者也可以自定义错误提示语

#### 1. 字段属性配置

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


#### 2. validateFunction扩展校验函数@validatefunction

扩展校验函数

当属性配置不满足需求，需要写js函数进行校验时，使用本功能。

**注意**

- 扩展校验函数不能有其他依赖
- 尽量不要在扩展校验函数中使用全局变量，如果一定要用请务必确保自己已经阅读并理解了[云函数的启动模式](uniCloud/cf-functions.md?id=launchtype)

如何使用

- 方式一：在uniCloud web控制台创建
1. uniCloud 控制台，选择服务空间，切换到数据库视图
2. 底部 “扩展校验函数” 点击 “+” 增加校验函数 ![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/2f4d0230-12a2-11eb-b244-a9f5e5565f30.png)
3. 给函数起个名字，比如叫“checkabc”

- 方式二：在HBuilderX中创建
`HBuilderX 3.0.0`及以上版本，可以在项目下创建扩展校验云函数并上传，使用方法如下：

1. 在左侧项目管理器选择工程，对其下的`uniCloud`目录点右键，选择`创建database目录`（如果已有该目录则忽略本步骤）
2. 在第一步创建的database目录右键选择`创建数据库扩展校验函数目录`
3. 在第二步创建的`validateFunction`目录右键选择`新建数据库扩展校验函数`

对`validateFunction`目录右键，还可以上传和下载`validateFunction`，和uniCloud web控制台进行同步。

扩展校验函数示例如下

  ```js
  // 扩展校验函数示例
  module.exports = function (rule, value, data, callback) {
    // rule  当前规则
    // value 当前规则校验数据
    // data  全部校验数据
    // callback 可选，一般用于自定义 errorMessage，如果执行了callback return 值无效，callback 传入的 message 将替换 errorMessage
    // callback('message') 传入错误消息时校验不通过
    // callback() 无参时通过
    // 注意 callback 不支持异步调用，异步请使用 Promise/await/async
    return value.length < 10
  }

  // 异步校验 Promise
  module.exports = function (rule, value, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value > 10) {
          // 校验通过
          resolve()
        } else {
          // 校验失败
          resolve('error') // 等于 reject(new Error('error'))
          // reject(new Error('error'))
        }
      }, 3000);
    })
  }

  // 异步校验 await/async
  module.exports = async function (rule, value, data) {
    let result = await uni.request({...})
    if (result > 10) {
      // 校验通过
      return true
    } else {
      // 校验失败
      return 'error message'
    }
  }
  ```

在HBuilderX中编写好`validateFunction`后，按Ctrl+u可以快捷上传`validateFunction`到uniCloud云端。

3. 在需要的字段中引用写好的`validateFunction`

编写`扩展校验函数`后，在表结构 schema 中确定要配置的字段，在该字段的`validateFunction`属性上，配置上面编写的`扩展校验函数`的名称。

如下例中，当name字段的内容要入库前，就会触发执行 "checkabc" 这个 `扩展校验函数` 。如果"checkabc"校验没有返回true，则该次数据库操作会失败。

`validateFunction` 类型为字符串时，云端和客户端同时生效

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


`validateFunction` 类型为对象时，可配置客户端同不生效，云端仍然生效

> HBuilder 3.1.0+ 支持

  ```json
  {
    "bsonType": "object",
    "required": ["name"],
    "properties": {
      "name": {
        "bsonType": "string",
        "label": "姓名",
        "validateFunction": {
            "name": "checkabc", // 扩展校验函数名
            "client": false //如果不配置默认是 true
        },
        "errorMessage": {
          "required": "{label}不能为空"
        }
      }
    }
  }
  ```

提示：如果配置了 `"client": false` 客户端也可以在生成的代码中改为自己的校验函数，此时客户端的校验仍然生效，客户端对应的校验文件目录为 `js_sdk/validator/collection`， `collection`为表名，非固定值


`扩展校验函数`是服务空间级的，一个`扩展校验函数`可以被这个服务空间下的任意表中的任意字段引用。

`扩展校验函数`里的代码是可以联网的。一个常见场景是内容的敏感词过滤，可以将内容提交到三方校验服务里，如果校验通过再入库。

不建议在`扩展校验函数`里编写大量的代码，会影响性能。

**扩展校验函数 的运行环境注意事项**

`扩展校验函数`的默认运行环境与普通云函数的环境相同，可以调用云函数里可用的各种API。
	* 如果要连接外网，要调用[uniCloud.httpclient](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=httpclient)；
	* 如果要调用数据库，需使用云函数里操作数据库的方式，即不支持JQL，[详见](https://uniapp.dcloud.net.cn/uniCloud/cf-database)

但是，在[schema2code](/uniCloud/schema?id=autocode)中，`扩展校验函数`也会被生成到前端页面的校验规则里。

也就是说，如果使用[schema2code](/uniCloud/schema?id=autocode)生成前端页面，那么写`扩展校验函数`需要多一层注意。

比如调用了uniCloud.httpclient这样在前端并不存在的API时，前端的表单校验会出错。

此时就需要在`扩展校验函数`中多写一个if判断，避免undefined的问题。

```js
if (uniCloud.httpclient) {
	console.log("此处运行在云函数环境里。前端没有这个API");
}
// 或者另一种写法
if (uni) {
	console.log("此处运行在前端环境里。云函数没有uni对象，除非你在validateFunction里自己定义了这个对象");
}
```


#### 3. fieldRules字段间校验@field-rules

自`HBuilderX 3.1.0`起，支持schema内配置一级节点fieldRules对字段之间的关系进行约束和校验。当然只校验一个字段也可以。

fieldRules的写法等同JQL的where写法（也可以使用各种数据库运算方法），参考：[clientDB where](uniCloud/clientdb.md?id=where)

fieldRules内配置如下，数组内可以配置多个rule，每个rule都有rule表达式、错误提示语、运行兼容环境这3部分。

```js
{
  "fieldRules": [{
    "rule": "end_date == null || end_date != null && create_date < end_date", // 校验规则
    "errorMessage": "创建时间和结束时间不匹配", // 错误提示信息（仅在新增时生效，更新数据时不会提示此信息）
    "client": false // schema2code时，当前规则是否带到前端也进行校验。目前此属性暂不生效，fieldRules不会在客户端校验数据，仅会在云端进行校验
  }],
}
```

rule表达式，是一组js，返回值必须为true或false。返回false则触发提示错误，错误提示显示的是errorMessage的内容。

rule表达式里支持：

1. 字段名称
2. 数据库运算方法
3. js语法
4. 另外还支持`new Date()`来获取时间。需要注意的是不同于数据库运算方法，`new Date()`内不可传入数据库字段作为参数

上述配置中，`create_date`、`end_date`为字段名称。schema内也支持写字段操作方法，如add方法。

例：在todo表内可以使用fieldRules限制`end_date`大于`create_date`

```json
{
  "bsonType": "object",
  "required": ["title","create_date"],
  "fieldRules": [{
    "rule": "end_date == null || end_date != null && create_date < end_date",
    "errorMessage": "结束时间需大于创建时间"
  }],
  "properties": {
    "title": {
      "bsonType": "string",
      "title": "标题"
    },
    "create_date": {
      "bsonType": "timestamp",
      "title": "创建时间",
      "forceDefaultValue": {
        "$env": "now"
      }
    },
    "end_date": {
      "bsonType": "timestamp",
      "title": "结束时间"
    }
  }
}
```
  
上述示例中，`create_date`为必填项，只需限制`end_date`存在时大于`create_date`即可

**注意**

- 新增/更新数据时会校验所有新增/更新字段相关联的fieldRules。如上述规则中，如果更新`end_date`字段或者`create_date`字段均会触发校验
- 新增数据时不需要查库进行校验，更新数据时需要进行一次查库校验（有多条fieldRules时也是一次）
- fieldRules内不支持使用正则

#### 4. errorMessage自定义错误提示@errormessage

数据不符合schema配置的规范时，无法入库，此时会报错。

uniCloud有一些基本错误提示语的格式化，如需自定义错误提示语，就需要使用本功能，根据errorMessage的定义报出错误提示。

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

“数据库中某字段值不能在多条记录中重复”，这个需求一般不是在字段值域校验里实现，而是在数据库索引里配置该字段为唯一索引。[详见](/uniCloud/hellodb?id=dbindex)

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

**注意**：如果登录用户是`uni-id`的admin角色，即超级管理员，则不受`DB Schema`的配置限制的，admin角色拥有对所有数据的读写权限。

例如在`uniCloud admin`等管理端系统，只要使用admin用户登录就可以在前端操作数据库。

在保存`DB Schema`时，如果发现服务空间下没有`uni-id`公共模块，会自动安装`uni-id`。如果服务空间已经存在`uni-id`，则不会再自动安装。此时需要注意及时升级`uni-id`，避免太老的`uni-id`有兼容问题。

#### 表级权限控制@col-permission

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
    "delete": false, // 禁止删除数据（admin权限用户不受限）
    "count": false // 禁止查询数据条数（admin权限用户不受限），新增于HBuilderX 3.1.0
  },
  "properties": {
    "_id":{},
    "name":{},
    "pwd": {}
  }
}
```
  
**关于count权限的说明**

- 在HBuilderX 3.1.0之前，count操作都会使用表级的read权限进行验证。HBuilderX 3.1.0及之后的版本，如果配置了count权限则会使用表级的read+count权限进行校验，两条均满足才可以通过校验
- 如果schema内没有count权限，则只会使用read权限进行校验
- 所有会统计数量的操作均会触发count权限校验

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

**注意**

- `auth.xxx`均由uni-id提供，依赖于[uni-id公共模块](uniCloud/uni-id.md)
- `doc.xxx`表示将要查询/修改/删除的每条数据（注意并不包括新增数据，新增数据应通过值域校验进行验证），如果将要访问的数据不满足permission规则将会拒绝执行
- `uni-id`的角色和权限，也即auth.role和auth.permission是不一样的概念。注意阅读[uni-id 角色权限](/uniCloud/uni-id?id=rbac)
- 如果想支持使用多个`action`的用法，可以通过`"'actionRequired' in action"`的形式配置权限，限制客户端使用的action内必须包含名为`actionRequired`的action
- doc是由客户端条件里面提取的变量，可以理解为将要访问的数据，因此create权限内不可使用doc变量，建议使用forceDefaultValue或自定义校验函数实现插入数据的校验。

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
    "update": "'updateuser' in auth.permission", // 权限标记为updateuser的用户，和admin管理员，可以更新数据，其他人无权更新数据
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
		  "write": "doc._id == auth.uid" // 允许登录的用户修改自己的name字段
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

forceDefaultValue属于数据校验的范畴，在数据插入时生效，但是如果配置forceDefaultValue为`{"$env": "uid"}`也会进行用户身份的校验，未登录用户不可插入数据。

例如在news表新增一条记录，权限需求是“未登录用户不能创建新闻”，其实不需要在news表的create权限里写`auth.uid != null`。只需把news表的uid字段的forceDefaultValue设为`"$env": "uid"`，create权限配置为true即可，未登录用户自然无法创建。当然实际使用时你可能需要更复杂的权限，直接使用true作为权限规则时务必注意

**permission和role的使用注意**

在schema中使用uni-id的permission和role，首先需要在uniCloud admin中创建好权限，然后创建角色并给该角色分配权限，最后创建用户并授权角色。

这样用户登录后，uniCloud会自动分析它的permission和role，在schema里编写的关于permission和role的限制也可以一一对应上，进行有效管理。

admin中创建权限、角色和用户授权，另见[文档](/uniCloud/admin?id=mutiladmin)

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
db.action("changenamelog").collection("user").doc("xxx").update({
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

### schema2code代码生成系统@autocode

`DB Schema`里有大量的信息，其实有了这些信息，前端将无需自己开发表单维护界面，uniCloud可以自动生成新增、修改、列表、详情的前端页面，以及admin端的列表、新增、修改、删除全套功能。

为强化表单的自定义性，`DB Schema`还扩展了label、componentForEdit、componentForShow、group、order等属性，以控制表单项在界面上的渲染控件。

`schema2code`不是简单的一键crud生成接口，它直接生成了可运行的页面。

`schema2code`代码生成系统功能包括：
- 自动生成前端页面，新增、修改、列表、详情页面文件，分别是add.vue、edit.vue、list.vue和detail.vue。
- 自动生成uniCloud admin页面，新增、修改、列表页面文件，分别是add.vue、edit.vue和list.vue。
- 自动生成前端表单校验规则

表单校验工作，在前端和后端都需要做。在过去，这造成重复投入。

现在，前后端的表单验证都被统一了。

开发者修改`DB Schema`并保存后，云端的校验规则直接生效。

然后开发者需要把这套校验规则导入到前端项目中。即利用本功能。

DCloud提供了`uni-forms`前端组件，该组件的表单校验规范完全符合`DB Schema`中的校验规则，实现云端统一。`uni-forms`组件地址：[https://ext.dcloud.net.cn/plugin?id=2773](https://ext.dcloud.net.cn/plugin?id=2773)


#### 快速上手schema2code生成“通讯录”
> 成品演示地址:[http://contacts-demo.dcloud.net.cn/](http://contacts-demo.dcloud.net.cn/)

##### 首先创建“带schema的通讯录”数据表
1. 登录 [uniCloud控制台](https://unicloud.dcloud.net.cn)，选中“云数据库”
2. 点击新建数据表
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ef863ed-d919-46f3-bd01-6092f2ed1e21.jpg)
3. 使用[OpenDB](https://gitee.com/dcloud/opendb)表模板创建： `opendb-contacts` 通讯录表
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/0e2ee195-05ae-4445-af41-45c41b2da70a.jpg)

##### schema2code有两种方式
- 方式1：在HBuilderX中操作
1.1 下载刚刚创建的通讯录表的schema
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/c2ea33f4-8619-41a6-bd14-5f9ce044985d.jpg)
1.2 项目根目录的 `uniCloud/database/opendb-contacts.schema.json`  文件上点击右键，或者在已打开的 Schema 编辑器点击右键.如果没有该菜单，请在插件市场安装插件：[https://ext.dcloud.net.cn/plugin?id=4684](https://ext.dcloud.net.cn/plugin?id=4684) 
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/82f69a99-c652-4cbc-a96b-1cfbe3d40529.jpg)
1.3 弹出一个对话框 `schema2code`，选择要导出的项目类型（uni-app用户端项目还是admin管理端项目），以及表字段名（去掉不需要在前端展现或编辑的字段）
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/fb49118b-364e-412b-9900-f275803cce37.jpg)
1.4 点击对话框右下角的确定按钮，将执行导入动作，如果导入的文件和工程中的文件有差异将弹出文件对比框，继续操作并确认导入
- 方式2：在uniCloud web控制台操作
2.1 选中刚创建好的数据表`opendb-contacts`，点击进入表结构schema界面，点击按钮 “schema2code”
  ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/3f93a350-2d13-4b8e-afb6-7dc367437b49.jpg)
2.2 点击“导入HBuilderX”或“下载zip”按钮，将生成的代码合并到自己的项目中
  ![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/ba87a6b0-1519-11eb-81ea-f115fe74321c.png)

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

> 注意：需HBuilderX 3.0.5+ 支持

> HBuilderX 3.1.15 schema2code 生成文件结构调整, 生成的 `pages.json` 改为 `page_init.json`，确认导入工程时自动合并到项目的 `pages.json`，`page_init.json`不会导入到工程中，仅在预览界面显示

> HBuilderX 3.1.15 之前的版本 `pages.json` 导入时会覆盖用户工程中已有的 `pages.json`，导入确认时选择不导入该文件手动拷贝内容到 `pages.json`

**全程演示视频**：
</br>
<video style="width:50vw;height:28vw;" id="video" preload="none" controls="controls"
	poster="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/a04e1d03-6d9f-43bf-a74b-80e9a5c31d7f.mp4?x-oss-process=video/snapshot,t_1000,f_jpg" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/a04e1d03-6d9f-43bf-a74b-80e9a5c31d7f.mp4"></video>






如果生成uniCloud admin页面，生成的列表页（list），需自行配置【排序字段】和【模糊搜索字段】。了解更多参考[clientDB](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=jssdk)。

以uniCloud admin内置页面【用户列表页】为例，要实现列表按注册时间排倒叙，要在列表上方的搜索框搜索，需在生成的list.vue页面的script区域修改如下配置：

```javascript
const dbOrderBy = 'register_date desc' // 排序字段，asc(升序)、desc(降序)
const dbSearchFields = ['username', 'role_name', 'mobile', 'email'] // 模糊搜索字段，支持模糊搜索的字段列表
```

`schema2code`是一个代码辅助生成工具。

#### 生成页面控件的默认策略

`DB Schema`配置的字段，在生成页面时使用什么组件渲染？决定关系如下：

- 如果配置了字段的component属性，则严格按component的配置执行。
- 如果没有配置component属性，那么默认有如下策略：
  * 字段类型为bool时，默认使用switch组件
  * 字段类型为Array时，默认使用uni-data-checkbox组件(显示为多选框)
  * 字段类型为int且使用enum时，默认使用uni-data-checkbox组件(显示为单选框)
  * 字段类型为int时，满足以下2个条件时，使用slider组件
   - 必填字段
   - 配置 `minimum` 或 `maximum`
  * 其他情况，将生成uni-easyinput组件。如果是数字类型，会同时把input的键盘类型设为数字。
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

#### component属性@component

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
      "enum": [
        {
          "text": "游泳",
          "value": 1
        },
        {
          "text": "骑行",
          "value": 2
        },
        {
          "text": "音乐",
          "value": 3
        },
        {
          "text": "美术",
          "value": 4
        }
      ]
    },
    "gender": {
      "bsonType": "int",
      "description": "用户性别：0 未知 1 男性 2 女性",
      "label": "性别",
      "enum": [{
        "text": "未知",
        "value": 0
      }, {
        "text": "男",
        "value": 1
      }, {
        "text": "女",
        "value": 2
      }],
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
        "children": "<option value=\"{value}\">{label}</option>",
        "childrenData": [{"label": "中文简体", "value": "zh-cn"}]
      }
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


#### 生成级联选择@schema2picker

以城市选择举例。

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/e56e7cc0-50b8-11eb-97b7-0dc4655d6e68.png)

在这个业务里涉及2个表，一个是用户的地址信息表[uni-id-address](https://gitee.com/dcloud/opendb/tree/master/collection/uni-id-address)，一个是候选的省市区数据表[opendb-city-china](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-city-china)。

在用户地址信息表的schema配置enumType和enum。如下：

用户地址表（完整的opendb表为[uni-id-address](https://gitee.com/dcloud/opendb/tree/master/collection/uni-id-address)，以下略做简化）
```json
{
  "bsonType": "object",
  "required": ["city_id"],
  "properties": {
    "_id": {
      "description": "ID，系统自动生成"
    },
    "city_id": {
      "bsonType": "string",
      "title": "地址",
      "description": "城市编码",
      "foreignKey": "opendb-city-china.code",
      "enumType": "tree",
      "enum": {
        "collection": "opendb-city-china",
        "orderby": "value asc",
        "field": "code as value, name as text, eq(type, 2) as isleaf"
      }
    }
  }
}
```

省市区数据表 [opendb-city-china](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-city-china) 的schema如下。树形数据查询另有详细文档，[详见](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=gettree)

```json
{
  "bsonType": "object",
  "required": ["code", "name"],
  "permission": {
    "read": true,
    "create": false,
    "update": false,
    "delete": false
  },
  "properties": {
    "_id": {
      "description": "ID，系统自动生成"
    },
    "code": {
      "bsonType": "string",
      "description": "编码"
    },
    "parent_code": {
      "bsonType": "string",
      "description": "父级编码",
      "parentKey": "code"
    },
    "name": {
      "bsonType": "string",
      "description": "城市名称",
      "title": "城市"
    },
    "type": {
      "bsonType": "int",
      "description": "城市类型；0省，1市，2区"
    }
  }
}
```

这2个表都是[opendb](https://gitee.com/dcloud/opendb)表，在uniCloud web控制台新建表时可以选择。opendb-city-china表自带全国省市区数据。

在web控制台的 用户地址表，选择表结构schema，点schema2code生成页面，在生成的代码中会使用多级联选择组件 `<uni-data-picker>`，效果是懒加载的，选择省后，会根据省的选择去拉取市的数据。

`<uni-data-picker>` 组件的文档另见：[https://ext.dcloud.net.cn/plugin?id=3796](https://ext.dcloud.net.cn/plugin?id=3796)
