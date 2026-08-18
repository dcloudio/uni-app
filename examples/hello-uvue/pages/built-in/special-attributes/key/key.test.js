const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_COMPOSITION = '/pages/built-in/special-attributes/key/key-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('built-in/special-attributes/key', () => {
    if (isMP) {
        it('skip mp: :key is not supported', () => {
            expect(1).toBe(1)
        })
        return
    }

    const test = async (pagePath) => {
        const page = await program.reLaunch(pagePath)
        await page.waitFor('view')
        expect(await (await page.$('#current-id')).text()).toEqual("a");
        expect(await (await page.$('#child-id')).text()).toEqual("a");
        expect(await (await page.$('#child-created-id')).text()).toEqual("a");
        const btn = await page.$('#btn')
        await btn.tap()
        expect(await (await page.$('#current-id')).text()).toEqual("b");
        expect(await (await page.$('#child-id')).text()).toEqual("b");
        expect(await (await page.$('#child-created-id')).text()).toEqual("b");

    }

    it('slots Composition API', async () => {
        await test(PAGE_COMPOSITION)
    });
});