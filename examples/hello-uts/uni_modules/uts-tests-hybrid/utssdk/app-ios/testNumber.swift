import Foundation
import DCloudUTSFoundation

class TestNumber {
    static func testAll() {
        testToFixed()
        testIsFinite()
        testIsInteger()
        testIsNaN()
        testToPrecision()
        testToString()
        testValueOf()
        testToInt()
        testFrom()
    }
    
    static func testToFixed() {
        // #TEST Number.toFixed
        let financial = { (x: NSNumber) in
            return x.toFixed(2)
        }
        
        console.log(financial(NSNumber(value: 123.456)))
        // expected output: "123.46"
        console.log(financial(NSNumber(value: 0.004)));
        // expected output: "0.00"
        
        let num: NSNumber = 3.1415926
        console.log(num.toFixed(2))
        //expected output: "3.14"
        // #END
    }
    
    static func testIsFinite() {
        // #TEST Number.isFinite
        console.log(NSNumber.isFinite(1000 / 1))
        //expected output:  true
        console.log(NSNumber.isFinite(910))
        //expected output:  true
        console.log(NSNumber.isFinite(Double.infinity))
        //expected output:  false
        // #END
    }
    
    static func testIsInteger() {
        // #TEST Number.isInteger
        console.log(NSNumber.isInteger(12))
        //expected output:  true
        console.log(NSNumber.isInteger(12.01))
        //expected output:  false
        console.log(NSNumber.isInteger(-213123112.01))
        //expected output:  false
        console.log(NSNumber.isInteger(-213123112))
        //expected output:  true
        // #END
    }
    
    static func testIsNaN() {
        // #TEST Number.isNaN
        console.log(isNaN(0))
        //expected output: false
        console.log(NSNumber.isNaN(0))
        // expected output: false
        let obj: UTSJSONObject? = JSON.parseObject("{\"a\":1}")
        let aNumber = obj?.getNumber("a") ?? 0
        console.log(NSNumber.isNaN(aNumber))
        //expected output:  false
        console.log(NSNumber.isNaN(11))
        //expected output:  false
        console.log(NSNumber.isNaN( 1 / 0))
        //expected output:  false
        // #END
    }
    
    static func testToPrecision() {
        // #TEST Number.toPrecision
        console.log(123.456.toPrecision(4))
        //expected output: "123.5"
        console.log((0.004).toPrecision(4))
        //expected output:  "0.004000"
        // #END
    }
    
    static func testToString() {
        // #TEST Number.toString
        console.log(10.toString())
        //expected output: "10"
        console.log(17.2.toString())
        //expected output:  "17.2"
        console.log(6.toString(2))
        //expected output:  "110"
        console.log(254.toString(16))
        //expected output:  "fe"
        console.log((-10).toString(2))
        //expected output:  "-1010"
        console.log(10.22.toString(8))
        //expected output:  "12.16050753412172704"
        console.log((-10.22).toString(8))
        //expected output:  "-12.16050753412172704"
        console.log(123456789987654.toString(16))
        //expected output:  "7048861cc146"
        console.log((-0xff).toString(2))
        //expected output:  "-11111111"
        // #END
    }
    
    static func testValueOf() {
        // #TEST Number.valueOf
        console.log(10.valueOf())
        //expected output: 10
        console.log((-10.2).valueOf())
        //expected output:  -10.2
        console.log(0xf.valueOf())
        //expected output:  15
        // #END
    }
    
    static func testToInt() {
        // #TEST Number.toInt
        let a: NSNumber = 12
        console.log(a.toInt())
        //expected output: 12
        
        let b: NSNumber = 2147483648
        console.log(b.toInt())
        //expected output:  -2147483648
        // #END
    }
    
    static func testFrom() {
        // #TEST Number.toInt
        let a: Int = 12
        let b = NSNumber.from(a)
        console.log(b)
        //expected output: 12
        // #END
    }
}
