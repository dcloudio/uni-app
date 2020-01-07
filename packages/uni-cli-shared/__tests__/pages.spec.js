const {
  generateUsingComponentsCode,
  generateGlobalUsingComponentsCode
} = require('../lib/pages')
describe('shared:pages', () => {
  it('generate usingComponents', () => {
    expect(generateUsingComponentsCode()).toBe('')
    expect(generateUsingComponentsCode({})).toBe('')
    expect(generateUsingComponentsCode({
      'van-button': '/wxcomponents/vant/button/index',
      'van-card': '../../wxcomponents/vant/card/index'
    })).toBe(
      `;import VanButton from '@/wxcomponents/vant/button/index.vue';import VanCard from '../../wxcomponents/vant/card/index.vue';exports.default.components=Object.assign({'van-button':VanButton,'van-card':VanCard},exports.default.components||{});`
    )
  })
  it('generate global usingComponents', () => {
    expect(generateGlobalUsingComponentsCode()).toBe('')
    expect(generateGlobalUsingComponentsCode({})).toBe('')
    expect(generateGlobalUsingComponentsCode({
      'van-button': '/wxcomponents/vant/button/index',
      'van-cell': 'wxcomponents/vant/cell/index',
      'van-cell-group': './wxcomponents/vant/cell-group/index'
    })).toBe(
      `import VanButton from '@/wxcomponents/vant/button/index.vue';import VanCell from './wxcomponents/vant/cell/index.vue';import VanCellGroup from './wxcomponents/vant/cell-group/index.vue';Vue.component('van-button',VanButton);Vue.component('van-cell',VanCell);Vue.component('van-cell-group',VanCellGroup);`
    )
  })
})
