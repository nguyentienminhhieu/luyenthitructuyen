<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">
        Bạn có chắc chắn muốn XÓA?
      </h2>
      <div class="col-span-3 flex justify-between mt-4">
        <button
          type="button"
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
          @click="closeModal"
        >
          Thoát
        </button>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          @click="deleteModal"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDelete',
  props: {
    showModal: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    deleteModal() {
      this.$emit('close')
    },
  },
}
</script>
<style></style>
