import { defineSystemComponent } from '@dcloudio/uni-components'
import { useI18n, initI18nAsyncMsgsOnce } from '@dcloudio/uni-core'

function reload() {
  window.location.reload()
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'AsyncError',
  setup() {
    initI18nAsyncMsgsOnce()
    const { t } = useI18n()
    return () => (
      <div class="uni-async-error" onClick={reload}>
        {t('uni.async.error')}
      </div>
    )
  },
})
