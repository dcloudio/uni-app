<template>
  <uni-page-head :uni-page-head-type="navigationBar.type || 'default'">
    <div ref="headRef" :class="clazz" :style="style">
      <div class="uni-page-head-hd">
        <div
          v-if="hasPages && !pageMeta.isQuit"
          class="uni-page-head-btn"
          @click="onPageHeadBackButton"
        >
          <svg width="26" height="26" viewBox="0 0 32 32">
            <path
              :d="ICON_PATH_BACK"
              :fill="
                navigationBar.type === 'transparent'
                  ? '#fff'
                  : navigationBar.titleColor
              "
            />
          </svg>
        </div>
        <template v-if="hasButtons && buttons">
          <div
            v-for="(button, index) in buttons.left"
            :key="index"
            :class="button.btnClass"
            :style="button.btnStyle"
            :badge-text="button.badgeText"
            @click="button.onClick"
          >
            <svg
              v-if="button.btnIconPath"
              :width="getSvgSize(button.iconStyle.fontSize)"
              :height="getSvgSize(button.iconStyle.fontSize)"
              viewBox="0 0 32 32"
            >
              <path
                :d="button.btnIconPath"
                :fill="getSvgColor(button.iconStyle.color)"
              />
            </svg>
            <span v-else-if="button.btnSelect" :style="button.iconStyle">
              <i class="uni-btn-icon" v-html="button.btnText" />
              <svg width="14" height="14" viewBox="0 0 32 32">
                <path :d="ICON_PATHS.select" fill="#000" />
              </svg>
            </span>
            <i
              v-else
              class="uni-btn-icon"
              :style="button.iconStyle"
              v-html="button.btnText"
            />
          </div>
        </template>
      </div>
      <div
        v-if="!hasSearchInput || !navigationBar.searchInput"
        class="uni-page-head-bd"
      >
        <div
          class="uni-page-head__title"
          :style="{
            fontSize: navigationBar.titleSize,
            opacity: navigationBar.type === 'transparent' ? 0 : 1,
          }"
        >
          <i v-if="navigationBar.loading" class="uni-loading" />
          <img
            v-else-if="navigationBar.titleImage"
            :src="navigationBar.titleImage"
            class="uni-page-head__title_image"
          />
          <template v-else>{{ navigationBar.titleText }}</template>
        </div>
      </div>
      <div
        v-else
        class="uni-page-head-search"
        :style="{
          borderRadius: navigationBar.searchInput.borderRadius,
          backgroundColor: navigationBar.searchInput.backgroundColor,
        }"
      >
        <div
          :style="{ color: navigationBar.searchInput.placeholderColor }"
          :class="[
            'uni-page-head-search-placeholder',
            `uni-page-head-search-placeholder-${
              searchFocus || searchText
                ? 'left'
                : navigationBar.searchInput.align
            }`,
          ]"
        >
          <div class="uni-page-head-search-icon">
            <svg width="20" height="20" viewBox="0 0 32 32">
              <path
                :d="ICON_PATH_SEARCH"
                :fill="navigationBar.searchInput.placeholderColor"
              />
            </svg>
          </div>
          <template v-if="!(searchText || searchComposing)">
            {{ navigationBar.searchInput.placeholder }}
          </template>
        </div>
        <Input
          v-if="navigationBar.searchInput.disabled"
          :disabled="true"
          :style="{ color: navigationBar.searchInput.color }"
          :placeholder-style="
            'color: ' + navigationBar.searchInput.placeholderColor
          "
          class="uni-page-head-search-input"
          confirm-type="search"
          @click="searchOnClick && searchOnClick($event)"
        />
        <Input
          v-else
          :focus="navigationBar.searchInput.autoFocus"
          :style="{ color: navigationBar.searchInput.color }"
          :placeholder-style="
            'color: ' + navigationBar.searchInput.placeholderColor
          "
          class="uni-page-head-search-input"
          confirm-type="search"
          @focus="searchOnFocus && searchOnFocus($event)"
          @blur="searchOnBlur && searchOnBlur($event)"
          @input="searchOnInput && searchOnInput($event)"
          @confirm="searchOnConfirm && searchOnConfirm($event)"
        />
      </div>
      <div class="uni-page-head-ft">
        <template v-if="hasButtons && buttons">
          <div
            v-for="(button, index) in buttons.right"
            :key="index"
            :class="button.btnClass"
            :style="button.btnStyle"
            :badge-text="button.badgeText"
            @click="button.onClick"
          >
            <svg
              v-if="button.btnIconPath"
              :width="getSvgSize(button.iconStyle.fontSize)"
              :height="getSvgSize(button.iconStyle.fontSize)"
              viewBox="0 0 32 32"
            >
              <path
                :d="button.btnIconPath"
                :fill="getSvgColor(button.iconStyle.color)"
              />
            </svg>
            <span v-else-if="button.btnSelect" :style="button.iconStyle">
              <i class="uni-btn-icon" v-html="button.btnText" />
              <svg width="14" height="14" viewBox="0 0 32 32">
                <path :d="ICON_PATHS.select" fill="#000" />
              </svg>
            </span>
            <i
              v-else
              class="uni-btn-icon"
              :style="button.iconStyle"
              v-html="button.btnText"
            />
          </div>
        </template>
      </div>
    </div>
    <div
      v-if="
        navigationBar.type !== 'transparent' && navigationBar.type !== 'float'
      "
      :class="{
        'uni-placeholder': true,
        'uni-placeholder-titlePenetrate': navigationBar.titlePenetrate,
      }"
    />
  </uni-page-head>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { extend, isArray } from '@vue/shared'
