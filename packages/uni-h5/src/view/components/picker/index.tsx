import {
  type ExtractPropTypes,
  type Ref,
  type StyleValue,
  Transition,
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  renderList,
  watch,
  watchEffect,
} from 'vue'
import { isArray } from '@vue/shared'
import {
  type CustomEventTrigger,
  type EmitEvent,
  PickerView,
  PickerViewColumn,
  UniElement,
  type UniFormCtx,
  defineBuiltInComponent,
  uniFormKey,
  useBooleanAttr,
  useCustomEvent,
  withWebEvent,
} from '@dcloudio/uni-components'
import { formatDateTime } from '@dcloudio/uni-shared'
import { usePopupStyle } from '../../../helpers/usePopupStyle'
import { useKeyboard } from '../../../helpers/useKeyboard'
import {
  initI18nPickerMsgsOnce,
  onEventPrevent,
  onEventStop,
  useI18n,
} from '@dcloudio/uni-core'

function getDefaultStartValue(props: Props) {
  if (props.mode === mode.TIME) {
    return '00:00'
  }
  if (props.mode === mode.DATE) {
    const year = new Date().getFullYear() - 150
    switch (props.fields) {
      case fields.YEAR:
        return year.toString()
      case fields.MONTH:
        return year + '-01'
      default:
        return year + '-01-01'
    }
  }
  return ''
}
function getDefaultEndValue(props: Props) {
  if (props.mode === mode.TIME) {
    return '23:59'
  }
  if (props.mode === mode.DATE) {
    const year = new Date().getFullYear() + 150
    switch (props.fields) {
      case fields.YEAR:
        return year.toString()
      case fields.MONTH:
        return year + '-12'
      default:
        return year + '-12-31'
    }
  }
  return ''
}
function getDateValueArray(
  props: Props,
  state: State,
  valueStr?: string,
  defaultValue?: string
): number[] {
  const splitStr = props.mode === mode.DATE ? '-' : ':'
  const array = props.mode === mode.DATE ? state.dateArray : state.timeArray
  let max
  if (props.mode === mode.TIME) {
    max = 2
  } else {
    switch (props.fields) {
      case fields.YEAR:
        max = 1
        break
      case fields.MONTH:
        max = 2
        break
      default:
        max = 3
        break
    }
  }
  const inputArray = String(valueStr).split(splitStr)
  let value: number[] = []
  for (let i = 0; i < max; i++) {
    const val = inputArray[i]
    value.push(array[i].indexOf(val))
  }
  if (value.indexOf(-1) >= 0) {
    value = defaultValue
      ? getDateValueArray(props, state, defaultValue)
      : value.map(() => 0)
  }
  return value
}

const mode = {
  SELECTOR: 'selector',
  MULTISELECTOR: 'multiSelector',
  TIME: 'time',
  DATE: 'date',
  // 暂不支持城市选择
  // REGION: 'region'
}
const fields = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day',
}
const selectorType = {
  PICKER: 'picker',
  SELECT: 'select',
}

