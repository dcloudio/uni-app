import { ComponentPublicInstance, getCurrentInstance } from 'vue'
import { PageProps, VueComponent } from './define'
import { addCurrentPage } from './getCurrentPages'

export function setupPage(
  component: VueComponent,
  { pageId, pagePath, pageQuery, pageInstance }: PageProps
) {
  const oldSetup = component.setup
  component.setup = (_props, ctx) => {
    if (__DEV__) {
      console.log(`${pagePath} setup`)
    }
    const instance = getCurrentInstance()!
    const pageVm = instance.proxy!
    pageVm.$page = pageInstance
    addCurrentPage(initScope(pageId, pageVm))
    if (oldSetup) {
      return oldSetup(pageQuery as any, ctx)
    }
  }
  return component
}

function initScope(pageId: number, vm: ComponentPublicInstance) {
  vm.$scope = {
    $getAppWebview() {
      return plus.webview.getWebviewById(String(pageId))
    },
  }
  return vm
}