import { Input } from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import {
  ICON_PATH_BACK,
  ICON_PATH_CLOSE,
  ICON_PATH_SEARCH,
  invokeHook,
  updateStyle,
} from '@dcloudio/uni-core'
import {
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
} from '@dcloudio/uni-shared'
import { usePageMeta } from '../../setup/provide'
import {
  usePageHeadTransparent,
  usePageHeadTransparentBackgroundColor,
} from './transparent'
import { parseTheme, useTheme } from '../../../helpers/theme'

defineOptions({
  name: 'PageHead',
  __reserved: true,
  compatConfig: { MODE: 3 },
})

const hasPages = __UNI_FEATURE_PAGES__
const hasButtons = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__
const hasSearchInput = __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__

const ICON_PATHS = {
  none: '',
  forward:
    'M11 7.844q-0.25-0.219-0.25-0.578t0.25-0.578q0.219-0.25 0.563-0.25t0.563 0.25l9.656 9.125q0.125 0.125 0.188 0.297t0.063 0.328q0 0.188-0.063 0.359t-0.188 0.297l-9.656 9.125q-0.219 0.25-0.563 0.25t-0.563-0.25q-0.25-0.219-0.25-0.578t0.25-0.609l9.063-8.594-9.063-8.594z',
  back: ICON_PATH_BACK,
  select: ICON_PATH_BACK,
  share:
    'M26.563 24.844q0 0.125-0.109 0.234t-0.234 0.109h-17.938q-0.125 0-0.219-0.109t-0.094-0.234v-13.25q0-0.156 0.094-0.25t0.219-0.094h5.5v-1.531h-6q-0.531 0-0.906 0.391t-0.375 0.922v14.375q0 0.531 0.375 0.922t0.906 0.391h18.969q0.531 0 0.891-0.391t0.359-0.953v-5.156h-1.438v4.625zM29.813 10.969l-5.125-5.375-1.031 1.094 3.438 3.594-3.719 0.031q-2.313 0.188-4.344 1.125t-3.578 2.422-2.5 3.453-1.109 4.188l-0.031 0.25h1.469v-0.219q0.156-1.875 1-3.594t2.25-3.063 3.234-2.125 3.828-0.906l0.188-0.031 3.313-0.031-3.438 3.625 1.031 1.063 5.125-5.375-0.031-0.063 0.031-0.063z',
  favorite:
    'M27.594 13.375q-0.063-0.188-0.219-0.313t-0.344-0.156l-7.094-0.969-3.219-6.406q-0.094-0.188-0.25-0.281t-0.375-0.094q-0.188 0-0.344 0.094t-0.25 0.281l-3.125 6.438-7.094 1.094q-0.188 0.031-0.344 0.156t-0.219 0.313q-0.031 0.188 0.016 0.375t0.172 0.313l5.156 4.969-1.156 7.063q-0.031 0.188 0.047 0.375t0.234 0.313q0.094 0.063 0.188 0.094t0.219 0.031q0.063 0 0.141-0.031t0.172-0.063l6.313-3.375 6.375 3.313q0.063 0.031 0.141 0.047t0.172 0.016q0.188 0 0.344-0.094t0.25-0.281q0.063-0.094 0.078-0.234t-0.016-0.234q0-0.031 0-0.063l-1.25-6.938 5.094-5.031q0.156-0.156 0.203-0.344t-0.016-0.375zM11.469 19.063q0.031-0.188-0.016-0.344t-0.172-0.281l-4.406-4.25 6.063-0.906q0.156-0.031 0.297-0.125t0.203-0.25l2.688-5.531 2.75 5.5q0.063 0.156 0.203 0.25t0.297 0.125l6.094 0.844-4.375 4.281q-0.125 0.125-0.172 0.297t-0.016 0.328l1.063 6.031-5.438-2.813q-0.156-0.094-0.328-0.078t-0.297 0.078l-5.438 2.875 1-6.031z',
  home: 'M23.719 16.5q-0.313 0-0.531 0.219t-0.219 0.5v7.063q0 0.219-0.172 0.391t-0.391 0.172h-12.344q-0.25 0-0.422-0.172t-0.172-0.391v-7.063q0-0.281-0.219-0.5t-0.531-0.219q-0.281 0-0.516 0.219t-0.234 0.5v7.063q0.031 0.844 0.625 1.453t1.438 0.609h12.375q0.844 0 1.453-0.609t0.609-1.453v-7.063q0-0.125-0.063-0.266t-0.156-0.234q-0.094-0.125-0.234-0.172t-0.297-0.047zM26.5 14.875l-8.813-8.813q-0.313-0.313-0.688-0.453t-0.781-0.141-0.781 0.141-0.656 0.422l-8.813 8.844q-0.188 0.219-0.188 0.516t0.219 0.484q0.094 0.125 0.234 0.172t0.297 0.047q0.125 0 0.25-0.047t0.25-0.141l8.781-8.781q0.156-0.156 0.406-0.156t0.406 0.156l8.813 8.781q0.219 0.188 0.516 0.188t0.516-0.219q0.188-0.188 0.203-0.484t-0.172-0.516z',
  menu: 'M8.938 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM16.188 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM23.469 18.313q0.844 0 1.453-0.609t0.609-1.453-0.609-1.453-1.453-0.609q-0.875 0-1.484 0.609t-0.609 1.453 0.609 1.453 1.484 0.609z',
  close: ICON_PATH_CLOSE,
}

