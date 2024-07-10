import { defineBuiltInComponent } from '@dcloudio/uni-components'
// import { initUniCustomEvent } from '../../utils'
import { getCurrentInstance, onMounted, ref } from 'vue'

export class UniObjectElement extends UniElementImpl {
  constructor(data: INodeData, pageNode: PageNode) {
    super(data, pageNode)
  }

  override tagName = 'OBJECT'
  override nodeName = this.tagName
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Object',
  rootElement: {
    name: 'uni-object-element',
    // @ts-expect-error not web element
    class: UniObjectElement,
  },
  props: {},
  emits: ['load'],
  setup(_props, { emit, slots }) {
    const uniObjectElementRef = ref<UniObjectElement>()

    const instance = getCurrentInstance()

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        setTimeout(() => {
          // emit('load', initUniCustomEvent(
          //   uniObjectElementRef.value!,
          //   { id: 999 }
          // ))
          emit('load', { id: 999 })
        }, 5000)
      })
    })

    return () => {
      // mock 5s emit load
      return (
        <uni-object-element ref={uniObjectElementRef}>
          {slots.default?.()}
        </uni-object-element>
      )
    }
  },
})
