import {
  PropType,
  ExtractPropTypes,
  ComponentInternalInstance,
  WritableComputedRef,
} from 'vue'
import { isArray } from '@vue/shared'

export const pickerViewProps = {
  value: {
    type: Array as PropType<number[]>,
    default() {
      return []
    },
    validator: function (val: any) {
      return (
        isArray(val) &&
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

export type Props = ExtractPropTypes<typeof pickerViewProps>

export type GetPickerViewColumn = (
  columnInstance: ComponentInternalInstance
) => WritableComputedRef<number>
