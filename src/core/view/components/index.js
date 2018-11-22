import Vue from 'vue'

// 使用白名单过滤（前期有一批自定义组件使用了 uni-）
import tags from 'uni-helpers/tags'

import baseMixin from 'uni-mixins/base'

// const uniRegex = /^uni-/i
// const htmlRegex = /^html:/i
// const svgRegex = /^svg:/i

const oldIsReservedTag = Vue.config.isReservedTag

Vue.config.isReservedTag = function (tag) {
  return tags.indexOf(tag) !== -1 || oldIsReservedTag(tag)
}

// Vue.config.parsePlatformTagName = function(tag) {
// 	return tag.replace(htmlRegex, '').replace(svgRegex, '')
// }

Vue.config.ignoredElements = tags

const oldGetTagNamespace = Vue.config.getTagNamespace

const conflictTags = ['switch', 'image', 'text', 'view']

Vue.config.getTagNamespace = function (tag) {
  if (~conflictTags.indexOf(tag)) { // svg 部分标签名称与 uni 标签冲突
    return false
  }
  return oldGetTagNamespace(tag) || false
}

Vue.config.errorHandler = function (err, vm, info) {
  console.error('errorHandler', err, vm, info)
}

const requireComponents = [
  // frameworkComponents
  /* eslint-disable no-undef */
  require.context('../../../platforms/' + __PLATFORM__ + '/components', true, /index\.vue$/),
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

    if (index > 0) {
      componentConfig.name = 'VUni' + componentConfig.name
    }

    // 全局注册组件
    Vue.component(componentConfig.name, componentConfig)
  })
})
