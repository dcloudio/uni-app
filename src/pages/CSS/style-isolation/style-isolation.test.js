const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"
const PAGE_PATH = '/pages/CSS/style-isolation/style-isolation'

describe('style-isolation', () => {

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('screenshot', async () => {
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  });

  it('测试组件的根节点为二级组件时 样式传递', async () => {
    const levelEl = await page.$('.level-child-class')
		const levelElStyle = await levelEl.style('background-color')
    if(isApp){
      expect(levelElStyle).toBe(isDom2? '#00AAFFFF' : '#00aaff')
    }else{
      expect(levelElStyle).toBe('rgb(0, 170, 255)')
    }
  })

  it('styleIsolation-isolated模式 - 全隔离', async () => {
    const compIsolatedEl = await page.$('.comp-isolated')
    // 样式全隔离，预期组件自身样式紫色
    const comBoxEl = await compIsolatedEl.$('.com-box')
    const comBoxStyle = await comBoxEl.style('background-color')
    if(isApp){
      expect(comBoxStyle).toBe(isDom2? '#D9D1FFFF' : '#d9d1ff')
    }else{
      expect(comBoxStyle).toBe('rgb(217, 209, 255)')
    }
    // 验证全局样式无效，预期组件默认字体大小16px
    const globalTestEl = await compIsolatedEl.$('.global-text')
    const globalTestStyle = await globalTestEl.style('font-size')
    // expect(globalTestStyle).toBe('16px')
    // TODO：临时注释，调整写法，有差异，web/MP：16px，ios/harmony：16（ios端是number，其他是string）
    // expect(globalTestStyle).toBe('16px')
    if(!isAndroid){
      expect([16,'16','16px']).toContain(globalTestStyle)
    }
  })

  it('styleIsolation-app模式 - 受全局样式影响', async () => {
    const compAppEl = await page.$('.comp-app')
    // 优先级：全局样式 < 自身样式，预期组件自身样式紫色
    const comBoxEl = await compAppEl.$('.com-box')
    const comBoxStyle = await comBoxEl.style('background-color')
    if(isApp){
      expect(comBoxStyle).toBe(isDom2? '#D9D1FFFF' : '#d9d1ff')
    }else{
      expect(comBoxStyle).toBe('rgb(217, 209, 255)')
    }
    // 验证，全局样式有效(字体的粗细bold与 700 等值，大小18px)
    const globalTestEl = await compAppEl.$('.global-text')
    const globalTestWeight = await globalTestEl.style('font-weight')
    const globalTestSize = await globalTestEl.style('font-size')
    expect(['700','bold']).toContain(globalTestWeight)
    // TODO：临时注释，有差异，安卓端为空，web/MP：16px，ios/harmony：16
    // expect(globalTestSize).toBe('18px')
    if(!isAndroid){
      expect([18,'18','18px']).toContain(globalTestSize)
    }
    // 验证，页面样式无效，默认字体大小16px
    const pageTestEl = await compAppEl.$('.page-text')
    const pageTestSize = await pageTestEl.style('font-size')
    // expect(pageTestSize).toBe('16px')
    if(!isAndroid){
      expect([16,'16','16px']).toContain(pageTestSize)
    }
  })

  it('styleIsolation-app-and-page模式 - 受全局和页面样式影响', async () => {
    const compAppAndPageEl = await page.$('.comp-app-and-page')
    // 优先级：全局样式 < 组件自身样式 < 页面样式，预期组件应用页面样式（绿色）优先级最高
    const comBoxEl = await compAppAndPageEl.$('.com-box')
    const comBoxStyle = await comBoxEl.style('background-color')
    // app dom2  #E8F5E9FF
    if(isApp){
      expect(comBoxStyle).toBe(isDom2? '#E8F5E9FF' : '#e8f5e9')
    }else{
      expect(comBoxStyle).toBe('rgb(232, 245, 233)')
    }
    // 验证，全局样式有效(字体的粗细bold，大小18px)
    const globalTestEl = await compAppAndPageEl.$('.global-text')
    const globalTestSize = await globalTestEl.style('font-size')
    // TODO：临时注释，有差异，web/MP：16px，ios/harmony：16
    // expect(globalTestSize).toBe('18px')
    if(!isAndroid){
      expect([18,'18','18px']).toContain(globalTestSize)
    }
    // 验证，页面样式有效，字体大小14px
    const pageTestEl = await compAppAndPageEl.$('.page-text')
    const pageTestSize = await pageTestEl.style('font-size')
    // expect(pageTestSize).toBe('14px')
    if(!isAndroid){
      expect([14,'14','14px']).toContain(pageTestSize)
    }
  })

});
