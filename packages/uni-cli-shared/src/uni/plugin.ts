import { isFunction } from '@vue/shared'
import { UniCompiler } from './compiler'

export interface UniPluginConfig {
  init?: () => void
  define?: () => Record<string, string>
  inject?: () => Record<string, string | [string, string]>
  done?: () => void
}
export class UniPlugin {
  name: string
  private options: UniPluginConfig
  constructor(name: string, config: UniPluginConfig = {}) {
    this.name = name
    this.options = config
  }
  apply(compiler: UniCompiler) {
    const {
      name,
      options: { init, define, inject, done },
    } = this
    isFunction(init) && compiler.hooks.init.tap(name, init)
    isFunction(define) && compiler.hooks.define.tap(name, define)
    isFunction(inject) && compiler.hooks.inject.tap(name, inject)
    isFunction(done) && compiler.hooks.done.tap(name, done)
  }
}
