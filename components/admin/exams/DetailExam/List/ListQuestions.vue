<template>
  <div>
    <!-- <div v-for="idetend in idExtends" :key="idetend.id">
      <button @click="showChildQuestionId(idetend.id)">
        Id cau hoi con {{ idetend.id }}
      </button>
    </div> -->
    <div v-for="item in questionsExtends" :key="item.id">
      <div class="bg-[#576574] p-2 rounded mb-4">
        <Question
          :question="item"
          :detail-exam="detailExam"
          @delete="deleteQuestion(item)"
          @clear-image="clearImage(item)"
        />
        <!-- @id-questions-extends="idQuestionsExtends" -->
        <!-- @saveQuestionStorage="saveQuestionStorage" -->
      </div>
    </div>
  </div>
</template>
<script>
import Question from '~/components/admin/exams/DetailExam/Question.vue'
export default {
  name: 'ListQuestions',
  components: {
    Question,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop, vue/prop-name-casing
    questionsExtends: Array,
    detailExam: Object,
  },
  data() {
    return {
      idExtends: [],
    }
  },
  methods: {
    // showChildQuestionId(item) {
    //   console.log('idcon', item.id)
    // },
    // idQuestionsExtends(item) {
    //   this.idExtends = item
    //   console.log('id con', item.id)
    // },
    deleteQuestion(item) {
      const index = this.questionsExtends.indexOf(item)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.questionsExtends.splice(index, 1)
      }
    },
    clearImage(question) {
      // Đặt file của câu hỏi hiện tại thành null
      question.file = null
    },
  },
}
</script>
<style></style>
