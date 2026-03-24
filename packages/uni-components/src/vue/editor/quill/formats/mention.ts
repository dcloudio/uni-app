import type QuillClass from 'quill'

const SupportStyleList = ['color', 'background', 'padding', 'radius']

export default function (Quill: typeof QuillClass) {
  const Embed = Quill.import('blots/embed')
  class MentionBlot extends Embed {
    static create(data: Record<string, string>) {
      const node = super.create() as HTMLElement

      const id = data.id == null ? '' : data.id
      const name = data.name == null ? '' : data.name

      node.setAttribute('contenteditable', 'false')
      node.setAttribute('data-id', id)
      node.setAttribute('data-name', name)

      let style = ''
      SupportStyleList.forEach((item) => {
        let styleName = item
        if (styleName === 'radius') {
          styleName = 'border-radius'
        }
        if (data[item]) {
          style += `${styleName}: ${data[item]};`
        }
      })

      if (style) {
        node.setAttribute('style', style)
      }

      node.innerText = `@${name}`
      return node
    }

    static value(node: HTMLElement) {
      return {
        id: node.dataset.id == null ? '' : node.dataset.id,
        name: node.dataset.name == null ? '' : node.dataset.name,
        color: node.style.color || '',
        background: node.style.background || '',
        padding: node.style.padding || '',
        radius: node.style.borderRadius || '',
      }
    }
  }

  MentionBlot.blotName = 'mention'
  MentionBlot.tagName = 'span'
  MentionBlot.className = 'mention'

  return {
    'formats/mention': MentionBlot,
  }
}
