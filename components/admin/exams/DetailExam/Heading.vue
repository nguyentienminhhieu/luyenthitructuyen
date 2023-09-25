<template>
  <div class="flex flex-row items-center space-x-2">
    <i class="fa-solid fa-arrow-right"></i>
    <nuxt-link to="/admin" class="text-color-custom hover:text-color-custom"
      >Home</nuxt-link
    >
    <p>/</p>
    <nuxt-link
      to="/admin/exams"
      class="text-color-custom hover:text-color-custom"
      >Exams</nuxt-link
    >
    <p>/</p>
    <nuxt-link
      :to="'/admin/exams/' + $route.params.id"
      class="text-color-custom hover:text-color-custom"
      >{{ $route.params.id }}</nuxt-link
    >
  </div>
</template>
<script>
export default {
  name: 'HeadingDetailExam',
}
</script>
<style></style>
