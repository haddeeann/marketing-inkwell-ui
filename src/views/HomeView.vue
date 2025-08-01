<template>
  <main class="p-6 max-w-3xl mx-auto">
    <n-space vertical size="large">
      <card
        v-for="post in storePosts.publishedPosts"
        :key="post.id"
        :title="post.title"
        class="shadow-md cursor-pointer"
        @click="goToBlog(post.id)"
      >
        <div class="text-gray-700">
          <div class="my-2">
            <n-tag type="info" size="small" round v-for="tag in post.tags" class="mr-2 mb-2">{{ tag }}</n-tag>
          </div>
          <div>{{ getExcerpt(post.content) }}</div>
          <div>Created: {{formatDate(post.created_at)}}</div>
          <div>Author: {{post.author}}</div>
        </div>
      </card>
    </n-space>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStorePosts } from '@/stores/storePosts'
import { NCard, NSpace, NTag } from 'naive-ui'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/prettyText'
import DOMPurify from 'dompurify'

const storePosts = useStorePosts()
const router = useRouter()

const goToBlog = (postId: number) => {
  router.push({ name: 'PostDetail', params: { id: postId } })
}

function getExcerpt(content: string, length = 100) {
  // Strip all tags
  const clean = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] })
  // Truncate to length
  return clean.length > length ? clean.slice(0, length) + '…' : clean
}


onMounted(async () => {
  await storePosts.getPublishedPosts()
})
</script>


