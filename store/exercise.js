import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'

export const state = () => ({
  listExercise: [],
  detailExercise: {},
})

export const actions = {
  async getListExercise({ commit }) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exercise', config)
      const data = response.data
      commit('SET_EXEXRCISE', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async addExercise({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post(
        '/create-exercise',
        payload,
        config
      )
      const data = response.data
      commit('ADD_EXEXRCISE', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async updateExercise({ commit }, exerciseItem) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.put(
        `/update-exercise/${exerciseItem.id}`,
        exerciseItem,
        config
      )
      // const data = response
      return response
      // commit('UPDATE_EXEXRCISE', data.data)
    } catch (error) {
      console.log('Error123:', error)
    }
  },
  async deleteExercise({ commit }, exerciseId) {
    try {
      const config = getAuthorizationConfig()

      await this.$axios.delete(`/delete-exercise/${exerciseId}`, config)
      commit('DELETE_EXEXRCISE', exerciseId)
    } catch (error) {
      console.error('Error:', error)
    }
  },
  async getDetailExercise({ commit }, exerciseId) {
    try {
      const config = getAuthorizationConfig()

      const response = await this.$axios.get(`/exercise/${exerciseId}`, config)
      const data = response.data
      commit('setDetailExercise', data.data)
      commit('SET_DETAIL_EXEXRCISE', data.data)
      return data.data
    } catch (error) {
      console.error('Error:', error)
    }
  },
  async activeExercise({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post(
        `/active-exercise/${payload.id}`,
        payload,
        config
      )
      const data = response.data
      commit('ACTIVE_EXEXRCISE', data.data)
      // return data
    } catch (error) {
      console.error('Lỗi server: ', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_EXEXRCISE(state, data) {
    state.listExercise = data
  },
  SET_DETAIL_EXEXRCISE(state, exam) {
    state.detailExercise = exam
  },
  ADD_EXEXRCISE(state, data) {
    state.listExercise.push(data)
  },
  UPDATE_EXEXRCISE(state, data) {
    state.detailExercise = data
  },
  DELETE_EXEXRCISE(state, examId) {
    state.listExercise = state.listExercise.filter(
      (exercise) => exercise.id !== examId
    )
  },
  ACTIVE_EXEXRCISE(state, payload) {
    const { id, active } = payload
    const item = state.listExercise.find((item) => item.id === id)
    if (item) {
      item.is_active = active
    }
  },
  setDetailExercise(state, data) {
    state.detailExercise = data
  },
}

export const getters = {
  getField,
}
