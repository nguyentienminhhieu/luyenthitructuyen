<template>
  <div class="flex flex-row items-center space-x-2">
    <i class="fa-solid fa-arrow-right"></i>
    <nuxt-link to="/admin" class="text-color-custom hover:text-color-custom"
      >Home</nuxt-link
    >
    <p>/</p>
    <nuxt-link
      to="/admin/exercise"
      class="text-color-custom hover:text-color-custom"
      >Exercise</nuxt-link
    >
    <p>/</p>
    <nuxt-link
      :to="'/admin/exercise/' + $route.params.id"
      class="text-color-custom hover:text-color-custom"
      >{{ $route.params.id }}</nuxt-link
    >
  </div>
</template>
<script>
export default {
  name: 'HeadingDetailExercise',
  methods: {
    validate({ params }) {
      // Must be a string of letters
      return /^[A-Za-z]+$/.test(params.id)
    },
  },
}
</script>
<style></style>
