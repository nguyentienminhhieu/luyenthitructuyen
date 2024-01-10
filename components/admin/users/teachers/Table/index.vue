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
      <tbody
        class="max-h-400 overflow-y-auto custom-scrollbar"
        @click="goToDetailUser"
      >
        <tr
          v-for="teacher in teacherUser"
          :key="teacher.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ teacher.id }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ teacher.name }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ teacher.role === 2 ? 'Giáo Viên' : 'Học Sinh' }}
          </td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">
            {{ teacher.email }}
          </td>
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <input
              :id="`toggle-${teacher.id}`"
              :checked="teacher.active"
              type="checkbox"
              class="hidden"
              @change="toggleActive(teacher)"
            />
            <label
              :for="`toggle-${teacher.id}`"
              class="flex items-center cursor-pointer"
            >
              <div
                :class="{
                  'bg-[#253d90]': teacher.active === 1,
                  'bg-gray-300': teacher.active === 0,
                }"
                class="w-12 h-6 rounded-full p-1"
              >
                <div
                  :class="{ 'translate-x-6': teacher.active === 0 }"
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
  name: 'TableTeachers',
  data() {
    return {}
  },
  computed: {
    ...mapState('users', ['listUser']),
    teacherUser() {
      return this.listUser.filter((user) => user.role === 2)
    },
  },
  mounted() {
    this.getListUser()
  },
  methods: {
    ...mapActions('users', ['getListUser']),
    ...mapActions('users', ['activeUsers']),
    async toggleActive(item) {
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
    editTeacher() {
      this.$emit('edit-clicked')
    },
    deleteTeacher(teacherId) {
      this.$emit('delete-clicked', teacherId)
    },
    goToDetailUser() {
      // this.$router.push(`/admin/users/teachers/${this.$route.params.id}`)
    },
  },
}
</script>
<style></style>
