# 泛型（Generics）

UTS 支持泛型（Generics）特性，允许您编写更通用、可重用的代码，同时提高类型安全性。

## 定义泛型

泛型使用尖括号 `<>` 声明一个或多个泛型参数。

## 泛型函数

泛型函数的泛型参数定义在函数参数的圆括号之前。

```ts
function test<T>(arg: T): T {
  return arg
}

const str: string = test<string>('a')

const num: number = test<number>(1)
```

**注意**

编译为 Kotlin、Swift 时，箭头函数不支持泛型。

## 泛型类

泛型类的泛型参数定义在类名之后。

```ts
class Test<T> {
  value: T
  constructor (value: T) {
    this.value = value
  }
}

const test1: Test<string> = new Test<string>('a')
const str1: string = test1.value

const test2: Test<number> = new Test<number>(1)
const num1: number = test2.value
```

## 泛型接口

泛型接口与泛型类相似，泛型参数定义在接口名之后。

```ts
interface ITest<T> {
  value: T
}

class TestImpl<T> implements ITest<T> {
  value: T
}
```

## 泛型推断

当泛型参数类型与函数的参数类型相关时，泛型参数能够根据函数参数类型自动推断，此时可以省略泛型参数。

```ts
const str1 = test<string>('a')
const str2 = test('a')
```

## 泛型约束

可以使用 `extends` 关键字来限制泛型参数的类型范围。

```ts
function testArray<T extends Array<string>>(arg: T): T {
  return arg
}
```

使用其他泛型类型时，如果不需要限制泛型参数的类型可以使用 `unknown` 关键字表示。

```ts
function testArray<T extends Array<unknown>>(arg: T): T {
  return arg
}
```

## 泛型使用场景示例

