import API from '@/utils/api'
import { CHANGE_CURRENT_READ, CHANGE_READ_LIST } from './../mutations_type'

const state = {
  readList: {
    essay: [],
    question: [],
    serial: []
  },
  readContent: {
    essay: {},
    question: {}
  }
}

const mutations = {
  [CHANGE_READ_LIST] (state, payload) {
    state.readList = payload.data
  },
  [CHANGE_CURRENT_READ] (state, payload) {
    state.readContent[payload.type] = payload.data
  }
}

const actions = {
  async getReadList({ commit, state }) {
    const { data } = await API.getReadList()
    commit(CHANGE_READ_LIST, { data })
  },
  async getReadContent({ commit, state }, { type, id }) {
    const { data } = await API.getReadDetail(type, id)
    commit(CHANGE_CURRENT_READ, { type, data })
  },
  async clearReadContent({ commit, state }, { type }) {
    commit(CHANGE_CURRENT_READ, { type, data: {} })
  }
  // async getReadComment({ commit, state }, id) {
  //   // const { data } = await API.getReadComment(id)
  //   // commit(CHANGE_CURRENT_READ, { data })
  // }
}

export default {
  state,
  mutations,
  actions
}
