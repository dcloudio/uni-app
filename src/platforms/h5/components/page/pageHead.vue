<template>
  <uni-page-head>
    <div
      :style="{transitionDuration:duration,transitionTimingFunction:timingFunc,backgroundColor:bgColor,color:textColor}"
      :class="{'uni-page-head-transparent':type==='transparent'}"
      class="uni-page-head"
    >
      <div class="uni-page-head-hd">
        <div
          v-show="backButton"
          @click="_back">
          <i
            :style="{color:color,fontSize:'27px'}"
            class="uni-btn-icon">&#xe601;</i>
        </div>
        <template v-for="(btn,index) in btns">
          <div
            v-if="btn.float === 'left'"
            :key="index"
            :style="{marginRight:index>0?'5px':'0px'}">
            <i
              :style="_formatBtnStyle(btn)"
              class="uni-btn-icon"
              @click="_onBtnClick(index)"
              v-html="_formatBtnFontText(btn)"
            />
          </div>
        </template>
      </div>
      <div
        v-if="!searchInput"
        class="uni-page-head-bd">
        <div
          :style="{fontSize:titleSize,opacity:type==='transparent'?0:1}"
          class="uni-page-head__title"
        >
          <i
            v-if="loading"
            class="uni-loading"/>
          {{ titleText }}
        </div>
      </div>
      <div
        v-if="searchInput"
        :style="{'background-color':searchInput.backgroundColor}"
        class="uni-page-head-search"
      >
        <div
          :style="{color:searchInput.placeholderColor}"
          :class="[`uni-page-head-search-placeholder-${focus || text ? 'left' : searchInput.align}`]"
          class="uni-page-head-search-placeholder"
        >{{ text || composing ? '' : searchInput.placeholder }}</div>
        <v-uni-input
          ref="input"
          v-model="text"
          :focus="searchInput.autoFocus"
          :disabled="searchInput.disabled"
          :style="{'border-radius':searchInput.borderRadius,color:searchInput.color}"
          :placeholder-style="`color:${searchInput.placeholderColor}`"
          class="uni-page-head-search-input"
          confirm-type="search"
          @focus="__focus"
          @blur="__blur"
          @input="__input"
        />
      </div>
      <div class="uni-page-head-ft">
        <template v-for="(btn,index) in btns">
          <div
            v-if="btn.float !== 'left'"
            :key="index">
            <i
              :style="_formatBtnStyle(btn)"
              class="uni-btn-icon"
              @click="_onBtnClick(index)"
              v-html="_formatBtnFontText(btn)"
            />
          </div>
        </template>
      </div>
    </div>
    <div
      v-if="type!=='transparent'"
      class="uni-placeholder"/>
  </uni-page-head>
</template>
<style>
uni-page-head {
  display: block;
  box-sizing: border-box;
}

uni-page-head .uni-page-head {
  position: fixed;
  left: 0;
  width: 100%;
  height: 44px;
  padding: 7px 3px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 998;
  color: #fff;
  background-color: #000;
  transition-property: all;
}

uni-page-head .uni-page-head.uni-page-head-transparent .uni-page-head-hd > div,
uni-page-head .uni-page-head.uni-page-head-transparent .uni-page-head-ft > div {
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #999;
  border-radius: 50%;
}

uni-page-head .uni-page-head.uni-page-head-transparent .uni-page-head-ft > div {
  justify-content: center;
}

uni-page-head .uni-page-head ~ .uni-placeholder {
  width: 100%;
  height: 44px;
}

uni-page-head .uni-page-head * {
  box-sizing: border-box;
}

uni-page-head .uni-page-head-hd {
  display: flex;
  align-items: center;
  font-size: 16px;
}

uni-page-head .uni-page-head-bd {
  position: absolute;
  left: 70px;
  right: 70px;
  min-width: 0;
  user-select: auto;
}

.uni-btn-icon {
  max-width: 48px;
  word-break: keep-all;
  margin: 0 2px;
  overflow: hidden;
  word-break: keep-all;
}

.uni-page-head-search {
  position: relative;
  display: flex;
  flex: 1;
  margin: 0 2px;
  line-height: 30px;
  font-size: 16px;
}

.uni-page-head-search-input {
  width: 100%;
  height: 100%;
  padding-left: 34px;
}

.uni-page-head-search-placeholder {
  position: absolute;
  max-width: 100%;
  height: 100%;
  padding-left: 34px;
  overflow: hidden;
  word-break: keep-all;
}

.uni-page-head-search-placeholder-right {
  right: 0;
}

