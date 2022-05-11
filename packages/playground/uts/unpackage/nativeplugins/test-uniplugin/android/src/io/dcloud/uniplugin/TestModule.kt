package io.dcloud.uniplugin.TestModule;
import android.content.Intent;
import com.alibaba.fastjson.JSONObject;
import io.dcloud.feature.uniapp.common.UniModule;
import io.dcloud.feature.uniapp.annotation.UniJSMethod;
import io.dcloud.feature.uniapp.bridge.UniJSCallback;
import io.dcloud.uniplugin.log.log;
open class TestModule : UniModule() {
    open var TAG = "TestModule";
    @UniJSMethod( uiThread = true )
    open fun testAsyncFunc(options: JSONObject, callback: UniJSCallback?) {
        log(this.TAG, "testAsyncFunc--$options");
        if (callback != null) {
            val data = JSONObject();
            data["code"] = "success12312";
            callback.invoke(data);
        }
    }
    @UniJSMethod( uiThread = false )
    open fun testSyncFunc(options: JSONObject): JSONObject {
        val data = JSONObject();
        data["code"] = "success456";
        return data;
    }
    override open fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        if (requestCode == TestModule.REQUEST_CODE && data.hasExtra("respond")) {
            log(this.TAG, "原生页面返回----" + data.getStringExtra("respond"));
        }
         else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
    companion object {
        var REQUEST_CODE = 1000;
    }
}
