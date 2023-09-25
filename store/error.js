// mutations
export const SET_ERROR = 'setError'

const state = () => ({
  error: false
})

const getters = {
  error(state) {
    return state.error
  },
}

const actions = {
}

const mutations = {
  [SET_ERROR](state, status) {
    state.error = status
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
