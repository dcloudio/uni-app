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
      type: Number,
      default: 0
    },
    minWidth: {
      type: Number,
      default: 0
    },
    maxWidth: {
      type: Number,
      default: 0
    },
    height: {
      default: 0,
      type: Number
    },
    minHeight: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 0
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
      for (const item in $props) {
        if (item !== ('orientation' || 'animations') && $props[item] > 0) {
          mediaQueryStr.push(`(${this.humpToLine(item)}: ${this[item]}px)`)
        }
        if (item === 'orientation' && $props[item]) {
          mediaQueryStr.push(`(${this.humpToLine(item)}: ${this[item]})`)
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

    humpToLine (name) {
      return name.replace(/([A-Z])/g, '-$1').toLowerCase()
    },

    replaceListener () {
      this.mql.removeListener(this.handleMediaQuery)
      this.mql = window.matchMedia(this.handleMediaQueryStr)
      this.handleMediaQuery(this.mql)
      this.mql.addListener(this.handleMediaQuery)
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
