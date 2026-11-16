const syntax = require('./progress-syntax.json')
const platform = process.env.UNI_PLATFORM || ''
function isSupportedTarget(target) {
  const version = target?.unixVaporVer !== undefined ? target.unixVaporVer : target?.unixVer
  return typeof version === 'string' && version.trim() !== '' && version.trim().toLowerCase() !== 'x'
}
function supportedOnAnyTarget(item) {
  const metadata = item.uniPlatform
  function collect(value) {
    if (value == null) return []
    return [value.web, value.harmony, ...Object.values(value.app || {}), ...Object.values(value.mp || {}), ...collect(value.uniPlatform)]
  }
  const targets = collect(metadata)
  return targets.length === 0 || targets.some(isSupportedTarget)
}
const attributes = syntax.attributes.filter(item => !item.name.startsWith('[event]') && !Object.keys(item).includes('deprecated') && supportedOnAnyTarget(item))
const supportsActiveend = syntax.attributes.some(item => item.name === '[event]activeend' && supportedOnAnyTarget(item))
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('Progress.uvue', () => {
  let page

  async function getData(key = '') {
    const data = await page.data('data')
    return key ? data[key] : data
  }
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/progress/progress')
    await page.waitFor(2000);
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  beforeEach(async () => {
    await page.callMethod('setEventCallbackNumTest', 0)
  })


  it('percent', async () => {
    await page.callMethod('setProgress')
    await page.waitFor(1000);
    const p = await page.$('#progress-default')
    expect(await p.attribute('percent')).toEqual(20 + '')
    const p1 = await page.$('#progress-plain')
    expect(await p1.attribute('percent')).toEqual(40 + '')
    const p2 = await page.$('#progress-plain-second')
    expect(await p2.attribute('percent')).toEqual(60 + '')
    const p3 = await page.$('#progress-blue')
    expect(await p3.attribute('percent')).toEqual(80 + '')
    if (process.env.UNI_PLATFORM === 'app-android') {
      expect(await getData('curPercent')).toEqual(20)
    }
    await page.callMethod('clearProgress')
    await page.waitFor(1000)
    expect(await p.attribute('percent')).toEqual(0 + '')
    expect(await p1.attribute('percent')).toEqual(0 + '')
    expect(await p2.attribute('percent')).toEqual(0 + '')
    expect(await p3.attribute('percent')).toEqual(0 + '')
    if (process.env.UNI_PLATFORM === 'app-android') {
      expect(await getData('curPercent')).toEqual(0)
    }
  })
  it('renders the preview and four default examples', async () => {
    const ids = ['progress-preview', 'progress-default', 'progress-plain', 'progress-plain-second', 'progress-blue']
    for (const id of ids) {
      expect(await page.$(`#${id}`)).not.toBeNull()
    }
  })
  if(isMP) {
    it('show-info', async () => {
      const el = await page.$('#progress-default')
      expect(await el.property('showInfo')).toEqual(true)
      await setPageData({showInfo: false})
      expect(await el.property('showInfo')).toEqual(false)
    })
  } else {
    it('show-info', async () => {
      const el = await page.$('#progress-default')
      expect(await el.attribute('show-info')).toEqual(true + '')
      await setPageData({showInfo: false})
      expect(await el.attribute('show-info')).toEqual(false + '')
    })
  }
  it('border-radius', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('border-radius')).toEqual(0 + '')
    await setPageData({borderRadius: 5})
    expect(await el.attribute('border-radius')).toEqual(5 + '')
  })
  it('font-size', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('font-size')).toEqual(16 + '')
    await setPageData({fontSize: 18})
    expect(await el.attribute('font-size')).toEqual(18 + '')
  })
  it('stroke-width', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('stroke-width')).toEqual(3 + '')
    await setPageData({strokeWidth: 6})
    expect(await el.attribute('stroke-width')).toEqual(6 + '')
    if(isWeb) {
      await setPageData({strokeWidth: '10px'})
      expect(await el.attribute('stroke-width')).toEqual('10px')
      await setPageData({strokeWidth: '30rpx'})
      expect(await el.attribute('stroke-width')).toEqual('30rpx')
    }
  })
  it('backgroundColor', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('background-color')).toEqual('#EBEBEB')
    await setPageData({backgroundColor: "#007aff"})
    expect(await el.attribute('background-color')).toEqual('#007aff')
  })
  it('trigger UniProgressActiveendEvent', async () => {
    if (isWeb || isMP) {
      expect(1).toBe(1)
      return
    }

    await setPageData({pgList: [21, 40, 60, 80]})
    // 动画执行
    await page.waitFor(1000);
    const eventCallbackNum = await page.callMethod('getEventCallbackNum')
    expect(eventCallbackNum).toBe(3)
  })
  it('active-color attribute', async () => {
    const el = await page.$('#progress-preview')
    expect(await el.attribute('active-color')).toBe(syntax.attributes.find(item => item.name === 'activeColor').defaultValue)
  })

})

function unsupported(attribute) {
  const metadata = syntax.attributes.find(item => item.name === attribute)?.uniPlatform
  if (isWeb) return metadata?.web?.unixVer === 'x'
  if (isMP) {
    const name = Object.keys(metadata?.mp || {}).find(key => platform.includes(key) || platformInfo.includes(key))
    return name != null && metadata.mp[name].unixVer === 'x'
  }
  const app = ['android', 'ios', 'harmony'].find(name => platform.includes(name) || platformInfo.includes(name))
  if (app != null) {
    const field = process.env.UNI_APP_X_DOM2 === 'true' ? 'unixVaporVer' : 'unixVer'
    return metadata?.app?.[app]?.[field] === 'x'
  }
  return false
}

