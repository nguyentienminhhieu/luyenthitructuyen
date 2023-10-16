<template>
  <div class="p-10">
    <HeadingCategory />
    <SearchAddOptionCategory @add-clicked="showAddModal = true" />
    <TableCategory
      @edit-clicked="handleUpdateClicked"
      @delete-clicked="handleDeleteClicked"
    />
    <ModalAddCategory
      :show-modal="showAddModal"
      @close="showAddModal = false"
    />
    <ModalEditCategory
      :show-modal="showEditModal"
      :category-item="categoryItemUpdate"
      @close="showEditModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :category-id="categoryIdToDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingCategory from '~/components/admin/category/Heading.vue'
import SearchAddOptionCategory from '~/components/admin/category/SearchAndAdd'
import TableCategory from '~/components/admin/category/Table'
import ModalAddCategory from '~/components/admin/category/ModalAdd'
import ModalEditCategory from '~/components/admin/category/ModalEdit'
import ModalDelete from '~/components/common/ModalDelete'

export default {
  name: 'Category',
  components: {
    HeadingCategory,
    SearchAddOptionCategory,
    TableCategory,
    ModalAddCategory,
    ModalEditCategory,
    ModalDelete,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      categoryItemUpdate: null,
      categoryIdToDelete: null,
    }
  },
  methods: {
    handleUpdateClicked(categoryItem) {
      this.categoryItemUpdate = categoryItem
      this.showEditModal = true
    },
    handleDeleteClicked(categoryId) {
      this.categoryIdToDelete = categoryId
      this.showDeleteModal = true
    },
  },
}
</script>
<style></style>
