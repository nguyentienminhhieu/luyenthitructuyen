<template>
  <div class="question" :id="question.random_id ?? question.id">
    <div class="absolute right-[16px] z-[10]">
      <span
        class="font-bold cursor-pointer"
        @click="clearQuestion(question.random_id ?? question.id)"
        >X</span
      >
    </div>
    <div class="mt-[26px]">
      <Editor v-model="question.content" />
    </div>
    <div class="mt-[10px]">
      <BaseTextArea v-model="question.description" placeholder="Description" />
    </div>
    <div class="mt-[10px]">
      <BaseTextArea v-model="question.explanation" placeholder="Explanation" />
    </div>
    <div class="mt-[10px] flex gap-[8px] items-center">
      New tab:
      <BaseSwitch
        :modelValue="question.page == 1 ? true : false"
        @update:modelValue="
          (value) => {
            question.page = value == true ? 1 : 0
          }
        "
      />
    </div>
    <div class="mt-[10px] flex gap-[8px]">
      <BaseButton
        v-if="question.answers.length <= 0"
        width="w-[100px]"
        height="h-[30px]"
        customStyle="text-[12px] rounded-[8px] text-center bg-[#ff9900] text-[#ffffff]"
        title="Add Question"
        @click="addQuestion"
      />
      <BaseButton
        v-if="
          !question.questions_extends || question.questions_extends.length <= 0
        "
        width="w-[100px]"
        height="h-[30px]"
        customStyle="text-[12px] rounded-[8px] text-center bg-[#cc66ff] text-[#ffffff]"
        title="Add Answer"
        @click="addAnswer"
      />
    </div>
    <div
      class="mt-[10px]"
      v-if="question.answers && question.answers.length > 0"
    >
      <div v-for="(item, index) in question.answers" :key="index">
        <div class="flex gap-[8px] mb-[5px] items-center">
          <input
            :name="radio-${question.random_id??question.id}"
            :id="radio-${item.random_id??item.id}"
            :checked="item.is_correct"
            type="radio"
            v-model="item.is_correct"
            @change="chooseAnswerCorrect(item.random_id ?? item.id)"
          />
          <Editor v-model="item.content" />
          <span
            class="font-bold cursor-pointer"
            @click="clearAnswer(item.random_id ?? question.id)"
          >
            X
          </span>
        </div>
      </div>
    </div>
    <div
      class="mt-[10px]"
      v-if="
        question &&
        question.questions_extends &&
        question.questions_extends.length > 0
      "
    >
      <div class="w-full border-b mb-[10px]"></div>
      <div v-for="(item, index) in question.questions_extends" :key="index">
        <Questions :question="item" @clearQuestion="clearQuestionChild" />
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton  from "@/components/elements/BaseButton.vue"
import BaseTextArea  from "@/components/elements/BaseTextArea.vue"
import BaseSwitch  from "@/components/elements/BaseSwitch.vue"

import {useRouter, useRoute} from "vue-router"
const router = useRouter();
const route = useRoute()
const emit = defineEmits(["clearQuestion"])
const props = defineProps({
    question: {
        type:Object,
        default: {}
    }
})

const scrollToQuestion = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    router.push(/exam/${route.params.id}?#${id})
}

const clearAnswer = (answer_id) => {
    props.question.answers = props.question.answers.filter(element => {
        if((element.random_id && element.random_id != answer_id) || (element.id && element.id == answer_id)) {
            return element
        }
    });
}

const chooseAnswerCorrect = (answer_id) => {
    props.question.answers.forEach(element => {
        if((element.random_id && element.random_id == answer_id) || (element.id && element.id == answer_id)) {
            element.is_correct = true
        } else {
            element.is_correct = false
        }
    });
}

const addAnswer = () => {
    const randomId = Math.random()
    let dataAnswer = {
        random_id: randomId,
        content: '',
        is_correct: false
    }
    props.question.answers.push(dataAnswer)
}

const clearQuestion = (id) => {
    emit('clearQuestion', id)
}

const clearQuestionChild = (question_id) => {
    props.question.questions_extends = props.question.questions_extends.filter(element => {
        if((element.random_id && element.random_id != question_id) || (element.id && element.id != question_id)) {
            return element
        }
    });
}

const addQuestion = () => {
    const randomId = Math.random()
    let dataQuestion = {
        random_id: randomId,
        content: '',
        slug:'',
        description:'',
        explanation:'',
        file:'',
        answers: [],
        questions_extends:[],
        page: false
    };

    props.question.questions_extends.push(dataQuestion);

    setTimeout(() => {
        scrollToQuestion(randomId);
   },200)
}
</script>
<style lang="scss" scoped>
.question {
  @apply relative p-[16px] border mb-[10px] rounded-[8px];
}
</style>
