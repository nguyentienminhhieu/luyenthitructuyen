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
          v-for="exercise in listExerciseByTeacher"
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
            Giáo viên
          </td>
          <td class="px-3 py-4 border-2 whitespace-no-wrap">
            <!-- {{ exercise.category_id }} -->
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
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TableExerciseTeacher',
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    ...mapState('exercise', ['listExercise']),
    ...mapState('category', ['listCategory']),
    listExerciseByTeacher() {
      return this.listExercise.filter((exam) => exam.user_id !== null)
    },
  },
  mounted() {
    this.getListExercise()
    this.getCategory()
    localStorage.removeItem('questionData')
  },
  methods: {
    ...mapActions('exercise', ['getListExercise']),
    ...mapActions('exercise', ['activeExercise']),
    ...mapActions('category', ['getCategory']),

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
        path: `/admin/exercise/exerciseTeacher/${exerciseItem.slug}`,
        query: { exerciseID: exerciseItem.id },
      })
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
  },
}
</script>
<style></style>
