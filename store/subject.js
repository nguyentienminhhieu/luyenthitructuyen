import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listSubject: [],
  detailSubject: [],
})

export const actions = {
  async getSubjects({ commit }) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/subject', config)
      const data = response.data
      commit('SET_SUBJECT', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getDetailSubjects({ commit }, id) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/subject/' + id, config)
      const data = response.data
      commit('SET_DETAIL_SUBJECT', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async addSubjects({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post('/subject', payload, config)
      const data = response.data
      commit('ADD_SUBJECT', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async updateSubject({ commit }, subjectItem) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.put(
        `/subject/${subjectItem.id}`,
        subjectItem,
        config
      )
      const data = response.data
      commit('UPDATE_SUBJECT', data.data)
      // console.log(subjectItem)
    } catch (error) {
      console.log('Error', error)
    }
  },
  async deleteSubject({ commit }, subjectId) {
    try {
      const config = getAuthorizationConfig()

      await this.$axios.delete(`/subject/${subjectId}`, config)
      commit('DELETE_SUBJECT', subjectId)
    } catch (error) {
      console.error('Error deleting subject:', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_SUBJECT(state, subject) {
    state.listSubject = subject
  },
  SET_DETAIL_SUBJECT(state, subject) {
    state.detailSubject = subject
  },
  ADD_SUBJECT(state, subject) {
    state.listSubject.push(subject)
  },
  UPDATE_SUBJECT(state, subjectItem) {
    state.detailSubject = subjectItem

    // const index = state.listSubject.findIndex(
    //   (subject) => subject.id === subjectItem.id
    // )
    // if (index !== -1) {
    //   state.listSubject.splice(index, 1, subjectItem)
    // }
  },

  DELETE_SUBJECT(state, subjectId) {
    // Lọc ra danh sách môn học mới không bao gồm môn học bị xóa
    state.listSubject = state.listSubject.filter(
      (subject) => subject.id !== subjectId
    )
  },
}

export const getters = {
  getField,
}
