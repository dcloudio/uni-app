package uts.sdk.modules.DCloudUniShareWithSystem;

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.text.TextUtils
import io.dcloud.uniapp.util.DHFile
import io.dcloud.uts.UTSAndroid
import io.dcloud.uts.UTSArray
import io.dcloud.uts.utsArrayOf
import java.io.File
import java.util.UUID

object UniShareWithSystem {
    fun sendWithSystem(
        context: Context,
        type: String?,
        summary: String?,
        href: String?,
        imageUrl: String?,
        imagePaths: UTSArray<String>?,
        videoPaths: UTSArray<String>?,
        filePaths: UTSArray<String>?,
        audioPaths: UTSArray<String>?,
        cbSuccess: () -> Unit?,
        cbFail: (code: Int, msg: String) -> Unit?,
        cbComplete: () -> Unit?
    ) {
        try {
            var tempType = "text"
            if (type != null) {
                tempType = type
            }
            var content = summary
            if (!TextUtils.isEmpty(href)) {
                if (content == null) {
                    content = "$href"
                } else content = "$content  $href"
            }
            val listImageUrl = utsArrayOf<String>()
            if (imagePaths != null) {
                listImageUrl.addAll(imagePaths)
            }
            imageUrl?.let {
                listImageUrl.add(it)
            }
            val intent = Intent()
            var error = true

            when (tempType) {
                "text" -> {
                    setSysShareIntent(intent, content, null, tempType)
                    error = false
                }

                "image" -> {
                    var imageList = checkPath(context, tempType, listImageUrl, cbFail, cbComplete)
                    if (imageList != null) {
                        setSysShareIntent(intent, content, imageList, tempType)
                        error = false
                    }
                }

                "video" -> {
                    val tempMediaPathList = utsArrayOf<String>()
                    if (videoPaths != null) {
                        tempMediaPathList.addAll(videoPaths)
                    }
                    var list = checkPath(context, tempType, tempMediaPathList, cbFail, cbComplete)
                    if (list != null) {
                        setSysShareIntent(intent, content, list, tempType)
                        error = false
                    }
                }

                "audio" -> {
                    val tempMediaPathList = utsArrayOf<String>()
                    if (audioPaths != null) {
                        tempMediaPathList.addAll(audioPaths)
                    }
                    var list = checkPath(context, tempType, tempMediaPathList, cbFail, cbComplete)
                    if (list != null) {
                        setSysShareIntent(intent, content, list, tempType)
                        error = false
                    }
                }

                "file" -> {
                    val tempFilePathList = utsArrayOf<String>()
                    if (filePaths != null) {
                        tempFilePathList.addAll(filePaths)
                    }
                    var list = checkPath(context, tempType, tempFilePathList, cbFail, cbComplete)
                    if (list != null) {
                        setSysShareIntent(intent, content, list, tempType)
                        error = false
                    }
                }
            }
            if (!error) {
                val shareIntent = Intent.createChooser(intent, "")
                shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                context.startActivity(shareIntent)
                cbComplete.invoke()
                cbSuccess.invoke()
            }
        } catch (e: Exception) {
            cbFail.invoke(1310602, "" + e.message)
        }
    }

    private fun checkPath(
        context: Context,
        type: String,
        pathList: UTSArray<String>,
        cbFail: (code: Int, msg: String) -> Unit?,
        cbComplete: () -> Unit?
    ): ArrayList<Uri>? {
        val localArrayList = ArrayList<Uri>()
        for (i in 0 until pathList.size) {
            var path = UTSAndroid.convert2AbsFullPath(pathList[i])
            if (path.startsWith("/android_asset/")) { //应用私有路径无法正常分享需要将私有路径资源拷贝到外置卡路径
                var lastIndex =  path.lastIndexOf(
                    "."
                )
                if (lastIndex==-1){
                    lastIndex = path.length
                }
                val destPath =
                    context.externalCacheDir?.path + "/share/" + UUID.randomUUID() + path.substring(
                        lastIndex
                    )
                var copySuccess = false
                try {
                    var assetName = path.substring("/android_asset/".length)
                    copySuccess =
                        DHFile.copyAssetsFile(UTSAndroid.getAppContext()!!, assetName, destPath)
                } catch (e: Exception) {
                    fail(type, pathList[i], cbFail)
                    cbComplete.invoke()
                    return null
                }
                if (!copySuccess) {
                    fail(type, pathList[i], cbFail)
                    cbComplete.invoke()
                    return null
                }
                path = destPath
            } else if(path.startsWith("content://")){
                localArrayList.add(Uri.parse(path))
                continue
            }else {
                val srcFile = File(path)
                if (!srcFile.exists()) {
                    fail(type, pathList[i], cbFail)
                    cbComplete.invoke()
                    return null
                }
            }
            val fileUri: Uri = if (Build.VERSION.SDK_INT >= 24) {
                UTSAndroid.getFileProviderUri(File(path))!!
            } else {
                Uri.fromFile(File(path))
            }
            localArrayList.add(fileUri)
        }
        return localArrayList
    }

    private fun fail(type: String, url: String, cbFail: (code: Int, msg: String) -> Unit?) {
        when (type) {
            "image" -> {
                cbFail.invoke(1310603, "Invalid imageUrl:" + url)
            }

            "video" -> {
                cbFail.invoke(1310605, "Invalid videoPaths:" + url)
            }

            "file" -> {
                cbFail.invoke(1310606, "Invalid filePaths:" + url)
            }

            "audio" -> {
                cbFail.invoke(1310607, "Invalid audioPaths:" + url)
            }
        }

    }

    /**
     * 设置系统分享intent携带参数
     * @param content
     * @param localArrayList
     * @return
     */
    private fun setSysShareIntent(
        intent: Intent, content: String?, localArrayList: ArrayList<Uri>?, type: String
    ): Intent {
        if (content != null) {
            intent.putExtra(Intent.EXTRA_TEXT, content)
        }
        if (type == "file") {
            intent.setType("*/*");
        } else {
            intent.setType("$type/*")
        }
        if (localArrayList != null && localArrayList.size > 0) {
            if (localArrayList.size > 1) {
                intent.setAction(Intent.ACTION_SEND_MULTIPLE)
                intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, localArrayList)
            } else {
                intent.setAction(Intent.ACTION_SEND)
                intent.putExtra(Intent.EXTRA_STREAM, localArrayList[0])
            }
        } else {
            intent.setAction(Intent.ACTION_SEND)
        }
        return intent
    }

}