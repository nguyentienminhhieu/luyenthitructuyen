<template>
  <div class="p-10">
    <HeadingSubjects />
    <SearchAddOptionSubjects @add-clicked="showAddModal = true" />
    <TableSubjects
      @edit-clicked="handleUpdateClicked"
      @delete-clicked="handleDeleteClicked"
    />
    <ModalAddSubject :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalEditSubject
      :show-modal="showEditModal"
      :subject-item="subjectItemUpdate"
      @close="showEditModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :subject-id="subjectIdToDelete"
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
      subjectItemUpdate: null,
      subjectIdToDelete: null,
    }
  },
  methods: {
    handleUpdateClicked(subjectItem) {
      this.subjectItemUpdate = subjectItem
      this.showEditModal = true
    },
    handleDeleteClicked(subjectId) {
      this.subjectIdToDelete = subjectId
      this.showDeleteModal = true
    },
  },
}
</script>
<style></style>
