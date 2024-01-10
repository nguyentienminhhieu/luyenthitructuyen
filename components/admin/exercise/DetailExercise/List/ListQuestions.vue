<template>
  <div
    class="border-2 border-[#f2f2f2f2]"
    style="box-shadow: 4px 1px 4px rgba(0, 0, 0, 0.1); border-radius: 8px"
  >
    <div v-for="(item, index) in questionsExtends" :key="index">
      <div :id="`question-${index + 1}`" class="bg-[#fffff] p-2 rounded mb-4">
        <Question :question="item" @delete="deleteQuestion(item)" />
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from '../RedirectQuestion.vue'
import Question from '~/components/admin/exercise/DetailExercise/Question.vue'
export default {
  name: 'ListQuestions',
  components: {
    Question,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop, vue/prop-name-casing
    questionsExtends: Array,
  },
  data() {
    return {}
  },
  mounted() {
    EventBus.$on('go-to-question-exercise-create', this.handleGoToQuestion)
  },
  methods: {
    deleteQuestion(item) {
      const index = this.questionsExtends.indexOf(item)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.questionsExtends.splice(index, 1)
      }
    },
   handleGoToQuestion(index) {
      const questionElement = document.getElementById(`question-${index}`)
      if (questionElement) {
        questionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }
    },
  },
}
</script>
<style></style>
