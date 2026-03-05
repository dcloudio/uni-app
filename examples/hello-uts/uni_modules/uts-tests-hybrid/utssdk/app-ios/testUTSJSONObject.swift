import Foundation
import DCloudUTSFoundation

class TestUTSJSONObject {
    static func testKeys() {
        // #TEST UTSJSONObject.keys
        let obj = UTSJSONObject(dictionary: [
            "name": "zhangsan",
            "age": 11
        ])
        let ret1 = UTSJSONObject.keys(obj).length
        console.log(ret1) //2
        // #END
    }
    
    static func testAssign() {
        // #TEST UTSJSONObject.assign
        let target = UTSJSONObject(dictionary: [
            "a": 1,
            "b": 2
        ]);
        let source = UTSJSONObject(dictionary: [
            "b": 4,
            "c": 5
        ])
        // 得到一个UTSJSONObject对象
        let returnedTarget = UTSJSONObject.assign(target, source);
        console.log(returnedTarget.toMap().count) //3
        // #END
        
        // #TEST UTSJSONObject.assign
        let target1 = UTSJSONObject(dictionary: [
            "a": 1,
            "b": 2
        ]);
        let source1 = UTSJSONObject(dictionary: [
            "b": 4,
            "c": 5
        ])
        // 得到一个UTSJSONObject对象
        let ret = UTSJSONObject.assign(target1, source1, type: UTSJSONObject.self);
        console.log(ret) // {"a": 1, "b": 4, "c": 5}
        // #END
    }
    
    static func testGetNumber() {
        // #TEST UTSJSONObject.getNumber
        let obj = UTSJSONObject(dictionary: [
            "qq": [11, 22]
        ])
        console.log(obj.getNumber("obj[2]")) // null
        console.log(obj.getNumber("obj[2]", 999)) // 999
        // #END
    }
    
    static func testGetJSON() {
        // #TEST UTSJSONObject.getJSON
        let obj = UTSJSONObject(dictionary: [
            "cars": [
                UTSJSONObject(dictionary: [
                    "name": "car1",
                    "value": 100
                ])
            ]
        ])
        let firstCar = obj.getJSON("cars[0]")
        console.log(firstCar!["value"]) // 100
        // #END
    }
    
    static func testGetArray() {
        // #TEST UTSJSONObject.getArray
        let obj = UTSJSONObject(dictionary: [
            "cars": [
                UTSJSONObject(dictionary: [
                    "name": "car1",
                    "value": 100
                ])
            ]
        ])
        
        let cars: [UTSJSONObject]? = obj.getArray("cars")
        cars![0].set("value", 20)
        console.log(cars![0]["value"]) // 20
        // #END
        
        // #TEST UTSJSONObject.getArray_1
        //这个方法用来获取指定元素类型的数组
        let obj1 = JSON.parseObject("{\"name\":\"tom\",\"tag\":[\"student\",\"user\"]}")

        // 这里得到是 Array<*>
        let noGenericArray = obj1!.getArray("tag")
        console.log(noGenericArray)

        // 这里得到是 Array<string>, 注意：要手动指定返回值类型，以便Swift进行泛型推断
        let genericArray: [String]? = obj1!.getArray("tag")
        console.log(genericArray) //["student", "user"]
        // #END
    }
    
    static func testGetString() {
        // #TEST UTSJSONObject.getString
        let obj = UTSJSONObject()
        var i = 0
        while i < 100 {
            obj.set("\(i)", "\(i)")
            i++
        }
        
        let startTime = Date.now()
        var j = 0
        while j < 10000 {
            obj.getString("0")
            j++
        }
        let spendTime = Date.now() - startTime
        console.log(spendTime < 800) // true
        // #END
    }
    
    static func testSample() {
        // #TEST UTSJSONObject.sample_create,UTSJSONObject.get,UTSJSONObject.set
        var person: UTSJSONObject = UTSJSONObject([
           "name": "Tom",
           "printName": {() -> Void in}
        ])
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String? = person["name"] as? String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as? String
        
        //增加或更新指定键对应的值。
        person.set("name", "Tom1")
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
        // #END
        
        // #TEST UTSJSONObject.sample_create1
        
        // 写法1 推荐
        var person1: UTSJSONObject = JSON.parseObject("{\"name\":\"Tom\"}")!
        
        // 写法2 推荐
        let person2: UTSJSONObject = JSON.parse("{\"name\":\"Tom\"}", UTSJSONObject.self)!
        
        // 写法3  如果 as 转换的实际类型不匹配 会导致 crash，建议先通过 `instanceof` 判断类型再进行as转换。
        let parseRet3 = JSON.parse("{\"name\":\"Tom\"}")
        if parseRet3 is UTSJSONObject {
            person = parseRet3 as! UTSJSONObject
        }

        // #END
        
        // #TEST UTSJSONObject.toMap
        person1 = JSON.parseObject("{\"name\":\"Tom\"}")!
        person1.toMap().forEach { value, key in
            console.log(key, value)
        }
        // #END
    }
    
    static func testConvert() {
        
        // #TEST UTSJSONObject.convert
        
        //自定义class 如果需要使用JSON.stringify 或者 JSON.parse处理，则需要实现 Codable 协议
        //通常 uts 代码中 Class 的Codable 协议的实现由编译器自动实现，因此，这类代码不建议在混编代码中使用，除非你能很熟练的使用Codable协议
        class User : Codable {
            var name: String
            var age: NSNumber
            
            public init(_ obj: UTSJSONObject) {
                self.name = obj["name"] as! String
                self.age = obj["age"] as! NSNumber
            }
            
            enum CodingKeys: String, CodingKey { case name; case age }
            
            required public init(from decoder: Decoder) throws {
                let container = try decoder.container(keyedBy: CodingKeys.self)
                self.name = try container.decode(String.self, forKey: .name, decoder)
                self.age = try container.decode(NSNumber.self, forKey: .age, decoder)
            }
            
            func encode(to encoder: Encoder) throws {
                var container = encoder.container(keyedBy: CodingKeys.self)
                try container.encode(name, forKey: .name, encoder)
                try container.encode(age, forKey: .age, encoder)
            }
        }
        
        let jsonObj = UTSJSONObject([
            "name": "张三",
            "age": 12 as NSNumber
        ])
        
        let userA = JSON.parse(JSON.stringify(jsonObj)!, User.self)
        console.log(userA?.name)
        
        let utsJsonA = JSON.parseObject(JSON.stringify(userA)!)
        console.log(utsJsonA)
        // #END
    }
    
    static func testAll() {
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
