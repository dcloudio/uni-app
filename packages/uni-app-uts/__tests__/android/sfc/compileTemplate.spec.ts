import { assertCode, compileSFCScript as compile } from './utils'

describe('SFC compile template', () => {
  test('template with html', () => {
    const { content } = compile(
      `<script setup>const msg = ''</script><template lang='html'><view class="test"/></template>`,
      { inlineTemplate: true }
    )
    assertCode(content)
  })
  test('template with pug', () => {
    const { content } = compile(
      `<script setup>const msg = ''</script><template lang='pug'>view.test</template>`,
      { inlineTemplate: true }
    )
    assertCode(content)
  })
})
