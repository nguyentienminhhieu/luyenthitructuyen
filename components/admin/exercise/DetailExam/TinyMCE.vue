<template>
  <div>
    <tinymce-vue v-model="content" @input="onContentChange" />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    'tinymce-vue': Editor,
  },
  props: {
    newTitle: String,
  },
  data() {
    return {
      content: this.newTitle,
      tinymceConfig: {
        // Cấu hình TinyMCE ở đây
        // Ví dụ:
        height: '500px',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
      },
    }
  },
  methods: {
    onContentChange() {
      this.$emit('update-content', this.content)
    },
  },
}
</script>
