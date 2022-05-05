import Vue from 'vue'

import baseMixin from 'uni-mixins/base'
import animation from 'uni-mixins/animation'

const requireComponents = [
  // baseComponents
  require.context('./', true, /index\.vue$/),
  require.context('../../../platforms/' + __PLATFORM__ + '/view/components', true, /index\.vue$/)
]

let elements = {}

if (__PLATFORM__ === 'app-plus') {
  // TODO use full polyfill
  require('uni-core/helpers/custom-elements-define')
  const module = require('../../../platforms/app-plus/view/elements/index.js')
  elements = module.default || module
  for (const key in elements) {
    // TODO use kebabCase
    customElements.define(`uni-${key.toLowerCase()}`, elements[key])
  }
}

requireComponents.forEach((components, index) => {
  components.keys().forEach(fileName => {
    // 获取组件配置
    const componentModule = components(fileName)

    const componentConfig = componentModule.default || componentModule

    componentConfig.mixins = componentConfig.mixins ? [].concat(baseMixin, componentConfig.mixins) : [baseMixin]

    if (!componentConfig.functional) {
      componentConfig.mixins.push(animation)
    }

    componentConfig.name = 'VUni' + componentConfig.name

    componentConfig.isReserved = true

    // 全局注册组件
    Vue.component(componentConfig.name, componentConfig)
  })
})
