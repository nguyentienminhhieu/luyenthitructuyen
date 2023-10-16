import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  users: [],
  // authentication: false,
  isLoggedIn: false,
})

export const actions = {
  async login({ commit }, payload) {
    try {
      const response = await this.$axios.post('/login', payload)
      const data = response.data
      if (data && data.token) {
        Cookies.saveToken(data.token)
        Cookies.saveUser(data.data.id)
        Cookies.saveData('authentication', true)
        // commit('setAuthentication', true)
        commit('setUserLogin', data)
        commit('setLoggedIn', true)
        return data
      }
    } catch (error) {
      // return error
      console.log('loi', error)
    }
  },
  async logout({ commit }, payload) {
    try {
      const response = await this.$axios.post('/logout', payload)
      Cookies.destroyToken()
      Cookies.destroyUser()
      Cookies.saveData('authentication', false)
      commit('setUserLogout', response)
      // commit('setAuthentication', false)
      commit('setUserLogout', response)
      commit('setLoggedIn', false)
      return response
    } catch (error) {
      return error.response
    }
  },
}

export const mutations = {
  setUserLogin(state, user) {
    state.users = user
  },
  // setAuthentication(state, data) {
  //   state.authentication = data
  // },
  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
  setUserLogout(state) {
    state.users = null
  },
}

export const getters = {
  getUser(state) {
    return state.users
  },
  // getLoggedIn(state) {
  //   return state.isLoggedIn === true
  // },
}