function nativeName(name) {
  return name === 'activeColor' ? 'active-color' : name
}


describe('Progress component-template', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/progress/progress')
    await page.waitFor(500)
  })

  async function reset() {
    await (await page.$('#progress-reset')).tap()
    await page.waitFor(50)
  }
  beforeEach(reset)
  afterEach(reset)

  async function read(preview, name) {
    if (isMP && name === 'show-info') return String(await preview.property('showInfo'))
    return String(await preview.attribute(nativeName(name)))
  }

  it('syntax controls share one preview and preserve automation examples', async () => {
    expect(await page.$('#progress-properties')).not.toBeNull()
    for (const attribute of attributes) {
      expect(await page.$('#progress-' + attribute.name + '-example')).not.toBeNull()
      expect(await page.$('#progress-' + attribute.name)).not.toBeNull()
      expect(await page.$('#progress-' + attribute.name + '-preview')).toBeNull()
    }
    for (const id of ['progress-preview', 'progress-default', 'progress-plain', 'progress-plain-second', 'progress-blue']) {
      expect(await page.$('#' + id)).not.toBeNull()
    }
    if (supportsActiveend) {
      expect(await page.$('#progress-event-activeend-run')).not.toBeNull()
      expect(await page.$('#progress-event-activeend-log')).not.toBeNull()
    } else {
      expect(await page.$('#progress-event-activeend-run')).toBeNull()
      expect(await page.$('#progress-event-activeend-log')).toBeNull()
    }
    expect(await page.$('#progress-event-activeend-preview')).toBeNull()
  })

  it('does not generate deprecated attribute controls', async () => {
    for (const attribute of syntax.attributes.filter(item => Object.keys(item).includes('deprecated'))) {
      expect(await page.$('#progress-' + attribute.name)).toBeNull()
      expect(await page.$('#progress-' + attribute.name + '-example')).toBeNull()
    }
  })

  it('excludes attributes unsupported on every declared target', async () => {
    for (const attribute of syntax.attributes.filter(item => !item.name.startsWith('[event]') && !supportedOnAnyTarget(item))) {
      expect(await page.$('#progress-' + attribute.name)).toBeNull()
    }
  })

  for (const attribute of attributes.filter(item => item.defaultValue != null && !unsupported(item.name))) {
    it(attribute.name + ' uses the syntax default on the shared preview', async () => {
      const preview = await page.$('#progress-preview')
      expect(await read(preview, attribute.name)).toBe(String(attribute.defaultValue))
    })
  }

  for (const [name, value] of [['percent', 65], ['stroke-width', 8], ['border-radius', 5], ['font-size', 18], ['duration', 10]]) {
    const test = !attributes.some(item => item.name === name) || unsupported(name) ? it.skip : it
    test(name + ' updates the shared preview without changing legacy examples', async () => {
      const control = await page.$('#progress-' + name)
      const preview = await page.$('#progress-preview')
      const originalLegacyPercent = await (await page.$('#progress-default')).attribute('percent')
      await control.trigger('changing', { value })
      await page.waitFor(async () => await read(preview, name) === String(value))
      expect(await read(preview, name)).toBe(String(value))
      expect(await (await page.$('#progress-default')).attribute('percent')).toBe(originalLegacyPercent)
    })
  }

  it('several controls combine on the same preview', async () => {
    await (await page.$('#progress-percent')).trigger('changing', { value: 65 })
    await (await page.$('#progress-stroke-width')).trigger('changing', { value: 8 })
    await (await page.$('#progress-show-info')).trigger('change', { value: true })
    const preview = await page.$('#progress-preview')
    await page.waitFor(async () => await read(preview, 'percent') === '65' && await read(preview, 'stroke-width') === '8')
    expect(await read(preview, 'show-info')).toBe('true')
  })

  const eventTest = supportsActiveend ? it : it.skip
  eventTest('activeend handler displays the shared preview event detail', async () => {
    await (await page.$('#progress-preview')).trigger('activeend', { curPercent: 70 })
    const log = await page.$('#progress-event-activeend-log')
    await page.waitFor(async () => (await log.text()).includes('curPercent=70'))
    expect(await log.text()).toContain('activeend')
  })

  eventTest('page actions update the slotted preview and generated controls together', async () => {
    await (await page.$('#progress-event-activeend-run')).tap()
    const preview = await page.$('#progress-preview')
    const percent = await page.$('#progress-percent')
    await page.waitFor(async () => await read(preview, 'percent') === '70' && await percent.attribute('value') === '70')
    expect(await percent.attribute('value')).toBe('70')
    expect(await (await page.$('#progress-default')).attribute('percent')).toBe('0')
  })

  const animationTest = !supportsActiveend || unsupported('[event]activeend') ? it.skip : it
  animationTest('plays the shared preview and receives native activeend', async () => {
    await (await page.$('#progress-event-activeend-run')).tap()
    const log = await page.$('#progress-event-activeend-log')
    await page.waitFor(async () => (await log.text()).includes('curPercent=70'))
    expect(await log.text()).toContain('activeend')
  })
})
