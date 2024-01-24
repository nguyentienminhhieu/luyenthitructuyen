<template>
  <div class="flex items-center justify-end space-x-8">
    <!-- Ô input search -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none"
        @keyup.enter="performSearch"
      />
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        @click="performSearch"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchAddOptionTeachers',
  data() {
    return {
      searchQuery: '',
      selectedOption: null,
      // isOpenModal: false,
    }
  },
  computed: {
    ...mapState('users', ['listUser']),
  },
  methods: {
    ...mapActions('users', ['getListUser']),
    handleAddClick() {
      this.$emit('add-clicked') // Gửi sự kiện 'add-clicked' khi nút "Add" được nhấp
    },
    async performSearch() {
      // const payload = {
      //   name: this.searchQuery,
      // }
      await this.$store.dispatch('users/getListUser', this.searchQuery)
    },
  },
}
</script>
<style></style>
