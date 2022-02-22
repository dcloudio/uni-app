import { extend } from '@vue/shared'
import {
  Ref,
  ref,
  watch,
  ExtractPropTypes,
  defineComponent,
  onBeforeUnmount,
  inject,
} from 'vue'
import { useCustomEvent, EmitEvent } from '../../helpers/useNVueEvent'
import { showPage, Page } from '@dcloudio/uni-core'
import { UniFormCtx, uniFormKey } from '../../components/form'

type Mode = 'selector' | 'multiSelector' | 'time' | 'date'
type Field = 'year' | 'month' | 'day'
const mode: Record<string, Mode> = {
  SELECTOR: 'selector',
  MULTISELECTOR: 'multiSelector',
  TIME: 'time',
  DATE: 'date',
  // 暂不支持城市选择
  // REGION: 'region'
}
const fields: Record<string, Field> = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day',
}

function padLeft(num: number) {
  return num > 9 ? num : `0${num}`
}
function getDate(str: Props['value'], _mode: Mode) {
  str = String(str || '')
  const date = new Date()
  if (_mode === mode.TIME) {
    const strs = str.split(':')
    if (strs.length === 2) {
      date.setHours(parseInt(strs[0]), parseInt(strs[1]))
    }
  } else {
    const strs = str.split('-')
    if (strs.length === 3) {
      date.setFullYear(
        parseInt(strs[0]),
        parseInt(String(parseFloat(strs[1]) - 1)),
        parseInt(strs[2])
      )
    }
  }
  return date
}
function getDefaultStartValue(props: any) {
  if ((props as Props).mode === mode.TIME) {
    return '00:00'
  }
  if ((props as Props).mode === mode.DATE) {
    const year = new Date().getFullYear() - 100
    switch ((props as Props).fields) {
      case fields.YEAR:
        return year
      case fields.MONTH:
        return year + '-01'
      default:
        return year + '-01-01'
    }
  }
  return ''
}
function getDefaultEndValue(props: any) {
  if ((props as Props).mode === mode.TIME) {
    return '23:59'
  }
  if ((props as Props).mode === mode.DATE) {
    const year = new Date().getFullYear() + 100
    switch ((props as Props).fields) {
      case fields.YEAR:
        return year
      case fields.MONTH:
        return year + '-12'
      default:
        return year + '-12-31'
    }
  }
  return ''
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
      return Object.values(mode).indexOf(val as Mode) >= 0
    },
  },
  fields: {
    type: String,
    default: '',
  },
  start: {
    type: String,
    default: getDefaultStartValue,
  },
  end: {
    type: String,
    default: getDefaultEndValue,
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
}
type Props = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineComponent({
  name: 'Picker',
  props,
  emits: ['change', 'cancel', 'columnchange'],
  setup(props, { slots, emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    const valueSync: Ref<Array<number> | number | string | null> = ref(null)
    const page: Ref<Page | null> = ref(null)

    type ShowPickerData = Props & {
      value: typeof valueSync.value
      locale: string
      // messages: {
      //   done: string
      //   cancel: string
      // }
    }
    const _setValueSync = () => {
      let val = props.value
      switch (props.mode) {
        case mode.MULTISELECTOR:
          {
            if (!Array.isArray(val)) {
              val = []
            }
            if (!Array.isArray(valueSync.value)) {
              valueSync.value = []
            }
            const length = (valueSync.value.length = Math.max(
              val.length,
              props.range.length
            ))
            for (let index = 0; index < length; index++) {
              const val0 = Number(val[index])
              const val1 = Number(valueSync.value[index])
              const val2 = isNaN(val0) ? (isNaN(val1) ? 0 : val1) : val0
              valueSync.value.splice(index, 1, val2 < 0 ? 0 : val2)
            }
          }
          break
        case mode.TIME:
        case mode.DATE:
          valueSync.value = String(val)
          break
        default: {
          const _valueSync = Number(val)
          valueSync.value = _valueSync < 0 ? 0 : _valueSync
          break
        }
      }
    }
    const _updatePicker = (data: ShowPickerData) => {
      page.value && page.value.sendMessage(data)
    }
    const _showWeexPicker = (data: ShowPickerData) => {
      let res: { event?: Parameters<typeof emit>[0] } = { event: 'cancel' }
      page.value = showPage({
        url: '__uniapppicker',
        data,
        style: {
          // @ts-expect-error
          titleNView: false,
          animationType: 'none',
          animationDuration: 0,
          background: 'rgba(0,0,0,0)',
          popGesture: 'none',
        },
        onMessage: (message) => {
          const event = message.event
          if (event === 'created') {
            _updatePicker(data)
            return
          }
          if (event === 'columnchange') {
            delete message.event
            trigger(event, message)
            return
          }
          res = message
        },
        onClose: () => {
          page.value = null
          const event = res.event
          delete res.event
          event && trigger(event, res)
        },
      })
    }
    const _showNativePicker = (data: ShowPickerData) => {
      plus.nativeUI[props.mode === mode.TIME ? 'pickTime' : 'pickDate'](
        (res) => {
          const date = res.date
          trigger('change', {
            value:
              props.mode === mode.TIME
                ? `${padLeft(date.getHours())}:${padLeft(date.getMinutes())}`
                : `${date.getFullYear()}-${padLeft(
                    date.getMonth() + 1
                  )}-${padLeft(date.getDate())}`,
          })
        },
        () => {
          trigger('cancel', {})
        },
        props.mode === mode.TIME
          ? {
              time: getDate(props.value, mode.TIME),
            }
          : {
              date: getDate(props.value, mode.DATE),
              minDate: getDate(props.start, mode.DATE),
              maxDate: getDate(props.end, mode.DATE),
            }
      )
    }
    const _showPicker = (data: ShowPickerData) => {
      if (
        (data.mode === mode.TIME || data.mode === mode.DATE) &&
        !data.fields
      ) {
        _showNativePicker(data)
      } else {
        data.fields = Object.values(fields).includes(data.fields as Field)
          ? data.fields
          : fields.DAY
        _showWeexPicker(data)
      }
    }
    const _show = (event: MouseEvent) => {
      if (props.disabled) {
        return
      }
      _showPicker(
        extend({}, props, {
          value: valueSync.value,
          locale: uni.getLocale(),
        })
      )
    }

    const uniForm = inject<UniFormCtx>(
      uniFormKey,
      false as unknown as UniFormCtx
    )
    const formField = {
      submit: (): [string, any] => [props.name, valueSync.value],
      reset: () => {
        switch (props.mode) {
          case mode.SELECTOR:
            valueSync.value = 0
            break
          case mode.MULTISELECTOR:
            Array.isArray(props.value) &&
              (valueSync.value = props.value.map((val) => 0))
            break
          case mode.DATE:
          case mode.TIME:
            valueSync.value = ''
            break
          default:
            break
        }
      },
    }
    if (uniForm) {
      uniForm.addField(formField)
      onBeforeUnmount(() => uniForm.removeField(formField))
    }

    Object.keys(props).forEach((key) => {
      watch(
        () => (props as any)[key],
        (val) => {
          const data = {}
          ;(data as any)[key] = val
          _updatePicker(data as any)
        },
        { deep: true }
      )
    })
    watch(() => props.value, _setValueSync, { deep: true })
    _setValueSync()

    return () => {
      return (
        <uni-picker ref={rootRef} onClick={_show}>
          {slots.default && slots.default()}
        </uni-picker>
      )
    }
  },
})
