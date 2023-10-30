<template>
  <div class="p-10">
    <HeadingUserTeacher />
    <SearchAddOptionTeachers
      :show-add-modal="showAddModal"
      @add-clicked="addClicked"
    />
    <TableTeachers
      @edit-clicked="editClicked"
      @delete-clicked="showDeleteModal = true"
    />

    <ModalAddTeacher :show-modal="showAddModal" @close="closeModal" />
    <ModalEditUser :show-modal="showEditModal" @close="closeModal" />
    <ModalDelete
      :show-modal="showDeleteModal"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingUserTeacher from '~/components/admin/users/teachers/Heading.vue'
import SearchAddOptionTeachers from '~/components/admin/users/teachers/SearchAndAdd'
import TableTeachers from '~/components/admin/users/teachers/Table'
import ModalAddTeacher from '~/components/admin/users/teachers/ModalAdd'
import ModalEditUser from '~/components/admin/users/ModalEditUser'
import ModalDelete from '~/components/common/ModalDelete'
export default {
  name: 'UsersTeachers',
  components: {
    HeadingUserTeacher,
    SearchAddOptionTeachers,
    TableTeachers,
    ModalAddTeacher,
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
