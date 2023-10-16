<template>
  <div class="p-6">
    <div>
      <HeadingDetailExam />
    </div>
    <!-- <button class="" @click="PostExam()">Save</button>
    {{ save }} -->
    <div class="mt-10 flex flex-col lg:flex-row space-y-4 lg:space-y-0">
      <div class="lg:w-1/5">
        <RedirectQuestion @edit-clicked="showEditModal = true" />
      </div>
      <div class="ml-4 lg:w-4/5">
        <!-- <DescriptionsExam /> -->
        <div class="flex justify-between m-1 rounded-md py-3 bg-gray-200 pl-2">
          <div class="text-xl font-medium mb-1">
            <h1>TitleTitleTitleTitleTitleTitleTitleTitleTitle</h1>
          </div>
          <button
            class="m-4 lg:mt-0 rounded-full bg-[#3F861E] px-3 py-2 text-white"
            @click="pushArray"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <ListQuestions :questions-extends="questions_extends" />
      </div>
    </div>
    <ModalEditExam :show-modal="showEditModal" @close="showEditModal = false" />
    <SaveBtn :list-questions="questions_extends" />
  </div>
</template>
<script>
import HeadingDetailExam from '~/components/admin/exams/DetailExam/Heading.vue'
import ListQuestions from '~/components/admin/exams/DetailExam/List/ListQuestions.vue'
import RedirectQuestion from '~/components/admin/exams/DetailExam/redirectQuestion.vue'
// import DescriptionsExam from '~/components/admin/exams/DetailExam/DescriptionsExam.vue'
import ModalEditExam from '~/components/admin/exams/ModalEdit'
import SaveBtn from '~/components/common/SaveBtn.vue'
export default {
  name: 'DetailExam',
  components: {
    HeadingDetailExam,
    RedirectQuestion,
    ListQuestions,
    // DescriptionsExam,
    ModalEditExam,
    SaveBtn,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      save: null,
      questions_extends: [],
      question: {
        id: '',
        content: '',
        slug: '',
        description: '',
        file: '',
        type: null,
        answers: [],
      },
      showEditModal: false,
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
      if (this.questions_extends.length > 0) {
        this.questions_extends.forEach((e) => {
          if (e.id === randomId) {
            newQuestion.id = Math.floor(Math.random(10) * 10000)
          }
        })
      } else {
        console.log('error')
      }

      this.questions_extends.push(newQuestion)
      // eslint-disable-next-line no-console
      console.log(this.questions_extends)
    },
    PostExam() {
      let payload = {
        title: '',
        slug: '',
        description: '',
        max_score: 100,
        duration: 60,
        category_id: 1,
        questions: this.questions_extends,
      }
      this.save = payload
      console.log('log', payload)
    },
  },
}
</script>
<style></style>
