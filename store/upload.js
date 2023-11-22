import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'

export const state = () => ({
  fileUpload: [],
})

export const actions = {
  async uploadFile({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post(
        `${process.env.BASE_URL_UPLOAD}upload`,
        payload,
        config
      )

      const data = response.data
      commit('UPLOAD_FILE', data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
}

export const mutations = {
  updateField,
  UPLOAD_FILE(state, data) {
    state.fileUpload = data
  },
}

export const getters = {
  getField,
}
