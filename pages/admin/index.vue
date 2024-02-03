<template>
  <div class="p-10">
    Dashboard
    <br />
    <div class="hidden">
      <input type="file" @change="handleFileUpload" />

      <!-- Hiển thị thông tin đề thi -->
      <h1>{{ examTitle }}</h1>
      <ul>
        <li v-for="(question, index) in questions" :key="index">
          <h3>{{ question.content }}</h3>
          <ul>
            <li v-for="answer in question.answers" :key="answer.id">
              {{ answer.content }} ({{ answer.is_correct ? 'Đúng' : 'Sai' }})
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mammoth from 'mammoth'

export default {
  name: 'Dashboard',
  components: {},
  layout: 'defaultAdmin',

  data() {
    return {
      examTitle: 'Đề Thi',
      questions: [],
    }
  },
  methods: {
    // eslint-disable-next-line require-await
    async handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = async () => {
          const result = await this.convertToJSON(reader.result)
          this.examTitle = result.examTitle
          this.questions = result.questions

          // Log ra mảng câu hỏi
          console.log('Mảng câu hỏi:', this.questions)
        }
        reader.readAsArrayBuffer(file)
      }
    },
    convertToJSON(fileContent) {
      return new Promise((resolve, reject) => {
        mammoth
          .extractRawText({ arrayBuffer: fileContent })
          .then((result) => {
            console.log('Raw Text:', result.value) // Thêm dòng này để log nội dung trích xuất
            const json = this.parseRawTextToJSON(result.value)
            resolve(json)
          })
          .catch((error) => reject(error))
      })
    },
    parseRawTextToJSON(rawText) {
      const lines = rawText.split('\n')
      console.log('Lines:', lines) // Thêm dòng này để log dữ liệu lines

      const questions = []
      let currentQuestion = null

      lines.forEach((line) => {
        if (line.startsWith('#')) {
          // Câu hỏi mới
          const questionContent = line.substring(2).trim()
          currentQuestion = {
            content: questionContent,
            slug: '',
            description: '',
            explanation: '',
            file: '',
            type: null,
            answers: [],
            questions_extends: [],
          }
          questions.push(currentQuestion)
        } else if (line.startsWith('-')) {
          // Câu trả lời
          const answerContent = line.substring(2).trim()
          const isCorrect = line.includes('(đúng)')
          currentQuestion.answers.push({
            content: answerContent,
            explanation: '',
            is_correct: isCorrect,
          })
        }
      })

      console.log('Questions:', questions) // Thêm dòng này để log dữ liệu questions
      return { examTitle: 'Đề Thi Mẫu', questions }
    },
  },
}
</script>

<style></style>
