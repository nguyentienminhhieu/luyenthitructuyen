<template>
  <div>
    <div v-for="item in list" :key="item.id">
      <Question :question="item" />
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
    list: Array,
  },
  data() {
    return {}
  },
  methods: {
    // savedata() {},
  },
}
</script>
<style></style>
