<template>
  <div class="mt-5 max-h-[500px] overflow-x-auto">
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
            Title
          </th>
          <th
            class="px-6 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Slug
          </th>
          <th class="px-2 py-3 border-2"></th>
          <!-- Ô trống cho nút Chỉnh sửa -->
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto">
        <tr v-for="item in listCategory" :key="item.id">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ item.id }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ item.title }}
          </td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            {{ item.slug }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <button @click="editCategory(item)">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteCategory(item.id)">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TableCategory',
  computed: {
    ...mapState('category', ['listCategory']),
    ...mapState('category', ['detailCategory']),
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    ...mapActions('category', ['getCategory']),
    ...mapActions('category', ['getDetailCategory']),
    async editCategory(categoryItem) {
      await this.getDetailCategory(categoryItem.id)
      this.$emit('edit-clicked', categoryItem)
    },
    deleteCategory(categoryId) {
      this.$emit('delete-clicked', categoryId)
    },
  },
}
</script>
<style></style>
