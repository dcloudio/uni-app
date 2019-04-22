import formField from './form-field'

const behaviors = {
  [formField.name]: formField
}

export default function initBehaviors (options, vm) {
  options.behaviors.forEach(name => {
    const behavior = behaviors[name]
    behavior && behavior.init(options, vm)
  })
}
