export const __sfc__ = defineComponent({
  setup() {
    const propFnResList = ref<string[]>([])
    return createElementVNode(
      Fragment,
      null,
      RenderHelpers.renderList(
        unref(propFnResList),
        (item, index, __index, _cached): any => {
          return createElementVNode(
            'text',
            utsMapOf({
              class: 'click',
              key: index,
            }),
            toDisplayString(item),
            1
          )
        }
      ),
      128
    )
  },
})
