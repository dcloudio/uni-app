import path from 'path'
import slash from 'slash'
import { Plugin } from 'vite'
import { parseVueRequest } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '../..'

export function uniAppVuePlugin(options: VitePluginUniResolvedOptions): Plugin {
  const appVuePath = slash(path.resolve(options.inputDir, 'App.vue'))
  return {
    name: 'vite:uni-app-vue',
    transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      //App.vue main request
      if (filename === appVuePath && !query.vue) {
        return {
          code: `<template><VUniApp ref="app"/></template><style src="@dcloudio/uni-h5/style/base.css"/>${code}`,
          map: this.getCombinedSourcemap(),
        }
      }
    },
  }
}
