import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listAdmin: [],
  // activeAdminstate: true,
})

export const actions = {
  async getAdmin({ commit }) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-admin', config)
      const data = response.data
      commit('SET_ADMIN', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async addAdmin({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post(
        '/create-account-admin',
        payload,
        config
      )
      const data = response.data
      commit('ADD_ADMIN', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },

  async deleteAdmin({ commit }, adminId) {
    try {
      const config = getAuthorizationConfig()

      await this.$axios.delete(`/delete-admin/${adminId}`, config)
      commit('DELETE_ADMIN', adminId)
    } catch (error) {
      console.error('Error deleting grade:', error)
    }
  },
  async activeAdmin({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post('/active-admin', payload, config)
      const data = response.data
      commit('ACTIVE_ADMIN', data.data)
      // return data
    } catch (error) {
      console.error('Lỗi server: ', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_ADMIN(state, item) {
    state.listAdmin = item
  },
  ADD_ADMIN(state, admin) {
    state.listAdmin.push(admin)
  },
  DELETE_ADMIN(state, adminId) {
    state.listAdmin = state.listAdmin.filter((admin) => admin.id !== adminId)
  },
  ACTIVE_ADMIN(state, payload) {
    const { id, active } = payload
    const item = state.listAdmin.find((item) => item.id === id)
    if (item) {
      item.active = active
    }
  },
}

export const getters = {
  getField,
}
