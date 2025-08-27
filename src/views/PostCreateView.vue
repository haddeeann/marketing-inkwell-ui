<template>
  <div>
    <base-card>
      <form @submit.prevent="handleCreateClicked" class="mt-4 space-y-4">
        <!-- Title -->
        <div>
          <label for="post-title" class="block text-sm font-medium">
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
          <label for="post-content" class="block text-sm font-medium">
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
            <base-button
              type="secondary"
            >
              Cancel
            </base-button>
          </router-link>
          <base-button
            type="primary"
            :disabled="!title || !content"
          >
            Create Post
          </base-button>
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
import BaseButton from '@/components/BaseButton.vue'

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
