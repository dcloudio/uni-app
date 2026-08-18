const PAGE_PATH_COMPOSITION = '/pages/template-syntax/text-interpolation/text-interpolation-composition'
const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

describe('text-interpolation', () => {
    const testTextInterpolation = async (pagePath) => {
        const page = await program.reLaunch(pagePath)
        await page.waitFor('view')
        const msg = `hello world`
        for (let i = 1; i < 5; i++) {
            const textElem = await page.$('#text' + i)
            expect(await textElem.text()).toBe(msg)
        }
        if (!isDom2) {
            // TODO: 蒸汽模式 button 无法通过 Element.text API 获取文本内容(button 无法通过 .value 获取文本内容)
            for (let i = 1;i < 5;i++) {
                const btnElem = await page.$('#btn' + i)
                expect(await btnElem.text()).toBe(msg)
            }
        }
    }
    it('text-interpolation Composition API', async () => {
        await testTextInterpolation(PAGE_PATH_COMPOSITION)
    })
})