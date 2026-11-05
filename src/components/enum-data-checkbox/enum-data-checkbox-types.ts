export type ItemType = {
  value : any
  name?: string
  text?: string
  label?: string
  checked?: boolean
  disabled?: boolean
}

export function createEnumItems(values : string[]) : ItemType[] {
  return values.map((value : string) : ItemType => ({ value, text: value }))
}
