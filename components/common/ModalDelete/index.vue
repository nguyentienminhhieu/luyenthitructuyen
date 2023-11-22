<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2
        class="text-center text-xl font-semibold mb-10 border-b-[1px] border-[#6666]"
      >
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
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>

<script>
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'

export default {
  name: 'ModalDelete',
  components: {
    ToastSuccess,
    ToastError,
  },
  props: {
    showModal: Boolean,
    subjectId: Number,
    gradeId: Number,
    adminId: Number,
    categoryId: Number,
    examId: Number,
    studentId: Number,
    teacherId: Number,
  },
  data() {
    return {
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Xoá môn học thành công!.',
      errorMessage: 'Lỗi! Không được xóa.',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    deleteModal() {
      try {
        if (this.subjectId) {
          this.$store.dispatch('subject/deleteSubject', this.subjectId)
        } else if (this.gradeId) {
          this.$store.dispatch('grade/deleteGrade', this.gradeId)
        } else if (this.adminId) {
          this.$store.dispatch('account/deleteAdmin', this.adminId)
        } else if (this.categoryId) {
          this.$store.dispatch('category/deleteCategory', this.categoryId)
        } else if (this.examId) {
          this.$store.dispatch('exam/deleteExam', this.examId)
        } else if (this.studentId) {
          this.$store.dispatch('users/deleteUsers', this.studentId)
        } else if (this.teacherId) {
          this.$store.dispatch('users/deleteUsers', this.teacherId)
        }
        this.closeModal()
        // this.$store.dispatch('subject/deleteSubject', this.subjectId)
      } catch (error) {
        this.showErrorToast = true
        setTimeout(() => {
          this.showErrorToast = false
        }, 3000)
      }
    },

    success() {
      this.showSuccessToast = true
      setTimeout(() => {
        this.showSuccessToast = false
      }, 3000)
    },
  },
}
</script>
<style></style>
