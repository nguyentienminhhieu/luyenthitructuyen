<template>
  <div class="p-10">
    <HeadingUserTeacher />
    <SearchAddOptionTeachers
      :show-add-modal="showAddModal"
      @add-clicked="showAddModal = true"
    />
    <TableTeachers
      @edit-clicked="showEditModal = true"
      @delete-clicked="showDeleteModal = true"
    />

    <ModalAddTeacher :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalEditUser :show-modal="showEditModal" @close="showEditModal = false" />
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
  methods: {
    // handleAddClick() {
    //   this.showModalAdd = true
    // },
  },
}
</script>
<style></style>
