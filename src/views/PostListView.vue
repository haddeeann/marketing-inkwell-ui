<template>
  <main class="p-6 max-w-3xl mx-auto">
    <n-space vertical size="large">
      <n-h1>Blog Posts</n-h1>
      <n-card
        v-for="post in storePosts.userPosts"
        :key="post.id"
        :title="post.title"
        class="shadow-md"
      >
        <n-tag class="mb-4" :type="post.published ? 'success' : 'warning'" size="small" round>
          {{ post.published ? 'Published' : 'Unpublished' }}
        </n-tag>
        <div class="text-gray-700 cursor-pointer mb-4" @click="goToBlogDetail(post.id)">
          <div>{{ getExcerpt(post.content) }}</div>
          <div>Created: {{formatDate(post.created_at)}}</div>
          <div>Author: {{post.author}}</div>
        </div>
        <div class="flex space-x-2">
          <div>
            <n-button @click="goToBlogEdit(post.id)" type="primary">Edit</n-button>
          </div>
          <div>
            <n-button type="error" ghost @click="() => handleDeleteClicked(post.id)">
              Delete
            </n-button>
          </div>
        </div>
      </n-card>
    </n-space>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStorePosts } from '@/stores/storePosts'
import { NH1, NCard, NSpace, NTag, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
import { formatDate } from '@/utils/prettyText'

const storePosts = useStorePosts()
const router = useRouter()

const goToBlogDetail = (postId: number) => {
  router.push({ name: 'PostDetail', params: { id: postId } })
}

const goToBlogEdit = (postId: number) => {
  router.push({ name: 'PostEdit', params: { id: postId } })
}

function getExcerpt(content: string, length = 100) {
  // Strip all tags
  const clean = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] })
  // Truncate to length
  return clean.length > length ? clean.slice(0, length) + '…' : clean
}

const handleDeleteClicked = async (id: string) => {
  await storePosts.deletePost(Number(id))
}

onMounted(async () => {
  await storePosts.getUserPosts()
})
</script>


