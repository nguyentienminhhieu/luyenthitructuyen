<template>
  <div class="">
    <div
      class="flex flex-col rounded-md p-2 mt-2 border-2 border-[#f2f2f2f2] bg-[#69768cf2]"
      style="box-shadow: 4px 0 4px rgba(0, 0, 0, 0.1); border-radius: 8px"
    >
      <div class="flex flex-row">
        <div class="flex">
          <div class="">
            <div class="w-full">
              <TinyMCE
                :question="question"
                :question-content.sync="questionData.content"
              />
            </div>

            <div v-if="question.file" class="my-4 mx-auto">
              <button @click="clearImage">
                <i class="fa-solid fa-x"></i>
              </button>
              <img
                :src="question.file"
                alt="Ảnh"
                class="w-50 h-40 rounded-xl"
              />
            </div>
          </div>
        </div>
        <div
          class="flex flex-col items-center mt-2 ml-2 bg-[#ffff] max-h-[200px] rounded-xl"
        >
          <button
            v-if="!hasAnswers"
            class="hover:bg-gray-400 rounded-full p-[2px] m-2"
            @click="pushArrayQuestion"
          >
            Q+
          </button>
          <button
            class="hover:bg-gray-400 rounded-full p-[2px] m-2"
            @click="pushArrayAnswer"
          >
            A+
          </button>
          <button for="avatar" class="m-2">
            <label
              :for="`toggle-${question.random_Id || question.id}`"
              class="text-black rounded-full font-medium cursor-pointer"
            >
              <i
                class="fa-regular fa-image hover:bg-gray-400 rounded-full p-[5px]"
              ></i>
              <input
                :id="`toggle-${question.random_Id || question.id}`"
                type="file"
                class="hidden"
                accept="image/*"
                @change="
                  handleFileChange(question.random_Id || question.id, $event)
                "
              />
            </label>
          </button>
          <button @click="deleteQuestion">
            <i
              class="fa-regular fa-trash-can m-[2px] hover:bg-red-400 rounded-full p-[5px]"
            ></i>
          </button>
        </div>
      </div>
      <div v-for="answer in question.answers" :key="answer.id">
        <div class="p-2 rounded mb-1">
          <AnswerQuestion :answer="answer" @delete="deleteAnswer(answer)" />
        </div>
      </div>
    </div>

    <div class="mt-2 ml-20">
      <ListQuestions :questions-extends="question.questions_extends" />
    </div>
    <ToastError v-if="showErrorToast" class="z-50" :message="errorMessage" />
  </div>
</template>
<script>
// import ListQuestions from '~/components/admin/exams/DetailExam/List/ListQuestions.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import AnswerQuestion from './Answer.vue'
import ToastError from '~/components/common/ToastError.vue'
import TinyMCE from '~/components/admin/exams/DetailExam/TinyMCE.vue'
export default {
  name: 'QuestionExam',
  components: {
    // ListQuestions,
    AnswerQuestion,
    TinyMCE,
    ToastError,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    question: Object,
  },
  data() {
    return {
      questionData: {
        content: this.question.content,
      },
      selectedImage: this.question.file,
      showErrorToast: false,
      errorMessage: 'Lỗi! Dữ liệu trống không lưu được.',
    }
  },
  computed: {
    ...mapState('upload', ['fileUpload']),
    hasAnswers() {
      return this.question.answers.length > 0
    },
    questionFile() {
      if (this.question.id) {
        return this.question.random_Id
      } else {
        return this.question.random_Id
      }
    },
  },
  watch: {
    'questionData.content'(newVal) {
      this.$set(this.question, 'content', newVal)
    },
  },
  mounted() {},

  methods: {
    ...mapActions('upload', ['uploadFile']),
    ...mapMutations('exam', ['SET_QUESTIONS']),

    pushArrayQuestion() {
      const randomId = Math.floor(Math.random(10) * 1000)
      let newQuestion = {
        random_Id: randomId,
        content: '',
        slug: '',
        description: '',
        explanation: '',
        file: '',
        type: null,
        answers: [],
        questions_extends: [],
      }
      if (this.question.questions_extends.length > 0) {
        this.question.questions_extends.forEach((e) => {
          if (e.random_Id === randomId) {
            newQuestion.random_Id = Math.floor(Math.random(10) * 1000000)
          }
        })
      } else {
        console.log('mang rong')
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.questions_extends.push(newQuestion)
    },

    handleFileChange(id, event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        // eslint-disable-next-line no-self-compare
        reader.onload = async (e) => {
          const formData = new FormData()
          formData.append('image', file)
          await this.uploadFile(formData)
          if (this.fileUpload) {
            try {
              const match = /"url":\s*"([^"]+)"/.exec(this.fileUpload)
              if (match && match[1]) {
                const url = match[1]
                // eslint-disable-next-line vue/no-mutating-props
                this.question.file = url.replaceAll('\\', '')
              } else {
                console.log('Không tìm thấy giá trị URL.')
              }
            } catch (error) {
              console.error('Lỗi khi chuyển đổi dữ liệu JSON:', error)
            }
          } else {
            console.error('FileData không có giá trị.')
          }
        }
        reader.readAsDataURL(file)
      }
    },
    clearImage() {
      // eslint-disable-next-line vue/no-mutating-props
      this.question.file = null
    },
    deleteQuestion() {
      this.$emit('delete')
    },
    pushArrayAnswer() {
      let newAnswer = {
        random_Id: Math.floor(Math.random() * 100000),
        content: '',
        explanation: '',
        is_correct: false,
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.answers.push(newAnswer)
    },
    deleteAnswer(answer) {
      const index = this.question.answers.indexOf(answer)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answers.splice(index, 1)
      }
    },
  },
}
</script>
<style></style>
