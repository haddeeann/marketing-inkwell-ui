<template>
  <div class="min-h-screen flex items-start justify-center p-4 bg-gray-50">
    <n-card class="w-full max-w-2xl" title="New Post">
      <n-form>
        <n-form-item label="Title">
          <n-input v-model:value="title" placeholder="Enter post title..." />
        </n-form-item>
        <n-form-item>
          <text-editor v-model="content" />
        </n-form-item>
        <div class="flex justify-end gap-2 mt-4">
          <router-link to="/">
            <n-button>Cancel</n-button>
          </router-link>
          <n-button
            type="primary"
            :disabled="!title || !content"
            @click="handleCreateClicked"
          >
            Create Post
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/api/posts'
import { NCard, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import TextEditor from '@/components/TextEditor.vue'

const router = useRouter()

const title = ref('')
const content = ref('')

const handleCreateClicked = async () => {
  await createPost(title.value, content.value)
  await router.push('/posts')
}
</script>
