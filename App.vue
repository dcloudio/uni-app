<!-- HBuilder X 版本要求: 3.6.11+ -->
<script lang="ts">
  // #ifdef APP-ANDROID || APP-HARMONY
  let firstBackTime = 0
  // #endif
  export default {
    onLaunch: function () {
      console.log('App Launch')
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    },
    // #ifdef UNI-APP-X && APP-ANDROID || APP-HARMONY
    onLastPageBackPress: function () {
      console.log('App LastPageBackPress')
      if (firstBackTime == 0) {
        uni.showToast({
          title: '再按一次退出应用',
          position: 'bottom',
        })
        firstBackTime = Date.now()
        setTimeout(() => {
          firstBackTime = 0
        }, 2000)
      } else if (Date.now() - firstBackTime < 2000) {
        firstBackTime = Date.now()
        uni.exit()
      }
    },
    // #endif
    onExit() {
      console.log('App Exit')
    },
  }
</script>

<style>
  /*每个页面公共css */
  /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
  /* #ifdef APP-VUE */
  @import './common/uni.css';
  /* #endif */
</style>