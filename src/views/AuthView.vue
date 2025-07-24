<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <n-card class="w-full max-w-md" title="Take Note">

      <n-form @submit.prevent="onSubmit" class="mt-4">
        <n-form-item label="Username">
          <n-input v-model:value="credentials.username" type="text" placeholder="you@example.com" />
        </n-form-item>

        <n-form-item label="Password">
          <n-input v-model:value="credentials.password" type="password" placeholder="Enter your password" />
        </n-form-item>

        <n-button type="primary" block :loading="loading" @click="onSubmit">
          Login
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
import {
  NCard,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NInput,
  NButton,
} from 'naive-ui'

const tab = ref<'login' | 'register'>('login')
const isRegister = computed(() => tab.value === 'register')

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
