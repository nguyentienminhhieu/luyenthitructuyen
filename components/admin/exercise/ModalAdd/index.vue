<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 w-[600px] h-[600px] overflow-auto"
    >
      <h2 class="text-center text-xl font-semibold mb-8">Thêm bài tập</h2>
      <form class="flex flex-col" @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="exerciseName" class="block text-color-default"
            >Tên bài tập</label
          >
          <input
            id="exerciseName"
            ref="exerciseNameInput"
            v-model="ruleForm.exerciseName"
            type="text"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
            :class="[
              !$v.ruleForm.exerciseName.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.exerciseName)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.exerciseName.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.exerciseName)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.exerciseName.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <div class="mb-4">
          <label for="exerciseDescription" class="block text-color-default"
            >Mô tả</label
          >
          <textarea
            id="exerciseDescription"
            v-model="ruleForm.exerciseDescription"
            class="mt-1 p-2 block w-full h-20 rounded-md focus:outline-none border border-gray-300"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="slug" class="block text-color-default"
            >Slug Bài tập</label
          >
          <input
            id="slug"
            v-model="ruleForm.slug"
            type="text"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
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
        <div class="mb-4">
          <label for="category" class="block text-color-default"
            >Category</label
          >
          <select
            id="category"
            v-model="ruleForm.category"
            name="category"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300 overflow-auto origin-bottom"
            required
          >
            <option
              v-for="item in listCategory"
              :key="item.id"
              :value="item.id"
              class="h-[5rem]"
            >
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label
            for="avatar"
            class="bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
          >
            Tải ảnh bài tập
            <input
              type="file"
              id="avatar"
              accept="image/*"
              @change="handleFileChange($event)"
              class="hidden"
            />
          </label>
          <div class="my-4">
            <button v-if="selectedImage" @click="clearImage">
              <i class="fa-solid fa-x"></i>
            </button>
            <img
              v-if="selectedImage"
              :src="selectedImage"
              alt="Ảnh đại diện"
              class="w-32 h-32 rounded-md mx-auto"
            />
          </div>
        </div>

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
  name: 'ModalAddExercise',
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
        exerciseName: '',
        exerciseDescription: '',
        slug: '',
        max_score: '',
        duration: '',
        category: null,
      },
      selectedImage: null,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Thêm đề thi thành công!.',
      errorMessage: 'Lỗi! Dữ liệu bị trùng.',
      currentPageExercise: null,
    }
  },
  validations: {
    ruleForm: {
      exerciseName: {
        required,
      },
      slug: {
        required,
      },
    },
  },
  computed: {
    ...mapState('grade', ['listGrade']),
    ...mapState('subject', ['listSubject']),
    ...mapState('category', ['listCategory']),
    ...mapState('upload', ['fileUpload']),
  },
  mounted() {
    this.getGrade()
    this.getSubjects()
    this.getCategory()
    const currentPageNumberExercise = localStorage.getItem(
      'currentPageNumberExercise'
    )
    this.currentPageExercise = currentPageNumberExercise
  },
  methods: {
    ...mapActions('grade', ['getGrade']),
    ...mapActions('subject', ['getSubjects']),
    ...mapActions('category', ['getCategory']),
    ...mapActions('exercise', ['addExercise']),
    ...mapActions('upload', ['uploadFile']),
    ...mapActions('exercise', ['getListExercise']),

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
            title: this.ruleForm.exerciseName,
            slug: this.ruleForm.slug,
            description: this.ruleForm.exerciseDescription,
            category_id: this.ruleForm.category,
            max_score: this.ruleForm.max_score,
            duration: this.ruleForm.duration,
            url_img: this.selectedImage,
          }
          if (this.addExercise(payload)) {
            this.reset()
            this.$nextTick(() => {
              this.$refs.exerciseNameInput.focus()
            })
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
              this.getListExercise({ page: this.currentPageExercise })
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
    changeAvatar() {
      this.$emit('close')
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Đọc tệp hình ảnh và hiển thị nó trên giao diện
        const reader = new FileReader()

        reader.onload = async (e) => {
          const formData = new FormData()
          formData.append('image', file)
          await this.uploadFile(formData)

          // console.log('id: ', this.fileUpload)
          if (typeof this.fileUpload === 'object') {
            try {
              if (this.fileUpload && this.fileUpload.url) {
                // eslint-disable-next-line vue/no-mutating-props
                this.selectedImage = this.fileUpload.url
              } else {
                console.log('Không tìm thấy giá trị URL.')
              }
            } catch (error) {
              console.error('Lỗi khi chuyển đổi dữ liệu JSON:', error)
            }
          } else {
            console.error('FileData không có giá trị.')
          }
        }
        reader.readAsDataURL(file)
      }
    },
    clearImage() {
      this.selectedImage = null
    },
    reset() {
      this.ruleForm.exerciseName = ''
      this.ruleForm.exerciseDescription = ''
      this.ruleForm.slug = ''
      this.ruleForm.category = null
      this.selectedImage = null
    },
  },
}
</script>
<style></style>
