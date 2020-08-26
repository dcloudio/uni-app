<template>
  <uni-match-media
    v-show="MediaQueryListRes"
    v-on="$listeners"
  >
    <slot />
  </uni-match-media>
</template>

<script>
export default {
  name: 'MatchMedia',
  props: {
    width: {
      type: [Number, String],
      default: ''
    },
    minWidth: {
      type: [Number, String],
      default: ''
    },
    maxWidth: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    },
    minHeight: {
      type: [Number, String],
      default: ''
    },
    maxHeight: {
      type: [Number, String],
      default: ''
    },
    orientation: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      MediaQueryListRes: true,
      mql: null
    }
  },

  computed: {
    handleMediaQueryStr () {
      let mediaQueryStr = []
      const { $props } = this
      const propsMenu = [
        'width',
        'minWidth',
        'maxWidth',
        'height',
        'minHeight',
        'maxHeight',
        'orientation'
      ]
      for (const item of propsMenu) {
        if (item !== 'orientation' && $props[item] !== '' && Number($props[item]) >= 0) {
          mediaQueryStr.push(`(${this.humpToLine(item)}: ${Number($props[item])}px)`)
        }
        if (item === 'orientation' && $props[item]) {
          mediaQueryStr.push(`(${this.humpToLine(item)}: ${$props[item]})`)
        }
      }
      mediaQueryStr = mediaQueryStr.join(' and ')
      return mediaQueryStr
    }
  },

  watch: {
    handleMediaQueryStr: 'replaceListener'
  },

  mounted () {
    this.mql = window.matchMedia(this.handleMediaQueryStr)
    this.handleMediaQuery(this.mql)
    this.mql.addListener(this.handleMediaQuery)
  },

  beforeDestroy () {
    this.mql.removeListener(this.handleMediaQuery)
  },

  methods: {
    handleMediaQuery (e) {
      if (e.matches) {
        this.MediaQueryListRes = true
      } else {
        this.MediaQueryListRes = false
      }
    },

    replaceListener () {
      this.mql.removeListener(this.handleMediaQuery)
      this.mql = window.matchMedia(this.handleMediaQueryStr)
      this.handleMediaQuery(this.mql)
      this.mql.addListener(this.handleMediaQuery)
    },

    humpToLine (name) {
      return name.replace(/([A-Z])/g, '-$1').toLowerCase()
    }
  }
}
</script>

<style>
  uni-match-media {
    display: block;
  }

  uni-match-media[hidden] {
  display: none;
}
</style>
