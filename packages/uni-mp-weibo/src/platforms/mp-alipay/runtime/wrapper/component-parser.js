import Vue from 'vue'

import {
  initData,
  initVueIds,
  handleEvent,
  initBehaviors,
  initProperties,
  initVueComponent
} from 'uni-wrapper/util'

import {
  handleRef,
  handleLink,
  handleWrap,
  initBehavior,
  initRelation,
  triggerEvent,
  createObserver,
  isComponent2,
  initChildVues,
  initSpecialMethods
} from './util'

function initSlots (vm, vueSlots) {
  const $slots = Object.create(null)
  // 未启用小程序基础库 2.0 时，组件实例支持支持访问 $slots、$scopedSlots
  Object.defineProperty(vm, '$slots', {
    get () {
      const $scope = this.$scope
      return ($scope && $scope.props.$slots) || ($scope && $scope.props.$scopedSlots ? {} : $slots)
    }
  })
  Object.defineProperty(vm, '$scopedSlots', {
    get () {
      const $scope = this.$scope
      return ($scope && $scope.props.$scopedSlots) || ($scope && $scope.props.$slots ? {} : $slots)
    }
  })
  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  if (Array.isArray(vueSlots) && vueSlots.length) {
    vueSlots.forEach(slotName => {
      $slots[slotName] = true
    })
  }
}

function initVm (VueComponent) {
  if (this.$vm) {
    return
  }
  const properties = this.props

  const options = {
    mpType: 'component',
    mpInstance: this,
    propsData: properties
  }

  initVueIds(properties.vueId, this)

  if (isComponent2) {
    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options
    })

    // 初始化 vue 实例
    this.$vm = new VueComponent(options)

    initSlots(this.$vm, properties.vueSlots)

    // 触发首次 setData
    this.$vm.$mount()
  } else {
    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options,
      VueComponent,
      mpInstance: this
    })

    if (options.parent) { // 父组件已经初始化，直接初始化子，否则放到父组件的 didMount 中处理
      // 初始化 vue 实例
      this.$vm = new VueComponent(options)
      handleRef.call(options.parent.$scope, this)

      initSlots(this.$vm, properties.vueSlots)

      // 触发首次 setData
      this.$vm.$mount()

      initChildVues(this)

      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted')
      this.$vm.__call_hook('onReady')
    }
  }
}

export default function parseComponent (vueComponentOptions, needVueOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vueComponentOptions)

  const properties = initProperties(vueOptions.props, false, vueOptions.__file)

  const props = {
    onVueInit: function () {}
  }

  Object.keys(properties).forEach(key => {
    props[key] = properties[key].value
  })

  const componentOptions = {
    mixins: initBehaviors(vueOptions, initBehavior),
    data: initData(vueOptions, Vue.prototype),
    props,
    didMount () {
      if (my.dd) { // 钉钉小程序底层基础库有 bug,组件嵌套使用时,在 didMount 中无法及时调用 props 中的方法
        setTimeout(() => {
          initVm.call(this, VueComponent)
        }, 4)
      } else {
        initVm.call(this, VueComponent)
      }

      initSpecialMethods(this)

      if (isComponent2) {
        this.$vm._isMounted = true
        this.$vm.__call_hook('mounted')
        this.$vm.__call_hook('onReady')
      }
    },
    didUnmount () {
      this.$vm && this.$vm.$destroy()
    },
    methods: {
      __r: handleRef,
      __e: handleEvent,
      __l: handleLink,
      __w: handleWrap,
      triggerEvent
    }
  }

  if (isComponent2) {
    componentOptions.onInit = function onInit () {
      initVm.call(this, VueComponent)
    }
    componentOptions.deriveDataFromProps = createObserver()
  } else {
    componentOptions.didUpdate = createObserver(true)
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      }
    })
  }

  return needVueOptions ? [componentOptions, vueOptions] : componentOptions
}
