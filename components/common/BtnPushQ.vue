<template>
  <div>
    <button
      class="fixed w-14 h-14 bottom-[120px] right-4 rounded-full bg-[#12b754] hover:bg-[#127339] mb-4 text-white z-1000"
      @click="pushArray"
    >
      Q<i class="fas fa-plus"></i>
    </button>
  </div>
</template>
<script>
export default {
  name: 'BtnPushQ',
  methods: {
    pushArray() {
      this.$emit('push-array')
    },
  },
}
</script>
<style></style>
