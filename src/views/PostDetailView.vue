<template>
  <main class="p-6 max-w-3xl mx-auto">
    <n-space vertical size="large">
      <n-h1>{{ post?.title }}</n-h1>
      <n-tag class="mb-4" :type="post?.published ? 'success' : 'warning'" size="small" round>
        {{ post?.published ? 'Published' : 'Unpublished' }}
      </n-tag>
      <n-button @click="editPost">Edit</n-button>
      <div
        v-if="post"
        class="prose max-w-none text-gray-800"
        v-html="sanitize(post.content)"
      />
      <n-empty v-else description="Loading..." />
    </n-space>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NH1, NSpace, NEmpty, NTag, NButton } from 'naive-ui'
import DOMPurify from 'dompurify'
import { fetchPostById } from '@/api/posts'

interface Post {
  id: number
  title: string
  content: string,
  published: boolean
}

const router = useRouter()
const route = useRoute()
const post = ref<Post | null>(null)

function sanitize(content: string) {
  return DOMPurify.sanitize(content)
}

function editPost() {
  router.push({ name: 'PostEdit', params: { id: post.value?.id }})
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    post.value = await fetchPostById(id)
  }
})
</script>

