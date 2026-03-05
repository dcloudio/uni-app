package uts.sdk.modules.utsSyntaxcase

import android.app.ActivityManager
import android.content.Context.ACTIVITY_SERVICE
import android.os.Build
import io.dcloud.uts.UTSAndroid
import io.dcloud.uts.setInterval
import io.dcloud.uts.clearInterval
import io.dcloud.uts.console

object NativeCode {

    fun getPhoneInfo():String{
        val ret = "${Build.BOARD}-${Build.USER}"
        console.log("PhoneInfo",ret)
        return ret
    }

    fun finishActivity(){
        UTSAndroid.getUniActivity()?.finish()
    }
	
    fun getJavaUser():JavaUser{
      return JavaUser("张三",12)
    }
    
     /**
     * 记录上一次的任务id
     */
    private var lastTaskId = -1

    fun kotlinCallbackUTS(callback: (String) -> Unit){

        if(lastTaskId != -1){
            // 避免重复开启
            clearInterval(lastTaskId)
        }

        lastTaskId = setInterval({

            val activityManager = UTSAndroid.getUniActivity()?.getSystemService(ACTIVITY_SERVICE) as ActivityManager
            val memoryInfo = ActivityManager.MemoryInfo()
            activityManager.getMemoryInfo(memoryInfo)
            val availMem = memoryInfo.availMem / 1024 / 1024
            val totalMem = memoryInfo.totalMem / 1024 / 1024

            callback("设备内存:$totalMem MB,可用内存:$availMem MB")

        },1000,2000).toInt()

    }
    
    fun kotlinStopMemListenTest(){
        if(lastTaskId != -1){
            // 避免重复开启
            clearInterval(lastTaskId)
        }
    }

}