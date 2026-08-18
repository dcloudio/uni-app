const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
const OPTIONS_PAGE_PATH = '/pages/directive/v-if/v-if-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-if/v-if-composition'
describe('v-if', () => {
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor('text')
    let vIfShow = await page.$('#v-if-show')
    expect(await vIfShow.text()).toBe('show')
    
    const switchVIfBtn = await page.$('#switch-v-if-btn')
    await switchVIfBtn.tap()
    await page.waitFor(500)
    vIfShow = await page.$('#v-if-show')
    expect(vIfShow).toBeNull()
    
    await switchVIfBtn.tap()
    await page.waitFor(500)
    vIfShow = await page.$('#v-if-show')
    expect(await vIfShow.text()).toBe('show')
    
    const num = await page.$('#num')
    expect(await num.text()).toBe('1')
    let numVIf = await page.$('#num-v-if')
    expect(await numVIf.text()).toBe('v-if num = 1')
    let numVElseIf = await page.$('#num-v-else-if')
    expect(numVElseIf).toBeNull()
    let numVElse = await page.$('#num-v-else')
    expect(numVElse).toBeNull()
    
    const changeNumBtn = await page.$('#change-num-btn')
    await changeNumBtn.tap()
    await page.waitFor(500)
    
    expect(await num.text()).toBe('2')
    numVIf = await page.$('#num-v-if')
    expect(numVIf).toBeNull()
    numVElseIf = await page.$('#num-v-else-if')
    expect(await numVElseIf.text()).toBe('v-else-if num = 2')
    numVElse = await page.$('#num-v-else')
    expect(numVElse).toBeNull()
    
    await changeNumBtn.tap()
    await page.waitFor(500)
    
    expect(await num.text()).toBe('3')
    numVIf = await page.$('#num-v-if')
    expect(numVIf).toBeNull()
    numVElseIf = await page.$('#num-v-else-if')
    expect(numVElseIf).toBeNull()
    numVElse = await page.$('#num-v-else')
    expect(await numVElse.text()).toBe('v-else')
    
    await changeNumBtn.tap()
    await page.waitFor(500)
    
    expect(await num.text()).toBe('1')
    numVIf = await page.$('#num-v-if')
    expect(await numVIf.text()).toBe('v-if num = 1')
    numVElseIf = await page.$('#num-v-else-if')
    expect(numVElseIf).toBeNull()
    numVElse = await page.$('#num-v-else')
    expect(numVElse).toBeNull()
  }
  
  // 多层嵌套v-if测试
  const testNestedVIf = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
      
    // 1. view 普通版本测试
    const toggleViewNormalBtn2 = await page.$('#toggle-view-normal-child2')
    await toggleViewNormalBtn2.tap()
    await page.waitFor(300)
    let viewNormalChild2 = await page.$('#view-normal-child2')
    expect(viewNormalChild2).toBeNull()
    
    
    let viewNormalChild1 = await page.$('#view-normal-child1')
    expect(viewNormalChild1).not.toBeNull()
    await page.waitFor(300)
    const toggleViewNormalBtn = await page.$('#toggle-view-normal-child1')
    await toggleViewNormalBtn.tap()
    
    viewNormalChild1 = await page.$('#view-normal-child1')
    expect(viewNormalChild1).toBeNull()
    
    // 2. view 拍平版本测试
    let viewFlattenChild1 = await page.$('#view-flatten-child1')
    expect(viewFlattenChild1).not.toBeNull()
    
    const toggleViewFlattenBtn = await page.$('#toggle-view-flatten-child1')
    await toggleViewFlattenBtn.tap()
    await page.waitFor(300)
    viewFlattenChild1 = await page.$('#view-flatten-child1')
    expect(viewFlattenChild1).toBeNull()
    
    await toggleViewFlattenBtn.tap()
    await page.waitFor(300)
    viewFlattenChild1 = await page.$('#view-flatten-child1')
    expect(viewFlattenChild1).not.toBeNull()
    
    // 3. text 普通版本测试
    let textNormalChild1 = await page.$('#text-normal-child1')
    expect(textNormalChild1).not.toBeNull()
    
    const toggleTextNormalBtn = await page.$('#toggle-text-normal-child1')
    await toggleTextNormalBtn.tap()
    await page.waitFor(300)
    textNormalChild1 = await page.$('#text-normal-child1')
    expect(textNormalChild1).toBeNull()
    
    await toggleTextNormalBtn.tap()
    await page.waitFor(300)
    textNormalChild1 = await page.$('#text-normal-child1')
    expect(textNormalChild1).not.toBeNull()
    
    // 4. text 拍平版本测试
    let textFlattenChild1 = await page.$('#text-flatten-child1')
    expect(textFlattenChild1).not.toBeNull()
    
    const toggleTextFlattenBtn = await page.$('#toggle-text-flatten-child1')
    await toggleTextFlattenBtn.tap()
    await page.waitFor(300)
    textFlattenChild1 = await page.$('#text-flatten-child1')
    expect(textFlattenChild1).toBeNull()
    
    await toggleTextFlattenBtn.tap()
    await page.waitFor(300)
    textFlattenChild1 = await page.$('#text-flatten-child1')
    expect(textFlattenChild1).not.toBeNull()
    
    // 5. image 普通版本测试
    let imageNormalChild1 = await page.$('#image-normal-child1')
    expect(imageNormalChild1).not.toBeNull()
    
    const toggleImageNormalBtn = await page.$('#toggle-image-normal-child1')
    await toggleImageNormalBtn.tap()
    await page.waitFor(300)
    imageNormalChild1 = await page.$('#image-normal-child1')
    expect(imageNormalChild1).toBeNull()
    
    await toggleImageNormalBtn.tap()
    await page.waitFor(300)
    imageNormalChild1 = await page.$('#image-normal-child1')
    expect(imageNormalChild1).not.toBeNull()
    
    // 6. image 拍平版本测试
    let imageFlattenChild1 = await page.$('#image-flatten-child1')
    expect(imageFlattenChild1).not.toBeNull()
    
    const toggleImageFlattenBtn = await page.$('#toggle-image-flatten-child1')
    await toggleImageFlattenBtn.tap()
    await page.waitFor(300)
    imageFlattenChild1 = await page.$('#image-flatten-child1')
    expect(imageFlattenChild1).toBeNull()
    
    await toggleImageFlattenBtn.tap()
    await page.waitFor(300)
    imageFlattenChild1 = await page.$('#image-flatten-child1')
    expect(imageFlattenChild1).not.toBeNull()
    
    // 7. scroll-view 测试
    let scrollViewChild1 = await page.$('#scroll-view-child1')
    expect(scrollViewChild1).not.toBeNull()
    
    const toggleScrollViewBtn = await page.$('#toggle-scroll-view-child1')
    await toggleScrollViewBtn.tap()
    await page.waitFor(300)
    scrollViewChild1 = await page.$('#scroll-view-child1')
    expect(scrollViewChild1).toBeNull()
    
    await toggleScrollViewBtn.tap()
    await page.waitFor(300)
    scrollViewChild1 = await page.$('#scroll-view-child1')
    expect(scrollViewChild1).not.toBeNull()
    
    // 8. child 组件测试
    let childComponent1 = await page.$('#child-component1')
    expect(childComponent1).not.toBeNull()
    
    const toggleChildComponentBtn = await page.$('#toggle-child-component1')
    await toggleChildComponentBtn.tap()
    await page.waitFor(300)
    childComponent1 = await page.$('#child-component1')
    expect(childComponent1).toBeNull()
    let childComponent2 = await page.$('#child-component2')
    expect(childComponent2).toBeNull()
    
    await toggleChildComponentBtn.tap()
    await page.waitFor(300)
    childComponent1 = await page.$('#child-component1')
    expect(childComponent1).not.toBeNull()
    childComponent2 = await page.$('#child-component2')
    expect(childComponent2).not.toBeNull()
  }
  
  if (!isDom2) {
    it('v-if options API', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }
  
  it('v-if composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
    await testNestedVIf(COMPOSITION_PAGE_PATH)
  })


})