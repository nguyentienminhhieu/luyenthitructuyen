<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Sửa Lớp</h2>

      <!-- Form để thêm giáo viên -->
      <form
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        @submit.prevent="editClass"
      >
        <div class="mb-4 md:mb-0">
          <label for="class" class="block text-color-default">Lớp</label>
          <select
            id="class"
            v-model="ruleForm.class"
            name="class"
            class="w-full border-b-2 focus:outline-none p-1"
            required
          >
            <option value="6">Lớp 6</option>
            <option value="7">Lớp 7</option>
            <option value="8">Lớp 8</option>
            <option value="9">Lớp 9</option>
          </select>
        </div>

        <!-- Footer với nút Thoát và Thêm -->
        <div class="col-span-3 flex justify-between mt-4">
          <button
            type="button"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
            @click="closeModal"
          >
            Thoát
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalEditClass',
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      ruleForm: {
        class: null,
      },
      isPasswordVisible: false,
    }
  },
  validations: {
    ruleForm: {},
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    editClass() {
      this.$emit('close')
    },
  },
}
</script>
