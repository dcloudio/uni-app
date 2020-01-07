export default function (Quill) {
  const { Scope, Attributor } = Quill.import('parchment')
  const config = {
    scope: Scope.BLOCK,
    whitelist: ['left', 'right', 'center', 'justify']
  }
  const AlignStyle = new Attributor.Style('align', 'text-align', config)
  return {
    'formats/align': AlignStyle
  }
}
