const parser = require('@babel/parser')

const scopedComponentTraverse = require('../lib/babel/scoped-component-traverse')
const {
  state: {
    components
  }
} = scopedComponentTraverse(parser.parse(
  `
import VanIcon from '../icon/index.vue'
import VanPopup from '../icon/popup.vue'
import VanLoading from '../icon/loading.vue'
exports.default.components = Object.assign({
    'van-icon': VanIcon,
    'van-popup': VanPopup,
    'van-loading': VanLoading
  },exports.default.components || {})`, {
    sourceType: 'module',
    plugins: [
      'typescript'
    ]
  }), {
  components: []
})
console.log(components)