const props = {
  name: {
    type: String,
    default: '',
  },
  range: {
    type: Array,
    default() {
      return []
    },
  },
  rangeKey: {
    type: String,
    default: '',
  },
  value: {
    type: [Number, String, Array],
    default: 0,
  },
  mode: {
    type: String,
    default: mode.SELECTOR,
    validator(val: string) {
      return Object.values(mode).includes(val)
    },
  },
  fields: {
    type: String,
    default: '',
  },
  start: {
    type: String,
    default: (props: any) => {
      return getDefaultStartValue(props)
    },
  },
  end: {
    type: String,
    default: (props: any) => {
      return getDefaultEndValue(props)
    },
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
  selectorType: {
    type: String,
    default: '',
  },
}

type HTMLRef = Ref<HTMLElement | null>
type Props = ExtractPropTypes<typeof props>
type TwoDimensionArray = [string[], string[]]
type ThreeDimensionArray = [string[], string[], string[]]
type State = {
  valueSync: undefined | number | string | number[]
  visible: boolean
  contentVisible: boolean
  popover: null | {
    top: number
    left: number
    width: number
    height: number
  }
  valueChangeSource: string
  timeArray: [] | TwoDimensionArray
  dateArray: [] | ThreeDimensionArray
  valueArray: number[]
  oldValueArray: number[]
  isDesktop: boolean
  popupStyle: {
    content: StyleValue
    triangle: StyleValue
  }
}

export class UniPickerElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Picker',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits: ['change', 'cancel', 'columnchange'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-picker',
    class: UniPickerElement,
  },
  //#endif
  setup(props, { emit, slots }) {
    initI18nPickerMsgsOnce()
    const { t } = useI18n()

    const rootRef: HTMLRef = ref(null)
    const pickerRef: HTMLRef = ref(null)
    const selectRef: HTMLRef = ref(null)
    const inputRef: HTMLRef = ref(null)
    const pickerRender = ref(false) // 防止ssr渲染的时候语言报错
    const { state, rangeArray } = usePickerState(props)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const {
      system,
      selectorTypeComputed,
      _show,
      _l10nColumn,
      _l10nItem,
      _input,
      _fixInputPosition,
      _pickerViewChange,

      _cancel,
      _change,

      _resetFormData,
      _getFormData,

      _createTime,
      _createDate,
      _setValueSync,
    } = usePickerMethods(
      props,
      state,
      trigger,
      rootRef,
      pickerRef,
      selectRef,
      inputRef
    )
    usePickerWatch(state, _cancel, _change)
    usePickerForm(_resetFormData, _getFormData)

    _createTime()
    _createDate()
    _setValueSync()

    const popup = usePopupStyle(state)
    watchEffect(() => {
      state.isDesktop = popup.isDesktop.value
      state.popupStyle = popup.popupStyle.value
    })

    onBeforeUnmount(() => {
      pickerRef.value && pickerRef.value.remove()
    })

    onMounted(() => {
      pickerRender.value = true
    })

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniPickerElement
      // TODO
      // Object.defineProperty(rootElement, 'value', {
      //   get() {

      //   },
      //   set(val) {
      //   },
      // })
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      const { visible, contentVisible, valueArray, popupStyle, valueSync } =
        state
      const { rangeKey, mode, start, end } = props
      const booleanAttrs = useBooleanAttr(props, 'disabled')

      return (
        <uni-picker
          ref={rootRef}
          {...booleanAttrs}
          onClick={withWebEvent(_show)}
        >
          {pickerRender.value ? (
            <div
              ref={pickerRef}
              class="uni-picker-container"
              // @ts-expect-error
              class={`uni-${mode}-${selectorTypeComputed.value}`}
              onWheel={onEventPrevent}
              onTouchmove={onEventPrevent}
            >
              <Transition name="uni-fade">
                <div
                  v-show={visible}
                  class="uni-mask uni-picker-mask"
                  onClick={withWebEvent(_cancel)}
                  onMousemove={_fixInputPosition}
                />
              </Transition>
              {!system.value ? (
                <div
                  class={{ 'uni-picker-toggle': visible }}
                  // @ts-expect-error
                  class="uni-picker-custom"
                  style={popupStyle.content}
                >
                  <div class="uni-picker-header" onClick={onEventStop}>
                    <div
                      class="uni-picker-action uni-picker-action-cancel"
                      onClick={withWebEvent(_cancel)}
                    >
                      {t('uni.picker.cancel')}
                    </div>
                    <div
                      class="uni-picker-action uni-picker-action-confirm"
                      onClick={_change}
                    >
                      {t('uni.picker.done')}
                    </div>
                  </div>
                  {contentVisible ? (
                    <PickerView
                      value={_l10nColumn(valueArray)}
                      class="uni-picker-content"
                      // @ts-expect-error
                      onChange={_pickerViewChange}
                    >
                      {renderList(
                        _l10nColumn(rangeArray.value as []),
                        (rangeItem, index0) => (
                          <PickerViewColumn key={index0}>
                            {renderList(rangeItem, (item, index) => (
                              <div key={index} class="uni-picker-item">
                                {typeof item === 'object'
                                  ? item[rangeKey] || ''
                                  : _l10nItem(item, index0)}
                              </div>
                            ))}
                          </PickerViewColumn>
                        )
                      )}
                    </PickerView>
                  ) : null}
                  <div
                    ref={selectRef}
                    class="uni-picker-select"
                    onWheel={onEventStop}
                    onTouchmove={onEventStop}
                  >
                    {renderList(rangeArray.value[0], (item, index) => (
                      <div
                        key={index}
                        class="uni-picker-item"
                        // @ts-expect-error
                        class={{ selected: valueArray[0] === index }}
                        onClick={() => {
                          valueArray[0] = index
                          _change()
                        }}
                      >
                        {typeof item === 'object'
                          ? (item as any)[rangeKey] || ''
                          : item}
                      </div>
                    ))}
                  </div>
                  <div style={popupStyle.triangle} />
                </div>
              ) : null}
            </div>
          ) : null}
          <div>{slots.default && slots.default()}</div>
          {system.value ? (
            <div
              class="uni-picker-system"
              onMousemove={withWebEvent(_fixInputPosition)}
            >
              <input
                class="uni-picker-system_input"
                // @ts-expect-error
                class={system.value}
                ref={inputRef}
                value={valueSync as any}
                type={mode}
                tabindex="-1"
                min={start}
                max={end}
                onChange={($event) => {
                  _input($event)
                  onEventStop($event)
                }}
              />
            </div>
          ) : null}
        </uni-picker>
      )
    }
  },
})

