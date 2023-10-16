<template>
  <div>
    <div v-for="item in questionsExtends" :key="item.id">
      <Question :question="item" @delete="deleteQuestion(question)" />
    </div>
    <!-- <button @click="savedata">Luu</button> -->
  </div>
</template>
<script>
import Question from '~/components/admin/exams/DetailExam/Question.vue'
export default {
  name: 'ListQuestionsExam',
  components: {
    Question,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    questionsExtends: Array,
  },
  data() {
    return {}
  },
  methods: {
    deleteQuestion(question) {
      const index = this.question.indexOf(question)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.question.splice(index, 1)
      }
    },
  },
}
</script>
<style></style>
