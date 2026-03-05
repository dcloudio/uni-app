const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

const HOME_PAGE_PATH = '/pages/index/index'
const MAIN_PAGE_PATH = '/pages/component-instance/props/page-props?name=page-props'
const OPTIONS_PAGE_PATH = '/pages/component-instance/props/page-props-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/props/page-props-composition'

describe('page props', () => {
	let page, originLifecycleNum
	it('page as component', async () => {
		page = await program.reLaunch(HOME_PAGE_PATH)
		page.waitFor('view')
		originLifecycleNum = await page.callMethod('getLifeCycleNum')
		await page.callMethod('setLifeCycleNum', 0)
		
    page = await program.reLaunch(MAIN_PAGE_PATH)
		page.waitFor('view')
    
		const optionsTitle =  await page.$('#page-props-options-title');
		expect(await optionsTitle.text()).toBe('page-props-options')
		
		const optionsFrom =  await page.$('#page-props-options-from');
		expect(await optionsFrom.text()).toBe('page')
		
		const optionsNumber =  await page.$('#page-props-options-number');
		expect(await optionsNumber.text()).toBe('10')
		
		const optionsBoolean =  await page.$('#page-props-options-boolean');
		expect(await optionsBoolean.text()).toBe('true')
		
		const optionsObject =  await page.$('#page-props-options-object');
		expect(await optionsObject.text()).toBe('{"c":10,"d":20}')
		
		const optionsArray =  await page.$('#page-props-options-array');
		expect(await optionsArray.text()).toBe('[4,5,6]')
		
		const compositionTitle =  await page.$('#page-props-composition-title');
		expect(await compositionTitle.text()).toBe('page-props-composition')
		
		const compositionFrom =  await page.$('#page-props-composition-from');
		expect(await compositionFrom.text()).toBe('page')
		
		const compositionNumber =  await page.$('#page-props-composition-number');
		expect(await compositionNumber.text()).toBe('10')
		
		const compositionBoolean =  await page.$('#page-props-composition-boolean');
		expect(await compositionBoolean.text()).toBe('true')
		
		const compositionObject =  await page.$('#page-props-composition-object');
		expect(await compositionObject.text()).toBe('{"c":10,"d":20}')
		
		const compositionArray =  await page.$('#page-props-composition-array');
		expect(await compositionArray.text()).toBe('[4,5,6]')
		
		const lifeCycleNum = await page.callMethod('getLifeCycleNum')
		if (isMP) {
			// options before create 1
			// options created 1
			// options before mount 1
			// options mounted 1
			// composition before mount 1
			// composition mounted 1
			// composition onLoad 15
			// composition onPageShow 10
			// composition onPageReady 10
			expect(lifeCycleNum).toBe(41)
		} else {
			// options before create 1
			// options created 1
			// options before mount 1
			// options mounted 1
			// composition before mount 1
			// composition mounted 1
			// composition onLoad 15
			// composition onPageShow 10
			// composition onPageReady 未触发
			expect(lifeCycleNum).toBe(31)
		}

		await page.callMethod('setLifeCycleNum', 0)
  })
	it('page props 选项式 API', async () => {
		const goOptionsPageBtn = await page.$('#go-options-page')
		await goOptionsPageBtn.tap()
		await page.waitFor(1000)
		page = await program.currentPage()
		page.waitFor('view')

    const optionsTitle =  await page.$('#page-props-options-title');
		expect(await optionsTitle.text()).toBe('page-props-options')
		
		const optionsFrom =  await page.$('#page-props-options-from');
		expect(await optionsFrom.text()).toBe('page-navigateTo')
		
		const optionsNumber =  await page.$('#page-props-options-number');
		expect(await optionsNumber.text()).toBe('1')
		
		const optionsBoolean =  await page.$('#page-props-options-boolean');
		expect(await optionsBoolean.text()).toBe('false')
		
		const optionsObject =  await page.$('#page-props-options-object');
		expect(await optionsObject.text()).toBe('{"a":1,"b":2}')
		
		const optionsArray =  await page.$('#page-props-options-array');
		expect(await optionsArray.text()).toBe('[1,2,3]')

		let lifeCycleNum = await page.callMethod('getLifeCycleNum')

		// composition onHide 10
		// options before create 1
		// options created 1
		// options before mount 1
		// options mounted 1
		// options onLoad 10
		// options onShow 10
		// options onReady 10
		expect(lifeCycleNum).toBe(44)

		await page.callMethod('setLifeCycleNum', 0)

		page = await program.navigateBack()
		await page.waitFor('view')

		lifeCycleNum = await page.callMethod('getLifeCycleNum')
		// options before unmount 1
		// options unmounted 1
		// options onUnload 10
		// composition onShow 10
		expect(lifeCycleNum).toBe(22)
		await page.callMethod('setLifeCycleNum', 0)
  });
  it('page props 组合式 API', async () => {
    const goCompositionPageBtn = await page.$('#go-composition-page')
		await goCompositionPageBtn.tap()
		await page.waitFor(1000)
		page = await program.currentPage()
		page.waitFor('view')

		const compositionTitle =  await page.$('#page-props-composition-title');
		expect(await compositionTitle.text()).toBe('page-props-composition')
		
		const compositionFrom =  await page.$('#page-props-composition-from');
		expect(await compositionFrom.text()).toBe('page-navigateTo')
		
		const compositionNumber =  await page.$('#page-props-composition-number');
		expect(await compositionNumber.text()).toBe('1')
		
		const compositionBoolean =  await page.$('#page-props-composition-boolean');
		expect(await compositionBoolean.text()).toBe('false')
		
		const compositionObject =  await page.$('#page-props-composition-object');
		expect(await compositionObject.text()).toBe('{"a":"a","b":"b"}')
		
		const compositionArray =  await page.$('#page-props-composition-array');
		expect(await compositionArray.text()).toBe('["a","b","c"]')

		let lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')

		// composition onHide 10
		// composition before mount 1
		// composition mounted 1
		// composition onLoad 10
		// composition onPageShow 10
		// composition onReady 10
		expect(lifeCycleNum).toBe(42)

		await page.callMethod('pageSetLifeCycleNum', 0)

		page = await program.navigateBack()
		await page.waitFor('view')

		lifeCycleNum = await page.callMethod('getLifeCycleNum')
		// composition before unmount 1
		// composition unmounted 1
		// composition onUnload 10
		// composition onShow 10
		expect(lifeCycleNum).toBe(22)
		await page.callMethod('setLifeCycleNum', 0)
	})
	
	afterAll(async () => {
		page = await program.reLaunch(HOME_PAGE_PATH)
		await page.waitFor('view')

		await page.callMethod('setLifeCycleNum', originLifecycleNum)
	})
})