function usePickerState(props: Props) {
  const state: State = reactive({
    valueSync: undefined,
    visible: false,
    contentVisible: false,
    popover: null,
    valueChangeSource: '',
    timeArray: [],
    dateArray: [],
    valueArray: [],
    oldValueArray: [],
    isDesktop: false,
    popupStyle: {
      content: {},
      triangle: {},
    },
  })

  const rangeArray = computed(() => {
    let val = props.range
    switch (props.mode) {
      case mode.SELECTOR:
        return [val]
      case mode.MULTISELECTOR:
        return val
      case mode.TIME:
        return state.timeArray
      case mode.DATE: {
        const dateArray = state.dateArray
        switch (props.fields) {
          case fields.YEAR:
            return [dateArray[0]]
          case fields.MONTH:
            return [dateArray[0], dateArray[1]]
          default:
            return [dateArray[0], dateArray[1], dateArray[2]]
        }
      }
    }
    return []
  })

  return {
    state,
    rangeArray,
  }
}

const getiPadFlag = () =>
  String(navigator.vendor).indexOf('Apple') === 0 &&
  navigator.maxTouchPoints > 0
function useIsiPad() {
  const isiPad = ref(false)

  if (__NODE_JS__) {
    onMounted(() => (isiPad.value = getiPadFlag()))
  } else {
    isiPad.value = getiPadFlag()
  }

  return isiPad
}

const getSystem = () => {
  if (/win|mac/i.test(navigator.platform)) {
    if (navigator.vendor === 'Google Inc.') {
      return 'chrome'
    } else if (/Firefox/.test(navigator.userAgent)) {
      return 'firefox'
    }
  }
  return ''
}
function useSystem() {
  const _system = ref('')

  if (__NODE_JS__) {
    onMounted(() => (_system.value = getSystem()))
  } else {
    _system.value = getSystem()
  }

  return _system
}

