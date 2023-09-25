import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  user: [],
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
        return data
      } else {
        alert('Dang nhap khong thanh cong')
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
      return response
    } catch (error) {
      return error.response
    }
  },
}

export const mutations = {
  setUserLogin(state, user) {
    state.user = user
  },
  // setAuthentication(state, data) {
  //   state.authentication = data
  // },
  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
  setUserLogout(state) {
    state.user = null
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  // getLoggedIn(state) {
  //   return state.isLoggedIn === true
  // },
}
