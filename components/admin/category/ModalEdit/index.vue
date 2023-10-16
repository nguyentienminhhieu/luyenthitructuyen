<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Sửa Category</h2>

      <!-- Form để thêm giáo viên -->
      <form class="flex flex-col m-4" @submit.prevent="submitForm">
        <div class="my-8 md:my-2">
          <label for="titleCategory" class="block text-color-default"
            >Title Category</label
          >
          <input
            id="titleCategory"
            ref="titleCategoryInput"
            v-model.trim="ruleForm.titleCategory"
            type="text"
            name="titleCategory"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.titleCategory.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.titleCategory)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.titleCategory.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.titleCategory)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.titleCategory.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : ''
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
        <div v-if="filterGradeID" class="my-8 md:my-2">
          <label for="sradeID" class="block text-color-default">GradeID</label>
          <select
            id="gradeID"
            v-model="ruleForm.gradeID"
            name="gradeID"
            class="w-full border-b-2 focus:outline-none p-1"
            required
          >
            <option v-for="item in listGrade" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div v-if="filterSubjectID" class="my-8 md:my-2">
          <label for="subjectID" class="block text-color-default"
            >SubjectID</label
          >
          <select
            id="subjectID"
            v-model="ruleForm.subjectID"
            name="subjectID"
            class="w-full border-b-2 focus:outline-none p-1"
            required
          >
            <option v-for="item in listSubject" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
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
            Sửa
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
  name: 'ModalEditCategory',
  components: {
    ToastSuccess,
    ToastError,
  },
  mixins: [validationMixin],
  props: {
    showModal: Boolean,
    categoryItem: Object,
  },
  data() {
    return {
      ruleForm: {
        titleCategory: null,
        slug: '',
        subjectID: null,
        gradeID: null,
      },
      // isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Sửa lớp học thành công!.',
      errorMessage: 'Lỗi! Dữ liệu bị trùng.',
    }
  },
  computed: {
    ...mapState('subject', ['listSubject']),
    ...mapState('grade', ['listGrade']),
    filterSubjectID() {
      return this.listSubject.filter((item) => item.id > 1)
    },
    filterGradeID() {
      return this.listGrade.filter((item) => item.id > 1)
    },
  },
  watch: {
    showModal: {
      immediate: true,
      handler(newShowModal) {
        if (newShowModal && this.categoryItem) {
          this.ruleForm.titleCategory = this.categoryItem.title
          this.ruleForm.slug = this.categoryItem.slug
          this.ruleForm.subjectID = this.categoryItem.subject_id
          this.ruleForm.gradeID = this.categoryItem.grade_id
        }
      },
    },
  },
  validations: {
    ruleForm: {
      titleCategory: {
        required,
      },
      slug: {
        required,
      },
    },
  },
  mounted() {
    this.getSubjects()
    this.getGrade()
  },
  methods: {
    ...mapActions('subject', ['getSubjects']),
    ...mapActions('grade', ['getGrade']),
    ...mapActions('category', ['updateCategory']),
    checkStatusClass,

    closeModal() {
      this.$emit('close')
    },
    async submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        try {
          const payload = {
            id: this.categoryItem.id,
            title: this.ruleForm.titleCategory,
            slug: this.ruleForm.slug,
            subject_id: this.ruleForm.subjectID,
            grade_id: this.ruleForm.gradeID,
          }
          // const response = await this.upadeGrade(payload)
          await this.updateCategory(payload)
          this.$nextTick(() => {
            this.$router.go(0)
          })
          this.showSuccessToast = true
          setTimeout(() => {
            this.showSuccessToast = false
          }, 3000)
        } catch (error) {
          this.showErrorToast = true
          setTimeout(() => {
            this.showErrorToast = false
          }, 3000)
          console.log('Submit Failed', error)
        }
      }
    },
    reset() {
      this.ruleForm.titleCategory = ''
      this.ruleForm.slug = ''
      this.ruleForm.subjectID = null
      this.ruleForm.gradeID = null
    },
  },
}
</script>
