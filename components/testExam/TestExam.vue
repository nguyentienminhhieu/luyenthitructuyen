<template>
  <div class="border-2">
    <!-- <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br /> -->
    <!-- <button class="bg-black text-white" @click="pushArray">Add</button> -->
    <div v-for="item in list" :key="item.id">
      <!-- <h1>{{ item.id }}</h1> -->
      <TestExam2Components :question="item" />
    </div>
  </div>
</template>
<script>
import TestExam2Components from '~/components/testExam2/TestExam2.vue'

export default {
  name: 'TestExamComponents',
  components: {
    TestExam2Components,
  },
  layout: 'defaultAdmin',
  props: {
    list: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
  },
  data() {
    return {
      // question: {
      //   title: '',
      //   slug: '',
      //   descriptions: '',
      //   listQuestion: [],
      // },
      // listQuestions: [],
    }
  },

  methods: {
    // pushArray() {
    //   this.listQuestions()
    // },
  },
}
</script>
<style></style>
