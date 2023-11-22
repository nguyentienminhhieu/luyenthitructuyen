<template>
  <div class="p-3">
    <div>
      <HeadingDetailExam />
    </div>
    <!-- {{ questions }} -->

    <div
      class="sticky text-[#cfcfcf] top-[56px] flex justify-between m-1 rounded-md py-3 bg-gray-700 pl-2"
    >
      <div class="mr-4 break-words">
        <h1 class="text-xl font-medium mb-1">
          {{ detailExam.title }}
        </h1>
        <h2 class="">
          {{ detailExam.description }}
        </h2>
      </div>
      <button
        class="m-2 lg:mt-0 rounded-full bg-[#576574] hover:bg-[#627283] px-3 py-2 text-white"
        @click="pushArray"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="mt-4 flex flex-row">
      <div class="redirect-question lg:w-1/6">
        <RedirectQuestion
          :detail-exam="detailExam"
          @edit-clicked="showEditModal = true"
        />
      </div>

      <div class="lg:w-5/6">
        <ListQuestions
          :questions-extends="questions"
          :detail-exam="detailExam"
        />
      </div>
    </div>
    <ModalEditExam
      :exam-item="detailExam"
      :show-modal="showEditModal"
      @close="showEditModal = false"
    />
    <SaveBtn
      :detail-exam="detailExam"
      :list-questions="questions"
      @send-data="data"
    />
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import HeadingDetailExam from '~/components/admin/exams/DetailExam/Heading.vue'
import ListQuestions from '~/components/admin/exams/DetailExam/List/ListQuestions.vue'
import RedirectQuestion from '~/components/admin/exams/DetailExam/redirectQuestion.vue'
import ModalEditExam from '~/components/admin/exams/ModalEdit/index.vue'
import SaveBtn from '~/components/common/SaveBtn.vue'
export default {
  name: 'DetailExam',
  components: {
    HeadingDetailExam,
    RedirectQuestion,
    ListQuestions,
    ModalEditExam,
    SaveBtn,
  },
  layout: 'defaultAdmin',

  data() {
    return {
      saveExam: null,
      questions: [],
      showEditModal: false,
      examID: null,
      // detailExam: null,
    }
  },
  computed: {
    ...mapState('exam', ['detailExam']),
  },
  watch: {
    questions: {
      handler(newQuestions) {
        // this.questions = this.detailExam.questions
        this.saveDataToLocalStorage()
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  async mounted() {
    const questionData = localStorage.getItem('questionData')
    if (questionData) {
      try {
        this.questions = JSON.parse(questionData)
      } catch (error) {
        console.error('Lỗi phân tích JSON: ', error)
      }
    } else {
      this.questions = []
    }
    if (this.$route.query.examID) {
      this.examID = this.$route.query.examID
    }
    await this.getDetailExam(this.examID)
    this.questions = this.detailExam.questions
  },
  methods: {
    ...mapActions('exam', ['getDetailExam']),
    ...mapMutations('exam', ['SET_QUESTIONS']),
    pushArray() {
      const randomId = Math.floor(Math.random(10) * 100000)
      let newQuestion = {
        random_Id: randomId,
        content: '',
        slug: '',
        description: '',
        file: '',
        type: null,
        answers: [],
        questions_extends: [],
      }
      if (this.questions.length > 0) {
        this.questions.forEach((e) => {
          if (e.random_Id === randomId) {
            newQuestion.random_Id = Math.floor(Math.random(10) * 10000)
          }
        })
      } else {
        console.log('mang rong')
      }
      // this.questions.push(newQuestion)
      this.questions = [...this.questions, newQuestion]
      // this.$set(this.questions, this.questions.length, newQuestion)
      // this.SET_QUESTIONS([...this.questions])
      this.saveDataToLocalStorage()
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    },

    saveDataToLocalStorage() {
      const clonedQuestions = JSON.parse(JSON.stringify(this.questions))
      localStorage.setItem('questionData', JSON.stringify(clonedQuestions))
    },
    data(item) {
      this.saveExam = item
    },
  },
}
</script>
<style>
@media (max-width: 1024px) {
  .redirect-question {
    display: none;
  }
}
</style>
