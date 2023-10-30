<template>
  <div class="m-10">
   

    <h1 class="text-3xl font-semibold mb-4">Tạo Đề Thi</h1>
    <form @submit.prevent="addQuestion">
      <div class="mb-4">
        <label for="question">Câu hỏi:</label>
        <textarea
          v-model="question"
          id="question"
          class="border p-2 w-full"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="options">Các câu trả lời:</label>
        <input
          v-for="(option, index) in options"
          :key="index"
          v-model="options[index]"
          class="border p-2 w-full mb-2"
          :placeholder="'Option ' + (index + 1)"
          required
        />
      </div>
      <button
        type="button"
        @click="addOption"
        class="bg-blue-500 text-white p-2"
      >
        Thêm lựa chọn
      </button>
      <div class="mb-4">
        <label for="correct">Câu trả lời đúng:</label>
        <select
          v-model="correct"
          id="correct"
          class="border p-2 w-full"
          required
        >
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="index"
          >
            {{ 'Option ' + (index + 1) }}
          </option>
        </select>
      </div>
      <button type="submit" class="bg-green-500 text-white p-2">
        Lưu câu hỏi
      </button>
    </form>
    <div class="mt-6">
      <h2 class="text-xl font-semibold">Các câu hỏi đã tạo:</h2>
      <ul>
        <li v-for="(q, index) in questions" :key="index">{{ q.question }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Posts',
  layout: 'defaultAdmin',
  data() {
    return {
      question: '',
      options: ['', ''],
      correct: 0,
      questions: [],
    }
  },
  methods: {
    addOption() {
      this.options.push('')
    },
    addQuestion() {
      this.questions.push({
        question: this.question,
        options: this.options,
        correct: this.correct,
      })
      this.question = ''
      this.options = ['', '']
      this.correct = 0
    },
  },
}
</script>
<style></style>
