<template>
  <div
    class="ml-4 mb-2 border-2 border-gray-200 rounded-xl max-h-[300px] overflow-y-auto"
  >
    <div class="m-1 p-2 flex justify-between items-center">
      <div class="flex flex-col w-[70%]">
        <div class="my-5">
          <div>
            <textarea
              v-if="inputTitle"
              v-model="AnswerContent"
              placeholder="Nhập tiêu đề..."
              class="w-[100%] rounded p-2 m-2 outline-none resize-none"
            ></textarea>
            <label v-if="answerTitle" class="w-[100%] break-words">{{
              AnswerContent
            }}</label>
          </div>
          <label
            for="avatar"
            class="bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
          >
            Tải ảnh câu trả lời
            <input
              id="avatar"
              type="file"
              class="hidden"
              accept="image/*"
              @change="handleFileChange"
            />
          </label>
          <div class="my-4">
            <button v-if="answer.selectedImage" @click="clearImage(answer)">
              <i class="fa-solid fa-x"></i>
            </button>
            <img
              v-if="answer.selectedImage"
              :src="answer.selectedImage"
              alt="Ảnh đại diện"
              class="w-40 h-40 rounded-xl mx-auto"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <button
          :class="{
            'bg-green-500 text-white': isCorrect,
            'bg-gray-300': !isCorrect,
          }"
          class="px-4 py-2 rounded-full"
          @click="isCorrect = true"
        >
          <i class="fa fa-check"></i>
        </button>
        <button
          :class="{
            'bg-red-500 text-white': !isCorrect,
            'bg-gray-300': isCorrect,
          }"
          class="px-4 py-2 rounded-full"
          @click="isCorrect = false"
        >
          <i class="fa fa-times"></i>
        </button>
        <button v-if="inputTitle" @click="saveAnswer">
          <i class="fa-solid fa-bookmark text-gray-500 hover:text-gray-700"></i>
        </button>
        <button v-if="answerTitle" @click="editAnswer">
          <i class="fa fa-edit text-gray-500 hover:text-gray-700"></i>
        </button>
      </div>
    </div>
    <div class="text-center">
      <button
        class="rounded-full p-2 bg-gray-400 hover:bg-gray-500"
        @click="deleteAnswer"
      >
        <i class="fa fa-trash text-white"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerQuestion',
  props: {
    answer: Object, // Truyền câu trả lời vào qua props
  },
  data() {
    return {
      isEditing: false,
      inputTitle: true,
      answerTitle: false,
      AnswerContent: this.answer.newContent,
      // explanation:'',
      isCorrect: false,
      selectedImage: null,
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Đọc tệp hình ảnh và hiển thị nó trên giao diện
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedImage = e.target.result
          // eslint-disable-next-line vue/no-mutating-props
          this.answer.img = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    clearImage() {
      this.selectedImage = null
    },
    saveAnswer() {
      this.inputTitle = false
      this.answerTitle = true

      const editedAnswer = {
        id: this.answer.id, // ID của câu trả lời
        content: this.AnswerContent, // Dữ liệu đã chỉnh sửa
        isCorrect: this.isCorrect, // Trạng thái isCorrect
      }
      this.$emit('update-answer', editedAnswer)
    },
    editAnswer() {
      this.inputTitle = true
      this.answerTitle = false
    },

    deleteAnswer() {
      this.$emit('delete')
    },
  },
}
</script>
<style></style>
