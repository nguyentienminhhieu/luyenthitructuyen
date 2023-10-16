<template>
  <div class="p-10">
    <HeadingManagement />
    <SearchAddOptionAdmin @add-clicked="showAddModal = true" />
    <TableAdmin
      @edit-clicked="showEditModal = true"
      @delete-clicked="handleDeleteClicked"
    />
    <ModalAddAdmin :show-modal="showAddModal" @close="showAddModal = false" />
    <ModalEditAdmin
      :show-modal="showEditModal"
      @close="showEditModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :admin-id="adminIdToDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import HeadingManagement from '~/components/admin/management-admin/Heading.vue'
import SearchAddOptionAdmin from '~/components/admin/management-admin/SearchAndAdd.vue'
import TableAdmin from '~/components/admin/management-admin/table.vue'
import ModalAddAdmin from '~/components/admin/management-admin/ModalAdd.vue'
import ModalEditAdmin from '~/components/admin/management-admin/ModalEdit.vue'
import ModalDelete from '~/components/common/ModalDelete'
export default {
  components: {
    HeadingManagement,
    SearchAddOptionAdmin,
    TableAdmin,
    ModalAddAdmin,
    ModalEditAdmin,
    ModalDelete,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      adminIdToDelete: null,
    }
  },
  methods: {
    handleDeleteClicked(adminId) {
      this.adminIdToDelete = adminId
      this.showDeleteModal = true
    },
  },
}
</script>
<style></style>
