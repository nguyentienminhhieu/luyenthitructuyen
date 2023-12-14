<template>
  <div class="p-10">Dashboard</div>
</template>
<script>
export default {
  name: 'Dashboard',
  components: {},
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
        })
      } else {
        console.log('error array null')
      }
      this.listQuestions.push(question)
      console.log(this.listQuestions)
    },
  },
}
</script>
<style></style>
