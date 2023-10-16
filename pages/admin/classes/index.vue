<template>
  <div class="p-10">
    <HeadingClasses />
    <SearchAddOptionClasses @add-clicked="showAddModal = true" />
    <TableClasses
      @edit-clicked="handleUpdateClicked"
      @delete-clicked="handleDeleteClicked"
    />
    <ModalAddClass :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalEditClass
      :show-modal="showEditModal"
      :grade-item="gradeItemUpdate"
      @close="showEditModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :grade-id="gradeIdToDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingClasses from '~/components/admin/classes/Heading.vue'
import SearchAddOptionClasses from '~/components/admin/classes/SearchAndAdd'
import TableClasses from '~/components/admin/classes/Table'
import ModalAddClass from '~/components/admin/classes/ModalAdd'
import ModalEditClass from '~/components/admin/classes/ModalEdit'
import ModalDelete from '~/components/common/ModalDelete'

export default {
  name: 'Classes',
  components: {
    HeadingClasses,
    SearchAddOptionClasses,
    TableClasses,
    ModalAddClass,
    ModalEditClass,
    ModalDelete,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      gradeItemUpdate: null,
      gradeIdToDelete: null,
    }
  },
   methods: {
    handleUpdateClicked(gradeItem) {
      this.gradeItemUpdate = gradeItem
      this.showEditModal = true
    },
    handleDeleteClicked(gradeId) {
      this.gradeIdToDelete = gradeId
      this.showDeleteModal = true
    },
  },
}
</script>
<style></style>
