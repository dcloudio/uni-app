import type QuillClass from 'quill'

export default function (Quill: typeof QuillClass) {
  const Inline = Quill.import('blots/inline')
  class Ins extends Inline {}
  Ins.blotName = 'ins'
  Ins.tagName = 'INS'
  return {
    'formats/ins': Ins,
  }
}
