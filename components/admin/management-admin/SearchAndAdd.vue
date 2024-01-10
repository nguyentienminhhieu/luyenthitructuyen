<template>
  <div class="flex items-center justify-end my-5 mx-8 space-x-8">
    <!-- Ô input search -->
    <!-- <div class="relative">
      <input
        type="text"
        placeholder="Search..."
        class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none"
      />
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <i class="fas fa-search"></i>
      </button>
    </div> -->

    <!-- Dropdown Select Option -->
    <!-- <div class="relative">
      <select
        v-model="selectedOption"
        class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </div> -->

    <!-- Nút "Add" -->
    <button
      v-if="adminAccount != 1"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      @click="handleAddClickNotAdmin"
    >
      Add
    </button>
    <button
      v-if="adminAccount == 1"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      @click="handleAddClick"
    >
      Add
    </button>
  </div>
</template>
<script>
import Cookies from '~/services/cookies.service.js'

// import { mapActions, mapState } from 'vuex'
export default {
  name: 'SearchAddOptionAdmin',
  data() {
    return {
      selectedOption: null,
      adminAccount: null,
    }
  },
  computed: {
    // ...mapState('users', ['user']),
  },
  mounted() {
    this.adminAccount = Cookies.getUser()
  },
  methods: {
    // ...mapActions('users', ['getInfoUser']),
    handleAddClick() {
      this.$emit('add-clicked')
    },
    handleAddClickNotAdmin() {
      alert('Ban khong co quyen chinh sua')
    },
  },
}
</script>
<style></style>
