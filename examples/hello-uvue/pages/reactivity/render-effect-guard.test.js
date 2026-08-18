const PAGE_PATH = '/pages/reactivity/render-effect-guard'

function parseCurrentTop(text) {
    const match = text.match(/currentTop:\s*(\d+(?:\.\d+)?)/)
    return match == null ? 0 : Number(match[1])
}

describe(PAGE_PATH, () => {
    it('只更新 scrollIntoView 时不应重放未变更的 scrollTop setter', async () => {
        const page = await program.reLaunch(PAGE_PATH)
        await page.waitFor('view')

        const btn = await page.$('#btn')
        await btn.tap()
        await page.waitFor(1200)

        const state = await page.$('#state')
        expect(await state.text()).toBe('state: scrollIntoView=empty')

        const currentTop = await page.$('#current-top')
        const currentTopValue = parseCurrentTop(await currentTop.text())
        expect(currentTopValue).toBeGreaterThan(80)
    })
})