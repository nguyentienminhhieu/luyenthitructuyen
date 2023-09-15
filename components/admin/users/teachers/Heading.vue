<template>
  <div class="flex flex-row items-center space-x-2">
    <i class="fa-solid fa-arrow-right"></i>
    <nuxt-link to="/admin" class="text-color-custom hover:text-color-custom"
      >Home</nuxt-link
    >
    <p>/</p>
    <nuxt-link
      to="/admin/users/teachers"
      class="text-color-custom hover:text-color-custom"
      >Teachers</nuxt-link
    >
  </div>
</template>
<script>
export default {
  name: 'HeadingUserTeacher',
}
</script>
<style></style>
