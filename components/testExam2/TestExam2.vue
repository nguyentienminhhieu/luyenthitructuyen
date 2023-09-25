<template>
  <div class="border-2 pl-2">
    <!-- <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br /> -->
    <!-- {{ question }} -->
    <button class="bg-black text-white" @click="pushArray">Add2</button>
    <h1>{{ question.id }}</h1>
    <h1>{{ question.title }}</h1>
    <h1>{{ question.slug }}</h1>
    <h1>{{ question.descriptions }}</h1>
    <div class="">
      <TestExam :list="question.listQuestions" />
    </div>
  </div>
</template>
<script>
// import TestExamComponents from '~/components/testExam/TestExam.vue'
export default {
  name: 'TestExam2Components',
  components: {
    // TestExamComponents,
  },
  layout: 'defaultAdmin',
  props: {
    question: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
  },
  data() {
    return {}
  },

  methods: {
    pushArray() {
      const randomId = Math.random(10) * 10000
      const question = {
        id: randomId,
        title: '',
        slug: '',
        descriptions: '',
        listQuestions: [],
      }
      if (this.question.listQuestions.length > 0) {
        this.question.listQuestions.forEach((e) => {
          if (e.id === randomId) {
            question.id = Math.random(10) * 1000
          }
          // console.log(e)
        })
      }
      // else {
      //   console.log('error array null')
      // }
      // eslint-disable-next-line vue/no-mutating-props
      this.question.listQuestions.push(question)
    },
  },
}
</script>
<style></style>