let __contentVisibleDelay: ReturnType<typeof setTimeout>
function usePickerMethods(
  props: Props,
  state: State,
  trigger: CustomEventTrigger,
  rootRef: HTMLRef,
  pickerRef: HTMLRef,
  selectRef: HTMLRef,
  inputRef: HTMLRef
) {
  const isiPad = useIsiPad()
  const _system = useSystem()

  const selectorTypeComputed = computed(() => {
    const type = props.selectorType
    if (Object.values(selectorType).includes(type)) {
      return type
    }

    return isiPad.value ? selectorType.PICKER : selectorType.SELECT
  })
  const system = computed(() => {
    if (
      props.mode === mode.DATE &&
      !Object.values(fields).includes(props.fields) &&
      state.isDesktop
    ) {
      return _system.value
    }
    return ''
  })
  const startArray = computed(() => {
    return getDateValueArray(
      props,
      state,
      props.start,
      getDefaultStartValue(props)
    )
  })
  const endArray = computed(() => {
    return getDateValueArray(props, state, props.end, getDefaultEndValue(props))
  })

  function _show(event: MouseEvent) {
    if (props.disabled) {
      return
    }
    state.valueChangeSource = ''
    let $picker = pickerRef.value!
    let _currentTarget = event.currentTarget as HTMLElement
    $picker.remove()
    ;(document.querySelector('uni-app') || document.body).appendChild($picker)
    $picker.style.display = 'block'
    const rect = _currentTarget.getBoundingClientRect()
    state.popover = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }
    setTimeout(() => {
      state.visible = true
    }, 20)
  }
  function _getFormData() {
    return {
      value: state.valueSync,
      key: props.name,
    }
  }
  function _resetFormData() {
    switch (props.mode) {
      case mode.SELECTOR:
        state.valueSync = 0
        break
      case mode.MULTISELECTOR:
        state.valueSync = (props.value as []).map((val) => 0)
        break
      case mode.DATE:
      case mode.TIME:
        state.valueSync = ''
        break
      default:
        break
    }
  }
  function _createTime() {
    let hours: string[] = []
    let minutes: string[] = []
    for (let i = 0; i < 24; i++) {
      hours.push((i < 10 ? '0' : '') + i)
    }
    for (let i = 0; i < 60; i++) {
      minutes.push((i < 10 ? '0' : '') + i)
    }
    ;(state.timeArray as TwoDimensionArray).push(hours, minutes)
  }
  function getYearStartEnd() {
    let year = new Date().getFullYear()
    let start = year - 150
    let end = year + 150
    if (props.start) {
      const _year = new Date(props.start).getFullYear()
      if (!isNaN(_year) && _year < start) {
        start = _year
      }
    }
    if (props.end) {
      const _year = new Date(props.end).getFullYear()
      if (!isNaN(_year) && _year > end) {
        end = _year
      }
    }

    return {
      start,
      end,
    }
  }
  function _createDate() {
    let years: string[] = []

    const year = getYearStartEnd()
    for (let i = year.start, end = year.end; i <= end; i++) {
      years.push(String(i))
    }
    let months: string[] = []
    for (let i = 1; i <= 12; i++) {
      months.push((i < 10 ? '0' : '') + i)
    }
    let days: string[] = []
    for (let i = 1; i <= 31; i++) {
      days.push((i < 10 ? '0' : '') + i)
    }
    ;(state.dateArray as ThreeDimensionArray).push(years, months, days)
  }
  function _getTimeValue(val: number[]) {
    return val[0] * 60 + val[1]
  }
  function _getDateValue(val: number[]) {
    const DAY = 31
    return val[0] * DAY * 12 + (val[1] || 0) * DAY + (val[2] || 0)
  }
  /**
   * 将右侧数组值同步到左侧（交集部分）
   */
  function _cloneArray(val1: number[], val2: number[]) {
    for (let i = 0; i < val1.length && i < val2.length; i++) {
      val1[i] = val2[i]
    }
  }
  function _setValueSync() {
    let val = props.value
    switch (props.mode) {
      case mode.MULTISELECTOR:
        {
          if (!isArray(val)) {
            val = state.valueArray
          }
          if (!isArray(state.valueSync)) {
            state.valueSync = []
          }
          const length = (state.valueSync.length = Math.max(
            val.length,
            props.range.length
          ))
          for (let index = 0; index < length; index++) {
            const val0 = Number(val[index])
            const val1 = Number(state.valueSync[index])
            const val2 = isNaN(val0) ? (isNaN(val1) ? 0 : val1) : val0
            const maxVal = props.range[index]
              ? (props.range[index] as []).length - 1
              : 0
            state.valueSync.splice(
              index,
              1,
              val2 < 0 || val2 > maxVal ? 0 : val2
            )
          }
        }
        break
      case mode.TIME:
      case mode.DATE:
        state.valueSync = String(val)
        break
      default: {
        const valueSync = Number(val)
        state.valueSync = valueSync < 0 ? 0 : valueSync
        break
      }
    }
  }
  function _setValueArray() {
    let val = state.valueSync
    let valueArray
    switch (props.mode) {
      case mode.MULTISELECTOR:
        valueArray = [...(val as number[])]
        break
      case mode.TIME:
        valueArray = getDateValueArray(
          props,
          state,
          val as string,
          formatDateTime({
            mode: mode.TIME,
          })
        )
        break
      case mode.DATE:
        valueArray = getDateValueArray(
          props,
          state,
          val as string,
          formatDateTime({
            mode: mode.DATE,
          })
        )
        break
      default:
        valueArray = [val]
        break
    }
    state.oldValueArray = [...valueArray] as number[]
    state.valueArray = [...valueArray] as number[]
  }
  function _getValue() {
    let val = state.valueArray
    switch (props.mode) {
      case mode.SELECTOR:
        return val[0]
      case mode.MULTISELECTOR:
        return val.map((val) => val)
      case mode.TIME:
        return state.valueArray
          .map((val, i) => state.timeArray[i][val])
          .join(':')
      case mode.DATE:
        return state.valueArray
          .map((val, i) => state.dateArray[i][val])
          .join('-')
    }
  }
  function _change() {
    _close()
    state.valueChangeSource = 'click'
    const value = _getValue()
    state.valueSync = isArray(value) ? value.map((val) => val) : value
    trigger('change', {} as Event, {
      value,
    })
  }
  function _cancel($event?: MouseEvent) {
    if (system.value === 'firefox' && $event) {
      // Firefox 在 input 同位置区域点击无法隐藏控件
      const { top, left, width, height } = state.popover!
      const { pageX, pageY } = $event
      if (
        pageX > left &&
        pageX < left + width &&
        pageY > top &&
        pageY < top + height
      ) {
        return
      }
    }
    _close()
    trigger('cancel', {} as Event, {})
  }
  function _close() {
    state.visible = false
    setTimeout(() => {
      let $picker = pickerRef.value!
      $picker.remove()
      rootRef.value!.prepend($picker)
      $picker.style.display = 'none'
    }, 260)
  }
  function _select() {
    if (
      props.mode === mode.SELECTOR &&
      selectorTypeComputed.value === selectorType.SELECT
    ) {
      selectRef.value!.scrollTop = state.valueArray[0] * 34
    }
  }
  function _input($event: Event) {
    const EventTarget = $event.target as HTMLInputElement
    state.valueSync = EventTarget.value
    nextTick(() => {
      _change()
    })
  }
  function _fixInputPosition($event: MouseEvent) {
    if (system.value === 'chrome') {
      const rect = rootRef.value!.getBoundingClientRect()
      const fontSize = 32
      inputRef.value!.style.left = `${
        $event.clientX - rect.left - fontSize * 1.5
      }px`
      inputRef.value!.style.top = `${
        $event.clientY - rect.top - fontSize * 0.5
      }px`
    }
  }
  function _pickerViewChange(event: { detail: { value: number[] } }) {
    state.valueArray = _l10nColumn(event.detail.value, true)
  }
  function _l10nColumn(array: number[], normalize?: boolean) {
    const { getLocale } = useI18n()
    if (props.mode === mode.DATE) {
      const locale = getLocale()
      if (!locale.startsWith('zh')) {
        switch (props.fields) {
          case fields.YEAR:
            return array
          case fields.MONTH:
            return [array[1], array[0]]
          default:
            switch (locale) {
              case 'es':
              case 'fr':
                return [array[2], array[1], array[0]]
              // case 'en':
              default:
                return normalize
                  ? [array[2], array[0], array[1]]
                  : [array[1], array[2], array[0]]
            }
        }
      }
    }
    return array
  }
  function _l10nItem(item: string | number, index: number) {
    const { getLocale } = useI18n()
    if (props.mode === mode.DATE) {
      const locale = getLocale()
      if (locale.startsWith('zh')) {
        const array = ['年', '月', '日']
        return item + array[index]
      } else if (
        props.fields !== fields.YEAR &&
        index ===
          (props.fields !== fields.MONTH && (locale === 'es' || locale === 'fr')
            ? 1
            : 0)
      ) {
        let array
        switch (locale) {
          case 'es':
            array = [
              'enero',
              'febrero',
              'marzo',
              'abril',
              'mayo',
              'junio',
              '​​julio',
              'agosto',
              'septiembre',
              'octubre',
              'noviembre',
              'diciembre',
            ]
            break
          case 'fr':
            array = [
              'janvier',
              'février',
              'mars',
              'avril',
              'mai',
              'juin',
              'juillet',
              'août',
              'septembre',
              'octobre',
              'novembre',
              'décembre',
            ]
            break
          // case 'en':
          default:
            array = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]
            break
        }
        return array[Number(item) - 1]
      }
    }
    return item
  }

  watch(
    () => state.visible,
    (val) => {
      if (val) {
        clearTimeout(__contentVisibleDelay)
        state.contentVisible = val
        _select()
      } else {
        __contentVisibleDelay = setTimeout(() => {
          state.contentVisible = val
        }, 300)
      }
    }
  )
  watch(
    [() => props.mode, () => props.value, () => props.range],
    _setValueSync,
    { deep: true }
  )
  watch(() => state.valueSync, _setValueArray, { deep: true })
  watch(
    () => state.valueArray,
    (val) => {
      if (props.mode === mode.TIME || props.mode === mode.DATE) {
        const getValue =
          props.mode === mode.TIME ? _getTimeValue : _getDateValue
        const valueArray = state.valueArray
        const _startArray = startArray.value
        const _endArray = endArray.value
        if (props.mode === mode.DATE) {
          const dateArray = state.dateArray as ThreeDimensionArray
          const max = dateArray[2].length
          const day = Number(dateArray[2][valueArray[2]]) || 1
          const realDay = new Date(
            `${dateArray[0][valueArray[0]]}/${
              dateArray[1][valueArray[1]]
            }/${day}`
          ).getDate()
          if (realDay < day) {
            valueArray[2] -= realDay + max - day
          }
        }
        if (getValue(valueArray) < getValue(_startArray)) {
          _cloneArray(valueArray, _startArray)
        } else if (getValue(valueArray) > getValue(_endArray)) {
          _cloneArray(valueArray, _endArray)
        }
      }
      val.forEach((value, column) => {
        if (value !== state.oldValueArray[column]) {
          state.oldValueArray[column] = value
          if (props.mode === mode.MULTISELECTOR) {
            trigger('columnchange', {} as Event, {
              column,
              value,
            })
          }
        }
      })
    }
  )

  return {
    selectorTypeComputed,
    system,
    _show,
    _cancel,
    _change,
    _l10nColumn,
    _l10nItem,
    _input,
    _resetFormData,
    _getFormData,
    _createTime,
    _createDate,
    _setValueSync,
    _fixInputPosition,
    _pickerViewChange,
  }
}

function usePickerWatch(
  state: State,
  _cancel: () => void,
  _change: () => void
) {
  const { key, disable } = useKeyboard()
  watchEffect(() => {
    disable.value = !state.visible
  })
  watch(key, (value) => {
    if (value === 'esc') {
      _cancel()
    } else if (value === 'enter') {
      _change()
    }
  })
}

function usePickerForm(
  _resetFormData: () => void,
  _getFormData: () => { key: string; value: any }
) {
  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
  if (uniForm) {
    const field = {
      reset: _resetFormData,
      submit: () => {
        const data: [string, any] = ['', null]
        const { key, value } = _getFormData()
        if (key !== '') {
          data[0] = key
          data[1] = value
        }
        return data
      },
    }
    uniForm.addField(field)
    onBeforeUnmount(() => {
      uniForm.removeField(field)
    })
  }
}
