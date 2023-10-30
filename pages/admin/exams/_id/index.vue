<template>
  <div class="p-3">
    <div>
      <HeadingDetailExam />
    </div>
    <!-- {{ saveExam }} -->

    <div
      class="sticky text-[#cfcfcf] top-[56px] flex justify-between m-1 rounded-md py-3 bg-gray-700 pl-2"
    >
      <div class="mr-4 break-words">
        <h1 class="text-xl font-medium mb-1">TitleTitleTitleTitleTitle</h1>
        <h2 class="">
          Mô tả: TitleTitle TitleTitle TitleTitle TitleTitle TitleTitle
          TitleTitle TitleTitle TitleTitle TitleTitle TitleTitle TitleTitle
        </h2>
      </div>
      <button
        class="m-2 lg:mt-0 rounded-full bg-[#576574] hover:bg-[#576574] px-3 py-2 text-white"
        @click="pushArray"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="mt-4 flex flex-row">
      <div class="lg:w-1/6">
        <RedirectQuestion @edit-clicked="showEditModal = true" />
      </div>

      <div class="lg:w-5/6">
        <!-- <div> -->
        <ListQuestions :questions-extends="questions" />
      </div>
    </div>
    <ModalEditExam :show-modal="showEditModal" @close="showEditModal = false" />
    <SaveBtn :list-questions="questions" @send-data="data" />
  </div>
</template>
<script>
import HeadingDetailExam from '~/components/admin/exams/DetailExam/Heading.vue'
import ListQuestions from '~/components/admin/exams/DetailExam/List/ListQuestions.vue'
// import RedirectQuestion from '~/components/admin/exams/DetailExam/redirectQuestion.vue'
// import DescriptionsExam from '~/components/admin/exams/DetailExam/DescriptionsExam.vue'
import ModalEditExam from '~/components/admin/exams/ModalEdit'
import SaveBtn from '~/components/common/SaveBtn.vue'
export default {
  name: 'DetailExam',
  components: {
    HeadingDetailExam,
    // RedirectQuestion,
    ListQuestions,
    // DescriptionsExam,
    ModalEditExam,
    SaveBtn,
  },
  layout: 'defaultAdmin',

  data() {
    return {
      saveExam: null,
      questions: [],
      showEditModal: false,
    }
  },
  watch: {
    questions: {
      handler(newQuestions) {
        this.saveDataToLocalStorage()
      },
      deep: true, // Theo dõi các thay đổi sâu bên trong biến questions
    },
  },
  mounted() {
    const questionData = localStorage.getItem('questionData')
    if (questionData) {
      try {
        this.questions = JSON.parse(questionData)
      } catch (error) {
        console.error('Lỗi phân tích JSON: ', error)
      }
    } else {
      this.questions = []
    }
  },
  methods: {
    pushArray() {
      const randomId = Math.floor(Math.random(10) * 1000)
      let newQuestion = {
        id: randomId,
        content: '',
        slug: '',
        description: '',
        file: '',
        type: null,
        answers: [],
        questions_extends: [],
      }
      if (this.questions.length > 0) {
        this.questions.forEach((e) => {
          if (e.id === randomId) {
            newQuestion.id = Math.floor(Math.random(10) * 10000)
          }
        })
      } else {
        console.log('mang rong')
      }
      this.questions.push(newQuestion)
      this.saveDataToLocalStorage()
    },

    saveDataToLocalStorage() {
      localStorage.setItem('questionData', JSON.stringify(this.questions))
    },

    // PostExam() {
    //   let payload = {
    //     title: '',
    //     slug: '',
    //     description: '',
    //     max_score: 100,
    //     duration: 60,
    //     category_id: 1,
    //     questions: this.questions,
    //   }
    //   this.saveExam = payload
    //   // console.log('log', payload)
    // },
    data(item) {
      this.saveExam = item
    },
  },
}
</script>
<style></style>
