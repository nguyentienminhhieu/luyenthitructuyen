<template>
  <div class="flex items-center justify-start space-x-8 py-10 border-b-2">
    <div class="relative cursor-pointer" @click="changeAvatar">
      <img
        src="~/assets/img/anhcv.png"
        alt="/"
        class="w-20 h-20 z-10 rounded-full opacity-0 hover:opacity-75"
      />
      <div
        class="absolute inset-0 rounded-full bg-gray-300 opacity-1 hover:opacity-75 transition-opacity"
      ></div>
    </div>

    <!-- Thông tin người dùng -->
    <div>
      <h1 class="text-xl font-semibold">Username</h1>
      <p class="text-sm text-gray-500">Vai tro</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AvatarStudent',
  data() {
    return {}
  },
  methods: {
    changeAvatar() {
      this.$emit('upload-avatar-clicked')
    },
  },
}
</script>
<style></style>
