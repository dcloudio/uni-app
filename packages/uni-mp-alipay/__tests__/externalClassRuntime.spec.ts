import {
  createVueRuntimeOptions,
  getExternalClassProps,
} from '../src/runtime/externalClasses'

describe('mp-alipay: externalClass runtime', () => {
  test('原生保留声明但 Vue 运行时不启用通用 externalClass 归一化', () => {
    const vueOptions = { externalClasses: ['box-class'] }
    const runtimeOptions = createVueRuntimeOptions(
      vueOptions,
      vueOptions.externalClasses
    )

    expect(runtimeOptions).not.toBe(vueOptions)
    expect(runtimeOptions.externalClasses).toBeUndefined()
    expect(vueOptions.externalClasses).toEqual(['box-class'])
    expect(createVueRuntimeOptions(vueOptions, [])).toBe(vueOptions)
  })

  test('从支付宝原生 props 提取 externalClass 真实值', () => {
    expect(
      getExternalClassProps(
        {
          boxClass: '-a-foo -p-foo',
          normalProp: 'normal',
        },
        ['box-class']
      )
    ).toEqual({ boxClass: '-a-foo -p-foo' })
  })

  test('兼容短横线属性名且优先使用 Vue 驼峰属性名', () => {
    expect(
      getExternalClassProps(
        {
          'box-class': '-p-kebab',
          boxClass: '-p-camel',
        },
        ['box-class']
      )
    ).toEqual({ boxClass: '-p-camel' })
    expect(
      getExternalClassProps({ 'box-class': '-p-kebab' }, ['box-class'])
    ).toEqual({ boxClass: '-p-kebab' })
  })

  test('未声明或原生 props 不存在时不补充属性', () => {
    expect(getExternalClassProps({}, ['box-class'])).toEqual({})
    expect(getExternalClassProps({ boxClass: '-p-foo' })).toBeUndefined()
  })
})
