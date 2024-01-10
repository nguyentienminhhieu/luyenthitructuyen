<template>
  <div class="p-3">
    <div>
      <HeadingDetailExercise />
    </div>
    <div
      class="text-[#444444] bg-white flex justify-between border-b-2 mx-2 my-4 rounded-md py-3 pl-2 z-10"
    >
      <div class="mx-4 break-words">
        <div class="">
          <h1 class="flex text-xl font-medium">
            Title:
            <p class="ml-2 text-lg font-normal">
              {{ detailExercise.title }}
            </p>
          </h1>
        </div>
        <div class="flex text-xl font-medium">
          Desciptions:
          <p class="ml-2 text-lg font-normal">
            {{ detailExercise.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-4 mr-7 ml-3">
      <div class="redirect-question lg:w-1/5">
        <RedirectQuestion
          :detail-exam="detailExerciseDeep"
          :questions="questions"
        />
      </div>
      <div class="lg:w-4/5">
        <ListQuestions :questions-extends="questions" />
      </div>
    </div>
    <BtnPushQ v-if="detailExercise.user_id !== 1" @push-array="pushArray" />
    <SaveBtn
      v-if="detailExercise.user_id !== 1"
      :detail-exercise="detailExerciseDeep"
      :list-questions="questions"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import HeadingDetailExercise from '~/components/admin/exercise/DetailExercise/Heading.vue'
import ListQuestions from '~/components/admin/exercise/DetailExercise/List/ListQuestions.vue'
import RedirectQuestion from '~/components/admin/exercise/DetailExercise/RedirectQuestion.vue'
import SaveBtn from '~/components/common/SaveBtn.vue'
import BtnPushQ from '~/components/common/BtnPushQ.vue'
export default {
  name: 'DetailExercise',
  components: {
    HeadingDetailExercise,
    ListQuestions,
    SaveBtn,
    BtnPushQ,
    RedirectQuestion,
  },
  layout: 'defaultAdmin',

  data() {
    return {
      questions: [],
      exerciseID: null,
      detailExerciseDeep: null,
    }
  },
  computed: {
    ...mapState('exercise', ['detailExercise']),
  },
  watch: {
    detailExercise: {
      handler(newDetailExercise) {
        if (this.detailExercise !== null) {
          this.detailExerciseDeep = JSON.parse(
            JSON.stringify(this.detailExercise)
          )
        }
      },
      deep: true,
    },
    questions: {
      handler(newQuestions) {
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
    if (this.$route.query.exerciseID) {
      this.exerciseID = this.$route.query.exerciseID
    }
    await this.getDetailExercise(this.exerciseID)
    this.questions = this.detailExerciseDeep.questions
  },
  methods: {
    ...mapActions('exercise', ['getDetailExercise']),
    pushArray() {
      const randomId = Math.floor(Math.random(10) * 100000)
      const newQuestion = {
        random_Id: randomId,
        content: '',
        // content: `Câu ${this.questions.length + 1}.`,
        slug: '',
        description: '',
        explanation: '',
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
      this.questions.push(newQuestion)
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
  },
}
</script>
<style>
@media (max-width: 899px) {
  .redirect-question {
    display: none;
  }
}
</style>
