<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 w-[400px] h-[500px] overflow-auto"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Loại đề thi</h2>
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
            class="mt-1 p-2 block w-full h-40 rounded-md focus:outline-none border border-gray-300"
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
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
import { checkStatusClass } from '~/mixins/ruleValidator'
export default {
  name: 'ModalEditExam',
  mixins: [validationMixin],
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      ruleForm: {
        examName: '',
        examDescription: '',
        slug: '',
        category: null,

        examTime: '50',
        examScore: '100',
      },
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
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    ...mapActions('category', ['getCategory']),
    // ...mapActions('exam', ['addExam']),
    checkStatusClass,
    closeModal() {
      this.$emit('close')
    },
    submitForm() {
      // Đưa dữ liệu giáo viên vào hàm hoặc gửi đến API ở đây
      // Sau khi thêm xong, đóng modal
      //   const invalid = this.$v.ruleForm.$invalid
      //   if (invalid) {
      //     this.$v.ruleForm.$touch()
      //   } else {
      console.log('Dung')
      this.$emit('close')
      //   }
    },
  },
}
</script>
<style></style>
