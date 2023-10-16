<template>
  <div class="p-10">
    <HeadingExam />
    <SearchAddOptionExercise @add-clicked="showAddModal = true" />
    <TableExercise @delete-clicked="showDeleteModal = true" />
    <ModalAddExercise
      :show-modal="showAddModal"
      @close="showAddModal = false"
    />
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
import ModalAddExercise from '~/components/admin/exercise/ModalAdd/ModalAddExercise.vue'
import ModalDelete from '~/components/common/ModalDelete'

export default {
  name: 'Exercise',
  components: {
    HeadingExam,
    SearchAddOptionExercise,
    TableExercise,
    // eslint-disable-next-line no-undef
    ModalAddExercise,
    ModalDelete,
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
