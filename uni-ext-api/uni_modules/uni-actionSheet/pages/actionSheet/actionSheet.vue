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
                :hover-class="hoverClass"
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
        :hover-class="hoverClass"
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

<script setup lang='ts'>
  import { getCurrentInstance, reactive, ref, computed } from 'vue'
  import { onLoad, onReady, onResize, onUnload } from '@dcloudio/uni-app'

  const pageInstance = getCurrentInstance()!.proxy!
  const uniPageInstance = pageInstance.$page

  const show = ref(false)
  type I18nCancelText = {
    en: string,
    es: string,
    fr: string,
    zhHans: string,
    zhHant: string
  }
  const i18nCancelText = reactive({
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
    zhHans: '取消',
    zhHant: '取消',
  } as I18nCancelText)
  const readyEventName = ref('')
  const optionsEventName = ref('')
  const successEventName = ref('')
  const failEventName = ref('')
  const title = ref<string | null>(null)
  const itemList = ref<string[]>([])
  const optionCancelText = ref<string | null>(null)
  const titleColor = ref<string | null>(null)
  const itemColor = ref<string | null>(null)
  const cancelColor = ref<string | null>(null)
  const backgroundColor = ref<string | null>(null)
  const language = ref('zhHans')
  const theme = ref('light')
  const isLandscape = ref(false)
  const bottomNavigationHeight = ref(0)
  const appTheme = ref<string | null>(null)
  const hostTheme = ref<string | null>(null)
  const menuItemClicked = ref(false)
  const cancelButtonClicked = ref(false)
  // #ifdef WEB
  const windowWidth = ref(0)
  const windowHeight = ref(0)
  const popover = reactive({})
  // #endif
  // #ifdef APP-ANDROID || APP-IOS
  const appThemeChangeCallbackId = ref(-1)
  const osThemeChangeCallbackId = ref(-1)
  // #endif

  // #ifdef WEB
  const fixSize = () => {
    const systemInfo = uni.getSystemInfoSync()
    windowWidth.value = systemInfo.windowWidth
    windowHeight.value = systemInfo.windowHeight + (systemInfo.windowTop || 0)
  }
  // #endif
  const closeActionSheet = () => {
    show.value = false
    setTimeout(() => {
      uni.closeDialogPage({
        dialogPage: uniPageInstance
      })
    }, 250)
  }
  const handleMenuItemClick = (tapIndex: number) => {
    menuItemClicked.value = true
    closeActionSheet()
    uni.$emit(successEventName.value, tapIndex)
  }
  const handleCancel = () => {
    cancelButtonClicked.value = true
    closeActionSheet()
    uni.$emit(failEventName.value, {})
  }
  const handleThemeChange = () => {
    if(hostTheme.value != null){
      theme.value = hostTheme.value
    } else if(appTheme.value != null){
      theme.value = appTheme.value
    }
  }

  onLoad((options) => {
    readyEventName.value = options['readyEventName']!
    optionsEventName.value = options['optionsEventName']!
    successEventName.value = options['successEventName']!
    failEventName.value = options['failEventName']!
    uni.$on(optionsEventName.value, (data: UTSJSONObject) => {
      itemList.value = data['itemList'] as string[]
      if (data['title'] != null) {
        title.value = data['title'] as string
      }
      if (data['cancelText'] != null) {
        optionCancelText.value = data['cancelText'] as string
      }
      if (data['titleColor'] != null) {
        titleColor.value = data['titleColor'] as string
      }
      if (data['itemColor'] != null) {
        itemColor.value = data['itemColor'] as string
      }
      if (data['cancelColor'] != null) {
        cancelColor.value = data['cancelColor'] as string
      }
      if (data['backgroundColor'] != null) {
        backgroundColor.value = data['backgroundColor'] as string
      }
      // #ifdef WEB
      if (data['popover'] != null) {
        popover.value = data['popover']
      }
      // #endif
    })
    uni.$emit(readyEventName.value, {})

    const systemInfo = uni.getSystemInfoSync()
    const osLanguage = systemInfo.osLanguage
    const appLanguage = systemInfo.appLanguage
    if (appLanguage != null) {
      language.value = appLanguage
    } else if (osLanguage != null) {
      language.value = osLanguage
    }
    const systemAppTheme = systemInfo.appTheme
    if (systemAppTheme != null && systemAppTheme != "auto") {
      appTheme.value = systemAppTheme
      handleThemeChange()
    }
    const systemOsTheme = systemInfo.osTheme
    if (systemOsTheme != null && appTheme.value == null) {
      appTheme.value = systemOsTheme
      handleThemeChange()
    }
    // #ifdef WEB
    const systemHostTheme = systemInfo.hostTheme
    if (systemHostTheme != null) {
      hostTheme.value = systemHostTheme
      handleThemeChange()
    }
    uni.onHostThemeChange((res) => {
      hostTheme.value = res.theme
      handleThemeChange()
    });
    windowWidth.value = systemInfo.windowWidth
    windowHeight.value = systemInfo.windowHeight
    window.addEventListener('resize', fixSize)

    const locale = uni.getLocale()
    language.value = locale
    uni.onLocaleChange((res) => {
      if (res.locale) {
        language.value = res.locale
      }
    })
    // #endif
    isLandscape.value = systemInfo.deviceOrientation == 'landscape'
    // #ifdef APP-ANDROID || APP-IOS
    appThemeChangeCallbackId.value = uni.onAppThemeChange((res: AppThemeChangeResult) => {
      const callbackAppTheme = res.appTheme
      if (callbackAppTheme != null && callbackAppTheme != "auto") {
        appTheme.value = callbackAppTheme
        handleThemeChange()
      }
    })
    // #endif
  })
    
  // #ifdef WEB
  const isWidescreen = computed((): boolean => {
    return windowHeight.value >= 500 && windowWidth.value >= 500
  })
  const containerStyle = computed((): UTSJSONObject => {
    if (Object.keys(popover).length == 0) {
      return {}
    }
    const res = {
      transform: 'none !important'
    }
    const top = popover.top
    const left = popover.left
    const width = popover.width
    const height = popover.height
    const center = left + width / 2
    const contentLeft = Math.max(0, center - 300 / 2)
    res['left'] = `${contentLeft}px`
    const vcl = windowHeight.value / 2
    if (top + height - vcl > vcl - top) {
      res['top'] = 'auto'
      res['bottom'] = `${windowHeight.value - top + 6}px`
    } else {
      res['top'] = `${top + height + 6}px`
    }
    return res
  })
  const triangleStyle = computed((): UTSJSONObject => {
    if (Object.keys(popover).length == 0) {
      return {}
    }
    const res = {}
    const borderColor = backgroundColor.value || (theme.value == 'dark' ? '#2C2C2B' : '#fcfcfd')
    const top = popover.top
    const left = popover.left
    const width = popover.width
    const height = popover.height
    const center = left + width / 2
    const contentLeft = Math.max(0, center - 300 / 2)
    let triangleLeft = Math.max(12, center - contentLeft)
    triangleLeft = Math.min(300 - 12, triangleLeft)
    res['left'] = `${triangleLeft}px`
    const vcl = windowHeight.value / 2
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
  })
  // #endif
  const cancelText = computed((): string => {
    if (optionCancelText.value != null) {
      const res = optionCancelText.value
      return res
    }
    if (language.value.startsWith('en')) {
      return i18nCancelText['en'] as string
    }
    if (language.value.startsWith('es')) {
      return i18nCancelText['es'] as string
    }
    if (language.value.startsWith('fr')) {
      return i18nCancelText['fr'] as string
    }
    if (language.value.startsWith('zhHans')) {
      return i18nCancelText['zhHans'] as string
    }
    if (language.value.startsWith('zhHant')) {
      return i18nCancelText['zhHant'] as string
    }
    return '取消'
  })
  const computedBackgroundColor = computed((): string => {
    return backgroundColor.value !== null ? backgroundColor.value : (theme.value == 'dark' ? '#2C2C2B' : '#ffffff')
  })
  const hoverClass = computed((): string => {
    return theme.value == 'dark' ? 'uni-action-sheet_dialog__hover__dark__mode' : 'uni-action-sheet_dialog__hover'
  })

  onReady(() => {
    bottomNavigationHeight.value = uniPageInstance.safeAreaInsets.bottom
    // #ifdef APP-ANDROID
    if(bottomNavigationHeight.value == 0){
      const systemInfo = uni.getSystemInfoSync()
      bottomNavigationHeight.value = systemInfo.safeAreaInsets.bottom
    }
    // #endif
    setTimeout(() => {
      show.value = true
    }, 10)
  })
  onResize((_ : OnResizeOptions) => {
    const systemInfo = uni.getSystemInfoSync()
    isLandscape.value = systemInfo.deviceOrientation == 'landscape'
  })
  onUnload(() => {
    if (!menuItemClicked.value && !cancelButtonClicked.value) {
      // 非用户交互导致关闭 actionSheet, 触发 fail 回调
      uni.$emit(failEventName.value, {})
    }
    uni.$off(optionsEventName.value, null)
    uni.$off(readyEventName.value, null)
    uni.$off(successEventName.value, null)
    uni.$off(failEventName.value, null)
    // #ifdef WEB
    window.removeEventListener('resize', fixSize)
    // #endif
    // #ifdef APP-ANDROID || APP-IOS
    uni.offAppThemeChange(appThemeChangeCallbackId.value)
    uni.offOsThemeChange(osThemeChangeCallbackId.value)
    // #endif
  })
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

  .uni-action-sheet_dialog__hover {
		background-color: #efefef;
	}
	.uni-action-sheet_dialog__hover__dark__mode {
		background-color: #1c1c1c;
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