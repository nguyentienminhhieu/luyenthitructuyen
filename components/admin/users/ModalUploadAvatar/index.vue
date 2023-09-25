<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <!-- Lớp nền mờ -->
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>

    <!-- Modal chứa nội dung -->
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <!-- Tiêu đề modal -->
      <h2 class="text-2xl font-semibold mb-4">Thay đổi ảnh đại diện</h2>

      <!-- Nội dung modal -->
      <div class="space-y-4">
        <!-- Thành phần tải ảnh đại diện -->
        <input type="file" accept="image/*" @change="handleFileChange" />
        <img
          v-if="selectedImage"
          :src="selectedImage"
          alt="Ảnh đại diện"
          class="w-32 h-32 rounded-full"
        />
      </div>
      <!-- Nút "Thoát" -->
      <div class="text-right mt-4">
        <button
          class="text-gray-600 hover:text-gray-800 font-medium"
          @click="closeModal"
        >
          Thoát
        </button>

        <!-- Nút "Thay đổi" -->
        <button
          class="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium"
          @click="changeAvatar"
        >
          Thay đổi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalUploadAvatar',

  props: {
    showModal: Boolean,
  },
  data() {
    return { selectedImage: null }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    changeAvatar() {
      this.$emit('close')
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Đọc tệp hình ảnh và hiển thị nó trên giao diện
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedImage = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
  },
}
</script>

<style scoped>
/* Thêm CSS tùy chỉnh cho modal nếu cần */
</style>
