import { WritableComputedRef, ExtractPropTypes } from 'vue'
import { PolySymbol } from '@dcloudio/uni-core'

export const uniRadioGroupKey = PolySymbol(__DEV__ ? 'uniRadioGroup' : 'ucg')

export type UniRadioGroupFieldCtx = WritableComputedRef<{
  radioChecked: boolean
  value: string
}>

export interface UniRadioGroupCtx {
  addField: (field: UniRadioGroupFieldCtx) => void
  removeField: (field: UniRadioGroupFieldCtx) => void
  radioChange: ($event: Event, field: UniRadioGroupFieldCtx) => void
}

export const radioGroupProps = {
  name: {
    type: String,
    default: '',
  },
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
