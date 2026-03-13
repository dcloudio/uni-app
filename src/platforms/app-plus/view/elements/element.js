import {
  camelize,
  isPlainObject,
  createRpx2Unit,
  getRpx2Unit
} from 'uni-shared'
import {
  ComponentDescriptor as ComponentDescriptorClass,
  parseStyleText
} from 'uni-core/view/plugins/wxs/component-descriptor'

const rpx2unit = createRpx2Unit(getRpx2Unit().unit, getRpx2Unit().unitRatio, getRpx2Unit().unitPrecision)
// upx,rpx 正则匹配
const unitRE = /\b([+-]?\d+(\.\d+)?)[r|u]px\b/g

const transformUnit = (val) => {
  if (typeof val === 'string') {
    const config = __uniConfig.globalStyle || __uniConfig.window || {}
    if (config.dynamicRpx === true) {
      return rpx2unit(val)
    }

    return val.replace(unitRE, (a, b) => {
      /* eslint-disable no-undef */
      return uni.upx2px(b) + 'px'
    })
  }
  return val
}

class ComponentDescriptor extends ComponentDescriptorClass {
  setStyle (style) {
    if (!this.$el || !style) {
      return this
    }
    if (typeof style === 'string') {
      style = parseStyleText(style)
    }
    if (isPlainObject(style)) {
      for (const key in style) {
        this.$el.style[key] = transformUnit(style[key])
      }
    }
    return this
  }

  addClass (...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this
    }
    this.$el.classList.add(...clsArr)
    return this
  }

  removeClass (...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this
    }
    this.$el.classList.remove(...clsArr)
    return this
  }

  callMethod () {

  }

  triggerEvent () {

  }
}

function formatKey (key) {
  return camelize(key.substring(5))
}

export default class UniElement extends HTMLElement {
  setAttribute (key, value) {
    if (key.startsWith('data-')) {
      const dataset = this.__uniDataset || (this.__uniDataset = {})
      dataset[formatKey(key)] = value
    }
    super.setAttribute(key, value)
  }

  removeAttribute (key) {
    if (this.__uniDataset && key.startsWith('data-')) {
      delete this.__uniDataset[formatKey(key)]
    }
    super.removeAttribute(key)
  }

  $getComponentDescriptor () {
    if (!('__wxsComponentDescriptor' in this)) {
      this.__wxsComponentDescriptor = new ComponentDescriptor({
        $el: this
      })
    }
    return this.__wxsComponentDescriptor
  }
}
