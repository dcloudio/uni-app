import {
  PropType,
  ExtractPropTypes,
  ComponentInternalInstance,
  WritableComputedRef,
} from 'vue'

export const props = {
  value: {
    type: Array as PropType<number[]>,
    default() {
      return []
    },
    validator: function (val: any) {
      return (
        Array.isArray(val) &&
        val.filter((val) => typeof val === 'number').length === val.length
      )
    },
  },
  indicatorStyle: {
    type: String,
    default: '',
  },
  indicatorClass: {
    type: String,
    default: '',
  },
  maskStyle: {
    type: String,
    default: '',
  },
  maskClass: {
    type: String,
    default: '',
  },
}

export type Props = ExtractPropTypes<typeof props>

export type GetPickerViewColumn = (
  columnInstance: ComponentInternalInstance
) => WritableComputedRef<number>
