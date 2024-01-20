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
      <tbody class="max-h-400 overflow-y-auto" @click="goToDetailExercise">
        <tr
          v-for="exercise in listExerciseByAdmin"
          :key="exercise.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ exercise.id }}
          </td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            {{ exercise.title ? truncateText(exercise.title, 35) : '' }}
          </td>
          <td class="px-3 py-4 border-2 whitespace-no-wrap">
            <!-- {{ exercise.user_id === null ? 'Admin' : 'Giáo viên' }} -->
            Admin
          </td>
          <td class="px-3 py-4 border-2 whitespace-no-wrap">
            {{ exercise.category?.title }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ getFirstTenChars(exercise.created_at) }}
            /
            <!-- <br /> -->
            {{ getFirstTenChars(exercise.updated_at) }}
          </td>
          <!-- <td class="px-1 py-4 border-2 whitespace-no-wrap"></td> -->
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <input
              :id="`toggle-${exercise.id}`"
              :checked="exercise.is_active"
              type="checkbox"
              class="hidden"
              @change="toggleActive(exercise)"
            />
            <label
              :for="`toggle-${exercise.id}`"
              class="flex items-center cursor-pointer"
            >
              <div
                :class="{
                  'bg-[#253d90]': exercise.is_active === 1,
                  'bg-gray-300': exercise.is_active === 0,
                }"
                class="w-12 h-6 rounded-full p-1"
              >
                <div
                  :class="{ 'translate-x-6': exercise.is_active === 0 }"
                  class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"
                ></div>
              </div>
            </label>
          </td>
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <button @click="editExercise(exercise)">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteExercise(exercise.id)">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
            <button @click="detailExercise(exercise)">
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
  name: 'TableExercise',
  data() {
    return {
      isActive: false,
      currentPageNumber: this.currentPageNumber,
    }
  },
  computed: {
    ...mapState('exercise', ['listExercise']),
    ...mapState('exercise', ['currentPage ']),
    ...mapState('exercise', ['totalPages']),
    ...mapState('exercise', ['itemsPerPage']),
    ...mapState('exercise', ['totalItems']),
    ...mapState('category', ['listCategory']),
    listExerciseByAdmin() {
      return this.listExercise.filter((exam) => exam.user_id === null)
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
      localStorage.setItem('currentPageNumberExercise', newPageNumber)
    },
  },
  mounted() {
    this.currentPageNumber =
      parseInt(localStorage.getItem('currentPageNumberExercise')) || 1

    this.getListExerciseAdmin()
    this.getCategory()
    localStorage.removeItem('questionData')
  },
  methods: {
    ...mapActions('exercise', ['getListExercise']),
    ...mapActions('exercise', ['activeExercise']),
    ...mapActions('category', ['getCategory']),
    async getListExerciseAdmin() {
      try {
        await this.$store.dispatch('exercise/getListExercise', {
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
        await this.activeExercise(payload)
        await this.getListExercise({ page: this.currentPageNumber })
      } catch (error) {
        console.log('Lỗi server: ', error)
      }
    },
    detailExercise(exerciseItem) {
      this.$router.push({
        path: `/admin/exercise/exerciseAdmin/${exerciseItem.slug}`,
        query: { exerciseID: exerciseItem.id },
      })
      console.log(123)
    },
    editExercise(exercise) {
      this.$emit('edit-click', exercise)
    },
    deleteExercise(exerciseId) {
      this.$emit('delete-clicked', exerciseId)
    },
    goToDetailExercise() {
      // this.$router.push(`/admin/exercise/${this.$route.params.id}`)
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
        await this.$store.dispatch('exercise/getListExercise', {
          page: this.currentPageNumber,
        })
      }
    },
    async goToPrevPage() {
      if (this.currentPageNumber > 1) {
        this.currentPageNumber--
        await this.$store.dispatch('exercise/getListExercise', {
          page: this.currentPageNumber,
        })
      }
    },
    async goToPage(pageNumber) {
      this.currentPageNumber = pageNumber
      await this.$store.dispatch('exercise/getListExercise', {
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
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
