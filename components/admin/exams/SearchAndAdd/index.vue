<template>
  <div class="flex items-center justify-end space-x-8 my-5">
    <div class="relative">
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="search-input border-b-2 border-gray-300 rounded py-2 px-4 focus:outline-none text-sm w-[300px]"
          @input="performSearch"
          @keyup.enter="performSearch"  
        />
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-color-custom hover:text-gray-600 focus:outline-none"
          @click="performSearch"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <div class="relative">
      <label
        for="gradeSelect"
        class="absolute top-0 left-0 ml-2 mt-1 text-gray-500 transition-transform transform-origin-left"
        :class="{ hidden: selectedOptionRole }"
      >
        Vai trò
      </label>
      <select
        id="gradeSelect"
        v-model="selectedOptionRole"
        class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none shadow-xl"
        @change="handleOptionRole"
      >
        <option value="admin">Admin</option>
        <option value="teacher">Giáo viên</option>
      </select>
    </div>
    <div class="relative">
      <label
        for="gradeSelect"
        class="absolute top-0 left-0 ml-2 mt-1 text-gray-500 transition-transform transform-origin-left"
        :class="{ hidden: selectedOptionSubject }"
      >
        Subject
      </label>
      <select
        id="gradeSelect"
        v-model="selectedOptionSubject"
        class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none shadow-xl"
        @change="handleOptionSubject"
      >
        <option v-for="item in listSubject" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="relative">
      <label
        for="gradeSelect"
        class="absolute top-0 left-0 ml-2 mt-1 text-gray-500 transition-transform transform-origin-left"
        :class="{ hidden: selectedOptionGrade }"
      >
        Grade
      </label>
      <select
        id="gradeSelect"
        v-model="selectedOptionGrade"
        class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none shadow-xl"
        @change="handleOptionGrade"
      >
        <option v-for="item in listGrade" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>

    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      @click="handleAddClick"
    >
      Add
    </button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import InputSearch from '~/components/common/searchData/searchInput'
export default {
  name: 'SearchAddOptionExercise',
  components: {
    // InputSearch,
  },
  data() {
    return {
      selectedOptionSubject: null,
      selectedOptionGrade: null,
      selectedOptionRole: null,
      searchQuery: '',
    }
  },
  computed: {
    ...mapState('subject', ['listSubject']),
    ...mapState('grade', ['listGrade']),
    ...mapState('exam', ['listExam']),
    ...mapState('exam', ['currentPage']),
  },
  mounted() {
    this.getSubjects()
    this.getGrade()
  },
  methods: {
    ...mapActions('subject', ['getSubjects']),
    ...mapActions('grade', ['getGrade']),
    ...mapActions('exam', ['getListExam']),
    async performSearch() {
      await this.$store.dispatch('exam/getListExam', {
        title: this.searchQuery,
        type: this.selectedOptionRole,
        page: this.currentPage,
        subject_id: this.selectedOptionSubject,
        grade_id: this.selectedOptionGrade,
      })
    },
    async handleOptionRole() {
      await this.$store.dispatch('exam/getListExam', {
        title: this.searchQuery,
        type: this.selectedOptionRole,
        page: this.currentPage,
        subject_id: this.selectedOptionSubject,
        grade_id: this.selectedOptionGrade,
      })
    },
    async handleOptionSubject() {
      await this.$store.dispatch('exam/getListExam', {
        title: this.searchQuery,
        type: this.selectedOptionRole,
        page: this.currentPage,
        subject_id: this.selectedOptionSubject,
        grade_id: this.selectedOptionGrade,
      })
    },
    async handleOptionGrade() {
      await this.$store.dispatch('exam/getListExam', {
        title: this.searchQuery,
        type: this.selectedOptionRole,
        page: this.currentPage,
        subject_id: this.selectedOptionSubject,
        grade_id: this.selectedOptionGrade,
      })
    },
    handleAddClick() {
      this.$emit('add-clicked')
    },
  },
}
</script>
<style></style>
