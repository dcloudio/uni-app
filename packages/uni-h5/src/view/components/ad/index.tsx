import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { adProps, useAd } from './useAd'

export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'Ad',
  props: adProps,
  setup(props, { emit, slots }) {
    const { rootRef, customTuiaVisible, $excludeAttrs, $listeners, ad } = useAd(
      props,
      emit,
      () => Boolean(slots.default && slots.default().length)
    )
    return () => {
      const { adpid, adpidWidescreen, widescreenWidth } = props
      return (
        <>
          <uni-ad
            {...$listeners.value}
            {...$excludeAttrs.value}
            adpid={adpid}
            adpidWidescreen={adpidWidescreen}
            widescreenWidth={widescreenWidth}
          >
            <div
              ref={rootRef}
              class="uni-ad-container"
              onClick={() => ad.report(41)}
            />
            {customTuiaVisible.value && slots.default ? (
              <div
                class="uni-ad-custom-material"
                onClick={() => ad.renderTuiaFromCustomMaterial()}
              >
                {slots.default()}
              </div>
            ) : null}
          </uni-ad>
        </>
      )
    }
  },
})
