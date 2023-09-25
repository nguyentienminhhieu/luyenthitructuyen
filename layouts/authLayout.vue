<template>
  <div class="mr-12 ml-12">
    <header class="bg-white p-4 h-16 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h1 to="/admin" class="logo-color text-2xl font-bold">LOGO</h1>
      </div>
      <div class="flex space-x-4">
        <nuxt-link
          to="/login"
          class="auth-text text-color-custom hover:text-color-custom"
          >Đăng nhập</nuxt-link
        >
        <nuxt-link
          to="/register"
          class="auth-text text-color-custom hover:text-color-custom"
          >Đăng ký</nuxt-link
        >
      </div>
    </header>
    <!-- Các nội dung khác của trang web nằm ở đây -->
    <nuxt />
  </div>
</template>
<script>
export default {
  name: 'AuthLayout',
}
</script>
<style scoped>
@media (min-width: 900px) {
  header .flex.items-center {
    margin-right: 24px;
  }

  header .logo-color {
    font-size: 24px;
  }
}

@media (min-width: 414px) and (max-width: 899px) {
  header .flex.items-center {
    margin: 0 12px;
  }

  header .logo-color {
    font-size: 18px;
  }
  .auth-text {
    font-size: 14px !important;
  }
}
</style>
