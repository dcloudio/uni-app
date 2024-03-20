import { ref, computed } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Refresher',
  props: {
    refreshState: {
      type: String,
      default: '',
    },
    refresherHeight: {
      type: Number,
      default: 0,
    },
    refresherThreshold: {
      type: Number,
      default: 45,
    },
    refresherDefaultStyle: {
      type: String,
      default: 'black',
    },
    refresherBackground: {
      type: String,
      default: '#fff',
    },
  },
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const rootStyle = computed(() => {
      const style: Record<string, string> = {
        backgroundColor: props.refresherBackground,
      }
      switch (props.refreshState) {
        case 'pulling':
          style.height = props.refresherHeight + 'px'
          break
        case 'refreshing':
          style.height = props.refresherThreshold + 'px'
          style.transition = 'height 0.3s'
          break
        case '':
        case 'refresherabort':
        case 'restore':
          style.height = '0px'
          style.transition = 'height 0.3s'
          break
        default:
          break
      }
      return style
    })
    const refreshRotate = computed(() => {
      const route = props.refresherHeight / props.refresherThreshold
      return (route > 1 ? 1 : route) * 360
    })
    return () => {
      const { refreshState, refresherDefaultStyle, refresherThreshold } = props
      return (
        <div
          ref={rootRef}
          style={rootStyle.value}
          class="uni-scroll-view-refresher"
        >
          {refresherDefaultStyle !== 'none' ? (
            <div class="uni-scroll-view-refresh">
              <div class="uni-scroll-view-refresh-inner">
                {refreshState == 'pulling' ? (
                  <svg
                    key="refresh__icon"
                    style={{
                      transform: 'rotate(' + refreshRotate.value + 'deg)',
                    }}
                    fill="#2BD009"
                    class="uni-scroll-view-refresh__icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                ) : null}
                {refreshState == 'refreshing' ? (
                  <svg
                    key="refresh__spinner"
                    class="uni-scroll-view-refresh__spinner"
                    width="24"
                    height="24"
                    viewBox="25 25 50 50"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      style="color: #2bd009"
                      stroke-width="3"
                    />
                  </svg>
                ) : null}
              </div>
            </div>
          ) : null}
          {refresherDefaultStyle === 'none' ? (
            <div
              class="uni-scroll-view-refresher-container"
              style={{ height: `${refresherThreshold}px` }}
            >
              {slots.default && slots.default()}
            </div>
          ) : null}
        </div>
      )
    }
  },
})
