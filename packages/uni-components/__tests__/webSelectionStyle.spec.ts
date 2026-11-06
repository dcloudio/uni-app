import { effectScope, nextTick, ref } from 'vue'
import { useWebSelectionStyle } from '../src/helpers/useWebSelectionStyle'

describe('Web ::selection styles', () => {
  const globals = new Map<string, unknown>()
  const scopes: ReturnType<typeof effectScope>[] = []
  let selectionStyles = new WeakMap<
    HTMLElement,
    { color?: string; backgroundColor?: string }
  >()
  let dom: any
  let supportsSelectionPseudo = true

  beforeAll(() => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>')
    for (const name of ['window', 'document', 'MutationObserver']) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    globals.set('getComputedStyle', (global as any).getComputedStyle)
    ;(global as any).getComputedStyle = (
      element: HTMLElement,
      pseudoElement?: string
    ) => {
      if (pseudoElement !== '::selection') {
        return dom.window.getComputedStyle(element, pseudoElement)
      }
      const style = selectionStyles.get(element) || {}
      const probing = element.hasAttribute('data-uni-selection-style-probe')
      return {
        color: style.color || (probing ? 'rgb(1, 2, 3)' : 'rgb(0, 0, 0)'),
        backgroundColor:
          style.backgroundColor ||
          (probing ? 'rgb(4, 5, 6)' : 'rgba(0, 0, 0, 0)'),
        getPropertyValue: (name: string) =>
          name === '--uni-selection-style-probe' &&
          probing &&
          supportsSelectionPseudo
            ? '1'
            : '',
      } as CSSStyleDeclaration
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
    selectionStyles = new WeakMap()
    supportsSelectionPseudo = true
    document.head.innerHTML = ''
    document.body.innerHTML = ''
  })
  afterEach(() => scopes.splice(0).forEach((scope) => scope.stop()))

  async function flushMutationObserver() {
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve))
    await nextTick()
  }

  function createSelection() {
    const root = document.createElement('uni-editor')
    document.body.appendChild(root)
    const rootRef = ref<HTMLElement | null>(null)
    const scope = effectScope()
    scopes.push(scope)
    scope.run(() => useWebSelectionStyle(rootRef))
    rootRef.value = root
    return { root, rootRef, scope }
  }

  function getStyleElement() {
    return document.head.querySelector(
      'style[data-uni-selection-style-element]'
    ) as HTMLStyleElement
  }

  test('injects computed ::selection color and background for the current root', async () => {
    const { root } = createSelection()
    selectionStyles.set(root, {
      color: 'rgb(10, 20, 30)',
      backgroundColor: 'rgba(40, 50, 60, 0.5)',
    })
    root.className = 'selected'
    await flushMutationObserver()

    const style = getStyleElement()
    const id = root.getAttribute('data-uni-selection-style')
    expect(style.textContent).toContain(
      `[data-uni-selection-style="${id}"]::selection`
    )
    expect(style.textContent).toContain('color: rgb(10, 20, 30);')
    expect(style.textContent).toContain(
      'background-color: rgba(40, 50, 60, 0.5);'
    )
  })

  test('removes old declarations when the pseudo style is no longer set', async () => {
    const { root } = createSelection()
    selectionStyles.set(root, {
      color: 'rgb(10, 20, 30)',
      backgroundColor: 'rgb(40, 50, 60)',
    })
    await flushMutationObserver()
    expect(getStyleElement().textContent).toContain('color: rgb(10, 20, 30);')

    selectionStyles.delete(root)
    root.className = 'changed'
    await flushMutationObserver()

    const style = getStyleElement()
    expect(style.textContent).not.toContain(
      '[data-uni-selection-style="' +
        root.getAttribute('data-uni-selection-style') +
        '"]::selection'
    )
  })

  test('keeps selection instances isolated', async () => {
    const first = createSelection()
    const second = createSelection()
    selectionStyles.set(first.root, { backgroundColor: 'rgb(1, 11, 21)' })
    selectionStyles.set(second.root, { backgroundColor: 'rgb(2, 12, 22)' })
    first.root.className = 'first'
    second.root.className = 'second'
    await flushMutationObserver()

    const styles = document.head.querySelectorAll(
      'style[data-uni-selection-style-element]'
    )
    expect(styles).toHaveLength(2)
    const firstStyle = Array.from(styles).find((style) =>
      style.textContent?.includes(
        `[data-uni-selection-style="${first.root.getAttribute(
          'data-uni-selection-style'
        )}"]`
      )
    )!
    const secondStyle = Array.from(styles).find((style) =>
      style.textContent?.includes(
        `[data-uni-selection-style="${second.root.getAttribute(
          'data-uni-selection-style'
        )}"]`
      )
    )!
    expect(firstStyle.textContent).toContain('rgb(1, 11, 21)')
    expect(firstStyle.textContent).not.toContain('rgb(2, 12, 22)')
    expect(secondStyle.textContent).toContain('rgb(2, 12, 22)')
    expect(secondStyle.textContent).not.toContain('rgb(1, 11, 21)')
  })

  test('inserts the probe before existing stylesheets and restores it after removal', async () => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    const { root } = createSelection()
    await flushMutationObserver()

    const style = getStyleElement()
    expect(style.nextElementSibling).toBe(link)

    style.remove()
    root.className = 'restored'
    await flushMutationObserver()
    expect(getStyleElement()).not.toBeNull()
  })

  test('updates for body theme changes and external stylesheet edits', async () => {
    const externalStyle = document.createElement('style')
    document.head.appendChild(externalStyle)
    const { root } = createSelection()
    selectionStyles.set(root, { color: 'rgb(10, 20, 30)' })
    document.body.className = 'dark'
    await flushMutationObserver()
    expect(getStyleElement().textContent).toContain('color: rgb(10, 20, 30);')

    selectionStyles.set(root, {
      color: 'rgb(10, 20, 30)',
      backgroundColor: 'rgb(40, 50, 60)',
    })
    externalStyle.textContent = '.selected::selection {}'
    await flushMutationObserver()
    expect(getStyleElement().textContent).toContain(
      'background-color: rgb(40, 50, 60);'
    )
  })

  test('does not override the native selection when pseudo styles cannot be read', async () => {
    supportsSelectionPseudo = false
    const { root } = createSelection()
    selectionStyles.set(root, {
      color: 'rgb(10, 20, 30)',
      backgroundColor: 'rgb(40, 50, 60)',
    })
    await flushMutationObserver()

    expect(getStyleElement().textContent).not.toContain(
      '[data-uni-selection-style="' +
        root.getAttribute('data-uni-selection-style') +
        '"]::selection'
    )
  })

  test('cleans up the injected style and root attribute', async () => {
    const { root, scope } = createSelection()
    await flushMutationObserver()
    expect(getStyleElement()).not.toBeNull()
    expect(root.hasAttribute('data-uni-selection-style')).toBe(true)

    scope.stop()
    expect(
      document.head.querySelector('style[data-uni-selection-style-element]')
    ).toBeNull()
    expect(root.hasAttribute('data-uni-selection-style')).toBe(false)
  })
})
