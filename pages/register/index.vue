<template>
  <div>
    <RegisterForm />
  </div>
</template>
<script>
import RegisterForm from '~/components/register/RegisterForm'
export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
  layout: 'authLayout',
//   auth: 'guest',
}
</script>
<style></style>
