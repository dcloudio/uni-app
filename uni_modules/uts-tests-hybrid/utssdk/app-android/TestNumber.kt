package uts.sdk.modules.utsTestsHybrid

import io.dcloud.uts.*


object TestNumber{
    
    fun testAll() {
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
    
    @Suppress("DEPRECATION","IMPLICIT_BOXING_IN_IDENTITY_EQUALS")
    fun testToFixed() {
        // #TEST Number.toFixed
        fun financial(x: Number): String {
            return x.toFixed(2)
        }
        console.log(financial(123.456))
        // expected output: "123.46"
        console.log(financial(0.004))
        // expected output: "0.00"
        // #END
    }
    
    fun testIsFinite() {
        // #TEST Number.isFinite
        console.log(isFinite(1000))
        //expected output:  true
        console.log(isFinite(910))
        //expected output:  true
        console.log(isFinite(0))
        //expected output:  false
        // #END
    }
    
    fun testIsInteger() {
        // #TEST Number.isInteger
        console.log(UTSNumber.isInteger(12))
        //expected output:  true
        console.log(UTSNumber.isInteger(12.01))
        //expected output:  false
        console.log(UTSNumber.isInteger(-213123112.01))
        //expected output:  false
        console.log(UTSNumber.isInteger(-213123112))
        //expected output:  true
        // #END
    }
    
    
    fun testIsNaN() {
        // #TEST Number.isNaN
        console.log(isNaN(0))
        //expected output: false
        var aj2 = JSON.parse("{\"a\":1}") as UTSJSONObject
        var aNumber = aj2["a"] as Number
        console.log(isNaN(aNumber))
        //expected output: false
        console.log(UTSNumber.isNaN(aNumber))
        //expected output: false
        console.log(UTSNumber.isNaN(11))
        //expected output: false
        console.log(UTSNumber.isNaN(null))
        //expected output: false
        console.log(UTSNumber.isNaN((1 as Number) / 0))
        //expected output: false
        
        // #END
    }
    
    
    fun testToPrecision() {
        // #TEST Number.toPrecision
        console.log(123.456.toPrecision(4))
        //expected output: "123.5"
        console.log(0.004.toPrecision(4))
        //expected output:  "0.004000"
        // #END
    }
    
    fun testToString() {
        // #TEST Number.toString
        console.log(10.toString(10))
        //expected output:  "10"
        console.log(17.toString(10))
        //expected output:  "17"
        console.log(17.2.toString(10))
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
    
    fun testValueOf() {
        // #TEST Number.valueOf
        console.log(10.valueOf())
        //expected output: 10
        console.log((-10.2).valueOf())
        //expected output:  -10.2
        console.log(0xf.valueOf())
        //expected output:  15
        // #END
    }
    
    fun testToInt() {
      // #TEST Number.toInt
      var a: Number = 12
      console.log(a.toInt())
      //expected output: 12
        
      var b: Number = 2147483648
      console.log(b.toInt())
      //expected output:  -2147483648
      // #END
    }
    
    fun testFrom() {
      // #TEST Number.toInt
      var a: Int = 12
      var b = UTSNumber.from(a)
      console.log(b)
      //expected output: 12
      // #END
    }
    
    
  
}