<template>
  <div
    class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#09e31b23] border-2 border-[#09db36] text-[#09e30d] p-4 rounded-md shadow-lg z-50"
  >
    <div class="flex items-center">
      <i class="fas fa-check-circle text-2xl mr-2"></i>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastSuccess',
  props: {
    message: String,
  },
}
</script>
