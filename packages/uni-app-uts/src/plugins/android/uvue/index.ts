import path from 'path'
import fs from 'fs-extra'

import type { Plugin } from 'vite'
import type { SFCBlock } from '@vue/compiler-sfc'

import { isString } from '@vue/shared'
import {
  genUTSClassName,
  normalizePath,
  parseVueRequest,
  resolveAppVue,
} from '@dcloudio/uni-cli-shared'

import {
  getDescriptor,
  getResolvedOptions,
  getSrcDescriptor,
} from './descriptorCache'
import { isVue, transformUniCloudMixinDataCom } from '../utils'

import { transformStyle } from './code/style'

import { transformMain } from './sfc/main'

export function uniAppUVuePlugin(): Plugin {
  const options = getResolvedOptions()
  const appVue = resolveAppVue(process.env.UNI_INPUT_DIR)
  function isAppVue(id: string) {
    return normalizePath(id) === appVue
  }
  return {
    name: 'uni:app-uvue',
    apply: 'build',
    async resolveId(id) {
      // serve sub-part requests (*?vue) as virtual modules
      if (parseVueRequest(id).query.vue) {
        return id
      }
    },

    load(id) {
      const { filename, query } = parseVueRequest(id)
      // select corresponding block for sub-part virtual modules
      if (query.vue) {
        if (query.src) {
          return fs.readFileSync(filename, 'utf-8')
        }
        const descriptor = getDescriptor(filename, options)!
        let block: SFCBlock | null | undefined
        if (query.type === 'style') {
          block = descriptor.styles[query.index!]
        } else if (query.index != null) {
          block = descriptor.customBlocks[query.index]
        }
        if (block) {
          return {
            code: block.content,
            map: block.map as any,
          }
        }
      }
    },
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (!isVue(filename)) {
        return
      }
      if (!query.vue) {
        // main request
        return transformMain(
          transformUniCloudMixinDataCom(code),
          filename,
          {
            ...options,
            componentType: isAppVue(filename)
              ? 'app'
              : query.type === 'page'
              ? 'page'
              : 'component',
          },
          this
        )
      } else {
        // sub block request
        const descriptor = query.src
          ? getSrcDescriptor(filename)!
          : getDescriptor(filename, options)!

        if (query.type === 'style') {
          return transformStyle(
            code,
            descriptor,
            Number(query.index),
            options,
            this,
            filename
          )
        }
      }
    },
    generateBundle(_, bundle) {
      // 遍历vue文件，填充style，尽量减少全局变量
      Object.keys(bundle).forEach((name) => {
        const file = bundle[name]
        if (
          file &&
          file.type === 'asset' &&
          isVueFile(file.fileName) &&
          isString(file.source)
        ) {
          let fileName = normalizePath(file.fileName)
          if (process.env.UNI_APP_X_TSC === 'true') {
            fileName = fileName.replace('.ts', '')
          }
          const className =
            process.env.UNI_COMPILE_TARGET === 'ext-api'
              ? // components/map/map.vue => UniMap
                genUTSClassName(
                  path.basename(fileName),
                  options.classNamePrefix
                )
              : genUTSClassName(fileName, options.classNamePrefix)

          const classNameComment = `/*${className}Styles*/`
          if (file.source.includes(classNameComment)) {
            const styleAssetName = fileName + '.style.uts'
            const styleAsset = bundle[styleAssetName]
            if (
              styleAsset &&
              styleAsset.type === 'asset' &&
              isString(styleAsset.source)
            ) {
              file.source = file.source.replace(
                classNameComment,
                styleAsset.source.replace('export ', '')
              )
              delete bundle[styleAssetName]
            }
          }
        }
      })
    },
  }
}

function isVueFile(filename: string) {
  return (
    filename.endsWith('.uvue') ||
    filename.endsWith('.vue') ||
    filename.endsWith('.uvue.ts') ||
    filename.endsWith('.vue.ts')
  )
}
