import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'

export const state = () => ({
  listExam: [],
  detailExam: {},
})

export const actions = {
  async getListExam({ commit }) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exam', config)
      const data = response.data
      commit('SET_EXAM', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async addExam({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post('/create-exam', payload, config)
      const data = response.data
      commit('ADD_EXAM', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async updateExam({ commit }, examItem) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.put(
        `/update-exam/${examItem.id}`,
        examItem,
        config
      )
      // const data = response
      return response
      // commit('UPDATE_EXAM', data.data)
    } catch (error) {
      console.log('Error123:', error)
    }
  },
  async deleteExam({ commit }, examId) {
    try {
      const config = getAuthorizationConfig()

      await this.$axios.delete(`/delete-exam/${examId}`, config)
      commit('DELETE_EXAM', examId)
    } catch (error) {
      console.error('Error:', error)
    }
  },
  async getDetailExam({ commit }, examId) {
    try {
      const config = getAuthorizationConfig()

      const response = await this.$axios.get(`/exam/${examId}`, config)
      const data = response.data
      commit('setDetailExam', data.data)
      commit('SET_DETAIL_EXAM', data.data)
      return data.data
    } catch (error) {
      console.error('Error:', error)
    }
  },
  async activeExam({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post(
        `/active-exam/${payload.id}`,
        payload,
        config
      )
      const data = response.data
      commit('ACTIVE_EXAM', data.data)
      // return data
    } catch (error) {
      console.error('Lỗi server: ', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_EXAM(state, data) {
    state.listExam = data
  },
  SET_DETAIL_EXAM(state, exam) {
    state.detailExam = exam
  },
  ADD_EXAM(state, data) {
    state.listExam.push(data)
  },
  UPDATE_EXAM(state, data) {
    state.detailExam = data
  },
  DELETE_EXAM(state, examId) {
    state.listExam = state.listExam.filter((exam) => exam.id !== examId)
  },
  ACTIVE_EXAM(state, payload) {
    const { id, active } = payload
    const item = state.listExam.find((item) => item.id === id)
    if (item) {
      item.is_active = active
    }
  },
  setDetailExam(state, data) {
    state.detailExam = data
  },
}

export const getters = {
  getField,
}
