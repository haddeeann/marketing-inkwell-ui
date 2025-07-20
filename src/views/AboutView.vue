<template>
  <div style="padding: 24px">
    <n-space vertical size="large">
      <n-card title="About Me">
        <n-p>
          I'm a software developer with two dogs who loves hiking and nature. I started building websites in 2010 with a passion for blogging and designing my own online spaces. Over the years, that passion has grown into a career creating small utility software products and games.
        </n-p>
        <n-p>
          I build and share my projects under the name <strong>Yellow Umbrella</strong>, a tiny indie software studio focused on joyful, helpful digital tools.
        </n-p>
      </n-card>

      <n-card title="About This App">
        <n-p>
          This project is a lightweight starter app designed for other developers. It provides a clean foundation for building full-stack Vue apps using Firebase, Pinia, and modern UI components.
        </n-p>
      </n-card>

      <n-card title="Features">
        <n-ul>
          <n-li>User authentication with Firebase</n-li>
          <n-li>Note-taking with live Firestore sync</n-li>
          <n-li>Pinia for state management</n-li>
          <n-li>Router-based navigation with protected routes</n-li>
          <n-li>Responsive layout with Tailwind and Naive UI</n-li>
          <n-li>Easy to extend and customize</n-li>
        </n-ul>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import {
  NSpace,
  NCard,
  NP,
  NUl,
  NLi
} from 'naive-ui'
</script>
