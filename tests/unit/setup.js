const path = require('path')
const glob = require('glob')

global.EVENTS = [
    'touchstart',
    'touchmove',
    'touchcancel',
    'touchend',
    'click', //tap=>click
    'longpress',
    'longtap',
    'transitionend',
    'animationstart',
    'animationiteration',
    'animationend',
    'touchforcechange'
]

global.COMPONENTS = []

glob.sync('../../src/core/view/components/**/*/index.vue', {
    nodir: true,
    cwd: __dirname
}).forEach(file => {
    global.COMPONENTS.push(path.basename(path.dirname(file)))
})

glob.sync('../../src/platforms/' + process.env.UNI_PLATFORM + '/view/components/**/*/index.vue', {
    nodir: true,
    cwd: __dirname
}).forEach(file => {
    global.COMPONENTS.push(path.basename(path.dirname(file)))
})

let lastTime = 0
global.requestAnimationFrame = function(callback, element) {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    const id = global.setTimeout(function() {
        callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
}

global.cancelAnimationFrame = function(id) {
    clearTimeout(id)
}

require('jsdom-global')(undefined, {
    pretendToBeVisual: true
})
//fake
HTMLCanvasElement.prototype.getContext = function getContext() {
    return {}
}
window.Date = Date
localStorage = {
    getItem: function(key) {
        return this[key]
    },
    setItem: function(key, value) {
        this[key] = value
    }
}
