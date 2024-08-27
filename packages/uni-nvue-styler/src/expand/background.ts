import { type TransformDecl, createDecl } from '../utils'

const backgroundColor = __NODE_JS__ ? 'background-color' : 'backgroundColor'
const backgroundImage = __NODE_JS__ ? 'background-image' : 'backgroundImage'

export const transformBackground: TransformDecl = (decl) => {
  const { value, important, raws, source } = decl
  if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
    return [
      createDecl(backgroundImage, '', important, raws, source),
      createDecl(backgroundColor, value, important, raws, source),
    ]
  } else if (/^linear-gradient(.+)$/.test(value)) {
    return [
      createDecl(backgroundImage, value, important, raws, source),
      createDecl(backgroundColor, '', important, raws, source),
    ]
  } else if (value == '') {
    return [
      createDecl(backgroundImage, '', important, raws, source),
      createDecl(backgroundColor, '', important, raws, source),
    ]
  }
  return [decl]
}
