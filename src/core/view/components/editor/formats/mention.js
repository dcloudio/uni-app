import { kebabCase } from 'uni-shared'

const SupportStyleList = ['color', 'background', 'padding', 'radius']
const MentionStyleMap = {
  color: 'color',
  background: 'background',
  padding: 'padding',
  radius: 'border-radius'
}

function getMentionStyleValue (node, styleKey) {
  const cssName = MentionStyleMap[styleKey]
  if (!cssName) {
    return ''
  }
  return node.style.getPropertyValue(cssName).trim()
}

export default function (Quill) {
  const Embed = Quill.import('blots/embed')
  class MentionBlot extends Embed {
    static create (data) {
      const node = super.create()

      const id = data.id == null ? '' : data.id
      const name = data.name == null ? '' : data.name

      node.setAttribute('contenteditable', 'false')
      node.setAttribute('data-id', id)
      node.setAttribute('data-name', name)

      let style = ''

      SupportStyleList.forEach(item => {
        const styleName = MentionStyleMap[item] || item
        if (data[item]) {
          style += `${kebabCase(styleName)}: ${data[item]};`
        }
      })

      if (style) {
        node.setAttribute('style', style)
      }

      node.innerText = `@${name}`
      return node
    }

    static value (node) {
      const value = {
        id: node.dataset.id == null ? '' : node.dataset.id,
        name: node.dataset.name == null ? '' : node.dataset.name
      }

      SupportStyleList.forEach(item => {
        const styleValue = getMentionStyleValue(node, item)
        if (styleValue) {
          value[item] = styleValue
        }
      })

      return value
    }
  }

  MentionBlot.blotName = 'mention'
  MentionBlot.tagName = 'span'
  MentionBlot.className = 'mention'

  return {
    'formats/mention': MentionBlot
  }
}
