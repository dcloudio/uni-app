import divider from './divider'
import ins from './ins'
import align from './align'
import direction from './direction'
import list from './list'
import background from './background'
import box from './box'
import font from './font'
import text from './text'
import image from './image'
import link from './link'

export function register (Quill) {
  const formats = {
    divider,
    ins,
    align,
    direction,
    list,
    background,
    box,
    font,
    text,
    image,
    link
  }
  const options = {}
  Object.values(formats).forEach(value => Object.assign(options, value(Quill)))
  Quill.register(options, true)
}
