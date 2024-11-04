export class UniCSSStyleDeclaration {
  private $styles: Record<string, string | null> = {}
  private $onChangeCallbacks: ((
    styles: Record<string, string | null>
  ) => void)[] = []
  setProperty(name: string, value: string | null): void {
    const oldValue = this.$styles[name]
    if (oldValue === value) {
      return
    }
    this.$styles[name] = value
    this.$onChangeCallbacks.forEach((callback) => callback(this.$styles))
  }
  getPropertyValue(property: string): string {
    return this.$styles[property] || ''
  }
  get cssText(): string {
    return Object.entries(this.$styles)
      .map(([key, value]) => `${key}:${value}`)
      .join(';')
  }

  $onChange(callback: (styles: Record<string, string | null>) => void) {
    this.$onChangeCallbacks.push(callback)
  }

  $destroy() {
    this.$onChangeCallbacks = []
  }
}
