import { defineStore } from 'pinia'
import axios from '@/api/axios'
import { useStoreNotes } from '@/stores/storeNotes'

type Credentials = {
  username: string
  password: string
}

export type User = {
  id: number
  username: string
  token: string
}

export const useStoreAuth = defineStore('storeAuth', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async registerUser(credentials: Credentials): Promise<boolean> {
      try {
        await axios.post('/api/auth/register/', credentials)
        // Now auto-login right after
        await this.logInUser(credentials)
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    },
    async logInUser(credentials: Credentials): Promise<User | null> {
      try {
        const res = await axios.post('/api/auth/login/', credentials)

        const access = res.data.access
        const refresh = res.data.refresh

        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)

        const userRes = await axios.get('/api/auth/current_user/')
        const userData = userRes.data

        // fetched user
        this.user = {
          id: userData.id,
          username: userData.username,
          token: access,
        }

        this.router.push('/')
        return this.user
      } catch (err) {
        console.error(err)
        return null
      }
    },
    logOutUser() {
      this.user = null
      delete axios.defaults.headers.common['Authorization']
      this.router.replace('/auth')
      useStoreNotes().clearNotes()
    },
  },
})
