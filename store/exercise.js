import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'

export const state = () => ({
  listExercise: [],
  detailExercise: {},
  currentPage: 1,
  totalPages: null,
  itemsPerPage: null,
  totalItems: null,
  title: '',
  type: '',
  subject_id: null,
  grade_id: null,
})

export const actions = {
  async getListExercise({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exercise', {
        ...config,
        params: {
          title: payload.title,
          type: payload.type,
          subject_id: payload.subject_id,
          grade_id: payload.grade_id,
          page: payload.page,
        },
      })
      const data = response.data
      commit('SET_EXEXRCISE', data.data)
      commit('SET_EXEXRCISE_PARAMS', payload)
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
      commit('SET_DETAIL_EXERCISE', data.data)
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
    state.listExercise = data.data
    state.currentPage = data.current_page
    state.totalPages = data.last_page
    state.itemsPerPage = data.per_page
    state.totalItems = data.total
  },
  SET_EXEXRCISE_PARAMS(state, payload) {
    state.title = payload.title || ''
    state.type = payload.type || ''
    state.subject_id = payload.subject_id || null
    state.grade_id = payload.grade_id || null
  },
  SET_DETAIL_EXERCISE(state, exam) {
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
