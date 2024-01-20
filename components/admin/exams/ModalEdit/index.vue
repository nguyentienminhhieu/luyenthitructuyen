<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 w-[600px] h-[600px] overflow-auto"
    >
      <h2 class="text-center text-xl font-semibold mb-8">
        Sửa thông tin đề thi
      </h2>
      <form class="flex flex-col" @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="examName" class="block text-color-default"
            >Tên đề thi</label
          >
          <input
            id="examName"
            ref="examNameInput"
            v-model="ruleForm.examName"
            type="text"
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
            :class="[
              !$v.ruleForm.examName.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.examName)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.examName.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.examName)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.examName.required ? 'Vui lòng nhập dữ liệu!' : ''
              }}
            </span>
          </div>
        </div>

        <div class="mb-4">
          <label for="examDescription" class="block text-color-default"
            >Mô tả</label
          >
          <textarea
            id="examDescription"
            v-model="ruleForm.examDescription"
            class="mt-1 p-2 block w-full h-20 rounded-md focus:outline-none border border-gray-300"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="slug" class="block text-color-default">Slug đề thi</label>
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
            class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
            required
          >
            <option
              v-for="item in listCategory"
              :key="item.id"
              :value="item.id"
            >
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="flex justify-between">
          <div class="mb-4">
            <label for="examTime" class="block text-color-default"
              >Thời gian làm bài</label
            >
            <input
              id="examTime"
              v-model="ruleForm.examTime"
              type="number"
              class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
              min="1"
            />
          </div>
          <div class="mb-4">
            <label for="examScore" class="block text-color-default"
              >Điểm Số tối đa</label
            >
            <input
              id="examScore"
              v-model="ruleForm.examScore"
              type="number"
              class="mt-1 p-2 block w-full rounded-md focus:outline-none border border-gray-300"
              min="1"
            />
          </div>
        </div>
        <div class="mb-4">
          <label
            for="avatar"
            class="bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
          >
            Thay đổi ảnh đề thi
            <input
              type="file"
              id="avatar"
              accept="image/*"
              @change="handleFileChange($event)"
              class="hidden"
            />
          </label>
          <div class="my-4">
            <button v-if="ruleForm.selectedImage" @click="clearImage">
              <i class="fa-solid fa-x"></i>
            </button>
            <img
              v-if="ruleForm.selectedImage"
              :src="ruleForm.selectedImage"
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
  name: 'ModalEditExam',
  components: {
    ToastSuccess,
    ToastError,
  },
  mixins: [validationMixin],
  props: {
    showModal: Boolean,
    examItem: Object,
  },
  data() {
    return {
      ruleForm: {
        examName: '',
        examDescription: '',
        slug: '',
        category: null,
        examTime: null,
        examScore: null,
        selectedImage: null,
      },
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Sửa đề thành công!.',
      errorMessage: 'Lỗi! Dữ liệu bị trùng.',
      currentPageExam: null,
    }
  },
  validations: {
    ruleForm: {
      examName: {
        required,
      },
      slug: {
        required,
      },
    },
  },
  computed: {
    ...mapState('category', ['listCategory']),
    ...mapState('upload', ['fileUpload']),
  },
  watch: {
    showModal: {
      immediate: true,
      handler(newShowModal) {
        if (newShowModal && this.examItem) {
          this.ruleForm.examName = this.examItem.title
          this.ruleForm.examDescription = this.examItem.description
          this.ruleForm.slug = this.examItem.slug
          this.ruleForm.category = this.examItem.category_id
          this.ruleForm.examTime = this.examItem.duration
          this.ruleForm.examScore = this.examItem.max_score
          this.ruleForm.selectedImage = this.examItem.url_img
        }
      },
    },
  },
  mounted() {
    this.getCategory()
    this.updateExam()
    const currentPageNumberExam = localStorage.getItem('currentPageNumberExam')
    this.currentPageExam = currentPageNumberExam
  },
  methods: {
    ...mapActions('category', ['getCategory']),
    ...mapActions('exam', ['updateExam']),
    ...mapActions('exam', ['getListExam']),
    ...mapActions('upload', ['uploadFile']),
    checkStatusClass,
    closeModal() {
      this.$emit('close')
      this.$v.$reset()
    },
    submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        const payload = {
          id: this.examItem.id,
          title: this.ruleForm.examName,
          description: this.ruleForm.examDescription,
          slug: this.ruleForm.slug,
          category_id: this.ruleForm.category,
          duration: this.ruleForm.examTime,
          max_score: this.ruleForm.examScore,
          url_img: this.ruleForm.selectedImage,
        }
        this.updateExam(payload)
          .then(() => {
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
              this.getListExam({ page: this.currentPageExam })
            }, 2000)
          })
          .catch(() => {
            this.showErrorToast = true
            setTimeout(() => {
              this.showErrorToast = false
            }, 2000)
          })
        // this.closeModal()
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

          if (typeof this.fileUpload === 'object') {
            try {
              if (this.fileUpload && this.fileUpload.url) {
                this.ruleForm.selectedImage = this.fileUpload.url
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
      this.ruleForm.selectedImage = null
    },
  },
}
</script>
<style></style>
