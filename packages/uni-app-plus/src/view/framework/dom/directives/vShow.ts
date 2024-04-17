import type { UniCustomElement } from '../components'

export interface VShowElement extends UniCustomElement {
  // _vod = vue original display
  _vod: string
}

export function patchVShow(el: VShowElement, value: unknown) {
  el._vod = el.style.display === 'none' ? '' : el.style.display
  el.style.display = value ? el._vod : 'none'
}
