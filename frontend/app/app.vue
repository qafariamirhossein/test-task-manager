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
        <label class="task-item">
          <input
            type="checkbox"
            :checked="task.done"
            @change="toggleTask(task._id, !task.done)"
          />
          <span :class="{ completed: task.done }">{{ task.title }}</span>
        </label>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Task {
  _id: string;
  title: string;
  done: boolean;
}

const title = ref('');
const error = ref('');
const pending = ref(false);

const { data: tasks, refresh: refreshTasks } = await useFetch<Task[]>('/api/tasks', {
  default: () => [],
});

const addTask = async () => {
  if (!title.value.trim()) return;
  pending.value = true;
  error.value = '';

  try {
    await $fetch('/api/tasks', {
      method: 'POST',
      body: { title: title.value, done: false },
    });

    title.value = '';
    await refreshTasks();
  } catch (err: any) {
    error.value = `Failed to add task: ${err.message || err}`;
    console.error('Post exception:', err);
  }

  pending.value = false;
};

const toggleTask = async (id: string, done: boolean) => {
  try {
    await $fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      body: { done },
    });
    await refreshTasks();
  } catch (err: any) {
    error.value = `Failed to update task: ${err.message || err}`;
    console.error('Update exception:', err);
  }
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
  font-size: 1.125rem;
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
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.task-item input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.task-item span {
  flex: 1;
}

.task-item span.completed {
  text-decoration: line-through;
  color: #666;
}
</style>
