<template>
  <div class="p-10">
    <HeadingExam />
    <SearchAddOptionExam />
    <TableExams @delete-clicked="showDeleteModal = true" />
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

export default {
  name: 'Exams',
  components: {
    HeadingExam,
    SearchAddOptionExam,
    TableExams,
    ModalDelete,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showDeleteModal: false,
    }
  },
}
</script>
<style></style>
