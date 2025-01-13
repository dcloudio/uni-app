@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING")
package uts.sdk.modules.testUniPlugin
import android.util.Log
import android.view.View
import android.widget.FrameLayout
import io.dcloud.uts.*
import io.dcloud.uts.Map
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import io.dcloud.uts.extapi.showModel as uni_showModel
import io.dcloud.uts.extapi.showToast as uni_showToast
fun test() {
    console.log("test")
}
fun login(name: String, pwd: String): UTSJSONObject {
    console.log("login")
    test()
    return UTSJSONObject(Map<String, Any?>(utsArrayOf(
        utsArrayOf(
            "name",
            name
        ),
        utsArrayOf(
            "pwd",
            pwd
        )
    )))
}
interface IUser {
    fun register(name: String)
}
val `default` = UTSAndroid.getResourcePath("uni_modules/test-uniplugin/static/logo.png")
typealias ShowToast = (msg: String) -> Unit
val test1 = arrayOf(1, 2, 3)
open class User : IUser {
    open fun login(name: String, pwd: String): UTSPromise<Unit> {
        return wrapUTSPromise(suspend {
                setTimeout(fun(){
                    console.log("timeout")
                }
                , 1000)
                uts.sdk.modules.testUniPlugin.login(name, pwd)
                run {
                    var i: Number = 0
                    while(i < 10){
                        console.log(i)
                        i++
                    }
                }
                Log.info(`default`)
                console.log("def android")
                console.log("ndef ios")
                console.log("def android || def ios")
                val a: Number = -3
                console.log(a.inv())
                XToast<XToast<*>>(getUniActivity()).setContentView(R.layout.toast_hint).setDuration(1000).setImageDrawable(android.R.id.icon, R.mipmap.ic_dialog_tip_finish).setText(android.R.id.message, "点我消失").show()
        })
    }
    override fun register(name: String, callback: () -> Unit) {
        Log.info(`default` as FrameLayout)
    }
    open fun test(view: View) {
        console.log(TestClass())
    }
}
fun login(name: String, callback: () -> Unit) {}
@Suppress("DEPRECATION")
fun register(name: String, callback: () -> Unit) {}
fun offMemoryWarning(callback: ((level: Number) -> Unit)? = null) {
    uni_showToast()
    uni_showToast()
    uni_showModel()
}
open class TestClass {
}
val showToast1: ShowToast = fun(msg){}
val showToast2: ShowToast = fun(msg) {}
val showToast3: ShowToast = fun(msg) {}
open class UserByJs : User {
    constructor() : super() {}
    open fun loginByJs(name: String, pwd: String) {
        return this.login(name, pwd)
    }
    open fun registerByJs(name: String, callback: UTSCallback) {
        return this.register(name, if (callback.fnJS != null) {
            callback.fnJS
        } else {
            callback.fnJS = fun(){
                callback()
            }
            callback.fnJS
        }
         as () -> Unit)
    }
    open fun testByJs(view: View) {
        return this.test(view)
    }
}
fun registerByJs(name: String, callback: UTSCallback) {
    return register(name, if (callback.fnJS != null) {
        callback.fnJS
    } else {
        callback.fnJS = fun(){
            callback()
        }
        callback.fnJS
    }
     as () -> Unit)
}
fun offMemoryWarningByJs(callback: UTSCallback? = null) {
    return offMemoryWarning(if (callback == null) {
        null
    } else {
        if (callback.fnJS != null) {
            callback.fnJS
        } else {
            callback.fnJS = fun(level: Number){
                callback(level)
            }
            callback.fnJS
        }
         as (level: Number) -> Unit
    }
    )
}
fun showToast1ByJs(msg: String): Unit {
    return showToast1(msg)
}
fun showToast2ByJs(msg: String): Unit {
    return showToast2(msg)
}
fun showToast3ByJs(msg: String): Unit {
    return showToast3(msg)
}
