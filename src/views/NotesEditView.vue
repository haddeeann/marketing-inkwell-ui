<template>
  <div class="min-h-screen flex items-start justify-center p-4 bg-gray-50">
    <n-card class="w-full max-w-2xl" title="Edit Note">
      <n-form>

        {{ noteContent }}
        <n-form-item label="Note Content">
          <n-input
            v-model:value="noteContent"
            type="textarea"
            placeholder="Update your note..."
            autosize
          />
        </n-form-item>
        <div class="flex justify-end gap-2 mt-4">
          <router-link to="/notes">
            <n-button>Cancel</n-button>
          </router-link>
          <n-button
            type="primary"
            :disabled="!noteContent"
            @click="handleSaveClicked"
          >
            Update Note
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useRoute, useRouter } from 'vue-router'
import {
  NCard,
  NForm,
  NFormItem,
  NInput,
  NButton
} from 'naive-ui'

const route = useRoute()
const router = useRouter()
const storeNotes = useStoreNotes()
const noteContent = ref('')

if (typeof route.params.id === 'string') {
  noteContent.value = storeNotes.getNoteContent(route.params.id)
  console.log(noteContent.value)
}

const handleSaveClicked = () => {
  if (typeof route.params.id === 'string') {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/notes')
  }
}
</script>
