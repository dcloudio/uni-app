export default function (Quill) {
  const { Scope, Attributor } = Quill.import('parchment')
  const config = {
    scope: Scope.BLOCK,
    whitelist: ['rtl']
  }
  const DirectionStyle = new Attributor.Style('direction', 'direction', config)
  return {
    'formats/direction': DirectionStyle
  }
}
