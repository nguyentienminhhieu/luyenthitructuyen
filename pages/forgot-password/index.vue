<template>
  <div class="flex justify-center items-center mt-16 max-h-screen">
    <div class="flex flex-col items-center">
      <h1 class="text-color-auth text-4xl font-semibold mb-4">Quên mật khẩu</h1>
      <form class="mt-8 space-y-6" @submit.prevent="submitForm">
        <div>
          <label for="email" class="block text-color-default">Email</label>
          <input
            id="email"
            v-model.trim="ruleForm.email"
            type="email"
            name="email"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.email.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.email)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.email.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.email)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.email.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.email.email
                  ? 'Vui lòng nhập đúng định dạng email!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <!-- Nút Sign Up -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="mt-5 w-72 btn-bg-default text-white py-2 px-4 rounded-xl hover:btn-bg-default transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
      <div class="mt-5">
        <p class="text-sm mt-6 text-color-default">
          Bạn đã nhớ mật khẩu?
          <nuxt-link
            to="/login"
            class="text-color-custom hover:text-color-custom"
            >Đăng nhập</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { checkStatusClass } from '~/mixins/ruleValidator'
export default {
  name: 'ForgotPasswordForm',
  mixins: [validationMixin],
  layout: 'authLayout',
  // auth: 'guest',
  data() {
    return {
      ruleForm: {
        email: '',
      },
    }
  },
  validations: {
    ruleForm: {
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    checkStatusClass,
    submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        console.log('Dung')
      }
    },
  },
}
</script>
<style></style>
