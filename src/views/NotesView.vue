<template>
  <div class="min-h-screen p-6 bg-gray-50">
    <n-card title="Take a Note" class="max-w-3xl mx-auto mb-6">
      <n-input
        v-model:value="newNote"
        type="textarea"
        placeholder="Write your note here..."
        autosize
        ref="noteInput"
      />
      <div class="flex justify-end mt-4">
        <n-button
          type="primary"
          :disabled="!newNote"
          @click="addNote"
        >
          Add Note
        </n-button>
      </div>
    </n-card>

    <div class="max-w-3xl mx-auto space-y-4">
      <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />
      <n-empty
        v-if="storeNotes.notes.length === 0"
        description="No notes yet. Start by adding one above!"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Note from '@/components/Note.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'
import { NCard, NInput, NButton, NEmpty } from 'naive-ui'

const storeNotes = useStoreNotes()
const newNote = ref('')
const noteInput = ref<InstanceType<typeof NInput> | null>(null)

const addNote = () => {
  storeNotes.addNote(newNote.value)
  newNote.value = ''
  noteInput.value?.focus()
}

onMounted(() => {
  storeNotes.getNotes()
})

useWatchCharacters(newNote, 200)
</script>