const headRef = ref(null)
const pageMeta = usePageMeta()
const navigationBar = useTheme(pageMeta.navigationBar, () => {
  const _navigationBar = parseTheme(pageMeta.navigationBar)
  navigationBar.backgroundColor = _navigationBar.backgroundColor
  navigationBar.titleColor = _navigationBar.titleColor
})
const { clazz, style } = usePageHead(navigationBar)
const buttons = (hasButtons && usePageHeadButtons(pageMeta)) as PageHeadButtons
const searchInput = (hasSearchInput &&
  navigationBar.searchInput &&
  usePageHeadSearchInput(pageMeta)) as PageHeadSearchInput
const searchFocus = searchInput && searchInput.focus
const searchText = searchInput && searchInput.text
const searchComposing = searchInput && searchInput.composing
const searchOnClick = searchInput && searchInput.onClick
const searchOnFocus = searchInput && searchInput.onFocus
const searchOnBlur = searchInput && searchInput.onBlur
const searchOnInput = searchInput && searchInput.onInput
const searchOnConfirm = searchInput && searchInput.onConfirm

__UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ &&
  navigationBar.type === 'transparent' &&
  usePageHeadTransparent(headRef, pageMeta)

function getSvgSize(size?: number) {
  return size == null ? 27 : size
}

function getSvgColor(color?: string) {
  return color == null ? '#000' : color
}

function onPageHeadBackButton() {
  if (getCurrentPages().length === 1) {
    uni.reLaunch({
      url: '/',
    })
  } else {
    uni.navigateBack({
      from: 'backbutton',
      success() {}, // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
    } as UniApp.NavigateBackOptions)
  }
}

