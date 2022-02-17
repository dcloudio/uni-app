import { PolySymbol } from '@dcloudio/uni-core'

export const uniFormKey = PolySymbol(__DEV__ ? 'uniForm' : 'uf')

export interface UniFormCtx {
  addField: (field: UniFormFieldCtx) => void
  removeField: (field: UniFormFieldCtx) => void
  submit: (evt: Event) => void
  reset: (evt: Event) => void
}

export interface UniFormFieldCtx {
  submit?: () => [string, any]
  reset?: () => void
}
