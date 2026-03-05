package uts.sdk.modules.uniWebView

import android.Manifest
import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.Drawable
import android.net.Uri
import android.provider.MediaStore
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.Window
import android.view.WindowManager
import android.widget.BaseAdapter
import android.widget.Button
import android.widget.GridView
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.FileProvider
import io.dcloud.uts.UTSAndroid
import io.dcloud.uts.UTSArray
import io.dcloud.uts.utsArrayOf
import uts.sdk.modules.uniWebView.R
import uts.sdk.modules.uniWebView.NativeWebViewImpl
import java.io.File
import kotlin.String
import kotlin.math.roundToInt

class WebViewFileChooseDialog(private val context: Activity, intent: Intent) : Dialog(context) {
    var cameraUri: Uri? = null
    private val oneDp: Int
    private val oneSp: Int

    init {
        val ctx = context
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        oneDp = UTSAndroid.convertToNativePx("1", 1)
        oneSp = UTSAndroid.convertToNativePx("1", 1)
        var cameraIntent: Intent? = null
        var ext = ""
        intent.type?.let {
            if (it.startsWith("image/") || it == "*/*") {
                cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                ext = ".jpg"
            } else if (it.startsWith("video/")) {
                cameraIntent = Intent(MediaStore.ACTION_VIDEO_CAPTURE)
                ext = ".mp4"
            }
        }
        val items = arrayListOf<Item>()
        ctx.packageManager.apply {
            cameraIntent?.let { intent ->
                queryIntentActivities(intent, 0).forEach {
                    val label = it.loadLabel(this).toString()
                    val icon = getApplicationIcon(it.activityInfo.applicationInfo)
                    val file = File(
                        "${ctx.externalCacheDir}/${NativeWebViewImpl.WEB_VIEW_CACHE_DIR}/",
                        System.currentTimeMillis().toString() + ext
                    )
                    if (file.parentFile?.exists() == false) file.parentFile?.mkdirs()
                    val imageUri = FileProvider.getUriForFile(
                        ctx, ctx.packageName + ".dc.fileprovider", file
                    )
                    val temp = Intent(intent).apply {
                        putExtra(MediaStore.EXTRA_OUTPUT, imageUri)
                        setClassName(it.activityInfo.packageName, it.activityInfo.name)
                    }
                    items.add(Item(label, icon, temp))
                    cameraUri = imageUri
                }
            }
            queryIntentActivities(intent, 0).forEach {
                val label = it.loadLabel(this).toString()
                val icon = getApplicationIcon(it.activityInfo.applicationInfo)
                val temp = Intent(intent)
                temp.setClassName(it.activityInfo.packageName, it.activityInfo.name)
                items.add(Item(label, icon, temp))
            }
        }
        val contentView = LinearLayout(ctx).apply {
            orientation = LinearLayout.VERTICAL
            val tv = TextView(ctx).apply {
                setText(R.string.uniappx_webview_choose_an_action)
                textSize = (5 * oneSp).toFloat()
                setTextColor(Color.BLACK)
                paint.isFakeBoldText = true
                gravity = Gravity.CENTER
            }
            addView(
                tv,
                LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
                )
            )
            val intentView = GridView(ctx).apply {
                horizontalSpacing = oneDp * 10
                verticalSpacing = oneDp * 10
                numColumns = 4
                setPadding(0, 20 * oneDp, 0, 20 * oneDp)
                adapter = GridAdapter(items)
            }
            addView(
                intentView,
                LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
                )
            )
            val divide = View(ctx).apply {
                setBackgroundColor(Color.LTGRAY)
            }
            addView(divide, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, oneDp))
            val btn = Button(ctx).apply {
                setPadding(paddingLeft, 15 * oneDp, paddingRight, 15 * oneDp)
                background = null
                setText(android.R.string.cancel)
                setOnClickListener { cancel() }
                gravity = Gravity.CENTER
            }
            addView(
                btn,
                LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
                )
            )
        }
        setContentView(
            contentView,
            ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        )
    }

    override fun show() {
        super.show()
        window?.attributes = window?.attributes?.apply {
            gravity = Gravity.BOTTOM
            width = WindowManager.LayoutParams.MATCH_PARENT
            height = WindowManager.LayoutParams.WRAP_CONTENT
        }
        window?.decorView?.setPadding(0, 20 * oneDp, 0, 10 * oneDp)
        window?.decorView?.setBackgroundColor(Color.WHITE)
    }

    private fun createView(item: Item): ViewGroup {
        val ctx = context
        return LinearLayout(ctx).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            val iconView = ImageView(ctx).apply {
                setImageDrawable(item.icon)
                scaleType = ImageView.ScaleType.CENTER_INSIDE
            }
            addView(iconView, LinearLayout.LayoutParams(50 * oneDp, 50 * oneDp))
            val nameView = TextView(ctx).apply {
                text = item.name
                textSize = (4 * oneSp).toFloat()
                gravity = Gravity.CENTER
            }
            addView(nameView,
                LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
                ).apply {
                    topMargin = 10 * oneDp
                })
            setOnClickListener {
                if (item.i.action != null && (item.i.action == MediaStore.ACTION_IMAGE_CAPTURE || item.i.action == MediaStore.ACTION_VIDEO_CAPTURE)) {
                    UTSAndroid.requestSystemPermission(ctx as Activity, utsArrayOf(Manifest.permission.CAMERA),
                        { allRight: Boolean, grantedList: UTSArray<String> ->
                            if (allRight) {
                                ctx.startActivityForResult(item.i, 2)
                            }
                        }, { doNotAskAgain: Boolean, grantedList: UTSArray<String> ->

                        }
                    )
                } else {
                    ctx.startActivityForResult(item.i, 1)
                }
            }
        }
    }

    private inner class GridAdapter(private val items: List<Item>) :
        BaseAdapter() {
        override fun getCount(): Int {
            return items.size
        }

        override fun getItem(position: Int): Any {
            return items[position]
        }

        override fun getItemId(position: Int): Long {
            return position.toLong()
        }

        override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
            val holder: ViewHolder
            var view = convertView
            if (view == null) {
                view = createView(items[position])
                holder = ViewHolder().apply {
                    iv = view.getChildAt(0) as ImageView
                    tv = view.getChildAt(1) as TextView
                }
                view.setTag(holder)
            } else {
                holder = view.tag as ViewHolder
            }
            holder.iv?.setImageDrawable(items[position].icon)
            holder.tv?.text = items[position].name
            return view
        }

        private inner class ViewHolder {
            var iv: ImageView? = null
            var tv: TextView? = null
        }
    }

    data class Item(
        var name: String,
        var icon: Drawable,
        var i: Intent,
    )
}