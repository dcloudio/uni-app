import Emitter from '../helpers/Emitter'

const injectRef = Object.getPrototypeOf(global) || global

injectRef.UniServiceJSBridge = new Emitter()
injectRef.UniViewJSBridge = new Emitter()
