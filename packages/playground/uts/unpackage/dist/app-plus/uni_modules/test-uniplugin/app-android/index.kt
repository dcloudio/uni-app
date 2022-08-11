package uts.modules.testUniPlugin;
import kotlinx.coroutines.*;
import io.dcloud.uts.runtime.*;
import android.util.Log;
interface IUser {
    fun register(name: String): Unit;
}
fun login(name: String, pwd: String): UtsJSONObject {
    console.log("login", "at app-android/login.uts:2");
    return object : UtsJSONObject() {
        var name = name
        var pwd = pwd
    };
}
open class User : IUser {
    open suspend fun login(name: String, pwd: String) = CoroutineScope(Dispatchers.Default).async {
        login(name, pwd);
        Log.info("123");
    }
    override fun register(name: String) {}
}
