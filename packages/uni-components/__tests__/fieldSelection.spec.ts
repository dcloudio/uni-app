import { effectScope, nextTick, reactive, ref } from 'vue'
import {
  fieldSelectionProbeStyle,
  useFieldSelection,
} from '../src/helpers/useFieldSelection'

describe('Web field selection colors', () => {
  const scopes: ReturnType<typeof effectScope>[] = []
  const globals = new Map<string, unknown>()
  let dom: any
  const frames = new Map<number, FrameRequestCallback>()
  let nextFrame = 0
  beforeAll(() => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>')
    for (const name of [
      'window',
      'document',
      'MutationObserver',
      'getComputedStyle',
      'requestAnimationFrame',
      'cancelAnimationFrame',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })
  beforeEach(() => {
    frames.clear()
    global.requestAnimationFrame = jest.fn((callback) => {
      frames.set(++nextFrame, callback)
      return nextFrame
    })
    global.cancelAnimationFrame = jest.fn((id) => frames.delete(id))
    document.head.innerHTML = ''
    document.documentElement.removeAttribute('data-theme')
    document.body.innerHTML = ''
  })
  afterEach(() => scopes.splice(0).forEach((scope) => scope.stop()))

  async function flushSelectionFrame() {
    await nextTick()
    const callbacks = Array.from(frames.values())
    frames.clear()
    callbacks.forEach((callback) => callback(0))
    await nextTick()
  }

  function createSelection(
    className = 'selected',
    focus = true,
    tag: 'input' | 'textarea' = 'input'
  ) {
    const props = reactive({ selectionClass: className })
    const field = document.createElement(tag)
    const probe = document.createElement('div')
    probe.className = 'uni-field-selection-probe'
    probe.style.backgroundColor = 'rgb(18, 52, 86)'
    document.body.append(field, probe)
    const fieldRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(field)
    const scope = effectScope()
    scopes.push(scope)
    const probeRef = scope.run(() => useFieldSelection(props, fieldRef))!
    probeRef.value = probe
    if (focus) field.focus()
    return { props, field, fieldRef, probe, scope }
  }

  test.each(['input', 'textarea'] as const)(
    'applies %s selection color without changing the field background',
    async (tag) => {
      const { field } = createSelection('selected', true, tag)
      await nextTick()
      expect(
        field.style.getPropertyValue('--uni-selection-background-color')
      ).toBe('rgb(18, 52, 86)')
      expect(field.style.backgroundColor).toBe('')
    }
  )

  test.each(['input', 'textarea'] as const)(
    'switches scoped selection classes on a focused %s and restores defaults',
    async (tag) => {
      const style = document.createElement('style')
      style.textContent =
        '.first[data-v-selection] { background-color: blue }' +
        '.second[data-v-selection] { background-color: red }'
      document.head.append(style)
      const { props, field, probe } = createSelection('first', true, tag)
      probe.style.backgroundColor = ''
      probe.className = 'uni-field-selection-probe first'
      probe.setAttribute('data-v-selection', '')
      field.style.caretColor = 'rgb(0, 122, 255)'
      await nextTick()
      expect(
        field.style.getPropertyValue('--uni-selection-background-color')
      ).toBe('blue')

      props.selectionClass = 'second'
      probe.className = 'uni-field-selection-probe second'
      await nextTick()
      expect(
        field.style.getPropertyValue('--uni-selection-background-color')
      ).toBe('red')
      expect(frames.size).toBe(1)

      props.selectionClass = 'no-background'
      probe.className = 'uni-field-selection-probe no-background'
      await nextTick()
      expect(field.hasAttribute('data-uni-selection')).toBe(false)
      expect(
        field.style.getPropertyValue('--uni-selection-background-color')
      ).toBe('')
      expect(field.style.caretColor).toBe('rgb(0, 122, 255)')

      props.selectionClass = ''
      await nextTick()
      expect(frames.size).toBe(0)
    }
  )

  test('tracks CSS changes, field replacement and class removal', async () => {
    const { props, field, fieldRef, probe } = createSelection()
    await nextTick()
    probe.style.backgroundColor = 'rgb(255, 0, 0)'
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('rgb(255, 0, 0)')
    const textarea = document.createElement('textarea')
    document.body.append(textarea)
    fieldRef.value = textarea
    textarea.focus()
    await nextTick()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('')
    expect(
      textarea.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('rgb(255, 0, 0)')
    props.selectionClass = ''
    await nextTick()
    expect(
      textarea.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('')
    expect(frames.size).toBe(0)
    textarea.blur()
    textarea.focus()
    expect(frames.size).toBe(0)
  })

  test('refreshes only the focused editor and cancels work on cleanup', async () => {
    const first = createSelection()
    const second = createSelection('selected', false)
    await nextTick()
    expect(frames.size).toBe(1)
    first.scope.stop()
    expect(
      first.field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('')
    expect(frames.size).toBe(0)
    second.probe.style.backgroundColor = 'rgb(0, 255, 0)'
    second.field.focus()
    expect(
      second.field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('rgb(0, 255, 0)')
    expect(frames.size).toBe(1)
    second.scope.stop()
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(2)
    expect(frames.size).toBe(0)

    const remounted = createSelection()
    await nextTick()
    expect(frames.size).toBe(1)
    expect(
      remounted.field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('rgb(18, 52, 86)')
  })

  test('does not read styles or schedule frames for idle editors', async () => {
    const computedStyle = jest.spyOn(global, 'getComputedStyle')
    try {
      for (let i = 0; i < 100; i++) createSelection('selected', false)
      await nextTick()
      for (let i = 0; i < 60; i++) await flushSelectionFrame()
      expect(document.activeElement).toBe(document.body)
      expect(computedStyle).not.toHaveBeenCalled()
      expect(requestAnimationFrame).not.toHaveBeenCalled()
      expect(frames.size).toBe(0)
    } finally {
      computedStyle.mockRestore()
    }
  })

  test('synchronizes immediately on focus and stops reading styles after blur', async () => {
    const editors = Array.from({ length: 100 }, () =>
      createSelection('selected', false)
    )
    await nextTick()
    const computedStyle = jest.spyOn(global, 'getComputedStyle')
    try {
      const { field, probe } = editors[0]
      field.focus()
      expect(
        field.style.getPropertyValue('--uni-selection-background-color')
      ).toBe('rgb(18, 52, 86)')
      expect(frames.size).toBe(1)
      computedStyle.mockClear()
      for (let i = 0; i < 60; i++) await flushSelectionFrame()
      expect(computedStyle).toHaveBeenCalledTimes(60)
      expect(computedStyle.mock.calls.every(([node]) => node === probe)).toBe(
        true
      )

      field.blur()
      computedStyle.mockClear()
      probe.style.backgroundColor = 'rgb(255, 0, 0)'
      for (let i = 0; i < 60; i++) await flushSelectionFrame()
      expect(computedStyle).not.toHaveBeenCalled()
      expect(frames.size).toBe(0)
      field.focus()
      expect(
        field.style.getPropertyValue('--uni-selection-background-color')
      ).toBe('rgb(255, 0, 0)')
    } finally {
      computedStyle.mockRestore()
    }
  })

  test('switches tracking when focus moves between editors', async () => {
    const first = createSelection()
    const second = createSelection('selected', false)
    await nextTick()
    second.field.focus()
    const computedStyle = jest.spyOn(global, 'getComputedStyle')
    try {
      await flushSelectionFrame()
      expect(frames.size).toBe(1)
      expect(computedStyle).toHaveBeenCalledTimes(1)
      expect(computedStyle).toHaveBeenCalledWith(second.probe)
      second.field.blur()
      expect(frames.size).toBe(0)
      first.field.focus()
      expect(frames.size).toBe(1)
    } finally {
      computedStyle.mockRestore()
    }
  })

  test('stops tracking when the active editor is detached', async () => {
    const { field } = createSelection()
    await nextTick()
    expect(frames.size).toBe(1)
    field.remove()
    await flushSelectionFrame()
    expect(frames.size).toBe(0)
    document.body.append(field)
    field.focus()
    expect(frames.size).toBe(1)
  })

  test('does not start tracking without a selection class', async () => {
    createSelection('')
    await nextTick()
    expect(frames.size).toBe(0)
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })

  test('updates selection colors when an ancestor theme attribute changes', async () => {
    const style = document.createElement('style')
    style.textContent =
      '.selected { background-color: blue } [data-theme="dark"] .selected { background-color: red }'
    document.head.append(style)
    const { field, probe } = createSelection()
    probe.style.backgroundColor = ''
    probe.className = 'uni-field-selection-probe selected'
    await nextTick()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('blue')

    document.documentElement.setAttribute('data-theme', 'dark')
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('red')
  })

  test('updates colors after stylesheets are inserted, edited and removed', async () => {
    const base = document.createElement('style')
    base.textContent = '.selected { background-color: blue }'
    document.head.append(base)
    const { field, probe } = createSelection()
    probe.style.backgroundColor = ''
    probe.className = 'uni-field-selection-probe selected'
    await nextTick()

    const style = document.createElement('style')
    style.textContent = '.selected { background-color: red }'
    const container = document.createElement('div')
    container.append(style)
    document.head.append(container)
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('red')

    style.firstChild!.nodeValue = '.selected { background-color: green }'
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('green')

    style.textContent = '.selected { background-color: yellow }'
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('yellow')

    container.remove()
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('blue')
  })

  test('keeps native selection highlighting when no background color is active', async () => {
    const { field, probe } = createSelection()
    probe.style.backgroundColor = ''
    await nextTick()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('')
    expect(field.hasAttribute('data-uni-selection')).toBe(false)

    probe.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('rgba(255, 0, 0, 0.5)')
    expect(field.hasAttribute('data-uni-selection')).toBe(true)

    probe.style.backgroundColor = ''
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('')
    expect(field.hasAttribute('data-uni-selection')).toBe(false)
  })

  test.each(['input', 'textarea'] as const)(
    'keeps explicit transparent selection colors on %s and restores defaults on removal',
    async (tag) => {
      const { props, field, probe } = createSelection('selected', true, tag)
      for (const color of [
        'transparent',
        'rgba(0, 0, 0, 0)',
        'rgba(255, 0, 0, 0)',
      ]) {
        probe.style.backgroundColor = color
        await flushSelectionFrame()
        expect(field.hasAttribute('data-uni-selection')).toBe(true)
        expect(
          field.style.getPropertyValue('--uni-selection-background-color')
        ).toBe(getComputedStyle(probe).backgroundColor)
        expect(
          probe.style.getPropertyValue('--uni-selection-probe-background-color')
        ).toBe('')
      }
      probe.style.backgroundColor = ''
      await flushSelectionFrame()
      expect(field.hasAttribute('data-uni-selection')).toBe(false)
      props.selectionClass = ''
      await nextTick()
      expect(frames.size).toBe(0)
    }
  )

  test('tracks CSSOM rule insertion, declaration changes and deletion', async () => {
    const style = document.createElement('style')
    style.textContent = '.selected { background-color: blue }'
    document.head.append(style)
    const { field, probe } = createSelection()
    probe.style.backgroundColor = ''
    probe.className = 'uni-field-selection-probe selected'
    await nextTick()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('blue')

    const sheet = style.sheet!
    sheet.insertRule('.selected { background-color: red }', 1)
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('red')

    const rule = sheet.cssRules[1] as CSSStyleRule
    rule.style.setProperty('background-color', 'green')
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('green')

    rule.style.cssText = 'background-color: yellow'
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('yellow')

    sheet.deleteRule(1)
    await flushSelectionFrame()
    expect(
      field.style.getPropertyValue('--uni-selection-background-color')
    ).toBe('blue')
  })

  test('hides the color probe without losing its computed background', () => {
    const style = document.createElement('style')
    style.textContent =
      '.selected { display: block !important; background-color: red; padding: 20px; border: 2px solid blue; min-width: 80px }'
    document.head.append(style)
    const probe = document.createElement('div')
    probe.className = 'uni-field-selection-probe selected'
    probe.style.cssText = fieldSelectionProbeStyle
    document.body.append(probe)
    const computed = getComputedStyle(probe)
    expect(computed.display).toBe('none')
    expect(computed.backgroundColor).toBe('red')
  })
})
