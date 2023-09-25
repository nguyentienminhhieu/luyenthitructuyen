<template>
  <div class="p-6">
    <div id="totop">
      <HeadingDetailExam />
    </div>
    <div class="mt-10 flex flex-col lg:flex-row space-y-4 lg:space-y-0">
      <div class="lg:w-1/5">
        <DescriptionsExam />
      </div>
      <div class="ml-6 lg:w-4/5">
        <button
          class="mt-4 lg:mt-0 rounded-full bg-[#3F861E] p-2 text-white"
          @click="pushArray"
        >
          <i class="fas fa-plus"></i>
        </button>
        <ListQuestions :list="listQuestions" />
      </div>
    </div>
    <button
      v-if="isScrolling"
      class="fixed bottom-4 right-4 rounded-full bg-[#3F861E] p-2 text-white"
      @click="scrollToTop"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>
<script>
import HeadingDetailExam from '~/components/admin/exams/DetailExam/Heading.vue'
import DescriptionsExam from '~/components/admin/exams/DetailExam/DescriptionsExam.vue'
import ListQuestions from '~/components/admin/exams/DetailExam/List/ListQuestions.vue'

export default {
  name: 'DetailExam',
  components: {
    HeadingDetailExam,
    DescriptionsExam,
    ListQuestions,
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
        answer: '',
      },
      isScrolling: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
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
      if (this.listQuestions.length > 0) {
        this.listQuestions.forEach((e) => {
          if (e.id === randomId) {
            newQuestion.id = Math.floor(Math.random(10) * 10000)
          }
        })
      } else {
        console.log('error')
      }

      this.listQuestions.push(newQuestion)
      // eslint-disable-next-line no-console
      console.log(this.listQuestions)
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    handleScroll() {
      if (window.scrollY > window.innerHeight) {
        this.isScrolling = true
      } else {
        this.isScrolling = false
      }
    },
  },
}
</script>
<style></style>
