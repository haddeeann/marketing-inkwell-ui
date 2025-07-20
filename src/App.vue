<template>
  <div>
    <header>
      <div>
        <NavBar />
      </div>
    </header>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>
