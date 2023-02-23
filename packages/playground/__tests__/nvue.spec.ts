import fs from 'fs'
import path from 'path'
import execa from 'execa'

const projectDir = path.resolve(__dirname, '../nvue')

beforeAll(async () => {
  await execa('npm', ['run', 'build:app'], {
    cwd: projectDir,
  })
})

describe('nvue playground', () => {
  jest.setTimeout(50 * 1000)
  test('template scroll-view', () => {
    const s = fs.readFileSync(
      path.resolve(projectDir, 'dist/build/app/pages/index/index.js'),
      'utf8'
    )
    expect(s).toContain('scroll-view')
  })
})
