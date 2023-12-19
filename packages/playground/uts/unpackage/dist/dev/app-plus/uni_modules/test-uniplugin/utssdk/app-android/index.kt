@file:Suppress("UNCHECKED_CAST")
package uts.modules.modules.testUniPlugin;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
import android.widget.FrameLayout;
import android.util.Log;
import android.view.View;
import io.dcloud.uts.extapi.showModel as uni_showModel;
import io.dcloud.uts.extapi.showToast as uni_showToast;
fun test() {
    console.log("test", " at uni_modules/test-uniplugin/utssdk/app-android/utils.uts:2");
}
fun login(name: String, pwd: String): UTSJSONObject {
    console.log("login", " at uni_modules/test-uniplugin/utssdk/app-android/login.uts:3");
    test();
    return object : UTSJSONObject() {
        var name = name
        var pwd = pwd
    };
}
interface IUser {
    fun register(name: String): Unit;
}
val `default` = UTSAndroid.getResourcePath("uni_modules/test-uniplugin/static/logo.png");
typealias ShowToast = (msg: String) -> Unit;
val test1 = arrayOf(1, 2, 3);
open class User : IUser {
    open fun login(name: String, pwd: String): UTSPromise<Unit> {
        suspend fun async(): Unit {
            setTimeout(fun(){
                console.log("timeout", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:19");
            }
            , 1000);
            uts.modules.modules.testUniPlugin.login(name, pwd);
            run {
                var i: Number = 0;
                while(i < 10){
                    console.log(i, " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:23");
                    i++;
                }
            }
            Log.info(`default`);
            console.log("def android", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:27");
            console.log("ndef ios", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:36");
            console.log("def android || def ios", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:39");
            val a: Number = -3;
            console.log(a.inv(), " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:45");
            XToast<XToast<*>>(getUniActivity()).setContentView(R.layout.toast_hint).setDuration(1000).setImageDrawable(android.R.id.icon, R.mipmap.ic_dialog_tip_finish).setText(android.R.id.message, "点我消失").show();
        }
        return UTSPromise(fun(resolve, reject) {
            kotlinx.coroutines.CoroutineScope(io.dcloud.uts.UTSAndroid.getDomCoroutineDispatcher()).async {
                try {
                    val result = async();
                    resolve(result);
                }
                 catch (e: Throwable) {
                    reject(e);
                }
            }
            ;
        }
        );
    }
    override fun register(name: String, callback: () -> Unit) {
        Log.info(`default` as FrameLayout);
    }
    open fun test(view: View) {
        console.log(TestClass(), " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:57");
    }
}
fun login(name: String, callback: () -> Unit) {}
@Suppress("DEPRECATION")
fun register(name: String, callback: () -> Unit) {}
fun offMemoryWarning(callback: ((level: Number) -> Unit)? = null) {
    uni_showToast();
    uni_showToast();
    uni_showModel();
}
open class TestClass {
}
val showToast1: ShowToast = fun(msg){};
val showToast2: ShowToast = fun(msg) {};
val showToast3: ShowToast = fun(msg) {};
open class UserByJs : User {
    constructor() : super() {}
    open fun loginByJs(name: String, pwd: String) {
        return login(name, pwd);
    }
    open fun registerByJs(name: String, callback: UTSCallback) {
        return register(name, fun(){
            callback();
        }
        );
    }
    open fun testByJs(view: View) {
        return test(view);
    }
}
fun registerByJs(name: String, callback: UTSCallback) {
    return register(name, fun(){
        callback();
    }
    );
}
fun offMemoryWarningByJs(callback: UTSCallback? = null) {
    return offMemoryWarning(fun(level: Number){
        callback?.invoke(level);
    }
    );
}
fun showToast1ByJs(msg: String): Unit {
    return showToast1(msg);
}
fun showToast2ByJs(msg: String): Unit {
    return showToast2(msg);
}
fun showToast3ByJs(msg: String): Unit {
    return showToast3(msg);
}
