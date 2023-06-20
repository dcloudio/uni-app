// 暂不提供通知所有
// function broadcast (componentName, eventName, ...params) {
//   this.$children.forEach(child => {
//     const name = child.$options.name && child.$options.name.substr(1)
//     if (~componentName.indexOf(name)) {
//       child.$emit.apply(child, [eventName].concat(params))
//     } else {
//       broadcast.apply(child, [componentName, eventName].concat([params]))
//     }
//   })
// }
function broadcast (componentName, eventName, ...params) {
  const children = this.$children
  const len = children.length
  for (let i = 0; i < len; i++) {
    const child = children[i]
    const name = child.$options.name && child.$options.name.substr(4)
    if (~componentName.indexOf(name)) {
      child.$emit.apply(child, [eventName].concat(params))
      return false
    } else {
      if (broadcast.apply(child, [componentName, eventName].concat([params])) === false) {
        return false
      }
    }
  }
}
export default {
  methods: {
    $dispatch (componentName, eventName, ...params) {
      if (typeof componentName === 'string') {
        componentName = [componentName]
      }
      let parent = this.$parent || this.$root
      let name = parent.$options.name && parent.$options.name.substr(4)

      while (parent && (!name || !~componentName.indexOf(name))) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name && parent.$options.name.substr(4)
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    $broadcast (componentName, eventName, ...params) {
      if (typeof componentName === 'string') {
        componentName = [componentName]
      }
      broadcast.apply(this, [componentName, eventName].concat(params))
    }
  }
}
