<template>
  <div>
    Dashboard
    <TestExamComponents :list="listQuestions" />

    <!-- <TestExam2Components /> -->
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <button class="bg-black text-white" @click="pushArray">Add</button>
    <!-- {{ listQuestions }} -->
  </div>
</template>
<script>
import TestExamComponents from '~/components/testExam/TestExam'
// import TestExam2Components from '~/components/testExam2/TestExam2'
export default {
  name: 'Dashboard',
  components: {
    TestExamComponents,
    // TestExam2Components,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      listQuestions: [],
      question: {
        id: '',
        title: '',
        slug: '',
        descriptions: '',
      },
    }
  },
  methods: {
    pushArray() {
      const randomId = Math.random(10) * 1000
      const question = {
        id: randomId,
        title: '',
        slug: '',
        descriptions: '',
        listQuestions: [],
      }
      if (this.listQuestions.length > 0) {
        this.listQuestions.forEach((e) => {
          if (e.id === randomId) {
            question.id = Math.random(10) * 1000
          }
          // console.log(e)
        })
      } else {
        console.log('error array null')
      }
      // console.log(randomId)
      // this.question.id = 1
      // if(this.listQuestions.length > 0){
      //     this.question.id
      //   }
      // console.log(question)
      this.listQuestions.push(question)
      console.log(this.listQuestions)
    },
  },
}
</script>
<style></style>
