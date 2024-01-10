<template>
  <div class="flex items-center justify-end space-x-8">

    <!-- Nút "Add" -->
    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      @click="handleAddClick"
    >
      Add
    </button>
  </div>
</template>
<script>
export default {
  name: 'SearchAddOptionSubjects',
  data() {
    return {
      selectedOption: null,
    }
  },
  methods: {
    handleAddClick() {
      this.$emit('add-clicked')
    },
  },
}
</script>
<style></style>
