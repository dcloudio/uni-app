import {
  isFn
}
  from 'uni-shared'

const callbacks = []

export function onNativeEventReceive (callback) {
  isFn(callback) &&
    callbacks.indexOf(callback) === -1 &&
    callbacks.push(callback)
}

export function consumeNativeEvent (event, data) {
  callbacks.forEach(callback => callback(event, data))
}
