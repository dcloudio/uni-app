import Vue from 'vue'

import baseMixin from 'uni-mixins/base'

const requireComponents = [
  // baseComponents
  require.context('./', true, /index\.vue$/),
  require.context('../../../platforms/' + __PLATFORM__ + '/view/components', true, /index\.vue$/)
]

requireComponents.forEach((components, index) => {
  components.keys().forEach(fileName => {
    // 获取组件配置
    const componentModule = components(fileName)

    const componentConfig = componentModule.default || componentModule

    componentConfig.mixins = componentConfig.mixins ? [].concat(baseMixin, componentConfig.mixins) : [baseMixin]

    componentConfig.name = 'VUni' + componentConfig.name

    // 全局注册组件
    Vue.component(componentConfig.name, componentConfig)
  })
})
