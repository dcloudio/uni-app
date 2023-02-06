package uts.modules.modules.testUniPlugin;
import kotlinx.coroutines.async;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import io.dcloud.uts.*;
import io.dcloud.uts.UTSAndroid;
import android.util.Log;
import android.widget.FrameLayout;
import android.view.View;
import login.login;
interface IUser {
    fun register(name: String): Unit;
}
val default = UTSAndroid.getResourcePath("uni_modules/test-uniplugin/static/logo.png");
val test = arrayOf(1, 2, 3);
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
        run {
            var i = 0;
            while(i < 10){
                console.log(i, " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:22");
                i++;
            }
        }
        Log.info(default);
        console.log("def android", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:26");
        console.log("ndef ios", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:35");
        console.log("def android || def ios", " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:38");
        console.log((-3).inv(), " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:44");
        XToast<XToast<*>>(getUniActivity()).setContentView(R.layout.toast_hint).setDuration(1000).setImageDrawable(android.R.id.icon, R.mipmap.ic_dialog_tip_finish).setText(android.R.id.message, "点我消失").show();
    }
    override fun register(name: String, callback: UTSCallback) {
        Log.info(default as FrameLayout);
    }
    open fun test(view: View) {
        console.log(TestClass(), " at uni_modules/test-uniplugin/utssdk/app-android/index.uts:56");
    }
}
fun login(name: String, callback: () -> Unit) {}
@Suppress("DEPRECATION")
fun register(name: String, callback: UTSCallback) {}
fun offMemoryWarning(callback: (UTSCallback)? = null) {}
open class TestClass {
}
