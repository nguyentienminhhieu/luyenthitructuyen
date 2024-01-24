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
      <!-- @input="performSearch" -->
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        @click="performSearch"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- Dropdown Select Option -->
    <div class="relative">
      <label
        for="gradeSelect"
        class="absolute top-0 left-0 ml-2 mt-1 text-gray-500 transition-transform transform-origin-left"
        :class="{ hidden: selectedOption }"
      >
        Grade
      </label>
      <select
        id="gradeSelect"
        v-model="selectedOption"
        class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none shadow-xl"
        @change="handleOptionGrade"
      >
        <option v-for="item in listGrade" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>

    <!-- Nút "Add" -->
    <!-- <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      @click="handleAddClick"
    >
      Add
    </button> -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchAddOptionStudents',
  data() {
    return {
      searchQuery: '',
      selectedOption: null,
    }
  },
  computed: {
    ...mapState('grade', ['listGrade']),
    ...mapState('users', ['listUser']),
  },
  mounted() {},
  methods: {
    ...mapActions('grade', ['getGrade']),
    ...mapActions('users', ['getListUser']),
    async handleOptionGrade() {
      // const payload = {
      //   grade_id: this.selectedOption,
      // }
      // await this.$store.dispatch('users/getListUser', payload)
    },
    async performSearch() {
      // const payload = {
      //   name: this.searchQuery,
      // }
      await this.$store.dispatch('users/getListUser', this.searchQuery)
    },
    handleAddClick() {
      this.$emit('add-clicked')
    },
  },
}
</script>
<style></style>
