package uts.modules.modules.testUniPlugin;
import kotlinx.coroutines.async;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import io.dcloud.uts.*;
import io.dcloud.uts.android.getResourcePath;
import android.util.Log;
import android.widget.FrameLayout;
import android.view.View;
interface IUser {
    fun register(name: String): Unit;
}
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
val default = getResourcePath("uni_modules/test-uniplugin/static/logo.png");
val test1 = arrayOf(1, 2, 3);
open class GetBatteryInfoOptions : UTSJSONObject() {
    open var success: UTSCallback? = null;
    open var fail: UTSCallback? = null;
    open var complete: UTSCallback? = null;
}
open class User : IUser {
    open suspend fun login(name: String, pwd: String) = CoroutineScope(Dispatchers.Default).async {
        setTimeout(fun(){
            console.log("timeout", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:18");
        }
        , 1000);
        login(name, pwd);
        Log.info(default);
        console.log("def android", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:23");
        console.log("ndef ios", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:32");
        console.log("def android || def ios", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:35");
        XToast<XToast<*>>(getUniActivity()).setContentView(R.layout.toast_hint).setDuration(1000).setImageDrawable(android.R.id.icon, R.mipmap.ic_dialog_tip_finish).setText(android.R.id.message, "点我消失").show();
    }
    override fun register(name: String, callback: UTSCallback) {
        Log.info(default as FrameLayout);
    }
    open fun test(view: View) {}
}
fun login(name: String, callback: () -> Unit) {}
fun register(name: String, callback: UTSCallback) {}
fun offMemoryWarning(callback: (UTSCallback)? = null) {}
