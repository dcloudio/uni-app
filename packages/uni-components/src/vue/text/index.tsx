import {
  VNode,
  Component,
  createTextVNode,
  createVNode,
  Comment,
  ref,
  onMounted,
} from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { DecodeOptions, parseText } from '../../helpers/text'

class UniTextElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Text',
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-text',
    class: UniTextElement,
  },
  //#endif
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
    const rootRef = ref<HTMLElement | null>(null)
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniTextElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const children: VNode[] = []
      if (slots.default) {
        slots.default().forEach((vnode) => {
          if (
            vnode.shapeFlag & 8 /* TEXT_CHILDREN */ &&
            vnode.type !== Comment
          ) {
            const lines = parseText(vnode.children as string, {
              space: props.space as DecodeOptions['space'],
              decode: props.decode as boolean,
            })
            const len = lines.length - 1
            lines.forEach((line, index) => {
              if (index === 0 && !line) {
                // 临时方案解决(<text>\n横向布局</text>) Hydration node mismatch
              } else {
                children.push(createTextVNode(line))
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
        <uni-text ref={rootRef} selectable={props.selectable ? true : null}>
          {createVNode('span', null, children)}
        </uni-text>
      )
    }
  },
})
