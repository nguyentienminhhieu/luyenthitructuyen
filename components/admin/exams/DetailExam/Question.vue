<template>
  <div class="">
    <div class="flex flex-col rounded-md p-2 bg-gray-200">
      <div class="flex justify-between">
        <div class="flex">
          <!-- Input để nhập tiêu đề cho câu hỏi -->
          <div class="">
            <!-- {{ question.id }} -->
            <div class="flex flex-row w-[70%]">
              <textarea
                v-if="inputTitle"
                v-model="newTitle"
                placeholder="Nhập câu hỏi..."
                class="border w-[700px] rounded p-2 m-4 outline-none"
                required
              ></textarea>
              <!-- <CKEditor /> -->
              <!-- <TinyMCE
              v-if="inputTitle"
              :new-title="newTitle"
              @update-content="newContent"
            /> -->
              <div v-if="questionTitle" class="m-4 w-[600px] break-words">
                {{ newTitle }}
              </div>
            </div>

            <div v-if="question.file" class="my-4">
              <button @click="clearImage">
                <i class="fa-solid fa-x"></i>
              </button>
              <img
                :src="question.file"
                alt="Ảnh đại diện"
                class="w-50 h-40 rounded-xl mx-auto"
              />
            </div>
          </div>
        </div>
        <!-- <div v-for="item in question.questions_extends" :key="item.id">
          <button @click="showChildQuestionId(item.id)">
            Câu hỏi con {{ item.id }}
          </button>
        </div> -->
        <div
          class="flex flex-col items-center bg-[#ffff] w-[40px] h-[180px] p-2 rounded-xl"
        >
          <button
            v-if="!hasAnswers"
            class="m-[2px] hover:bg-gray-400 rounded-full p-[2px]"
            @click="pushArrayQuestion"
          >
            Q+
          </button>
          <button
            class="m-[2px] hover:bg-gray-400 rounded-full p-[2px]"
            @click="pushArrayAnswer"
          >
            A+
          </button>
          <button for="avatar" class="border-b-[1px] border-[#000] mb-1">
            <label
              :for="`toggle-${question.id}`"
              class="text-black rounded-full font-medium cursor-pointer"
            >
              <i
                class="fa-regular fa-image m-[3px] hover:bg-gray-400 rounded-full p-[5px]"
              ></i>
              <input
                :id="`toggle-${question.id}`"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleFileChange(question.id, $event)"
              />
            </label>
          </button>
          <button v-if="inputTitle" @click="saveQuestions">
            <i
              class="fa-regular fa-floppy-disk m-[3px] hover:bg-blue-500 rounded-full p-[6px]"
            ></i>
          </button>
          <button v-if="questionTitle" @click="editQuestions">
            <i
              class="fa-regular fa-pen-to-square m-[3px] hover:bg-blue-300 rounded-full p-[5px]"
            ></i>
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
          <AnswerQuestion
            :answer="answer"
            @update-answer="updateAnswer"
            @delete="deleteAnswer(answer)"
          />
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
import AnswerQuestion from './Answer.vue'
import ToastError from '~/components/common/ToastError.vue'

// import {
//   saveDataToLocalStorage,
//   getDataFromLocalStorage,
// } from '~/mixins/localStorage'
// import TinyMCE from '@/components/admin/exams/DetailExam/TinyMCE.vue'
// import CKEditor from '@/components/admin/exams/DetailExam/CKEditor.vue'
export default {
  name: 'QuestionExam',
  components: {
    // ListQuestions,
    AnswerQuestion,
    // TinyMCE,
    // CKEditor,
    ToastError,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    question: Object,
    // eslint-disable-next-line vue/require-default-prop
    // file: String,
  },
  data() {
    return {
      isEditing: false,
      inputTitle: true,
      questionTitle: false,
      newTitle: this.question.content,
      newAnswerData: {
        content: '',
        isCorrect: false,
      },
      answerData: null,
      showErrorToast: false,
      errorMessage: 'Lỗi! Dữ liệu trống không lưu được.',
      localFile: this.file,
    }
  },
  computed: {
    hasAnswers() {
      return this.question.answers.length > 0
    },
  },

  methods: {
    pushArrayQuestion() {
      const randomId = Math.floor(Math.random(10) * 1000)
      let newQuestion = {
        id: randomId,
        content: '',
        slug: '',
        description: '',
        file: '',
        type: null,
        answers: [],
        questions_extends: [],
      }
      if (this.question.questions_extends.length > 0) {
        this.question.questions_extends.forEach((e) => {
          if (e.id === randomId) {
            newQuestion.id = Math.floor(Math.random(10) * 10000)
          }
        })
      } else {
        console.log('mang rong')
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.questions_extends.push(newQuestion)
      // eslint-disable-next-line no-unused-expressions
    },

    handleFileChange(id, event) {
      // this.$emit('id-questions-extends', this.question.questions_extends)
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        // eslint-disable-next-line no-self-compare
        reader.onload = (e) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.question.file = e.target.result
        }
        reader.readAsDataURL(file)
        console.log('id: ', id)
        console.log('id: ', event.target)
      }
    },
    clearImage() {
      this.$emit('clear-image', this.question)
    },
    saveQuestions() {
      if (this.newTitle.trim() === '') {
        this.showErrorToast = true
        setTimeout(() => {
          this.showErrorToast = false
        }, 3000)
        return
      }

      // eslint-disable-next-line vue/no-mutating-props
      this.question.content = this.newTitle
      this.questionTitle = true
      this.inputTitle = false
    },
    editQuestions() {
      this.inputTitle = true
      this.questionTitle = false
      // this.newTitle = this.question.title
    },
    deleteQuestion() {
      this.$emit('delete')
    },
    pushArrayAnswer() {
      let newAnswer = {
        id: Math.floor(Math.random() * 1000),
        content: '',
        explanation: '',
        is_correct: false,
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.answers.push(newAnswer)
    },
    updateAnswer(editedAnswer) {
      // Tìm vị trí của câu trả lời trong danh sách
      const index = this.question.answers.findIndex(
        (a) => a.id === editedAnswer.id
      )
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answers[index].content = editedAnswer.content
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answers[index].is_correct = editedAnswer.isCorrect
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answers[index].explanation = editedAnswer.explanation
      }
    },
    deleteAnswer(answers) {
      const index = this.question.answers.indexOf(answers)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answers.splice(index, 1)
      }
    },
  },
}
</script>
<style></style>
