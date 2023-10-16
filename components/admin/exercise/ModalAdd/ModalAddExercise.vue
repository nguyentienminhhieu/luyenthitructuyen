<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 w-[400px] h-[500px] overflow-auto"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Loại Bài tập</h2>
      <form class="flex flex-col" @submit.prevent="addExercise">
        <div class="mb-4">
          <label for="exerciseName" class="block text-color-default"
            >Tên Bài tập</label
          >
          <input
            id="exerciseName"
            v-model="ruleForm.exerciseName"
            type="text"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
          />
        </div>

        <div class="mb-4">
          <label for="exerciseDescription" class="block text-color-default"
            >Mô tả</label
          >
          <textarea
            id="exerciseDescription"
            v-model="ruleForm.exerciseDescription"
            class="mt-1 p-2 block w-full h-40 rounded-md focus:outline-none border border-gray-300"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="exerciseSlug" class="block text-color-default"
            >Slug Bài tập</label
          >
          <input
            id="exerciseSlug"
            v-model="ruleForm.exerciseSlug"
            type="text"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
          />
        </div>
        <div class="mb-4">
          <label for="grade" class="block text-color-default">Lớp</label>
          <select
            id="grade"
            v-model="ruleForm.grade"
            name="grade"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
            required
          >
            <option v-for="item in listGrade" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="subject" class="block text-color-default">Môn Học</label>
          <select
            id="subject"
            v-model="ruleForm.subject"
            name="subject"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
            required
          >
            <option v-for="item in listSubject" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="totalQuestions" class="block text-color-default"
            >Tổng câu hỏi</label
          >
          <input
            id="totalQuestions"
            v-model="ruleForm.totalQuestions"
            type="number"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
            min="1"
          />
        </div>

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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ModalAddExercise',
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      ruleForm: {
        exerciseName: '',
        exerciseDescription: '',
        exerciseSlug: '',
        grade: null,
        subject: null,
        totalQuestions: '40',
      },
    }
  },
  computed: {
    ...mapState('grade', ['listGrade']),
    ...mapState('subject', ['listSubject']),
  },
  mounted() {
    this.getGrade()
    this.getSubjects()
  },
  methods: {
    ...mapActions('grade', ['getGrade']),
    ...mapActions('subject', ['getSubjects']),
    closeModal() {
      this.$emit('close')
    },
    addExercise() {
      // Đưa dữ liệu giáo viên vào hàm hoặc gửi đến API ở đây
      // Sau khi thêm xong, đóng modal
      //   const invalid = this.$v.ruleForm.$invalid
      //   if (invalid) {
      //     this.$v.ruleForm.$touch()
      //   } else {
      console.log('Dung')
      this.closeModal()
      //   }
    },
  },
}
</script>
<style></style>
