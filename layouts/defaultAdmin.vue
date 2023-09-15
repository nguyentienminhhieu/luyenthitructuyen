<template>
  <div class="flex flex-row">
    <!-- Sidebar -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="bg-[#181F35] text-white border-r-2 w-64 h-screen overflow-y-auto"
      >
        <div class="flex flex-col items-center mt-8 space-x-4">
          <nuxt-link to="/" class="text-white text-4xl font-bold"
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
                Dashboard
              </nuxt-link>
            </li>
            <li class="mb-4 relative group">
              <div
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
                @click="toggleUserMenu"
              >
                Quản lý users
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
                  Giáo viên
                </nuxt-link>
                <nuxt-link
                  to="/admin/users/students"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Học sinh
                </nuxt-link>
              </div>
            </li>
            <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/exams"
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                Quản lý đề thi
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
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                Quản lý bài tập
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
                Quản lý lớp
              </nuxt-link>
            </li>
            <li class="mb-4">
              <nuxt-link
                to="/admin/subject"
                class="block p-3 hover:bg-gray-700 rounded transition duration-300"
              >
                Quản lý môn học
              </nuxt-link>
            </li>
            <li class="mb-4 relative group">
              <nuxt-link
                to="/admin/posts"
                class="flex items-center justify-between p-3 hover:bg-gray-700 rounded transition duration-300 cursor-pointer"
              >
                Quản lý bài viết
                <!-- <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isMenuOpen.posts }"
                ></i> -->
              </nuxt-link>
              <!-- <div
                v-if="isMenuOpen.posts"
                class="ml-4 bg-[#181F35] text-[#181F35] border border-[#181F35] rounded-lg shadow-lg"
              >
                <nuxt-link
                  to="/admin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Tạo bài viết
                </nuxt-link>
                <nuxt-link
                  to="/admin"
                  class="block p-2 hover:bg-gray-700 text-white rounded"
                >
                  Duyệt bài viết
                </nuxt-link>
              </div> -->
            </li>
          </ul>
        </nav>
      </aside>
    </div>
    <!-- Header -->
    <div class="w-full">
      <header
        class="bg-white py-8 px-10 h-16 border-b-2 flex justify-between items-center sticky top-0 z-1000000"
      >
        <div class="relative">
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
        </div>
        <div class="flex items-center space-x-4">
          <button
            class="text-color-custom text-color-custom hover:text-color-custom"
          >
            <i class="fas fa-bell"></i>
          </button>
          <button
            class="text-color-custom text-color-custom hover:text-color-custom"
          >
            <nuxt-link to="/login">
              <i class="fas fa-user-circle"></i>
            </nuxt-link>
          </button>
        </div>
      </header>
      <nuxt />
    </div>
  </div>
</template>
<script>
export default {
  name: 'DefaultAdmin',
  data() {
    return {
      isMenuOpen: {
        users: false,
        // exams: false,
        // exercise: false,
        // posts: false,
      },
      // isSidebarOpen: true,
    }
  },
  methods: {
    // toggleSidebar() {
    //   this.isSidebarOpen = !this.isSidebarOpen
    // },
    toggleUserMenu() {
      this.isMenuOpen.users = !this.isMenuOpen.users
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
