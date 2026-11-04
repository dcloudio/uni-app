// Chrome 微基准：比较原生 DOM 与最终 Vapor 双写方案，使用实际构建产物。
// 先构建 uni-shared；使用 --playwright-root 指定已安装 Playwright 的项目，
// 并同步 Vapor Vue 运行时。不会安装浏览器或依赖。
// --suite attributes 比较原生属性 API；默认测量框架绑定、初始化、读取和快照成本。
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const jscc = require('rollup-plugin-jscc')

async function main() {
  const root = path.resolve(__dirname, '..')
  const args = Object.fromEntries(
    process.argv.slice(2).reduce((pairs, value, index, all) => {
      if (value.startsWith('--')) pairs.push([value.slice(2), all[index + 1]])
      return pairs
    }, [])
  )
  const { chromium } = require(require.resolve('playwright', {
    paths: [path.resolve(args['playwright-root'] || root)],
  }))
  const read = (file) => fs.readFileSync(path.resolve(root, file), 'utf8')
  const compile = (source) =>
    ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
      },
    }).outputText
  const plugin = jscc({ values: { _X_: 1, _X_VAPOR_: 1 } })
  const compileElement = async (file) => {
    const { code } = await plugin.load.call(
      {},
      path.join(root, 'packages/uni-components/src/helpers', file)
    )
    return compile(code)
  }
  const sources = {
    '@vue/shared': read(
      'packages/uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    ),
    '@dcloudio/uni-shared': read('packages/uni-shared/dist/uni-shared.cjs.js'),
    vue: read('packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js'),
    '../helpers/UniElement': await compileElement('UniElement.ts'),
    './UniElement-vapor': await compileElement('UniElement-vapor.ts'),
    elements: compile(
      read('packages/uni-components/src/vue/web-vapor-elements.ts')
    ),
  }
  const suite = args.suite || 'dataset'
  if (!['attributes', 'dataset'].includes(suite)) throw new Error('未知 suite')
  const modes = ['native', 'vapor']
  const browser = await chromium.launch({
    headless: true,
    ...(args.chrome
      ? { executablePath: path.resolve(args.chrome) }
      : { channel: 'chrome' }),
  })
  try {
    console.log(
      JSON.stringify({
        browser: await browser.version(),
        platform: process.platform,
        suite,
        count: suite === 'attributes' ? 500000 : 100000,
        templateCount: 10000,
        rounds: 9,
      })
    )
    const totals = {}
    // 交错顺序，在独立页面运行，避免原型安装污染和固定先后顺序的偏差。
    for (let round = 0; round < 9; round++) {
      for (const mode of [
        ...modes.slice(round % modes.length),
        ...modes.slice(0, round % modes.length),
      ]) {
        const page = await browser.newPage()
        const result = await page.evaluate(
          ({ sources, mode, suite }) => {
            const { window, document } = globalThis
            globalThis.__X__ = true
            globalThis.__PLATFORM__ = 'h5'
            const cache = {}
            function load(id) {
              if (cache[id]) return cache[id].exports
              const module = (cache[id] = { exports: {} })
              new Function(
                'require',
                'module',
                'exports',
                'process',
                sources[id]
              )(load, module, module.exports, {
                env: { NODE_ENV: 'production' },
              })
              return module.exports
            }
            const shared = load('@dcloudio/uni-shared')
            const nativeSet = Element.prototype.setAttribute
            const nativeRemove = Element.prototype.removeAttribute
            if (mode === 'vapor') {
              load('elements').installWebVaporElements(window)
            }
            for (const Host of [
              HTMLElement,
              HTMLDivElement,
              HTMLSpanElement,
              HTMLImageElement,
            ]) {
              if (
                Host.prototype.setAttribute !== nativeSet ||
                Host.prototype.removeAttribute !== nativeRemove
              ) {
                throw new Error('原生属性方法被改写')
              }
            }
            if (suite === 'attributes') {
              const count = 500000
              const batchSize = 5000
              const result = {}
              for (const [name, marker, key, active, numeric] of [
                ['plainOrdinary', false, 'title', false, false],
                ['uniOrdinary', true, 'title', false, false],
                ['plainData', false, 'data-count', false, false],
                ['uniLazyData', true, 'data-count', false, false],
                ['uniActiveData', true, 'data-count', true, false],
                ['uniNumberData', true, 'data-count', true, true],
              ]) {
                const values = numeric ? [1, 2] : ['one', 'two']
                const nodes = Array.from({ length: batchSize }, () => {
                  const el = document.createElement('div')
                  if (marker) el.setAttribute('uni-view', '')
                  el.setAttribute(key, 'one')
                  if (active && mode === 'vapor')
                    el.dataset.set('count', 'seed')
                  else if (active) void el.dataset
                  return el
                })
                const el = nodes[0]
                // 相同参数、相同 DOM 状态；预生成值，避免将 String(i) 的耗时算作包装成本。
                for (let i = 0; i < count / 10; i++)
                  el.setAttribute(key, values[i & 1])
                const start = performance.now()
                for (let i = 0; i < count; i++)
                  el.setAttribute(key, values[i & 1])
                result[name + '.set'] = performance.now() - start
                if (el.getAttribute(key) !== String(values[1]))
                  throw new Error('写入结果不一致')
                if (
                  active &&
                  mode === 'vapor' &&
                  el.dataset.get('count') !== 'seed'
                )
                  throw new Error('手动属性写入影响了 Map')
                let elapsed = 0
                for (let batch = -10; batch < count / batchSize; batch++) {
                  // 每次都删除实际存在的属性；准备阶段不计时，不以空删除代替真实删除。
                  for (const node of nodes) node.setAttribute(key, values[0])
                  const removeStart = performance.now()
                  for (const node of nodes) node.removeAttribute(key)
                  const duration = performance.now() - removeStart
                  if (batch >= 0) elapsed += duration
                }
                result[name + '.removePresent'] = elapsed
                if (nodes.some((node) => node.hasAttribute(key)))
                  throw new Error('删除结果不一致')
                if (
                  active &&
                  mode === 'vapor' &&
                  el.dataset.get('count') !== 'seed'
                )
                  throw new Error('手动属性删除影响了 Map')
              }
              return result
            }
            const { setAttr, initUniDataset } = load('vue')
            const uni = document.createElement('div')
            uni.setAttribute('uni-view', '')
            const createTemplate = (attribute) => {
              const template = document.createElement('template')
              template.innerHTML = `<div uni-view ${attribute}><span uni-text></span><img uni-image></div>`
              return template
            }
            const noData = createTemplate('')
            const scope = createTemplate('data-v-12345678')
            const template = createTemplate('data-count="1"')
            const seed = { 'data-count': '1' }
            const clone = () =>
              template.content.cloneNode(true).firstElementChild
            const source = clone()
            if (mode === 'vapor') initUniDataset(source, seed)
            const snapshotSource = source.dataset
            const strings = ['one', 'two']
            const objects = [{ n: 1 }, { n: 2 }]
            let sink
            const jobs = {
              bindingString(i) {
                setAttr(uni, 'data-count', strings[i & 1])
              },
              bindingObject(i) {
                setAttr(uni, 'data-count', objects[i & 1])
              },
              bindingSetRemove(i) {
                setAttr(uni, 'data-count', strings[i & 1])
                setAttr(uni, 'data-count', undefined, false, true, true)
              },
              datasetRead() {
                sink = uni.dataset
              },
              templateNoData() {
                sink = noData.content.cloneNode(true)
              },
              templateScopeOnly() {
                sink = scope.content.cloneNode(true)
              },
              templateStaticData() {
                sink = clone()
                if (mode === 'vapor') initUniDataset(sink, seed)
              },
              templateFirstRead() {
                const el = clone()
                if (mode === 'vapor') initUniDataset(el, seed)
                sink = el.dataset
              },
              datasetSnapshot() {
                sink = shared.createUniDOMStringMap(snapshotSource)
              },
            }
            const result = {}
            for (const [name, run] of Object.entries(jobs)) {
              const count = name.startsWith('template') ? 10000 : 100000
              for (let i = 0; i < count / 5; i++) run(i)
              const start = performance.now()
              for (let i = 0; i < count; i++) run(i)
              result[name] = performance.now() - start
            }
            if (sink.get('count') !== '1') throw new Error('快照语义不一致')
            if (mode === 'vapor') {
              setAttr(uni, 'data-count', objects[0])
              if (
                uni.dataset.get('count') !== objects[0] ||
                uni.getAttribute('data-count') !== '[object Object]'
              )
                throw new Error('框架未双写原始值与 DOM')
              setAttr(uni, 'data-count', undefined, false, true, true)
              if (uni.dataset.has('count') || uni.hasAttribute('data-count'))
                throw new Error('框架未同步删除')
            }
            return result
          },
          { sources, mode, suite }
        )
        await page.close()
        for (const [name, ms] of Object.entries(result)) {
          const samples = (totals[name] ||= {})
          ;(samples[mode] ||= []).push(ms)
        }
      }
    }
    for (const [name, results] of Object.entries(totals)) {
      console.log(
        JSON.stringify({
          name,
          ...Object.fromEntries(
            Object.entries(results).map(([mode, samples]) => {
              samples.sort((a, b) => a - b)
              return [
                mode,
                { medianMs: samples[4], minMs: samples[0], maxMs: samples[8] },
              ]
            })
          ),
        })
      )
    }
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
