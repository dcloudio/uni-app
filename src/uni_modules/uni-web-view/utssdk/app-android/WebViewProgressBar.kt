 package uts.sdk.modules.uniWebView

 import android.animation.Animator
 import android.animation.AnimatorListenerAdapter
 import android.animation.ObjectAnimator
 import android.content.Context
 import android.graphics.Color
 import android.graphics.drawable.ClipDrawable
 import android.graphics.drawable.ColorDrawable
 import android.graphics.drawable.Drawable
 import android.graphics.drawable.LayerDrawable
 import android.view.Gravity
 import android.view.animation.AccelerateInterpolator
 import android.view.animation.DecelerateInterpolator
 import android.widget.ProgressBar

 class WebViewProgressBar(context: Context) :
     ProgressBar(context, null, android.R.attr.progressBarStyleHorizontal) {

     private var isDestroy = false
     private var mProgressAnimator: ObjectAnimator? = null
     private var mDismissAnimator: ObjectAnimator? = null

     init {
         max = 100
         alpha = 0f
     }

     fun setColorInt(colorInt: Int) {
         val progressColor =
             Color.argb(255, Color.red(colorInt), Color.green(colorInt), Color.blue(colorInt))
         val backgroundColor = Color.TRANSPARENT
         //Background
         val bgClipDrawable =
             ClipDrawable(ColorDrawable(backgroundColor), Gravity.START, ClipDrawable.HORIZONTAL)
         bgClipDrawable.level = 10000
         //Progress
         val progressClip =
             ClipDrawable(ColorDrawable(progressColor), Gravity.START, ClipDrawable.HORIZONTAL)
         //Setup LayerDrawable and assign to progressBar
         val progressDrawables =
             arrayOf<Drawable>(bgClipDrawable, progressClip /*second*/, progressClip)
         val progressLayerDrawable = LayerDrawable(progressDrawables).apply {
             setId(0, android.R.id.background)
             setId(1, android.R.id.secondaryProgress)
             setId(2, android.R.id.progress)
         }
         progressDrawable = progressLayerDrawable
     }

     /**
      * 开始进度
      */
     fun startProgress() {
         if (isDestroy) return
         progress = 0
         setAlpha(1f)
         mDismissAnimator?.removeAllListeners()
         mDismissAnimator?.cancel()
         mProgressAnimator?.removeAllListeners()
         mProgressAnimator?.cancel()
         mProgressAnimator = ObjectAnimator.ofInt(this, "progress", progress, 30).apply {
             duration = 2000
             interpolator = DecelerateInterpolator()
             addListener(object : AnimatorListenerAdapter() {
                 override fun onAnimationEnd(animation: Animator) {
                     super.onAnimationEnd(animation)
                     mProgressAnimator = ObjectAnimator.ofInt(this@WebViewProgressBar, "progress", progress, 70).apply {
                         duration = 2000
                         interpolator = DecelerateInterpolator()
                         addListener(object : AnimatorListenerAdapter() {
                             override fun onAnimationEnd(animation: Animator) {
                                 super.onAnimationEnd(animation)
                                 mProgressAnimator = ObjectAnimator.ofInt(this@WebViewProgressBar, "progress", progress, 95).apply {
                                     duration = 50000
                                     interpolator = DecelerateInterpolator()
                                     start()
                                 }
                             }
                         })
                         start()
                     }
                 }
             })
             start()
         }
     }

     /**
      * 结束进度
      */
     fun finishProgress() {
         if (isDestroy) return
         mProgressAnimator?.removeAllListeners()
         mProgressAnimator?.cancel()
         mProgressAnimator = ObjectAnimator.ofInt(this, "progress", progress, 100).apply {
             duration = 400
             interpolator = AccelerateInterpolator()
             addListener(object : AnimatorListenerAdapter() {
                 override fun onAnimationEnd(animation: Animator) {
                     super.onAnimationEnd(animation)
                     mDismissAnimator = ObjectAnimator.ofFloat(this@WebViewProgressBar, "alpha", 1f, 0f).apply {
                         duration = 1000
                         interpolator = DecelerateInterpolator()
                         addListener(object : AnimatorListenerAdapter() {
                             override fun onAnimationEnd(animation: Animator) {
                                 progress = 0
                             }
                         })
                         start()
                     }
                 }
             })
             start()
         }
     }
     
     fun destroy() {
         isDestroy = true
         mProgressAnimator?.removeAllListeners()
         mProgressAnimator?.cancel()
         mProgressAnimator = null
         mDismissAnimator?.removeAllListeners()
         mDismissAnimator?.cancel()
         mDismissAnimator = null
     }
 }