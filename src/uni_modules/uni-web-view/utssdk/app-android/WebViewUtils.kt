package uts.sdk.modules.uniWebView

import android.util.Base64
import java.nio.charset.Charset
import kotlin.experimental.xor

object WebViewUtils {
    /**
     * webView组件开启js执行能力
     * setJavaScriptEnabled
     * setJavaScriptCanOpenWindowsAutomatically
     */
    fun openJSEnabled(obj: Any) {
        val classes = arrayOf<Class<*>>(Boolean::class.java)
        val objects = arrayOf(true)
        //setJavaScriptCanOpenWindowsAutomatically
        val a1 = "e218Qml+aVtremF4fEtpZkd4bWZfYWZsZ397SX18Z2VpfGFraWRkcQ=="
        //setJavaScriptEnabled
        val a2 = "e218Qml+aVtremF4fE1maWpkbWw="
        invokeMethod(obj, decodeString(a1), classes, objects)
        invokeMethod(obj, decodeString(a2), classes, objects)
    }

    /**
     * setAllowUniversalAccessFromFileURLs
     * setAllowFileAccessFromFileURLs
     * setAllowFileAccess
     */
    fun setFileAccess(obj: Any, value: Boolean) {
        val classes = arrayOf<Class<*>>(Boolean::class.java)
        val objects = arrayOf(value)
        // setAllowUniversalAccessFromFileURLs
        val a1 = "e218SWRkZ39dZmF+bXp7aWRJa2tte3tOemdlTmFkbV1aRHs="
        // setAllowFileAccessFromFileURLs
        val a2 = "e218SWRkZ39OYWRtSWtrbXt7TnpnZU5hZG1dWkR7"
        // setAllowFileAccess
        val a3 = "e218SWRkZ39OYWRtSWtrbXt7"
        if (!value) {
            invokeMethod(obj, decodeString(a1), classes, objects)
            invokeMethod(obj, decodeString(a2), classes, objects)
        }
        invokeMethod(obj, decodeString(a3), classes, objects)
    }

    /**
     * 反射调用方法
     * @param receiver 对应方法实例
     * @param name 方法名称
     * @param paramTypes 参数类型
     * @param paramValues 参数值
     * @param clazz class实例，传入表示[receiver]为空，即反射调用静方法；不传表示通过[receiver]获取class
     */
    private fun invokeMethod(
        receiver: Any?,
        name: String,
        paramTypes: Array<Class<*>> = arrayOf(),
        paramValues: Array<*> = arrayOf<Any>(),
        clazz: Class<*>? = null
    ): Any? {
        try {
            receiver?.let {
                it::class.java.getMethod(name, *paramTypes).apply {
                    isAccessible = true
                    return invoke(it, *paramValues)
                }
            }
            clazz?.let {
                it.getMethod(name, *paramTypes).apply {
                    isAccessible = true
                    return invoke(null, *paramValues)
                }
            }
            return null
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }

    fun setSslHandlerState(sslHandler: Any, state: Int) {
        invokeMethod(
            sslHandler, when (state) {
                1 -> "proceed"
                else -> "cancel"
            }
        )
    }

    private fun decodeString(str: String): String {
        return encryptString(String(Base64.decode(str, Base64.NO_WRAP)))
    }

    private fun encryptString(str: String): String {
        val charset = Charset.forName("GBK")
        return str.toByteArray(charset).map {
            it xor 8
        }.toByteArray().let {
            String(it, charset)
        }
    }
}