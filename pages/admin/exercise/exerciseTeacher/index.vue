<template>
  <div class="p-10">
    <HeadingExercise />
    <SearchAddOptionExercise @add-clicked="showAddModal = true" />
    <TableExerciseTeacher
      @delete-clicked="handleDeleteClicked"
      @edit-click="editExercise"
    />
    <ModalAddExercise
      :show-modal="showAddModal"
      @close="showAddModal = false"
    />
    <ModalEditExercise
      :exercise-item="detailExercise"
      :show-modal="showEditModal"
      @close="showEditModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :exercise-id="exerciseIdToDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingExercise from '~/components/admin/exercise/Heading.vue'
import SearchAddOptionExercise from '~/components/admin/exercise/SearchAndAdd'
import TableExerciseTeacher from '~/components/admin/exercise/TableTeacher'
import ModalAddExercise from '~/components/admin/exercise/ModalAdd'
import ModalDelete from '~/components/common/ModalDelete'
import ModalEditExercise from '~/components/admin/exercise/ModalEdit/index.vue'

export default {
  name: 'Exercise',
  components: {
    HeadingExercise,
    SearchAddOptionExercise,
    TableExerciseTeacher,
    ModalAddExercise,
    ModalDelete,
    ModalEditExercise,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      detailExercise: null,
      showAddModal: false,
      showDeleteModal: false,
      showEditModal: false,
      exerciseIdToDelete: null,
    }
  },
  methods: {
    handleDeleteClicked(exerciseId) {
      this.exerciseIdToDelete = exerciseId
      this.showDeleteModal = true
    },
    editExercise(item) {
      this.detailExercise = item
      this.showEditModal = true
    },
  },
}
</script>
<style></style>
