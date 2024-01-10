<template>
  <div class="flex items-center justify-end space-x-8">
    <!-- Ô input search -->
    <div class="relative">
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchAddOptionTeachers',
  data() {
    return {
      selectedOption: null,
      // isOpenModal: false,
    }
  },
  methods: {
    handleAddClick() {
      this.$emit('add-clicked') // Gửi sự kiện 'add-clicked' khi nút "Add" được nhấp
    },
  },
}
</script>
<style></style>
