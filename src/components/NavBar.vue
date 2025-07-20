<template>
  <n-layout-header class="p-4 bg-white shadow flex justify-between items-center">
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
      <n-text depth="3" v-if="storeAuth.user">
        Hello, {{ storeAuth.user.username }}
      </n-text>
      <n-button
        v-if="storeAuth.user"
        type="warning"
        ghost
        @click="storeAuth.logOutUser"
      >
        Log Out
      </n-button>
      <RouterLink v-else to="/auth">
        <n-button type="primary">Sign In</n-button>
      </RouterLink>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import { NLayoutHeader, NButton, NText } from 'naive-ui'

const storeAuth = useStoreAuth()
</script>

