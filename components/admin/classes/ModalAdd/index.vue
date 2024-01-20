<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Thêm Lớp</h2>

      <!-- Form để thêm giáo viên -->
      <form class="flex flex-col m-4" @submit.prevent="addClass">
        <div class="my-8 md:my-2">
          <label for="nameClass" class="block text-color-default"
            >Name Class</label
          >
          <input
            id="nameClass"
            ref="nameClassInput"
            v-model.trim="ruleForm.nameClass"
            type="text"
            name="nameClass"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.nameClass.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.nameClass)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.nameClass.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.nameClass)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.nameClass.required ? 'Vui lòng nhập dữ liệu!' : ''
              }}
            </span>
          </div>
        </div>
        <div class="my-8 md:my-2">
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
        <div v-if="filterSubjectID" class="my-8 md:my-2">
          <label class="block text-color-default font-medium mb-2"
            >SubjectID</label
          >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="item in listSubject" :key="item.id">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  class="text-blue-500"
                  v-model="ruleForm.subjectID"
                  :value="item.id"
                />
                <span class="text-color-default">{{ item.name }}</span>
              </label>
            </div>
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
import { mapState, mapActions } from 'vuex'
import { checkStatusClass } from '~/mixins/ruleValidator'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'

export default {
  name: 'ModalAddClass',
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
        nameClass: null,
        slug: '',
        subjectID: [],
      },
      // isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Thêm lớp học thành công!.',
      errorMessage: 'Lỗi! Dữ liệu bị trùng.',
    }
  },
  computed: {
    ...mapState('subject', ['listSubject']),
    filterSubjectID() {
      return this.listSubject.filter((item) => item.id > 1)
    },
  },
  validations: {
    ruleForm: {
      nameClass: {
        required,
      },
      slug: {
        required,
      },
    },
  },
  mounted() {
    this.getSubjects()
  },
  methods: {
    ...mapActions('subject', ['getSubjects']),
    ...mapActions('grade', ['addGrade']),
    checkStatusClass,

    closeModal() {
      this.$emit('close')
      this.$v.$reset()
      this.reset()
    },
    addClass() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        try {
          const payload = {
            name: this.ruleForm.nameClass,
            slug: this.ruleForm.slug,
            subjectIds: this.ruleForm.subjectID,
          }
          // const response = await this.addSubjects(payload)
          if (this.addGrade(payload)) {
            this.reset()
            this.$nextTick(() => {
              this.$refs.nameClassInput.focus()
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
          this.showErrorToast = true
          setTimeout(() => {
            this.showErrorToast = false
          }, 2000)
        }
      }
    },
    reset() {
      this.ruleForm.nameClass = ''
      this.ruleForm.slug = ''
      this.ruleForm.subjectID = []
    },
  },
}
</script>
