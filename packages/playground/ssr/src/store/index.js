import { createStore } from 'vuex'

// mock
function fetchItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: 'title' + id,
      })
    }, 300)
  })
}

export default () => {
  return createStore({
    state() {
      return {
        items: {},
      }
    },
    actions: {
      fetchItem({ commit }, id) {
        return fetchItem(id).then((item) => {
          commit('setItem', { id, item })
        })
      },
    },
    mutations: {
      setItem(state, { id, item }) {
        state.items[id] = item
      },
    },
  })
}
