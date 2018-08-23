import API from '@/utils/api'
import { SET_LOCATION, SET_WEATHER } from '../mutations_type'
const state = {
  location: {
    latitude: '',
    longitude: ''
  },
  weather: {
    basic: {},
    now: {},
    update: {},
    status: ''
  }
}

const mutations = {
  [SET_LOCATION] (state, payload) {
    state.location = payload.location
  },
  [SET_WEATHER] (state, payload) {
    state.weather = payload.weather
  }
}

const actions = {
  async getWeather({ state, commit }) {
    console.log('getWeather')
    const location = state.location
    const data = await API.getWeather(`${location.latitude},${location.longitude}`)
    commit(SET_WEATHER, { weather: data.result })
  }
}

export default {
  state,
  mutations,
  actions
}
