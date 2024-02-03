<template>
  <div class="p-10">
    <HeadingExam />
    <SearchAddOptionExam
      @add-clicked="showAddModal = true"
    />
    <TableExams
      @delete-clicked="handleDeleteClicked"
      @edit-click="editExam"
    />
    <!-- <PaginationTableExam /> -->
    <ModalAddExam :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalEditExam
      :exam-item="detailExam"
      :show-modal="showEditModal"
      @close="showEditModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :exam-id="examIdToDelete"
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
import ModalEditExam from '~/components/admin/exams/ModalEdit/index.vue'
// import PaginationTableExam from '~/components/admin/exams/Pagination.vue'
export default {
  name: 'ExamsAdmin',
  components: {
    HeadingExam,
    SearchAddOptionExam,
    TableExams,
    ModalDelete,
    ModalAddExam,
    ModalEditExam,
    // PaginationTableExam,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      detailExam: null,
      showAddModal: false,
      showDeleteModal: false,
      examIdToDelete: null,
      showEditModal: false,

    }
  },
  methods: {
   
    handleDeleteClicked(examId) {
      this.examIdToDelete = examId
      this.showDeleteModal = true
    },
    editExam(item) {
      this.detailExam = item
      this.showEditModal = true
    },
  },
}
</script>
<style></style>
