import { parseComponentStyleIsolation } from '../src/plugins/entry'

describe('parseComponentStyleIsolation', () => {
  test('should parse component styleIsolation in script', () => {
    const isolated = `
    <script>
    export default {
      props: ['data'],
      data(){ return { } },
      options: {
        styleIsolation: 'isolated',
      }
    }
    </script>
    `
    expect(parseComponentStyleIsolation(isolated)).toBe('isolated')

    const shared = `
    <script>
    export default {
      props: ['data'],
      data(){ return { } },
      options: {
        styleIsolation: 'shared',
      }
    }
    </script>
    `
    expect(parseComponentStyleIsolation(shared)).toBe('shared')

    const applyShared = `
    <script>
    export default {
      props: ['data'],
      data(){ return { } },
      options: {
        styleIsolation: 'apply-shared',
      }
    }
    </script>
    `
    expect(parseComponentStyleIsolation(applyShared)).toBe('apply-shared')
  })

  test('should parse component style isolation in script defineComponent', () => {
    const applyShared = `
    <script>
    export default defineComponent({
      styleIsolation: 'apply-shared',
    })
    </script>
    `
    expect(parseComponentStyleIsolation(applyShared)).toBe('apply-shared')

    const isolated = `
    <script>
    export default defineComponent({
      styleIsolation: 'isolated',
    })
    </script>
    `
    expect(parseComponentStyleIsolation(isolated)).toBe('isolated')

    const shared = `
    <script>
    export default defineComponent({
      styleIsolation: 'shared',
    })
    </script>
    `
    expect(parseComponentStyleIsolation(shared)).toBe('shared')
  })

  test('should parse component style isolation in script setup', () => {
    const applyShared = `
    <script setup>
    defineOptions({
      styleIsolation: 'apply-shared',
    })
    </script>
    `
    expect(parseComponentStyleIsolation(applyShared)).toBe('apply-shared')

    const isolated = `
    <script setup>
    defineOptions({
      styleIsolation: 'isolated',
    })
    </script>
    `
    expect(parseComponentStyleIsolation(isolated)).toBe('isolated')

    const shared = `
    <script setup>
    defineOptions({
      styleIsolation: 'shared',
    })
    </script>
    `
    expect(parseComponentStyleIsolation(shared)).toBe('shared')
  })

  test('should parse component style isolation in script setup and script', () => {
    const applyShared = `
    <script setup></script>
    <script>
    export default {
        options: {
            styleIsolation: 'apply-shared'
        }
    }
    </script>
    `
    expect(parseComponentStyleIsolation(applyShared)).toBe('apply-shared')

    const isolated = `
    <script setup></script>
    <script>
    export default {
        options: {
            styleIsolation: 'isolated'
        }
    }
    </script>
    `
    expect(parseComponentStyleIsolation(isolated)).toBe('isolated')

    const shared = `
    <script setup></script>
    <script>
    export default {
        options: {
            styleIsolation: 'shared'
        }
    }
    </script>
    `
    expect(parseComponentStyleIsolation(shared)).toBe('shared')
  })
})
