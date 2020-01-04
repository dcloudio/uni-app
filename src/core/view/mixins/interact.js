import {
  supportsPassive
} from 'uni-shared'

const passiveOptions = supportsPassive ? {
  passive: true,
  capture: true
} : true
const vms = []
let userInteract = 0
let inited
function addInteractListener (vm) {
  if (!inited) {
    const eventNames = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mouseup']
    eventNames.forEach(eventName => {
      document.addEventListener(eventName, function () {
        vms.forEach(vm => {
          vm.userInteract = true
          userInteract++
          setTimeout(() => {
            userInteract--
            if (!userInteract) {
              vm.userInteract = false
            }
          }, 0)
        })
      }, passiveOptions)
    })
  }
  vms.push(vm)
}
function removeInteractListener (vm) {
  const index = vms.indexOf(vm)
  if (index >= 0) {
    vms.splice(index, 1)
  }
}

export default {
  data () {
    return {
      /**
       * 是否用户交互行为
       */
      userInteract: false
    }
  },
  mounted () {
    addInteractListener(this)
  },
  beforeDestroy () {
    removeInteractListener(this)
  }
}
