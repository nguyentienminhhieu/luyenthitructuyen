<template>
  <div class="ml-4 my-2 border-[#f2f2f2f2]">
    <div class="flex flex-row">
      <div class="flex flex-col">
        <div class="">
          <div class="flex">
            <div class="my-auto mx-2">
              <div class="flex items-center space-x-2">
                <label class="relative cursor-pointer">
                  <input
                    :name="`radio-${question_id}`"
                    type="radio"
                    class="hidden"
                    :checked="answer.is_correct"
                    @click="toggleCorrect(answer.random_Id || answer.id)"
                  />
                  <div
                    class="w-6 h-6 bg-gray-300 border border-gray-400 rounded-full flex items-center justify-center transition duration-300 ease-in-out"
                    :class="{ 'bg-green-500': answer.is_correct }"
                  >
                    <svg
                      v-if="answer.is_correct"
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </label>
              </div>
            </div>
            <TinyMCE
              :answer="answer"
              :answer-content.sync="answerData.content"
            />
            <div
              v-if="checkStatusClass($v.answerData)"
              class="ml-4 text-input-error text-sm"
            >
              <span :style="{ width: '90%' }">
                {{ !$v.answerData.required ? 'Vui lòng nhập dữ liệu!' : '' }}
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="
            answerData.explanation
              ? (handleExplanation = true)
              : handleExplanation
          "
          class="mx-6 w-[400px]"
        >
          <textarea
            v-model="answerData.explanation"
            placeholder="Nhập giải thích đáp án..."
            class="w-full border-b-2 hover:border-black bg-gray-200 rounded p-2 m-4 outline-none"
          ></textarea>
        </div>
      </div>

      <div
        class="flex flex-col bg-[#ffff] p-2 ml-4 max-h-[180px] items-center rounded-xl"
      >
        <button
          class="m-[2px] hover:bg-gray-400 rounded-full p-[2px]"
          @click="handleExplan"
        >
          E+
        </button>
        <button @click="deleteAnswer">
          <i
            class="fa-regular fa-trash-can m-[2px] hover:bg-red-400 rounded-full p-[5px]"
          ></i>
        </button>
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
    question_id: Number,
  },
  data() {
    return {
      answerData: {
        content: this.answer.content,
        explanation: this.answer.explanation,
      },
      handleExplanation: false,
      isCorrect: this.answer.is_correct,
      selectedImage: null,
    }
  },
  validations: {
    answerData: {
      required,
    },
  },
  plainTextContent() {
    // Sử dụng innerText để chuyển đổi nội dung từ thẻ p thành văn bản thông thường
    const dummyElement = document.createElement('div')
    dummyElement.innerHTML = this.answerData.content
    return dummyElement.innerText
  },
  watch: {
    'answerData.content'(newVal) {
      this.$set(this.answer, 'content', newVal)
    },
    'answerData.explanation'(newVal) {
      this.$set(this.answer, 'explanation', newVal)
    },
    isCorrect(newVal) {
      this.$set(this.answer, 'is_correct', newVal)
    },
  },
  mounted() {},
  methods: {
    checkStatusClass,
    toggleCorrect(idAnswer) {
      this.$emit('id-answer', idAnswer)
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
