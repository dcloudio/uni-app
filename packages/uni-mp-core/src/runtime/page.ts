import { ComponentOptions } from 'vue'
import { ParseComponentOptions, parseComponent } from './component'
import { PAGE_HOOKS, initHooks, initUnknownHooks } from './componentHooks'

function parsePage(
  vueOptions: ComponentOptions,
  parseOptions: ParseComponentOptions
) {
  const {
    parse,
    mocks,
    isPage,
    initRelation,
    handleLink,
    initLifetimes
  } = parseOptions
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks,
    isPage,
    initRelation,
    handleLink,
    initLifetimes
  })

  const methods = miniProgramPageOptions.methods as WechatMiniprogram.Component.MethodOption
  initHooks(methods, PAGE_HOOKS)
  initUnknownHooks(methods, vueOptions)

  parse && parse(miniProgramPageOptions, { handleLink })

  return miniProgramPageOptions
}

export function initCreatePage(parseOptions: ParseComponentOptions) {
  return function createPage(vuePageOptions: ComponentOptions) {
    return Component(parsePage(vuePageOptions, parseOptions))
  }
}
