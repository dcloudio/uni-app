package uts.sdk.modules.utsTestsHybrid

import io.dcloud.uts.*

object TestUTSJSONObject{
  
    fun testKeys() {
        // #TEST UTSJSONObject.keys
        var obj: UTSJSONObject = object : UTSJSONObject() {
            var name = "zhangsan"
            var age: Number = 11
        }
        var ret1 = UTSJSONObject.keys(obj).length
        console.log(ret1) //2
        // #END
    }
  
    fun testAssign() {
        // #TEST UTSJSONObject.assign
        var target: UTSJSONObject = object : UTSJSONObject() {
            var a: Number = 1
            var b: Number = 2
        }
        var source: UTSJSONObject = object : UTSJSONObject() {
            var b: Number = 4
            var c: Number = 5
        }
        // 得到一个UTSJSONObject对象
        var returnedTarget = UTSJSONObject.assign(target, source)
        console.log(returnedTarget.toMap().count()) //3
        // #END
        
        // #TEST UTSJSONObject.assign
        var target1: UTSJSONObject = object : UTSJSONObject() {
            var a: Number = 1
            var b: Number = 2
        }
        var source1: UTSJSONObject = object : UTSJSONObject() {
            var b: Number = 4
            var c: Number = 5
        }
        // 得到一个UTSJSONObject对象
        var returned = UTSJSONObject.assign<UTSJSONObject>(target1, source1)
        console.log(returned) // {"a": 1, "b": 4, "c": 5}
        // #END
    }
    
    fun testGetNumber() {
        // #TEST UTSJSONObject.getNumber
        var test: UTSJSONObject = object : UTSJSONObject(UTSSourceMapPosition("test", "pages/index/index.uvue", 48, 8)) {
            var qq: UTSArray<Number> = utsArrayOf(
                11,
                22
            )
        }
        console.log(test.getNumber("qq[2]")) // null
        console.log(test.getNumber("qq[2]")) // 999
        // #END
    }
    
    fun testGetJSON() {
        // #TEST UTSJSONObject.getJSON
        var obj: UTSJSONObject = object : UTSJSONObject() {
          var cars = utsArrayOf(
              object : UTSJSONObject() {
                  var name = "car1"
                  var value: Number = 100
              }
          )
        }
        var firstCar = obj.getJSON("cars[0]")
        console.log(firstCar!!["value"]) // 100
        // #END
    }
    
    fun testGetArray() {
        // #TEST UTSJSONObject.getArray
        var obj: UTSJSONObject = object : UTSJSONObject() {
            var cars = utsArrayOf(
                object : UTSJSONObject() {
                    var name = "car1"
                    var value: Number = 100
                }
            )
        }
        
        var cars: UTSArray<UTSJSONObject>? = obj.getArray<UTSJSONObject>("cars")
        cars!![0].set("value", 20)
        console.log(cars[0]["value"]) // 20
        // #END
        
        // #TEST UTSJSONObject.getArray_1
        //这个方法用来获取指定元素类型的数组
        var obj1 = JSON.parseObject("{\"name\":\"tom\",\"tag\":[\"student\",\"user\"]}")
        
        // 这里得到是 Array<*>
        var noGenericArray = obj1!!.getArray("tag")
        console.log(noGenericArray)
        
        // 这里得到是 Array<string>, 注意：要手动指定返回值类型，以便Swift进行泛型推断
        var genericArray = obj1.getArray<String>("tag")
        console.log(genericArray) //["student", "user"]
        // #END
    }
    
    
    fun testGetString() {
        // #TEST UTSJSONObject.getString
        
        val utsObj: UTSJSONObject = UTSJSONObject()
        run {
            var i: Number = 0
            while(i < 100){
                utsObj.set("" + i, "" + i)
                i++
            }
        }
        console.log("--start--")
        var startTime = Date.now()
        run {
            var i: Number = 0
            while(i < 10000){
                utsObj.getString("0")
                i++
            }
        }

        var spendTime = Date.now() - startTime
        console.log(spendTime < 800) // true
        // #END
    }
    
    @Suppress("UNUSED_VALUE","ASSIGNED_BUT_NEVER_ACCESSED_VARIABLE","UNUSED_VARIABLE")
    fun testSample() {
        // #TEST UTSJSONObject.sample_create,UTSJSONObject.get,UTSJSONObject.set
        var person: UTSJSONObject = object : UTSJSONObject() {
            var name = "Tom"
            var printName = fun(){
                console.log(name)
            }
        }
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String = person["name"] as String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as String
        
        //增加或更新指定键对应的值。
        person["name"] = "Tom1"
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
        // #END
        
        // #TEST UTSJSONObject.sample_create1
        
        // 写法1 推荐
         var person1: UTSJSONObject = JSON.parseObject("{\"name\":\"Tom\"}")!!
        
        // 写法2 推荐
        val person2: UTSJSONObject = JSON.parse<UTSJSONObject>("{\"name\":\"Tom\"}")!!
        
        // 写法3  如果 as 转换的实际类型不匹配 会导致 crash，建议先通过 `instanceof` 判断类型再进行as转换。
        val parseRet3 = JSON.parse("{\"name\":\"Tom\"}")
        if (parseRet3 is UTSJSONObject) {
            person = parseRet3
        }
        // #END
        // #TEST UTSJSONObject.toMap
        val person0 = JSON.parseObject("{\"name\":\"Tom\"}")!!
        person0.toMap().forEach(fun(value, key){
            console.log(key)
            console.log(value)
        })
        // #END
    }
    
    fun testConvert() {
        
        // #TEST UTSJSONObject.convert
        
        open class User (
            @JsonNotNull
            open var name: String,
            @JsonNotNull
            open var age: Number,
        ) : UTSObject() {
            
        }
        var jsonObj: UTSJSONObject = object : UTSJSONObject() {
            var name = "张三"
            var age: Number = 12
        }
        // UTSJSONObject => 自定义type
        var userA = JSON.parse<User>(JSON.stringify(jsonObj))!!
        console.log(userA.name)
        // 自定义type => UTSJSONObject
        var utsJsonA = JSON.parseObject(JSON.stringify(userA))!!
        console.log(utsJsonA)
        // #END
    }
    
    fun testAll(){
      testKeys()
      testAssign()
      testGetNumber()
      testGetJSON()
      testGetArray()
      testGetString()
      testSample()
      testConvert()
    }
}