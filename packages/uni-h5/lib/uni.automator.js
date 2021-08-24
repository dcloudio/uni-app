'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var debug = _interopDefault(require('debug'))
var puppeteer = _interopDefault(require('puppeteer'))
var parser = _interopDefault(require('postcss-selector-parser'))

function transform(selectors) {
  selectors.walk((selector) => {
    if (selector.type === 'tag') {
      const value = selector.value
      if (value === 'page') {
        //@ts-ignore
        {
          selector.value = 'uni-page-body'
        }
      } else {
        selector.value = 'uni-' + value
      }
    }
  })
}
function transSelector(method) {
  return {
    reflect: async (send, params) => send(method, params, false),
    params(params) {
      if (params.selector) {
        params.selector = parser(transform).processSync(params.selector)
      }
      return params
    },
  }
}
const methods = [
  'Page.getElement',
  'Page.getElements',
  'Element.getElement',
  'Element.getElements',
]
function initAdapter(adapter) {
  methods.forEach((method) => {
    adapter[method] = transSelector(method)
  })
}

const debugDevtools = debug('automator:devtool')
async function validateDevtools(options) {
  options.options = options.options || {}
  if (options.executablePath && !options.options.executablePath) {
    options.options.executablePath = options.executablePath
  }
  options.options.defaultViewport = Object.assign(
    {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      hasTouch: true,
      isMobile: true,
    },
    options.options.defaultViewport || {}
  )
  if (!options.teardown) {
    options.teardown =
      options.options.headless === false ? 'disconnect' : 'close'
  }
  return options
}
let browser
let page
async function createDevtools(url, options, puppet) {
  browser = await puppeteer.launch(options.options)
  const process = browser.process()
  if (process) {
    debugDevtools('%s %o', process.spawnfile, options.options)
  } else {
    debugDevtools('%o', options.options)
  }
  page = await browser.newPage()
  page.on('console', (msg) => {
    puppet.emit('App.logAdded', { type: msg.type(), args: [msg.text()] })
  })
  page.on('pageerror', (err) => {
    puppet.emit('App.exceptionThrown', err)
  })
  await page.goto(options.url || url)
  await page.waitFor(1000)
}
const adapter = {
  'Tool.close': {
    reflect: async () => {
      await browser.close()
    },
  },
  'App.exit': {
    reflect: async () => {},
  },
  'App.enableLog': {
    reflect: () => Promise.resolve(),
  },
  'App.captureScreenshot': {
    reflect: async (send, params) => {
      const data = await page.screenshot({
        encoding: 'base64',
        fullPage: !!params.fullPage,
      })
      debugDevtools(`App.captureScreenshot ${data.length}`)
      return {
        data,
      }
    },
  },
}
initAdapter(adapter)
const puppet = {
  devtools: {
    name: 'google chrome',
    paths: [],
    validate: validateDevtools,
    create: createDevtools,
  },
  shouldCompile(options, devtoolsOptions) {
    if (devtoolsOptions.url) {
      return false
    }
    return true
  },
  adapter,
}

module.exports = puppet
