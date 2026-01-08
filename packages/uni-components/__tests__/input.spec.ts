import { ref } from 'vue'
import { resolveDigitDecimalPoint } from '../src/vue/input/utils'
import type { State } from '../src/helpers/useField'

describe('resolveDigitDecimalPoint', () => {
  afterEach(() => {
    // clear
    mockRemoveEventListener.mockClear()
    mockAddEventListener.mockClear()
  })
  function mockState(value: string): State {
    return {
      value: value || '',
      maxlength: -1,
      focus: false,
      composing: false,
      selectionStart: -1,
      selectionEnd: -1,
      cursor: -1,
    }
  }

  // Mock input 元素
  const mockAddEventListener = jest.fn()
  const mockRemoveEventListener = jest.fn()

  function mockInputElement(value: string) {
    return {
      value: value,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    } as any as HTMLInputElement
  }

  it('输入 123. 然后 blur 后应该小数点消失', () => {
    const cache = ref('123')
    // Note: 在 input number 中输入 123. 然后读取 input.value =123 不会展示小数点，所以这里的数据不会展示 dot
    const state = mockState('123')
    const input = mockInputElement('123')

    const event = { data: '.' } as InputEvent
    const resetCache = { fn: null as (() => void) | null }

    const result = resolveDigitDecimalPoint(
      event,
      cache,
      state,
      input,
      resetCache
    )

    expect(result).toBe(false)

    expect(mockAddEventListener).toHaveBeenCalledTimes(1)
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'blur',
      expect.any(Function)
    )

    // 获取注册的 blur 回调函数
    const blurHandler = mockAddEventListener.mock.calls[0][1]
    blurHandler()

    expect(state.value).toBe('123')

    expect(mockRemoveEventListener).toHaveBeenCalledTimes(1)
    expect(mockRemoveEventListener).toHaveBeenCalledWith('blur', blurHandler)
  })

  it('输入 123 改为 1.23 然后 blur 后应该保持不变', () => {
    // 准备测试数据 - 小数点在中间
    const cache = ref('123')
    const state = mockState('1.23')

    const input = mockInputElement('1.23')

    const event = { data: '.' } as InputEvent
    const resetCache = { fn: null as (() => void) | null }

    // 调用 resolveDigitDecimalPoint
    const result = resolveDigitDecimalPoint(
      event,
      cache,
      state,
      input,
      resetCache
    )

    expect(result).toBeUndefined()
    expect(mockAddEventListener).not.toHaveBeenCalled()

    expect(state.value).toBe('1.23')
  })

  it('输入 123 改为.123 然后 blur 后应该保持不变', () => {
    const cache = ref('123')
    const state = mockState('.123')
    const input = mockInputElement('.123')

    const event = { data: '.' } as InputEvent
    const resetCache = { fn: null as (() => void) | null }

    const result = resolveDigitDecimalPoint(
      event,
      cache,
      state,
      input,
      resetCache
    )

    expect(result).toBeUndefined()
    expect(mockAddEventListener).not.toHaveBeenCalled()

    // 验证最终状态保持不变
    expect(state.value).toBe('.123')
  })
})
