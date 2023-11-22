<template>
  <div class="ml-2 my-2 border-t-[1px] border-[#666]">
    <!-- <div class="flex justify-between">
      <h1 class="font-normal p-2">Thêm câu trả lời mới</h1>
    </div> -->
    <!-- {{ answer.id }} -->
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <div class="">
          <div class="w-[400px]">
            <input
              v-if="inputTitle"
              v-model="answerContent"
              type="text"
              placeholder="Nhập câu trả lời..."
              class="w-full rounded p-2 m-4 outline-none"
              :class="[
                !$v.answerContent.$dirty
                  ? ''
                  : checkStatusClass($v.answerContent)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.answerContent.$touch()"
            />
            <div
              v-if="checkStatusClass($v.answerContent)"
              class="ml-4 text-input-error text-sm"
            >
              <span :style="{ width: '90%' }">
                {{ !$v.answerContent.required ? 'Vui lòng nhập dữ liệu!' : '' }}
              </span>
            </div>
            <label v-if="answerTitle" class="m-4 break-words">{{
              answerContent
            }}</label>
          </div>
          <!-- <label
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
          </div> -->
        </div>
        <div class="mx-4 w-[400px]">
          <textarea
            v-if="handleExplanation && inputTitle"
            v-model="explanation"
            placeholder="Nhập giải thích đáp án..."
            class="w-full rounded p-2 m-4 outline-none"
          ></textarea>
          <label v-if="answerTitle" class="break-words">{{
            explanation
          }}</label>
        </div>
      </div>

      <div class="flex flex-row bg-[#ffff] p-2 items-center rounded-xl">
        <div class="flex flex-col border-r-[1px] border-[#000]">
          <button
            :class="{
              'bg-green-500 text-white': isCorrect,
              'bg-[#ffff]': !isCorrect,
            }"
            class="px-[6px] py-[1px] m-[3px] rounded-full hover:bg-green-300"
            @click="isCorrect = true"
          >
            <i class="fa-solid fa-check"></i>
          </button>
          <button
            :class="{
              'bg-red-500 text-white': !isCorrect,
              'bg-[#ffff]': isCorrect,
            }"
            class="px-[6px] m-[3px] rounded-full hover:bg-red-400"
            @click="isCorrect = false"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="flex flex-col border-r-[1px] border-[#000]">
          <button
            class="m-[2px] hover:bg-gray-400 rounded-full p-[2px]"
            @click="handleExplan"
          >
            E+
          </button>
          <button class="mb-1">
            <i
              class="fa-regular fa-image m-[3px] hover:bg-gray-400 rounded-full p-[5px]"
            ></i>
          </button>
        </div>

        <div class="flex flex-col">
          <button v-if="inputTitle" @click="saveAnswer">
            <i
              class="fa-regular fa-floppy-disk m-[3px] hover:bg-blue-500 rounded-full p-[6px]"
            ></i>
          </button>
          <button v-if="answerTitle" @click="editTitleAnswer">
            <i
              class="fa-regular fa-pen-to-square m-[3px] hover:bg-blue-300 rounded-full p-[5px]"
            ></i>
          </button>
          <button @click="deleteAnswer">
            <i
              class="fa-regular fa-trash-can m-[2px] hover:bg-red-400 rounded-full p-[5px]"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { checkStatusClass } from '~/mixins/ruleValidator'
export default {
  name: 'AnswerQuestion',
  mixins: [validationMixin],
  props: {
    answer: Object,
    detailExam: Object,
  },
  data() {
    return {
      isEditing: false,
      inputTitle: true,
      answerTitle: false,
      // answerContent: '',
      answerContent: this.answer.content,
      // explanation: '',
      explanation: this.answer.explanation,
      handleExplanation: false,
      // isCorrect: '',
      isCorrect: this.answer.is_correct,
      selectedImage: null,
    }
  },
  validations: {
    answerContent: {
      required,
    },
  },
  // watch: {
  //   immediate: true,
  //   handler(newShowModal) {
  //     if (newShowModal && this.detailExam) {
  //       this.answerContent = this.detailExam.questions.answers.content
  //       this.explanation = this.detailExam.questions.answers.explanation
  //       this.isCorrect = this.detailExam.questions.answers.is_correct
  //     }
  //   },
  // },
  methods: {
    checkStatusClass,
    // handleFileChange(event) {
    //   const file = event.target.files[0]
    //   if (file) {
    //     // Đọc tệp hình ảnh và hiển thị nó trên giao diện
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //       this.selectedImage = e.target.result
    //       // eslint-disable-next-line vue/no-mutating-props
    //       this.answer.img = e.target.result
    //     }
    //     reader.readAsDataURL(file)
    //   }
    // },
    // clearImage() {
    //   this.selectedImage = null
    // },
    saveAnswer() {
      const invalid = this.$v.answerContent.$invalid
      if (invalid) {
        this.$v.answerContent.$touch()
      } else {
        // this.answer.content = this.answerContent
        // eslint-disable-next-line vue/no-mutating-props
        this.answer.content = this.answerContent
        // eslint-disable-next-line vue/no-mutating-props
        this.answer.is_correct = this.isCorrect
        // eslint-disable-next-line vue/no-mutating-props
        this.answer.explanation = this.explanation
        this.inputTitle = false
        this.answerTitle = true
        const editedAnswer = {
          random_Id: this.answer.random_Id, // ID của câu trả lời
          content: this.answerContent, // Dữ liệu đã chỉnh sửa
          isCorrect: this.isCorrect, // Trạng thái isCorrect
          explanation: this.explanation, // Trạng thái isCorrect
        }
        this.$emit('update-answer', editedAnswer)
        console.log('123', editedAnswer)
      }
    },
    editTitleAnswer() {
      this.inputTitle = true
      this.answerTitle = false
    },
    deleteAnswer() {
      this.$emit('delete')
    },
    handleExplan() {
      this.handleExplanation = !this.handleExplanation
    },
  },
}
</script>
<style></style>
