import axios from '@/api/axios'
import axios_public from '@/api/axios_public'
import { useStoreAuth } from '@/stores/storeAuth'

export async function fetchPostsByAuthor(authorId: number) {
  const res = await axios.get(`/api/posts/?author=${authorId}`)
  return res.data
}

export async function createPost(title: string, content: string) {
  const res = await axios.post('/api/posts/', {
    title,
    content,
  })
  return res.data
}

export async function deletePost(id: number) {
  const res = await axios.delete(`/api/posts/${id}/`)
  return res.data
}

export async function fetchPostById(id: number) {
  const storeAuth = useStoreAuth()
  const client = storeAuth.isLoggedIn ? axios : axios_public
  // allow the backend to determine if we get a post detail
  const res = await client.get(`/api/posts/${id}/`)
  return res.data
}

export async function fetchPublishedPosts() {
  const res = await axios_public.get('/api/posts/published/')
  return res.data
}

// api/posts.ts
export async function updatePost(id: number, data: { title: string; content: string, tags: string[] }) {
  const res = await axios.put(`/api/posts/${id}/`, data)
  return res.data
}

export async function publishPost(id: number) {
  const res = await axios.post(`/api/posts/${id}/publish/`)
  return res.data
}

export async function unpublishPost(id: number) {
  const res = await axios.post(`/api/posts/${id}/unpublish/`)
  return res.data
}