.uni-page-head-search-placeholder-center {
  left: 50%;
  transform: translateX(-50%);
}

.uni-page-head-search-placeholder::before {
  position: absolute;
  top: 0;
  left: 2px;
  width: 30px;
  content: "\ea0e";
  display: block;
  font-size: 20px;
  font-family: "uni";
  text-align: center;
}

uni-page-head .uni-page-head-ft {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 13px;
}

uni-page-head .uni-page-head__title {
  font-weight: bold;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

uni-page-head .uni-page-head__title .uni-loading {
  width: 16px;
  height: 16px;
  margin-top: -3px;
}
</style>
<script>
import appendCss from 'uni-platform/helpers/append-css'
import getRealPath from 'uni-platform/helpers/get-real-path'

import transparent from './transparent'

const FONTS = {
  forward: '&#xe600;',
  back: '&#xe601;',
  share: '&#xe602;',
  favorite: '&#xe604;',
  home: '&#xe605;',
  menu: '&#xe606;',
  close: '&#xe650;'
}
export default {
  name: 'PageHead',
  mixins: [transparent],
  props: {
    backButton: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#000'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    titleText: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: '0'
    },
    timingFunc: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    titleSize: {
      type: String,
      default: '16px'
    },
    type: {
      default: 'default',
      validator (value) {
        return ['default', 'transparent'].indexOf(value) !== -1
      }
    },
    coverage: {
      type: String,
      default: '132px'
    },
    buttons: {
      type: Array,
      default () {
        return []
      }
    },
    searchInput: {
      type: [Object, Boolean],
      default () {
        return false
      }
    }
  },
  data () {
    return {
      focus: false,
      text: '',
      composing: false
    }
  },
  computed: {
    btns () {
      const btns = []
      if (this.buttons.length) {
        this.buttons.forEach(button => {
          let btn = Object.assign({}, button)
          if (btn.fontSrc && !btn.fontFamily) {
            btn.fontSrc = getRealPath(btn.fontSrc)
            const fontFamily = btn.fontSrc.substr(btn.fontSrc.lastIndexOf('/') + 1).replace(/\./g, '-')
            btn.fontFamily = fontFamily
          }
          btn.color = this.type === 'transparent' ? '#fff' : (btn.color || this.textColor)
          btn.fontSize = btn.fontSize || (this.type === 'default' ? '27px' : '22px')
          btn.fontWeight = btn.fontWeight || 'normal'
          btns.push(btn)
        })
      }
      return btns
    }
  },
  mounted () {
    if (this.searchInput) {
      const input = this.$refs.input
      input.$watch('composing', val => {
        this.composing = val
      })
      if (this.searchInput.disabled) {
        input.$on('click', () => {
          UniServiceJSBridge.emit('onNavigationBarSearchInputClicked', '')
        })
      } else {
        input.$refs.input.addEventListener('keyup', event => {
          if (event.key.toUpperCase() === 'ENTER') {
            UniServiceJSBridge.emit('onNavigationBarSearchInputConfirmed', {
              text: this.text
            })
          }
        })
      }
    }
  },
  methods: {
    _back () {
      if (getCurrentPages().length === 1) {
        uni.reLaunch({
          url: '/'
        })
      } else {
        uni.navigateBack({
          from: 'backButton'
        })
      }
    },
    _onBtnClick (index) {
      UniServiceJSBridge.emit('onNavigationBarButtonTap', Object.assign({}, this.btns[index], {
        index
      }))
    },
    _formatBtnFontText (btn) {
      if (btn.fontSrc && btn.fontFamily) {
        const cssText =
          `@font-face{
              font-family: "${btn.fontFamily}";
              src: url("${btn.fontSrc}") format("truetype")
            }`
        appendCss(cssText, 'uni-btn-font-' + btn.fontFamily)
        return btn.text.replace('\\u', '&#x')
      } else if (FONTS[btn.type]) {
        return FONTS[btn.type]
      }
      return btn.text || ''
    },
    _formatBtnStyle (btn) {
      const style = {
        color: btn.color,
        fontSize: btn.fontSize,
        fontWeight: btn.fontWeight
      }
      if (btn.fontFamily) {
        style.fontFamily = btn.fontFamily
      }
      return style
    },
    __focus () {
      this.focus = true
    },
    __blur () {
      this.focus = false
    },
    __input () {
      UniServiceJSBridge.emit('onNavigationBarSearchInputChanged', {
        text: this.text
      })
    }
  }
}
</script>
