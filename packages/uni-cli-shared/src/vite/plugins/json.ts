import path from 'path'
import type { Plugin } from 'vite'
import { parseJson } from '../../json'
import { preJson } from '../../preprocess'
import { parseVueRequest } from '../utils'

export function uniJsonPlugin(): Plugin {
  const UTS_CAST_ARRAY_MARKER = '/*__UTS_CAST_UTSJSON_ARRAY__*/'
  const UTS_CAST_OBJECT_MARKER = '/*__UTS_CAST_UTSJSON_OBJECT__*/'
  const IS_LEGACY_UNI_X_ANDROID =
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-android' &&
    process.env.UNI_APP_X_DOM2 !== 'true'
  return {
    name: 'uni:json',
    enforce: 'pre',

    generateBundle(options, bundle) {
      if (IS_LEGACY_UNI_X_ANDROID) {
        for (const [fileName, file] of Object.entries(bundle)) {
          if (fileName.endsWith('.json.ts')) {
            if (file.type === 'asset' && file.source) {
              const source = file.source.toString()

              if (
                source.includes(UTS_CAST_ARRAY_MARKER) ||
                source.includes(UTS_CAST_OBJECT_MARKER)
              ) {
                file.source = source
                  .replace(
                    new RegExp(
                      UTS_CAST_ARRAY_MARKER.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        '\\$&'
                      ),
                      'g'
                    ),
                    ' as UTSJSONObject[]'
                  )
                  .replace(
                    new RegExp(
                      UTS_CAST_OBJECT_MARKER.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        '\\$&'
                      ),
                      'g'
                    ),
                    ' as UTSJSONObject'
                  )
              }
            }
          }
        }
      }
    },
    transform(code, id) {
      // 如果已经被其他插件处理过了，就不再处理，比如 commonjs 插件，ICAPRegistrar.json?commonjs-external
      if (id.startsWith('\0')) {
        return
      }
      const { filename } = parseVueRequest(id)
      if (path.extname(filename) !== '.json') {
        return
      }

      let codeObj = parseJson(preJson(code, id), false, id)
      let codeJson = ''
      if (IS_LEGACY_UNI_X_ANDROID) {
        if (Array.isArray(codeObj)) {
          codeJson +=
            'export default JSON.parseArray(`' +
            JSON.stringify(codeObj, null, 2) +
            '`)' +
            UTS_CAST_ARRAY_MARKER +
            ';\n'
        } else {
          codeJson +=
            'let __jsonObj = JSON.parseObject(`' +
            JSON.stringify(codeObj, null, 2) +
            '`);\n'

          for (const key in codeObj) {
            if (!Object.hasOwn(codeObj, key)) continue
            const element = codeObj[key]

            if (Array.isArray(element)) {
              codeJson += `export const ${key} = __jsonObj?.getArray("${key}")${UTS_CAST_ARRAY_MARKER};\n`
            } else if (typeof element === 'object' && element !== null) {
              codeJson += `export const ${key} = __jsonObj?.get("${key}")${UTS_CAST_OBJECT_MARKER};\n`
            } else if (typeof element === 'string') {
              codeJson += `export const ${key} = __jsonObj?.getString("${key}") ?? '';\n`
            } else if (typeof element === 'number') {
              codeJson += `export const ${key} = __jsonObj?.getNumber("${key}") ?? 0;\n`
            } else if (typeof element === 'boolean') {
              codeJson += `export const ${key} = __jsonObj?.getBoolean("${key}") ?? false;\n`
            } else {
              codeJson += `export const ${key} = __jsonObj?.get("${key}")${UTS_CAST_OBJECT_MARKER};\n`
            }
          }
          codeJson += `export default __jsonObj;`
        }
      } else {
        codeJson = JSON.stringify(codeObj, null, 2)
      }

      return {
        code: codeJson,
        map: {
          mappings: '',
        },
      }
    },
  }
}
