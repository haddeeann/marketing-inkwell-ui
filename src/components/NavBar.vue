<template>
  <div class="p-4 bg-white shadow flex justify-between items-center">
    <div class="flex space-x-4" >
      <template v-if="storeAuth.user">
        <RouterLink to="/" active-class="text-primary font-bold">Home</RouterLink>
        <span class="px-1">|</span>
        <RouterLink to="/posts" active-class="text-primary font-bold">Posts</RouterLink>
        <span class="px-1">|</span>
        <RouterLink to="/posts/new" active-class="text-primary font-bold">New Post</RouterLink>
        <span class="px-1">|</span>
        <RouterLink to="/notes" active-class="text-primary font-bold">Notes</RouterLink>
        <span class="px-1">|</span>
        <RouterLink to="/stats" active-class="text-primary font-bold">Stats</RouterLink>
        <span class="px-1">|</span>
        <RouterLink to="/about" active-class="text-primary font-bold">About</RouterLink>
      </template>
    </div>

    <div class="flex items-center space-x-4">
      <div v-if="storeAuth.user">
        Hello, {{ storeAuth.user.username }}
      </div>
      <button
        v-if="storeAuth.user"
        @click="storeAuth.logOutUser"
      >
        Log Out
      </button>
      <RouterLink v-else to="/auth">
        <button>Sign In</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()
</script>

