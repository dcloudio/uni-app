export default function (Quill) {
  const { Scope } = Quill.import('parchment')
  const BackgroundStyle = Quill.import('formats/background')
  const BackgroundColorStyle = new BackgroundStyle.constructor('backgroundColor', 'background-color', {
    scope: Scope.INLINE
  })
  return {
    'formats/backgroundColor': BackgroundColorStyle
  }
}
