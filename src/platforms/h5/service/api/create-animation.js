const defaultOption = {
  duration: 400,
  timingFunction: 'linear',
  delay: 0,
  transformOrigin: '50% 50% 0'
}

class MPAnimation {
  constructor (option) {
    this.actions = []
    this.currentTransform = {}
    this.currentStepAnimates = []
    this.option = Object.assign({}, defaultOption, option)
  }
  _getOption (option) {
    let _option = {
      transition: Object.assign({}, this.option, option)
    }
    _option.transformOrigin = _option.transition.transformOrigin
    delete _option.transition.transformOrigin
    return _option
  }
  _pushAnimates (type, args) {
    this.currentStepAnimates.push({
      type: type,
      args: args
    })
  }
  _converType (type) {
    return type.replace(/[A-Z]/g, text => {
      return `-${text.toLowerCase()}`
    })
  }
  _getValue (value) {
    return typeof value === 'number' ? `${value}px` : value
  }
  export () {
    const actions = this.actions
    this.actions = []
    return {
      actions
    }
  }
  step (option) {
    this.currentStepAnimates.forEach(animate => {
      if (animate.type !== 'style') {
        this.currentTransform[animate.type] = animate
      } else {
        this.currentTransform[`${animate.type}.${animate.args[0]}`] = animate
      }
    })
    this.actions.push({
      animates: Object.values(this.currentTransform),
      option: this._getOption(option)
    })
    this.currentStepAnimates = []
    return this
  }
}

const animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ']
const animateTypes2 = ['opacity', 'backgroundColor']
const animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom']
animateTypes1.concat(animateTypes2, animateTypes3).forEach(type => {
  MPAnimation.prototype[type] = function (...args) {
    if (animateTypes2.concat(animateTypes3).includes(type)) {
      this._pushAnimates('style', [this._converType(type), animateTypes3.includes(type) ? this._getValue(args[0]) : args[0]])
    } else {
      this._pushAnimates(type, args)
    }
    return this
  }
})

export function createAnimation (option) {
  return new MPAnimation(option)
}
