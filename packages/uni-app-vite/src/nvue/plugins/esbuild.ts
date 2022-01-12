import { esbuild } from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'
import { nvueOutDir } from '../../utils'

export function uniEsbuildPlugin(): Plugin {
  return {
    name: 'uni:app-nvue-esbuild',
    enforce: 'post',
    async writeBundle(_, bundle) {
      const entryPoints: string[] = []
      Object.keys(bundle).forEach((name) => {
        const chunk = bundle[name]
        if (
          chunk.type === 'chunk' &&
          chunk.facadeModuleId &&
          chunk.facadeModuleId.endsWith('.nvue')
        ) {
          entryPoints.push(name)
        }
      })
      await esbuild({
        absWorkingDir: nvueOutDir(),
        entryPoints,
        bundle: true,
        external: ['vue'],
        outdir: process.env.UNI_OUTPUT_DIR,
      })
    },
  }
}
