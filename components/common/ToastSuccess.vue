<template>
  <div
    class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#0985e323] border-2 border-[#0984e3] text-[#0984e3] p-4 rounded-md shadow-lg"
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
