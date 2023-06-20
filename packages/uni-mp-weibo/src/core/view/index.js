import {
  wrapper
} from 'uni-helpers/api'

import * as baseApi from './api'

// import * as platformApi from 'uni-platform/view/api'

const uni = Object.create(null)

/* eslint-disable no-undef */
uni.version = __VERSION__

Object.keys(baseApi).forEach(name => {
  uni[name] = wrapper(name, baseApi[name])
})

// Object.keys(platformApi).forEach(name => {
//   uni[name] = wrapper(name, api[name])
// })

export default uni
