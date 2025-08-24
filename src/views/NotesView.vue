<template>
  <div class="min-h-screen p-6">
    <base-card title="Take a Note" class="max-w-4xl mx-auto mb-6">
      <textarea
        v-model="newNote"
        type="textarea"
        placeholder="Write your note here..."
        ref="noteInput"
      />
      <div class="flex justify-end mt-4">
        <base-button
          type="primary"
          :disabled="!newNote"
          @click="addNote"
        >
          Add Note
        </base-button>
      </div>
    </base-card>

    <div class="max-w-4xl mx-auto space-y-4">
      <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />
      <div v-if="storeNotes.notes.length === 0">
        No notes yet. Start by adding one above!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Note from '@/components/Note.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

const storeNotes = useStoreNotes()
const newNote = ref('')
const noteInput = ref<InstanceType<typeof input> | null>(null)

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

