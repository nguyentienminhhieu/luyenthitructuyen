<template>
  <div class="border-2 pl-2">
    <button class="rounded-full bg-[#3F861E] p-2 text-white" @click="pushArray">
      <i class="fas fa-plus"></i>
    </button>
    <h1>{{ question.id }}</h1>
    <div>
      <ListQuestions :list="question.listQuestions" />
      <!-- <ckeditor v-model="question.title" :config="ckeditorConfig"></ckeditor> -->
    </div>
  </div>
</template>
<script>
// import ListQuestions from '~/components/admin/exams/DetailExam/List/ListQuestions.vue'
// import CKEditor from 'ckeditor4-vue'
export default {
  name: 'QuestionExam',
  components: {
    // ListQuestions,
    // ckeditor: CKEditor,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    question: Object,
  },
  data() {
    return {
      ckeditorConfig: {
        // Cấu hình CKEditor theo ý muốn của bạn
        // Ví dụ: height, toolbar, language, ...
      },
    }
  },
  methods: {
    pushArray() {
      const randomId = Math.floor(Math.random(10) * 1000)
      let newQuestion = {
        id: randomId,
        title: '',
        slug: '',
        descriptions: '',
        answer: '',
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
      console.log(this.question.listQuestions)
    },
  },
}
</script>
<style></style>
