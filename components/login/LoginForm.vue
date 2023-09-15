<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex flex-col items-center">
      <h1 class="text-color-auth text-4xl font-semibold mb-4">Login</h1>
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
        <div class="relative">
          <label for="password" class="block text-color-default"
            >Password</label
          >
          <div class="flex items-center">
            <input
              id="password"
              v-model.trim="ruleForm.password"
              type="password"
              name="password"
              class="w-full border-b-2 focus:outline-none p-1"
              :class="[
                !$v.ruleForm.password.$dirty
                  ? ''
                  : checkStatusClass($v.ruleForm.password)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.ruleForm.password.$touch()"
            />
            <span class="cursor-pointer" @click="togglePassword">
              <i
                class="far"
                :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'"
              ></i>
            </span>
          </div>
          <div
            v-if="checkStatusClass($v.ruleForm.password)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.password.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.password.maxLength
                  ? 'Bạn nhập quá số lượng chữ cho phép!'
                  : !$v.ruleForm.password.minLength
                  ? 'Bạn nhập ít chữ quá!'
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
            Đăng nhập
          </button>
        </div>
      </form>

      <div class="flex mt-10">
        <div class="text-color-default mr-5">
          <input type="checkbox" id="remember-password" class="mr-2" />
          <label for="remember-password">Ghi nhớ mật khẩu</label>
        </div>
        <div class="text-color-custom hover:text-color-custom">
          <nuxt-link to="/forgot-password">Quên mật khẩu?</nuxt-link>
        </div>
      </div>
      <div class="mt-5">
        <p class="text-sm mt-6 text-color-default">
          Bạn chưa có tài khoản?
          <nuxt-link
            to="/register"
            class="text-color-custom hover:text-color-custom"
            >Đăng ký</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { checkStatusClass } from '~/mixins/ruleValidator'
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  layout: 'authLayout',
  // auth: 'guest',

  data() {
    return {
      ruleForm: {
        email: '',
        password: '',
      },
      isPasswordVisible: false,
    }
  },
  validations: {
    ruleForm: {
      email: {
        required,
        email,
      },
      password: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(6),
      },
    },
  },

  methods: {
    checkStatusClass,

    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
      const passwordInput = document.getElementById('password')
      if (passwordInput) {
        passwordInput.type = this.isPasswordVisible ? 'text' : 'password'
      }
    },
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
