<template>
  <div>
    <button
      v-if="isScrolling"
      class="fixed bottom-4 right-5 rounded-full bg-[#c7bf22] px-4 py-3 text-white"
      @click="scrollToTop"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isScrolling: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    handleScroll() {
      if (window.scrollY > 200) {
        this.isScrolling = true
      } else {
        this.isScrolling = false
      }
    },
  },
}
</script>
<style></style>
