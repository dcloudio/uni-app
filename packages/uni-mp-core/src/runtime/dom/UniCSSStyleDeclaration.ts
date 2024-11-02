export class UniCSSStyleDeclaration {
  private $styles: Record<string, string | null> = {}
  setProperty(name: string, value: string | null): void {
    this.$styles[name] = value
  }
  getPropertyValue(property: string): string {
    return this.$styles[property] || ''
  }
  get cssText(): string {
    return Object.entries(this.$styles)
      .map(([key, value]) => `${key}:${value}`)
      .join(';')
  }
}
