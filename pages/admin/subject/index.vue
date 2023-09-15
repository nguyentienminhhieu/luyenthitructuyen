<template>
  <div class="p-10">
    <HeadingSubjects />
    <SearchAddOptionSubjects @add-clicked="showAddModal = true" />
    <TableSubjects
      @edit-clicked="showEditModal = true"
      @delete-clicked="showDeleteModal = true"
    />
    <ModalAddSubject :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalEditSubject
      :show-modal="showEditModal"
      @close="showEditModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingSubjects from '~/components/admin/subject/Heading.vue'
import SearchAddOptionSubjects from '~/components/admin/classes/SearchAndAdd'
import TableSubjects from '~/components/admin/subject/Table'
import ModalAddSubject from '~/components/admin/subject/ModalAdd'
import ModalEditSubject from '~/components/admin/subject/ModalEdit'
import ModalDelete from '~/components/common/ModalDelete'
export default {
  name: 'Subjects',
  components: {
    HeadingSubjects,
    SearchAddOptionSubjects,
    TableSubjects,
    ModalAddSubject,
    ModalEditSubject,
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
