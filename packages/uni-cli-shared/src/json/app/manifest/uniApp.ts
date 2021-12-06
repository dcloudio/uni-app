import { getNVueCompiler, getNVueFlexDirection } from './nvue'

interface UniAppOptions {
  control: 'uni-v3'
  compilerVersion: string
  nvueCompiler: 'uni-app' | 'weex' | 'vite' | 'vue'
  renderer: 'auto'
  nvue: {
    'flex-direction': 'row' | 'row-reverse' | 'column' | 'column-reverse'
  }
  nvueLaunchMode: 'fast' | 'normal'
}

export function initUniApp(manifestJson: Record<string, any>) {
  manifestJson.plus['uni-app'] = {
    control: 'uni-v3',
    vueVersion: '3',
    compilerVersion: process.env.UNI_COMPILER_VERSION,
    nvueCompiler: getNVueCompiler(manifestJson),
    renderer: 'auto',
    nvue: {
      'flex-direction': getNVueFlexDirection(manifestJson),
    },
    nvueLaunchMode:
      manifestJson.plus.nvueLaunchMode === 'fast' ? 'fast' : 'normal',
  } as UniAppOptions

  delete manifestJson.plus.nvueLaunchMode
}
