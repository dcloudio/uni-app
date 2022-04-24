import { addScoped } from '../src/vite/plugins/cssScoped'
describe('css scoped', () => {
  test('add scoped', () => {
    expect(addScoped(`<style></style>`)).toBe(`<style scoped></style>`)
    expect(addScoped(`<style lang="scss"></style>`)).toBe(
      `<style lang="scss" scoped></style>`
    )
    expect(addScoped(`<style  scoped></style>`)).toBe(`<style  scoped></style>`)
    expect(
      addScoped(`<style></style><style scoped></style><style  scoped></style>`)
    ).toBe(
      `<style scoped></style><style scoped></style><style  scoped></style>`
    )
  })
})