- 泛型用法最常用的是在request api里，[详见](../tutorial/request.md)
- 网络请求包装推荐使用成熟的网络拦截器插件，见[插件市场](https://ext.dcloud.net.cn/search?q=%E7%BD%91%E7%BB%9C%E6%8B%A6%E6%88%AA%E5%99%A8&uni-appx=1)


## 注意事项

### 安卓平台使用泛型注意事项

ts本质是擦除类型的。在强类型语言中，传递泛型时如将泛型类型作为值使用，需通过特殊方式将泛型类型作为值使用，可以根据传入来动态决定返回类型:

如果在UTS中声明一个包含泛型声明的方法，可能会出现泛型丢失，原因是因为普通的kotlin 方法没有实现泛型的传递

错误的kt代码：

```kotlin
fun <T> getArtListByres(): A<T>? {
   var aRet = UTSAndroid.consoleDebugError(JSON.parse<A<T>>("{\"x\":111,\"y\":\"aaa\",\"t\":{\"name\":\"zhangsan\"}}"), " at pages/index/index.uvue:27");
   return aRet;
}
```

期望得到的正确的kt代码：

```ts
inline fun <reified T> getArtListByres(): A<T>? {
    var aRet = UTSAndroid.consoleDebugError(JSON.parse<A<T>>("{\"x\":111,\"y\":\"aaa\",\"t\":{\"name\":\"zhangsan\"}}"), " at pages/index/index.uvue:27");
    return aRet;
}
```

为了解决这种情况，我们可以在UTS中 添加android方法注解，来告诉编译器生成正确的代码：

```kotlin
@UTSAndroid.keyword("inline")
@UTSAndroid.keyword('reified')
export function request<T>(options : RequestOptions<T>) : RequestTask {
	//xxx
}
```


**注意：不要在`inline`方法中创建局部function，比如request的success回调、Promise的回调，原因是kotlin语言的限制（inline方法展开到内联位置，也会把局部方法展开过去，这是不允许的），由此把使用局部function的逻辑封装到非内联的方法中，绕过此限制。**  

下面是可以完整的示例：

```
@UTSAndroid.keyword("inline")
@UTSAndroid.keyword("reified")
export function boxRequest<T>(url : string) : Promise<T> {
	return innerRequest<T>(url, UTSAndroid.getGenericClassName<T>(), UTSAndroid.getGenericType<T>())
}

function innerRequest<T>(url : string, clzName : string, type : Type) : Promise<T> {
	return new Promise<T>((resolve, reject) => {
		uni.request<string>({
			url: url,
			method: "GET",
			success: (e : RequestSuccess<string>) => {
				const result = JSON.parse<T>(e.data!, type)
				if (result != null) {
					resolve(result)
				} else if ("java.lang.Object".equals(clzName, true)) {// 解决泛型是any，但后端返回string的情况。
					resolve(e.data! as T)
				} else{
					reject("parsing failure")
				}
			},
			fail(e : RequestFail) {
				reject(e)
			},
		} as RequestOptions<string>)
	});
}
```
调用代码：
```
const respone = await boxRequest<CustomType>("xxxx")
```

此示例中，网络请求泛型为`string`在4.25版本以下会导致错误，此问题已在4.25进行修复 [issue](https://issues.dcloud.net.cn/pages/issues/detail?id=4010)



### iOS 平台使用泛型注意事项

由于 iOS 平台 uni-app x 中的 uvue 运行在 js 环境中，以及 swift 语法的特殊性，泛型在 iOS 平台上的使用有一定限制和差异。

在 uvue 中使用：
- uvue 中可以正常使用泛型，iOS 平台上 uvue运行在 js 环境中，在 uvue 中的泛型就是 js 泛型。
- 在 uvue 页面中使用的泛型类型传递给 uts 插件使用时，泛型信息会丢失。

在 uts 插件中使用：
- uts 插件中支持使用泛型函数、泛型类、泛型约束、泛型推断。目前仅适合在 uts 插件内部使用，运行在纯 swift 环境中。
- uts 插件中暂不支持泛型接口的定义。
- uts 插件中不能导出泛型函数、泛型类给 js 和其他 uts 插件使用。
  + 说明：因为导出的泛型函数、泛型类不能被反射识别，无法使用。导出泛型函数还可能会导致编译失败。


下面是在 uts 插件内部使用泛型的一些示例代码：

泛型函数和泛型推断示例，泛型用在返回值上：

```ts
// 定义泛型函数
function test1<T>(param: any): T | null {
	if (param instanceof T) {
		return param as T
	}
	return null
}

// 使用：
let str: string | null = test1<string>("12345")
console.log(str)
```

> 特别注意：

> 在 `swift` 中调用泛型函数时不能直接指定泛型类型，只能靠参数或者返回值来进行泛型类型的推断。

> 上述示例代码使用泛型函数时，给变量 `str` 指定了具体类型，这个是必须的，且指定的类型要和泛型函数的返回值是否可选保持一致（泛型函数返回值是 T | null, str 类型就得是 string | null, 否则
> 将会因为推断不出泛型类型导致编译报错。

泛型类和泛型约束示例：

```ts
// 自定义type
type MyResult = {
	name: string
	age: number
}

// 定义泛型类，并指定泛型约束
class TestOption<T extends Decodable> {
	a: string = ""
	b: number = 0
	success?: (res: T) => void
}

// 定义泛型函数
function test2<T extends Decodable>(param: TestOption<T>) {

	let str = "{\"name\":\"2024\",\"age\":2}"
	// 这句代码是为了让编译给 MyResult 实现 Decodable 协议，不可省略。后续版本会给出让开发者指定某个 type 遵循 Decodable 协议的方式。
	JSON.parseObject<MyResult>(str)

	let ret = JSON.parseObject<T>(str)
	if (ret != null) {
		param.success?.(ret!)
	}
}

// 使用：
let p = new TestOption<MyResult>()
p.success = (res: MyResult) => {
	console.log(res)
}
test2<MyResult>(p)
```

> 特别注意：

> HBuilderX 4.25+ 支持自定义 type 上指定泛型。
