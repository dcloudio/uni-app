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
function setInteract (interact) { vms.forEach(vm => (vm.userInteract = interact)) }
function addInteractListener (vm = {}) {
  if (!inited) {
    const eventNames = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mouseup']
    eventNames.forEach(eventName => {
      document.addEventListener(eventName, function () {
        !userInteract && setInteract(true)
        userInteract++

        setTimeout(() => {
          !--userInteract && setInteract(false)
        }, 0)
      }, passiveOptions)
    })
    inited = true
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
  },
  addInteractListener,
  // true -> interact
  getStatus () {
    return !!userInteract
  }
}
