import path from 'path'
import slash from 'slash'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '../..'

export function uniAppVuePlugin(options: VitePluginUniResolvedOptions): Plugin {
  const appVuePath = slash(path.resolve(options.inputDir, 'App.vue'))
  return {
    name: 'vite:uni-app-vue',
    transform(code, id) {
      if (id === appVuePath) {
        return {
          code: `<template><VUniApp ref="app"/></template><style src="@dcloudio/uni-h5/style/base.css"/>${code}`,
          map: this.getCombinedSourcemap(),
        }
      }
    },
  }
}
