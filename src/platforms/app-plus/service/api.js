import * as api from './api/index'
import * as eventApis from './api/base/event-bus'

Object.keys(eventApis).forEach(name => {
  api[name] = eventApis
})

export default api
