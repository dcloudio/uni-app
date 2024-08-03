import { createElementVNode, defineComponent } from 'vue'

const __sfc__ = defineComponent({
  methods: {
    num() {
      return 1
    },
    str() {
      return ''
    },
    bool() {
      return true
    },
  },
})

function render(this: InstanceType<typeof __sfc__>): any | null {
  const _ctx = this
  return createElementVNode(
    'view',
    utsMapOf({
      num: () => _ctx.num(),
      str: () => _ctx.str(),
      bool: () => _ctx.bool(),
    })
  )
}
