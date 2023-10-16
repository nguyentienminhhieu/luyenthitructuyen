<template>
  <div class="ml-3">
    <div class="flex justify-between m-2 rounded-md p-3 bg-gray-200 pl-2">
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
              <button v-if="selectedImage" @click="clearImage">
                <i class="fa-solid fa-x"></i>
              </button>
              <img
                v-if="selectedImage"
                :src="selectedImage"
                alt="Ảnh đại diện"
                class="w-40 h-40 rounded-xl mx-auto"
              />
            </div>
          </div>
        </div>
        <button v-if="inputTitle" @click="saveQuestions">
          <i
            class="fa-regular fa-circle-check mx-6 text-gray-500 hover:text-gray-700"
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
    </div>

    <div v-for="answer in question.answer" :key="answer.id">
      <AnswerQuestion
        :answer="answer"
        @update-answer="updateAnswer"
        @delete="deleteAnswer(answer)"
      />
    </div>
    <div class="m-1">
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
      return this.question.answer.length > 0
    },
  },
  methods: {
    pushArrayQuestion() {
      const randomId = Math.floor(Math.random(10) * 1000)
      let newQuestion = {
        id: randomId,
        title: '',
        img: null,
        slug: '',
        descriptions: '',
        answer: [],
        listQuestions: [],
      }
      if (this.question.listQuestions.length > 0) {
        this.question.listQuestions.forEach((e) => {
          if (e.id === randomId) {
            newQuestion.id = Math.floor(Math.random(10) * 1000)
          }
        })
      } else {
        console.log('error array null')
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.listQuestions.push(newQuestion)
      // console.log(this.question.listQuestions)
    },

    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Đọc tệp hình ảnh và hiển thị nó trên giao diện
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedImage = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    clearImage() {
      this.selectedImage = null
      // eslint-disable-next-line vue/no-mutating-props
      this.question.img = null
    },

    newContent(data) {
      console.log(data)
      this.newTitle = this.stripHTML(data)
    },
    stripHTML(html) {
      // Sử dụng một biểu thức chính quy để loại bỏ các tag HTML và lấy văn bản thuần.
      // const tempElement = document.createElement('div')
      // tempElement.innerHTML = html
      // return tempElement.textContent || tempElement.innerText || ''
      return html.replace(/<[^>]*>/g, '')
    },
    saveQuestions() {
      if (this.newTitle) {
        // eslint-disable-next-line vue/no-mutating-props
        this.question.title = this.newTitle
      }
      this.questionTitle = true
      this.inputTitle = false
    },
    editQuestions() {
      this.inputTitle = true
      this.questionTitle = false
      this.newTitle = this.question.title
    },

    pushArrayAnswer() {
      let newAnswer = {
        id: Math.floor(Math.random() * 1000),
        content: '',
        img: '',
        isCorrect: true,
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.answer.push(newAnswer)
    },

    updateAnswer(editedAnswer) {
      // Tìm vị trí của câu trả lời trong danh sách
      const index = this.question.answer.findIndex(
        (a) => a.id === editedAnswer.id
      )
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answer[index].content = editedAnswer.content
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answer[index].isCorrect = editedAnswer.isCorrect
      }
    },

    deleteAnswer(answer) {
      const index = this.question.answer.indexOf(answer)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.question.answer.splice(index, 1)
      }
    },
  },
}
</script>
<style></style>
