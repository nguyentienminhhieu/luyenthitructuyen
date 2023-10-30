<template>
  <div class="mt-5 max-h-[450px] overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="px-6 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            class="px-6 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Người đăng
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Lớp
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Môn học
          </th>
          <th
            class="px-1 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            isActive
          </th>
          <th class="px-1 py-3 border-2"></th>
          <!-- Ô trống cho nút Chỉnh sửa -->
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto" @click="goToDetailUser">
        <tr
          v-for="exam in listExam"
          :key="exam.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="px-2 py-4 border-2 whitespace-no-wrap">{{ exam.id }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            {{ exam.user_id }}
          </td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            {{ exam.category_id }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <input
              id="toggle"
              v-model="isActive"
              type="checkbox"
              class="hidden"
            />
            <!-- <input
              :id="`toggle-${exam.id}`"
              :checked="exam.is_active"
              type="checkbox"
              class="hidden"
              @change="toggleActive(exam)"
            /> -->
            <label for="toggle" class="flex items-center cursor-pointer">
              <div
                :class="{ 'bg-[#253d90]': !isActive, 'bg-gray-300': isActive }"
                class="w-12 h-6 rounded-full p-1"
              >
                <div
                  :class="{ 'translate-x-6': isActive }"
                  class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"
                ></div>
              </div>
            </label>
          </td>
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <button @click="editExercise">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700 ml-2"></i>
            </button>
            <button @click="deleteExercise">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
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
  name: 'TableExercise',
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    ...mapState('exam', ['listExam']),
  },
  mounted() {
    this.getListExam()
  },
  methods: {
    ...mapActions('exam', ['getListExam']),
    editExercise() {
      this.$router.push(`/admin/exercise/${this.$route.params.id}`)
    },
    deleteExercise() {
      this.$emit('delete-clicked')
    },
    goToDetailUser() {
      // this.$router.push(`/admin/users/students/${this.$route.params.id}`)
    },
  },
}
</script>
<style></style>
