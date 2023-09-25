<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">
        Sửa thông tin User
      </h2>

      <!-- Form để thêm giáo viên -->
      <form
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        @submit.prevent="editUser"
      >
        <!-- Username -->
        <div class="mb-4 md:mb-0">
          <label for="username" class="block text-color-default"
            >Username</label
          >
          <input
            id="username"
            v-model.trim="ruleForm.username"
            type="text"
            name="username"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.username.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.username)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.username.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.username)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.username.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.username.mustNotSymbol
                  ? 'Vui lòng nhập đúng định dạng tên!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <!-- Số điện thoại -->
        <div class="mb-4 md:mb-0">
          <label for="phone" class="block text-color-default"
            >Số điện thoại</label
          >
          <input
            id="phone"
            v-model.trim="ruleForm.phone"
            type="text"
            name="phone"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.phone.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.phone)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.phone.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.phone)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.phone.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.phone.mustPhomeNumber
                  ? 'Vui lòng nhập đúng định dạng sodienthoai!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <!-- Địa chỉ -->
        <div class="mb-4 md:mb-0">
          <label for="address" class="block text-color-default">Địa chỉ</label>
          <input
            id="address"
            v-model.trim="ruleForm.address"
            type="text"
            name="address"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.address.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.address)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.address.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.address)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.address.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.address.mustNotSymbol
                  ? 'Vui lòng nhập đúng định dạng!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <!-- Email -->
        <div class="mb-4 md:mb-0">
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

        <!-- Roles (mặc định là Giáo viên và không được sửa) -->
        <div class="mb-4 md:mb-0">
          <label for="roles" class="block text-color-default">Roles</label>
          <select
            id="roles"
            v-model="ruleForm.roles"
            name="roles"
            class="w-full border-b-2 focus:outline-none p-1"
          >
            <option value="1">Học Sinh</option>
            <option value="2">Giáo Viên</option>
          </select>
        </div>
        <div v-if="ruleForm.roles === '1'">
          <label for="class" class="block text-color-default">Lớp</label>
          <select
            id="class"
            v-model="ruleForm.class"
            name="class"
            class="w-full border-b-2 focus:outline-none p-1"
            required
          >
            <option value="6">Lớp 6</option>
            <option value="7">Lớp 7</option>
            <option value="8">Lớp 8</option>
            <option value="9">Lớp 9</option>
          </select>
        </div>
        <!-- Trường học -->
        <div class="mb-4 md:mb-0">
          <label for="school" class="block text-color-default">Trường</label>
          <input
            id="school"
            v-model.trim="ruleForm.school"
            type="text"
            name="school"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.school.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.school)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.school.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.school)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.school.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.school.mustNotSymbol
                  ? 'Vui lòng nhập đúng định dạng!'
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
            Change
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import {
  checkStatusClass,
  mustNotSymbol,
  mustPhomeNumber,
} from '~/mixins/ruleValidator'
export default {
  name: 'ModalEditUser',
  mixins: [validationMixin],
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      ruleForm: {
        username: '',
        phone: '',
        address: '',
        email: '',
        roles: null,
        school: '',
        class: '',
      },
      isPasswordVisible: false,
    }
  },
  validations: {
    ruleForm: {
      username: {
        required,
        mustNotSymbol,
      },
      phone: {
        required,
        mustPhomeNumber,
      },
      email: {
        required,
        email,
      },
      school: {
        required,
        mustNotSymbol,
      },
      address: {
        required,
        mustNotSymbol,
      },
    },
  },
  methods: {
    checkStatusClass,
    closeModal() {
      this.$emit('close')
    },
    editUser() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        this.$emit('close')
      }
    },
  },
}
</script>
