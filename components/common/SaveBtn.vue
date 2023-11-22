<template>
  <div>
    <button
      class="fixed bottom-16 right-5 rounded-full bg-[#2743cf] px-4 py-3 mb-2 text-white"
      @click="Savedata"
    >
      <i class="fa-regular fa-floppy-disk"></i>
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    listQuestions: Array,
    // eslint-disable-next-line vue/require-default-prop
    detailExam: Object,
  },
  data() {
    return {
      saveExam: null,
      isScrolling: false,
    }
  },
  // watch: {
  //   detailExam: {
  //     handler(newQuestions) {
  //       // eslint-disable-next-line vue/no-mutating-props
  //       this.detailExam.questions = this.listQuestions
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  mounted() {
    // this.updateExam()
    // this.getListExam()
  },

  methods: {
    ...mapActions('exam', ['updateExam']),
    // ...mapActions('exam', ['getDetailExam']),
    // ...mapActions('exam', ['getListExam']),

    //
    async Savedata() {
      try {
        let payload = {
          id: this.detailExam.id,
          title: this.detailExam.title,
          description: this.detailExam.description,
          slug: this.detailExam.slug,
          category_id: this.detailExam.category_id,
          duration: this.detailExam.duration,
          max_score: this.detailExam.max_score,
          url_img: this.detailExam.url_img,
          question_ids: this.detailExam.question_ids,
          questions: this.listQuestions,
        }
        await this.updateExam(payload)
        // this.$router.push('/admin/exams')
        console.log('123', this.listQuestions)
        // eslint-disable-next-line vue/no-mutating-props
        // this.listQuestions = this.detailExam.questions
        this.saveExam = payload
        console.log('kkkk', this.detailExam.questions)
        this.$emit('send-data', this.detailExam.questions)
      } catch (error) {
        console.log('Error:', error)
      }
    },
    saveDataToLocalStorage() {
      localStorage.setItem('questionData', JSON.stringify(this.questions))
    },
  },
}
</script>
<style></style>
