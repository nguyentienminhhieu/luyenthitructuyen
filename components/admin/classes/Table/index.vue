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
            Lớp
          </th>
          <th
            class="px-6 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Slug
          </th>
          <th class="px-2 py-3 border-2"></th>
          <!-- Ô trống cho nút Chỉnh sửa -->
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto">
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
        <tr class="hover:bg-gray-50 cursor-pointer custom-scrollbar">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <button @click="editClass">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteClass">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <button @click="editClass">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteClass">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>

        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <button @click="editClass">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteClass">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 cursor-pointer">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">id</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">username</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">roles</td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <button @click="editClass">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteClass">
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
  name: 'TableClasses',
  methods: {
    editClass() {
      this.$emit('edit-clicked')
    },
    deleteClass() {
      this.$emit('delete-clicked')
    },
  },
}
</script>
<style></style>
