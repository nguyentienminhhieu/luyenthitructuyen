<template>
  <div>
    <div class="flex items-center space-x-2 my-5">
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        @click="goToPrevPage"
        :disabled="currentPage === 1"
      >
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <ul class="flex items-center space-x-2">
        <li
          v-for="page in totalPages"
          :key="page"
          :class="['number', { active: currentPage === page }]"
          @click="goToPage(page)"
          class="font-medium py-2 px-3 bg-[#f4f4f5] text-[#7d7d7d] hover:bg-[#3958ad] hover:text-[#fff] rounded-lg cursor-pointer"
        >
          {{ page }}
        </li>
      </ul>
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
      >
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaginationTableExam',
  props: {

  },
  data() {
    return {
      listExam: [],
      currentPage: 1,
      itemsPerPage: 6,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.listExam.length / this.itemsPerPage)
    },
  },
  methods: {
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
  },
}
</script>
<style></style>
