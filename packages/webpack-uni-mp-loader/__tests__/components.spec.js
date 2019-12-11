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

describe('mp:loader', () => {
  it('parse scoped component', () => {
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
        'name': 'mediaList',
        'value': 'mediaList',
        'source': '@/components/tab-nvue/mediaList.vue'
      }, {
        'name': 'uniLoadMore',
        'value': 'uniLoadMore',
        'source': '@/components/uni-load-more.vue'
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
        'name': 'uni-badge',
        'value': 'uniBadge',
        'source': '@dcloudio/uni-ui/lib/uni-badge/uni-badge'
      }, {
        'name': 'uni-card',
        'value': 'uniCard',
        'source': '@dcloudio/uni-ui/lib/uni-card/uni-card'
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
        'name': 'uni-badge',
        'value': 'uniBadge',
        'source': '@dcloudio/uni-ui/lib/uni-badge/uni-badge'
      }, {
        'name': 'uni-card',
        'value': 'uniCard',
        'source': '@dcloudio/uni-ui/lib/uni-card/uni-card'
      }, {
        'name': 'media-list',
        'value': 'mediaList',
        'source': '@/components/tab-nvue/mediaList.vue'
      }], false)
  })
})
