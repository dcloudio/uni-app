package uts.sdk.modules.DcloudUniGetBackgroundLocation

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.graphics.BitmapFactory
import android.graphics.Color
import android.os.Binder
import android.os.Build
import android.os.IBinder
import uts.sdk.modules.uniLocationSystem.UniLocationSystemProviderImpl
import android.graphics.Bitmap
import java.lang.ref.WeakReference

// import io.dcloud.uni.getlocation.system.R;

class UniSystemLocationService : Service() {
    private val binder: MyBinder = MyBinder(this)

    class MyBinder(service: UniSystemLocationService) : Binder() {
        private val serviceRef: WeakReference<UniSystemLocationService> = WeakReference(service)
        val service: UniSystemLocationService?
            get() = serviceRef.get()

        fun clear() {
            serviceRef.clear()
        }
    }

    override fun onBind(intent: Intent): IBinder? {
        return binder
    }

    fun startLocation(location: UniLocationSystemProviderImpl, options: Any,notification:Notification?) {
        startForeground(1000, notification)
        location.startSystemLocation(options, this@UniSystemLocationService)
    }

    override fun onDestroy() {
        stopForeground(true)
        super.onDestroy()
    }

    override fun onUnbind(intent: Intent?): Boolean {
        stopForeground(true)
        // binder.clear()
        return super.onUnbind(intent)
    }

    companion object {
        private const val NOTIFICATION_CHANNEL_NAME = "uni_app_uni_startLocationUpdateBackground_system_channel"
    }
}