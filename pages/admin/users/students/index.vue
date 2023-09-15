<template>
  <div class="p-10">
    <HeadingUserStudent />
    <SearchAddOptionStudents @add-clicked="showAddModal = true" />
    <TableStudents
      @edit-clicked="showEditModal = true"
      @delete-clicked="showDeleteModal = true"
    />
    <ModalAddStudent :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalEditUser :show-modal="showEditModal" @close="showEditModal = false" />
    <ModalDelete
      :show-modal="showDeleteModal"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingUserStudent from '~/components/admin/users/students/Heading.vue'
import SearchAddOptionStudents from '~/components/admin/users/students/SearchAndAdd'
import TableStudents from '~/components/admin/users/students/Table'
import ModalAddStudent from '~/components/admin/users/students/ModalAdd'
import ModalEditUser from '~/components/admin/users/ModalEditUser'
import ModalDelete from '~/components/common/ModalDelete'
export default {
  name: 'UsersStudents',
  components: {
    HeadingUserStudent,
    SearchAddOptionStudents,
    TableStudents,
    ModalAddStudent,
    ModalEditUser,
    ModalDelete,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
    }
  },
}
</script>
<style></style>
