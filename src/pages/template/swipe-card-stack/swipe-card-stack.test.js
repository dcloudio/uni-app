jest.setTimeout(60000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web') || platformInfo.startsWith('h5')
const isMP = platformInfo.startsWith('mp')

const PAGE_PATH = '/pages/template/swipe-card-stack/swipe-card-stack'
const WAIT_FOR_CARD_INIT = 800
const WAIT_FOR_DRAG_RENDER = 120
const WAIT_FOR_RELEASE = 800

describe('template-swipe-card-stack', () => {
  // TODO: 小程序端待补充适配后放开。
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let windowInfo

  async function openPage() {
    try {
      page = await program.reLaunch(PAGE_PATH)
    } catch (error) {
      if (!isWeb) {
        throw error
      }
      page = await program.currentPage()
    }
    await page.waitFor('.card')
    await page.waitFor(WAIT_FOR_CARD_INIT)
  }

  async function getCards() {
    const cards = await page.$$('.card')
    expect(cards.length).toBe(3)
    return cards
  }

  async function getCardInfos() {
    const cards = await getCards()
    const infos = []
    for (let i = 0; i < cards.length; i++) {
      const rect = await cards[i].offset()
      const size = await cards[i].size()
      infos.push({
        card: cards[i],
        index: i,
        top: rect.top,
        left: rect.left,
        width: size.width,
        height: size.height
      })
    }
    return infos
  }

  async function getTopCardInfo() {
    const infos = await getCardInfos()
    infos.sort((a, b) => a.top - b.top)
    return infos[0]
  }

  async function getBackCardInfo() {
    const infos = await getCardInfos()
    infos.sort((a, b) => b.top - a.top)
    return infos[0]
  }

  async function getTopCardIndex() {
    return (await getTopCardInfo()).index
  }

  function createTouch(x, y) {
    const pointX = Math.round(x)
    const pointY = Math.round(y)
    return {
      identifier: 1,
      pageX: pointX,
      pageY: pointY,
      clientX: pointX,
      clientY: pointY,
      screenX: pointX,
      screenY: pointY
    }
  }

  function createTouchEvent(x, y, isEnd = false) {
    const touch = createTouch(x, y)
    return {
      touches: isEnd ? [] : [touch],
      changedTouches: [touch]
    }
  }

  async function dragCard(cardInfo, offsetX, offsetY = 0, options = {}) {
    const startX = cardInfo.left + cardInfo.width / 2
    const startY = cardInfo.top + Math.min(220, cardInfo.height / 2)
    const steps = options.steps || 4
    const interval = options.interval || 80

    await cardInfo.card.touchstart(createTouchEvent(startX, startY))
    for (let i = 1; i <= steps; i++) {
      const nextX = startX + offsetX * i / steps
      const nextY = startY + offsetY * i / steps
      await cardInfo.card.touchmove(createTouchEvent(nextX, nextY))
      await page.waitFor(interval)
    }

    if (options.release !== false) {
      await cardInfo.card.touchend(createTouchEvent(startX + offsetX, startY + offsetY, true))
      await page.waitFor(WAIT_FOR_RELEASE)
    }

    return cardInfo.card
  }

  async function dragTopCard(offsetX, offsetY = 0, options = {}) {
    return await dragCard(await getTopCardInfo(), offsetX, offsetY, options)
  }

  function getTransformTranslate(transform) {
    const translateMatched = transform.match(/translate(?:3d)?\(\s*([-0-9.]+)px(?:\s*,\s*([-0-9.]+)px)?/)
    if (translateMatched != null) {
      return {
        x: parseFloat(translateMatched[1] || '0'),
        y: parseFloat(translateMatched[2] || '0')
      }
    }

    const matrix3dMatched = transform.match(/matrix3d\(([^)]+)\)/)
    if (matrix3dMatched != null) {
      const matrixValues = matrix3dMatched[1].split(',').map((value) => parseFloat(value.trim()))
      return {
        x: matrixValues[12] || 0,
        y: matrixValues[13] || 0
      }
    }

    const matrixMatched = transform.match(/matrix\(([^)]+)\)/)
    expect(matrixMatched).not.toBeNull()
    const matrixValues = matrixMatched[1].split(',').map((value) => parseFloat(value.trim()))
    return {
      x: matrixValues[4] || 0,
      y: matrixValues[5] || 0
    }
  }

  function expectTransformMoved(transform) {
    const translate = getTransformTranslate(transform)
    expect(Math.abs(translate.x) + Math.abs(translate.y)).toBeGreaterThan(0)
  }

  async function expectCardIsDragging(card) {
    await page.waitFor(WAIT_FOR_DRAG_RENDER)
    const transform = await card.style('transform')
    expectTransformMoved(transform)
  }

  async function expectCardDraggedBeyondSwitchThreshold(card, direction) {
    await page.waitFor(WAIT_FOR_DRAG_RENDER)
    const transform = await card.style('transform')
    const translateX = getTransformTranslate(transform).x
    const threshold = windowInfo.screenWidth / 10
    if (direction > 0) {
      expect(translateX).toBeGreaterThan(threshold)
    } else {
      expect(translateX).toBeLessThan(-threshold)
    }
  }

  async function screenShot() {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  }

  beforeAll(async () => {
    windowInfo = await program.callUniMethod('getWindowInfo')
  })

  beforeEach(async () => {
    await openPage()
  })

  it('renders card stack', async () => {
    const cards = await getCards()
    const contents = await page.$$('.card-content')
    expect(contents.length).toBe(3)

    for (let i = 0; i < cards.length; i++) {
      const rect = await cards[i].offset()
      const size = await cards[i].size()
      expect(rect.left).toBeGreaterThanOrEqual(0)
      expect(rect.top).toBeGreaterThanOrEqual(0)
      expect(size.width).toBeGreaterThan(0)
      expect(size.height).toBeGreaterThan(0)
    }
  })

  it('does not move a back card when dragging behind the top card', async () => {
    const backCardInfo = await getBackCardInfo()
    const beforeTransform = await backCardInfo.card.style('transform')

    await dragCard(backCardInfo, Math.round(windowInfo.screenWidth * 0.35), 0, { release: false })

    expect(await backCardInfo.card.style('transform')).toBe(beforeTransform)
    await screenShot()
  })

  it('keeps current card after a short drag and release', async () => {
    const topCardIndexBefore = await getTopCardIndex()
    const draggedCard = await dragTopCard(20, 0, { release: false })

    await expectCardIsDragging(draggedCard)
    await screenShot()
    await draggedCard.touchend(createTouchEvent(windowInfo.screenWidth / 2 + 20, windowInfo.screenHeight / 2, true))
    await page.waitFor(WAIT_FOR_RELEASE)

    expect(await getTopCardIndex()).toBe(topCardIndexBefore)
    expect((await getCards()).length).toBe(3)
  })

  it('right drag feedback screenshot', async () => {
    const topCardIndexBefore = await getTopCardIndex()
    const draggedCard = await dragTopCard(Math.round(windowInfo.screenWidth * 0.45), 0, { release: false })

    await expectCardIsDragging(draggedCard)
    await screenShot()

    expect(await getTopCardIndex()).toBe(topCardIndexBefore)
    expect((await getCards()).length).toBe(3)
  })

  it('right drag reaches switch threshold', async () => {
    const topCardIndexBefore = await getTopCardIndex()
    const draggedCard = await dragTopCard(Math.round(windowInfo.screenWidth * 0.45), 0, { release: false })

    await expectCardDraggedBeyondSwitchThreshold(draggedCard, 1)
    expect(await getTopCardIndex()).toBe(topCardIndexBefore)
    expect((await getCards()).length).toBe(3)
  })

  it('left drag feedback screenshot', async () => {
    const topCardIndexBefore = await getTopCardIndex()
    const draggedCard = await dragTopCard(Math.round(windowInfo.screenWidth * -0.45), 0, { release: false })

    await expectCardIsDragging(draggedCard)
    await screenShot()

    expect(await getTopCardIndex()).toBe(topCardIndexBefore)
    expect((await getCards()).length).toBe(3)
  })

  it('left drag reaches switch threshold', async () => {
    const topCardIndexBefore = await getTopCardIndex()
    const draggedCard = await dragTopCard(Math.round(windowInfo.screenWidth * -0.45), 0, { release: false })

    await expectCardDraggedBeyondSwitchThreshold(draggedCard, -1)
    expect(await getTopCardIndex()).toBe(topCardIndexBefore)
    expect((await getCards()).length).toBe(3)
  })
})
