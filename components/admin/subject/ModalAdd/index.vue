<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Thêm Môn học</h2>

      <!-- Form để thêm giáo viên -->
      <form
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
        @submit.prevent="submitForm"
      >
        <!-- Username -->
        <div class="mb-4 md:mb-0">
          <label for="nameSubject" class="block text-color-default"
            >Name Subject</label
          >
          <input
            id="nameSubject"
            ref="nameSubjectInput"
            v-model.trim="ruleForm.nameSubject"
            type="text"
            name="nameSubject"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.nameSubject.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.nameSubject)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.nameSubject.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.nameSubject)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.nameSubject.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <div class="mb-4 md:mb-0">
          <label for="slug" class="block text-color-default">Slug</label>
          <input
            id="slug"
            v-model.trim="ruleForm.slug"
            type="text"
            name="slug"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.slug.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.slug)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.slug.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.slug)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{ !$v.ruleForm.slug.required ? 'Vui lòng nhập dữ liệu!' : '' }}
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
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { checkStatusClass } from '~/mixins/ruleValidator'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'

export default {
  name: 'ModalAddSubject',
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
        nameSubject: '',
        slug: '',
      },
      // isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Thêm môn học thành công!.',
      errorMessage: 'Lỗi! Dữ liệu bị trùng.',
    }
  },
  validations: {
    ruleForm: {
      nameSubject: {
        required,
      },
      slug: {
        required,
      },
    },
  },
  methods: {
    ...mapActions('subject', ['addSubjects']),
    checkStatusClass,
    closeModal() {
      this.$emit('close')
      this.reset()
    },
    submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        try {
          const payload = {
            name: this.ruleForm.nameSubject,
            slug: this.ruleForm.slug,
          }
          // const response = await this.addSubjects(payload)
          if (this.addSubjects(payload)) {
            this.reset()
            // Sử dụng $nextTick để đảm bảo rằng DOM đã được cập nhật trước khi focus
            this.$nextTick(() => {
              this.$refs.nameSubjectInput.focus()
            })
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
            }, 2000)
          } else {
            this.showErrorToast = true
            setTimeout(() => {
              this.showErrorToast = false
            }, 2000)
          }
        } catch (error) {
          console.log('Submit Failed', error)
        }
      }
    },
    reset() {
      this.ruleForm.nameSubject = ''
      this.ruleForm.slug = ''
    },
  },
}
</script>
