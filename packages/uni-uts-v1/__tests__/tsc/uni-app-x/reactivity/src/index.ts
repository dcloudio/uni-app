export const __sfc__ = defineComponent({
  setup() {
    const obj = {} as UTSJSONObject

    const reactiveObj = reactive(obj)
    toRaw<UTSJSONObject>(reactiveObj) === obj

    const readonlyObj = readonly(obj)
    toRaw<UTSJSONObject>(readonlyObj) === obj

    const shallowReactiveObj = shallowReactive(obj)

    toRaw<UTSJSONObject>(shallowReactiveObj) === obj

    const shallowReadonlyObj = shallowReadonly(obj)

    toRaw<UTSJSONObject>(shallowReadonlyObj) === obj

    type Obj1 = {
      num: number
    }
    const obj1 = reactive({
      num: 0,
    } as Obj1)

    toRef(obj1, 'num')
    toRef((): number => obj.num)
  },
})
