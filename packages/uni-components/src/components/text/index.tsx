import { VNode, Component, createTextVNode, createVNode } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'

const SPACE_UNICODE = {
  ensp: '\u2002',
  emsp: '\u2003',
  nbsp: '\u00a0',
}

interface DecodeOptions {
  space: keyof typeof SPACE_UNICODE
  decode: boolean
}
function normalizeText(text: string, { space, decode }: DecodeOptions) {
  if (space && SPACE_UNICODE[space]) {
    text = text.replace(/ /g, SPACE_UNICODE[space])
  }
  if (!decode) {
    return text
  }
  return text
    .replace(/&nbsp;/g, SPACE_UNICODE.nbsp)
    .replace(/&ensp;/g, SPACE_UNICODE.ensp)
    .replace(/&emsp;/g, SPACE_UNICODE.emsp)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Text',
  props: {
    selectable: {
      type: [Boolean, String],
      default: false,
    },
    space: {
      type: String,
      default: '',
    },
    decode: {
      type: [Boolean, String],
      default: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      const children: VNode[] = []
      if (slots.default) {
        slots.default().forEach((vnode) => {
          if (vnode.shapeFlag & 8 /* TEXT_CHILDREN */) {
            const lines = (vnode.children as string)
              .replace(/\\n/g, '\n')
              .split('\n')
            const len = lines.length - 1
            lines.forEach((text, index) => {
              if (index === 0 && !text) {
                //临时方案解决(<text>\n横向布局</text>) Hydration node mismatch
              } else {
                children.push(
                  createTextVNode(
                    normalizeText(text, {
                      space: props.space as DecodeOptions['space'],
                      decode: props.decode as boolean,
                    })
                  )
                )
              }
              if (index !== len) {
                children.push(createVNode('br'))
              }
            })
          } else {
            if (
              __DEV__ &&
              vnode.shapeFlag & 6 /* COMPONENT */ &&
              (vnode.type as Component).name !== 'Text'
            ) {
              console.warn(
                'Do not nest other components in the text component, as there may be display differences on different platforms.'
              )
            }
            children.push(vnode)
          }
        })
      }
      return (
        <uni-text selectable={props.selectable}>
          {createVNode('span', null, children)}
        </uni-text>
      )
    }
  },
})
