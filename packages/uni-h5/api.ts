import fs from 'fs'
import path from 'path'
import { parse } from 'acorn-loose'
import { simple } from 'acorn-walk'
import { hyphenate } from '@vue/shared'
import { isBuiltInComponent, isUniXElement } from '@dcloudio/uni-shared'
import type { ExportNamedDeclaration } from 'estree'

const BLACKLIST = [
  'AsyncErrorComponent',
  'AsyncLoadingComponent',
  'LayoutComponent',
  'PageComponent',
  'ResizeSensor',
  'UniServiceJSBridge',
  'UniViewJSBridge',
  'getApp',
  'getCurrentPages',
  'uni',
  'useTabBar',
  'setupApp',
  'setupPage',
  'setupWindow',
  'plugin',
  'cssBackdropFilter',
  'cssConstant',
  'cssEnv',
  'cssVar',
  'useI18n',
  'MatchMedia',
]

export function genApiJson(code: string) {
  const apiNames: string[] = []
  simple(
    parse(code, {
      sourceType: 'module',
      ecmaVersion: 2020,
    }),
    {
      ExportNamedDeclaration(node) {
        ;(node as unknown as ExportNamedDeclaration).specifiers.forEach(
          ({ exported: { name } }) => {
            if (isApi(name)) {
              apiNames.push(name)
            }
          }
        )
      },
    }
  )
  const apiJsonPath = path.resolve(
    __dirname,
    process.env.UNI_APP_X === 'true'
      ? '../uni-h5-vite/lib/api.x.json'
      : '../uni-h5-vite/lib/api.json'
  )
  const oldApiJson = fs.readFileSync(apiJsonPath, 'utf8').replace(/\r\n/g, '\n')
  const newApiJson = JSON.stringify(apiNames.sort(), null, 2)
  if (oldApiJson !== newApiJson) {
    fs.writeFileSync(
      path.resolve(
        __dirname,
        process.env.UNI_APP_X === 'true'
          ? '../uni-h5-vite/lib/api.x.new.json'
          : '../uni-h5-vite/lib/api.new.json'
      ),
      newApiJson
    )
    throw new Error(`${apiJsonPath} 发生变化,请手动确认`)
  } else {
    console.log()
    console.log(`generate api.json`)
    console.log()
  }
}

function isApi(name) {
  if (BLACKLIST.includes(name)) {
    return false
  }
  if (isBuiltInComponent(hyphenate(name))) {
    return false
  }
  if (isUniXElement(name)) {
    return false
  }
  return true
}