function usePageHead(navigationBar: UniApp.PageNavigationBar) {
  const clazz = computed(() => {
    const { type, titlePenetrate, shadowColorType } = navigationBar
    const clazz: Record<string, boolean> = {
      'uni-page-head': true,
      'uni-page-head-transparent': type === 'transparent',
      'uni-page-head-titlePenetrate': titlePenetrate === 'YES',
      'uni-page-head-shadow': !!shadowColorType,
    }
    if (shadowColorType) {
      clazz[`uni-page-head-shadow-${shadowColorType}`] = true
    }
    return clazz
  })
  const style = computed(() => {
    const backgroundColor =
      __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ &&
      navigationBar.type === 'transparent'
        ? usePageHeadTransparentBackgroundColor(navigationBar.backgroundColor!)
        : navigationBar.backgroundColor
    return {
      backgroundColor,
      color: navigationBar.titleColor,
      transitionDuration: navigationBar.duration,
      transitionTimingFunction: navigationBar.timingFunc,
    }
  })
  return { clazz, style }
}

type PageHeadButton = ReturnType<typeof usePageHeadButton>
type PageHeadButtons = ReturnType<typeof usePageHeadButtons>

function usePageHeadButtons({ id, navigationBar }: UniApp.PageRouteMeta) {
  const left: PageHeadButton[] = []
  const right: PageHeadButton[] = []
  const { buttons } = navigationBar
  if (isArray(buttons)) {
    const { type } = navigationBar
    const isTransparent = type === 'transparent'
    const fonts = Object.create(null)
    buttons.forEach((btn, index) => {
      if (btn.fontSrc && !btn.fontFamily) {
        const fontSrc = getRealPath(btn.fontSrc)
        let fontFamily = fonts[fontSrc]
        if (!fontFamily) {
          fontFamily = `font${Date.now()}`
          fonts[fontSrc] = fontFamily
          onBeforeMount(() =>
            updateStyle(
              'uni-btn-' + fontFamily,
              `@font-face{font-family: "${fontFamily}";src: url("${fontSrc}") format("truetype")}`
            )
          )
        }
        btn.fontFamily = fontFamily
      }
      const pageHeadBtn = usePageHeadButton(id!, index, btn, isTransparent)
      if (btn.float === 'left') {
        left.push(pageHeadBtn)
      } else {
        right.push(pageHeadBtn)
      }
    })
  }
  return { left, right }
}

function usePageHeadButton(
  pageId: number,
  index: number,
  btn: UniApp.PageNavigationBarButton,
  isTransparent: boolean
) {
  const iconStyle: UniApp.StyleObj = {
    color: btn.color,
    fontSize: btn.fontSize,
    fontWeight: btn.fontWeight,
  }
  if (btn.fontFamily) {
    iconStyle.fontFamily = btn.fontFamily
  }
  return new Proxy(
    {
      btnClass: {
        'uni-page-head-btn': true,
        'uni-page-head-btn-red-dot': !!(btn.redDot || btn.badgeText),
        'uni-page-head-btn-select': !!btn.select,
      },
      btnStyle: {
        backgroundColor: isTransparent ? btn.background : 'transparent',
        width: btn.width,
      },
      btnText: '',
      btnIconPath: ICON_PATHS[btn.type],
      badgeText: btn.badgeText,
      iconStyle,
      onClick() {
        invokeHook(pageId, ON_NAVIGATION_BAR_BUTTON_TAP, extend({ index }, btn))
      },
      btnSelect: btn.select,
    },
    {
      get(target, key, receiver) {
        if (['btnText'].includes(key as string)) {
          return btn.fontSrc && btn.fontFamily
            ? btn.text.replace('\\u', '&#x')
            : btn.text
        } else {
          return Reflect.get(target, key, receiver)
        }
      },
    }
  )
}

type PageHeadSearchInput = ReturnType<typeof usePageHeadSearchInput>

function usePageHeadSearchInput({
  id,
  navigationBar: { searchInput },
}: UniApp.PageRouteMeta) {
  const focus = ref(false)
  const text = ref('')
  const composing = ref(false)
  const { disabled } = searchInput!
  if (disabled) {
    const onClick = () => {
      invokeHook(id!, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED)
    }
    return { focus, text, composing, onClick }
  }
  const onFocus = () => {
    focus.value = true
    invokeHook(id!, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
      focus: true,
    })
  }
  const onBlur = () => {
    focus.value = false
    invokeHook(id!, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
      focus: false,
    })
  }
  const onInput = (evt: { detail: { value: string } }) => {
    text.value = evt.detail.value
    invokeHook(id!, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, {
      text: text.value,
    })
  }
  const onConfirm = (evt: KeyboardEvent) => {
    invokeHook(id!, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, {
      text: text.value,
    })
  }
  return { focus, text, composing, onFocus, onBlur, onInput, onConfirm }
}
</script>
