<template>
  <div class="p-10">
    <HeadingUserStudent />
    <SearchAddOptionStudents @add-clicked="addClicked" />
    <TableStudents
      @edit-clicked="showEditModal = true"
      @delete-clicked="showDeleteModal = true"
    />
    <ModalAddStudent :show-modal="showAddModal" @close="closeModal" />
    <ModalEditUser :show-modal="showEditModal" @close="closeModal" />
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
  mounted() {
    const savedAddModalState = localStorage.getItem('addModalState')
    if (savedAddModalState !== null) {
      this.showAddModal = savedAddModalState === 'true'
    }

    const savedEditModalState = localStorage.getItem('editModalState')
    if (savedEditModalState !== null) {
      this.showEditModal = savedEditModalState === 'true'
    }
  },

  methods: {
    addClicked() {
      this.showAddModal = true
      localStorage.setItem('addModalState', this.showAddModal.toString())
    },
    editClicked() {
      this.showEditModal = true
      localStorage.setItem('editModalState', this.showEditModal.toString())
    },
    closeModal() {
      this.showAddModal = false
      localStorage.removeItem('addModalState')

      this.showEditModal = false
      localStorage.removeItem('editModalState')
    },
  },
}
</script>
<style></style>
