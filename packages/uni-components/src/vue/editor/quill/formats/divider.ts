import QuillClass from 'quill'

export default function (Quill: typeof QuillClass) {
  const BlockEmbed = Quill.import('blots/block/embed')
  class Divider extends BlockEmbed {}
  Divider.blotName = 'divider'
  Divider.tagName = 'HR'
  return {
    'formats/divider': Divider,
  }
}
