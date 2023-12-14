<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 w-[400px] h-[500px] overflow-auto"
    >
      <h2 class="text-center text-xl font-semibold mb-10">
        Sửa thông tin bài tập
      </h2>
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
            class="mt-1 p-2 block w-full h-40 rounded-md focus:outline-none border border-gray-300"
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
        <div class="mb-4">
          <label
            for="avatar"
            class="bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
          >
            Thay đổi ảnh bài tập
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
  name: 'ModalEditExercise',
  components: {
    ToastSuccess,
    ToastError,
  },
  mixins: [validationMixin],
  props: {
    showModal: Boolean,
    exerciseItem: Object,
  },
  data() {
    return {
      ruleForm: {
        exerciseName: '',
        exerciseDescription: '',
        slug: '',
        category: null,
        selectedImage: null,
      },
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Sửa bài tập thành công!.',
      errorMessage: 'Lỗi! Dữ liệu bị trùng.',
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
    ...mapState('category', ['listCategory']),
    ...mapState('upload', ['fileUpload']),
  },
  watch: {
    showModal: {
      immediate: true,
      handler(newShowModal) {
        if (newShowModal && this.exerciseItem) {
          this.ruleForm.exerciseName = this.exerciseItem.title
          this.ruleForm.exerciseDescription = this.exerciseItem.description
          this.ruleForm.slug = this.exerciseItem.slug
          this.ruleForm.category = this.exerciseItem.category_id
          this.ruleForm.examTime = this.exerciseItem.duration
          this.ruleForm.examScore = this.exerciseItem.max_score
          this.ruleForm.selectedImage = this.exerciseItem.url_img
        }
      },
    },
  },
  mounted() {
    this.getCategory()
    this.updateExercise()
  },
  methods: {
    ...mapActions('category', ['getCategory']),
    ...mapActions('exercise', ['updateExercise']),
    ...mapActions('exercise', ['getListExercise']),
    ...mapActions('upload', ['uploadFile']),
    checkStatusClass,
    closeModal() {
      this.$emit('close')
    },
    submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        const payload = {
          id: this.exerciseItem.id,
          title: this.ruleForm.exerciseName,
          description: this.ruleForm.exerciseDescription,
          slug: this.ruleForm.slug,
          category_id: this.ruleForm.category,
          url_img: this.ruleForm.selectedImage,
        }
        this.updateExercise(payload)
          .then(() => {
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
              this.getListExercise()
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
        const reader = new FileReader()

        reader.onload = async (e) => {
          const formData = new FormData()
          formData.append('image', file)
          await this.uploadFile(formData)

          if (this.fileUpload) {
            try {
              const match = /"url":\s*"([^"]+)"/.exec(this.fileUpload)

              if (match && match[1]) {
                const url = match[1]
                // eslint-disable-next-line vue/no-mutating-props
                this.ruleForm.selectedImage = url.replaceAll('\\', '')
                // eslint-disable-next-line vue/no-mutating-props
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
