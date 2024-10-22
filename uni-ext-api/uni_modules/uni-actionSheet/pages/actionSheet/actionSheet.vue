<template>
  <view>
    <view class="uni-actionsheet_dialog__mask" :class="{ 'uni-actionsheet_dialog__mask__show': show }"
      @click="handleCancel"></view>
    <view class="uni-actionsheet_dialog__container" :style="{ backgroundColor: containerBackgroundColor }" :class="{ 'uni-actionsheet_dialog__show': show }">
      <view :style="{backgroundColor: cellBackgroundColor}" v-if="title" class="uni-actionsheet_dialog__title">
        <text :style="{
					color: titleColor
				}" class="uni-actionsheet_dialog__title__text">{{ title }}</text>
      </view>
      <view class="uni-actionsheet_dialog__menu" :style="{backgroundColor: cellBackgroundColor}">
        <view class="uni-actionsheet_dialog__cell" v-for="(item, index) in itemList" :key="index"
          :style="getCellStyle(index)"
          @click="handleMenuItemClick(index)">
          <text :style="{color: itemColor}"
            class="uni-actionsheet_dialog__cell__text">{{ item }}</text>
        </view>
      </view>
      <view :style="{backgroundColor: cellBackgroundColor}" class="uni-actionsheet_dialog__action" @click="handleCancel">
        <text :style="{
					color: cancelColor
				}" class="uni-actionsheet_dialog__action__text">{{ cancelText }}</text>
      </view>
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
        optionCancelText: '',
        optionTitleColor: null as string | null,
        optionItemColor: null as string | null,
        optionCancelColor: null as string | null,
        optionCellBackgroundColor: null as string | null,
        successCallback: null as Function | null,
        failCallback: null as Function | null,
        completeCallback: null as Function | null,
        language: 'zh-Hans',
        theme: 'light',
      }
    },
    onLoad(options) {
      this.readyEventName = options['readyEventName']!
      this.optionsEventName = options['optionsEventName']!
      this.successEventName = options['successEventName']!
      this.failEventName = options['failEventName']!
      uni.$on(this.optionsEventName, (data: UTSJSONObject) => {
        this.itemList = data['itemList'] as string[]
        if (data['title'] !== null) {
          this.title = data['title'] as string
        }
        if (data['cancelText'] !== null) {
          this.optionCancelText = data['cancelText'] as string
        }
        if (data['titleColor'] !== null) {
          this.optionTitleColor = data['titleColor'] as string
        }
        if (data['itemColor'] !== null) {
          this.optionItemColor = data['itemColor'] as string
        }
        if (data['cancelColor'] !== null) {
          this.optionCancelColor = data['cancelColor'] as string
        }
        if (data['backgroundColor'] !== null) {
          this.optionCellBackgroundColor = data['backgroundColor'] as string
        }
        if (data['success'] !== null) {
          this.successCallback = data['success'] as Function
        }
        if (data['fail'] !== null) {
          this.failCallback = data['fail'] as Function
        }
        if (data['complete'] !== null) {
          this.completeCallback = data['complete'] as Function
        }
      })
      uni.$emit(this.readyEventName, {})

      // #ifndef APP-ANDROID
      const systemInfo = uni.getSystemInfoSync()
      const osLanguage = systemInfo.osLanguage
      const appLanguage = systemInfo.appLanguage
      if (appLanguage != null) {
        this.language = appLanguage
      } else if (osLanguage != null) {
        this.language = osLanguage
      }
      const osTheme = systemInfo.osTheme
      const appTheme = systemInfo.appTheme
      const hostTheme = systemInfo.hostTheme
      if (hostTheme != null) {
        this.theme = hostTheme
      } else if (appTheme != null) {
        this.theme = appTheme
      } else if (osTheme != null) {
        this.theme = osTheme
      }
      // #endif

      // #ifdef WEB
      const locale = uni.getLocale()
      this.language = locale
      uni.onLocaleChange((res) => {
        this.language = res.locale
      })
      uni.onThemeChange((res) => {
        this.theme = res.theme
      });
      // #endif
      // #ifdef APP-IOS
      uni.onAppThemeChange((res: AppThemeChangeResult) => {
        this.theme = res.appTheme
      })
      uni.onOsThemeChange((res: OsThemeChangeResult) => {
        this.theme = res.osTheme
      })
      // #endif
    },
    computed: {
      cancelText() : string {
        if (this.optionCancelText != null) {
          return this.optionCancelText
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
      titleColor() : string {
        if (this.optionTitleColor != null) {
          return this.optionTitleColor as string
        }
        return this.theme == 'dark' ? '#999999' : '#666666'
      },
      itemColor(): string {
        if (this.optionItemColor != null) {
          return this.optionItemColor as string
        }
        return this.theme == 'dark' ? '#ffffff' : '#000000'
      },
      cancelColor(): string {
        if (this.optionCancelColor != null) {
          return this.optionCancelColor as string
        }
        return this.theme == 'dark' ? '#ffffff' : '#000000'
      },
      cellBackgroundColor() : string {
        if (this.optionCellBackgroundColor != null) {
          return this.optionCellBackgroundColor as string
        }
        return this.theme == 'dark' ? '#2C2C2B' : '#ffffff'
      },
      containerBackgroundColor() : string {
        return this.theme == 'dark' ? '#1D1E1E' : '#f7f7f7'
      },
      cellBorderColor() : string {
        return this.theme == 'dark' ? '#2F3131' : '#e5e5e5'
      }
    },
    onReady() {
      setTimeout(() => {
        this.show = true
      }, 10)
    },
    onUnload() {
      // @ts-expect-error
      uni.$off(this.optionsEventName, null)
      // @ts-expect-error
      uni.$off(this.readyEventName, null)
      // @ts-expect-error
      uni.$off(this.successEventName, null)
      // @ts-expect-error
      uni.$off(this.failEventName, null)
    },
  methods: {
      getCellStyle(index: number): UTSJSONObject {
        const style = {borderTop: `1px solid ${this.cellBorderColor}`}
        if (index == 0) {
          return this.title != null ? style : {}
        }
        return style
      },
      closeActionSheet() {
        this.show = false
        setTimeout(() => {
          // @ts-expect-error
          uni.closeDialogPage({ dialogPage: this.$page } as io.dcloud.uniapp.framework.extapi.CloseDialogPageOptions)
        }, 300)
      },
      handleMenuItemClick(tapIndex : number) {
        this.closeActionSheet()
        uni.$emit(this.successEventName, tapIndex)
      },
      handleCancel() {
        this.closeActionSheet()
        uni.$emit(this.failEventName, {})
      }
    }
  }
</script>

<style>
  .uni-actionsheet_dialog__mask {
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

  .uni-actionsheet_dialog__mask__show {
    opacity: 1;
  }

  .uni-actionsheet_dialog__container {
    position: fixed;
    width: 100%;
    overflow: hidden;
    left: 0;
    bottom: 0;
    z-index: 999;
    backface-visibility: hidden;
    transform: translate(0, 100%);
    /* #ifdef APP */
    transition: transform 0.3s;
    /* #endif */
    /* #ifndef APP */
    visibility: hidden;
    transition: transform 0.3s, visibility 0.3s;
    /* #endif */
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .uni-actionsheet_dialog__container.uni-actionsheet_dialog__show {
    /* #ifndef APP */
    visibility: visible;
    /* #endif */
    transform: translate(0, 0);
  }

  .uni-actionsheet_dialog__menu{display: block;}

  .uni-actionsheet_dialog__title,
  .uni-actionsheet_dialog__cell,
  .uni-actionsheet_dialog__action {
    display: block;
    padding: 16px;
    text-align: center;
  }
  .uni-actionsheet_dialog__cell,
  .uni-actionsheet_dialog__action {
    cursor: pointer;
  }

    /* #ifndef APP */
  .uni-actionsheet_dialog__title,
  .uni-actionsheet_dialog__cell,
  .uni-actionsheet_dialog__action,
    /* #endif */
  .uni-actionsheet_dialog__title__text,
  .uni-actionsheet_dialog__cell__text,
  .uni-actionsheet_dialog__action__text {
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .uni-actionsheet_dialog__action {
    margin-top: 8px;
  }

  @media screen and (min-width: 500px) and (min-height: 500px) {
    .uni-actionsheet_dialog__mask {
      background: none;
    }

    .uni-actionsheet_dialog__container {
      width: 300px;
      position: fixed;
      left: 50%;
      right: auto;
      top: 50%;
      bottom: auto;
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      backface-visibility: hidden;
      border-radius: 5px;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s, visibility 0.3s;
      box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
    }

    .uni-actionsheet_dialog__show {
      visibility: visible;
      opacity: 1;
      transform: translate(-50%, -50%) !important;
    }

    .uni-actionsheet_dialog__action {
      display: none;
    }

    .uni-actionsheet_dialog__title {
      font-size: 15px;
    }

    .uni-actionsheet_dialog__title,
    .uni-actionsheet_dialog__cell,
    .uni-actionsheet_dialog__action {
      padding: 16px;
    }
  }
</style>