import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listGrade: [],
  detailGrade: null,
})

export const actions = {
  async getGrade({ commit }) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/grade', config)
      const data = response.data
      commit('SET_GRADE', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getDetailGrade({ commit }, id) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/grade/' + id, config)
      const data = response.data
      commit('SET_DETAIL_GRADE', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async addGrade({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post('/grade', payload, config)
      const data = response.data
      commit('ADD_GRADE', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async updateGrade({ commit }, gradeItem) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.put(
        `/grade/${gradeItem.id}`,
        gradeItem,
        config
      )
      const data = response.data
      commit('UPDATE_GRADE', data.data)
    } catch (error) {
      console.log('Error', error)
    }
  },
  async deleteGrade({ commit }, gradeId) {
    try {
      const config = getAuthorizationConfig()

      await this.$axios.delete(`/grade/${gradeId}`, config)
      commit('DELETE_GRADE', gradeId)
    } catch (error) {
      console.error('Error deleting grade:', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_GRADE(state, item) {
    state.listGrade = item
  },
  SET_DETAIL_GRADE(state, data) {
    state.detailGrade = data
  },
  ADD_GRADE(state, grade) {
    state.listGrade.push(grade)
  },
  UPDATE_GRADE(state, gradeItem) {
    state.detailGrade = gradeItem

    // const index = state.listGrade.findIndex(
    //   (grade) => grade.id === gradeItem.id
    // )
    // if (index !== -1) {
    //   state.listGrade.splice(index, 1, gradeItem)
    // }
  },

  DELETE_GRADE(state, gradeId) {
    // Lọc ra danh sách môn học mới không bao gồm môn học bị xóa
    state.listGrade = state.listGrade.filter((grade) => grade.id !== gradeId)
  },
}

export const getters = {
  getField,
  getDetailGradeById: (state) => (gradeId) => {
    if (state.detailGrade && state.detailGrade.id === gradeId) {
      return state.detailGrade
    }
    return null
  },
}
