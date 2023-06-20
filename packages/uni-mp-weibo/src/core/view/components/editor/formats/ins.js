export default function (Quill) {
  const Inline = Quill.import('blots/inline')
  class Ins extends Inline { }
  Ins.blotName = 'ins'
  Ins.tagName = 'INS'
  return {
    'formats/ins': Ins
  }
}
