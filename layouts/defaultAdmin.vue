<template>
  <div class="flex flex-row">
    <!-- Sidebar -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="bg-[#181F35] text-white border-r-2 w-56 h-screen overflow-y-auto sticky top-0 sidebar"
        style="box-shadow: 4px 0 4px rgba(0, 0, 0, 0.1)"
      >
        <div class="flex flex-col items-center mt-8 space-x-4">
          <nuxt-link
            to="/admin"
            class="text-white text-2xl font-bold logo-container"
          >
            Admin
          </nuxt-link>
        </div>
        <nav class="mt-12">
          <ul>
            <li class="mb-4">
              <nuxt-link
                to="/admin"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-chart-line mr-2"></i>
                <h1 class="menu-container">Dashboard</h1>
              </nuxt-link>
            </li>

            <li v-if="adminAccount == 1" class="mb-4">
              <nuxt-link
                to="/admin/admin-management"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-circle-user mr-2"></i>
                <h1 class="menu-container">Admin</h1>
              </nuxt-link>
            </li>
            <li class="mb-4 relative group">
              <div
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
                @click="toggleUserMenu"
              >
                <div class="flex items-center">
                  <!-- <i class="fa-solid fa-user-group "></i> -->
                  <i class="fa-solid fa-address-book mr-2"></i>
                  <h1 class="menu-container">Users</h1>
                </div>
                <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isMenuOpen.user }"
                ></i>
              </div>
              <div
                v-if="isMenuOpen.user"
                class="ml-4 bg-[#181F35] text-[#181F35] border-t-2 shadow-lg"
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
              <div
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
                @click="toggleExamMenu"
              >
                <div class="flex items-center">
                  <!-- <i class="fa-solid fa-user-group "></i> -->
                  <i class="fa-solid fa-pen-clip mr-2"></i>
                  <h1 class="menu-container">Exams</h1>
                </div>
                <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isExamMenu }"
                ></i>
              </div>
              <div
                v-if="isExamMenu"
                class="ml-4 bg-[#181F35] text-[#181F35] border-t-2 shadow-lg"
              >
                <nuxt-link
                  to="/admin/exams/examAdmin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Admin
                </nuxt-link>
                <nuxt-link
                  to="/admin/exams/examTeacher"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Teacher
                </nuxt-link>
              </div>
            </li>
            <li class="mb-4 relative group">
              <div
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
                @click="toggleExerciseMenu"
              >
                <div class="flex items-center">
                  <i class="fa-solid fa-pen-ruler mr-2"></i>
                  <h1 class="menu-container">Exercise</h1>
                </div>
                <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isExerciseMenu }"
                ></i>
              </div>
              <div
                v-if="isExerciseMenu"
                class="ml-4 bg-[#181F35] text-[#181F35] border-t-2 shadow-lg"
              >
                <nuxt-link
                  to="/admin/exercise/exerciseAdmin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Admin
                </nuxt-link>
                <nuxt-link
                  to="/admin/exercise/exerciseTeacher"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Teacher
                </nuxt-link>
              </div>
            </li>
            <li class="mb-4">
              <nuxt-link
                to="/admin/classes"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-graduation-cap mr-2"></i>
                <h1 class="menu-container">Grade</h1>
              </nuxt-link>
            </li>
            <li class="mb-4">
              <nuxt-link
                to="/admin/subject"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                <i class="fa-solid fa-book mr-2"></i>
                <h1 class="menu-container">Subjects</h1>
              </nuxt-link>
            </li>
            <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/categories"
                class="flex items-center p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                <i class="fa-solid fa-sliders mr-2"></i>
                <h1 class="menu-container">Category</h1>
              </nuxt-link>
            </li>
            <!-- <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/posts"
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                Quản lý bài viết
              </nuxt-link>
            </li> -->
          </ul>
        </nav>
      </aside>
    </div>
    <!-- Header -->
    <div class="w-full">
      <header
        class="flex justify-between items-center bg-white py-4 pr-10 h-14 border-b-2 sticky top-0 z-50"
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)"
      >
        <div
          class="pl-5 text-[#7e7e7e] hover:text-[#253d90] cursor-pointer"
          @click="toggleAside"
        >
          <i
            class="toggle-icon fa-solid"
            :class="{ 'fa-angles-right': !isAsideOpen, 'fa-bars': isAsideOpen }"
          ></i>
        </div>
        <nuxt-link
          to="/admin"
          class="text-[#253d90] text-xl font-bold logo-container"
          >LuyenThiTracNghiem</nuxt-link
        >
        <div class="flex items-center space-x-4">
          <!-- <button
            class="text-color-custom text-color-custom hover:text-color-custom"
          >
            <i class="fas fa-bell"></i>
          </button> -->
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
// import { mapState } from 'vuex'
import AccountMenuAdmin from '~/components/common/AccountMenu'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import Cookies from '~/services/cookies.service.js'

export default {
  name: 'DefaultAdmin',
  components: {
    AccountMenuAdmin,
    ScrollToTop,
  },
  data() {
    return {
      isMenuOpen: {
        user: false,
      },
      isExamMenu: false,
      isExerciseMenu: false,
      isMenuAccount: false,
      isAsideOpen: true,
      adminAccount: null,
      isQLAdmin: false,
    }
  },
  computed: {},
  mounted() {
    this.adminAccount = Cookies.getUser()
    // console.log('user', Cookies.getUser())
    // console.log('adminAccount', this.adminAccount)
    if (Cookies.getUser() === 1) {
      // this.cookieExists = true;
      this.isQLAdmin = true
    }
  },
  methods: {
    toggleUserMenu() {
      this.isMenuOpen.user = !this.isMenuOpen.user
    },
    toggleExamMenu() {
      this.isExamMenu = !this.isExamMenu
    },
    toggleExerciseMenu() {
      this.isExerciseMenu = !this.isExerciseMenu
    },
    toggleAside() {
      this.isAsideOpen = !this.isAsideOpen
      const sidebar = document.querySelector('.sidebar')
      if (this.isAsideOpen) {
        sidebar.style.width = '250px'
        sidebar.classList.remove('closed')
      } else {
        sidebar.style.width = '56px'
        sidebar.classList.add('closed')
      }
    },
    toggleAccountMenu() {
      this.isMenuAccount = !this.isMenuAccount
    },
  },
}
</script>
<style scope>
.sidebar.closed .logo-container,
.sidebar.closed .menu-container {
  visibility: hidden;
}
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
