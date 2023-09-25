<template>
  <div class="p-10">
    <HeadingExam />
    <SearchAddOptionExam @add-clicked="showAddModal = true" />
    <TableExams @delete-clicked="showDeleteModal = true" />
    <ModalAddExam :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalDelete
      :show-modal="showDeleteModal"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingExam from '~/components/admin/exams/Heading.vue'
import SearchAddOptionExam from '~/components/admin/exams/SearchAndAdd'
import TableExams from '~/components/admin/exams/Table'
import ModalDelete from '~/components/common/ModalDelete'
import ModalAddExam from '~/components/admin/exams/ModalAdd'
export default {
  name: 'Exams',
  components: {
    HeadingExam,
    SearchAddOptionExam,
    TableExams,
    ModalDelete,
    ModalAddExam,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showAddModal: false,
      showDeleteModal: false,
    }
  },
}
</script>
<style></style>
