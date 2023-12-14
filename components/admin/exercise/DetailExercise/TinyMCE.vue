<template>
  <div id="app">
    <editor
      v-if="question"
      v-model="localQuestionContent"
      api-key="sz9skcdecmj73wjlzeljs30x7u6zw60nztdarvbg629n35um"
      :init="init"
      :style="{ border: '1px solid #ccc', borderRadius: '20px' }"
    />
    <editor
      v-if="answer"
      v-model="localAnswerContent"
      api-key="sz9skcdecmj73wjlzeljs30x7u6zw60nztdarvbg629n35um"
      :init="init"
      :style="{ border: '1px solid #ccc', borderRadius: '20px' }"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
import Editor from '@tinymce/tinymce-vue'
const plugins = [
  'advlist autolink lists link image charmap print preview anchor',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime media table paste code help wordcount',
]
const toolbar =
  ' a11ycheck  | bold italic underline | fontsizeselect | forecolor backcolor ' +
  '| alignleft aligncenter alignright alignjustify|bullist numlist |outdent ' +
  'indent blockquote  | table  | link image media| removeformat   | undo redo'

const init = reactive({
  language: 'en',
  height: 300,
  width: '100%',
  statusbar: false,
  content_css: true,
  plugins,
  toolbar,
  powerpaste_allow_local_images: true,
  powerpaste_word_import: 'prompt',
  powerpaste_html_import: 'prompt',
})
export default {
  name: 'TinyMCE',
  components: {
    editor: Editor,
  },
  props: {
    question: Object,
    answer: Object,
    // eslint-disable-next-line vue/require-default-prop
    questionContent: String,
    // eslint-disable-next-line vue/require-default-prop
    answerContent: String,
  },
  data() {
    return {
      init,
      localQuestionContent: this.questionContent,
      localAnswerContent: this.answerContent,
    }
  },

  watch: {
    questionContent(newVal) {
      this.localQuestionContent = newVal
    },
    localQuestionContent(newVal) {
      this.$emit('update:questionContent', newVal)
    },
    answerContent(newVal) {
      this.localAnswerContent = newVal
    },
    localAnswerContent(newVal) {
      this.$emit('update:answerContent', newVal)
    },
  },
  mounted() {
    // Thêm đoạn mã MathJax vào <head> khi component được mounted
    const mathjaxScript = document.createElement('script')
    mathjaxScript.type = 'text/javascript'
    mathjaxScript.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6'
    document.head.appendChild(mathjaxScript)

    mathjaxScript.onload = () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = `
        MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
          },
          chtml: {
            displayAlign: 'center',
            displayIndent: '0'
          }
        };
      `
      document.head.appendChild(script)

      const mathjaxScript2 = document.createElement('script')
      mathjaxScript2.type = 'text/javascript'
      mathjaxScript2.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6'
      document.head.appendChild(mathjaxScript2)
    }
  },
}
</script>
<style>
#app {
  display: block; /* thay đổi từ 'flex' thành 'block' */
  overflow: visible; /* hoặc 'auto' tùy thuộc vào yêu cầu */
}

/* Điều chỉnh kích thước và màu sắc của thanh công cụ */
.tox-toolbar__primary {
  background-color: #f8f9fa;
  border: none;
}

/* Điều chỉnh màu sắc và viền của nút trong thanh công cụ */
.tox-toolbar__group .tox-tbtn {
  color: #495057;
  border: 1px solid #ced4da;
  background-color: #ffffff;
}

/* Điều chỉnh màu sắc của icon trong nút */
.tox-icon {
  color: #495057;
}

/* Điều chỉnh màu sắc của khung soạn thảo */
.tox-tinymce {
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
// drag_drop: true,
