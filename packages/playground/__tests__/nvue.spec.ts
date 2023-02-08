const execa = require('execa')
const fs = require('fs')

const nvuePath = require('path').resolve(__dirname, '../nvue')

beforeAll(async () => {
  await execa('pnpm i', [], {
    cwd: nvuePath,
  })
  await execa('npm run', ['build:app'], {
    cwd: nvuePath,
  })
})

describe('nvue playground', () => {
  jest.setTimeout(300 * 1000)
  test('template scroll-view', () => {
    const s = fs.readFileSync(
      require('path').resolve(nvuePath, 'dist/build/app/pages/index/index.js'),
      { encoding: 'utf8' }
    )
    expect(s).toContain('scroll-view')
  })
})
