<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-[400px] max-h-[500px]"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Thêm Admin</h2>

      <!-- Form để thêm giáo viên -->
      <form class="flex flex-col" @submit.prevent="submitForm">
        <div class="m-4 md:mb-0">
          <label for="nameAdmin" class="block text-color-default"
            >Name Admin</label
          >
          <input
            id="nameAdmin"
            ref="nameInput"
            v-model.trim="ruleForm.nameAdmin"
            type="text"
            name="nameAdmin"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.nameAdmin.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.nameAdmin)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.nameAdmin.$touch()"
            @keydown.enter.prevent="addAdmin"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.nameAdmin)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.nameAdmin.required ? 'Vui lòng nhập dữ liệu!' : ''
              }}
            </span>
          </div>
        </div>
        <div class="m-4 md:mb-0">
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
            @keydown.enter.prevent="addAdmin"
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
        <div class="m-4 md:mb-0">
          <label for="password" class="block text-color-default"
            >Password</label
          >
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
            @keydown.enter.prevent="addAdmin"
          />
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
        <!-- Footer với nút Thoát và Thêm -->
        <div class="col-span-3 flex justify-between mt-4">
          <button
            type="button"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
            @click="closeModal"
          >
            Thoát
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { checkStatusClass } from '~/mixins/ruleValidator'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'

export default {
  name: 'ModalAddAdmin',
  components: {
    ToastSuccess,
    ToastError,
  },
  mixins: [validationMixin],

  props: {
    showModal: Boolean,
  },
  data() {
    return {
      ruleForm: {
        nameAdmin: '',
        email: '',
        password: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Thêm môn học thành công!.',
      errorMessage: 'Lỗi! Dữ liệu bị trùng.',
    }
  },
  validations: {
    ruleForm: {
      nameAdmin: {
        required,
      },
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
    ...mapActions('account', ['addAdmin']),
    checkStatusClass,

    closeModal() {
      this.$emit('close')
    },
    submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        try {
          const payload = {
            name: this.ruleForm.nameAdmin,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          }

          if (this.addAdmin(payload)) {
            this.reset()
            // Sử dụng $nextTick để đảm bảo rằng DOM đã được cập nhật trước khi focus
            this.$nextTick(() => {
              this.$refs.nameInput.focus()
            })
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
            }, 3000)
          } else {
            this.showErrorToast = true
            setTimeout(() => {
              this.showErrorToast = false
            }, 3000)
          }
        } catch (error) {
          console.log('Submit Failed', error)
        }
      }
    },

    reset() {
      this.ruleForm.nameAdmin = '' // Sửa thành this.ruleForm.nameAdmin
      this.ruleForm.email = '' // Sửa thành this.ruleForm.email
      this.ruleForm.password = '' // Sửa thành this.ruleForm.password
    },
  },
}
</script>
