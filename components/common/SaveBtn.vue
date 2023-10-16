<template>
  <div>
    <button
      class="fixed bottom-16 right-5 rounded-full bg-[#2743cf] px-4 py-3 mb-2 text-white"
      @click="Savedata"
    >
      <i class="fa-regular fa-floppy-disk"></i>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    listQuestions: Array,
  },
  data() {
    return {
      isScrolling: false,
    }
  },
  //   mounted() {
  //     window.addEventListener('scroll', this.handleScroll)
  //   },
  //   beforeDestroy() {
  //     window.removeEventListener('scroll', this.handleScroll)
  //   },
  methods: {
    Savedata() {
      console.log(this.listQuestions)
    },
    // handleScroll() {
    //   if (window.scrollY > 200) {
    //     this.isScrolling = true
    //   } else {
    //     this.isScrolling = false
    //   }
    // },
  },
}
</script>
<style></style>
