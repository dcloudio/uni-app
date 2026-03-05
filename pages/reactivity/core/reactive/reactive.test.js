const PAGE_PATH = '/pages/reactivity/core/reactive/reactive'

describe('reactive', () => {
    let page = null
    beforeAll(async () => {
        page = await program.reLaunch(PAGE_PATH)
        await page.waitFor('view')
    })
    it('basic', async () => {
        const count = await page.$('#count')
        expect(await count.text()).toBe('0')

        const objStr = await page.$('#obj-str')
        expect(await objStr.text()).toBe('default str')

        const objNum = await page.$('#obj-num')
        expect(await objNum.text()).toBe('0')

        const objArr = await page.$('#obj-arr')
        expect(await objArr.text()).toBe('["a","b","c"]')

        const arr1 = await page.$('#arr1')
        expect(await arr1.text()).toBe('[]')

        const updateCountBtn = await page.$('#update-count-btn')
        await updateCountBtn.tap()
        await page.waitFor(500)
        expect(await count.text()).toBe('1')

        const updateObjStrBtn = await page.$('#update-obj-str-btn')
        await updateObjStrBtn.tap()
        await page.waitFor(500)
        expect(await objStr.text()).toBe('new str')

        const updateObjNumBtn = await page.$('#update-obj-num-btn')
        await updateObjNumBtn.tap()
        await page.waitFor(500)
        expect(await count.text()).toBe('2')
        expect(await objNum.text()).toBe('2')

        const updateObjArrBtn = await page.$('#update-obj-arr-btn')
        await updateObjArrBtn.tap()
        await page.waitFor(500)
        expect(await objArr.text()).toBe('["a","b","c","d"]')

        const count1 = await page.$('#count1')
        expect(await count1.text()).toBe('1')

        const updateObj_A_B_C_Btn = await page.$('#update-obj1-a-b-c-btn')
        await updateObj_A_B_C_Btn.tap()
        await page.waitFor(100)
        expect(await count1.text()).toBe('2')

        const updateArr1Btn = await page.$('#update-arr1-btn')
        await updateArr1Btn.tap()
        await page.waitFor(500)
        expect(await arr1.text()).toBe(JSON.stringify([1, 2, 3]))

        const updateArr1ReactiveBtn = await page.$('#update-arr1-reactive-btn')
        await updateArr1ReactiveBtn.tap()
        await page.waitFor(100)
        expect(await arr1.text()).toBe(JSON.stringify([4, 5, 6]))
        
        const arr2 = await page.$('#arr2')
        expect(await arr2.text()).toBe('1')
        const updateArr2ForEachEffectBtn = await page.$('#update-arr2-forEach-effect-btn')
        await updateArr2ForEachEffectBtn.tap()
        await page.waitFor(100)
        expect(await arr2.text()).toBe('2')
        
        const arr3 = await page.$('#arr3')
        expect(await arr3.text()).toBe(JSON.stringify([1, 2, 3, 4, 5].reverse()))
        
		const arr4 = await page.$('#arr4')
		expect(await arr4.text()).toBe(JSON.stringify([5, 3, 4, 1, 2].sort()))
		const updateArr4Btn = await page.$('#update-arr4-btn')
		await updateArr4Btn.tap()
		await page.waitFor(100)
		expect(await arr4.text()).toBe(JSON.stringify([5, 3, 4, 1, 2, 6].sort()))
		
		const arr5 = await page.$('#arr5')
		expect(await arr5.text()).toBe(JSON.stringify({"includes":[true,true],"indexOf":[0,0],"lastIndexOf":[0,0],}))
		
        const map2 = await page.$('#map2')
        expect(await map2.text()).toBe('1')
        const updateMap2ForEachEffectBtn = await page.$('#update-map2-forEach-effect-btn')
        await updateMap2ForEachEffectBtn.tap()
        await page.waitFor(100)
        expect(await map2.text()).toBe('2')
        
        const map3 = await page.$('#map3')
        expect(await map3.text()).toBe('1')
        const updateMap3ForOfEffectBtn = await page.$('#update-map3-forOf-effect-btn')
        await updateMap3ForOfEffectBtn.tap()
        await page.waitFor(100)
        expect(await map3.text()).toBe('2')
        
        const set2 = await page.$('#set2')
        expect(await set2.text()).toBe('1')
        const updateSet2ForEachEffectBtn = await page.$('#update-set2-forEach-effect-btn')
        await updateSet2ForEachEffectBtn.tap()
        await page.waitFor(100)
        expect(await set2.text()).toBe('2')
        
        const set3 = await page.$('#set3')
        expect(await set3.text()).toBe('1')
        const updateSet3ForOfEffectBtn = await page.$('#update-set3-forOf-effect-btn')
        await updateSet3ForOfEffectBtn.tap()
        await page.waitFor(100)
        expect(await set3.text()).toBe('2')
    })
})