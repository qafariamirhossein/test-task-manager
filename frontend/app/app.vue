<template>
  <main class="tasks-page">
    <h1>Tasks</h1>

    <form class="task-form" @submit.prevent="addTask">
      <input
        v-model="title"
        type="text"
        placeholder="Add a task"
        required
      />
      <button :disabled="pending">Add</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task._id">
        <span>{{ task.title }}</span>
        <small>{{ task.done ? '✅' : '⬜️' }}</small>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const title = ref('');
const error = ref('');
const tasks = ref<any[]>([]);
const pending = ref(false);

const fetchTasks = async () => {
  try {
    const { data, error: fetchError } = await useFetch('/api/tasks');
    if (fetchError.value) {
      error.value = `Failed to load tasks: ${fetchError.value.message || fetchError.value}`;
      console.error('Fetch error:', fetchError.value);
      return;
    }
    tasks.value = data.value as any[] || [];
  } catch (err: any) {
    error.value = `Failed to load tasks: ${err.message || err}`;
    console.error('Fetch exception:', err);
  }
};

watchEffect(fetchTasks);

const addTask = async () => {
  if (!title.value.trim()) return;
  pending.value = true;
  error.value = '';

  try {
    const { error: postError } = await useFetch('/api/tasks', {
      method: 'POST',
      body: { title: title.value, done: false },
    });

    if (postError.value) {
      error.value = `Failed to add task: ${postError.value.message || postError.value}`;
      console.error('Post error:', postError.value);
    } else {
      title.value = '';
      await fetchTasks();
    }
  } catch (err: any) {
    error.value = `Failed to add task: ${err.message || err}`;
    console.error('Post exception:', err);
  }

  pending.value = false;
};
</script>

<style scoped>
.tasks-page {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: system-ui, sans-serif;
}

.task-form {
  display: flex;
  gap: 0.5rem;
}

.task-form input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.task-form button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.task-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
}

.task-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-list li {
  padding: 0.75rem 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
