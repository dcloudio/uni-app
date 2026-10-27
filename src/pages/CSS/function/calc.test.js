const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isApp = platformInfo.startsWith('android') || platformInfo.startsWith('ios') || platformInfo.startsWith('harmony')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/CSS/function/calc'

jest.setTimeout(30000)

function expectNear(actual, expected, delta = 1) {
  expect(Math.abs(Math.round(actual) - Math.round(expected))).toBeLessThanOrEqual(delta)
}

function expectNumberNear(actual, expected, delta = 1) {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(delta)
}

function expectStylePx(actual, expected) {
  expectNear(parseFloat(actual), expected)
}

function expectStyleNumber(actual, expected, delta = 0.01) {
  const value = parseFloat(actual)
  expect(isNaN(value)).toBe(false)
  expectNumberNear(value, expected, delta)
}

function extractPxValues(actual) {
  const values = []
  const regex = /(-?\d+(?:\.\d+)?)px/g
  let match = regex.exec(actual)
  while (match != null) {
    values.push(parseFloat(match[1]))
    match = regex.exec(actual)
  }
  return values
}

function expectStylePxValues(actual, expectedValues) {
  const values = extractPxValues(actual)
  expect(values.length).toBeGreaterThanOrEqual(expectedValues.length)
  expectedValues.forEach((expected, index) => {
    expectNumberNear(values[index], expected)
  })
}

async function expectElementStylePx(page, selector, property, expected) {
  const element = await page.$(selector)
  const actual = await element.style(property)
  const expectedValues = Array.isArray(expected) ? expected : [expected]
  expectStylePxValues(actual, expectedValues)
  return element
}

describe('css-function-calc', () => {
  if (!isApp || !isVapor) {
    it('app vapor only', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.callMethod('jest_showCalcTestElements')
    await page.waitFor(500)
  })

  it('renders calc values on automation-only test element', async () => {
    const calcTarget = await page.$('.jest-calc-target')
    const size = await calcTarget.size()

    expectNear(size.width, 120)
    expectNear(size.height, 40)
    expectStylePx(await calcTarget.style('padding-top'), 10)
    expectStylePx(await calcTarget.style('padding-right'), 10)
    expectStylePx(await calcTarget.style('padding-bottom'), 10)
    expectStylePx(await calcTarget.style('padding-left'), 10)
    expectStylePx(await calcTarget.style('margin-top'), 14)
    expectStylePx(await calcTarget.style('margin-right'), 12)
    expectStylePx(await calcTarget.style('margin-bottom'), 12)
    expectStylePx(await calcTarget.style('margin-left'), 12)

    await page.callMethod('jest_setCalcTestWidth', 20)
    await page.waitFor(500)

    const updatedSize = await calcTarget.size()
    expectNear(updatedSize.width, 20)
  })

  it('renders calc values on flex and border properties', async () => {
    await expectElementStylePx(page, '.jest-calc-border-top-width', 'border-top-width', 5)
    await expectElementStylePx(page, '.jest-calc-border-right-width', 'border-right-width', 6)
    await expectElementStylePx(page, '.jest-calc-border-bottom-width', 'border-bottom-width', 7)
    await expectElementStylePx(page, '.jest-calc-border-left-width', 'border-left-width', 8)
  })

  it('renders calc values on radius, transform, shadow, filter and opacity properties', async () => {
    await expectElementStylePx(page, '.jest-calc-border-radius', 'border-radius', 30)
    await expectElementStylePx(page, '.jest-calc-border-top-left-radius', 'border-top-left-radius', 18)
    await expectElementStylePx(page, '.jest-calc-border-top-right-radius', 'border-top-right-radius', 19)
    await expectElementStylePx(page, '.jest-calc-border-bottom-right-radius', 'border-bottom-right-radius', 20)
    await expectElementStylePx(page, '.jest-calc-border-bottom-left-radius', 'border-bottom-left-radius', 21)
    await expectElementStylePx(page, '.jest-calc-transform', 'transform', 30)
    await expectElementStylePx(page, '.jest-calc-transform-origin', 'transform-origin', [30, 15])
    await expectElementStylePx(page, '.jest-calc-box-shadow', 'box-shadow', [5, 5, 6])
    await expectElementStylePx(page, '.jest-calc-text-shadow', 'text-shadow', [5, 5])
    await expectElementStylePx(page, '.jest-calc-backdrop-filter', 'backdrop-filter', 6)

    const opacity = await page.$('.jest-calc-opacity')
    expectStyleNumber(await opacity.style('opacity'), 0.7)
  })
})
