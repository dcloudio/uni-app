import Vue from 'vue'

import App from './app'
import Page from './page'
import AsyncError from './async-error'
import AsyncLoading from './async-loading'
import ChooseLocation from './system-routes/choose-location'
import OpenLocation from './system-routes/open-location'
import PreviewImage from './system-routes/preview-image'

Vue.component(App.name, App)
Vue.component(Page.name, Page)
Vue.component(AsyncError.name, AsyncError)
Vue.component(AsyncLoading.name, AsyncLoading)
Vue.component(ChooseLocation.name, ChooseLocation)
Vue.component(OpenLocation.name, OpenLocation)
Vue.component(PreviewImage.name, PreviewImage)
