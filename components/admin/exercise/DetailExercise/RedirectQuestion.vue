<template>
  <div
    v-if="questions.length > 0"
    class="flex flex-col my-5 break-words shadow-xl rounded-lg bg-[#ffff] fixed max-w-[200px] max-h-[425px] overflow-y-auto"
  >
    <div class="p-2">
      <!-- <h3>Danh sách câu hỏi:</h3> -->
      <div class="p-2">
        <div class="flex flex-row flex-wrap">
          <button
            v-for="(question, index) in questions"
            :key="index"
            class="rounded-full w-8 h-8 m-1"
            :class="getButtonClass(question, index)"
            @click="goToQuestion(index + 1)"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export const EventBus = new Vue()
export default {
  name: 'RedirectQuestion',
  props: {
    detailExam: Object,
    questions: Array,
  },
  data() {
    return {
      questionContents: [],
    }
  },
  watch: {
    questions: {
      handler(newQuestions) {
        this.questionContents = newQuestions.map(
          (question, index) => `Câu ${index + 1}.`
        )
        // console.log(this.questionContents)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getButtonClass(question, index) {
      return {
        'text-black items-center justify-center border-[1px] border-[#bababa] bg-gray-200 hover:bg-gray-300 hover:text-white':
          !question.content.trim() || question.content.trim() === '',
        'text-black items-center justify-center border-2 border-[#273c75] bg-[#909bbb] hover:bg-[#35529f] hover:text-white':
          question.content.trim() !== '',
      }
    },
    goToQuestion(index) {
      EventBus.$emit('go-to-question-exercise-create', index)
    },
  },
}
</script>

<style></style>
