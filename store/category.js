import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listCategory: [],
  detailCategory: [],
})

export const actions = {
  async getCategory({ commit }) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-category', config)
      const data = response.data
      commit('SET_CATEGORY', data.data)

    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getDetailCategory({ commit }, id) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/detail-category/' + id, config)
      const data = response.data
      commit('SET_DETAIL_CATEGORY', data.data)

    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async addCategory({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post(
        '/create-category',
        payload,
        config
      )
      const data = response.data
      commit('ADD_CATEGORY', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async updateCategory({ commit }, categoryItem) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.put(
        `/update-category/${categoryItem.id}`,
        categoryItem,
        config
      )
      const data = response.data
      commit('UPDATE_CATEGORY', data.data)
    } catch (error) {
      console.log('Error', error)
    }
  },
  async deleteCategory({ commit }, categoryId) {
    try {
      const config = getAuthorizationConfig()

      await this.$axios.delete(`/delete-category/${categoryId}`, config)
      commit('DELETE_CATEGORY', categoryId)
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_CATEGORY(state, category) {
    state.listCategory = category
  },
  SET_DETAIL_CATEGORY(state, category) {
    state.detailCategory = category
  },
  ADD_CATEGORY(state, category) {
    state.listCategory.push(category)
  },
  UPDATE_CATEGORY(state, categoryItem) {
    state.detailCategory = categoryItem

    // const index = state.listcategory.findIndex(
    //   (category) => category.id === categoryItem.id
    // )
    // if (index !== -1) {
    //   state.listcategory.splice(index, 1, categoryItem)
    // }
  },

  DELETE_CATEGORY(state, categoryId) {
    // Lọc ra danh sách môn học mới không bao gồm môn học bị xóa
    state.listCategory = state.listCategory.filter(
      (category) => category.id !== categoryId
    )
  },
}

export const getters = {
  getField,
}
