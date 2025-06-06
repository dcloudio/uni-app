<template>
  <view>
    <view class="uni-action-sheet_dialog__mask" :class="{ 'uni-action-sheet_dialog__mask__show': show }"
      @click="handleCancel"></view>
    <view <!-- #ifdef WEB -->
      :style="isWidescreen ? containerStyle : {}"
      <!-- #endif -->
      class="uni-action-sheet_dialog__container"
      :class="{ 'uni-action-sheet_dialog__show': show,'uni-action-sheet_dark__mode': theme == 'dark',
      'uni-action-sheet_landscape__mode': isLandscape }">
      <view :style="backgroundColor != null ? {backgroundColor} : {}" class="uni-action-sheet_dialog__menu"
        :class="{ 'uni-action-sheet_dark__mode': theme == 'dark', 'uni-action-sheet_landscape__mode': isLandscape }">
        <template v-if="title">
          <view class="uni-action-sheet_dialog__title border-b"
            :class="{ 'uni-action-sheet_dark__mode': theme == 'dark', 'uni-action-sheet_landscape__mode': isLandscape }">
            <text :style="titleColor != null ? { color: titleColor } : {}" class="uni-action-sheet_dialog__title__text"
              :class="{ 'uni-action-sheet_dark__mode': theme == 'dark' }">
              {{ title }}
            </text>
          </view>
          <!-- #ifdef WEB -->
          <view class="divider" :class="{ 'uni-action-sheet_dark__mode': theme == 'dark' }"></view>
          <!-- #endif -->
        </template>
        <!-- #ifdef WEB -->
        <view class="uni-action-sheet_dialog__cell__container"
          :class="{'uni-action-sheet_landscape__mode': isLandscape}">
        <!-- #endif -->
          <!-- #ifdef APP -->
          <scroll-view class="uni-action-sheet_dialog__cell__container"
            :class="{'uni-action-sheet_landscape__mode': isLandscape}">
          <!-- #endif -->
            <template v-for="(item, index) in itemList" :key="index">
            <!-- #ifdef WEB -->
            <view v-if="index !== 0" class="divider" :class="{ 'uni-action-sheet_dark__mode': theme == 'dark' }"></view>
            <!-- #endif -->
              <view class="uni-action-sheet_dialog__cell"
                :class="{ 'uni-action-sheet_dark__mode': theme == 'dark', 'uni-action-sheet_landscape__mode': isLandscape, 'border-t': index !== 0 }"
                @click="handleMenuItemClick(index)">
                <text :style="itemColor != null ? { color: itemColor } : {}" class="uni-action-sheet_dialog__cell__text"
                  :class="{ 'uni-action-sheet_dark__mode': theme == 'dark' }">
                  {{ item }}
                </text>
              </view>
            </template>
          <!-- #ifdef APP -->
          </scroll-view>
          <!-- #endif -->
        <!-- #ifdef WEB -->
        </view>
        <!-- #endif -->
      </view>
      <view :style="backgroundColor != null ? {backgroundColor} : {}" class="uni-action-sheet_dialog__action"
        :class="{ 'uni-action-sheet_dark__mode': theme == 'dark', 'uni-action-sheet_landscape__mode': isLandscape }"
        @click="handleCancel">
        <text :style="cancelColor != null ? { color: cancelColor } : {}" class="uni-action-sheet_dialog__action__text"
          :class="{ 'uni-action-sheet_dark__mode': theme == 'dark' }">
          {{ cancelText }}
        </text>
      </view>
      <view v-if="!isLandscape" :style="{height: `${bottomNavigationHeight}px`, backgroundColor: computedBackgroundColor}"></view>
      <!-- #ifdef WEB -->
      <view v-if='isWidescreen && Object.keys(popover).length > 0' :style='triangleStyle' class="uni-action-sheet_dialog__triangle" />
      <!-- #endif -->
    </view>
  </view>
</template>

