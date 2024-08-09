import { defineComponent } from 'vue'
defineComponent({
  provide() {
    return {
      msg: 'hello',
    }
  },
})
const __sfc__ = defineComponent({
  inject: {
    str: {
      type: String,
      default: 'str',
    },
  },
  data() {
    return {
      a: '',
    }
  },
  render() {
    this.str
  },
})

export function render(this: InstanceType<typeof __sfc__>) {
  const _ctx = this
  _ctx.str
}
