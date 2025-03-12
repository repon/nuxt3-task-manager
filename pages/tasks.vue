<script setup lang="ts">
const { data: tasks, error } = await useFetch('/api/tasks')

if(error.value) {
  console.error('タスクの取得に失敗', error.value)
}
</script>

<template>
  <div>
    <h1>タスク一覧</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.status }}
      </li>
    </ul>
  </div>
</template>