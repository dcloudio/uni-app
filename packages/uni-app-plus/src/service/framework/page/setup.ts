import { PageProps, VueComponent } from './define'

export function setupPage(component: VueComponent) {
  if (__DEV__) {
    console.log(`setupPage`)
  }
  const oldSetup = component.setup
  component.setup = (props, ctx) => {
    const { pagePath, pageQuery } = props as unknown as PageProps
    if (__DEV__) {
      console.log(`${pagePath} setup`)
    }
    if (oldSetup) {
      return oldSetup(pageQuery as any, ctx)
    }
  }
  return component
}
