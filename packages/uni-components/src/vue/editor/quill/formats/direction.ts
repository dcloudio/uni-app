import type QuillClass from 'quill'

export default function (Quill: typeof QuillClass) {
  const { Scope, Attributor } = Quill.import('parchment')
  const config = {
    scope: Scope.BLOCK,
    whitelist: ['rtl'],
  }
  const DirectionStyle = new Attributor.Style('direction', 'direction', config)
  return {
    'formats/direction': DirectionStyle,
  }
}
