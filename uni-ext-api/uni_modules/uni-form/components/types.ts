export type ActivatableChild = {
  id?: string,
  activate: (event: UniPointerEvent) => void,
  getDisabled?: () => boolean
}

export type LabelContext = {
  register: (child: ActivatableChild) => void
  unregister: (id?: string) => void
}

export type CheckboxGroupContext = {
  register: (value: string, checked: boolean, setChecked: (checked: boolean) => void) => void
  unregister: (value: string) => void
  toggle: (value: string, checked: boolean, emitChange: boolean) => void
  isChecked: (value: string) => boolean
  name: string
}

export type FormField = {
  name: string
  getValue: () => any
  reset?: () => void
}

export type FormContext = {
  registerField: (field: FormField) => void
  unregisterField: (name: string) => void
  submit: () => void
  reset: () => void
}

export type PickerViewColumnApi = {
  setScrollTop : (idx : number) => void,
  getIndex : () => number
}

export type PickerViewContext = {
  itemHeight: () => number,
  containerPaddingPx: () => string,
  registerColumn: (api: PickerViewColumnApi) => number,
  unregisterColumn: (api: PickerViewColumnApi) => void,
  onColumnIndexChange: (col: number, index: number) => void,
  maskClass: () => string,
  maskTopStyle: () => any,
  maskBottomStyle: () => any,
  indicatorStyle: () => any,
}