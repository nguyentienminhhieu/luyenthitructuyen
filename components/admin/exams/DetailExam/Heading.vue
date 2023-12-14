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
    <div class="text-color-custom hover:text-color-custom">
      {{ $route.params.id }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeadingDetailExam',
  methods: {
    validate({ params }) {
      // Must be a string of letters
      return /^[A-Za-z]+$/.test(params.id)
    },
  },
}
</script>
<style></style>
