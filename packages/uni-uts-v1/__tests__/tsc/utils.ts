import { resolve } from 'path'
import { readFileSync } from 'fs-extra'
import { runUTS2Kotlin } from '../../src/tsc/kotlin/index'
// process.env.DEBUG = 'uts:*'
function run(platform: 'android' | 'ios', dir: string) {
  describe('android', () => {
    const projectDir = resolve(__dirname, 'uni-app-x', dir)
    const outputDir = resolve(projectDir, 'dist/' + platform)
    runUTS2Kotlin('production', {
      inputDir: resolve(projectDir, 'src'),
      outputDir,
      cacheDir: resolve(projectDir, 'cache'),
      rootFiles: [resolve(projectDir, 'src/index.ts')],
      normalizeFileName,
    })
    test(dir, () => {
      expect(
        readFileSync(resolve(outputDir, 'index.uts'), 'utf8')
      ).toMatchSnapshot()
    })
  })
}

export function runAndroid(dir: string) {
  run('android', dir)
}

function normalizeFileName(str: string): string {
  return str
}
