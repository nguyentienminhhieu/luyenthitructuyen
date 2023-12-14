<template>
  <div class="mt-5 max-h-[480px] overflow-x-auto">
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
            isActive
          </th>
          <th class="px-1 py-3 border-2"></th>
          <!-- Ô trống cho nút Chỉnh sửa -->
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto" @click="goToDetailExam">
        <tr
          v-for="exam in listExamByTeacher"
          :key="exam.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="px-2 py-4 border-2 whitespace-no-wrap">{{ exam.id }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            {{ exam.title ? truncateText(exam.title, 35) : '' }}
          </td>
          <td class="px-3 py-4 border-2 whitespace-no-wrap">
            {{ exam.user_id === null ? 'Admin' : 'Giáo viên' }}
          </td>
          <td class="px-3 py-4 border-2 whitespace-no-wrap">
            {{ exam.category_id }}
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
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TableExamsByTeacher',
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    ...mapState('exam', ['listExam']),
    ...mapState('category', ['listCategory']),
    listExamByTeacher() {
      return this.listExam.filter((exam) => exam.user_id !== null)
    },
  },
  mounted() {
    this.getListExam()
    this.getCategory()
    localStorage.removeItem('questionData')
  },
  methods: {
    ...mapActions('exam', ['getListExam']),
    ...mapActions('exam', ['activeExam']),
    ...mapActions('category', ['getCategory']),

    async toggleActive(item) {
      try {
        const payload = {
          id: item.id,
        }
        await this.activeExam(payload)
        await this.getListExam()
      } catch (error) {
        console.error('Lỗi server: ', error)
      }
    },
    detailExam(examItem) {
      this.$router.push({
        path: `/admin/exams/examTeacher${examItem.slug}`,
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
  },
}
</script>
<style></style>
