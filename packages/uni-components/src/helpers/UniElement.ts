export class UniElement extends HTMLElement {
  private _props: Record<string, any> = {}
  constructor() {
    super()
  }

  attachVmProps(props: Record<string, any>) {
    this._props = props
  }

  getAttribute(qualifiedName: string): string | null {
    const name =
      qualifiedName.indexOf('-') > -1
        ? qualifiedName.replace(/-(\w)/g, (_, c) => c.toUpperCase())
        : qualifiedName
    return name in this._props
      ? this._props[name] + ''
      : super.getAttribute(name) || null
  }
}
