<template>
  <div class="">
    <div class="flex flex-col rounded-md p-3 bg-gray-200 pl-2">
      <div class="flex justify-between m-2 border-b-[1px] border-[#555]">
        <div class="flex m-2">
          <!-- Input để nhập tiêu đề cho câu hỏi -->
          <div class="flex flex-col">
            <textarea
              v-if="inputTitle"
              v-model="newTitle"
              placeholder="Nhập tiêu đề..."
              class="border w-[600px] rounded p-2 m-4 outline-none resize-none"
            ></textarea>
            <!-- <CKEditor /> -->
            <!-- <TinyMCE
          v-if="inputTitle"
          :new-title="newTitle"
          @update-content="newContent"
        /> -->
            <div v-if="questionTitle" class="titleQuestion m-4 w-[600px]">
              {{ newTitle }}
            </div>
            <div class="my-5">
              <label
                for="avatar"
                class="bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
              >
                Tải ảnh câu hỏi
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  @change="handleFileChange"
                  class="hidden"
                />
              </label>
              <div class="my-4">
                <button v-if="question.img" @click="clearImage">
                  <i class="fa-solid fa-x"></i>
                </button>
                <img
                  v-if="question.img"
                  :src="question.img"
                  alt="Ảnh đại diện"
                  class="w-40 h-40 rounded-xl mx-auto"
                />
              </div>
            </div>
          </div>
          <button v-if="inputTitle" @click="saveQuestions">
            <i
              class="fa-solid fa-bookmark mx-6 text-gray-500 hover:text-gray-700"
            ></i>
          </button>
          <button v-if="questionTitle" @click="editQuestions">
            <i class="fas fa-edit text-gray-500 hover:text-gray-700"></i>
          </button>
        </div>

        <div class="">
          <button
            v-if="!hasAnswers"
            class="rounded-full bg-[#3F861E] p-2 mx-1 text-white"
            @click="pushArrayQuestion"
          >
            <i class="fas fa-plus">Q</i>
          </button>

          <button
            class="rounded-full bg-[#738e30] p-2 text-white"
            @click="pushArrayAnswer"
          >
            <i class="fas fa-plus">A</i>
          </button>
        </div>
        <!-- <div class="text-center">
          <button
            class="rounded-full p-2 bg-gray-400 hover:bg-gray-500"
            @click="deleteQuestion"
          >
            <i class="fa fa-trash text-white"></i>
          </button>
        </div> -->
      </div>
      <div v-for="answer in question.answers" :key="answer.id">
        <h1 class="ml-4 font-normal p-2 bg-[#ffff] rounded-lg">
          THÊM CÂU TRẢ LỜI
        </h1>
        <AnswerQuestion
          :answer="answer"
          @update-answer="updateAnswer"
          @delete="deleteAnswer(answer)"
        />
      </div>
    </div>

    <div class="ml-3 mt-3">
      <ListQuestions :list="question.listQuestions" />
    </div>
  </div>
</template>
<script>
// import ListQuestions from '~/components/admin/exams/DetailExam/List/ListQuestions.vue'
import AnswerQuestion from './Answer.vue'
// import TinyMCE from '@/components/admin/exams/DetailExam/TinyMCE.vue'
// import CKEditor from '@/components/admin/exams/DetailExam/CKEditor.vue'
export default {
  name: 'QuestionExam',
  components: {
    // ListQuestions,
    AnswerQuestion,
    // TinyMCE,
    // CKEditor,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    question: Object,
  },
  data() {
    return {
      isEditing: false,
      inputTitle: true,
      questionTitle: false,
      newTitle: '',
      newAnswerData: {
        content: '',
        isCorrect: false,
      },
      answerData: null,
      selectedImage: null,
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
            newQuestion.id = Math.floor(Math.random(10) * 1000)
          }
        })
      } else {
        console.log('error array null')
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.questions_extends.push(newQuestion)
      // console.log(this.question.listQuestions)
    },

    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.question.img = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    clearImage() {
      // this.selectedImage = null
      // eslint-disable-next-line vue/no-mutating-props
      this.question.img = null
    },

    // newContent(data) {
    //   console.log(data)
    //   this.newTitle = this.stripHTML(data)
    // },
    // stripHTML(html) {
    //   // Sử dụng một biểu thức chính quy để loại bỏ các tag HTML và lấy văn bản thuần.
    //   // const tempElement = document.createElement('div')
    //   // tempElement.innerHTML = html
    //   // return tempElement.textContent || tempElement.innerText || ''
    //   return html.replace(/<[^>]*>/g, '')
    // },
    saveQuestions() {
      if (this.selectedImage) {
        // eslint-disable-next-line vue/no-mutating-props
        // this.question.img = this.selectedImage
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
        is_correct: true,
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
