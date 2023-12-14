<template>
  <div>
    <button
      v-if="isScrolling"
      class="fixed w-14 h-14 bottom-4 right-4 rounded-full bg-[#c7bf22] hover:bg-[#a0990f] text-white z-50"
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
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, { passive: true })
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
