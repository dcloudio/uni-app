import fs from 'fs'
import path from 'path'
import slash from 'slash'
import { VitePluginUniResolvedOptions } from '..'

let appVuePath: string
export const app = {
  test(id: string, inputDir: string) {
    if (!appVuePath) {
      appVuePath = slash(path.resolve(inputDir, 'App.vue'))
    }
    return id === appVuePath
  },
  load(filename: string, _options: VitePluginUniResolvedOptions) {
    // TODO 等待plugin-vue修复node_modules中资源引用失败的Bug
    // <style src="@dcloudio/uni-h5/style/base.css"/>
    return `<template><VUniApp/></template>${fs
      .readFileSync(filename, 'utf-8')
      .toString()}`
  },
}