<script lang='ts'>
  export default {
    data() {
      return {
        show: false,
        i18nCancelText: {
          en: 'Cancel',
          es: 'Cancelar',
          fr: 'Annuler',
          'zh-Hans': '取消',
          'zh-Hant': '取消',
        },
        readyEventName: '',
        optionsEventName: '',
        successEventName: '',
        failEventName: '',
        title: null as string | null,
        itemList: [] as string[],
        optionCancelText: null as string | null,
        titleColor: null as string | null,
        itemColor: null as string | null,
        cancelColor: null as string | null,
        backgroundColor: null as string | null,
        language: 'zh-Hans',
        theme: 'light',
        isLandscape: false,
        // #ifdef WEB
        windowWidth: 0,
        windowHeight: 0,
        popover: {},
        // #endif
        bottomNavigationHeight: 0,
        appTheme: null as string | null,
        hostTheme: null as string | null,
        // #ifdef APP-ANDROID || APP-IOS
        appThemeChangeCallbackId: -1,
        osThemeChangeCallbackId: -1,
        // #endif
        menuItemClicked: false,
        cancelButtonClicked: false,
      }
    },
    onLoad(options) {
      this.readyEventName = options['readyEventName']!
      this.optionsEventName = options['optionsEventName']!
      this.successEventName = options['successEventName']!
      this.failEventName = options['failEventName']!
      uni.$on(this.optionsEventName, (data: UTSJSONObject) => {
        this.itemList = data['itemList'] as string[]
        if (data['title'] != null) {
          this.title = data['title'] as string
        }
        if (data['cancelText'] != null) {
          this.optionCancelText = data['cancelText'] as string
        }
        if (data['titleColor'] != null) {
          this.titleColor = data['titleColor'] as string
        }
        if (data['itemColor'] != null) {
          this.itemColor = data['itemColor'] as string
        }
        if (data['cancelColor'] != null) {
          this.cancelColor = data['cancelColor'] as string
        }
        if (data['backgroundColor'] != null) {
          this.backgroundColor = data['backgroundColor'] as string
        }
        // #ifdef WEB
        if (data['popover'] != null) {
          this.popover = data['popover']
        }
        // #endif
      })
      uni.$emit(this.readyEventName, {})

      const systemInfo = uni.getSystemInfoSync()
      const osLanguage = systemInfo.osLanguage
      const appLanguage = systemInfo.appLanguage
      if (appLanguage != null) {
        this.language = appLanguage
      } else if (osLanguage != null) {
        this.language = osLanguage
      }
      const appTheme = systemInfo.appTheme
      if (appTheme != null && appTheme != "auto") {
        this.appTheme = appTheme
        this.handleThemeChange()
      }
      const osTheme = systemInfo.osTheme
      if (osTheme != null && this.appTheme == null) {
        this.appTheme = osTheme
        this.handleThemeChange()
      }
      // #ifdef WEB
      const hostTheme = systemInfo.hostTheme
      if (hostTheme != null) {
        this.hostTheme = hostTheme
        this.handleThemeChange()
      } 
      uni.onHostThemeChange((res) => {
        this.hostTheme = res.theme
        this.handleThemeChange()
      });
      this.windowHeight = systemInfo.windowHeight
      this.windowWidth = systemInfo.windowWidth
      window.addEventListener('resize', this.fixSize)

      const locale = uni.getLocale()
      this.language = locale
      uni.onLocaleChange((res) => {
        if (res.locale) {
          this.language = res.locale
        }
      })
      // #endif
      this.isLandscape = systemInfo.deviceOrientation == 'landscape'
      // #ifdef APP-ANDROID || APP-IOS
      this.appThemeChangeCallbackId = uni.onAppThemeChange((res: AppThemeChangeResult) => {
        const appTheme = res.appTheme
        if (appTheme != null && appTheme != "auto") {
          this.appTheme = appTheme
          this.handleThemeChange()
        }
      })
      // #endif
    },
    computed: {
      // #ifdef WEB
      isWidescreen(): boolean {
        return this.windowHeight >= 500 && this.windowWidth >= 500
      },
      containerStyle(): UTSJSONObject {
        if (Object.keys(this.popover).length == 0) {
          return {}
        }
        const res = {
          transform: 'none !important'
        }
        const top = this.popover.top
        const left = this.popover.left
        const width = this.popover.width
        const height = this.popover.height
        const center = left + width / 2
        const contentLeft = Math.max(0, center - 300 / 2)
        res['left'] = `${contentLeft}px`
        const vcl = this.windowHeight / 2
        if (top + height - vcl > vcl - top) {
          res['top'] = 'auto'
          res['bottom'] = `${this.windowHeight - top + 6}px`
        } else {
          res['top'] = `${top + height + 6}px`
        }
        return res
      },
      triangleStyle(): UTSJSONObject {
        if (Object.keys(this.popover).length == 0) {
          return {}
        }
        const res = {}
        const borderColor = this.backgroundColor || (this.theme == 'dark' ? '#2C2C2B' : '#fcfcfd')
        const top = this.popover.top
        const left = this.popover.left
        const width = this.popover.width
        const height = this.popover.height
        const center = left + width / 2
        const contentLeft = Math.max(0, center - 300 / 2)
        let triangleLeft = Math.max(12, center - contentLeft)
        triangleLeft = Math.min(300 - 12, triangleLeft)
        res['left'] = `${triangleLeft}px`
        const vcl = this.windowHeight / 2
        if (top + height - vcl > vcl - top) {
          res['bottom'] = '-6px'
          res['border-width'] = '6px 6px 0 6px'
          res['border-color'] =
            `${borderColor} transparent transparent transparent`
        } else {
          res['top'] = '-6px'
          res['border-width'] = '0 6px 6px 6px'
          res['border-color'] =
            `transparent transparent ${borderColor} transparent`
        }
        return res
      },
      // #endif
      cancelText(): string {
        if (this.optionCancelText != null) {
          const res = this.optionCancelText!
            return res
        }
        if (this.language.startsWith('en')) {
          return this.i18nCancelText['en'] as string
        }
        if (this.language.startsWith('es')) {
          return this.i18nCancelText['es'] as string
        }
        if (this.language.startsWith('fr')) {
          return this.i18nCancelText['fr'] as string
        }
        if (this.language.startsWith('zh-Hans')) {
          return this.i18nCancelText['zh-Hans'] as string
        }
        if (this.language.startsWith('zh-Hant')) {
          return this.i18nCancelText['zh-Hant'] as string
        }
        return '取消'
      },
      computedBackgroundColor(): string {
        return this.backgroundColor !== null ? this.backgroundColor! : (this.theme == 'dark' ? '#2C2C2B' : '#ffffff')
      }
    },
    onReady() {
      this.bottomNavigationHeight = this.$page.safeAreaInsets.bottom
      // #ifdef APP-ANDROID
      if(this.bottomNavigationHeight == 0){
        const systemInfo = uni.getSystemInfoSync()
        this.bottomNavigationHeight = systemInfo.safeAreaInsets.bottom
      }
      // #endif
      setTimeout(() => {
        this.show = true
      }, 10)
    },
    onResize() {
      const systemInfo = uni.getSystemInfoSync()
      this.isLandscape = systemInfo.deviceOrientation == 'landscape'
    },
    onUnload() {
      if (!this.menuItemClicked && !this.cancelButtonClicked) {
        // 非用户交互导致关闭 actionSheet, 触发 fail 回调
        uni.$emit(this.failEventName, {})
      }
      uni.$off(this.optionsEventName, null)
      uni.$off(this.readyEventName, null)
      uni.$off(this.successEventName, null)
      uni.$off(this.failEventName, null)
      // #ifdef WEB
      window.removeEventListener('resize', this.fixSize)
      // #endif
      // #ifdef APP-ANDROID || APP-IOS
      uni.offAppThemeChange(this.appThemeChangeCallbackId)
      uni.offOsThemeChange(this.osThemeChangeCallbackId)
      // #endif
    },
    methods: {
      // #ifdef WEB
      fixSize() {
        const {
          windowWidth,
          windowHeight,
          windowTop
        } = uni.getSystemInfoSync()
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight + (windowTop || 0)
      },
      // #endif
      closeActionSheet() {
        this.show = false
        setTimeout(() => {
          // #ifdef APP-ANDROID
          uni.closeDialogPage({
            dialogPage: this.$page
          })
          // #endif
          // #ifndef APP-ANDROID
          uni.closeDialogPage({
            dialogPage: this.$page
          })
          // #endif
        }, 250)
      },
      handleMenuItemClick(tapIndex: number) {
        this.menuItemClicked = true
        this.closeActionSheet()
        uni.$emit(this.successEventName, tapIndex)
      },
      handleCancel() {
        this.cancelButtonClicked = true
        this.closeActionSheet()
        uni.$emit(this.failEventName, {})
      },
      handleThemeChange() {
        if(this.hostTheme != null){
          this.theme = this.hostTheme!
        } else if(this.appTheme != null){
          this.theme = this.appTheme!
        }
      }
    }
  }
