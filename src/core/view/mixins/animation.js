function converPx (value) {
  if (/\d+[ur]px$/i.test(value)) {
    value.replace(/\d+[ur]px$/i, text => {
      return `${uni.upx2px(parseFloat(text))}px`
    })
    // eslint-disable-next-line no-useless-escape
  } else if (/^-?[\d\.]+$/.test(value)) {
    return `${value}px`
  }
  return value || ''
}

function converType (type) {
  return type.replace(/[A-Z]/g, text => {
    return `-${text.toLowerCase()}`
  }).replace('webkit', '-webkit')
}

function getStyle (action) {
  const animateTypes1 = ['matrix', 'matrix3d', 'scale', 'scale3d', 'rotate3d', 'skew', 'translate', 'translate3d']
  const animateTypes2 = ['scaleX', 'scaleY', 'scaleZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'translateX', 'translateY', 'translateZ']
  const animateTypes3 = ['opacity', 'backgroundColor']
  const animateTypes4 = ['width', 'height', 'left', 'right', 'top', 'bottom']
  const animates = action.animates
  const option = action.option
  const transition = option.transition
  const style = {}
  let transform = []
  animates.forEach(animate => {
    let type = animate.type
    let args = [...animate.args]
    if (animateTypes1.concat(animateTypes2).includes(type)) {
      if (type.startsWith('rotate') || type.startsWith('skew')) {
        args = args.map(value => parseFloat(value) + 'deg')
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
      style[type] = animateTypes4.includes(type) ? converPx(value) : value
    }
  })
  style.transform = style.webkitTransform = transform.join(' ')
  style.transition = style.webkitTransition = Object.keys(style).map(type => `${converType(type)} ${transition.duration}ms ${transition.timingFunction} ${transition.delay}ms`).join(',')
  style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin
  return style
}

function startAnimation (context) {
  const animation = context.animation
  if (!animation || !animation.actions || !animation.actions.length) {
    return
  }
  let index = 0
  const actions = animation.actions
  const length = animation.actions.length
  function animate () {
    const action = actions[index]
    const transition = action.option.transition
    const style = getStyle(action)
    Object.keys(style).forEach(key => {
      context.$el.style[key] = style[key]
    })

    index += 1
    if (index < length) {
      setTimeout(animate, transition.duration + transition.delay)
    }
  }

  animate()
}

export default {
  props: ['animation'],
  watch: {
    animation () {
      startAnimation(this)
    }
  },
  mounted () {
    startAnimation(this)
  }
}
