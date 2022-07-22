import { parse, runBuild, UtsTarget } from '@dcloudio/uts'
import path from 'path'
export function getUtsCompiler(): {
  parse: typeof parse
  runBuild: typeof runBuild
  UtsTarget: typeof UtsTarget
} {
  // eslint-disable-next-line no-restricted-globals
  return require('@dcloudio/uts')
}
export function compile(pluginDir: string) {
  const { runBuild, UtsTarget } = getUtsCompiler()
  runBuild(UtsTarget.KOTLIN, {
    input: {
      dir: path.join(process.env.UNI_INPUT_DIR, pluginDir),
    },
    output: {
      dir: path.join(process.env.UNI_OUTPUT_DIR, pluginDir),
      sourceMap: true,
      extname: '',
    },
  })
}
