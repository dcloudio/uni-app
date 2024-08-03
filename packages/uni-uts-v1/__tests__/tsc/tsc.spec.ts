import { basename, resolve } from 'path'
import { existsSync, readFileSync, readdirSync } from 'fs-extra'
import { runUTS2Kotlin } from '../../src/tsc/kotlin/index'

function resolvePlatformProjectDirs(platform: 'android') {
  const platformDir = resolve(__dirname, platform)
  const projectDirs: string[] = []
  readdirSync(platformDir).filter((dir) => {
    const androidProjectDir = resolve(platformDir, dir)
    if (existsSync(resolve(androidProjectDir, 'src/index.ts'))) {
      projectDirs.push(androidProjectDir)
    }
  })
  return projectDirs
}

function normalizeFileName(str: string): string {
  return str
}
describe('android', () => {
  resolvePlatformProjectDirs('android').forEach((projectDir) => {
    test(basename(projectDir), () => {
      const outputDir = resolve(projectDir, 'dist')
      runUTS2Kotlin('production', {
        inputDir: resolve(projectDir, 'src'),
        outputDir,
        cacheDir: resolve(projectDir, 'cache'),
        rootFiles: [resolve(projectDir, 'src/index.ts')],
        normalizeFileName,
      })
      expect(
        readFileSync(resolve(outputDir, 'index.uts'), 'utf8')
      ).toMatchSnapshot()
    })
  })
})
