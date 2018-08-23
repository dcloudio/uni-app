import { CHANGE_MOVIE_LIST, CHANGE_CURRENT_MOVIE } from './../mutations_type'
import API from '@/utils/api'

const state = {
  movies: [],
  currentMovie: {}
}

const mutations = {
  [CHANGE_MOVIE_LIST](state, payload) {
    state.movies = payload.movies
  },
  [CHANGE_CURRENT_MOVIE](state, payload) {
    state.currentMovie = payload.data
  }
}

const actions = {
  async getMovieList({ commit }) {
    const { data } = await API.getMovieList()
    commit(CHANGE_MOVIE_LIST, { movies: data })
  },
  async getMovieDetail({ commit, state }, id) {
    const { data: { data } } = await API.getMovieDetail(id)
    commit(CHANGE_CURRENT_MOVIE, { data: data[0] })
  },
  async getMovieArticleDetail({ commit, state }, id) {
    const { data: { data } } = await API.getMovieArticleDetail(id)
    commit(CHANGE_CURRENT_MOVIE, { data: data[0] })
  },
  clearMovieDetail({ commit }) {
    commit(CHANGE_CURRENT_MOVIE, { data: {} })
  }
}

export default {
  state,
  mutations,
  actions
}
