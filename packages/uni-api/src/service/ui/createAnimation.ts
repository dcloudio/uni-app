const defaultOption: Option = {
  duration: 400,
  timingFunction: 'linear',
  delay: 0,
  transformOrigin: '50% 50% 0',
}

type Option = UniApp.CreateAnimationOptions
type AnimatesArgs = string[]
type Action = {
  animates: string[]
  option: ReturnType<MPAnimation['_getOption']>
}

class MPAnimation implements UniApp.Animation {
  actions: Array<Action>
  currentTransform: Data
  currentStepAnimates: Array<{ type: string; args: AnimatesArgs }>
  option: Option

  constructor(option: Option) {
    this.actions = []
    this.currentTransform = {}
    this.currentStepAnimates = []
    this.option = Object.assign({}, defaultOption, option)
  }

  _getOption(option: Option) {
    const _option: {
      transition: Option
      transformOrigin: Option['transformOrigin']
    } = {
      transition: Object.assign({}, this.option, option),
      transformOrigin: '',
    }
    _option.transformOrigin = _option.transition.transformOrigin
    delete _option.transition.transformOrigin
    return _option
  }

  _pushAnimates(type: string, args: AnimatesArgs) {
    this.currentStepAnimates.push({
      type: type,
      args: args,
    })
  }

  _converType(type: string) {
    return type.replace(/[A-Z]/g, (text) => {
      return `-${text.toLowerCase()}`
    })
  }

  _getValue(value: string | number) {
    return typeof value === 'number' ? `${value}px` : value
  }

  export() {
    const actions = this.actions
    this.actions = []
    return {
      actions,
    }
  }

  step(option: Option) {
    this.currentStepAnimates.forEach((animate) => {
      if (animate.type !== 'style') {
        this.currentTransform[animate.type] = animate
      } else {
        this.currentTransform[`${animate.type}.${animate.args[0]}`] = animate
      }
    })
    this.actions.push({
      animates: Object.values(this.currentTransform) as Action['animates'],
      option: this._getOption(option),
    })
    this.currentStepAnimates = []
    return this
  }

  'matrix': UniApp.Animation['matrix']
  'matrix3d': UniApp.Animation['matrix3d']
  'rotate': UniApp.Animation['rotate']
  'rotate3d': UniApp.Animation['rotate3d']
  'rotateX': UniApp.Animation['rotateX']
  'rotateY': UniApp.Animation['rotateY']
  'rotateZ': UniApp.Animation['rotateZ']
  'scale': UniApp.Animation['scale']
  'scale3d': UniApp.Animation['scale3d']
  'scaleX': UniApp.Animation['scaleX']
  'scaleY': UniApp.Animation['scaleY']
  'scaleZ': UniApp.Animation['scaleZ']
  'skew': UniApp.Animation['skew']
  'skewX': UniApp.Animation['skewX']
  'skewY': UniApp.Animation['skewY']
  'translate': UniApp.Animation['translate']
  'translate3d': UniApp.Animation['translate3d']
  'translateX': UniApp.Animation['translateX']
  'translateY': UniApp.Animation['translateY']
  'translateZ': UniApp.Animation['translateZ']
  'opacity': UniApp.Animation['opacity']
  'backgroundColor': UniApp.Animation['backgroundColor']
  'width': UniApp.Animation['width']
  'height': UniApp.Animation['height']
  'right': UniApp.Animation['right']
  'top': UniApp.Animation['top']
  'bottom': UniApp.Animation['bottom']
  'left': UniApp.Animation['left']
}

const animateTypes1 = [
  'matrix',
  'matrix3d',
  'rotate',
  'rotate3d',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scale3d',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skew',
  'skewX',
  'skewY',
  'translate',
  'translate3d',
  'translateX',
  'translateY',
  'translateZ',
]
const animateTypes2 = ['opacity', 'backgroundColor']
const animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom']
animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
  ;(MPAnimation.prototype as any)[type] = function (...args: AnimatesArgs) {
    let _this = this as MPAnimation
    if (animateTypes2.concat(animateTypes3).includes(type)) {
      _this._pushAnimates('style', [
        _this._converType(type),
        animateTypes3.includes(type) ? _this._getValue(args[0]) : args[0],
      ])
    } else {
      _this._pushAnimates(type, args)
    }
    return this
  }
})

export function createAnimation(option: Option) {
  return new MPAnimation(option)
}
