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
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    listQuestions: Array,
  },
  data() {
    return {
      saveExam: null,
      isScrolling: false,
    }
  },

  methods: {
    Savedata() {
      let payload = {
        title: '',
        slug: '',
        description: '',
        max_score: 100,
        duration: 60,
        category_id: 1,
        questions: this.listQuestions,
      }
      this.saveExam = payload
      console.log(payload)
      this.$emit('send-data', this.saveExam)
    },
  },
}
</script>
<style></style>
