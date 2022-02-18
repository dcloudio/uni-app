import { ComputedRef, ExtractPropTypes } from 'vue'
import { PolySymbol } from '@dcloudio/uni-core'

export const uniCheckGroupKey = PolySymbol(__DEV__ ? 'uniCheckGroup' : 'ucg')

export type UniCheckGroupFieldCtx = ComputedRef<{
  checkboxChecked: boolean
  value: string
}>

export interface UniCheckGroupCtx {
  addField: (field: UniCheckGroupFieldCtx) => void
  removeField: (field: UniCheckGroupFieldCtx) => void
  checkboxChange: ($event: Event) => void
}

export const checkboxGroupProps = {
  name: {
    type: String,
    default: '',
  },
}

export type CheckBoxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
