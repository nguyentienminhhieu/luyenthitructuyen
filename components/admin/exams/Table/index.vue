<template>
  <div class="mt-5 overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="px-6 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Title
          </th>
          <th
            class="px-3 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Người đăng
          </th>
          <th
            class="px-3 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Loại Đề
          </th>
          <th
            class="px-3 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Ngày đăng/Ngày sửa
          </th>
          <!-- <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Môn học
          </th> -->
          <th
            class="px-1 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Active
          </th>
          <th class="px-1 py-3 border-2"></th>
          <!-- Ô trống cho nút Chỉnh sửa -->
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto" @click="goToDetailExam">
        <tr
          v-for="exam in listExamByAdmin"
          :key="exam.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="px-2 py-4 border-2 whitespace-no-wrap">{{ exam.id }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            {{ exam.title ? truncateText(exam.title, 35) : '' }}
          </td>
          <td class="px-3 py-4 border-2 whitespace-no-wrap">
            <!-- {{ exam.user === null ? 'Admin' : 'Giáo viên' }} -->
            Admin
          </td>
          <td class="px-3 py-4 border-2 whitespace-no-wrap">
            {{ exam.category?.title }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ getFirstTenChars(exam.created_at) }}
            /
            <!-- <br /> -->
            {{ getFirstTenChars(exam.updated_at) }}
          </td>
          <!-- <td class="px-1 py-4 border-2 whitespace-no-wrap"></td> -->
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <input
              :id="`toggle-${exam.id}`"
              :checked="exam.is_active"
              type="checkbox"
              class="hidden"
              @change="toggleActive(exam)"
            />
            <label
              :for="`toggle-${exam.id}`"
              class="flex items-center cursor-pointer"
            >
              <div
                :class="{
                  'bg-[#253d90]': exam.is_active === 1,
                  'bg-gray-300': exam.is_active === 0,
                }"
                class="w-12 h-6 rounded-full p-1"
              >
                <div
                  :class="{ 'translate-x-6': exam.is_active === 0 }"
                  class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"
                ></div>
              </div>
            </label>
          </td>
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <button @click="editExam(exam)">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteExam(exam.id)">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
            <button @click="detailExam(exam)">
              <i
                class="fa-regular fa-eye text-yellow-600 hover:text-yellow-700 ml-2"
              ></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex items-center space-x-2 mt-8">
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        :class="currentPageNumber === 1 ? 'disabled' : ''"
        @click="goToPrevPage"
      >
        <!-- :disabled="currentPageNumber === 1" -->
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <ul class="flex items-center space-x-2">
        <li
          v-for="page in totalPagesToShow"
          :key="page"
          :class="{
            active:
              currentPageNumber === page || (!currentPageNumber && page === 1),
          }"
          class="font-medium py-2 px-3 bg-[#f4f4f5] text-[#7d7d7d] hover:bg-[#3958ad] hover:text-[#fff] rounded-lg cursor-pointer"
          @click="goToPage(page)"
        >
          {{ page }}
        </li>
        <!-- Hiển thị ba dấu chấm (...) nếu totalPagesToShow.length > 7 và currentPageNumber < totalPages - 3 -->
        <li
          v-if="
            totalPagesToShow.length < totalPages &&
            currentPageNumber < totalPages - 3
          "
          class="font-medium py-2 px-3 bg-[#f4f4f5] text-[#7d7d7d] rounded-lg cursor-pointer disabled"
        >
          ...
        </li>
        <li
          v-if="
            totalPagesToShow.length < totalPages &&
            currentPageNumber < totalPages - 3
          "
          class="font-medium py-2 px-3 bg-[#f4f4f5] text-[#7d7d7d] rounded-lg cursor-pointer"
          @click="goToLastPages"
        >
          {{ totalPages - 1 }}
        </li>
        <!-- Hiển thị trang cuối cùng -->
        <li
          v-if="
            totalPagesToShow.length < totalPages &&
            currentPageNumber < totalPages - 3
          "
          class="font-medium py-2 px-3 bg-[#f4f4f5] text-[#7d7d7d] rounded-lg cursor-pointer"
          @click="goToLastPages"
        >
          {{ totalPages }}
        </li>
      </ul>
      <!-- :disabled="currentPageNumber === totalPages" -->
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        :class="currentPageNumber === totalPages ? 'disabled' : ''"
        @click="goToNextPage"
      >
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TableExams',
  data() {
    return {
      isActive: false,
      currentPageNumber: this.currentPage,
    }
  },
  computed: {
    ...mapState('exam', ['listExam']),
    ...mapState('exam', ['currentPage ']),
    ...mapState('exam', ['totalPages']),
    ...mapState('exam', ['itemsPerPage']),
    ...mapState('exam', ['totalItems']),
    ...mapState('category', ['listCategory']),
    listExamByAdmin() {
      return this.listExam.filter((exam) => exam.user_id === null)
    },
    totalPagesToShow() {
      const pages = []
      const startPage = Math.max(1, this.currentPageNumber - 3)
      const endPage = Math.min(this.totalPages, startPage + 4)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      return pages
    },
  },
  watch: {
    currentPageNumber(newPageNumber) {
      localStorage.setItem('currentPageNumberExam', newPageNumber)
    },
  },
  mounted() {
    this.currentPageNumber =
      parseInt(localStorage.getItem('currentPageNumberExam')) || 1

    this.getListExamAdmin()
    this.getCategory()
    localStorage.removeItem('questionData')
  },
  methods: {
    ...mapActions('exam', ['getListExam']),
    ...mapActions('exam', ['activeExam']),
    ...mapActions('category', ['getCategory']),
    async getListExamAdmin() {
      try {
        await this.$store.dispatch('exam/getListExam', {
          page: this.currentPageNumber,
        })
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    },
    async toggleActive(item) {
      try {
        const payload = {
          id: item.id,
        }
        await this.activeExam(payload)
        await this.getListExam({ page: this.currentPageNumber })
      } catch (error) {
        console.error('Lỗi server: ', error)
      }
    },
    detailExam(examItem) {
      this.$router.push({
        path: `/admin/exams/examAdmin/${examItem.slug}`,
        query: { examID: examItem.id },
      })
    },
    editExam(exam) {
      this.$emit('edit-click', exam)
    },
    deleteExam(examId) {
      this.$emit('delete-clicked', examId)
    },
    goToDetailExam() {
      // this.$router.push(`/admin/exams/${this.$route.params.id}`)
    },
    getFirstTenChars(text) {
      return text ? text.slice(0, 10) : ''
    },
    truncateText(text, maxLength) {
      return text && typeof text === 'string'
        ? text.length > maxLength
          ? text.substring(0, maxLength) + '...'
          : text
        : ''
    },
    async goToNextPage() {
      if (this.currentPageNumber < this.totalPages) {
        this.currentPageNumber++
        await this.$store.dispatch('exam/getListExam', {
          page: this.currentPageNumber,
        })
      }
    },
    async goToPrevPage() {
      if (this.currentPageNumber > 1) {
        this.currentPageNumber--
        await this.$store.dispatch('exam/getListExam', {
          page: this.currentPageNumber,
        })
      }
    },
    async goToPage(pageNumber) {
      this.currentPageNumber = pageNumber
      await this.$store.dispatch('exam/getListExam', {
        page: this.currentPageNumber,
      })
    },
    goToLastPages() {
      this.currentPageNumber = this.totalPages - 1
      this.$store.dispatch('exam/getListExam', { page: this.currentPageNumber })
    },
  },
}
</script>
<style scoped>
.active {
  background-color: #3958ad;
  color: #ffff;
}
.disabled {
  background-color: #e8e8e8;
  cursor: not-allowed;
}
</style>
