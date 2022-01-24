import { createDecl, TransformDecl } from '../utils'

export const transformBackground: TransformDecl = (decl) => {
  const { value, important, raws, source } = decl
  if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
    return [createDecl('background-color', value, important, raws, source)]
  } else if (/^linear-gradient(.+)$/.test(value)) {
    return [createDecl('background-image', value, important, raws, source)]
  }
  return [decl]
}
