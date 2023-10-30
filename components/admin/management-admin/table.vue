<template>
  <div class="mt-5 max-h-[450px] overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Roles
          </th>
          <th
            class="px-1 py-3 border-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            isActive
          </th>
          <th class="px-2 py-3 border-2"></th>
          <!-- Ô trống cho nút Chỉnh sửa -->
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto">
        <tr
          v-for="item in listAdmin"
          :key="item.id"
          class="hover:bg-gray-50 cursor-pointer custom-scrollbar"
        >
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <span v-if="item.id">{{ item.id }}</span>
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">{{ item.name }}</td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">{{ item.role }}</td>
          <td class="px-1 py-4 border-2 whitespace-no-wrap">
            <input
              :id="`toggle-${item.id}`"
              :checked="item.active"
              type="checkbox"
              class="hidden"
              @change="toggleActive(item)"
            />
            <label
              :for="`toggle-${item.id}`"
              class="flex items-center cursor-pointer"
            >
              <div
                :class="{
                  'bg-[#253d90]': item.active === 1,
                  'bg-gray-300': item.active === 0,
                }"
                class="w-12 h-6 rounded-full p-1"
              >
                <div
                  :class="{ 'translate-x-6': item.active === 0 }"
                  class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"
                ></div>
              </div>
            </label>
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <!-- <button @click="editAdmin">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button> -->
            <button @click="deleteAdmin(item.id)">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TableAdmin',
  data() {
    return {
      // isActive: false,
    }
  },
  computed: {
    ...mapState('account', ['listAdmin']),
  },
  mounted() {
    this.getAdmin()
  },
  methods: {
    ...mapActions('account', ['getAdmin']),
    ...mapActions('account', ['activeAdmin']),
    async toggleActive(item) {
      // console.log(123, item)
      try {
        const payload = {
          id: item.id,
        }
        await this.activeAdmin(payload)
        this.$router.go(0)
      } catch (error) {
        console.log('Lỗi server: ', error)
      }
    },
    // editAdmin() {
    //   this.$emit('edit-clicked')
    // },
    deleteAdmin(adminId) {
      this.$emit('delete-clicked', adminId)
    },
  },
}
</script>
<style></style>