</script>

<style>
  .uni-action-sheet_dialog__mask {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    transition: opacity 0.1s;
  }

  .uni-action-sheet_dialog__mask__show {
    opacity: 1;
  }

  .uni-action-sheet_dialog__container {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 999;
    transform: translate(0, 100%);
    transition-property: transform;
    transition-duration: 0.15s;
    background-color: #f7f7f7;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .uni-action-sheet_dialog__menu {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
  }

  .uni-action-sheet_dialog__container.uni-action-sheet_dialog__show {
    transform: translate(0, 0);
  }

  .uni-action-sheet_dialog__title,
  .uni-action-sheet_dialog__cell,
  .uni-action-sheet_dialog__action {
    padding: 16px;
  }
	
  /* #ifdef APP */
	.border-t{
		border-top: 1rpx solid #e5e5e5;
	}
  .border-t.uni-action-sheet_dark__mode {
    border-top-color: #2F3131;
  }
  .border-b{
    border-bottom: 1rpx solid #e5e5e5;
  }
  .border-b.uni-action-sheet_dark__mode {
    border-bottom-color: #2F3131;
  }
  /* #endif */

  .uni-action-sheet_dialog__title__text,
  .uni-action-sheet_dialog__cell__text,
  .uni-action-sheet_dialog__action__text {
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .uni-action-sheet_dialog__action {
    margin-top: 8px;
  }

  .uni-action-sheet_dialog__title__text {
    color: #666666;
  }
  .uni-action-sheet_dialog__cell__text,
  .uni-action-sheet_dialog__action__text {
    color: #000000;
  }
  .uni-action-sheet_dialog__menu,
  .uni-action-sheet_dialog__action {
    background-color: #ffffff;
  }

  .uni-action-sheet_dialog__cell__container {
    max-height: 330px;
    /* #ifdef WEB */
    display: block;
    overflow-y: auto;
    scrollbar-width: none;
    /* #endif */
  }
  /* #ifdef WEB */
  .divider{
    height: 1px;
    background-color: #e5e5e5;
    transform: scaleY(0.5);
  }
  .divider.uni-action-sheet_dark__mode {
    background-color: #2F3131;
  }
  /* #endif */

  /* dark mode */
  .uni-action-sheet_dialog__container.uni-action-sheet_dark__mode {
    background-color: #1D1E1E;
  }
  .uni-action-sheet_dialog__menu.uni-action-sheet_dark__mode,
  .uni-action-sheet_dialog__action.uni-action-sheet_dark__mode {
    background-color: #2C2C2B;
  }
  .uni-action-sheet_dialog__title__text.uni-action-sheet_dark__mode {
    color: #999999;
  }
  .uni-action-sheet_dialog__cell__text.uni-action-sheet_dark__mode,
  .uni-action-sheet_dialog__action__text.uni-action-sheet_dark__mode {
    color: #ffffff;
  }

  /* landscape mode */
  .uni-action-sheet_dialog__container.uni-action-sheet_landscape__mode {
    width: 300px;
    position: fixed;
    left: 50%;
    right: auto;
    top: 50%;
    bottom: auto;
    z-index: 999;
    transform: translate(-50%, -50%);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .uni-action-sheet_dialog__menu.uni-action-sheet_landscape__mode {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
  }

  .uni-action-sheet_dialog__action.uni-action-sheet_landscape__mode {
    display: none;
  }

  .uni-action-sheet_dialog__cell__container.uni-action-sheet_landscape__mode {
    max-height: 260px;
  }

  .uni-action-sheet_dialog__title.uni-action-sheet_landscape__mode,
  .uni-action-sheet_dialog__cell.uni-action-sheet_landscape__mode,
  .uni-action-sheet_dialog__action.uni-action-sheet_landscape__mode {
    padding: 10px 6px;
  }

  /* #ifdef WEB */
  .uni-action-sheet_dialog__menu {
    display: block;
  }

  .uni-action-sheet_dialog__title,
  .uni-action-sheet_dialog__cell,
  .uni-action-sheet_dialog__action {
    display: block;
    text-align: center;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .uni-action-sheet_dialog__cell,
  .uni-action-sheet_dialog__action {
    cursor: pointer;
  }

  .uni-action-sheet_dialog__triangle {
    position: absolute;
    width: 0;
    height: 0;
    margin-left: -6px;
    border-style: solid;
  }
  /* web wide screen */
  @media screen and (min-width: 500px) and (min-height: 500px) {
    .uni-action-sheet_dialog__mask {
      background: none;
    }

    .uni-action-sheet_dialog__container {
      width: 300px;
      position: fixed;
      left: 50%;
      right: auto;
      top: 50%;
      bottom: auto;
      z-index: 999;
      border-radius: 5px;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
    }
    .uni-action-sheet_dialog__show {
      transform: translate(-50%, -50%) !important;
    }

    .uni-action-sheet_dialog__menu {
      border-radius: 5px;
    }

    .uni-action-sheet_dialog__cell__container {
      max-height: 260px;
    }

    .uni-action-sheet_dialog__action {
      display: none;
    }

    .uni-action-sheet_dialog__title {
      font-size: 15px;
    }

    .uni-action-sheet_dialog__title,
    .uni-action-sheet_dialog__cell,
    .uni-action-sheet_dialog__action {
      padding: 10px 6px;
    }
  }
  /* #endif */
</style>