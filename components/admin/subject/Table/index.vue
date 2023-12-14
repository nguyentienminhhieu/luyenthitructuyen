<template>
  <div class="mt-5 max-h-[450px] overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="px-2 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Môn học
          </th>
          <th
            class="px-6 py-3 border-2 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider"
          >
            Slug
          </th>
          <th class="px-2 py-3 border-2"></th>
        </tr>
      </thead>
      <tbody class="max-h-400 overflow-y-auto custom-scrollbar">
        <tr v-for="subject in listSubject" :key="subject.id">
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ subject.id }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            {{ subject.name }}
          </td>
          <td class="px-6 py-4 border-2 whitespace-no-wrap">
            {{ subject.slug }}
          </td>
          <td class="px-2 py-4 border-2 whitespace-no-wrap">
            <button @click="editSubject(subject)">
              <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
            </button>
            <button @click="deleteSubject(subject.id)">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TableSubjects',
  computed: {
    ...mapState('subject', ['listSubject']),
    ...mapState('subject', ['detailSubject']),
  },
  mounted() {
    this.getSubjects()
  },
  methods: {
    ...mapActions('subject', ['getSubjects']),
    ...mapActions('subject', ['getDetailSubjects']),
    async editSubject(subjectItem) {
      await this.getDetailSubjects(subjectItem.id)
      this.$emit('edit-clicked', this.detailSubject)
    },
    deleteSubject(subjectId) {
      this.$emit('delete-clicked', subjectId)
    },
  },
}
</script>
<style></style>
