<template>
  <div>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from '~/components/login/LoginForm'
export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  layout: 'authLayout',
  //   auth: 'guest',
}
</script>
<style></style>
