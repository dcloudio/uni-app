const parser = require('@babel/parser')

const scopedComponentTraverse = require('../lib/babel/scoped-component-traverse')
const globalComponentTraverse = require('../lib/babel/global-component-traverse')

process.UNI_LIBRARIES = ['@dcloudio/uni-ui']

function assertCodegen (content, expectedComponents, isScoped = true) {
  const {
    state: {
      components
    }
  } = (isScoped ? scopedComponentTraverse : globalComponentTraverse)(parser.parse(content, {
    sourceType: 'module',
    plugins: [
      'typescript'
    ]
  }), {
    components: []
  })

  expect(JSON.stringify(components)).toBe(JSON.stringify(expectedComponents))
}

function assertCodegenOptions (content, expectedOptions, isScoped = true) {
  const {
    state: {
      options
    }
  } = (isScoped ? scopedComponentTraverse : globalComponentTraverse)(parser.parse(content, {
    sourceType: 'module',
    plugins: [
      'typescript'
    ]
  }), {
    components: [],
    options: {
      name: null,
      inheritAttrs: null,
      props: null
    }
  })

  expect(JSON.stringify(options)).toBe(JSON.stringify(expectedOptions))
}

describe('mp:loader', () => {
  it('parse scoped component', () => {
    assertCodegen(
      `import { uniBadge,uniCard} from '@dcloudio/uni-ui';
export default defineComponent({
    components: {
        'uni-badge':uniBadge,
        'uni-card':uniCard
    }
})`,
      [{
        name: 'uni-badge',
        value: 'uniBadge',
        source: '@dcloudio/uni-ui/lib/uni-badge/uni-badge'
      }, {
        name: 'uni-card',
        value: 'uniCard',
        source: '@dcloudio/uni-ui/lib/uni-card/uni-card'
      }])

    assertCodegen(
      `
import mediaList from '@/components/tab-nvue/mediaList.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
export default {
    components: {
        mediaList,
        uniLoadMore
    }
}
`,
      [{
        name: 'mediaList',
        value: 'mediaList',
        source: '@/components/tab-nvue/mediaList.vue'
      }, {
        name: 'uniLoadMore',
        value: 'uniLoadMore',
        source: '@/components/uni-load-more.vue'
      }])

    assertCodegen(
      `
            import { uniBadge,uniCard} from '@dcloudio/uni-ui';
            export default {
                components: {
                    'uni-badge':uniBadge,
                    'uni-card':uniCard
                }
            }
            `,
      [{
        name: 'uni-badge',
        value: 'uniBadge',
        source: '@dcloudio/uni-ui/lib/uni-badge/uni-badge'
      }, {
        name: 'uni-card',
        value: 'uniCard',
        source: '@dcloudio/uni-ui/lib/uni-card/uni-card'
      }])

    assertCodegen(
      `
import VanIcon from '../icon/index.vue'
import VanPopup from '../icon/popup.vue'
import VanLoading from '../icon/loading.vue'
global['__wxVueOptions'] = {
  components:{
    'van-icon': VanIcon,
    'van-popup': VanPopup,
    'van-loading': VanLoading
  }
}
                `,
      [{
        name: 'van-icon',
        value: 'VanIcon',
        source: '../icon/index.vue'
      },
      {
        name: 'van-popup',
        value: 'VanPopup',
        source: '../icon/popup.vue'
      },
      {
        name: 'van-loading',
        value: 'VanLoading',
        source: '../icon/loading.vue'
      }
      ])

    assertCodegen(
      `
      import VanIcon from '../icon/index.vue'
      import VanPopup from '../icon/popup.vue'
      import VanLoading from '../icon/loading.vue'
      exports.default.components = Object.assign({
          'van-icon': VanIcon,
          'van-popup': VanPopup,
          'van-loading': VanLoading
        },exports.default.components || {})
                      `,
      [{
        name: 'van-icon',
        value: 'VanIcon',
        source: '../icon/index.vue'
      },
      {
        name: 'van-popup',
        value: 'VanPopup',
        source: '../icon/popup.vue'
      },
      {
        name: 'van-loading',
        value: 'VanLoading',
        source: '../icon/loading.vue'
      }
      ])

    assertCodegen(`
      import CustomButton from './custom-button.vue'
      const __sfc_main = {}
      __sfc_main.components = Object.assign({
          'custom-button': CustomButton
        }, __sfc_main.components)
      export default __sfc_main
                      `,
    [{
      name: 'custom-button',
      value: 'CustomButton',
      source: './custom-button.vue'
    }])

    assertCodegen(
      `import myButton from '@/components/my-button/my-button.vue';
      export default {
          components: {
            myButton
          }
      }
      import VanButton from '../button/index.vue'
      import VanSearch from '../search/index.vue'
      exports.default.components = Object.assign({
          'van-button': VanButton,
          'van-search': VanSearch,
        },exports.default.components || {})`,
      [{
        name: 'van-button',
        value: 'VanButton',
        source: '../button/index.vue'
      },
      {
        name: 'van-search',
        value: 'VanSearch',
        source: '../search/index.vue'
      },
      {
        name: 'myButton',
        value: 'myButton',
        source: '@/components/my-button/my-button.vue'
      }
      ])

    assertCodegenOptions(
      `export default {
        name: 'test'
      }`, {
        name: '"test"',
        inheritAttrs: null,
        props: null
      }
    )

    assertCodegenOptions(
      `const options = {
        name: 'test'
      }
      export default options`, {
        name: '"test"',
        inheritAttrs: null,
        props: null
      }
    )

    assertCodegenOptions(
      `let options
      options = {
        name: 'test'
      }
      export default options`, {
        name: '"test"',
        inheritAttrs: null,
        props: null
      }
    )

    assertCodegenOptions(
      `const options = Vue.extend({
        name: 'test'
      })
      export default options`, {
        name: '"test"',
        inheritAttrs: null,
        props: null
      }
    )

    assertCodegenOptions(
      `let  options
      options = Vue.extend({
        name: 'test'
      })
      export default options`, {
        name: '"test"',
        inheritAttrs: null,
        props: null
      }
    )

    assertCodegenOptions(
      `const options = {
        name: 'test'
      }
      export default Vue.extend(options)`, {
        name: '"test"',
        inheritAttrs: null,
        props: null
      }
    )

    assertCodegenOptions(
      `export default {
        props: ['id', 'test']
      }`, {
        name: null,
        inheritAttrs: null,
        props: '["id","test"]'
      }
    )

    assertCodegenOptions(
      `export default {
        props: {
          id: {
            type: String
          },
          'test': {
            type: String
          }
        }
      }`, {
        name: null,
        inheritAttrs: null,
        props: '["id","test"]'
      }
    )
  })

  it('parse global component', () => {
    assertCodegen(
      `
            import { uniBadge,uniCard} from '@dcloudio/uni-ui';
            import mediaList from '@/components/tab-nvue/mediaList.vue';
            Vue.component('uni-badge',uniBadge)
            Vue.component('uni-card',uniCard)
            Vue.component('media-list',mediaList)
            `,
      [{
        name: 'uni-badge',
        value: 'uniBadge',
        source: '@dcloudio/uni-ui/lib/uni-badge/uni-badge'
      }, {
        name: 'uni-card',
        value: 'uniCard',
        source: '@dcloudio/uni-ui/lib/uni-card/uni-card'
      }, {
        name: 'media-list',
        value: 'mediaList',
        source: '@/components/tab-nvue/mediaList.vue'
      }], false)
  })
})
