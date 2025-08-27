<template>
  <div>
    <base-card>
      <form>
        <label for="title"></label>
        <input type="text" v-model="title" placeholder="Post title...">

        <div>
          <base-button
            v-if="!published"
            type="primary"
            :html-type="'button'"
            @click="handlePublishClicked"
          >
            Publish Post
          </base-button>
          <base-button
            type="secondary"
            v-else
            :html-type="'button'"
            @click="handleUnpublishClicked"
          >
            Unpublish Post
          </base-button>
        </div>

        <div class="my-2">
          <label for="tags">Tags</label>
          <base-tags v-model="tags" />
        </div>

        <div>
          <text-editor v-model="content" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <router-link to="/posts">
            <base-button type="warning">Cancel</base-button>
          </router-link>
          <base-button
            type="primary"
            :disabled="!title || !content"
            @click="handleUpdateClicked"
          >
            Update Post
          </base-button>
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
import BaseTags from '@/components/BaseTags.vue'
import BaseButton from '@/components/BaseButton.vue'

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
