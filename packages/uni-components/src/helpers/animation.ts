import { ComponentOptionsMixin } from 'vue'
import { AnimationAction, MPAnimation } from '@dcloudio/uni-api'
import { converPx } from './utils'

function converType(type: string) {
  return type
    .replace(/[A-Z]/g, (text) => {
      return `-${text.toLowerCase()}`
    })
    .replace('webkit', '-webkit')
}

function getStyle(action: AnimationAction) {
  const animateTypes1 = [
    'matrix',
    'matrix3d',
    'scale',
    'scale3d',
    'rotate3d',
    'skew',
    'translate',
    'translate3d',
  ]
  const animateTypes2 = [
    'scaleX',
    'scaleY',
    'scaleZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skewX',
    'skewY',
    'translateX',
    'translateY',
    'translateZ',
  ]
  const animateTypes3 = ['opacity', 'background-color']
  const animateTypes4 = ['width', 'height', 'left', 'right', 'top', 'bottom']
  const animates = action.animates
  const option = action.option
  const transition = option.transition
  const style: Partial<CSSStyleDeclaration> = {}
  const transform: string[] = []
  animates.forEach((animate) => {
    let type = animate.type
    let args = [...animate.args]
    if (animateTypes1.concat(animateTypes2).includes(type)) {
      if (type.startsWith('rotate') || type.startsWith('skew')) {
        args = args.map((value) => parseFloat(value) + 'deg')
      } else if (type.startsWith('translate')) {
        args = args.map(converPx)
      }
      if (animateTypes2.indexOf(type) >= 0) {
        args.length = 1
      }
      transform.push(`${type}(${args.join(',')})`)
    } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
      type = args[0]
      const value = args[1]
      ;(style as any)[type] = animateTypes4.includes(type)
        ? converPx(value)
        : value
    }
  })
  style.transform = style.webkitTransform = transform.join(' ')
  style.transition = style.webkitTransition = Object.keys(style)
    .map(
      (type) =>
        `${converType(type)} ${transition.duration}ms ${
          transition.timingFunction
        } ${transition.delay}ms`
    )
    .join(',')
  style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin
  return style
}

function startAnimation(context: ComponentOptionsMixin) {
  const animation = context.animation as MPAnimation
  if (!animation || !animation.actions || !animation.actions.length) {
    return
  }
  let index = 0
  const actions = animation.actions
  const length = animation.actions.length
  function animate() {
    const action = actions[index]
    const transition = action.option.transition
    const style = getStyle(action)
    Object.keys(style).forEach((key) => {
      context.$el.style[key] = (style as any)[key]
    })

    index += 1
    if (index < length) {
      setTimeout(animate, transition.duration! + transition.delay!)
    }
  }

  setTimeout(() => {
    animate()
  }, 0)
}

export default {
  props: ['animation'],
  watch: {
    animation: {
      deep: true,
      handler() {
        startAnimation(this)
      },
    },
  },
  mounted() {
    startAnimation(this)
  },
}
