import * as api from './api/index'
import * as eventApis from './api/base/event-bus'

export default Object.assign(Object.create(null), api, eventApis)
