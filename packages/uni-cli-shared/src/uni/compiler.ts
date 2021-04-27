import debug from 'debug'
import { SyncHook, SyncWaterfallHook } from 'tapable'
import { UniPlugin } from './plugin'

interface UniCompilerHooks {
  init: SyncHook<void, void>
  define: SyncWaterfallHook<Record<string, string>>
  inject: SyncWaterfallHook<Record<string, string | [string, string]>>
  done: SyncHook<void, void>
}

const debugCompiler = debug('uni:compiler')

export class UniCompiler {
  hooks: UniCompilerHooks
  constructor({ plugins }: { plugins: UniPlugin[] }) {
    this.hooks = {
      init: new SyncHook(),
      define: new SyncWaterfallHook(['define']),
      inject: new SyncWaterfallHook(['inject']),
      done: new SyncHook(),
    }
    plugins.forEach((plugin) => {
      debugCompiler('plugin', plugin.name)
      plugin.apply(this)
    })
  }
  init() {
    return this.hooks.init.call()
  }
  define() {
    const define = this.hooks.define.call({})
    debugCompiler('define', define)
    return define
  }
  inject() {
    const inject = this.hooks.inject.call({})
    debugCompiler('inject', inject)
    return inject
  }
  done() {
    return this.hooks.done.call()
  }
}
