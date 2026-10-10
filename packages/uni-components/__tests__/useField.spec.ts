global.__PLATFORM__ = 'h5'
global.__APP_VIEW__ = false
global.__X__ = true
import { props as fieldProps, useField } from '../src/helpers/useField'

import { effectScope, nextTick, reactive, ref } from 'vue'

jest.mock('../src/helpers/useKeyboard', () => ({
  useKeyboard: jest.fn(),
  props: {},
  emit: [],
}))

jest.mock('../src/helpers/useEvent', () => ({
  useCustomEvent: () => jest.fn(),
}))

jest.mock('vue', () => {
  return {
    // eslint-disable-next-line
    ...jest.requireActual('vue'),
    onMounted: jest.fn(),
    onBeforeUnmount: jest.fn(),
    onBeforeMount: jest.fn(),
  }
})

jest.mock('../src/helpers/useFormField', () => {
  return {
    useFormField: jest.fn(() => {}),
  }
})

jest.mock('@dcloudio/uni-core', () => {
  return {
    getCurrentPageId: jest.fn(() => {
      return 1
    }),
    registerViewMethod: jest.fn(() => {}),
  }
})

describe('test: helpers/useField.ts', () => {
  const scopes: ReturnType<typeof effectScope>[] = []

  function createField(overrides: Record<string, unknown>) {
    const props = reactive({
      ...Object.fromEntries(
        Object.entries(fieldProps).map(([key, prop]) => [
          key,
          (prop as { default?: unknown }).default,
        ])
      ),
      ...overrides,
    }) as Parameters<typeof useField>[0]
    const scope = effectScope()
    scopes.push(scope)
    const field = scope.run(() => useField(props, ref(null), jest.fn()))!
    return { props, ...field }
  }

  afterEach(() => {
    scopes.splice(0).forEach((scope) => scope.stop())
    global.__X__ = true
  })

  test.each([false, true])('dynamic maxlength (__X__=%s)', async (isX) => {
    global.__X__ = isX
    const { props, state } = createField({ value: '12345', maxlength: 5 })
    props.maxlength = -1
    await nextTick()
    expect(state.value).toBe('12345')

    props.maxlength = -0.5
    await nextTick()
    expect(state.value).toBe('12345')

    props.maxlength = 3
    await nextTick()
    expect(state.value).toBe('123')

    props.maxlength = 0
    await nextTick()
    expect(state.value).toBe('')
  })

  test.each([
    'email',
    'number',
    'text',
    'search',
    'password',
    'tel',
    'textarea',
  ])('cursor and selection for %s', async (type) => {
    const supported = type !== 'email' && type !== 'number'
    const handlers: Record<string, Function> = {}
    let start: number | null = supported ? 0 : null
    let end: number | null = supported ? 0 : null
    const input = {
      type,
      addEventListener: (name: string, handler: Function) => {
        handlers[name] = handler
      },
      get selectionStart() {
        return start
      },
      set selectionStart(value: number | null) {
        if (!supported) throw new Error('InvalidStateError')
        start = value
      },
      get selectionEnd() {
        return end
      },
      set selectionEnd(value: number | null) {
        if (!supported) throw new Error('InvalidStateError')
        end = value
      },
    }
    const { props, fieldRef } = createField({ type, cursor: 2 })
    fieldRef.value = input as unknown as HTMLInputElement
    await nextTick()
    expect(() => handlers.focus({})).not.toThrow()
    expect(start).toBe(supported ? 2 : null)
    expect(end).toBe(supported ? 2 : null)

    props.selectionStart = 1
    props.selectionEnd = 3
    await nextTick()
    expect(start).toBe(supported ? 1 : null)
    expect(end).toBe(supported ? 3 : null)
  })

  it('test useBase', () => {
    expect(useField).toBeDefined()

    const mockProps = {
      name: '',
      modelValue: '',
      value: '禁用',
      disabled: true,
      autoFocus: false,
      focus: false,
      cursor: 0,
      selectionStart: 0,
      selectionEnd: 0,
      type: 'text',
      password: false,
      placeholder: '',
      placeholderStyle: '',
      placeholderClass: '',
      maxlength: 140,
      confirmType: 'return',
      confirmHold: false,
      ignoreCompositionEvent: true,
      step: '0.000000000000000001',
      cursorColor: '',
      cursorSpacing: 0,
      showConfirmBar: 'auto',
      adjustPosition: true,
      autoBlur: false,
      autoHeight: false,
    }
    const mockRef = ref(null)
    const mockEmit = jest.fn()

    // blank modelValue > value
    mockProps.modelValue = ''
    mockProps.value = '禁用'
    const { state } = useField(mockProps, mockRef, mockEmit)
    expect(state.value).toBe('')

    // blank modelValue > value
    mockProps.modelValue = '禁用1'
    mockProps.value = ''
    const { state: state0 } = useField(mockProps, mockRef, mockEmit)
    expect(state0.value).toBe('禁用1')

    // normal modelValue > value
    mockProps.modelValue = '禁用2'
    mockProps.value = '禁用'
    const { state: state1 } = useField(mockProps, mockRef, mockEmit)
    expect(state1.value).toBe('禁用2')

    // set modelValue not set value
    // @ts-expect-error
    mockProps.value = undefined
    mockProps.modelValue = '禁用3'
    const { state: state3 } = useField(mockProps, mockRef, mockEmit)
    expect(state3.value).toBe('禁用3')

    // not set modeValue,set value
    mockProps.value = '禁用4'
    // @ts-expect-error
    mockProps.modelValue = undefined
    const { state: state4 } = useField(mockProps, mockRef, mockEmit)
    expect(state4.value).toBe('禁用4')

    // 不设置
    // @ts-expect-error
    mockProps.value = undefined
    // @ts-expect-error
    mockProps.modelValue = undefined
    const { state: state5 } = useField(mockProps, mockRef, mockEmit)
    expect(state5.value).toBe('')
  })
})
