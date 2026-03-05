## 类（Class）

uts 中使用关键字 `class` 声明类。

类声明由类名以及由花括号包围的类体构成。

```ts
// 定义Person Class
class Person {

}
```

### 基本概念

类是对象化的概念，有属性、方法、构造函数。
- 属性：是一个简单的值，可以是字符串、数字、布尔或另一个class。可以用 `对象.属性名` 的访问，也可以通过 `对象.属性名=xxx` 的方式赋值。
- 方法：是一段代码的集合，有入参、有返回值（均可选）。可以用 `对象.方法名(参数)` 的方式访问。
- 构造函数：用于初始化实例。详[见下](#uts-constructor)

下面的示例中，定义了一个 Person 的 class，它有一个属性 name，有一个构造函数 constructor（名称不可改），还有一个方法 getNameLength。

```ts
// 定义Person Class
class Person {
	name:string = ""; // 属性name
	constructor(newname:string) { // 构造函数，参数newname
		console.log("开始实例化");
		this.name = newname;
	}
	getNameLength():number{ // 方法getNameLength
		return this.name.length
	}
}
```

定义了class后，需要实例化（通过new关键字）。定义一个实例后，即可使用该实例对象的属性和方法。

一个class可以被多次实例化为不同的实例，互不影响。

```ts
//实例化上面定义的class并调用其属性方法
let p = new Person("tom"); // 使用 new 关键字实例化对象时，会自动触发构造函数
console.log(p.name); // 访问p这个对象的属性name，返回值tom
console.log(p.getNameLength()); // 调用p这个对象的方法getNameLength，返回值3

let p2 = new Person("jerry"); // 使用 new 关键字再实例化一个新对象
console.log(p2.name); //jerry
console.log(p2.getNameLength()); //5


```

### 构造函数（constructor）@uts-constructor

构造函数 constructor ，在创建新对象时（new的时候）会自动执行，用于初始化对象属性。

-   语法：

```ts
constructor([arguments]) { ... }
```

-   描述：

你可以不写构造函数。如果没有显式指定构造函数，运行环境会自动添加默认的 constructor 方法。

在一个类中只能有一个名为 “constructor” 的特殊方法。一个类中出现多次构造函数 (constructor)方法将会抛出一个 SyntaxError 错误。

-   示例：

```ts
class Person {
	name:string = "";
	constructor(newname:string) {
		this.name = newname;
	}
}

let person = new Person("tom"); // 使用 new 关键字创建对象时，会自动触发构造函数
console.log(person.name); // tom
```

在一个构造函数中可以使用 super 关键字来调用一个父类的构造函数。这涉及继承的概念。如不了解继承可[见下](#extends)
```ts
class Polygon {
    constructor() {
        this.name = "Polygon";
    }
}

class Square extends Polygon {
    constructor() {
        super();
    }
}
```

> 特别说明：
> iOS 平台中在实现无参的 constructor() 或者重写父类的某个有参的构造函数时需要在构造函数前加上 `@UTSiOS.override`。 示例如下：

```ts
class Polygon {
    @UTSiOS.override constructor() {
        this.name = "Polygon";
    }
}

class Square extends Polygon {
    @UTSiOS.override constructor() {
        super();
    }
}
```


### 实例属性

class 有实例属性和静态属性。uts 中实例属性存在于类的每一个实例中。

#### 声明实例属性

uts 可以在类中声明属性，默认可读，可写。

```ts
class Person {
	name:string = ""; // 声明实例属性name
	city:string = "beijing" // 声明实例属性city
	constructor(newname:string) {
		this.name = newname; // 在构造函数中对name重新赋值
	}
}

let person1 = new Person("tom"); // 使用 new 关键字创建对象时，会自动触发构造函数
console.log(person1.name); //tom
console.log(person1.city); //beijing
let person2 = new Person("jerry"); // 使用 new 关键字创建对象时，会自动触发构造函数
console.log(person2.name); //jerry
console.log(person2.city); //beijing
```

#### Getter 与 Setter

uts 支持通过 getters/setters 来截取对对象属性的访问。它可以理解为属性的读取/写入的拦截器。

下面的例子中，针对 person对象提供了name的get和set的拦截，paascode不正确时无法修改name的值。

```ts
const passcode = "secret passcode";
class Person {
	private _name: string = ""; // private是私有的，外部不能访问
	get name(): string { // 读取name会触发此拦截器
		console.log("start to get person.name");
		return this._name;
	}
	set name(newName: string) { // 给name赋值会触发此拦截器
		console.log("start to set person.name");
		if (passcode === "secret passcode") { // 校验是否有权修改name的值，这里的条件可以修改以方便测试
			this._name = newName;
		} else {
			console.log("Error: set person.name fail");
		}
	}
}
let p = new Person()
p.name = "tom" // 会打印"start to set person.name"
console.log(p.name); // 先打印"start to get person.name"，然后打印"tom"
```

#### readonly

uts 可以使用 readonly 关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

```ts
class Person {
	readonly name: string;
	readonly age: number = 0;
	constructor (theName: string) {
		this.name = theName;
	}
}
let p = new Person("tom");
console.log(p.name);
p.name = "jerry"; // 错误! name 是只读的
p.age = 1 // 错误！ age 是只读的
```

但 readonly 更多是一种开发环境的语法校验。在运行时，该值往往可以改变。

### 静态属性（static）

使用关键字 static 来将一个属性声明为静态属性。静态属性不会在实例中被调用，而只会被类本身调用。

```ts
class Person {
	static age:number = 10; // age是静态属性。不能在实例p中访问，但可以通过类Person访问
	getAge():number{
		return Person.age
	}
}
console.log(Person.age); //10
let p = new Person(); //新建一个实例
console.log(p.getAge()); //10
```

### 实例方法

uts 中实例方法存在于类的每一个实例中。

#### 声明实例方法

uts 可以在类中声明实例方法。

下面定义一个通过高度乘以宽度计算面积的类。

```ts
class Rectangle {
    private height:number;
    private width:number;
    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
    calcArea(): number {
        return this.height * this.width;
    }
}
```

使用一个实例方法，以类实例调用它即可：

```ts
const square = new Rectangle(10, 10);
square.calcArea(); // 100
```

### 静态方法（static）

使用关键字 static 来将一个方法声明为静态方法。静态方法不会在实例中被调用，而只会被类本身调用。它们经常是工具函数，比如用来创建或者复制对象。

```ts
class ClassWithStaticMethod {
    static staticMethod(): string {
        return "static method has been called.";
    }
}
ClassWithStaticMethod.staticMethod(); // 不实例化，直接调用class的方法
```

### 继承（extends）@extends

uts 允许使用继承来扩展现有的类。扩展的子类继承了父类的属性方法，但又可以添加自己独有的属性方法，以及复写父类定义的属性方法。

被继承的类称为父类（也称为超类、基类），新扩展的类称为子类（也称为派生类）。

比如定义了Person类存储人的基本信息，还可以定义一个Developer子类继承自Person类，在子类里追加Developer的独有信息。

-   语法：

```ts
class ChildClass extends ParentClass { ... }
```

-   描述：

extends 关键字用来创建一个类的子类。

-   示例：

```ts
// 定义父类
class Person {
	name:string = "";
	constructor(newname:string) {
		this.name = newname;
	}
}
// 定义子类
class Developer extends Person{
	likeLanguage:string = "ts"
  constructor(newname:string) {
    super(newname)
	}
}

let d = new Developer("tom"); // 实例化。由于子类没有声明和复写自己的构造函数，所以默认继承了父类的构造函数
console.log(d.name); // tom
console.log(d.likeLanguage); // ts
```

- 子类必须包含构造函数的实现且必须使用 `super` 调用父类的构造函数。
- 如果要控制父类中某些属性方法不被子类继承，可使用可见性修饰符（private、protected等），具体[见下](#modifier)
- 多重继承：子类还可以被孙类继承

#### 覆盖方法（override）

覆盖，也称为复写、重写。在继承中，用于在子类中改写父类定义的方法或属性。

uts 对于可覆盖的成员以及覆盖后的成员需要显式修饰符override。

```ts
class Polygon {
    name(): string {
        return "Polygon";
    }
}

class Square extends Polygon {
    constructor() {
      super()
    }
    override name(): string {
        return "Square";
    }
}
```

Square.name 函数上必须加上 override 修饰符。如果没写，编译器会报错。

#### 覆盖属性

属性与方法的覆盖机制相同。父类中已声明的同名属性，在子类中重新声明必须以 override 开头，并且它们必须具有兼容的类型（都是字符串、或数字、布尔值等）。

```ts
class Shape {
     vertexCount: Int = 0
}

class Rectangle extends Shape {
    constructor() {
        super()
    }
    override vertexCount : Int = 4
}
```

> 特别说明：
> iOS 平台中不允许覆盖和父类同名的存储属性，但是可以覆盖和父类同名的计算属性。

#### 调用父类实现

子类中的代码可以使用 super 关键字调用其父类的方法。不能跨级调用父类的父类（爷爷类）的方法。

```ts
class Rectangle {
    draw() {}
}
class FilledRectangle extends Rectangle {
    constructor() {
        super()
    }
    override draw() {
        super.draw();
    }
}
```

<!-- ### 抽象类（Abstract Class）@abstract-class

抽象类是一种用于提供基础类和共享实现的特殊类。尚未实现的属性和方法是抽象属性和抽象方法统称为抽象成员，抽象成员必须存在于抽象类中。抽象类本身不能被实例化，它只能作为其他类的基类，被其他类继承并实现其抽象成员。

通过使用 `abstract` 关键字来声明抽象类以及抽象类中的抽象成员。抽象类还可以包含具体实现。

```ts
abstract class APerson {
    // 抽象属性
    abstract name: string
    // 具体属性
    age: number = 0
    // 抽象方法
    abstract printName(): void
    // 具体方法
    printAge() {
        console.log(this.name)
    }
}
```

#### 继承抽象类

抽象类可以被其他类继承。子类继承抽象类后，需要实现抽象类中的抽象成员。

```ts
class Person1 extends Person {
    name: string
    constructor (name: string) {
        super()
        this.name = name
    }
    printName(): void {
        console.log(this.name)
    }
}
``` -->

### 可见性修饰符@modifier

类的方法与属性都可以有可见性修饰符。

在 uts 中有三个可见性修饰符：private、 protected、 和 public。 默认可见性是 public。

#### public

在 uts 中可以自由的访问程序里定义的 public 成员，这也是 uts 的默认行为。

#### private

当成员被标记成 private 时，它就不能在声明它的类的外部访问。比如：

```ts
class Person {
    private name: string = "Cat";
}

new Person().name; // 错误: 'name' 是私有的.
```

#### protected

protected 修饰符与 private 修饰符的行为很相似，但有一点不同，protected 成员在继承的派生类中仍然可以访问。比如：

```ts
class Person {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch(): string {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
const howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

注意，我们不能在 Person 类外使用 name，但是我们仍然可以通过 Employee 类的实例方法访问，因为 Employee 是由 Person 派生而来的。

### this

`this` 只能用在成员函数（类的方法）内部，`this` 引用的是调用该函数的对象实例。`this` 的指向不受函数作用域的影响，也不可以被改变。

```ts
class Test {
  test() {
    console.log(this) // Test 的实例对象
    function fn() {
      console.log(this) // 仍然是 Test 的实例对象
    }
    fn()
  }
}
```

受目标语言的限制，编译到 kotlin/swift 时，`this` 可以缺省，此特性目前无法屏蔽，但不推荐主动使用。当类的成员命名与外层变量同名时，需注意区分。

```ts
const a = 1

class Test {
  a = 0
  test() {
    console.log(a) // this.a 0
  }
}
```

### 平台专有用法

#### kotlin 平台获取 Java Class 对象 [UTSAndroid.getJavaClass](utsandroid.md#getjavaclass)

#### kotlin 平台 Class 特殊方法说明

在kotlin平台，class 里的某些方法是具备特殊含义的，整理记录如下：

|方法名|简介|详细说明|
|:-----|:--|:---|
|equals|定义当前对象实例是否与另外一个对象实例相同|[文档](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-any/equals.html)|
|hashcode|定义当前对象实例的散列计算过程，常用于在容器中标记当前对象实例的唯一性|[文档](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-any/hash-code.html)|
|toString|以字符串的方式序列化描述当前对象实例|[文档](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-any/to-string.html)|


更多介绍参考 [文档](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-any/)

#### kotlin 平台匿名内部类写法

```ts
const runnable = new (class implements Runnable {
	override run() {
		
	}
})
```

