package uts.modules.testUniPlugin;
import kotlinx.coroutines.*;
import io.dcloud.uts.runtime.*;
import io.dcloud.uts.android.getResourcePath;
import android.util.Log;
import android.widget.FrameLayout;
import android.view.View;
interface IUser {
    fun register(name: String): Unit;
}
fun login(name: String, pwd: String): UTSJSONObject {
    console.log("login", " at uni_modules/test-uniplugin/app-android/login.uts:2");
    return object : UTSJSONObject() {
        var name = name
        var pwd = pwd
    };
}
val __default = getResourcePath("uni_modules/test-uniplugin/static/logo.png");
open class GetBatteryInfoOptions : UTSJSONObject() {
    open var success: UTSCallback? = null;
    open var fail: UTSCallback? = null;
    open var complete: UTSCallback? = null;
}
open class User : IUser {
    open suspend fun login(name: String, pwd: String) = CoroutineScope(Dispatchers.Default).async {
        setTimeout(fun(){
            console.log("timeout", " at uni_modules/test-uniplugin/app-android/index.uts:16");
        }
        , 1000);
        login(name, pwd);
        Log.info(__default);
        console.log("def android", " at uni_modules/test-uniplugin/app-android/index.uts:21");
        console.log("ndef ios", " at uni_modules/test-uniplugin/app-android/index.uts:30");
    }
    override fun register(name: String, callback: UTSCallback) {
        Log.info(__default as FrameLayout);
    }
    open fun test(view: View) {}
}
fun login(name: String, callback: () -> Unit) {}
fun register(name: String, callback: UTSCallback) {}
