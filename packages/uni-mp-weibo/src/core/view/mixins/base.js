import getRealPath from 'uni-platform/helpers/get-real-path'
import {
  processEvent
} from 'uni-view/plugins/events'

export default {
  methods: {
    $getRealPath (src) {
      if (__PLATFORM__ === 'mp-weibo' && src.startsWith('Temp')) {
        return `../../${src}`
      }
      return src ? getRealPath(src) : src
    },
    $trigger (name, $event, detail) {
      this.$emit(name, processEvent.call(this, name, $event, detail, this.$el, this.$el))
    }
  }
}
