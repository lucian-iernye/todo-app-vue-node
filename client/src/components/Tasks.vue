<template>
  <div>
    <div v-if="tasks.length == 0">
      <h3>There is no todos at the moment.</h3>
      <h5>Press add todo to add a new todo.</h5>
    </div>
    <div v-for="(task, index) in tasks" :key="index">
      <TaskItem
        @toggle-completed="$emit('toggle-completed', task._id)"
        @delete-todo="$emit('delete-todo', task._id)"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";
export default {
  name: "Tasks",
  components: {
    TaskItem,
  },
  props: {
    tasks: Array,
  },
};
</script>

<style></style>
