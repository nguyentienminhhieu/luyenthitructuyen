<template>
  <div border-2>
    <div v-for="item in list" :key="item.id">
      <Question :question="item" />
    </div>
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
    list: Array,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style></style>
