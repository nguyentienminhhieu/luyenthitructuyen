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
    <div class="flex justify-between">
      <!-- v-if="questions.length === 0" -->
      <div>
        <label
          for="fileInput"
          class="bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
        >
          <i class="fa-sharp fa-regular fa-file-word"></i>
          <span class="file-input-icon"></span> Choose Exercise File Word
        </label>
        <input
          type="file"
          id="fileInput"
          @change="handleFileUpload"
          class="hidden"
        />
      </div>
      <div class="hidden">
        <button
          class="my-3 bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
          @click="shuffleQuestions"
        >
          <i class="fa-solid fa-rotate-left"></i>
          Tráo Câu Hỏi
        </button>
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
    <ToastSuccess
      v-if="showSuccessToast"
      class="z-50"
      :message="successMessage"
    />
  </div>
</template>
<script>
import mammoth from 'mammoth'
import { mapActions, mapState } from 'vuex'
import HeadingDetailExercise from '~/components/admin/exercise/DetailExercise/Heading.vue'
import ListQuestions from '~/components/admin/exercise/DetailExercise/List/ListQuestions.vue'
import RedirectQuestion from '~/components/admin/exercise/DetailExercise/RedirectQuestion.vue'
import SaveBtn from '~/components/common/SaveBtn.vue'
import BtnPushQ from '~/components/common/BtnPushQ.vue'
import ToastSuccess from '~/components/common/ToastSuccess.vue'

export default {
  name: 'DetailExercise',
  components: {
    HeadingDetailExercise,
    ListQuestions,
    SaveBtn,
    BtnPushQ,
    RedirectQuestion,
    ToastSuccess,
  },
  layout: 'defaultAdmin',

  data() {
    return {
      questions: [],
      exerciseID: null,
      detailExerciseDeep: null,
      showSuccessToast: false,
      successMessage: 'Tráo đề thành công! Save để lưu thay đổi.',
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
    // eslint-disable-next-line require-await
    async handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = async () => {
          const result = await this.convertToJSON(reader.result)
          this.questions = result.questions
          // Cập nhật detailExam.questions từ mảng questions
          this.$set(this.detailExamDeep, 'questions', result.questions)

          // Log ra mảng câu hỏi
          console.log('Mảng câu hỏi:', this.detailExamDeep.questions)
        }
        reader.readAsArrayBuffer(file)
      }
    },
    convertToJSON(fileContent) {
      return new Promise((resolve, reject) => {
        mammoth
          .extractRawText({ arrayBuffer: fileContent })
          .then((result) => {
            // console.log('Raw Text:', result.value) // Thêm dòng này để log nội dung trích xuất
            const json = this.parseRawTextToJSON(result.value)
            resolve(json)
          })
          .catch((error) => reject(error))
      })
    },
    parseRawTextToJSON(rawText) {
      const lines = rawText.split('\n')
      // console.log(lines)
      const questions = []
      let currentQuestion = null

      lines.forEach((line) => {
        if (line.startsWith('#')) {
          // Câu hỏi mới
          const questionContent = line.substring(2).trim()
          const randomId = Math.floor(Math.random(10) * 100000)
          currentQuestion = {
            random_Id: randomId,
            content: questionContent,
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
                currentQuestion.random_Id = Math.floor(Math.random(10) * 10000)
              }
            })
          } else {
            console.log('mang rong')
          }
          questions.push(currentQuestion)
        } else if (line.startsWith('-')) {
          const answerContent = line.substring(2).trim()
          const isCorrect = line.includes('(đúng)')
          const explanation = []

          let explanationIndex = lines.indexOf(line) + 1
          while (
            explanationIndex < lines.length &&
            !lines[explanationIndex].startsWith('#') &&
            !lines[explanationIndex].startsWith('-')
          ) {
            explanation.push(lines[explanationIndex].trim())
            explanationIndex++
          }
          const explan = explanation.join(' ')

          currentQuestion.answers.push({
            content: answerContent.replace(/\(.*\)/, '').trim(),
            explanation: explan,
            is_correct: isCorrect,
          })
        }
      })

      console.log('Questions:', questions)
      return { questions }
    },
    shuffleQuestions() {
      // Sử dụng thuật toán tráo phần tử Fisher-Yates (Knuth)
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.questions[i], this.questions[j]] = [
          this.questions[j],
          this.questions[i],
        ]
      }

      this.$set(this.detailExamDeep, 'questions', [...this.questions])
      this.showSuccessToast = true
      setTimeout(() => {
        this.showSuccessToast = false
      }, 2000)
      console.log(this.detailExamDeep.questions)
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
