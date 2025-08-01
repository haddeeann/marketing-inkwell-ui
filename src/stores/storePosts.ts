// src/stores/storePosts.ts
import { defineStore } from 'pinia'
import { fetchPostsByAuthor, fetchPublishedPosts, createPost, deletePost } from '@/api/posts'
import { useStoreAuth } from './storeAuth'

export type Post = {
  id: number
  title: string
  slug: string,
  content: string
  published: boolean
  created_at: string
  updated_at: string,
  author: number,
  tags: Array<string>
}

export const useStorePosts = defineStore('storePosts', {
  state: () => ({
    userPosts: [] as Post[],
    publishedPosts: [] as Post[],
  }),
  actions: {
    // Fetch the logged-in user's posts
    async getUserPosts() {
      const storeAuth = useStoreAuth()
      if (!storeAuth.user) return
      this.userPosts = await fetchPostsByAuthor(storeAuth.user.id)
    },
    async addPost(title: string, content: string) {
      const post = await createPost(title, content)
      this.userPosts.unshift(post)
    },
    async deletePost(id: number) {
      await deletePost(id)
      this.userPosts = this.userPosts.filter(post => post.id !== id)
    },
    // Fetch all published posts (for public views)
    async getPublishedPosts() {
      this.publishedPosts = await fetchPublishedPosts()
    }
  },
})
