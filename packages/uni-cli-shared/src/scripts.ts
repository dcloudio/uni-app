import { hasOwn } from '@vue/shared'
import fs from 'fs'

interface Package {
  'uni-app'?: {
    scripts?: {
      [name: string]: {
        title?: string
        BROWSER?: 'Chrome' | 'Firefox' | 'IE' | 'Edge' | 'Safari' | 'HBuilderX'
        env?: {
          UNI_PLATFORM: UniApp.PLATFORM
          [name: string]: string
        }
        define: {
          [name: string]: boolean
        }
      }
    }
  }
}

export function parseScripts(name: string, pkgPath: string) {
  if (!fs.existsSync(pkgPath)) {
    return
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as Package

  const scripts = pkg['uni-app']?.scripts || {}
  const options = scripts[name]
  if (!options) {
    return
  }
  if (!options.env?.UNI_PLATFORM) {
    console.error(
      `package.json->uni-app->scripts->${name}->env->UNI_PLATFORM is required`
    )
    process.exit(0)
  }
  const { UNI_PLATFORM, ...define } = options.env
  const context = options.define || {}
  // 补充当前编译环境未定义的其他编译环境 define
  Object.keys(scripts).forEach((scriptName) => {
    if (scriptName !== name) {
      const scriptDefine = scripts[scriptName].define || {}
      Object.keys(scriptDefine).forEach((key) => {
        if (!hasOwn(context, key)) {
          context[key] = false
        }
      })
    }
  })
  return {
    name: name,
    platform: UNI_PLATFORM,
    define,
    context,
  }
}
