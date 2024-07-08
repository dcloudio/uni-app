global.__PLATFORM__ = 'h5'
global.__APP_VIEW__ = false
global.__X__ = true
import { useField } from '../src/helpers/useField'

import { ref } from 'vue'

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
