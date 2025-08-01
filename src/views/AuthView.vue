<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <base-card class="w-full max-w-md" title="Tiny Wordsmith">
      <form @submit.prevent="onSubmit" class="mt-4">
        <div>
          <label for="username" class="mr-4">Username</label>
          <input id="username" v-model="credentials.username" type="text" placeholder="you@example.com" />
        </div>
        <div>
          <label for="password" class="mr-4">Password</label>
          <input id="password" v-model="credentials.password" type="text" placeholder="Enter your password">
        </div>

        <button @click="onSubmit">
          Login
        </button>
      </form>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
import BaseCard from '@/components/BaseCard.vue'

const credentials = reactive({
  username: '',
  password: ''
})

const storeAuth = useStoreAuth()
const loading = ref(false)

const onSubmit = async () => {
  if (!credentials.username || !credentials.password) {
    alert('Please enter an email and password')
    return
  }

  loading.value = true
  try {
    await storeAuth.logInUser(credentials)
  } finally {
    loading.value = false
  }
}
</script>
