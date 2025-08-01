<template>
  <div class="min-h-screen flex items-start justify-center p-4 bg-gray-50">
    <base-card class="w-full max-w-2xl" title="Edit Post">
      <base-tag class="mb-4" :type="published ? 'success' : 'warning'" size="small" round>
        {{ published ? 'Published' : 'Unpublished' }}
      </base-tag>
      <form>
        <label for="title"></label>
        <input type="text" v-model="title" placeholder="Post title...">
        <button
          v-if="!published"
          @click="handlePublishClicked"
        >
          Publish Post
        </button>
        <button
          v-else
          @click="handleUnpublishClicked"
        >
          Unpublish Post
        </button>
        <div class="my-2">
          <label for="tags">Tags</label>
          <base-tags v-model="tags" />
        </div>

        <div>
          <text-editor v-model="content" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <router-link to="/posts">
            <button>Cancel</button>
          </router-link>
          <button
            :disabled="!title || !content"
            @click="handleUpdateClicked"
          >
            Update Post
          </button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPostById, publishPost, unpublishPost, updatePost } from '@/api/posts'
import TextEditor from '@/components/TextEditor.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseTag from '@/components/BaseTag.vue'
import BaseTags from '@/components/BaseTags.vue'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')
const published = ref('')
const tags = ref<string[]>([])

// Load post on mount
onMounted(async () => {
  const id = Number(route.params.id)
  const post = await fetchPostById(id)
  published.value = post.published
  title.value = post.title
  content.value = post.content
  tags.value = post.tags
})

const handlePublishClicked = async () => {
  const id = Number(route.params.id)
  const updatedPost = await publishPost(id)
  published.value = updatedPost.published
}

const handleUnpublishClicked = async () => {
  const id = Number(route.params.id)
  const updatedPost = await unpublishPost(id)
  published.value = updatedPost.published
}

const handleUpdateClicked = async () => {
  const id = Number(route.params.id)
  await updatePost(id, {
    title: title.value,
    content: content.value,
    tags: tags.value
  })
  await router.push('/posts')
}
</script>
