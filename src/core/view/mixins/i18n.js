import i18n from '@dcloudio/uni-i18n'
import {
  t
} from 'uni-core/helpers/i18n'

export default {
  beforeCreate () {
    const unwatch = i18n.watchLocale(() => {
      this.$forceUpdate()
    })
    this.$once('hook:beforeDestroy', function () {
      unwatch()
    })
  },
  methods: {
    $$t (key, values) {
      return t(key, values)
    }
  }
}
