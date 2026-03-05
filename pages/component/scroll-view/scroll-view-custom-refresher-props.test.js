const PAGE_PATH = '/pages/component/scroll-view/scroll-view-custom-refresher-props'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isiOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')

describe('scroll-view-custom-refresher-props-test', () => {

  //TODO：临时方案
  if (isWeb || isMP) {
    // 不支持program.swipe
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
  });

  async function getPageData(dataKey) {
    return await page.data('data.' + dataKey)
  }

  /**
   * 等待刷新完成（通过轮询状态）
   * @param {string} refreshingKey - refreshing 状态的 key（如 'refreshing1'）
   * @param {string} listCountKey - listCount 的 key（如 'listCount1'）
   * @param {number} expectedIncrement - 预期增加的数量（默认 5）
   * @param {number} timeout - 超时时间（默认 6000ms）
   * @returns {Promise<boolean>} 返回是否刷新成功
   */
  async function waitForRefreshComplete(refreshingKey, listCountKey, expectedIncrement = 5, timeout = 6000) {
    const initialCount = await getPageData(listCountKey)
    const startTime = Date.now()
    let hasStarted = false
    let lastRefreshing = null
    let lastCount = initialCount
    let pollCount = 0

    // 轮询间隔（指数退避，避免高频 IPC）
    let interval = 200

    console.log(`[waitForRefreshComplete] 开始等待刷新完成: ${refreshingKey}, 初始数量: ${initialCount}`)

    while (Date.now() - startTime < timeout) {
      pollCount++
      const refreshing = await getPageData(refreshingKey)
      const currentCount = await getPageData(listCountKey)

      console.log(`[waitForRefreshComplete] 第 ${pollCount} 次轮询 - refreshing: ${refreshing}, count: ${currentCount}, hasStarted: ${hasStarted}, interval: ${interval}ms`)

      lastRefreshing = refreshing
      lastCount = currentCount

      if (refreshing) {
        hasStarted = true
      }

      if (hasStarted && !refreshing && currentCount >= initialCount + expectedIncrement) {
        const elapsedTime = Date.now() - startTime
        console.log(`[waitForRefreshComplete] 刷新成功！共轮询 ${pollCount} 次，耗时 ${elapsedTime}ms`)
        return true
      }

      await page.waitFor(interval)
      interval = Math.min(interval * 1.5, 800)
    }

    // 超时后返回 false
    const elapsedTime = Date.now() - startTime
    console.log(`[waitForRefreshComplete] 刷新超时！共轮询 ${pollCount} 次，耗时 ${elapsedTime}ms，最终状态: refreshing=${lastRefreshing}, count=${lastCount}`)
    return false
  }

  /**
   * 执行下拉刷新操作
   * @param {string} elementId - scroll-view 的id
   * @param {number} pullDistance - 下拉距离
   * @param {number} offsetY - 在scroll-view内部的Y偏移量（默认10，从顶部稍微往下一点开始滑动）
   */
  async function performPullRefresh(elementId, pullDistance = 150, offsetY = 10) {
    const rect = await page.callMethod('getBoundingClientRectForRefreshing', elementId);
    console.log(`Refresher [${elementId}] rect:`, JSON.stringify(rect));

    const windowInfo = await program.callUniMethod('getWindowInfo')

    // 确保坐标为整数（IDB 要求整数坐标）
    const startX = Math.round(rect.left + rect.width / 2);
    const startY = Math.round(rect.top + offsetY + windowInfo.safeAreaInsets.top + 44);
    const endY = Math.round(startY + pullDistance);

    console.log(`Refresher [${elementId}] swipe from (${startX}, ${startY}) to (${startX}, ${endY})`);

    await program.swipe({
      startPoint: {
        x: startX,
        y: startY
      },
      endPoint: {
        x: startX,
        y: endY
      },
      duration: 500
    })

    await page.waitFor(300)
  }

  async function screenshot() {
    await page.waitFor(500)
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const image = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44
      }
    })
    expect(image).toSaveImageSnapshot()
  }

  it('test-initial-screenshot', async () => {
    await page.waitFor(500)
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const image = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44
      }
    })
    expect(image).toSaveImageSnapshot()
  })

  // ==================== 第1个下拉刷新功能测试 ====================
  it('test-refresher-1-pull-to-refresh', async () => {
    const initialCount = await getPageData('listCount1')

    await performPullRefresh('refreshing1', 180)

    // 使用轮询等待刷新完成
    const refreshSuccess = await waitForRefreshComplete('refreshing1', 'listCount1', 5, 6000)
    expect(refreshSuccess).toBe(true)

    // 验证列表数量增加了5个
    const finalCount = await getPageData('listCount1')
    expect(finalCount).toBe(initialCount + 5)
  })

  // ==================== 第2个下拉刷新功能测试 ====================
  it('test-refresher-2-pull-to-refresh', async () => {
    const initialCount = await getPageData('listCount2')

    await performPullRefresh('refreshing2', 180)

    const refreshSuccess = await waitForRefreshComplete('refreshing2', 'listCount2', 5, 6000)
    expect(refreshSuccess).toBe(true)

    const finalCount = await getPageData('listCount2')
    expect(finalCount).toBe(initialCount + 5)
  })

  // ==================== 第3个下拉刷新功能测试 ====================
  it('test-refresher-3-pull-to-refresh', async () => {
    const initialCount = await getPageData('listCount3')

    await performPullRefresh('refreshing3', 180)

    const refreshSuccess = await waitForRefreshComplete('refreshing3', 'listCount3', 5, 6000)
    expect(refreshSuccess).toBe(true)

    const finalCount = await getPageData('listCount3')
    expect(finalCount).toBe(initialCount + 5)
  })

  // ==================== 第4个下拉刷新功能测试 ====================
  it('test-refresher-4-pull-to-refresh', async () => {
    const initialCount = await getPageData('listCount4')

    await performPullRefresh('refreshing4', 180)

    const refreshSuccess = await waitForRefreshComplete('refreshing4', 'listCount4', 5, 6000)
    expect(refreshSuccess).toBe(true)

    const finalCount = await getPageData('listCount4')
    expect(finalCount).toBe(initialCount + 5)
  })

  // ==================== 测试部分下拉（不触发刷新）====================
  it('test-partial-pull-not-trigger-refresh', async () => {
    // 记录初始列表数量
    const initialCount = await getPageData('listCount1')

    // 验证初始pullingDistance为0
    const initialDistance = await getPageData('pullingDistance1')
    expect(initialDistance).toBe(0)

    // 执行部分下拉 (只下拉30px，小于threshold 45，不应触发刷新)
    await performPullRefresh('refreshing1', 30)

    await page.waitFor(1000)

    // 验证列表数量没有变化（因为没有触发刷新）
    const finalCount = await getPageData('listCount1')
    expect(finalCount).toBe(initialCount) // 数量应该保持不变

    // 验证pullingDistance已重置为0
    const finalDistance = await getPageData('pullingDistance1')
    expect(finalDistance).toBe(0)
  })
})
