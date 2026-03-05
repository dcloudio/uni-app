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
 import android.view.animation.Interpolator
 import android.widget.ProgressBar

 class WebViewProgressBar(context: Context) :
     ProgressBar(context, null, android.R.attr.progressBarStyleHorizontal) {

     private var isFinish = false
     private var alpha = 255
     private var mCurrentAnimator: ObjectAnimator? = null

     init {
         max = 100
     }

     fun setAlphaInt(alpha: Int) {
         this.alpha = alpha
     }

     fun setColorInt(colorInt: Int) {
         val progressColor =
             Color.argb(alpha, Color.red(colorInt), Color.green(colorInt), Color.blue(colorInt))
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
         progress = 0
         setAlpha(1f)
         isFinish = false
         val interpolator: Interpolator = DecelerateInterpolator()
         mCurrentAnimator =
             getProgressAnimation(30, 2000, interpolator, object : AnimatorListenerAdapter() {
                 override fun onAnimationEnd(animation: Animator) {
                     super.onAnimationEnd(animation)
                     if (!isFinish) {
                         mCurrentAnimator = getProgressAnimation(70,
                             2000,
                             interpolator,
                             object : AnimatorListenerAdapter() {
                                 override fun onAnimationEnd(animation: Animator) {
                                     super.onAnimationEnd(animation)
                                     if (!isFinish) {
                                         mCurrentAnimator =
                                             getProgressAnimation(95, 50000, interpolator, null)
                                         mCurrentAnimator?.start()
                                     }
                                 }
                             })
                         mCurrentAnimator?.start()
                     }
                 }
             })
         mCurrentAnimator?.start()
     }

     /**
      * 结束进度
      */
     fun finishProgress() {
         if (isFinish) {
             return
         }
         isFinish = true
         mCurrentAnimator?.cancel()
         mCurrentAnimator = getProgressAnimation(100,
             400,
             AccelerateInterpolator(),
             object : AnimatorListenerAdapter() {
                 override fun onAnimationEnd(animation: Animator) {
                     super.onAnimationEnd(animation)
                     if (isFinish) {
                         startDismissAnimation()
                     }
                 }
             })
         mCurrentAnimator?.start()
     }

     /**
      * progressBar递增动画
      */
     private fun getProgressAnimation(
         newProgress: Int,
         duration: Int,
         interpolator: Interpolator,
         listenerAdapter: AnimatorListenerAdapter?,
     ): ObjectAnimator {
         return ObjectAnimator.ofInt(this, "progress", progress, newProgress).apply {
             this.duration = duration.toLong()
             this.interpolator = interpolator
             listenerAdapter?.let { addListener(it) }
         }
     }

     /**
      * progressBar消失动画
      */
     private fun startDismissAnimation() {
         ObjectAnimator.ofFloat(this, "alpha", 1.0f, 0.0f).apply {
             duration = 1000 // 动画时长
             interpolator = DecelerateInterpolator() // 减速
             addListener(object : AnimatorListenerAdapter() {
                 override fun onAnimationEnd(animation: Animator) {
                     // 动画结束
                     progress = 0
                 }
             })
             start()
         }
     }
 }