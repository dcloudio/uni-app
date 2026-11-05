jest.setTimeout(30000)

const PAGE_PATH = '/pages/component/view/view'

// 此用例仅用于模拟点击关闭iOS弹窗逻辑，无实际意义
describe('view-test', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isIos = platformInfo.startsWith('ios')
  const isHarmony = platformInfo.startsWith('harmony')
  const isAndroid = platformInfo.startsWith('android')
  const isVapor = process.env.UNI_APP_X_DOM2 === "true"

  if (!isIos && !isHarmony && !isAndroid) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  })

  // 自定义组件 hover 属性透传：Android 已正常，iOS/Harmony 修复中
  // if (isAndroid) {
  //   it('child-hover-props-passthrough', async () => {
  //     const hoverChild = await page.$('#hover-child')
  //     await page.setData({
  //       data: {
  //         hover_class: true,
  //         start_time: 0,
  //         stay_time: 1000 * 10
  //       }
  //     })
  //     await page.waitFor(100)

  //     const win = await program.callUniMethod('getWindowInfo')
  //     const statusTop = win.statusBarHeight || (win.safeAreaInsets && win.safeAreaInsets.top) || 0
  //     // 元素位于 scroll-view 内，若在折叠线以下，先滚动到屏幕中部，保证可点击
  //     let rect = await page.callMethod('get_hover_child_rect')
  //     console.log('rect1', JSON.stringify(rect))
  //     const delta = Math.round(statusTop + 44 + rect.top + rect.height / 2 - win.windowHeight * 0.5)
  //     if (delta > 0) {
  //       await page.setData({ data: { scroll_top: delta } })
  //       await page.waitFor(300)
  //       rect = await page.callMethod('get_hover_child_rect')
  //       console.log('rect2', JSON.stringify(rect))
  //     }

  //     const x = Math.round(rect.left + rect.width / 2)
  //     const y = Math.round(statusTop + 44 + rect.top + rect.height / 2)
  //     await program.tap({ x, y, duration: 1000 })

  //     // 通过检查样式来判断 hover 相关属性是否透传到自定义组件根节点
  //     const bgColor = await hoverChild.style('background-color')
  //     const normalizedBgColor = bgColor.toLowerCase().replace(/\s/g, '')
  //     expect(['#179b16ff', 'rgb(23,155,22)']).toContain(normalizedBgColor)
  //   })
  // }

  if (isIos) {
    it('itemclick-event', async () => {
      // 关闭弹窗 iPhone Pro 机型
      await program.tap({
        x: 220,
        y: 516,
        duration: 100
      })

      // 关闭弹窗 iPhone ProMax 机型
      await program.tap({
        x: 220,
        y: 546,
        duration: 100
      })

      // 关闭弹窗 iPhone mini 机型
      await program.tap({
        x: 186,
        y: 463,
        duration: 100
      })
      expect(1).toBe(1)
    })
  }

  if (isHarmony) {
    it('hover-class', async () => {
      await page.setData({
        data:{
          hover_class: true,
          stay_time: 1000 * 10
        }
      })
      await page.waitFor(100)
      await program.tap({ x: 150, y: 600, duration: 2000 })
      // const systemInfo = await program.systemInfo()
      // const devicePixelRatio = systemInfo.devicePixelRatio
      // const positionX = systemInfo.screenWidth / 2
      // const positionY = systemInfo.screenWidth
      // await program.tap({
      //   x: positionX,
      //   y: positionY,
      //   duration: 5000
      // })

      // 通过检查样式来判断 hover-class 是否生效
      const viewChild1 = await page.$('#view-child1')
      const bgColor = await viewChild1.style('background-color')
      if (isVapor) {
        const normalizedBgColor = bgColor.toLowerCase().replace(/\s/g, '')
        expect(['#179b16ff', 'rgb(23,155,22)']).toContain(normalizedBgColor)
      } else {
        expect(bgColor).toBe('#179b16')
      }
    })
  }
})
