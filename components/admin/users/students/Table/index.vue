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
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Tên người dùng
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Vai trò
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Lớp
          </th>
          <th
            class="px-8 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Trường
          </th>
          <th
            class="px-8 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th class="px-6 py-3 border-2"></th>
          <!-- Ô trống cho nút Chỉnh sửa -->
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto" @click="goToDetailUser">
        <!-- <tr v-for="student in student" :key="student.id">
          <td class="px-6 py-4 border-2 whitespace-no-wrap">{{ student.id }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">{{ student.username }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">{{ student.roles }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">{{ student.truong }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">{{ student.email }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
          </td>
        </tr> -->
        <!-- Nội dung của <tbody> -->
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">lớp</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">truong</td>
          <td class="px-8 py-4 border-2 whitespace-no-wrap">email</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            <button @click="editStudent">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteStudent">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TableStudents',
  methods: {
    editStudent() {
      this.$emit('edit-clicked')
    },
    deleteStudent() {
      this.$emit('delete-clicked')
    },
    goToDetailUser() {
      this.$router.push(`/admin/users/students/${this.$route.params.id}`)
    },
  },
}
</script>
<style></style>
