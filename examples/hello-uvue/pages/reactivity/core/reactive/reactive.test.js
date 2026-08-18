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
        
        const generic = await page.$('#generic')
        expect(await generic.text()).toBe('true')
        const updateGeneric = await page.$('#update-generic')
        await updateGeneric.tap()
        await page.waitFor(100)
        expect(await generic.text()).toBe('false')
		
		
		const reactiveStrId = await page.$('#reactive-str-id')
		expect(await reactiveStrId.text()).toBe('1')
		
		const reactiveStrBoolean = await page.$('#reactive-str-boolean')
		expect(await reactiveStrBoolean.text()).toBe('false')
		
		const reactiveStrAny = await page.$('#reactive-str-any')
		expect(await reactiveStrAny.text()).toBe('1')
		
		const reactiveStrArr = await page.$('#reactive-str-arr')
		expect(await reactiveStrArr.text()).toBe('1')
		
		const reactiveStrJson = await page.$('#reactive-str-json')
		expect(await reactiveStrJson.text()).toBe('car1')
		
		const reactiveStr = await page.$('#reactive-str')
		expect(await reactiveStr.text()).toBe('1')
    })

    // 复杂场景测试
    it('complex scenarios', async () => {
        // 1. 数组嵌套对象测试
        let arrWithObjName = await page.$('#arr-with-obj-name')
        expect(await arrWithObjName.text()).toBe('item1')
        
        let arrWithObjCount = await page.$('#arr-with-obj-count')
        expect(await arrWithObjCount.text()).toBe('0')
        
        let arrWithObjLength = await page.$('#arr-with-obj-length')
        expect(await arrWithObjLength.text()).toBe('2')
        
        const updateArrWithObjNameBtn = await page.$('#update-arr-with-obj-name-btn')
        await updateArrWithObjNameBtn.tap()
        await page.waitFor(300)
        arrWithObjName = await page.$('#arr-with-obj-name')
        expect(await arrWithObjName.text()).toContain('updated-item1-')
        
        const updateArrWithObjCountBtn = await page.$('#update-arr-with-obj-count-btn')
        await updateArrWithObjCountBtn.tap()
        await page.waitFor(300)
        arrWithObjCount = await page.$('#arr-with-obj-count')
        expect(await arrWithObjCount.text()).toBe('1')
        
        const pushArrWithObjBtn = await page.$('#push-arr-with-obj-btn')
        await pushArrWithObjBtn.tap()
        await page.waitFor(300)
        arrWithObjLength = await page.$('#arr-with-obj-length')
        expect(await arrWithObjLength.text()).toBe('3')
        
        // 2. 对象嵌套数组测试
        let objWithArrItems = await page.$('#obj-with-arr-items')
        expect(await objWithArrItems.text()).toBe('["a","b","c"]')
        
        let objWithArrItems0 = await page.$('#obj-with-arr-items-0')
        expect(await objWithArrItems0.text()).toBe('a')
        
        let objWithArrItemsLength = await page.$('#obj-with-arr-items-length')
        expect(await objWithArrItemsLength.text()).toBe('3')
        
        const updateObjWithArrItems0Btn = await page.$('#update-obj-with-arr-items-0-btn')
        await updateObjWithArrItems0Btn.tap()
        await page.waitFor(300)
        objWithArrItems0 = await page.$('#obj-with-arr-items-0')
        expect(await objWithArrItems0.text()).toContain('updated-')
        
        const pushObjWithArrItemsBtn = await page.$('#push-obj-with-arr-items-btn')
        await pushObjWithArrItemsBtn.tap()
        await page.waitFor(300)
        objWithArrItemsLength = await page.$('#obj-with-arr-items-length')
        expect(await objWithArrItemsLength.text()).toBe('4')
        
        // 3. JSON.parse + reactive 联合测试
        let jsonParsedUserName = await page.$('#json-parsed-user-name')
        expect(await jsonParsedUserName.text()).toBe('John')
        
        let jsonParsedUserAge = await page.$('#json-parsed-user-age')
        expect(await jsonParsedUserAge.text()).toBe('30')
        
        let jsonParsedTags = await page.$('#json-parsed-tags')
        expect(await jsonParsedTags.text()).toBe('["tag1","tag2"]')
        
        let jsonParsedItems0Title = await page.$('#json-parsed-items-0-title')
        expect(await jsonParsedItems0Title.text()).toBe('item1')
        
        const updateJsonParsedUserNameBtn = await page.$('#update-json-parsed-user-name-btn')
        await updateJsonParsedUserNameBtn.tap()
        await page.waitFor(300)
        jsonParsedUserName = await page.$('#json-parsed-user-name')
        expect(await jsonParsedUserName.text()).toContain('Updated-')
        
        const updateJsonParsedUserAgeBtn = await page.$('#update-json-parsed-user-age-btn')
        await updateJsonParsedUserAgeBtn.tap()
        await page.waitFor(300)
        jsonParsedUserAge = await page.$('#json-parsed-user-age')
        expect(await jsonParsedUserAge.text()).toBe('31')
        
        const pushJsonParsedTagsBtn = await page.$('#push-json-parsed-tags-btn')
        await pushJsonParsedTagsBtn.tap()
        await page.waitFor(300)
        jsonParsedTags = await page.$('#json-parsed-tags')
        expect(await jsonParsedTags.text()).toContain('tag2')
        
        const updateJsonParsedItems0TitleBtn = await page.$('#update-json-parsed-items-0-title-btn')
        await updateJsonParsedItems0TitleBtn.tap()
        await page.waitFor(300)
        jsonParsedItems0Title = await page.$('#json-parsed-items-0-title')
        expect(await jsonParsedItems0Title.text()).toContain('updated-item1-')
        
        // 4. 多层嵌套复杂结构测试
        let complexUsers0ProfileName = await page.$('#complex-users-0-profile-name')
        expect(await complexUsers0ProfileName.text()).toBe('Alice')
        
        let complexUsers0Hobbies0 = await page.$('#complex-users-0-hobbies-0')
        expect(await complexUsers0Hobbies0.text()).toBe('reading')
        
        let complexUsers0HobbiesLength = await page.$('#complex-users-0-hobbies-length')
        expect(await complexUsers0HobbiesLength.text()).toBe('2')
        
        let complexMetaCount = await page.$('#complex-meta-count')
        expect(await complexMetaCount.text()).toBe('1')
        
        const updateComplexUsers0ProfileNameBtn = await page.$('#update-complex-users-0-profile-name-btn')
        await updateComplexUsers0ProfileNameBtn.tap()
        await page.waitFor(300)
        complexUsers0ProfileName = await page.$('#complex-users-0-profile-name')
        expect(await complexUsers0ProfileName.text()).toContain('Updated-Alice-')
        
        const updateComplexUsers0Hobbies0Btn = await page.$('#update-complex-users-0-hobbies-0-btn')
        await updateComplexUsers0Hobbies0Btn.tap()
        await page.waitFor(300)
        complexUsers0Hobbies0 = await page.$('#complex-users-0-hobbies-0')
        expect(await complexUsers0Hobbies0.text()).toContain('updated-hobby-')
        
        const pushComplexUsers0HobbiesBtn = await page.$('#push-complex-users-0-hobbies-btn')
        await pushComplexUsers0HobbiesBtn.tap()
        await page.waitFor(300)
        complexUsers0HobbiesLength = await page.$('#complex-users-0-hobbies-length')
        expect(await complexUsers0HobbiesLength.text()).toBe('3')
        
        const updateComplexMetaCountBtn = await page.$('#update-complex-meta-count-btn')
        await updateComplexMetaCountBtn.tap()
        await page.waitFor(300)
        complexMetaCount = await page.$('#complex-meta-count')
        expect(await complexMetaCount.text()).toBe('2')
        
        // 5. watchEffect 追踪复杂结构
        let complexEffectCount = await page.$('#complex-effect-count')
        const initialComplexEffectCount = parseInt(await complexEffectCount.text())
        
        let jsonParsedEffectCount = await page.$('#json-parsed-effect-count')
        const initialJsonParsedEffectCount = parseInt(await jsonParsedEffectCount.text())
        
        const triggerComplexEffectBtn = await page.$('#trigger-complex-effect-btn')
        await triggerComplexEffectBtn.tap()
        await page.waitFor(300)
        complexEffectCount = await page.$('#complex-effect-count')
        expect(parseInt(await complexEffectCount.text())).toBeGreaterThan(initialComplexEffectCount)
        
        const triggerJsonParsedEffectBtn = await page.$('#trigger-json-parsed-effect-btn')
        await triggerJsonParsedEffectBtn.tap()
        await page.waitFor(300)
        jsonParsedEffectCount = await page.$('#json-parsed-effect-count')
        expect(parseInt(await jsonParsedEffectCount.text())).toBeGreaterThan(initialJsonParsedEffectCount)
        
        // 6. 数组嵌套对象 + forEach 响应式
        let arrWithObjForEachCount = await page.$('#arr-with-obj-forEach-count')
        const initialForEachCount = parseInt(await arrWithObjForEachCount.text())
        
        const updateArrWithObjForEachBtn = await page.$('#update-arr-with-obj-forEach-btn')
        await updateArrWithObjForEachBtn.tap()
        await page.waitFor(300)
        arrWithObjForEachCount = await page.$('#arr-with-obj-forEach-count')
        expect(parseInt(await arrWithObjForEachCount.text())).toBeGreaterThan(initialForEachCount)
        
        // 7. 对象嵌套数组 + JSON.parse 联合测试
        let jsonObjWithArrList = await page.$('#json-obj-with-arr-list')
        expect(await jsonObjWithArrList.text()).toContain('value1')
        expect(await jsonObjWithArrList.text()).toContain('value2')
        
        let jsonObjWithArrList0Value = await page.$('#json-obj-with-arr-list-0-value')
        expect(await jsonObjWithArrList0Value.text()).toBe('value1')
        
        const updateJsonObjWithArrList0ValueBtn = await page.$('#update-json-obj-with-arr-list-0-value-btn')
        await updateJsonObjWithArrList0ValueBtn.tap()
        await page.waitFor(300)
        jsonObjWithArrList0Value = await page.$('#json-obj-with-arr-list-0-value')
        expect(await jsonObjWithArrList0Value.text()).toContain('updated-value1-')
        
        const pushJsonObjWithArrListBtn = await page.$('#push-json-obj-with-arr-list-btn')
        await pushJsonObjWithArrListBtn.tap()
        await page.waitFor(300)
        jsonObjWithArrList = await page.$('#json-obj-with-arr-list')
        expect(await jsonObjWithArrList.text()).toContain('value3')
    })
})