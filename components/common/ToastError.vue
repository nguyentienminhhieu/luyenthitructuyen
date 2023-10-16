<template>
  <div
    class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#e74d3c23] border-2 border-[#e74c3c] text-[#e74c3c] p-4 rounded-md shadow-lg"
  >
    <div class="flex items-center">
      <i class="fas fa-exclamation-circle text-2xl mr-2"></i>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastError',
  props: {
    message: String,
  },
}
</script>
