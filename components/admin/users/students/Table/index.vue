<template>
  <div class="mt-5 max-h-[450px] overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Tên người dùng
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Vai trò
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Lớp
          </th>
          <th
            class="px-8 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Email
          </th>
          <th
            class="px-1 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Active
          </th>
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto" @click="goToDetailUser">
        <tr
          v-for="student in studentUser"
          :key="student.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ student.id }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ student.name }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ student.role === 1 ? 'Học Sinh' : 'Giáo Viên' }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ getGradeName(student.grade_id) }}
          </td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">
            {{ student.email }}
          </td>
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <input
              :id="`toggle-${student.id}`"
              :checked="student.active"
              type="checkbox"
              class="hidden"
              @change="toggleActive(student)"
            />
            <label
              :for="`toggle-${student.id}`"
              class="flex items-center cursor-pointer"
            >
              <div
                :class="{
                  'bg-[#253d90]': student.active === 1,
                  'bg-gray-300': student.active === 0,
                }"
                class="w-12 h-6 rounded-full p-1"
              >
                <div
                  :class="{ 'translate-x-6': student.active === 0 }"
                  class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"
                ></div>
              </div>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TableStudents',
  data() {
    return {}
  },
  computed: {
    ...mapState('users', ['listUser']),
    ...mapState('grade', ['listGrade']),
    studentUser() {
      const studentUser = this.listUser.filter((user) => user.role === 1)
      return studentUser.map((student) => ({
        ...student,
        gradeName: this.getGradeName(student.grade_id),
      }))
    },
  },
  mounted() {
    this.getListUser()
    this.getGrade()
  },

  methods: {
    ...mapActions('users', ['getListUser']),
    ...mapActions('users', ['activeUsers']),
    ...mapActions('grade', ['getGrade']),
    async toggleActive(item) {
      // console.log(123, item)
      try {
        const payload = {
          user_id: item.id,
        }
        await this.activeUsers(payload)
        await this.getListUser()
      } catch (error) {
        console.log('Lỗi server: ', error)
      }
    },
    editStudent() {
      this.$emit('edit-clicked')
    },
    deleteStudent(studentId) {
      this.$emit('delete-clicked', studentId)
    },
    goToDetailUser() {
      // this.$router.push(`/admin/users/students/${this.$route.params.id}`)
    },
    getGradeName(gradeId) {
      const grade = this.listGrade.find((g) => g.id === gradeId)
      return grade ? grade.name : 'Unknown Grade'
    },
  },
}
</script>
<style></style>
