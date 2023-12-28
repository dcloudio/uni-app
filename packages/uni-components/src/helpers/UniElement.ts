export class UniElement extends HTMLElement {
  private _props: Record<string, any> = {}
  constructor() {
    super()
  }

  attachVmProps(props: Record<string, any>) {
    this._props = props
  }

  getAttribute(qualifiedName: string): string | null {
    return qualifiedName in this._props
      ? this._props[qualifiedName] + ''
      : super.getAttribute(qualifiedName)
  }
}
