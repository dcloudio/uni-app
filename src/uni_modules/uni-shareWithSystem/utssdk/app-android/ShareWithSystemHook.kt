package uts.sdk.modules.DCloudUniShareWithSystem;

import android.app.Application
import io.dcloud.uts.UTSAndroidHookProxy
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.io.File


class ShareWithSystemHook : UTSAndroidHookProxy {
    override fun onCreate(application: Application) {
        deleteFilesOnly(File(application.externalCacheDir?.path+ "/share"))
    }

    private fun deleteFilesOnly(folder: File) {
        if (folder.exists() && folder.isDirectory()) {
            GlobalScope.launch(Dispatchers.IO) {
                val files = folder.listFiles()
                if (files != null) {
                    for (file in files) {
                        if (file.isFile()) {
                            // 删除文件
                            file.delete()
                        }
                    }
                }
            }
        }
    }
}