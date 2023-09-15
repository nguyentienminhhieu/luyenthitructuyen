<template>
  <div class="pr-16">
    <div class="flex justify-between items-center my-8">
      <h2 class="text-lg font-semibold">Thông tin cá nhân</h2>
      <div>
        <i
          class="fas fa-edit text-gray-500 hover:text-gray-700 cursor-pointer"
          @click="editStudent"
        ></i>
      </div>
    </div>

    <div>
      <div class="flex flex-row justify-between mt-2">
        <label>Username: <span>username</span></label>
        <label>SDT: <span>099999</span></label>
        <label>Email: <span>email</span></label>
      </div>
      <div class="flex flex-row justify-between mt-8">
        <label>Roles: <span>roles</span></label>
        <label>Class: <span>class</span></label>
        <label>Email: <span>email</span></label>
      </div>
      <div class="flex flex-row justify-between mt-8">
        <label>Trường: <span>Trường</span></label>
        <label>Địa chỉ: <span>Địa chỉ</span></label>
        <label>Email: <span>email</span></label>
      </div>
    </div>

    <!-- Tương tự cho các thông tin khác -->
  </div>
</template>
<script>
export default {
  name: 'InfoPersonStudent',

  methods: {
    editStudent() {
      this.$emit('edit-clicked')
    },
  },
}
</script>
<style></style>
