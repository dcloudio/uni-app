import { forcePatchPropKeys, forcePatchProps } from './constants'

export const forcePatchProp = (el: { nodeName: string }, key: string) => {
  if (forcePatchPropKeys.indexOf(key) > -1) {
    return true
  }
  const keys = forcePatchProps[el.nodeName as keyof typeof forcePatchProps]
  if (keys && keys.indexOf(key) > -1) {
    return true
  }
  return false
}
