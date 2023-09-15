<template>
  <div class="p-10">
    <HeadingDetailStudent />
    <div class="px-8">
      <AvatarStudent @upload-avatar-clicked="showUploadAvatarModal = true" />
      <InfoPersonStudent @edit-clicked="showEditModal = true" />
      <ModalEditUser
        :show-modal="showEditModal"
        @close="showEditModal = false"
      />
    </div>
    <ModalUploadAvatar
      :show-modal="showUploadAvatarModal"
      @close="showUploadAvatarModal = false"
    />
  </div>
</template>
<script>
import HeadingDetailStudent from '~/components/admin/users/students/Detail_personal/Heading.vue'
import AvatarStudent from '~/components/admin/users/students/Detail_personal/Avatar'
import InfoPersonStudent from '~/components/admin/users/students/Detail_personal/InfoPersonal'
import ModalEditUser from '~/components/admin/users/ModalEditUser'
import ModalUploadAvatar from '~/components/admin/users/ModalUploadAvatar'

export default {
  name: 'DetailStudent',
  components: {
    HeadingDetailStudent,
    AvatarStudent,
    InfoPersonStudent,
    ModalEditUser,
    ModalUploadAvatar,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showEditModal: false,
      showUploadAvatarModal: false,
    }
  },
}
</script>
<style></style>
