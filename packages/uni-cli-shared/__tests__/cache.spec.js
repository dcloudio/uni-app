const {
  updateAppJson,
  updatePageJson,
  updateUsingComponents,
  getChangedJsonFileMap
} = require('../lib/cache')

describe('shared:cache', () => {
  it('generate app.json', () => {
    const name = 'app'
    const appJson = {
      debug: true
    }
    updateAppJson(name, appJson)
    let appJsonStr = getChangedJsonFileMap().get(name + '.json')
    expect(appJsonStr).toBe(JSON.stringify(appJson, null, 2))
    expect(0).toBe(getChangedJsonFileMap().size)

    appJson.resizable = true
    updateAppJson(name, appJson)
    appJsonStr = getChangedJsonFileMap().get(name + '.json')
    expect(appJsonStr).toBe(JSON.stringify(appJson, null, 2))
    expect(0).toBe(getChangedJsonFileMap().size)

    const usingComponents = {
      'my-component': '/components/component-tag-name'
    }
    updateUsingComponents('app', usingComponents)
    appJsonStr = getChangedJsonFileMap().get(name + '.json')
    appJson.usingComponents = usingComponents
    expect(appJsonStr).toBe(JSON.stringify(appJson, null, 2))
  })

  it('generate page.json', () => {
    const name = 'page/index/index'
    const pageJson = {
      navigationBarBackgroundColor: '#ffffff'
    }
    updatePageJson(name, pageJson)
    let pageJsonStr = getChangedJsonFileMap().get(name + '.json')
    expect(pageJsonStr).toBe(JSON.stringify(pageJson, null, 2))
    expect(0).toBe(getChangedJsonFileMap().size)

    pageJson.navigationBarTextStyle = 'black'
    updatePageJson(name, pageJson)
    pageJsonStr = getChangedJsonFileMap().get(name + '.json')
    expect(pageJsonStr).toBe(JSON.stringify(pageJson, null, 2))
    expect(0).toBe(getChangedJsonFileMap().size)

    const usingComponents = {
      'my-component1': '/components/component-tag-name1'
    }
    updateUsingComponents(name, usingComponents)
    pageJsonStr = getChangedJsonFileMap().get(name + '.json')
    pageJson.usingComponents = usingComponents
    expect(pageJsonStr).toBe(JSON.stringify(pageJson, null, 2))
  })

  it('generate component.json', () => {
    const name = 'components/component-tag-name'
    let usingComponents = {
      'my-component': '/components/component-tag-name'
    }
    updateUsingComponents(name, usingComponents, 'Component')
    let componentJsonStr = getChangedJsonFileMap().get(name + '.json')
    expect(componentJsonStr).toBe(JSON.stringify({
      usingComponents,
      component: true
    }, null, 2))
    expect(0).toBe(getChangedJsonFileMap().size)

    usingComponents = {}
    updateUsingComponents(name, usingComponents, 'Component')
    componentJsonStr = getChangedJsonFileMap().get(name + '.json')
    expect(componentJsonStr).toBe(JSON.stringify({
      usingComponents,
      component: true
    }, null, 2))
    expect(0).toBe(getChangedJsonFileMap().size)
  })
})
