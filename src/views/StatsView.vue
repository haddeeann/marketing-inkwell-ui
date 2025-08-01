<template>
  <div class="min-h-screen p-6 bg-gray-50">
    <base-card class="max-w-2xl mx-auto" title="📊 Numbers for Nerds">
      <n-table :single-line="false" class="mb-6">
        <thead>
        <tr>
          <th>Statistic</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Total Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Total Characters Across Notes</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
        </tbody>
      </n-table>

      <n-input
        v-model:value="loveTakeNote"
        placeholder="Do you love Take Note?"
        autofocus
        clearable
      />
      <n-text depth="3" class="block mt-2 text-sm italic">
        Go ahead, say something nice. We’ll watch the characters as you type.
      </n-text>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'
import { NTable, NInput, NText } from 'naive-ui'
import BaseCard from '@/components/BaseCard.vue'

const storeNotes = useStoreNotes()
const loveTakeNote = ref('')
useWatchCharacters(loveTakeNote, 20)
</script>
