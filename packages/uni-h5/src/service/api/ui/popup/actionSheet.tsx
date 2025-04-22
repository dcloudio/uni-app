import {
  type ExtractPropTypes,
  type Ref,
  type SetupContext,
  Transition,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue'
import { usePopupStyle } from '../../../../helpers/usePopupStyle'
import { useKeyboard } from '../../../../helpers/useKeyboard'
import {
  getTheme,
  offThemeChange,
  onThemeChange,
} from '../../../../helpers/theme'
import { initI18nShowActionSheetMsgsOnce, useI18n } from '@dcloudio/uni-core'
import { useTouchtrack } from '@dcloudio/uni-components'
import {
  Friction,
  type Scroller,
  Spring,
  disableScrollBounce,
  initScrollBounce,
  useScroller,
} from '@dcloudio/uni-components'
import { onEventPrevent } from '@dcloudio/uni-core'

type ActionSheetTheme = {
  listItemColor: string
  cancelItemColor: string
}

const ACTION_SHEET_THEME: Record<UniApp.ThemeMode, ActionSheetTheme> = {
  light: {
    listItemColor: '#000000',
    cancelItemColor: '#000000',
  },
  dark: {
    listItemColor: 'rgba(255, 255, 255, 0.8)',
    cancelItemColor: 'rgba(255, 255, 255)',
  },
}

function setActionSheetTheme(
  theme: UniApp.ThemeMode,
  actionSheetTheme: ActionSheetTheme
) {
  const ActionSheetThemeKey: Array<keyof ActionSheetTheme> = [
    'listItemColor',
    'cancelItemColor',
  ]
  ActionSheetThemeKey.forEach((key) => {
    actionSheetTheme[key] = ACTION_SHEET_THEME[theme][key]
  })
}

const props = {
  title: {
    type: String,
    default: '',
  },
  itemList: {
    type: Array,
    default() {
      return []
    },
  },
  itemColor: {
    type: String,
    default: '#000000',
  },
  popover: {
    type: Object,
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
}

export type Props = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineComponent({
  name: 'ActionSheet',
  props,
  emits: ['close'],
  setup(props, { emit }) {
    initI18nShowActionSheetMsgsOnce()
    //#if !_X_
    //@ts-expect-error
    const HEIGHT = ref(260)
    //#endif
    //#if _X_
    //@ts-expect-error
    const HEIGHT = ref(336)
    //#endif
    const contentHeight = ref(0)
    const titleHeight = ref(0)
    const deltaY = ref(0)
    const scrollTop = ref(0)

    const content: Ref<HTMLElement | null> = ref(null)
    const main: Ref<HTMLElement | null> = ref(null)
    const { t } = useI18n()
    const { _close } = useActionSheetLoader(props, emit as SetupContext['emit'])
    const { popupStyle } = usePopupStyle(props, true)

    let scroller: Scroller

    onMounted(() => {
      const {
        scroller: _scroller,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
      } = useScroller(content.value!, {
        enableY: true,
        friction: new Friction(0.0001),
        spring: new Spring(2, 90, 20),
        onScroll: (e) => {
          scrollTop.value = e.target.scrollTop
        },
      })

      scroller = _scroller

      // 模拟滚动使用
      useTouchtrack(
        content.value!,
        (e) => {
          if (_scroller) {
            switch (e.detail.state) {
              case 'start':
                handleTouchStart(e)
                disableScrollBounce({
                  disable: true,
                })
                break
              case 'move':
                handleTouchMove(e)
                break
              case 'end':
              case 'cancel':
                handleTouchEnd(e)
                disableScrollBounce({
                  disable: false,
                })
            }
          }
        },
        true
      )

      initScrollBounce()
    })

    function _handleWheel($event: WheelEvent) {
      const _deltaY = deltaY.value + $event.deltaY
      if (Math.abs(_deltaY) > 10) {
        scrollTop.value += _deltaY / 3
        scrollTop.value =
          scrollTop.value >= contentHeight.value
            ? contentHeight.value
            : scrollTop.value <= 0
            ? 0
            : scrollTop.value
        scroller.scrollTo(scrollTop.value)
      } else {
        deltaY.value = _deltaY
      }
      $event.preventDefault()
    }

    watch(
      () => props.visible,
      () => {
        nextTick(() => {
          // title 占位
          if (props.title) {
            titleHeight.value = (
              document.querySelector('.uni-actionsheet__title') as HTMLElement
            ).offsetHeight
          }
          // 滚动条更新
          scroller.update()
          // 获取contentHeight 滚动时使用
          if (content.value)
            contentHeight.value = content.value.clientHeight - HEIGHT.value
          // 给每一个项添加点击事件
          document
            .querySelectorAll('.uni-actionsheet__cell')
            .forEach((item) => {
              initClick(item as HTMLElement)
            })
        })
      }
    )

    const actionSheetTheme = useOnThemeChange(props)

    return () => {
      return (
        <uni-actionsheet onTouchmove={onEventPrevent}>
          <Transition name="uni-fade">
            <div
              v-show={props.visible}
              class="uni-mask uni-actionsheet__mask"
              onClick={() => _close(-1)}
            />
          </Transition>
          <div
            class="uni-actionsheet"
            // @ts-expect-error
            class={{ 'uni-actionsheet_toggle': props.visible }}
            style={popupStyle.value.content}
          >
            <div
              ref={main}
              class="uni-actionsheet__menu"
              onWheel={_handleWheel}
            >
              {/* title占位 */}
              {props.title ? (
                <>
                  <div
                    class="uni-actionsheet__cell"
                    style={{ height: `${titleHeight.value}px` }}
                  />
                  <div class="uni-actionsheet__title">{props.title}</div>
                </>
              ) : (
                ''
              )}
              <div
                style={{ maxHeight: `${HEIGHT.value}px`, overflow: 'hidden' }}
              >
                <div ref={content}>
                  {props.itemList.map((itemTitle, index) => (
                    <div
                      key={index}
                      style={{ color: actionSheetTheme.listItemColor }}
                      class="uni-actionsheet__cell"
                      onClick={() => _close(index)}
                    >
                      {itemTitle}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div class="uni-actionsheet__action">
              <div
                style={{ color: actionSheetTheme.cancelItemColor }}
                class="uni-actionsheet__cell"
                onClick={() => _close(-1)}
              >
                {t('uni.showActionSheet.cancel')}
              </div>
            </div>
            <div style={popupStyle.value.triangle} />
          </div>
        </uni-actionsheet>
      )
    }
  },
})

function useActionSheetLoader(props: Props, emit: SetupContext['emit']) {
  function _close(tapIndex: number) {
    emit('close', tapIndex)
  }

  const { key, disable } = useKeyboard()
  watch(
    () => props.visible,
    (value) => (disable.value = !value)
  )
  watchEffect(() => {
    const { value } = key
    if (value === 'esc') {
      _close && _close(-1)
    }
  })

  return {
    _close,
  }
}

// 由于模拟滚动阻止了点击，使用自定义事件来触发点击事件
function initClick(dom: HTMLElement) {
  const MAX_MOVE = 20
  let x = 0
  let y = 0
  dom.addEventListener('touchstart', (event) => {
    const info = event.changedTouches[0]
    x = info.clientX
    y = info.clientY
  })
  dom.addEventListener('touchend', (event) => {
    const info = event.changedTouches[0]
    if (
      Math.abs(info.clientX - x) < MAX_MOVE &&
      Math.abs(info.clientY - y) < MAX_MOVE
    ) {
      const target = event.target as HTMLElement
      const currentTarget = event.currentTarget as HTMLElement
      const customEvent = new CustomEvent('click', {
        bubbles: true,
        cancelable: true,
        target,
        currentTarget,
      } as any)
      ;['screenX', 'screenY', 'clientX', 'clientY', 'pageX', 'pageY'].forEach(
        (key) => {
          ;(customEvent as any)[key] = (info as any)[key]
        }
      )
      event.target!.dispatchEvent(customEvent)
    }
  })
}

function useOnThemeChange(props: Props) {
  const actionSheetTheme = reactive<ActionSheetTheme>({
    listItemColor: '#000',
    cancelItemColor: '#000',
  })
  const _onThemeChange = ({ theme }: { theme: UniApp.ThemeMode }) => {
    setActionSheetTheme(theme, actionSheetTheme)
  }

  watchEffect(() => {
    if (props.visible) {
      actionSheetTheme.listItemColor = actionSheetTheme.cancelItemColor =
        props.itemColor
      // #000 by default in protocols
      if (props.itemColor === '#000') {
        _onThemeChange({ theme: getTheme() })
        onThemeChange(_onThemeChange)
      }
    } else {
      offThemeChange(_onThemeChange)
    }
  })

  return actionSheetTheme
}
