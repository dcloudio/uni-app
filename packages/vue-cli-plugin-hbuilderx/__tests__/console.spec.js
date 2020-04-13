const path = require('path')

const {
  transformSync
} = require('@babel/core')

const options = {
  filename: '/index.vue',
  configFile: false,
  minified: true,
  plugins: [path.resolve(__dirname, '../packages/babel-plugin-console/dist/index.js')]
}

describe('console', () => {
  it('log', () => {
    expect(transformSync('console.log(\'123\')', options).code)
      .toBe('__f__("log","123"," at /index.vue:1");')
    expect(transformSync('console.log(\'123\',a,{a:1,b:2})', options).code)
      .toBe('__f__("log","123",a,{a:1,b:2}," at /index.vue:1");')
  })

  it('debug', () => {
    expect(transformSync('console.log(\'123\')', options).code)
      .toBe('__f__("log","123"," at /index.vue:1");')
    expect(transformSync('console.log(\'123\',a,{a:1,b:2})', options).code)
      .toBe('__f__("log","123",a,{a:1,b:2}," at /index.vue:1");')
  })

  it('info', () => {
    expect(transformSync('console.info(\'123\')', options).code)
      .toBe('__f__("info","123"," at /index.vue:1");')
    expect(transformSync('console.info(\'123\',a,{a:1,b:2})', options).code)
      .toBe('__f__("info","123",a,{a:1,b:2}," at /index.vue:1");')
  })

  it('warn', () => {
    expect(transformSync('console.warn(\'123\')', options).code)
      .toBe('__f__("warn","123"," at /index.vue:1");')
    expect(transformSync('console.warn(\'123\',a,{a:1,b:2})', options).code)
      .toBe('__f__("warn","123",a,{a:1,b:2}," at /index.vue:1");')
  })

  it('error', () => {
    expect(transformSync('console.error(\'123\')', options).code)
      .toBe('__f__("error","123"," at /index.vue:1");')
    expect(transformSync('console.error(\'123\',a,{a:1,b:2})', options).code)
      .toBe('__f__("error","123",a,{a:1,b:2}," at /index.vue:1");')
  })
})
