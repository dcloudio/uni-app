package uts.modules.testUniPlugin;
import kotlinx.coroutines.*;
import io.dcloud.uts.runtime.*;
import io.dcloud.uts.android.getResourcePath;
import android.util.Log;
interface IUser {
    fun register(name: String): Unit;
}
fun login(name: String, pwd: String): UTSJSONObject {
    console.log("login", "at uni_modules/test-uniplugin/app-android/login.uts:2");
    return object : UTSJSONObject() {
        var name = name
        var pwd = pwd
    };
}
val __default = getResourcePath("uni_modules/test-uniplugin/static/logo.png");
open class User : IUser {
    open suspend fun login(name: String, pwd: String) = CoroutineScope(Dispatchers.Default).async {
        setTimeout(fun(){
            console.log("timeout", "at uni_modules/test-uniplugin/app-android/index.uts:8");
        }
        , 1000);
        login(name, pwd);
        Log.info("123");
        Log.info(__default);
    }
    override fun register(name: String, callback: UTSCallback) {
        Log.info(__default);
    }
}
fun login(name: String, callback: () -> Unit) {}
fun register(name: String, callback: UTSCallback) {}
