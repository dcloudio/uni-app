jest.setTimeout(30000)

const OPTIONS_PAGE_PATH = '/pages/app-instance/globalProperties/globalProperties-options'
const COMPOSITION_PAGE_PATH = '/pages/app-instance/globalProperties/globalProperties-composition'

describe('globalProperties', () => {
	let page = null
	const testGlobalProperties = async (page) => {
		let data = await page.data()
    await page.waitFor(1000)
		expect(data.myGlobalProperties.str).toBe('default string')
		expect(data.myGlobalProperties.num).toBe(0)
		expect(data.myGlobalProperties.bool).toBe(false)
		expect(data.myGlobalProperties.obj).toEqual({
			bool: false,
			num: 0,
			str: 'default globalProperties obj string'
		})
		expect(data.myGlobalProperties.arr).toEqual([])
		expect(data.myGlobalProperties.set).toEqual([])
		expect(data.myGlobalProperties.map).toEqual({})
		expect(data.myGlobalProperties.reactiveObj).toEqual({
			str: 'default reactive string',
			num: 0,
			bool: false
		})
		expect(data.myGlobalProperties.globalPropertiesFnRes).toBe('globalPropertiesStr: default string, globalPropertiesNum: 0')
		await page.callMethod('updateGlobalProperties')
		data = await page.data()
		expect(data.myGlobalProperties.str).toBe('new string')
		expect(data.myGlobalProperties.num).toBe(100)
		expect(data.myGlobalProperties.bool).toBe(true)
		expect(data.myGlobalProperties.obj).toEqual({
			bool: true,
			num: 100,
			str: 'new globalProperties obj string'
		})
		expect(data.myGlobalProperties.arr).toEqual([1, 2, 3])
		expect(data.myGlobalProperties.set).toEqual(['a', 'b', 'c'])
		expect(data.myGlobalProperties.map).toEqual({
			'a': 1,
			'b': 2,
			'c': 3
		})
		expect(data.myGlobalProperties.reactiveObj).toEqual({
			str: 'new reactive string',
			num: 200,
			bool: true
		})
		expect(data.myGlobalProperties.globalPropertiesFnRes).toBe('globalPropertiesStr: new string, globalPropertiesNum: 100')
	}
	const testScreenShot = async (page) => {
		await page.waitFor(500)
		const image = await program.screenshot({
			fullPage: true
		});
		expect(image).toSaveImageSnapshot();
	}
	
	it('globalProperties options API', async () => {
		page = await program.reLaunch(OPTIONS_PAGE_PATH)
		await page.waitFor('view')
		
		await testGlobalProperties(page)
	})
	it('screenshot options API', async () => {
		await testScreenShot(page)
	})
	
	it('globalProperties composition API', async () => {
		page = await program.reLaunch(COMPOSITION_PAGE_PATH)
    // 等待 globalProperties-options resetGlobalProperties 完成
		await page.waitFor(1500)
		
		await testGlobalProperties(page)
	})
	it('screenshot composition API', async () => {
		await testScreenShot(page)
	})
})