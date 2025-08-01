<template>
  <div class="min-h-screen flex items-start justify-center p-4 bg-gray-50">
    <base-card class="w-full max-w-2xl" title="Edit Post">
      <n-tag class="mb-4" :type="published ? 'success' : 'warning'" size="small" round>
        {{ published ? 'Published' : 'Unpublished' }}
      </n-tag>
      <n-form>
        <n-form-item label="Title">
          <n-input v-model:value="title" placeholder="Post title..." />
        </n-form-item>
        <n-button
          v-if="!published"
          type="primary"
          @click="handlePublishClicked"
        >
          Publish Post
        </n-button>
        <n-button
          v-else
          type="tertiary"
          @click="handleUnpublishClicked"
        >
          Unpublish Post
        </n-button>
        <div class="my-2">
          <n-form-item label="Tags">
            <n-dynamic-tags v-model:value="tags" />
          </n-form-item>
        </div>

        <n-form-item>
          <text-editor v-model="content" />
        </n-form-item>
        <div class="flex justify-end gap-2 mt-4">
          <router-link to="/posts">
            <n-button>Cancel</n-button>
          </router-link>
          <n-button
            type="primary"
            :disabled="!title || !content"
            @click="handleUpdateClicked"
          >
            Update Post
          </n-button>
        </div>
      </n-form>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPostById, publishPost, unpublishPost, updatePost } from '@/api/posts'
import { NForm, NFormItem, NInput, NButton, NTag } from 'naive-ui'
import TextEditor from '@/components/TextEditor.vue'
import BaseCard from '@/components/BaseCard.vue'

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
