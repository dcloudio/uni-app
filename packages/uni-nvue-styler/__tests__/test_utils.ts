export type IValue = {
  type: string
  prop: string
  value: string
  raws?: any
  source?: any
}

export const postionTypes = [
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
]
export const fillBorderPostion = (val: IValue[]): IValue[] => {
  const type = ['width', 'style', 'color']

  const res: IValue[] = []
  val.forEach((item) => {
    const currentProp = type.find((t) => item.prop.endsWith(t))!
    postionTypes.forEach((postion) => {
      res.push({
        ...item,
        type: item.type,
        prop: `${postion}-${currentProp}`,
        value: item.value,
      })
    })
  })
  return res
}
