<template>
  <div class="flex justify-center items-center mt-16 max-h-screen">
    <div class="flex flex-col items-center">
      <h1 class="text-color-auth text-4xl font-semibold mb-4">Register</h1>
      <form class="login-form mt-8 space-y-6" @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-4">
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
                autocomplete="new-password"
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
          <div class="relative">
            <label for="confirmPassword" class="block text-color-default"
              >Confirm Password</label
            >
            <div class="flex items-center">
              <input
                id="confirmPassword"
                v-model.trim="ruleForm.confirmpassword"
                type="password"
                name="confirmPassword"
                class="w-full border-b-2 focus:outline-none p-1"
                autocomplete="new-password"
                :class="[
                  !$v.ruleForm.confirmpassword.$dirty
                    ? ''
                    : checkStatusClass($v.ruleForm.confirmpassword)
                    ? 'border-input-error'
                    : '',
                ]"
                @blur="$v.ruleForm.confirmpassword.$touch()"
              />
              <span class="cursor-pointer" @click="togglePassword">
                <i
                  class="far"
                  :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'"
                ></i>
              </span>
            </div>
            <div
              v-if="checkStatusClass($v.ruleForm.confirmpassword)"
              class="text-input-error text-sm"
            >
              <span :style="{ width: '90%' }">
                {{
                  !$v.ruleForm.confirmpassword.required
                    ? 'Vui lòng nhập dữ liệu!'
                    : !$v.ruleForm.confirmpassword.sameAsPassword
                    ? 'Bạn nhập chưa đúng mật khẩu!'
                    : ''
                }}
              </span>
            </div>
          </div>
        </div>
        <!-- Nút Sign Up -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="mt-5 w-72 btn-bg-default text-white py-2 px-4 rounded-xl hover:btn-bg-default transition duration-300"
          >
            Đăng ký
          </button>
        </div>
      </form>
      <div class="mt-5">
        <p class="text-sm mt-5 text-color-default">
          Bạn đã có tài khoản?
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
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators'
// import Datepicker from 'vue2-datepicker'
import {
  checkStatusClass,
  // mustNotSymbol,
  // mustPhomeNumber,
} from '~/mixins/ruleValidator'
export default {
  name: 'RegisterForm',
  mixins: [validationMixin],
  component: {
    // Datepicker,
  },
  layout: 'authLayout',
  //   auth: 'guest',
  data() {
    return {
      ruleForm: {
        email: '',
        password: '',
        confirmpassword: '',
      },
      // datePickerFormat: 'yyyy-MM-dd', // Định dạng ngày: YYYY-MM-DD
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
      confirmpassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    checkStatusClass,
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
      const passwordInput = document.getElementById('password')
      const confirmPasswordInput = document.getElementById('confirmPassword')
      if (passwordInput) {
        passwordInput.type = this.isPasswordVisible ? 'text' : 'password'
      }
      if (confirmPasswordInput) {
        confirmPasswordInput.type = this.isPasswordVisible ? 'text' : 'password'
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
<style scope></style>
