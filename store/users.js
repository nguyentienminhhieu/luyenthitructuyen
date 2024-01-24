import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listUser: [],
  // activeUsersstate: true,
})

export const actions = {
  async getListUser({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-user', {
        ...config,
        params: {
          username: payload,
          limit: '20',
        },
        // grade_id: payload.grade_id,
      })
      const data = response.data?.data
      commit('SET_USER', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },

  async deleteUsers({ commit }, userId) {
    try {
      const config = getAuthorizationConfig()

      await this.$axios.delete(`/delete-admin/${userId}`, config)
      commit('DELETE_USER', userId)
    } catch (error) {
      console.error('Error deleting:', error)
    }
  },
  async activeUsers({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post('/active-user', payload, config)
      const data = response.data
      commit('ACTIVE_USER', data.data)
      // return data
    } catch (error) {
      console.error('Lỗi server: ', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_USER(state, item) {
    state.listUser = item
  },
  DELETE_USER(state, userId) {
    state.listUser = state.listUser.filter((user) => user.id !== userId)
  },
  ACTIVE_USER(state, payload) {
    const { id, active } = payload
    const item = state.listUser.find((item) => item.id === id)
    if (item) {
      item.active = active
    }
  },
}

export const getters = {
  getField,
}
