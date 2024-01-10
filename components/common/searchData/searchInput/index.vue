<template>
  <div>
    <div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="border-b-2 border-gray-300 rounded w-72 py-1 px-2 pr-8 focus:outline-none"
        @input="performSearch"
      />
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        @click="performSearch"
        
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'InputSearch',
  data() {
    return {
      searchQuery: '', // Giá trị nhập vào ô tìm kiếm
      searchResults: [], // Kết quả tìm kiếm
      isSearchVisible: false,
    }
  },
  methods: {
    async performSearch() {
      try {
        // Gọi API JSONPlaceholder giả mạo
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?q=${this.searchQuery}`
        )

        // Lọc kết quả theo tiêu đề bài viết
        this.searchResults = response.data
        this.isSearchVisible =
          this.searchQuery !== '' && this.searchResults.length > 0
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    handleResultSelect(result) {
      // Xử lý khi kết quả được chọn
      console.log('Selected result:', result)
      // Đồng thời có thể thực hiện chuyển hướng hoặc xử lý tùy ý
      // Ví dụ: chuyển hướng đến trang chi tiết với kết quả đã chọn
      this.$router.push({ path: `/detail/${result.id}` })
    },

    closeModal() {
      this.isSearchVisible = false
    },
  },
}
</script>

<style scoped>
/* Thêm CSS cho dropdown */
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
}

.search-results ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-results li:hover {
  background-color: #f0f0f0;
}
@media (min-width: 375px) and (max-width: 899px) {
  .search-input {
    width: 250px;
  }
  .search-results {
    max-height: 320px;
  }
}
</style>
