<template>
  <div class="p-10">
    <HeadingExam />
    <SearchAddOptionExercise />
    <TableExercise @delete-clicked="showDeleteModal = true" />
    <ModalDelete
      :show-modal="showDeleteModal"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingExam from '~/components/admin/exercise/Heading.vue'
import SearchAddOptionExercise from '~/components/admin/exercise/SearchAndAdd'
import TableExercise from '~/components/admin/exercise/Table'
import ModalDelete from '~/components/common/ModalDelete'

export default {
  name: 'Exercise',
  components: {
    HeadingExam,
    SearchAddOptionExercise,
    TableExercise,
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
