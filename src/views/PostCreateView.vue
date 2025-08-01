<template>
  <div class="min-h-screen flex items-start justify-center p-4 bg-gray-50">
    <base-card class="w-full max-w-2xl" title="New Post">
      <form @submit.prevent="handleCreateClicked" class="mt-4 space-y-4">
        <!-- Title -->
        <div>
          <label for="post-title" class="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="post-title"
            v-model="title"
            type="text"
            placeholder="Enter post title..."
            class="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Content -->
        <div>
          <label for="post-content" class="block text-sm font-medium text-gray-700">
            Content
          </label>
          <!-- Keep your rich editor here -->
          <TextEditor
            id="post-content"
            v-model="content"
            class="mt-1 block w-full rounded border border-gray-300"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 mt-4">
          <router-link to="/">
            <button
              type="button"
              class="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
          </router-link>
          <button
            type="submit"
            :disabled="!title || !content"
            class="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Create Post
          </button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/api/posts'
import TextEditor from '@/components/TextEditor.vue'
import BaseCard from '@/components/BaseCard.vue'

const router = useRouter()
const title = ref('')
const content = ref('')

const handleCreateClicked = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('Title and content cannot be empty.')
    return
  }
  await createPost(title.value, content.value)
  await router.push('/posts')
}
</script>
