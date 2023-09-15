<template>
  <div class="p-10">
    <HeadingDetailTeacher />
    <div class="px-8">
      <AvatarTeacher @upload-avatar-clicked="showUploadAvatarModal = true" />
      <InfoPersonTeacher @edit-clicked="showEditModal = true" />
      <ModalEditUser
        :show-modal="showEditModal"
        @close="showEditModal = false"
      />
      <ModalUploadAvatar
        :show-modal="showUploadAvatarModal"
        @close="showUploadAvatarModal = false"
      />
    </div>
  </div>
</template>
<script>
import HeadingDetailTeacher from '~/components/admin/users/teachers/Detail_personal/Heading.vue'
import AvatarTeacher from '~/components/admin/users/teachers/Detail_personal/Avatar'
import InfoPersonTeacher from '~/components/admin/users/teachers/Detail_personal/InfoPersonal'
import ModalEditUser from '~/components/admin/users/ModalEditUser'
import ModalUploadAvatar from '~/components/admin/users/ModalUploadAvatar'

export default {
  name: 'DetailTeacher',
  components: {
    HeadingDetailTeacher,
    AvatarTeacher,
    InfoPersonTeacher,
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
