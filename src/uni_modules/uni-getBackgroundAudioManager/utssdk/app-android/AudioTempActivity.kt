package uts.sdk.modules.DCloudUniGetBackgroundAudioManager

import android.app.Activity
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.view.WindowManager

class AudioTempActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        this.fullScreen()
        finish()
    }
    @Suppress("DEPRECATION")
    private fun fullScreen() {
        var decorView = window.decorView;
        var option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or  View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
        decorView.setSystemUiVisibility(option);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.setStatusBarColor(Color.TRANSPARENT);
    }
}