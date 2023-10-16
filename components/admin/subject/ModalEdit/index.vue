<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">Sửa môn học</h2>

      <form
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
        @submit.prevent="editSubject"
      >
        <div class="mb-4 md:mb-0">
          <label for="nameSubject" class="block text-color-default"
            >Name Class</label
          >
          <input
            id="nameSubject"
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
            id="phone"
            v-model.trim="ruleForm.slug"
            type="text"
            name="phone"
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

        <!-- Thoát và Thêm -->
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
import { required } from 'vuelidate/lib/validators'
import { checkStatusClass } from '~/mixins/ruleValidator'
export default {
  name: 'ModalEditSubject',
  mixins: [validationMixin],
  props: {
    showModal: Boolean,
    subjectItem: Object,
  },
  data() {
    return {
      ruleForm: {
        nameSubject: '',
        slug: '',
      },
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
  watch: {
    showModal: {
      immediate: true,
      handler(newShowModal) {
        if (newShowModal && this.subjectItem) {
          this.ruleForm.nameSubject = this.subjectItem.name
          this.ruleForm.slug = this.subjectItem.slug
        }
      },
    },
  },
  methods: {
    checkStatusClass,
    closeModal() {
      this.$emit('close')
    },
    editSubject() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        const payload = {
          id: this.subjectItem.id,
          name: this.ruleForm.nameSubject,
          slug: this.ruleForm.slug,
        }
        this.$store
          .dispatch('subject/updateSubject', payload)
          .then(() => {
            // Sau khi gọi API updateSubject hoàn thành, tải lại trang.
            this.$router.go(0)
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật môn học:', error)
          })
        this.closeModal()
      }
    },
  },
}
</script>
