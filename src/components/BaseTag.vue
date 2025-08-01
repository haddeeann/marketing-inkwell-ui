<template>
  <!-- Simple pill/tag component using Tailwind -->
  <span
    :class="[
      'inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium',
      colorClasses
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
// Use a multi-word name to satisfy Vue component naming
defineOptions({ name: 'BaseTag' })

import { computed } from 'vue'

// Define prop for tag type
const props = defineProps<{ type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error' }>()
const tagType = props.type ?? 'default'

// Map types to Tailwind color classes
const colorClasses = computed(() => {
  switch (tagType) {
    case 'primary': return 'bg-blue-100 text-blue-800'
    case 'success': return 'bg-green-100 text-green-800'
    case 'info':    return 'bg-teal-100 text-teal-800'
    case 'warning': return 'bg-yellow-100 text-yellow-800'
    case 'error':   return 'bg-red-100 text-red-800'
    default:        return 'bg-gray-100 text-gray-800'
  }
})
</script>
