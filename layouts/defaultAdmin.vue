<template>
  <div class="flex flex-row">
    <!-- Sidebar -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="bg-[#181F35] text-white border-r-2 w-56 h-screen overflow-y-auto sticky top-0"
      >
        <div class="flex flex-col items-center mt-8 space-x-4">
          <nuxt-link to="/admin" class="text-white text-4xl font-bold"
            >LOGO</nuxt-link
          >
          <!-- <p class="ml-none text-sm">Administrator</p> -->
        </div>
        <nav class="mt-12">
          <ul>
            <li class="mb-4">
              <nuxt-link
                to="/admin"
                class="block p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-chart-line mr-2"></i>
                Dashboard
              </nuxt-link>
            </li>
            <li class="mb-4">
              <nuxt-link
                to="/admin/admin-management"
                class="block p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-circle-user mr-2"></i>
                Admin
              </nuxt-link>
            </li>
            <li class="mb-4 relative group">
              <div
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
                @click="toggleUserMenu"
              >
                <div>
                  <!-- <i class="fa-solid fa-user-group "></i> -->
                  <i class="fa-solid fa-address-book mr-2"></i>
                  Users
                </div>
                <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isMenuOpen.users }"
                ></i>
              </div>
              <div
                v-if="isMenuOpen.users"
                class="ml-4 bg-[#181F35] text-[#181F35] border border-[#181F35] rounded-lg shadow-lg"
              >
                <nuxt-link
                  to="/admin/users/teachers"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Teachers
                </nuxt-link>
                <nuxt-link
                  to="/admin/users/students"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Students
                </nuxt-link>
              </div>
            </li>
            <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/exams"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                <i class="fa-solid fa-pen-clip mr-2"></i>
                Exams
                <!-- <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isMenuOpen.exams }"
                ></i> -->
              </nuxt-link>
              <!-- <div
                v-if="isMenuOpen.exams"
                class="ml-4 bg-[#181F35] text-[#181F35] border border-[#181F35] rounded-lg shadow-lg"
              >
                <nuxt-link
                  to="/admin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Tạo đề
                </nuxt-link>
                <nuxt-link
                  to="/admin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Duyệt đề
                </nuxt-link>
              </div> -->
            </li>
            <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/exercise"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                <i class="fa-solid fa-pen-ruler mr-2"></i>
                Exercise
                <!-- <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isMenuOpen.exercise }"
                ></i> -->
              </nuxt-link>
              <!-- <div
                v-if="isMenuOpen.exercise"
                class="ml-4 bg-[#181F35] text-[#181F35] border border-[#181F35] rounded-lg shadow-lg"
              >
                <nuxt-link
                  to="/admin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Tạo bài tập
                </nuxt-link>
                <nuxt-link
                  to="/admin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Duyệt bài tập
                </nuxt-link>
              </div> -->
            </li>
            <li class="mb-4">
              <nuxt-link
                to="/admin/classes"
                class="block p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-graduation-cap mr-2"></i>
                Grade
              </nuxt-link>
            </li>
            <li class="mb-4">
              <nuxt-link
                to="/admin/subject"
                class="block p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-book mr-2"></i>
                Subjects
              </nuxt-link>
            </li>
            <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/categories"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                <i class="fa-solid fa-sliders mr-2"></i>
                Category
              </nuxt-link>
            </li>
            <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/posts"
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                Quản lý bài viết
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
    <!-- Header -->
    <div class="w-full">
      <header
        class="bg-white py-4 px-10 h-14 border-b-2 flex justify-end items-center sticky top-0 z-50"
      >
        <!-- <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none"
          />
          <button
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-color-custom hover:text-gray-600 focus:outline-none"
          >
            <i class="fas fa-search"></i>
          </button>
        </div> -->
        <div class="flex items-center space-x-4">
          <button
            class="text-color-custom text-color-custom hover:text-color-custom"
          >
            <i class="fas fa-bell"></i>
          </button>
          <div class="text-color-custom">
            <div
              class="relative cursor-pointer text-color-custom hover:text-color-custom"
              @click="toggleAccountMenu"
            >
              <i class="fas fa-user-circle"></i>
            </div>
            <div>
              <AccountMenuAdmin v-if="isMenuAccount" />
            </div>
          </div>
        </div>
      </header>
      <ScrollToTop />
      <div>
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import AccountMenuAdmin from '~/components/common/AccountMenu'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
// import Cookies from '@/services/cookies.service'

export default {
  name: 'DefaultAdmin',
  components: {
    AccountMenuAdmin,
    ScrollToTop,
  },
  data() {
    return {
      isMenuOpen: {
        users: false,
        // exams: false,
        // exercise: false,
        // posts: false,
      },
      // checkToken: null,
      isMenuAccount: false,
    }
  },
  // mounted() {
  //   this.checkToken = Cookies.getToken()
  //   if (!this.checkToken) {
  //     window.location.href = '/login'
  //   }
  // },
  methods: {
    toggleUserMenu() {
      this.isMenuOpen.users = !this.isMenuOpen.users
    },
    toggleAccountMenu() {
      this.isMenuAccount = !this.isMenuAccount
    },
    // toggleExamMenu() {
    //   this.isMenuOpen.exams = !this.isMenuOpen.exams
    // },
    // toggleExerciseMenu() {
    //   this.isMenuOpen.exercise = !this.isMenuOpen.exercise
    // },
    // togglePostMenu() {
    //   this.isMenuOpen.posts = !this.isMenuOpen.posts
    // },
  },
}
</script>
<style scope>
/* Thiết lập thanh cuộn */
::-webkit-scrollbar {
  width: 6px; /* Chiều rộng của thanh cuộn */
  background-color: #181f35; /* Màu nền của thanh cuộn */
}

/* Màu khi hover lên thanh cuộn */
::-webkit-scrollbar-thumb {
  background-color: #6b7280; /* Màu thanh cuộn */
  border-radius: 3px; /* Để thanh cuộn trông bo tròn hơn */
}

/* Màu khi click vào thanh cuộn */
::-webkit-scrollbar-thumb:hover {
  background-color: #4b5563; /* Màu khi hover lên thanh cuộn */
}
</style>
