<template>
  <div
    class="flex flex-col break-words rounded-lg bg-[#ffff] fixed max-w-[230px] h-[300px] overflow-y-auto"
  >
    <div class="p-2">
      <div class="flex justify-between">
        <h3>Mon thi: ...........</h3>
        <button @click="editExam">
          <i class="fas fa-edit text-gray-500 hover:text-gray-700"></i>
        </button>
      </div>
      <h3>Lop: ...........</h3>
      <h3>Điểm tối đa: ...........</h3>
      <h3>Thời gian: ..................................</h3>
    </div>
    <!-- <div class="p-2">
      <h3>Danh sách câu hỏi:</h3>
      <div class="flex flex-row flex-wrap">
        <button
          v-for="index in questions.length"
          :key="index"
          class="rounded-full w-8 h-8 m-1 bg-gray-500 text-white items-center justify-center hover:bg-gray-600 hover:text-white"
          @click="goToQuestion(index)"
        >
          {{ index }}
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'RedirectQuestion',
  data() {
    return {
      // questions: [
      //   'Câu hỏi 1',
      //   'Câu hỏi 2',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      //   'Câu hỏi 3',
      // ], // Thay thế bằng danh sách câu hỏi của bạn
    }
  },
  methods: {
    editExam() {
      this.$emit('edit-clicked')
    },
    goToQuestion(index) {
      console.log(`Điều hướng đến câu hỏi ${index}`)
    },
  },
}
</script>

<style></style>
