const PAGE_PATH = '/pages/directive/v-bind/dataset/dataset-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.includes('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp-')
const isApp = isAndroid || isIos || isHarmony
const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
const supportsElementDataset = isWeb || isApp
// App VDOM 暂只覆盖元素 dataset 自身；自定义组件根节点静态 dataset 合并由 Web/Vapor 覆盖。
const supportsCustomComponentRootDataset = isWeb || isDom2
// App 与 Web 覆盖元素 dataset；小程序 X 不覆盖 getElementById().dataset，仅验证事件和 API 快照。
const elementDatasetIt = supportsElementDataset ? it : it.skip
// createIntersectionObserver 目前仅 Web 和小程序支持，App 平台不纳入该 API 的 dataset 自动化覆盖。
const intersectionObserverIt = isWeb || isMP ? it : it.skip

describe('directive/v-bind/dataset', () => {
  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
  })

  elementDatasetIt('reads element datasets', async () => {
    const view = await page.callMethod('collectElementDatasetSnapshot', 'view')
    const text = await page.callMethod('collectElementDatasetSnapshot', 'text')
    const input = await page.callMethod('collectElementDatasetSnapshot', 'input')
    const button = await page.callMethod('collectElementDatasetSnapshot', 'button')
    const custom = await page.callMethod('collectElementDatasetSnapshot', 'custom')

    expect(view.type).toBe('view')
    expect(view.count).toBe(1)
    expect(view.enabled).toBe(true)
    expect(text.type).toBe('text')
    expect(input.type).toBe('input')
    expect(button.type).toBe('button')
    expect(button.nullIsNull).toBe(true)
    expect(button.undefinedIsUndefined).toBe(true)

    expect(custom.type).toBe('custom-fallthrough')
    expect(custom.shared).toBe('parent-shared')
    if (supportsCustomComponentRootDataset) {
      expect(custom.childOnly).toBe('child')
      expect(custom.parentOnly).toBe('parent')
      expect(custom.childCount).toBe(10)
    }
  })

  elementDatasetIt('supports dataset map APIs and bracket assignment', async () => {
    const snapshot = await page.callMethod('collectDatasetMapApiSnapshot')

    expect(snapshot.getType).toBe('view')
    expect(snapshot.getCount).toBe(1)
    expect(snapshot.hasType).toBe(true)
    expect(snapshot.mapSetByBracket).toBe('map-value')
    expect(snapshot.bracketSetByGet).toBe('bracket-value')
    expect(snapshot.bracketSetByBracket).toBe('bracket-value')
    expect(snapshot.deleteResult).toBe(true)
    expect(snapshot.hasMapSetAfterDelete).toBe(false)
    expect(snapshot.reservedGetByMap).toBe('reserved-value')
    expect(snapshot.getIsFunction).toBe(true)
  })

  it('exposes dataset on selector query results', async () => {
    const snapshot = await page.callMethod('collectSelectorQueryDatasetSnapshot')

    expect(snapshot.execLength).toBe(3)
    expect(snapshot.bounding.type).toBe('query')
    expect(snapshot.bounding.query).toBe('selector')
    expect(snapshot.fields.type).toBe('query')
    expect(snapshot.fields.query).toBe('selector')
    expect(snapshot.fields.isMap).toBe(true)
    expect(snapshot.fields.getIsFunction).toBe(true)
    expect(snapshot.fields.conflictGet).toBe('conflict-get')
    expect(snapshot.fields.conflictSet).toBe('conflict-set')
    expect(snapshot.fields.conflictHas).toBe('conflict-has')
    expect(snapshot.fields.conflictDelete).toBe('conflict-delete')
    expect(snapshot.fields.conflictClear).toBe('conflict-clear')
    expect(snapshot.scrollOffset.type).toBe('scroll')
    expect(snapshot.scrollOffset.scroll).toBe('offset')
  })

  intersectionObserverIt('exposes dataset on intersection observer results', async () => {
    const snapshot = await page.callMethod(
      'collectIntersectionObserverDatasetSnapshot',
    )

    expect(snapshot.type).toBe('observer')
    expect(snapshot.observer).toBe('intersection')
    expect(snapshot.isMap).toBe(true)
    expect(snapshot.getIsFunction).toBe(true)
  })

  elementDatasetIt('updates dynamic and complex dataset values', async () => {
    await page.callMethod('updateDataset')
    await page.waitFor(100)
    const view = await page.callMethod('collectElementDatasetSnapshot', 'view')
    const custom = await page.callMethod('collectElementDatasetSnapshot', 'custom')

    expect(view.count).toBe(2)
    expect(view.enabled).toBe(false)
    expect(custom.count).toBe(2)
    expect(custom.shared).toBe('parent-shared-updated')
    expect(view.complexName).toBe('complex-updated')
    expect(view.complexNestedValue).toBe(2)
    expect(view.arrayFirst).toBe(2)
    expect(view.arraySecond).toBe('b')
  })

  it('exposes dataset on tap event objects', async () => {
    // input() 自动化触发在 App/Harmony 不稳定，事件 dataset 先用 tap 覆盖。
    await (await page.$('#dataset-view')).tap()
    await (await page.$('#dataset-button')).tap()
    if (!isMP) {
      // 小程序只验证原生元素事件 dataset，自定义组件透传事件在不同平台表现不一致。
      await (await page.$('#dataset-child-root')).tap()
    }
    await page.waitFor(100)

    const events = await page.callMethod('getEventDatasetSnapshots')
    expect(events.view.currentTarget.type).toBe('view')
    expect(events.button.currentTarget.type).toBe('button')
    if (isMP) {
      expect(events.view.target.type).toBe('view')
      expect(events.button.target.type).toBe('button')
    }
    if (!isMP) {
      expect(events.custom.currentTarget.type).toBe('custom-fallthrough')
      if (supportsCustomComponentRootDataset) {
        expect(events.custom.currentTarget.parentOnly).toBe('parent')
        expect(events.custom.currentTarget.childOnly).toBe('child')
      }
    }
  })
})
