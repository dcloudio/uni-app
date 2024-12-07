import { hyphenate } from '@vue/shared'

export class UniCSSStyleDeclaration {
  // 跳过vue的响应式
  __v_skip = true
  private $styles: Record<string, string | null> = {}
  private $onChangeCallbacks: ((
    styles: Record<string, string | null>
  ) => void)[] = []

  constructor() {
    return new Proxy(this, {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop as keyof UniCSSStyleDeclaration]
        }
        return target.getPropertyValue(prop)
      },
      set: (target, prop: string, value: string | null) => {
        if (prop in target) {
          return false
        }
        target.setProperty(prop, value)
        return true
      },
    })
  }

  setProperty(name: string, value: string | null): void {
    name = hyphenateCssProperty(name)
    const oldValue = this.$styles[name]
    if (oldValue === value) {
      return
    }
    this.$styles[name] = value
    this.$onChangeCallbacks.forEach((callback) => callback(this.$styles))
  }
  getPropertyValue(property: string): string {
    property = hyphenateCssProperty(property)
    return this.$styles[property] || ''
  }
  get cssText(): string {
    const styles = Object.entries(this.$styles)
    if (styles.length === 0) {
      return ''
    }
    return styles.map(([key, value]) => `${key}:${value}`).join(';') + ';'
  }

  $onChange(callback: (styles: Record<string, string | null>) => void) {
    this.$onChangeCallbacks.push(callback)
  }

  $destroy() {
    this.$onChangeCallbacks.length = 0
  }
}

export function hyphenateCssProperty(str: string) {
  if (str.startsWith('Webkit')) {
    return '-webkit-' + hyphenate(str.slice(6))
  }
  return hyphenate(str)
}
