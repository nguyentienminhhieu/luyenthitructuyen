<template>
  <div class="flex flex-row items-center space-x-2">
    <i class="fa-solid fa-arrow-right"></i>
    <nuxt-link to="/admin" class="text-color-custom hover:text-color-custom"
      >Home</nuxt-link
    >
    <p>/</p>
    <nuxt-link
      to="/admin/admin-management"
      class="text-color-custom hover:text-color-custom"
      >Admin</nuxt-link
    >
  </div>
</template>
<script>
export default {
  name: 'HeadingManagement',
}
</script>
<style></style>
