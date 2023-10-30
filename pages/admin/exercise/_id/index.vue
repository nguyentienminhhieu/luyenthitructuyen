<template>
  <div class="p-6">
    <div>
      <HeadingDetailExam />
    </div>
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
        <ListQuestions :list="listQuestions" />
      </div>
    </div>
    <ModalEditExam :show-modal="showEditModal" @close="showEditModal = false" />
    <!-- <SaveBtn :list-questions="listQuestions" /> -->
  </div>
</template>
<script>
import HeadingDetailExam from '~/components/admin/exercise/DetailExam/Heading.vue'
import ListQuestions from '~/components/admin/exercise/DetailExam/List/ListQuestions.vue'
import RedirectQuestion from '~/components/admin/exercise/DetailExam/redirectQuestion.vue'
// import DescriptionsExam from '~/components/admin/exercise/DetailExam/DescriptionsExam.vue'
import ModalEditExam from '~/components/admin/exercise/ModalEdit'
// import SaveBtn from '~/components/common/SaveBtn.vue'
export default {
  name: 'DetailExam',
  components: {
    HeadingDetailExam,
    RedirectQuestion,
    ListQuestions,
    // DescriptionsExam,
    ModalEditExam,
    // SaveBtn,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      listQuestions: [],
      question: {
        id: '',
        title: '',
        img: null,
        slug: '',
        descriptions: '',
        answer: [],
      },
      showEditModal: false,
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
        answer: [],
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
  },
}
</script>
<style></style>
